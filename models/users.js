import mongoose from "mongoose";
const userschema=mongoose.Schema({
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    savedrecipes:[{type:mongoose.Schema.Types.ObjectId,ref:"recipes"}]
});

export const UserModel = mongoose.model("Users",userschema); 