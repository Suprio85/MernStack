import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import React from 'react'
import { addGoals, reset } from "../features/goal/goalSlice";
import { toast } from 'react-toastify'

const GoalForm = () => {
 const [text, setText] = useState("");
 const dispatch = useDispatch();     
 const {isError,isSuccess,errorMessage} = useSelector(state=>state.goals);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {text : text};
    console.log(data);
    dispatch(addGoals(data)).then((result)=>{
        if(result.payload){
            toast.success('Goal Added Successfully');
            setText("");
        }
        else{  
            toast.error(errorMessage);    
         }
    });
  };

 

  return (
    <>
    <section>
     <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="text">Text :</label> 
        <input type="text" name="text" id="text" placeholder="Enter Goal" required
        value={text}
        onChange={(e) => setText(e.target.value)}
        /> 
      </div>
      <button type="submit" > submit</button>  
     </form>
    </section>
    </>
  )
}

export default GoalForm