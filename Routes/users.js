import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {UserModel} from "../models/users.js";

const router = express.Router();

router.post("/register",async(req,res)=>{
const {username,password}= req.body;
const user =await UserModel.findOne({username});
 if(user){
    return res.json({message:"the user was already exist"});
 }
 const hashedpassword = await bcrypt.hash(password,10);
 const newuser = new UserModel({username:username,password:hashedpassword});
 await newuser.save();
 res.json({message:"the new user was created successfully"});
});

router.post('/login',async(req,res)=>{
   const {username,password}=req.body;
   const user = await UserModel.findOne({username});
   if(!user){
      return res.json({"message":"the user is not exist"})
   }
   const passwordcheck= await bcrypt.compare(password,user.password);
   if(!passwordcheck){
      return res.json({"message":"the password was incorrect"});
   }
   const token = jwt.sign({id:user._id},"secret");
  return  res.json({token:token,userId:user._id})
})

export {router as Userrouter};