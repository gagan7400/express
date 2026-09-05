let express = require("express");
let cors = require("cors")
let app = express();// express instance  

let connectdb = require("./db/connectDB");
connectdb(); //db connection setup


app.use(cors()) //third-party ///Third-party middleware
app.use(express.json()) //inbuilt //Built-in middleware
app.use(express.text())
app.use(express.urlencoded())
app.use("/uploads", express.static("public"));

let userRoute = require("./routes/userRoute");
let productRoute = require("./routes/productRoute");

app.use("/api/users/", userRoute);
app.use("/api/products/", productRoute);

app.use((err, req, res, next) => {
    console.log(err.message);
    res.send("error occured " + err.message)
})

app.listen(8000, (err) => {
    console.log(err || "server run on port 8000")
});


// Drivers:
// mongodb Drivers
// mongoose driver 