import express from "express"
import * as dotenv from "dotenv"
dotenv.config()
import morgan  from "morgan"
import cors from  "cors"
import {logger}from "./helper/logger.js"
import { allowedOrigin } from "./config/origin.js"
// import {connectDB, isLocal} from "./config/index"
// import {isLocal}from "./config/index.js"
import { connectDB, isLocal } from "./config/db.js"
import userRoutes from './Router/userRoutes.js';
import productRoutes from './Router/productRoutes.js';
import cartRoutes from './Router/cartRoute.js';
const PORT =3030
const app=express()
console.log(isLocal, process.env.MONGO_URL)
// Middleware
app.use(cors({
  credentials:true,
  origin:allowedOrigin[0],
}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(morgan("common"));


app.get("/", (req, res) => {
  return res.status(200).json({
    data: null,
    message: "DEEP TECH ASSIGNMENT 🚀",
    success: true,
  });
});


app.get("/health", (req, res) => {
  return res.status(200).json({
    data: null,
    message: "Server is healthy and running smoothly 🏃🏾🏃🏾",
    success: true,
  });
});

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);


app.all("*", (req, res) => {
  return res.status(404).json({
    data: "NOT_FOUND_ERROR",
    message: "Route does not exist, check provided endpoint and try again",
    success: false,
  });
});


const startServer=async ()=>{
    try{
        await connectDB()
        app.listen(PORT, () => {

            isLocal
        ? console.info(`Server running on http://localhost:${PORT}`)
        : logger.info(`Server running on prod`);
    });
    }catch(err){
      console.error(err)
    }
}

startServer()
