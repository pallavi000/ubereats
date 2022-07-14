import React from 'react'
import image1 from '../images/show2.png'

function Home() {
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
                <div className='col-md-4'>
                    <div className='card'>
                        <div className=''>
                            <div className='company-list-image'>
                                <img src={image1} className='img-fluid'></img>
                                <div className='company-list-detail-section'>
                                    <div className='company-list-title'>Feed your employees</div>
                                    <div className='company-list-detail'>Create a business account</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='card'>
                        <div className=''>
                            <div className='company-list-image'>
                                <img src={image1} className='img-fluid'></img>
                                <div className='company-list-detail-section'>
                                    <div className='company-list-title'>Feed your employees</div>
                                    <div className='company-list-detail'>Create a business account</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='card'>
                        <div className=''>
                            <div className='company-list-image'>
                                <img src={image1} className='img-fluid'></img>
                                <div className='company-list-detail-section'>
                                    <div className='company-list-title'>Feed your employees</div>
                                    <div className='company-list-detail'>Create a business account</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home