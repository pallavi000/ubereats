import axios from 'axios'
import React, { useState } from 'react'
import { Oval } from 'react-loader-spinner'
import * as Toastr from 'toastr';
import '../../../node_modules/toastr/build/toastr.css'
import $ from 'jquery'


function CategoryCreateModal(props) {
    const[name,setName] = useState('')
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
            Toastr.success('Category added')
            setIsLoading(false)
            $('.modal-close').click()
            if(props.categories && props.setCategories) {
                var newcategories = [...props.categories]
                newcategories.unshift(response.data)
                props.setCategories(newcategories)
            }
            if(props.callback) {
                props.callback()
            }
        } catch (error) {
            Toastr.error(error.request.response)
            setIsLoading(false)

        }
    }

  return (
    <div class="modal fade" id="categoryModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <form onSubmit={(e)=>addcategory(e)}>
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add Category</h5>
                <button type="button" class="modal-close close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput">Category Name</label>
                        <input type="text" className="form-control" onChange={(e)=>setName(e.target.value)}  placeholder="Category Name" required/>
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

export default CategoryCreateModal