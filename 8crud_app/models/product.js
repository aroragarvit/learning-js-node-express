// we are making models in different folder and then exporting  
const mongoose = require("mongoose")
const productSchema=new mongoose.schema({
    name:{
        type:string,
        required:true
    },
    price:{
        type:number,
        required:true,
        min:0
    },
    category:{
        type:string,
        enum:['fruit', 'vegetables','dairy']
    }
})
const Product=mongoose.model('Product',productSchema);
module.exports=Product;