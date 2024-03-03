import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import {Userrouter} from "../Routes/users.js";
import { Reciperouter } from '../Routes/Recipes.js';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT;
const dbUrl = process.env.DB_URL;
const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:4000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }));
app.use("/recipe",Reciperouter)
app.use('/auth',Userrouter)
app.listen(port,()=>{
    mongoose.connect(dbUrl,{useNewUrlParser:true})
    console.log('the server started in port 4000');
 })