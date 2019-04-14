const express = require("express");
const morgan = require("morgan");
const app = express();
require("dotenv").config();
const expressLayouts=require('express-layouts')
const bodyParser=require('body-parser')
//ROUTING
const orderRoutes = require("./api/routes/orders");
const productsRoutes = require("./api/routes/products");
const userRoutes=require('./api/routes/user')
const mongoose =require('mongoose')


mongoose.connect(`${process.env.DB}`, { useNewUrlParser: true })
mongoose.Promise=global.Promise
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

app.use('/uploads', express.static('uploads'))


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin X-Requested-With, Content-Type, Accept, Authorization')
    if (req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({});
    }
    next()
});

app.use(expressLayouts);
app.set("view engine", "ejs");

// Routes which should handle requests

app.use("/products", productsRoutes);
app.use("/orders", orderRoutes);
app.use("/user", userRoutes)

app.use((req, res, next) => {
  const error = new Error("NotFound!");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
