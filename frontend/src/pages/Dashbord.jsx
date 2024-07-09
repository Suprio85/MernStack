import React, { useCallback, useMemo } from "react";
import { FaUser } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GoalForm from "../components/GoalForm";
import { getGoals } from "../features/goal/goalSlice";
import GoalItems from '../components/GoalItems'


const Dashbord = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { goals,isError,errorMessage } = useSelector((state) => state.goals);



  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    
    if(isError){
      console.log(errorMessage);
    }
    
    dispatch(getGoals());


  }, [user,isError,goals]);

  return (
    <>
      <section>
        <h1>
          <FaUser> </FaUser> Welcome {user && user.name}
        </h1>
        <p> Goal DasBoard </p>
      </section>
      <div>
        <GoalForm />
      </div>
      <section>
        { goals.length>0 ? 
          (
          goals.map((goal) =>  (
          <GoalItems key={goal._id} goal={goal} />))  
        )
        : <p> No Goals Found </p>
        }
      </section>
    </>
  );
};

export default Dashbord;
