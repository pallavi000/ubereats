import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')

    const navigate = useNavigate()

   async function signin(e){
    e.preventDefault()
        try {
            const data={
                email,
                password
            }
            const response = await axios.post('/user/login',data)
            console.log(response.data)
            localStorage.setItem('token',response.data.token)
            localStorage.setItem('user',JSON.stringify(response.data.user))
            localStorage.setItem('role',JSON.stringify(response.data.role))
            navigate('/')
        } catch (error) {
            console.log(error.request.response)
        }
    }

  return (
    <div className='login-section'>
    <div className='card'>
        <div className='card-body'>
            <div className='login-header'>Login</div>
            <form onSubmit={(e)=>signin(e)}>
                <div className='form-group login-input'>
                        <input type="email" placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div className='form-group login-input'>
                        <input type="password" placeholder="Enter Password" onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                <button type="submit" className='btn-signup'>Login</button>
            </form>
        </div>
    </div>
</div>
  )
}

export default Login