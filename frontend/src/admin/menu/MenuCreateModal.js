import axios from 'axios'
import React, { useState } from 'react'
import { Oval } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom'
import * as Toastr from 'toastr';
import '../../../node_modules/toastr/build/toastr.css'
import $ from 'jquery'

function MenuCreateModal(props) {
    const[name,setName] = useState('')
    const navigate = useNavigate()
    const[isLoading,setIsLoading] = useState(false)
   
    const token= localStorage.getItem('token')
    const config={
      headers:{
        Authorization:`Bearer ${token}`
      }
    }

    async function addmenu(e){
        e.preventDefault()
        setIsLoading(true)
        try {
            const data={
                name
            }
            const response = await axios.post('/menu',data,config)
            Toastr.success('Menu Created Successfully', 'Success')
            setIsLoading(false)
            $('.modal-close').click()
            if(props.menus && props.setMenus) {
                var newmenus = [...props.menus]
                newmenus.unshift(response.data)
                props.setMenus(newmenus)
            }
            if(props.callback) {
                props.callback()
            }
        } catch (error) {
            Toastr.error("Internal Server Error", 'Error')
            setIsLoading(false)
        }
    }

  return (
        <div class="modal fade" id="menuModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <form onSubmit={(e)=>addmenu(e)}>
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add Menu</h5>
                <button type="button" class="modal-close close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput">Menu Name</label>
                        <input type="text" className="form-control" onChange={(e)=>setName(e.target.value)}  placeholder="Menu Name" required/>
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

export default MenuCreateModal