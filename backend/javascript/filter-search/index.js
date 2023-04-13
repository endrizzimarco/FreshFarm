class Function {
    static async filterSearch(Offers, filter) {
      const querySpec = {
        query: `SELECT c.farmerId, c.Lat, c.Lng, c.Price, c.Type, c.Items FROM c WHERE ${filter}`
      };
      const { resources: results } = await client
        .database("FreshFarmDB")
        .container(Offers)
        .items.query(querySpec)
        .fetchAll();
  
      return results;
    }
  }
  
  // Example usage:
  const collection = "Offers";
  const filter = "c.farmerId = 'Paul' AND c.Price < 5";
  const filteredResults = await Function.filterSearch(Offers, filter);
  console.log(filteredResults);
  