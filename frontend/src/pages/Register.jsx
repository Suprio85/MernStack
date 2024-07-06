import React from "react";
import { FaUser } from "react-icons/fa";

const Register = () => {
   const [form, setForm] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",});

    const [error, setError] = React.useState(false);

    const { name, email, password,confirmPassword } = form;

    const handleChange = (e) => {
        setForm((prevForm)=>({
            ...prevForm,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        if(password !== confirmPassword){
            setError(true);
            return;
        }
        
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
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" placeholder="Enter Name" required
                value={name}
                onChange={handleChange}
                />
            </div>
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
            <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleChange}
                required/>
                
            </div>
            <p style={{color:'red'}}>{error && "Type Password again"}</p>
            <button type="submit">Register</button>

        </form>
    </section>
    </>
  );
};

export default Register;
