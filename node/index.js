const express = require('express')
const app = express()
const port = 3000
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}

const mysql = require('mysql')
const connection = mysql.createConnection(config)
const sql = "INSERT INTO people(name) values('Leandro')"
connection.query(sql)

var result = '<h1>Full Cycle Rocks!</h1>'

connection.query('SELECT * FROM people', (_,rows) => {
  rows.forEach( (row) => {
    result += `\n<p>${row.name}</p>`
  })
}).on('error', function(error) {
  console.log("[mysql error]",error)
})

connection.end()

app.get('/', (req, res) => {
  res.send(result)
})

app.listen(port, () => {
  console.log(`Running on port ${port}...`)
})