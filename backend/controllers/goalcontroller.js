const asyncHandler = require('express-async-handler')

const Goal = require('../model/goalModel')
const User = require('../model/usersmodel')

// @description Get all goals at start
// @route GET /api/goals
// @access Private

const getGoals = asyncHandler(async(req,res) => {
    const goals = await Goal.find({user: req.user.id})
    res.status(200).json({goals})
})

// @description Create  goals at start
// @route POST /api/goals
// @access Private

const setGoals = asyncHandler(async(req,res) => {

    if(!req.body.text){
        res.status(400)
        throw new Error('Please add text field')
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json({ message: 'Create goals'})
})

// @description Edit  goals 
// @route PUT /api/goals/:id
// @access Private

const editGoals = asyncHandler(async(req,res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }


    ////check user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }
    // make sure the logged user matches goal users
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }
    const updatedGoal= await Goal.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
    })
    res.status(200).json(updatedGoal)
})

// @description DELETE  goals 
// @route DELETE /api/goals/:id
// @access Private

const deleteGoals = asyncHandler(async(req,res) => {

  

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    /// const user = await User.findById(req.user.id)
    ////check user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }
    // make sure the logged user matches goal users
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

  // another method for id deletion
  // const deletedGoal= await Goal.findByIdAndDelete(req.params.id,{
   //     new: true,
   // })

   await goal.remove()

    res.status(200).json({id:req.params.id})
})


module.exports = {
    getGoals,setGoals,editGoals,deleteGoals,
}