import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import {format} from 'timeago.js'

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Oval } from  'react-loader-spinner'
import MenuCreateModal from './MenuCreateModal';
import * as Toastr from 'toastr';
import '../../../node_modules/toastr/build/toastr.css'
import MenuEditModal from './MenuEditModal';


function MenuIndex() {
    const [menus,setMenus] = useState([])
    const [is_loader,setIs_loader] = useState(false)
    const[deleteId, setDeleteId] = useState(0)
    
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
    setDeleteId(id)
      try {
        const response = await axios.delete('/menu/'+id,config)
        console.log(response.data)
       var newmenu=  menus.filter(cat=>cat._id!=id)
       setMenus(newmenu)
       setDeleteId(0)
       Toastr.success('Menu Deleted Successfully', 'Success')
      } catch (error) {
        Toastr.error('Internal Server Error', 'Error')
        setDeleteId(0)
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
                <MenuEditModal
                  menu={item}
                  menus={menus}
                  setMenus={setMenus}
                />
               <button className="btn btn-primary mr-3" data-toggle="modal" data-target={`#editMenuModal${item._id}`}>
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
        <div className="container-fluid px-5 my-5 pb-5 ">

        <MenuCreateModal
          menus={menus}
          setMenus={setMenus}
        />

        <DataTable
            columns={columns}
            data={menus}
            pagination
            title='Menu'
            actions={<button className="btn btn-primary" data-toggle="modal" data-target="#menuModal">Create</button>}
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