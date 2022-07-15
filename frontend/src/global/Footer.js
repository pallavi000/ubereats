import React from 'react'

function Footer() {
  return (
    <div className='footer-section'>
    <hr/>
            <div className='footer-container row'>
            <div className='col-md-6'>
                <div className='footer-title'>Uber Eats</div>
            </div>
            <div className='col-md-6 row '>
            <div className='col-md-6 footer-item-container'>
                <div className='footer-item'>Get Help</div>
                <div className='footer-item'>Bu gifts card</div>
                <div className='footer-item'>Add your resturant</div>
                <div className='footer-item'>Sign up to delivery</div>
                <div className='footer-item'>Create a business account</div>
                <div className='footer-item'>Promotions</div>
            </div>
            <div className='col-md-6 footer-item-container'>
            <div className='footer-item'>Resturants near me</div>
                <div className='footer-item'>View all cities</div>
                <div className='footer-item'>View all countries</div>
                <div className='footer-item'>Pickup near me</div>
                <div className='footer-item'>About Uber Eats</div>
                <div className='footer-item'>English</div>
            </div>
            </div>
            </div>
            
            
            <hr/>
            <div className='footer-copyright-section'>
                <div className='row'>
                    <div className='col-md-4'>
                        <div className='icon-container d-flex'>
                        <i class="fa-brands fa-facebook-square"></i>
                        <i class="fa-brands fa-twitter"></i>
                        <i class="fa-brands fa-instagram"></i>
                        </div>
                    </div>
                    <div className='col-md-8'>
                        <div className='pages-wrapper d-flex align-items-center '>
                        <div className='footer-page'>Privacy Policy</div>
                        <div className='footer-page'>Terms</div>
                        <div className='footer-page'>Pricing</div>
                        <div className='footer-page'>Do not sell my info (California)</div>
                        </div>
                        <div className='d-flex justify-content-between align-content-center footer-lower-section'>
                        <div className='footer-page'>
                            This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</div>
                        <div className='footer-page'>© 2022 Uber Technologies Inc.</div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Footer