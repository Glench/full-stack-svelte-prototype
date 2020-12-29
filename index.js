const fs = require('fs')
const express = require('express')
var bodyParser = require('body-parser');
const {create_routes} = require('./full-stack-svelte')

const app = express()
const port = 5000
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })); 

app.use('/static', express.static('public'))

create_routes(app, './routes', '')

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
