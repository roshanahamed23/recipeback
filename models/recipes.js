import mongoose from "mongoose";
 const Recipeschema = new mongoose.Schema({
    name:{type:String,required:true},
    ingredients:[{type:String,required:true}],
    instructions:{type:String,required:true},
    imageUrl:{type:String,required:true},
    CookingTime:{type:Number,required:true},
    userOwner:{type:mongoose.Schema.Types.ObjectId,ref:"users",required:true}
 });

export const Recipemodel = mongoose.model("Recipes",Recipeschema);