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
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            [Queue("orders")]IAsyncCollector<string> outputQueueOrder, ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);
            string name = data?.name;
            string offerId = data?.offerId;
            string farmerId = data?.farmerId;

            if(string.IsNullOrEmpty(name) || string.IsNullOrEmpty(offerId) || string.IsNullOrEmpty(farmerId)) {
                return new BadRequestObjectResult("Invalid order data");
            } else {
                await outputQueueOrder.AddAsync(@"{""name"":"""+name+@""",""offerId"":"""+offerId+@""",""farmerId"":"""+farmerId + @"""}");
                return new OkObjectResult("Order accepted");
            }
        }
    }
}
