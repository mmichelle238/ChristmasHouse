const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = process.env.PORT || 3000
const path = require('path')

var cors = require('cors')
app.use(cors()) // Use this after the variable declaration

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(express.static(path.join(__dirname, '/../christmas-house-checkin/dist/christmas-house-checkin/')))
app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, '/../christmas-house-checkin/dist/christmas-house-checkin/index.html'))
})

var router = express.Router();              // get an instance of the express Router
router.route('/users')
.post(db.addUser)

router.route('/users/:name')
.get(db.findUser)
.put(db.updateUser)
.delete(db.deleteUser)

router.route('/usercheckin/:email')
.post(db.checkInUser)

// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})