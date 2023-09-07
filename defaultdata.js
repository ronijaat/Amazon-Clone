const Products = require("./models/productsSchema");
const productdata = require('./constant/productsdata');

const DefaultData = async()=>{
    try{
        await Products.deleteMany({});

        const storeData = await Products.insertMany(productdata);
        console.log(storeData);
    }catch(error){
        console.log("error in adding data to database",error);
    }
}

module.exports = DefaultData