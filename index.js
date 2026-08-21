let express = require("express");
let fs = require("fs")
let cors = require("cors")
let app = express();// express instance  

app.use(cors()) //third-party ///Third-party middleware
app.use(express.json()) //inbuilt //Built-in middleware
app.use(express.text())
app.use(express.urlencoded())
app.use("/uploads", express.static("public"));

let userRoute = require("./routes/userRoute");
let productRoute = require("./routes/productRoute");


let middleware = (req, res, next) => {
    if (req.headers.token == "xyz") {
        console.log("token is verified")
        next();
    } else {
        console.log("token is not verified")
        res.send("error user not found")
    }
}

// app.use(middleware) // it applies on every request comming on this server

app.get("/getdata/:id", middleware, (req, res) => {
    console.log(req.query, req.params, req.headers, req.body)
    res.send("hello world");
})

app.get("/normal", (req, res) => {
    console.log("normal")
    res.send("hello world");//text response
})
// // query/?rating=4.5&price=3000

// {
//     rating = 4.5,
// price :3000  
// }
app.get("/query", (req, res) => {
    console.log("query", req.query)
    res.json({ sucess: true, message: "done" })
})
app.get("/paramater/:id", (req, res) => {
    console.log("params", req.params)
    res.send("hello world");
})

app.post("/add", (req, res) => {
    console.log(req.body)
    res.send("ok done")
})

app.use("/api/users/", userRoute);
app.use("/api/products/", productRoute);

// errro uncaught error of the application
app.use((err, req, res, next) => {
    console.log(err.message);
    res.send("error occured " + err.message)
})

app.listen(8000, (err) => {
    console.log(err || "server run on port 8000")
});



// Middleware functions are functions that have access to the request object (req), the response object (res), and the next function in the application’s request-response cycle. The next function is a function in the Express router which, when invoked, executes the middleware succeeding the current middleware.

// http://localhost:8000/api/users/register
// http://localhost:8000/api/users/login
// http://localhost:8000/api/users/logout

// http://localhost:8000/api/products/addproduct
// http://localhost:8000/api/products/getproduct
// http://localhost:8000/api/products/updateproduct


// http://localhost:8000/parameter/1
// http://localhost:8000/parameter/2
// http://localhost:8000/parameter/3
// http://localhost:8000/parameter/4