import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,"please enter your name"],
    },
    email:{
        type: String,
        required: [true,"please enter your email"],
        unique: true,
    },
    password:{
        type: String,
        required: [true,"please enter your password"],
        unique: true,
    },
    

},{
    timestamps: true,
});


const User= mongoose.model('User', userSchema);

export {
    User
}