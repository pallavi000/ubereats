import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as Toastr from 'toastr';
import '../../../node_modules/toastr/build/toastr.css'

function EditMenuItem() {
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

    

 const params = useParams()
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
       getCurrent()
    },[])

    async function getCurrent(){
        try {
            const response = await axios.get('/menuitem/'+params.id,config)
            console.log(response.data)
            setName(response.data.name)
            setDetail(response.data.detail)
            setPrice(response.data.price)
            setSku(response.data.sku)
            setTax(response.data.tax)
            setCategory_id(response.data.category_id)
            setMenu_id(response.data.menu_id)
            setImage(response.data.image)
            
        } catch (error) {
            
        }
    }

    async function getElement(){
        try {
            const response = await axios.get('/menuitem/elements',config)
            console.log(response.data)
            setCategories(response.data.category)
            setMenus(response.data.menu)
        } catch (error) {
            console.log(error.request.response)
        }
    }

    async function editmenuitem(e){
        e.preventDefault()
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
            if(image){
                data.append('image',image)

            }
          
            const response = await axios.put('/menuitem/'+params.id,data,config)
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

  return (
    <div className="content-wrapper">
    <div className="container w-50 mx-auto">
    <div className='card'>
        <div className='card-body text-right  d-flex justify-content-between align-items-center'>
        <h2 className='pl-3'>Add menu</h2>
            <button className='btn btn-info' onClick={()=>navigate(-1)}>Back</button>
        </div>
    </div>
    <div className='card py-5 px-3'>
      <div className='card-body'>
      <form onSubmit={(e)=>editmenuitem(e)}>
    <div className="form-group">
      <label htmlFor="formGroupExampleInput">MenuItem Name</label>
      <input type="text" className="form-control color" defaultValue={name} name="name" onChange={(e)=>setName(e.target.value)}  id="formGroupExampleInput" placeholder="menu Name" required/>
    </div>
    <div className="form-group">
      <label htmlFor="formGroupExampleInput">MenuItem Detail</label>
      <input type="text" className="form-control color" defaultValue={detail}  name="name" onChange={(e)=>setDetail(e.target.value)}  id="formGroupExampleInput" placeholder="menu Name" required/>
    </div>
    <div className="form-group">
      <label htmlFor="formGroupExampleInput">MenuItem Price</label>
      <input type="text" className="form-control color" defaultValue={price} name="name" onChange={(e)=>setPrice(e.target.value)}  id="formGroupExampleInput" placeholder="menu Name" required/>
    </div>
    <div className="form-group">
      <label htmlFor="formGroupExampleInput">MenuItem Tax</label>
      <input type="text" className="form-control color"  name="name" defaultValue={tax} onChange={(e)=>setTax(e.target.value)}  id="formGroupExampleInput" placeholder="menu Name" required/>
    </div>
    <div className="form-group">
      <label htmlFor="formGroupExampleInput">MenuItem SKU</label>
      <input type="text" className="form-control color"  defaultValue={sku} name="name" onChange={(e)=>setSku(e.target.value)}  id="formGroupExampleInput" placeholder="menu Name" required/>
    </div>
    <div className="form-group">
      <label htmlFor="formGroupExampleInput" >Select Menu</label>
      <select className='form-control' onChange={(e)=>setMenu_id(e.target.value)}>
      <option value="">Select Menu</option>
   {menus.map(menu=>{
     return(
        menu_id==menu._id?(
            <option value={menu._id} selected>{menu.name}</option>

        ):(
            <option value={menu._id}>{menu.name}</option>

        )
     )
   })}  
      </select>
    </div>

    <div className="form-group">
      <label htmlFor="formGroupExampleInput">Select Category</label>
      <select className='form-control' onChange={(e)=>setCategory_id(e.target.value)}>
      <option value="">Select Category</option>
   {categories.map(menu=>{
     return(
        category_id==menu._id?(
            <option value={menu._id} selected>{menu.name}</option>

        ):(
            <option value={menu._id}>{menu.name}</option>

        )
     )
   })}  
      </select>
    </div>

   


    <div className="form-group row">
   <div className='col'>
   <label htmlFor="formGroupExampleInput">MenuItem Image</label>
      <input type="file" className="form-control color"  name="name" onChange={(e)=>setImage(e.target.files[0])}  id="formGroupExampleInput" placeholder="menu Name" />
   </div>
     <div className='col'>
        <img src={image} className="img-fluid" width={150}/>
     </div>
    </div>
    {isLoading?(
      <button type="submit" className="btn btn-start loading-btn" disabled>Submitting..</button>
    ):( 
        <button type="submit" className="btn btn-start">Submit</button>
)}
  </form>
      </div>
    </div>
    
    </div>
    </div>
    )
}

export default EditMenuItem