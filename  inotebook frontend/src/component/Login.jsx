import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Login = (props) => {

    const [credentials, setCredentials] = useState({email:"", password:""});
    const navigate = useNavigate();

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name] : e.target.value});
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch('http://localhost:8000/api/auth/login',{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth-token':'eyJhbGciOiJIUzI1NiJ9.NjZlMmYzMzE2ZDg2MTdhYzIzMTY5NjEx.HT8nGQRnEhMpqESD3WEFGIH9KxuA79pArU0hJyijJf4'
            },
            body: JSON.stringify({email : credentials.email, password : credentials.password})
        });
        const json = await response.json();
        if(json.success){
            localStorage.setItem('token',json.jwtToken);
            navigate('/');
            props.showAlert("LoggedIn Successfully", "success");
        }
        else{
            props.showAlert("Invalid Credentials", "danger");
        }
    }

  return (
    <div>
        <form className='mt-2' onSubmit={handleSubmit}>
            <h2>Login to continue to - iNoteBook</h2>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange}/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" name='password' id="password" onChange={onChange}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default Login