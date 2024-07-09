import React from 'react'
import { FaUser,FaCircle } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { deleteGoal } from '../features/goal/goalSlice'
import { toast } from 'react-toastify'
const GoalItems = ({goal}) => {
    const dispatch = useDispatch();
    const handleDelete = () => {

        dispatch(deleteGoal(goal._id)).then((result)=>{
            if(result.payload){
                console.log('Goal Deleted Successfully');
                toast.success('Goal Deleted Successfully');
            }
            else{
                console.log('Error in Deleting Goal');
                toast.error('Error in Deleting Goal');
            }
        });
    }

  return (
   <>
      <div>
      {new Date(goal.createdAt).toLocaleDateString('en-US')} 
      </div>
      <h2>
        <FaCircle /> {" "} Goal : {goal.text}
      </h2>
      <button onClick={handleDelete}>Delete </button>
      <p>------------------------------------------------------</p>
   </>
  )
}

export default GoalItems