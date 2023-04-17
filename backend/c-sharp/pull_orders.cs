using System;
using System.Threading.Tasks;
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.WebJobs.Extensions.WebPubSub;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using Microsoft.Azure.WebPubSub.Common;
using System.Collections.Generic;
namespace FreshFarm
{
    public class QueueItem{
        public string farmerId { get; set;}
        public string offerId { get; set; }
        public string customerName { get; set; }
        public string collectionTime { get; set; }
    }

    public class Item{
        public string name { get; set; }
        public int? quantity { get; set; }
        public Decimal? weight { get; set; }
    }

    public class Offer{
        public string offerId { get; set;}
        public string farmerId { get; set; }
        public string description { get; set; }
        public string pictureUrl { get; set; }
        public DateTime timeOfSale { get; set; }
        public Decimal Lat { get; set; }
        public Decimal Lng { get; set; }
        public Decimal price { get; set; }
        public string type { get; set; }
        public List<Item> items { get; set; }

    }

    public class pull_orders
    {
        [FunctionName("pull_orders")]
        public async Task Run([QueueTrigger("orders", Connection = "AzureWebJobsStorage")] QueueItem myQueueItem,
        [CosmosDB("FreshFarmDB", "Sales", Connection = "CosmosDbConnectionString")] IAsyncCollector<dynamic> documentsOut,
        [CosmosDB("FreshFarmDB", "Offers", Connection = "CosmosDbConnectionString")] CosmosClient client,
        [WebPubSub(Hub = "deletedOffers")] IAsyncCollector<WebPubSubAction> actions,
        ILogger log)
        {
            try {
                log.LogInformation("Order pulled from queue...");

                var offersClient = client.GetContainer("FreshFarmDB", "Offers");
                Offer offer = await offersClient.ReadItemAsync<Offer>(myQueueItem.offerId, new PartitionKey(myQueueItem.farmerId));
                // create a random ID
                string id = System.Guid.NewGuid().ToString();
                await documentsOut.AddAsync(new
                {
                    id = id,
                    farmerId = offer.farmerId,
                    customerName = myQueueItem.customerName,
                    type = offer.type,
                    timeOfSale = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"),
                    collectionTime = myQueueItem.collectionTime,
                    price = offer.price,
                    collected = false,
                });
                log.LogInformation($"Order: {id} added to CosmosDB/Sales.");

                await offersClient.DeleteItemAsync<dynamic>(myQueueItem.offerId, new PartitionKey(myQueueItem.farmerId));
                log.LogInformation($"Offer: {myQueueItem.offerId} deleted from CosmosDB/Offers.");

                await actions.AddAsync(new SendToAllAction
                {
                    Data = BinaryData.FromString($"Offer {myQueueItem.offerId} deleted."),
                    DataType = WebPubSubDataType.Text
                });
                log.LogInformation($"Offer: {myQueueItem.offerId} deletion message sent to WebPubSub.");
            } catch(Exception e) {
                log.LogError(e.Message);
            }
        }
    }
}
