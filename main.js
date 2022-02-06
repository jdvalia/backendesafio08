const express = require("express");
const app = new express();
const PORT = 8080;

const productos = require("./routers/productos.js");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/productos",productos);

app.use(express.static("./public"));

app.listen(PORT,()=>{console.log(`El puerto es: ${PORT}`)});