const express = require('express')
const dbObj = require('./db/conn')
const {
  getRegisteredActiveAccounts,
  createNewPantry,
  findPantryDetails,
  createNewBasket,
  getBasketDetails,
  updateBasket,
  deleteBasket,
} = require('./db/utils')

const app = express()
app.use(express.json())
const port = 3000

dbObj.connectToServer(() => {})

app.get('/system/status', async (req, res) => {
  const activeAccounts = await getRegisteredActiveAccounts(dbObj.getDb()).catch(
    console.error
  )
  res.send({
    website: true,
    api: true,
    dataStore: true,
    activeAccounts: activeAccounts,
  })
})

app.post('/pantry/create', async (req, res) => {
  res.send(
    await createNewPantry(
      dbObj.getDb(),
      req.body.name,
      req.body.contactEmail
    ).catch(console.error)
  )
})

app.get('/pantry/:id', async (req, res) => {
  res.send(
    await findPantryDetails(dbObj.getDb(), req.params.id).catch(console.error)
  )
})

app.post('/pantry/:id/basket/:basketName', async (req, res) => {
  res.send(
    await createNewBasket(
      dbObj.getDb(),
      req.params.id,
      req.params.basketName,
      req.body.data
    ).catch(console.error)
  )
})

app.get('/pantry/:id/basket/:basketName', async (req, res) => {
  res.send(
    await getBasketDetails(
      dbObj.getDb(),
      req.params.id,
      req.params.basketName
    ).catch(console.error)
  )
})

app.put('/pantry/:id/basket/:basketName', async (req, res) => {
  res.send(
    await updateBasket(
      dbObj.getDb(),
      req.params.id,
      req.params.basketName,
      req.body.data
    ).catch(console.error)
  )
})

app.delete('/pantry/:id/basket/:basketName', async (req, res) => {
  res.send(
    await deleteBasket(
      dbObj.getDb(),
      req.params.id,
      req.params.basketName
    ).catch(console.error)
  )
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
