import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Toastr from 'toastr';
import '../../../node_modules/toastr/build/toastr.css'

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
            setCategories(response.data.category)
            setMenus(response.data.menu)
        } catch (error) {
            console.log(error.request.response)
        }
    }

    async function addmenuitem(e){
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

  return (
    <div className="content-wrapper">
    <div className="container ">
 
        <div className=' card-body d-flex align-items-center'>
        <div className='back-icon' onClick={()=>navigate(-1)}>
            <i class="fa-solid fa-arrow-left-long"></i>
            </div>
        <h2 className=''>Add menu</h2>
           
        </div>
        <div className='w-75 '>
      <div className='card-body'>
      <form onSubmit={(e)=>addmenuitem(e)}>
    <div className="form-group">
      <label htmlFor="formGroupExampleInput">MenuItem Name</label>
      <input type="text" className="form-control color"  name="name" onChange={(e)=>setName(e.target.value)}  id="formGroupExampleInput" placeholder="menu Name" required/>
    </div>
    <div className="form-group">
      <label htmlFor="formGroupExampleInput">MenuItem Detail</label>
      <textarea type="text" className="form-control color"  name="name" onChange={(e)=>setDetail(e.target.value)} rows={4}  id="formGroupExampleInput" placeholder="menu Name" required></textarea>
    </div>
    <div className="form-group">
      <label htmlFor="formGroupExampleInput">MenuItem Price</label>
      <input type="text" className="form-control color"  name="name" onChange={(e)=>setPrice(e.target.value)}  id="formGroupExampleInput" placeholder="menu Name" required/>
    </div>
    <div className="form-group">
      <label htmlFor="formGroupExampleInput">MenuItem Tax</label>
      <input type="text" className="form-control color"  name="name" onChange={(e)=>setTax(e.target.value)}  id="formGroupExampleInput" placeholder="menu Name" required/>
    </div>
    <div className="form-group">
      <label htmlFor="formGroupExampleInput">MenuItem SKU</label>
      <input type="text" className="form-control color"  name="name" onChange={(e)=>setSku(e.target.value)}  id="formGroupExampleInput" placeholder="menu Name" required/>
    </div>
    <div className="form-group">
      <label htmlFor="formGroupExampleInput">Select Menu</label>
      <select className='form-control' onChange={(e)=>setMenu_id(e.target.value)}>
      <option value="">Select Menu</option>
   {menus.map(menu=>{
     return(
          <option value={menu._id}>{menu.name}</option>
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
          <option value={menu._id}>{menu.name}</option>
     )
   })}  
      </select>
    </div>

   


    <div className="form-group">
      <label htmlFor="formGroupExampleInput">MenuItem Image</label>
      <input type="file" className="form-control color"  name="name" onChange={(e)=>setImage(e.target.files[0])}  id="formGroupExampleInput" placeholder="menu Name" required/>
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

export default CreateMenuItem