import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'

import $ from 'jquery'
import "datatables.net-dt/css/jquery.dataTables.min.css"
import "datatables.net-dt/js/dataTables.dataTables"

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
      try {
        const response = await axios.delete('/menu/'+id,config)
        console.log(response.data)
       var newmenu=  menus.filter(cat=>cat._id!=id)
       setMenus(newmenu)
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
        <Link className="btn btn-secondary float-right mb-2" to='/admin/menu/create' > Add</Link>

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
    {menus.map(menu=>{
        return(

      <tr key={menu._id}>
        <th scope="row">{menu._id}</th>
        <td> {menu.name}</td>
        <td>
        <Link className="btn btn-primary mr-3" to={`/admin/menu/edit-menu/${menu._id}`}>Edit</Link>
        <button className="btn btn-danger" onClick={(e)=>distroy(e,menu._id)} >Delete</button>
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

export default MenuIndex