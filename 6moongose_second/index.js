// functions are not working 

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/shopApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO ERROR!!!!");
    console.log(err);
  });

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    min: 0,
    required: true,
  },
  on_sale: {
    type: Boolean,
    default: false,
  },
  categories: {
    type: [String],
  },
  qty: {
    online: {
      type: Number,
      default: 0,
    },
    inStore: {
      type: Number,
      default: 0,
    },
  }, // objects embedded in object schema
});
const Product = mongoose.model("Product", productSchema);

//const bike = new Product({ name: 'Harley davidson', price: 1000 , categories:["Expensive","cool"]} )
//bike.save()
//    .then(data => {
//        console.log("IT WORKED!")
//        console.log(data);
//    })
//    .catch(err => {
//        console.log("OH NO ERROR!")
//        console.log(err)
//    })
//
//bike.save()

Product.findOneAndUpdate(
  { name: "Harley davidson" },
  { price: 20000 },
  { new: true, runValidators: true }
) // new to apply updation
  .then((data) => {
    console.log("IT WORKED!");
    
  })
  .catch((err) => {
    console.log("OH NO ERROR!");
    console.log(err);
  });

//console.dir(productSchema)
// most of the methods we are using are static methods

 
//
//const cycle = new Product ({name:"tricycle",price:"10000"})
//cycle.save()
//

productSchema.methods.toggleOnSale = function () {   // these are instance methods 
    this.onSale = !this.onSale;
    return this.save();
}


productSchema.methods.addCategory = function (newCat) {
    this.categories.push(newCat);
    return this.save();
}

productSchema.statics.fireSale = function () {                             // its static methods 
    return this.updateMany({}, { onSale: true, price: 0 })
}
Product.fireSale().then((res)=>{console.log("static one")
console.log(res)})


console.log(productSchema.methods) 

const findProduct = async () => {
  try{  const foundProduct = await Product.findOne({ name: 'Harley davidson' });
    console.log(foundProduct)
    await foundProduct.toggleOnSale();
    console.log(foundProduct)
    await foundProduct.addCategory('Outdoors')
    console.log(foundProduct)
}

catch(e){console.log(e)}

}
findProduct();