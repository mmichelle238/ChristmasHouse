const Pool   = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'christmashouse',
    password: 'Panda123',
    port: 5432,
  })

const findUser = (request, response) => {
    var name = request.params.name
    if(name == ' ') {
      name = '';
    }
    
    pool.query('SELECT * FROM public."FindUser"($1)', [name], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const addUser = (request, response) => {
    const{firstname,lastname,address,city,zipcode,phone,email} = request.body

    pool.query('CALL public."AddUser"($1, $2, $3, $4, $5, $6, $7)', 
        [firstname,lastname,address,city,zipcode,phone,email], 
            (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`{ "firstname" : "${firstname}"}`)
    })
}

const checkInUser = (request, response) => {
    const email = request.params.email

    pool.query('CALL public."CheckInUser"($1)', [email], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`{ "Email" : "${email}"}`)
    })
}

const updateUser = (request, response) => {
    const oldemail = request.params.name
    const {firstname,lastname,address,city,zipcode,phone,email} = request.body
    
    pool.query(
      'CALL public."UpdateUser"($1,$2,$3,$4,$5,$6,$7,$8)',
      [firstname,lastname,address,city,zipcode,phone,email,oldemail],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`{ "Email" : "${oldemail}"}`)
      })
}

const deleteUser = (request, response) => {
    const email = request.params.name
  
    pool.query('CALL public."DeleteUser"(email)', [email], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`{ "Email" : "${email}"}`)
    })
  }

module.exports = {
    findUser,
    addUser,
    checkInUser,
    updateUser,
    deleteUser
}