module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.')

  const name = req.query.name || (req.body && req.body.name)
  const responseMessage = name
    ? 'HELlo, ' + name + '. This HTTP triggered function executed successfully.'
    : 'This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.'
  console.log('asd', context.bindings)
  // if (name) {
  //   context.bindings.outputDocument = JSON.stringify({
  //     // create a random ID
  //     farmerId: new Date().toISOString() + Math.random().toString().substring(2, 10),
  //     name: name
  //   })
  // }

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: context.bindings.OffersQuery
  }
}
