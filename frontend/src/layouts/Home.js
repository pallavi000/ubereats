import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import image1 from '../images/show2.png'

function Home() {

    const[companies,setCompanies] = useState([])

    useEffect(() => {
     getCompany()
    }, [])

    const token = localStorage.getItem('token')
    const config={
      headers:{
        Authorization:`Bearer ${token}`
      }
    }

   async function getCompany(){
        try {
            const response = await axios.get('/company')
            console.log(response.data)
            setCompanies(response.data)
        } catch (error) {
            console.log(error.request.response)
        }
    }
    
  return (
    <div className='home-section'>
        <div className='home-container'>
            <div className='home-tag'>Order food to your door</div>
            <div className='home-search-container '>
            <form className='d-flex align-items-center'>
            <div className='home-search-input d-flex align-items-center'>
            <i class="fa-solid fa-location-dot"></i> <input type="text"  placeholder='enter delivery address'/>
                </div>
                <div className='home-delivery'>
                    <select>
                        <option value="">Delivery now</option>
                        <option value="">Schedule for later</option>
                    </select>
                </div>
                <button className='find-food'>Find Food</button>
            </form>
                
            </div>
        </div>
        <div className='home-company-list-section'>
            <div className='row'>
            {companies.map(company=>{
                return(
                    <div className='col-md-4 ' style={{marginBottom:'4rem'}}>
                    <div className='card'>
                        <div className=''>
                            <Link className='company-list-image' to={`/company-page/${company._id}`}>
                                <img src={image1} className='img-fluid'></img>
                                </Link>
                                <div className='company-list-detail-section'>
                                    <div className='company-list-title'>{company.company_name}</div>
                                    {/* <div className='company-list-detail'>{company.company_name}</div> */}
                                
                            </div>
                        </div>
                    </div>
                </div>
                )
            })}
            </div>
        </div>
       
    </div>
  )
}

export default Home