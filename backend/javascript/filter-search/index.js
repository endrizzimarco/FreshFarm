class Function {
    static async filterSearch(Offers, filter) {
      const querySpec = {
        query: `SELECT c.farmerId, c.Type, c.Items, c.Price, c.Lat, c.Lng, c.DESCR 
        FROM Offers c WHERE ${filter}`
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
  const Offers = "Offers";
  const filter = "c.farmerId = 'Paul' AND c.Price < 5";
  const filteredResults = await Function.filterSearch(Offers, filter);
  console.log(filteredResults);
  