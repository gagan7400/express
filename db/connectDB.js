let mongoose = require("mongoose");


let connectdb = async () => {
    try {
        await mongoose.connect("mongodb+srv://shailyg524_db_user:PXXTrSsWowRRKFXa@cluster0.up7r7cq.mongodb.net/Shopwithme?appName=Cluster0");
        console.log("db connected");
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectdb;






// let { MongoClient } = require("mongodb");

// let url = "mongodb://localhost:27017";
// let dbname = "eccommerce";
// let client = new MongoClient(url);


// async function connectDb() {
//     await client.connect();
//     let db = client.db(dbname);
//     let userscollection = db.collection("users");
//     let productscollection = db.collection("products");
//     return { userscollection, productscollection };
// }

// module.exports = connectDb;
// db connection setup