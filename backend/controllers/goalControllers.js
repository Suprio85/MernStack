import asyncHandler from 'express-async-handler'
import {Goal} from '../models/goalModel.js'


// @desc    Get all goals
// @route   GET /api/goals
// @access  Private
// @param   req, res
// @return  json
// @type    controller
export  const getGoals =asyncHandler(async (req,res)=>{
    //console.log(req.user);
    //console.log(req.user.id);   
    

    const goals = await Goal.find({user: req.user.id});


    res.status(200).json(goals);
})

// @desc    Update single goal
// @route   PUT /api/goals/:id
// @access  Private
// @param   req, res
// @return  json
// @type    controller

export const updateGoal = asyncHandler(async (req, res) => {
   if(!req.body.text){
    res.status(400)
    throw new Error('Please enter text')
   }
   console.log(req.body);
   const log= await Goal.updateOne({_id: req.params.id, user: req.user.id}, {$set:  {text: req.body.text}})
  
   const updatedGoal = await Goal.find({_id: req.params.id ,user: req.user.id},{_id: 1, text: 1, user: 1, createdAt: 1});

 
    res.status(200).json({log,updatedGoal});
})

// @desc    Delete single goal
// @route   DELETE /api/goals/:id
// @access  Private
// @param   req, res
// @return  message
// @type    controller

export const deleteGoal = asyncHandler(async (req, res) => {
  const deletedGoal =    await Goal.find({_id: req.params.id, user: req.user.id})
    if(!deletedGoal){
        res.status(404)
        throw new Error('Goal not found')
    }
  const log =  await Goal.deleteOne({_id: req.params.id , user: req.user.id})

    res.status(200).json({log,deletedGoal});
})

// @desc    Create single goal
// @route   POST /api/goals
// @access  Private
// @param   req, res
// @return  json
// @type    controller

export const createGoal = asyncHandler(async (req, res) => {
   // console.log(req.body);


 if(!req.body.text){
     res.status(400)
    throw new Error('Please enter text')
    }

    const newGoal = new Goal({
        text: req.body.text,
        user: req.user.id
    })

     newGoal.save()
    .then(()=>console.log('Goal created'))
    .catch((error)=>console.log(error));
  

    res.status(200).json(newGoal);
})







