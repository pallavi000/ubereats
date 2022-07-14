import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'


import $ from 'jquery'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Oval } from  'react-loader-spinner'

function CategoryIndex() {
    const [categories,setCategories] = useState([])
    const [is_loader,setIs_loader] = useState(false)
    
    const token = localStorage.getItem('token')

    const config={
      headers:{
        Authorization:`Bearer ${token}`
      }
    }

    async function getCategory(){
        try {

        setIs_loader(true)
      const response = await axios.get('/category',config)
      console.log(response.data)
      setCategories(response.data)
      setIs_loader(false)
      setTimeout(()=>{
        $('#myTable').DataTable();
      },1000)
            
        } catch (error) {
            setIs_loader(false)
            console.log(error.request.message)
        }
    }


    useEffect(() => {
     getCategory()
    }, [])
    

   async function distroy(e,id){
      try {
        const response = await axios.delete('/category/'+id,config)
        console.log(response.data)
       var newcategory=  categories.filter(cat=>cat._id!=id)
       setCategories(newcategory)
      } catch (error) {
        console.log(error.request.response)
        
      }
    }
  return (
    is_loader?(
      <Oval
      height="100"
      width="100"
      color='#94142C'
      ariaLabel='loading'
      secondaryColor="#ddd"
    />
    ):(
    <div className="content-wrapper">
        <div className="container ">
        <Link className="btn btn-secondary float-right mb-2" to='/admin/category/create' > Add</Link>

        <div className="table-responsive mt-5">
        <table className="table table-light bg-white table-striped" id ="myTable">
    <thead>
    <tr className="trhead">
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    
    <tbody>
    {categories.map(category=>{
        return(

      <tr key={category._id}>
        <th scope="row">{category._id}</th>
        <td> {category.name}</td>
        <td>
        <Link className="btn btn-primary mr-3" to={`/admin/category/edit-category/${category._id}`}>Edit</Link>
        <button className="btn btn-danger" onClick={(e)=>distroy(e,category._id)} >Delete</button>
        </td>
        
      </tr>
     
      )})}
    </tbody>
  
  </table>
    </div>
    </div>
    </div>
    )
  )
}

export default CategoryIndex