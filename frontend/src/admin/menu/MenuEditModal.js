import axios from 'axios'
import React, { useState } from 'react'
import { Oval } from 'react-loader-spinner'
import * as Toastr from 'toastr';
import '../../../node_modules/toastr/build/toastr.css'
import $ from 'jquery'


function MenuEditModal(props) {
    const[name,setName] = useState(props.menu.name)
    const[isLoading,setIsLoading] = useState(false)

    const token = localStorage.getItem('token')
    const config={
        headers:{
          Authorization:`Bearer ${token}`
        }
    }

    async function editMenu(e){
        e.preventDefault()
        setIsLoading(true)
        const data={
            name
        }
        try {
            const response =await  axios.put('/menu/'+props.menu._id,data,config)
            $('.modal-close').click()
            Toastr.success('Menu updated successfully.')
            setIsLoading(false)
            if(props.menus && props.setMenus) {
                var newmenus = [...props.menus]
                var idx = props.menus.findIndex(menu=>menu._id==props.menu._id)
                if(idx!=-1) {
                    newmenus[idx] = response.data
                    props.setMenus(newmenus)
                }
            }
        } catch (error) {
            Toastr.error("Internal Server Error", 'Error')
            setIsLoading(false)
        }
    }


  return (
    <div class="modal fade" id={`editMenuModal${props.menu._id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <form onSubmit={(e)=>editMenu(e)}>
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Edit Menu</h5>
                <button type="button" class="modal-close close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput">Menu Name</label>
                        <input type="text" className="form-control color"  defaultValue={name} onChange={(e)=>setName(e.target.value)}  id="formGroupExampleInput" placeholder="Example input" required/>
                    </div>
            </div>
            <div class="modal-footer">
                {isLoading?(
                    <button class="custom-btn btn-7" disabled><span>
                    <Oval
                        height="20"
                        width="20"
                        color='#590696'
                        ariaLabel='loading'
                        secondaryColor="#ddd"
                        strokeWidth={4}
                    />
                    </span></button>
                ):( 
                    <button class="custom-btn btn-7"><span>Submit</span></button>
                )}
            </div>
            </form>
            </div>
        </div>
        </div>
  )
}

export default MenuEditModal