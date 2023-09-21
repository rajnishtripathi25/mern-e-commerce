const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/e-commerce-bakend")
    .then(() => console.log("database connected successfully"))
    .catch((err) => console.log(err))

