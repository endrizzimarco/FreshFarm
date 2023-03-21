using System;
using System.Threading.Tasks;
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;

namespace FreshFarm
{
    public class QueueItem{
        public string name { get; set; }
        public string farmerId { get; set;}
        public string offerId { get; set; }
    }

    public class pull_orders
    {
        [FunctionName("pull_orders")]
        public async Task Run([QueueTrigger("orders", Connection = "AzureWebJobsStorage")] QueueItem myQueueItem,
        [CosmosDB("FreshFarmDB", "Sales", Connection = "CosmosDbConnectionString")] IAsyncCollector<dynamic> documentsOut,
        [CosmosDB("FreshFarmDB", "Offers", Connection = "CosmosDbConnectionString")] CosmosClient client,
        ILogger log)
        {
            try{
                log.LogInformation("Order pulled from queue...");
                // create a random ID
                string id = System.Guid.NewGuid().ToString();
                await documentsOut.AddAsync(new
                {
                    id = id,
                    name = myQueueItem.name,
                    offerId = myQueueItem.offerId,
                    farmerId = myQueueItem.farmerId
                });
                log.LogInformation($"Order: {id} added to CosmosDB/Sales.");
                await client.GetContainer("FreshFarmDB", "Offers").DeleteItemAsync<dynamic>(myQueueItem.offerId, new PartitionKey(myQueueItem.farmerId));
                log.LogInformation($"Offer: {myQueueItem.offerId} deleted from CosmosDB/Offers.");
            } catch(Exception e){
                log.LogError(e.Message);
            }
        }
    }
}
