const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000

var cors = require('cors')

app.use(cors()) // Use this after the variable declaration

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

app.get('/users/:name', db.findUser)
app.post('/users', db.addUser)
app.post('/usercheckin/:email', db.checkInUser)
app.put('/users/:oldemail', db.updateUser)
app.delete('/users/:email', db.deleteUser)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})