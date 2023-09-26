require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('./db/conn');
const cookieParser = require("cookie-parser");
const path = require("path");

const Products = require("./models/productsSchema");
const DefaultData = require("./defaultdata");
const router = require("./routes/router");

const app = express();

app.use(express.json());
app.use(cookieParser(""));
app.use(cors({
    origin: "*",
}))
app.use(router);

const PORT = process.env.PORT || 8005;

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname,"client","build")));
}
app.use(express.static(path.join(__dirname,"client","build")));

app.listen(PORT,()=>{
    console.log(`server is running on port number ${PORT}`);
})

// DefaultData();