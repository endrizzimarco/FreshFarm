const { CosmosClient } = require('@azure/cosmos')
const dbClient = new CosmosClient(process.env.CosmosDBConnectionString)
const offersContainer = dbClient.database('FreshFarmDB').container('Offers')

function toRadians(degrees) {
  return (degrees * Math.PI) / 180.0
}

function toDegrees(radians) {
  return (radians * 180.0) / Math.PI
}

function boundingBox(lat, lng, radius) {
  const R = 3963.0 // Earth's radius in miles
  const latRad = toRadians(lat)
  const lngRad = toRadians(lng)

  const angularDistance = radius / R

  const latDelta = toDegrees(angularDistance)
  const lngDelta = toDegrees(angularDistance / Math.cos(latRad))

  const maxLat = Number(lat) + latDelta
  const minLat = lat - latDelta
  const maxLng = Number(lng) + lngDelta
  const minLng = lng - lngDelta

  return {
    maxLat: maxLat,
    minLat: minLat,
    maxLng: maxLng,
    minLng: minLng
  }
}
module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.')
  console.log('Request body: ', req.body)
  const maxPrice = req.query.maxPrice || (req.body && req.body.maxPrice)
  const maxRadius = req.query.maxRadius || (req.body && req.body.maxRadius)
  const type = req.query.type || (req.body && req.body.type)
  const lat = req.query.lat || (req.body && req.body.lat)
  const lng = req.query.lng || (req.body && req.body.lng)

  function typeValid() {
    return type.match(/^(Dairy|Eggs|Meat|Grain|Vegetables|Fruit|Other)$/)
  }

  let filterQuery = `SELECT * FROM c `
  if (!maxPrice && !maxRadius && !type) {
    context.res = {
      status: 400,
      body: 'No filter parameters provided in query string or body.'
    }
  } else if (type && !typeValid()) {
    context.res = {
      status: 400,
      body: 'Invalid type provided.'
    }
  } else if (maxRadius && (!lat || !lng)) {
    context.res = {
      status: 400,
      body: 'Radius provided but no lat/lng provided.'
    }
  } else {
    if (maxPrice && !maxRadius && !type) {
      filterQuery += ` WHERE c.price <= ${maxPrice} `
    } else if (!maxPrice && maxRadius && lat && lng && !type) {
      const bb = boundingBox(lat, lng, maxRadius)
      filterQuery += ` WHERE c.lat <= ${bb.maxLat} AND c.lat >= ${bb.minLat} AND c.lng <= ${bb.maxLng} AND c.lng >= ${bb.minLng}`
    } else if (!maxPrice && !maxRadius && type) {
      filterQuery += ` WHERE c.type = '${type}' `
    } else if (maxPrice && !maxRadius && type) {
      filterQuery += ` WHERE c.price <= ${maxPrice} AND c.type = '${type}' `
    } else if (maxPrice && maxRadius && lat && lng && !type) {
      const bb = boundingBox(lat, lng, maxRadius)
      filterQuery += ` WHERE c.price <= ${maxPrice} AND c.lat <= ${bb.maxLat} AND c.lat >= ${bb.minLat} AND c.lng <= ${bb.maxLng} AND c.lng >= ${bb.minLng}`
    } else if (!maxPrice && maxRadius && lat && lng && type) {
      const bb = boundingBox(lat, lng, maxRadius)
      filterQuery += ` WHERE c.type = '${type}' AND c.lat <= ${bb.maxLat} AND c.lat >= ${bb.minLat} AND c.lng <= ${bb.maxLng} AND c.lng >= ${bb.minLng}`
    } else if (maxPrice && maxRadius && lat && lng && type) {
      const bb = boundingBox(lat, lng, maxRadius)
      filterQuery += ` WHERE c.price <= ${maxPrice} AND c.type = '${type}' AND c.lat <= ${bb.maxLat} AND c.lat >= ${bb.minLat} AND c.lng <= ${bb.maxLng} AND c.lng >= ${bb.minLng}`
    }
    console.log(filterQuery)
    const dbstuff = await offersContainer.items.query(filterQuery).fetchAll()
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: dbstuff.resources
    }
  }
}
