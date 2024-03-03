import express from "express";
import mongoose from "mongoose"
import { Recipemodel } from "../models/recipes.js";
import { UserModel } from "../models/users.js";
import e from "express";


const Router = express.Router();

//retur  all recipes
Router.get("/",async(req,res)=>{
    try{
        const response= await Recipemodel.find({});
        res.json(response)

    }catch(error){
        res.json(error);
    }
})

//insert a recipe in database
Router.post("/",async(req,res)=>{
    const recipe = new Recipemodel(req.body);
    try{
        await recipe.save();
        res.json(recipe);
    }catch(error){
        res.json(error);

    }
})
//saving recipe by user
Router.put("/",async(req,res)=>{
    try{
    const user = await UserModel.findById(req.body.userID);
    const recipe = await Recipemodel.findById(req.body.recipeID);
    if(!user.savedrecipes.includes(recipe._id)){
    user?.savedrecipes.push(recipe);
    }
    await user.save();

    }catch(error){
        res.json(error);
    }
})
//getting saved recipes id fron users collection
Router.get("/saved-recipes/ids/:userID",async(req,res)=>{
    try{
    const user = await UserModel.findById(req.params.userID);
    res.json({savedrecipes:user?.savedrecipes})
    }catch(error){
        res.json(error);
    }
})
//show all saved recipes of  the user
Router.get(`/saved-recipes/:userID`,async(req,res)=>{
    try{
        const user = await UserModel.findById(req.params.userID);
        const savedrecipes = await Recipemodel.find({_id:{$in:user?.savedrecipes}});
        res.json(savedrecipes);
    }catch(error){
        res.json(error)
    }
    })

export {Router as Reciperouter}