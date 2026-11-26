import express from "express";
import dotenv from "dotenv"
import cors from 'cors'
import connectDb from "./config/connectDb.js";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
dotenv.config();

const app=express();
const port=process.env.PORT ||  8000;

app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(cookieParser())

app.use("/api/auth",authRoute);

app.listen(port,()=>{
    console.log("Server is started ",port);
    connectDb();
})