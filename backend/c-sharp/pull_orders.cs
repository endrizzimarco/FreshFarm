using System;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;

namespace FreshFarm
{
    public class QueueItem{
        public string name { get; set; }
        public Decimal cost { get; set; }
    }

    public class pull_orders
    {
        [FunctionName("pull_orders")]
        public async Task Run([QueueTrigger("orders", Connection = "AzureWebJobsStorage")] QueueItem myQueueItem,
        [CosmosDB("FreshFarmDB", "Sales", Connection = "CosmosDbConnectionString")] IAsyncCollector<dynamic> documentsOut,
        ILogger log)
        {
            log.LogInformation("Order pulled from queue...");
            string id = System.Guid.NewGuid().ToString();
            await documentsOut.AddAsync(new
            {
                // create a random ID
                id = id,
                name = myQueueItem.name,
                cost = myQueueItem.cost
            });
            log.LogInformation($"Order: {id} added to CosmosDB.");
        }
    }
}
