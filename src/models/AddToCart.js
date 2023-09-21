const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    id: {
        type:Number ,
        required : true
    },
    title:{
        type:String,
        require : true ,
    },
    price:{
        type:Number,
        required:true ,

    },
    image:{
        type:String,
        require:true
    },
    rating:{
        rate:{
            type:Number,
            required:true
        },
        count:{
            type:Number,
            require:true
        },
        
    },
    userId :{
        type:String,
        required:true
    },
    quantity : Number,

})

const AddToCart = new mongoose.model("Cart",cartSchema)

module.exports = AddToCart