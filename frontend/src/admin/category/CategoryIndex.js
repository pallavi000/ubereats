import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component';


import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Oval } from  'react-loader-spinner'
import { format } from 'timeago.js';

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

    const columns = [
          {
            name: <th>Name</th>,
            selector: (item)=>item.name,
            sortable:true 
          },
          {
            name:<th>Slug</th>,
            selector:(item)=>item.slug,
            sortable:true
          },
          {
            name:<th>Created At</th>,
            selector:(item)=>format(item.createdAt),
            sortable:true
          },
          {
            name:<th>Action</th>,
            cell:(item)=><>   
               <Link className="btn btn-primary mr-3" to={`/admin/category/edit/${item._id}`}>Edit</Link>
            <button className="btn btn-danger" onClick={(e)=>distroy(e,item._id)} >Delete</button>
            </>,
            

          }
        ]




  return (
   
    <div className="content-wrapper">
        <div className="container-fluid mt-5 px-5 ">

        <DataTable
            columns={columns}
            data={categories}
            pagination
            title='Category'
            actions={<Link className="btn btn-primary" to='/admin/category/create' >Create</Link>}
            progressPending={is_loader}
            progressComponent={ <Oval
            height="40"
            width="40"
            color='#590696'
            ariaLabel='loading'
            secondaryColor="#ddd"
            strokeWidth={4}
            wrapperStyle={{marginBottom:'50px'}}
          />}
        />
        
    </div>
    </div>
    
  )
}

export default CategoryIndex