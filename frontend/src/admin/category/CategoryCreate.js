import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Toastr from 'toastr';

function CategoryCreate() {
    const[name,setName] = useState('')
    const navigate = useNavigate()
    const[isLoading,setIsLoading] = useState(false)
   
    const token= localStorage.getItem('token')
    const config={
      headers:{
        Authorization:`Bearer ${token}`
      }
    }

    async function addcategory(e){
        e.preventDefault()
        setIsLoading(true)
        
        
        try {
            const data={
                name
            }
            const response = await axios.post('/category',data,config)
            console.log(response.data)
            Toastr.success('Category added')
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
        <h2 className='pl-3'>Add Category</h2>
            <button className='btn btn-info' onClick={()=>navigate(-1)}>Back</button>
        </div>
    </div>
    <div className='card py-5 px-3'>
      <div className='card-body'>
      <form onSubmit={(e)=>addcategory(e)}>
    <div className="form-group">
      <label htmlFor="formGroupExampleInput">Category Name</label>
      <input type="text" className="form-control color"  name="name" onChange={(e)=>setName(e.target.value)}  id="formGroupExampleInput" placeholder="Category Name" required/>
    </div>
    {isLoading?(
      <button type="submit" className="btn btn-start loading-btn" disabled>Submitting..</button>
    ):( 
        <button type="submit" className="btn btn-start">Submit</button>
)}
  </form>
      </div>
    </div>
    
    </div>
    </div>
    )
}

export default CategoryCreate