const express = require('express')
const app = express()
const db = require('./Models/db'); // Use relative path (note the './')
const bodyparser = require('body-parser')
const cors = require("cors");
const { parse } = require('dotenv');
const AuthRouter = require('./Routes/AuthRouter')
const ProductRouter = require('./Routes/ProductRouter')

require('dotenv').config();

const PORT = process.env.port || 4000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(bodyparser.json())
app.use(cors());

app.use('/auth',AuthRouter)
app.use('/product',ProductRouter)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})