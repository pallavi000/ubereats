import axios from 'axios'
import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom';

import * as Toastr from 'toastr';
import '../../../node_modules/toastr/build/toastr.css'


function ChangePassword() {
    const[newpassword,setNewpassword] = useState('')
    const[confirmpassword,setConfirmpassword] = useState('')
    const[currentpassword,setCurrentpassword] = useState('')

    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    const config={
        headers:{
            'Authorization':`Bearer ${token}`
        }
    }

    async function changePassword(e){
        e.preventDefault()
        try {
            const data={
                newpassword,
                currentpassword,
                confirmpassword
            }
            const response = await axios.post('/user/change-password',data,config)
            console.log(response.data)
            Toastr.success(response.data)
            navigate('/profile')
        } catch (error) {
            console.log(error.request.response)
        }
    }


  return (
    <div className='bg-white p-5'>
        <div className='profile-setting-name'>Change Password</div>
        <form className='profile-setting-form bg-white' onSubmit={(e)=>changePassword(e)}>
                <div className='form-group'>
                    <input type="password" className='profile-input' placeholder='Current password' onChange={(e)=>setCurrentpassword(e.target.value)} required></input>
                </div>
                <div className='form-group'>
                
                    <input type="password" className='profile-input' placeholder='New password' onChange={(e)=>setNewpassword(e.target.value)} required></input>
                </div>
                <div className='form-group'>
                    <input type="password" className='profile-input' placeholder='Confirm password' onChange={(e)=>setConfirmpassword(e.target.value)} required></input>
                </div>
                <button className='profile-update-btn'>Update Password</button>

            </form>
    </div>
  )
}

export default ChangePassword