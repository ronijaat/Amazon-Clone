import React, { useState } from 'react'
import { NavLink } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const baseObj = {
    fname: '',
    email: '',
    mobile: '',
    password: '',
    cpassword: ''
  }
  const [udata, setUdata] = useState(baseObj)

  const addData = (e) => {
    const { name, value } = e.target;
    // console.log(e.target);
    setUdata({ ...udata, [name]: value })
  }
  const senddata = async (e) => {
    e.preventDefault();
    console.log(udata);
    const { fname, email, mobile, password, cpassword } = udata;

    const res = await fetch("/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(udata)
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      toast.warn("Invalid Details", {
        position: "top-right",
      })
    }
    else {
      // alert("data successfully added")
      toast.success("data successfully added", {
        position: "top-right",
      })
    }
    // console.log(data);
    setUdata(baseObj);
  }

  return (
    <section>
      <div className="sign_container">
        <div className="sign_header">
          <img src="./blacklogoamazon.png" alt="" />
        </div>
        <div className="sign_form">
          <form action="" >
            <h1>Sign Up</h1>
            <div className="form_data">
              <label htmlFor="text">Your Name</label>
              <input type="text" name='fname' id='fname' onChange={addData} value={udata.fname} />
            </div>
            <div className="form_data">
              <label htmlFor="email">Email</label>
              <input type="text" name='email' id='email' onChange={addData} value={udata.email} />
            </div>
            <div className="form_data">
              <label htmlFor="number">Mobile</label>
              <input type="text" name='mobile' id='mobile' onChange={addData} value={udata.mobile} />
            </div>
            <div className="form_data">
              <label htmlFor="password">Password</label>
              <input type="password" name='password' onChange={addData} value={udata.password} placeholder="At least 6 char" id='password' />
            </div>
            <div className="form_data">
              <label htmlFor="cpassword">Password Again</label>
              <input type="password" name='cpassword' id='cpassword' onChange={addData} value={udata.cpassword} />
            </div>
            <button className='signin_btn' onClick={senddata}>Continue</button>
            <div className="signin_info">
              <p>Already have an account?</p>
              <NavLink to="/login">Sign In</NavLink>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </section>
  )
}

export default SignUp