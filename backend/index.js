import express from "express";
import dotenv from "dotenv"
import connectDb from "./config/connectDb.js";
dotenv.config();

const app=express();
const port=process.env.PORT ||  8000;

app.listen(port,()=>{
    console.log("Server is started ",port);
    connectDb();
})