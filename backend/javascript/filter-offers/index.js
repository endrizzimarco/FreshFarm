const { CosmosClient } = require('@azure/cosmos')
const dbClient = new CosmosClient(process.env.CosmosDBConnectionString)
const offersContainer = dbClient.database('FreshFarmDB').container('Offers')

function toRadians(degrees) {
  return (degrees * Math.PI) / 180.0
}

function toDegrees(radians) {
  return (radians * 180.0) / Math.PI
}

// Returns a bounding box given a center point and radius
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
// Haversine formula for calculating distance between two points on a sphere
function getDistanceHaversine(lat1, lon1, lat2, lon2) {
  const R = 3963.0 // Radius of the earth in miles
  const dLat = toRadians(lat2 - lat1)
  const dLon = toRadians(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c // Distance in miles
  return d
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
    return type.match(/^(Dairy|Eggs|Meat|Grain|Veggies|Fruit|Other)$/)
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
    const queryResult = await offersContainer.items.query(filterQuery).fetchAll()
    const offers = queryResult.resources

    // Handle offers on the bounding box edge
    if (maxRadius && lat && lng) {
      offers.forEach(offer => {
        let distance = getDistanceHaversine(lat, lng, offer.lat, offer.lng)
        if (distance > maxRadius) offers.splice(offers.indexOf(offer), 1)
      })
    }
    context.res = {
      // status: 200,  /* Defaults to 200 */
      body: offers
    }
  }
}
