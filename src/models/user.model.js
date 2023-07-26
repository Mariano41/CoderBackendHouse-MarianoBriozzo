import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const userCollection = 'usuarios'

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    edad: Number,
    email:{
        type: String,
        unique: true
    }
})

userSchema.plugin(mongoosePaginate);

export const userModel = mongoose.model(userCollection,userSchema)