require('dotenv').config()
const express = require("express")
require("./database/conn")
const cors = require('cors')
const router = require('./router')



const app = express();
app.use(express.json())
app.use(cors())
app.use(router)

const port = process.env.PORT || 5001

app.listen(port, () => console.log(`server is running on port : ${port}`))