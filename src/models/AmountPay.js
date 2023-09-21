const mongoose = require('mongoose')

const AmountSchema = new mongoose.Schema({
    email: {
        type:String,
        unique:true
    } ,
    amount:Number ,
    cart : Number
})

const AmountModel = new mongoose.model("AmountToPay",AmountSchema)

module.exports = AmountModel