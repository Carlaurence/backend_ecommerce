const { response } = require('express')
const User = require('../models/user')
const bcryptjs = require('bcryptjs')

/**GET ALL USERS http://localhost:4002/api/user */
exports.getAllUsers = async (req, res) => {
    try{
        const users = await User.find()
        res.status(200).json({ msg: users})
    }catch(error){
        res.json({ msg: error})
    }
}

/**GET ONE USER BY ID http://localhost:4002/api/user/:id */
exports.getOneUserById = async (req, res) => {
    const { id } = req.params;
    try{
        const user = await User.findById(id)
        if(!user){
            res.status(200).json({ msg: 'User does not exist'})
        }else{
            res.status(200).json({ msg: user})
        }
    }catch(error){
        res.json({ msg: error})
    }
}

/*POST NEW USER http://localhost:4002/api/user */
exports.createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try{
        let user = await User.findOne({email:email})
        if(user){
            res.status(200).json({ msg: 'Error: Another user was previouly created with this email'})    
        }else{
           user = new User({ name, email, password })
           user.password = await bcryptjs.hash(req.body.password, 10)
           const newUser = await user.save()
           res.status(200).json({ msg: newUser})
        }
    }catch(error){
        res.json({ msg: error.message})
    }
}