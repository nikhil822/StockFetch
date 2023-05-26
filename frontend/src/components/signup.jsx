import React from 'react'
import { Link } from 'react-router-dom'
import './signup.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const signup = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')

    /**
     * This function sends a POST request to register a new user with the provided email, password,
     * username, and name, and logs any errors or success messages.
     */
    const handleRegister = () => {
        axios.post(`http://localhost:8080/api/auth/register`, {
            email: email,
            password: password,
            username: username,
            name: name
        }, {
            withCredentials: true
        }).then((res) => {
            console.log("Account Created Successfully")
            navigate('/')
        }).catch((err) => {
            console.log(err.response.data.error)
        })
    }

    return (
        <div className='container'>
            <div className="heading">Sign Up</div>
            <div className="formContainer">
                <div className="left">
                    <img className='img' src="./images/signup.jpg" alt="hello" />
                </div>
                <div className="right">
                    <h2 className="fromHeading">Create Account</h2>
                    <input
                    type="text" 
                    className='input' 
                    placeholder='Name'
                    onChange={(e) => setName(e.target.value)}
                    />
                    <input 
                    type="text" 
                    className='input' 
                    placeholder='Username'
                    onChange={(e) => setUsername(e.target.value)}
                    />
                    <input 
                    type="email" 
                    className='input' 
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)} 
                    />
                    <input 
                    type="password" 
                    className='input' 
                    placeholder='Password' 
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className='btn' onClick={handleRegister}>Sign up</button>
                    <p className='text'>or</p>
                    <p className='text'>
                        Already Have Account ? <Link to='/'>Login</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default signup