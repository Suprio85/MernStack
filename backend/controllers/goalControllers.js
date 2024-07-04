import asyncHandler from 'express-async-handler'
// @desc    Get all goals
// @route   GET /api/goals
// @access  Private
// @param   req, res
// @return  json



// @type    controller
export  const getGoals =asyncHandler(async (req,res)=>{
    res.status(200).json({
        id : Date.now(),
        message: 'Get all goals', 
    });
})

// @desc    Update single goal
// @route   PUT /api/goals/:id
// @access  Private
// @param   req, res
// @return  json
// @type    controller

export const updateGoal = async (req, res) => {
    res.status(200).json({
        id : Date.now(),
        message: `Update goal with id ${req.params.id}`,
        params : req.params,
        body : req.body,
    });
}

// @desc    Delete single goal
// @route   DELETE /api/goals/:id
// @access  Private
// @param   req, res
// @return  message
// @type    controller

export const deleteGoal = async (req, res) => {
    res.status(200).send(`Goal with id ${req.params.id} has been deleted`);
}

// @desc    Create single goal
// @route   POST /api/goals
// @access  Private
// @param   req, res
// @return  json
// @type    controller

export const createGoal = async (req, res) => {


 if(!req.body.text){
     res.status(400)
    throw new Error('Please enter text')
    }  
  


    res.status(200).json({
        id : Date.now(),
        message: 'Create a new goal',
        body : req.body,
        text : req.body.text,
    });
}



