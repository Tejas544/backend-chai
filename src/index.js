import connectDB from './db/index.js';
import dotenv from 'dotenv';
import app from './app.js'
import cors from "cors"
import cookieParser from 'cookie-parser';
dotenv.config({
    path : './env'
})
connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`App listening on port ${process.env.PORT}`);
    } )
})
.catch((err) => {
    console.log("Database connection failed: " , err);
    
});













/*
import express from 'express';

const app = express();

( async ()=>{
   try {
     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error" , (error) => {
        console.log("Error: " , error)
    })
    app.listen(process.env.PORT , () => {
        console.log(`server listening on port ${process.env.PORT}`);
    })

   } catch (error) {
    console.error("ERR" , error);
    throw error
   }
})()
   */