using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace FreshFarm
{
    public static class push_orders
    {
        [FunctionName("push_orders")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
            [Queue("orders")]IAsyncCollector<string> outputQueueOrder, ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);
            string customerName = data?.customerName;
            string offerId = data?.offerId;
            string farmerId = data?.farmerId;
            string collectionTime = data?.collectionTime;

            if(string.IsNullOrEmpty(customerName) ||
                string.IsNullOrEmpty(offerId) ||
                string.IsNullOrEmpty(farmerId) ||
                string.IsNullOrEmpty(collectionTime)) {
                return new BadRequestObjectResult("Invalid order data");
            } else {
                // add collection time
                await outputQueueOrder.AddAsync(@"{""customerName"":""" + customerName + @""",""offerId"":""" + offerId + @""",""farmerId"":""" + farmerId + @""",""collectionTime"":"""+ collectionTime  + @"""}");
                return new OkObjectResult("Order accepted");
            }
        }
    }
}
