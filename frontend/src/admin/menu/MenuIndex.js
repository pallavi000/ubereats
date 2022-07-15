import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import {format} from 'timeago.js'

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Oval } from  'react-loader-spinner'

function MenuIndex() {
    const [menus,setMenus] = useState([])
    const [is_loader,setIs_loader] = useState(false)
    
    const token = localStorage.getItem('token')

    const config={
      headers:{
        Authorization:`Bearer ${token}`
      }
    }

    async function getmenu(){
        try {

        setIs_loader(true)
      const response = await axios.get('/menu',config)
      console.log(response.data)
      setMenus(response.data)
      setIs_loader(false)     
        } catch (error) {
            setIs_loader(false)
            console.log(error.request.message)
        }
    }


    useEffect(() => {
     getmenu()
    }, [])
    

   async function distroy(e,id){
      try {
        const response = await axios.delete('/menu/'+id,config)
        console.log(response.data)
       var newmenu=  menus.filter(cat=>cat._id!=id)
       setMenus(newmenu)
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
               <Link className="btn btn-primary mr-3" to={`/admin/menu/edit/${item._id}`}>Edit</Link>
            <button className="btn btn-danger" onClick={(e)=>distroy(e,item._id)} >Delete</button>
            </>,
            

          }
        ]

  return (
    <div className="content-wrapper">
        <div className="container-fluid px-5 mt-5 ">

        <DataTable
            columns={columns}
            data={menus}
            pagination
            title='Menu'
            actions={<Link className="btn btn-primary" to='/admin/menu/create' >Create</Link>}
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

export default MenuIndex