require('dotenv').config()
const mongoose = require("mongoose")
const DATABASE_URL = process.env.DATABASE_URL;


mongoose.connect(DATABASE_URL)
    .then(() => console.log("database connected successfully"))
    .catch((err) => console.log(err))

