import React,{useState,useEffect} from 'react'
import axios from 'axios'

function CompanyRegister() {
    const[name,setName] = useState('')
    const[email,setEmail] = useState('')
    const[phone,setPhone] = useState('')
    const[password,setPassword] = useState('')
    const[address,setAddress] = useState('')
    const[city,setCity] = useState('')
    const[country,setCountry] = useState('')
    const[postal_code,setPostal_code] = useState('')
    const[company_name,setCompany_name] = useState('')
    const[image,setImage] = useState('')

    async function register(e){
        e.preventDefault()
        try {
            const data= new FormData()
            data.append('name',name)
            data.append('email',email)
            data.append('password',password)
            data.append('address',address)
            data.append('city',city)
            data.append('country',country)
            data.append('postal_code',postal_code)
            data.append('company_name',company_name)
            data.append('image',image)
               
            const response = await axios.post('/user/company/register',data)
            console.log(response.data)
            
        } catch (error) {
            console.log(error.request.response)
        }
    }
  return (
    <div className='login-section'>
        <div className='card'>
            <div className='card-body'>
                <div className='login-header'>Get Started</div>
                <form onSubmit={(e)=>register(e)}>
                    <div className='form-group login-input'>
                        <input type="text" placeholder="Enter Username" onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div className='form-group login-input'>
                        <input type="email" placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div className='form-group login-input'>
                        <input type="password" placeholder="Enter Password" onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <div className='form-group login-input'>
                        <input type="text" placeholder="Enter Company Name" onChange={(e)=>setCompany_name(e.target.value)}/>
                    </div>

                    <div className='form-group login-input'>
                        <input type="number" placeholder="Enter Phone Number" onChange={(e)=>setPhone(e.target.value)}/>
                    </div>
                    <div className='form-group login-input'>
                        <input type="text" placeholder="Enter Company Address" onChange={(e)=>setAddress(e.target.value)}/>
                    </div>
                    <div className='form-group login-input'>
                        <input type="text" placeholder="Enter Company City" onChange={(e)=>setCity(e.target.value)}/>
                    </div>
                    <div className='form-group login-input'>
                        <input type="text" placeholder="Enter Company Country" onChange={(e)=>setCountry(e.target.value)}/>
                    </div>
                    <div className='form-group login-input'>
                        <input type="text" placeholder="Enter Company Postal Code" onChange={(e)=>setPostal_code(e.target.value)}/>
                    </div>

                    <div className='form-group login-input'>
                        <input type="file" placeholder="Enter Company Postal Code" onChange={(e)=>setImage(e.target.files[0])}/>
                    </div>

                    <button type="submit" className='btn-signup'>Sign Up</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default CompanyRegister