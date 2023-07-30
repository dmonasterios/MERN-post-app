import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Es necesario introducir un titulo'],
        trim:true,
    },
    description:{
        type:String,
        required:[true,'Es necesario introducir una Descripción'],
        trim:true
    },
    filename:{
        type:String,
        required:false,
    }
});


export default mongoose.model('Post', postSchema);