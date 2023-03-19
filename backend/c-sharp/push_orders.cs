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

            string name = req.Query["name"];

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);
            name = name ?? data?.name;

            string responseMessage = "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

            if(!string.IsNullOrEmpty(name)){
                responseMessage = $"HELLO, {name}. Should have added you to the queue!";
                await outputQueueOrder.AddAsync("Name passed in the function: " + name);
            }

            return new OkObjectResult(responseMessage);
        }
    }
}
