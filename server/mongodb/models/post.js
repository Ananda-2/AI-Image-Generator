// post schema

import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    name: { type: String , require:true} , 
    prompt: { type: String , require:true} , 
    photo: { type: String , require:true} , 
})

const Post = new mongoose.model("Post",postSchema) ;

export default Post ;