import React from 'react'
import { FaUser } from 'react-icons/fa'
import { useState, useRef } from 'react'



const Login = () => {

    const [form, setForm] = React.useState({
    email: "",
    password: ""});

    const [error, setError] = React.useState(false);

    const {  email, password } = form;

    const handleChange = (e) => {
        setForm((prevForm)=>({
            ...prevForm,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
     
    }



  return (
    <>
    <section>
      <h1>
        <FaUser> </FaUser> Register
      </h1>
      <p> Please submit the form</p>
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