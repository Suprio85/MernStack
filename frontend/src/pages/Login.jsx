import React from 'react'
import { FaUser } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, reset } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'



const Login = () => {

    const [form, setForm] = useState({
    email: "",
    password: ""});
    const [error, setError] = React.useState(false);
    const {  email, password } = form;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isLoading,isError,isSuccess,errorMessage} = useSelector(state=>state.auth);


    const handleChange = (e) => {
        setForm((prevForm)=>({
            ...prevForm,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        if(email === "" || password === ""){
            setError(true);
            return;
        }
    const data = {email,password};
    dispatch(login(data));
    }

    useEffect(()=>{
        if(isError){
            toast.error(errorMessage);
            dispatch(reset());
        }

        if(isSuccess){
            toast.success('User Logged In Successfully');
            navigate('/');
        }
    },[isError,isSuccess])



  return (
    <>
    <section>
      <h1>
        <FaUser> </FaUser> Login
      </h1>
      <p> Enter Your Email and Password</p>
    </section>

    <section>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" placeholder="Enter Email" required
                value={email}
                onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder="Enter Password"
                value={password}
                onChange={handleChange}
                required/>
                
            </div>
            <p style={{color:'red'}}>{error && "Invalid Email or Password"}</p>
            <button type="submit">Register</button>

        </form>
    </section>
    </>
  );
}

export default Login