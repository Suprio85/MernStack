import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import {User} from '../models/userModel.js'
import {generateToken} from '../utils/generateToken.js'





export const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please enter all fields')
    }

    const UserExists = await User.findOne({email: email});
    if(UserExists){
        res.status(400)
        throw new Error('User already exists.')
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(res,user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})


export const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email: email});
    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(res,user._id)
        })
}else{
    res.status(401)
    throw new Error('Invalid email or password. Try again.')
}
}) 


export const getuserData = asyncHandler(async(req,res)=>{
    console.log(req.user);
    res.json(req.user);
})


export const logoutUser = asyncHandler(async(req,res)=>{
    
    res.cookie('token',null,{
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.json({
        name : req.body.name,
        message: `${req.body.name} Logged out successfully`
    })
})




