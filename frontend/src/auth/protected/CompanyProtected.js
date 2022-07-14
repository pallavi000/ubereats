import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'

function CompanyProtected(props) {
    const navigate = useNavigate()

    useEffect(()=>{
        if(localStorage.getItem('token')){
          try {
            var data = JSON.parse(localStorage.getItem('user'))
            if(data.role!="company"){
              navigate('/')
            }
          } catch (error) {
          }

         
          
        }else{
            navigate('/')
        }

    },[props])
  return (
    <>
          <Outlet/>
    </>
  )
}

export default CompanyProtected