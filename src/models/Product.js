const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    id: {
        type:Number ,
        unique : true ,
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
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
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
        }
    }

})

const Product = new mongoose.model("Product",ProductSchema)

module.exports = Product