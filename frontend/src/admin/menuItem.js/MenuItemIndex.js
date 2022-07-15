import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import * as Toastr from 'toastr';
import '../../../node_modules/toastr/build/toastr.css'

import $ from 'jquery'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Oval } from  'react-loader-spinner'

function MenuItemIndex() {
    const [menuItems,setMenuItems] = useState([])
    const [is_loader,setIs_loader] = useState(false)
    const [deleteId, setDeleteId] = useState(0)
    
    const token = localStorage.getItem('token')

    const config={
      headers:{
        Authorization:`Bearer ${token}`
      }
    }

    async function getmenu(){
        try {

        setIs_loader(true)
      const response = await axios.get('/menuitem',config)
      console.log(response.data)
      setMenuItems(response.data)
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
     getmenu()
    }, [])
    

   async function distroy(e,id){
    setDeleteId(id)
      try {
        const response = await axios.delete('/menuitem/'+id,config)
        var newmenu=  menuItems.filter(cat=>cat._id!=id)
        setMenuItems(newmenu)
        setDeleteId(0)
        Toastr.success('Item Deleted Successfully', 'Success')
      } catch (error) {
        setDeleteId(0)
        Toastr.error('Internal Server Error', 'Error')
        console.log(error.request.response)
      }
    }


     const columns = [
      {
        name:<th>Image</th>,
        cell:(item)=>
        <>
        <img src={item.image} className="py-2" width={70}/>
        </>,
      
      },
          {
            name: <th>Name</th>,
            selector: (item)=>item.name,
            sortable:true
            
          },
          {
            name:<th>Detail</th>,
            selector:(item)=>item.detail,
            sortable:true
          },
          {
            name:<th>Price</th>,
            selector:(item)=>item.price,
            sortable:true
          },
          {
            name:<th>SKU</th>,
            selector:(item)=>item.sku,
            sortable:true
          },
          {
            name:<th>Tax</th>,
            selector:(item)=>item.tax,
            sortable:true
          },
          {
            name:<th>Menu</th>,
            selector:(item)=>item.menu_id?.name,
            sortable:true
          },
          {
            name:<th>Category</th>,
            selector:(item)=>item.category_id?.name,
            sortable:true
          },
          {
            name:<th>Company</th>,
            selector:(item)=>item.company_id?.company_name,
            sortable:true
          },
          {
            name:<th>Action</th>,
            cell:(item)=><>   
               <Link className="btn btn-primary mr-3" to={`/admin/menu-item/edit/${item._id}`}>
                <i className='fa fa-pen-alt'/>
               </Link>
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
            grow:2

          }
        ]





  return (
   
    <div className="content-wrapper">
        <div className="container-fluid px-5 mt-5 ">
        

        <DataTable
            columns={columns}
            data={menuItems}
            pagination
            title='Menu Items'
            actions={<Link className="btn btn-primary" to='/admin/menu-item/create' >Create</Link>}
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

export default MenuItemIndex