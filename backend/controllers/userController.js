const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../model/usersmodel')

// @description Authenticate a user  
// @route Post /api/users/login
// @access Public

const loginUser = asyncHandler(async(req,res) => {

    const {email,password} = req.body
    const user =await User.findOne({email})

    if(user && (await bcrypt.compare(password,user.password))){
        res.json({
            _id:user.id,
            name:user.name,
            email: user.email,
            phonenumber: user.phonenumber,
            token:generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid Credentials')
    }
    
})


// @description Get user data  
// @route Post /api/users/me
// @access Public
const registerUser = asyncHandler(async(req,res) => {
    const { name , email, password , phonenumber} = req.body
    if(!name || !email || !password || !phonenumber ){
        res.status(400)
        throw new Error('Please add all fields')
    }


    const userExist = await User.findOne({email})
    if(userExist){
        res.status(400)
        throw new Error('user already exist')
    }

    ///hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    //
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        phonenumber
    })

    if(user){
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            phonenumber:user.phonenumber,
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }


    
})

// @description Get user data jwt token 
// @route get /api/users/me
// @access Private
const getMe = asyncHandler(async(req,res) => {

    

    res.status(200).json(req.user)
    
})

/// Generate JWT Token 
const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d',
    })
}
module.exports = {
    registerUser,
    loginUser,
    getMe
}
