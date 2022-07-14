import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as Toastr from 'toastr';
// import '../../../../node_modules/toastr/build/toastr.css'

function EditMenu(props) {
    const[menu,setMenu] = useState('')
    const[name,setName] = useState('')
    const params = useParams()
    const navigate = useNavigate()
    const[isLoading,setIsLoading] = useState(false)
    

const token = localStorage.getItem('token')
    const config={
        headers:{
          Authorization:`Bearer ${token}`
        }
      }

console.log('props',params)
    async function getmenu(){
        try {
            const response = await axios.get('/menu/'+params.id,config)
            setMenu(response.data)
            setName(response.data.name)
        } catch (error) {
            console.log(error.request.response)
        }
    }

    
useEffect(() => {
    getmenu()
}, [])


async function editmenu(e){
e.preventDefault()
setIsLoading(true)
const data={
    name
}
try {
    const response =await  axios.put('/menu/'+params.id,data,config)
    console.log(response.data)  
    Toastr.success('menu updated successfully.')
    setIsLoading(false)
    navigate(-1)
} catch (error) {
    console.log(error.request.response)
    Toastr.error(error.request.response)
    setIsLoading(false)
}
}

  return (
    <div className="content-wrapper">
    <div className="container w-50 mx-auto">
    <div className='card'>
        <div className='card-body text-right  d-flex justify-content-between align-items-center'>
        <h2 className='pl-3'>Edit Menu</h2>
            <button className='btn btn-info' onClick={()=>navigate(-1)}>Back</button>
        </div>
    </div>
    <div className='card py-5 px-3'>

        <div className='card-body'>
        <form onSubmit={(e)=>editmenu(e)}>
    <div className="form-group">
      <label htmlFor="formGroupExampleInput">Menu Name</label>
      <input type="text" className="form-control color"  defaultValue={menu.name} onChange={(e)=>setName(e.target.value)}  id="formGroupExampleInput" placeholder="Example input" required/>
    </div>
    {isLoading?(   <button type="submit" className="btn btn-start loading-btn" disabled>Submitting</button>
        ):(   <button type="submit" className="btn btn-start">Submit</button>
        )}
  </form>
        </div>
    </div>
    </div>
    </div>
  )
}

export default EditMenu