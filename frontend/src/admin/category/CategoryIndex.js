import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component';


import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Oval } from  'react-loader-spinner'
import { format } from 'timeago.js';
import CategoryCreateModal from './CategoryCreateModal';
import CategoryEditModal from './CategoryEditModal';
import * as Toastr from 'toastr';
import '../../../node_modules/toastr/build/toastr.css'


function CategoryIndex() {
    const [categories,setCategories] = useState([])
    const [is_loader,setIs_loader] = useState(false)
    const[deleteId,setDeleteId] = useState(0)
    
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
    setDeleteId(id)
      try {
        const response = await axios.delete('/category/'+id,config)
        console.log(response.data)
       var newcategory=  categories.filter(cat=>cat._id!=id)
       setCategories(newcategory)
       setDeleteId(0)
       Toastr.success('Category Deleted Successfully', 'Success')
      } catch (error) {
        setDeleteId(0)
        Toastr.error('Internal Server Error', 'Error')
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
               <CategoryEditModal
                  category={item}
                  categories={categories}
                  setCategories={setCategories}
                />
               <button className="btn btn-primary mr-3" data-toggle="modal" data-target={`#editCategoryModal${item._id}`}>
                <i className='fa fa-pen-alt'/>
               </button>
               {deleteId==item._id?(
                <button className="btn btn-danger" disabled>
                  <Oval
                  width={16}
                  height={16}
                  color='#fff'
                  ariaLabel='loading'
                  secondaryColor="#ddd"
                  strokeWidth={4}
                  />
                </button>
               ):(
                <button className="btn btn-danger" onClick={(e)=>distroy(e,item._id)} >
                  <i className='fa fa-trash'/>
                </button>
               )}
            </>,
            

          }
        ]




  return (
   
    <div className="content-wrapper">
        <div className="container-fluid mt-5 px-5 ">

        <CategoryCreateModal
          categories={categories}
          setCategories={setCategories}
        />

        <DataTable
            columns={columns}
            data={categories}
            pagination
            title='Category'
            actions={<button className="btn btn-primary" data-toggle="modal" data-target="#categoryModal">Create</button>}
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