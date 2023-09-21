require('dotenv').config()
const mongoose = require("mongoose")
const DATABASE_URl = process.env.DATABASE_URL;


mongoose.connect(DATABASE_URl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("database connected successfully"))
    .catch((err) => console.log(err))

