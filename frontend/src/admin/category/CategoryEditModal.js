import React, { useState } from 'react'
import { Oval } from 'react-loader-spinner'
import * as Toastr from 'toastr';
import '../../../node_modules/toastr/build/toastr.css'
import $ from 'jquery'
import axios from 'axios';

function CategoryEditModal(props) {
    const[name,setName] = useState(props.category.name)
    const[isLoading,setIsLoading] = useState(false)

    const token = localStorage.getItem('token')
    const config={
        headers:{
          Authorization:`Bearer ${token}`
        }
    }
      

    async function editCategory(e){
        e.preventDefault()
        setIsLoading(true)
        const data={
            name
        }
        try {
            const response =await  axios.put('/category/'+props.category._id,data,config)
            Toastr.success('Category updated successfully.')
            setIsLoading(false)
            $('.modal-close').click()
            if(props.categories && props.setCategories) {
                var newcategories = [...props.categories]
                var idx = props.categories.findIndex(category=>category._id==props.category._id)
                if(idx!=-1) {
                    newcategories[idx] = response.data
                    props.setCategories(newcategories)
                }
            }
        } catch (error) {
            console.log(error.request.response)
            Toastr.error(error.request.response)
            setIsLoading(false)
        }
    }

  return (
    <div class="modal fade" id={`editCategoryModal${props.category._id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <form onSubmit={(e)=>editCategory(e)}>
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Edit Category</h5>
                <button type="button" class="modal-close close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                
                    <div className="form-group">
                        <label htmlFor="formGroupExampleInput">Category Name</label>
                        <input type="text" className="form-control" onChange={(e)=>setName(e.target.value)} defaultValue={name} placeholder="Category Name" required/>
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

export default CategoryEditModal