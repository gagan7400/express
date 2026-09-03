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