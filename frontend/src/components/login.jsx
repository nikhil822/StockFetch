import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './login.css'
import { useState } from 'react'
import {auth, provider} from '../firebase'
import { signInWithPopup } from 'firebase/auth'

const login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () => {
        axios.post('http://localhost:8080/api/auth/login', {
            email: email,
            password: password
        }, {
            withCredentials: true
        }).then((res) => {
            if(res.status === 200){
                localStorage.setItem('auth', true)
                navigate('/dashboard')
                alert("Logged in Successfully")
            }
        }).catch((err) => {
            alert("Enter details correctly")
        })
    }

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                axios.post('http://localhost:8080/api/auth/google', {
                name: result.user.displayName,
                email: result.user.email,
                })
                .then((res) => {
                    if (res.status === 200) {
                    localStorage.setItem('auth', true);
                    navigate('/dashboard');
                    // notifySuccess('Logged in Successfully');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            })
            .catch((error) => {
                console.log(error);
            });
        };
    
    return (
        <div className='container'>
            <div className="heading">Log in</div>
            <div className="formContainer">
                <div className="left">
                    <img className='img' src="./images/login.jpg" alt="hello" />
                </div>
                <div className="right">
                    <h2 className="fromHeading">Members Login</h2>
                    <input 
                    type="text" 
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
                    <button className='btn' onClick={handleLogin}>Login</button>
                    <p className='text'>or</p>
                    <button className='googleBtn' onClick={signInWithGoogle}>
                        <img src="./images/google.png" alt="google" />
                        <span>Sign in with Google</span>
                    </button>
                    <p className='text'>
                        New Here ? <Link to='/signup'>Create an account</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default login