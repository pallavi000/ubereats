import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function SignUp() {
    const[name,setName] = useState('')
    const[email,setEmail] = useState('')
    const[phone,setPhone] = useState('')
    const[password,setPassword] = useState('')

    const navigate = useNavigate()

    async function register(e){
        e.preventDefault()
        try {
            const data={
                name,
                email,
                password,
                phone
            }

            const response = await axios.post('/user/register',data)
            console.log(response.data)
            navigate('/')
            
        } catch (error) {
            console.log(error.request.response)
        }
    }
  return (
    <div className='login-section'>
        <div className='card'>
            <div className='card-body'>
                <div className='login-header'>Get Started</div>
                <form onSubmit={(e)=>register(e)}>
                    <div className='form-group login-input'>
                        <input type="text" placeholder="Enter Username" onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div className='form-group login-input'>
                        <input type="email" placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div className='form-group login-input'>
                        <input type="password" placeholder="Enter Password" onChange={(e)=>setPassword(e.target.value)}/>
                    </div>

                    <div className='form-group login-input'>
                        <input type="number" placeholder="Enter Phone Number" onChange={(e)=>setPhone(e.target.value)}/>
                    </div>
                    <button type="submit" className='btn-signup'>Sign Up</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default SignUp