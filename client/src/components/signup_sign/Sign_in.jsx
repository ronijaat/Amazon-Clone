import React, { useState,useContext } from 'react'
import { NavLink } from 'react-router-dom'
import './signup.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from '../context/ContextProvider';

const SignIn = () => {

  const [logdata, setdata] = useState({
    email:"",
    password:""
  });

  const { account, setAccount } = useContext(LoginContext);

  const addData = (e)=>{
    const {name, value} = e.target;
    setdata({...logdata,[name]:value})
  }

  const sendData = async(e)=>{
    e.preventDefault();
    const res = await fetch("/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(logdata)
    });
    const data = await res.json();
    console.log(data);

    if(res.status === 400|| !data){
      toast.warn("invalid details", {
        position: "top-right",
      })
    }else{
      toast.success("User login", {
        position: "top-right",
      })
      setAccount(data)
      setdata({email:"",password:""})
    }
  }

  return (
    <section>
      <div className="sign_container">
        <div className="sign_header">
          <img src="./blacklogoamazon.png" alt="" />
        </div>
        <div className="sign_form">
          <form action="" method='POST'>
            <h1>Sign In</h1>
            <div className="form_data">
              <label htmlFor="email">Email</label>
              <input type="text" name='email' id='email'onChange={addData} value={logdata.email}/>
            </div>
            <div className="form_data">
              <label htmlFor="password">Password</label>
              <input type="password" name='password' placeholder="At least 6 char" id='password' onChange={addData} value={logdata.password}/>
            </div>
            <button className='signin_btn' onClick={sendData}>Continue</button>
          </form>
        </div>
        <div>
          <div className="create_accountinfo">
            <p>New To Amazon</p>
            <NavLink to="/register">
              <button>Create Your Amazon Account</button>
            </NavLink>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
    
  )
}

export default SignIn