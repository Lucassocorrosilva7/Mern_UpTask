import mongoose from "mongoose";

const tasksSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    state: {
        type: Boolean,
        default: false,
    }, 
    
})