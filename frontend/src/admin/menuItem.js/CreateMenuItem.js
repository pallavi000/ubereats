import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Toastr from 'toastr';
import '../../../node_modules/toastr/build/toastr.css'
import Select from 'react-select'
import { Oval } from 'react-loader-spinner';
import { DefaultEditor } from 'react-simple-wysiwyg';
import $ from 'jquery'
import CategoryCreateModal from '../category/CategoryCreateModal';
import MenuCreateModal from '../menu/MenuCreateModal'

function CreateMenuItem() {
    const[name,setName] = useState('')
    const[detail,setDetail] = useState('')
    const[price,setPrice] = useState('')
    const[sku,setSku] = useState('')
    const[tax,setTax] = useState('')
    const[image,setImage] = useState('')
    const[category_id,setCategory_id] = useState('')
    const[company_id,setCompany_id] = useState('')
    const[menu_id,setMenu_id] = useState('')

    const[companies,setCompanies] = useState([])
    const[categories,setCategories] = useState([])
    const[menus,setMenus] = useState([])

 
    const navigate = useNavigate()
    const[isLoading,setIsLoading] = useState(false)
   
    const token= localStorage.getItem('token')
    const config={
      headers:{
        Authorization:`Bearer ${token}`
      }
    }

    useState(()=>{
       getElement()
    },[])

    async function getElement(){
        try {
            const response = await axios.get('/menuitem/elements',config)
            console.log(response.data)
            setCategories(createSelectOptions(response.data.category))
            setMenus(createSelectOptions(response.data.menu))
        } catch (error) {
            console.log(error.request.response)
        }
    }

    async function addmenuitem(e){
        e.preventDefault()
        if(!image) {
          Toastr.error('Thumbnail is required.', 'Error')
          return false
        }
        if(!detail) {
          Toastr.error('Menu Item Detail is required.', 'Error')
          return false
        }
        if(!category_id) {
          Toastr.error('Category is required.', 'Error')
          return false
        }
        if(!menu_id) {
          Toastr.error('Menu is required.', 'Error')
          return false
        }
        setIsLoading(true)
        
        
        try {
            const data = new FormData()
            data.append('name',name)
            data.append('detail',detail)
            data.append('price',price)
            data.append('sku',sku)
            data.append('tax',tax)
           
            data.append('category_id',category_id)
            data.append('menu_id',menu_id)
            data.append('image',image)
          
            const response = await axios.post('/menuitem',data,config)
            console.log(response.data)
            Toastr.success('menu added')
            setIsLoading(false)

            navigate(-1)
        } catch (error) {
            console.log(error.request.response)
            Toastr.error(error.request.response)
            setIsLoading(false)

        }

    }

    function createSelectOptions(items) {
      var arr = []
      items.forEach(item => {
        arr.push({
          value: item._id,
          label: item.name
        })
      });
      return arr
    }

    function imageChanged(e) {
      console.log(e.target.files)
      if(e.target.files && e.target.files.length>0) {
        const objectUrl = URL.createObjectURL(e.target.files[0])
        $('.image-input').css('background-image', `url(${objectUrl})`)
        setImage(e.target.files[0])
      }
    }
    

  return (
    <div className="content-wrapper">
    <div className="container-fluid py-5 px-5">

    <CategoryCreateModal
      callback={getElement}
    />
    <MenuCreateModal
    callback={getElement}
    />


    <div class="card card-flush">
        <div class="card-header">
          <div class="card-title d-flex align-items-center my-0">
            <div className='back-icon' onClick={()=>navigate(-1)}>
              <i class="fa-solid fa-arrow-left-long"></i>
            </div>
            <h2>Add Menu Item</h2>
          </div>
        </div>
        <div class="card-body pt-5 mt-5">

        <form onSubmit={(e)=>addmenuitem(e)}>

          <div class="form-group row">
            <div className='col col-md-4 text-center'>
              <label class="required form-label d-block mb-2">Cover Image/Thumbnail</label>
              <input type="file" className="form-control d-none" id='menu-item-image' onChange={(e)=>imageChanged(e)}/>
              <label className='image-input image-input-empty image-input-outline image-input-placeholder mb-3' htmlFor="menu-item-image">
                <div class="image-input-wrapper"></div>
              </label>
              <small class="text-muted form-text">
                Set the Item thumbnail image. Only *.png, *.jpg and *.jpeg image files are accepted
              </small>
            </div>
            <div className='col col-md-8'>
              <label class="required form-label">Menu Item Name</label>
              <input type="text" name="product_name" class="form-control mb-2" placeholder="Menu Item name"  onChange={(e)=>setName(e.target.value)} required/>
              <small class="text-muted form-text">A Menu Item name is required and recommended to be unique.</small>
            </div>
          </div>

          <div className="form-group">
            <label class="required form-label">Product Detail</label>
            <DefaultEditor value={detail} onChange={(e)=>setDetail(e.target.value)} style={{minHeight: "150px"}}/>
          </div>

          <div className='form-group row'>
            <div className='col'>
              <label class="required form-label">Price</label>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">$</span>
                </div>
                <input type="number" class="form-control" placeholder="Price"  onChange={(e)=>setPrice(e.target.value)} required/>
                <div class="input-group-append">
                  <span class="input-group-text">.00</span>
                </div>
              </div>
            </div>
            <div className='col'>
              <label class="required form-label">Tax</label>
              <div class="input-group mb-3">
                <input type="number" class="form-control" placeholder="Tax"  onChange={(e)=>setTax(e.target.value)} required/>
                <div class="input-group-append">
                  <span class="input-group-text">%</span>
                </div>
              </div>
            </div>
          </div>

          <div className='form-group row'>
            <div className='col'>
              <label class="required form-label">Menu</label>
              {menus && menus.length>0?(
              <Select options={menus} onChange={({value})=>setMenu_id(value)} required/>
              ):(
                <button type='button' className='btn btn-primary btn-sm d-block' data-toggle="modal" data-target="#menuModal">Create Menu</button>
              )}
            </div>
            <div className='col'>
              <label class="required form-label">Categories</label>
              {categories && categories.length>0 ?(
              <Select options={categories} onChange={({value})=>setCategory_id(value)} required/>
              ):(
                  <button type='button' className='btn btn-primary btn-sm d-block' data-toggle="modal" data-target="#categoryModal">Create Category</button>
              )}
            </div>
          </div>

          <div className='form-group row'>
            <div className='col col-md-6'>
              <label class="required form-label">SKU</label>
              <input type="text" className="form-control" placeholder='SKU' onChange={(e)=>setSku(e.target.value)} required/>
            </div>
          </div>

          <div className='form-group col'>
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
    
    </div>
    )
}

export default CreateMenuItem