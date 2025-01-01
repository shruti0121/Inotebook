import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

const Signup = (props) => {

  const [credentials, setCredentials] = useState({name : "", email : "", password : ""});
  const navigate = useNavigate();

  const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name] : e.target.value});
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const response = await fetch('http://localhost:8000/api/auth/signup',{
      method:'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name : credentials.name, email : credentials.email, password : credentials.password})
    });
    const json = await response.json();
    if(json.success){
      localStorage.setItem('token',json.jwtToken);
      navigate('/');
      props.showAlert("Account Created Successfully","success");
    }
    else{
      props.showAlert("Invalid Details", "danger");
    }
  }

  return (
    <div>
      <form className='mt-2' onSubmit={handleSubmit}>
        <h2>Create an account to use iNoteBook</h2>
        <div className="my-3">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="name" name='name' value={credentials.name} aria-describedby="emailHelp" onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' value={credentials.email} aria-describedby="emailHelp" onChange={onChange}/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' id="password"/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup