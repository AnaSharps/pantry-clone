const { v4: uuidv4 } = require('uuid')

async function createNewPantry(client, pantryName, contactEmail) {
  const pantryId = uuidv4()
  const newPantryDoc = {
    _id: pantryId,
    name: pantryName,
    description: 'defaultDescription',
    contactEmail,
    baskets: [],
    errors: [],
    notifications: true,
    percentFull: 0,
  }
  const result = await client
    .collection('pantry_details')
    .insertOne(newPantryDoc)
  return result.insertedId
}

async function findPantryDetails(client, pantryId) {
  const result = await client
    .collection('pantry_details')
    .findOne({ _id: pantryId })
  if (result) {
    delete result['_id']
    delete result['contactEmail']
    return result
  } else {
    return `No pantries found with the id '${pantryId}'`
  }
}

async function getBasketDetails(client, pantryId, basketName) {
  const result = await client
    .collection('basket_details')
    .findOne({ pantry: pantryId, name: basketName })
  if (result) {
    return result.data
  } else {
    return `No such basket found`
  }
}

async function createNewBasket(client, pantryId, basketName, data) {
  const basket = await client.collection('basket_details').insertOne({
    name: basketName,
    pantry: pantryId,
    data,
  })
  const result = await client
    .collection('pantry_details')
    .updateOne(
      { _id: pantryId },
      { $push: { baskets: { name: basketName } }, $inc: { percentFull: 1 } }
    )

  if (basket && result)
    return `Your Pantry was updated with basket: ${basketName}!`
}

async function updateBasket(client, pantryId, basketName, data) {
  const result = await client
    .collection('basket_details')
    .updateOne({ pantry: pantryId, name: basketName }, { $set: { data: data } })

  return data
}

async function deleteBasket(client, pantryId, basketName) {
  const pantryRes = await client.collection('pantry_details').updateOne(
    { _id: pantryId },
    {
      $pull: { baskets: { name: basketName } },
      $inc: { percentFull: -1 },
    }
  )
  const result = await client
    .collection('basket_details')
    .deleteOne({ pantry: pantryId, name: basketName })

  if (result && pantryRes)
    return `Your basket was deleted with name: ${basketName}!`
}

async function getRegisteredActiveAccounts(client) {
  return await client.collection('pantry_details').estimatedDocumentCount()
}

module.exports = {
  getRegisteredActiveAccounts,
  createNewBasket,
  createNewPantry,
  updateBasket,
  findPantryDetails,
  getBasketDetails,
  deleteBasket,
}
