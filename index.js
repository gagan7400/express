let express = require("express");
let fs = require("fs")
let cors = require("cors")
let app = express();// express instance  

app.use(cors())
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded())
app.use("/uploads", express.static("public"));

let userRoute = require("./routes/userRoute");
let productRoute = require("./routes/productRoute");

app.use("/api/users/", userRoute);
app.use("/api/products/", productRoute);

app.listen(8000, (err) => {
    console.log(err || "server run on port 8000")
});

// http://localhost:8000/api/users/register
// http://localhost:8000/api/users/login
// http://localhost:8000/api/users/logout

// http://localhost:8000/api/products/addproduct
// http://localhost:8000/api/products/getproduct
// http://localhost:8000/api/products/updateproduct