import React from 'react'
import Sidebar from './Sidebar'
import profile from '../images/profile.jpeg'
import { Link, useNavigate } from 'react-router-dom'



function Header() {
  const navigate = useNavigate()
  let user ={}
  if(localStorage.getItem('user')){
     user = JSON.parse(localStorage.getItem('user'))
  }

  function logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/');
  }

  return (
    user.role=='company'?(
      <Sidebar user={user}/>
    ):user && user.name?(
      <>

       <nav class=" home-nav navbar navbar-light bg-light justify-content-between">
       <div className='d-flex align-items-center'>
       <button class="btn btn-primary" className='navbar-brand' type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
      <i class="fa-solid fa-bars"></i>
      </button>
       <a class="navbar-brand"><span>Uber</span> Eats</a>
       </div>
       <form class="form-inline">
    <a class="btn btn-outline-success my-2 my-sm-0 login-btn" href="/sign-up" >Cart (0)</a>
  </form>
    </nav>

     {/* offcanvas */}
    <div class="offcanvas offcanvas-start w-25" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
      <Link class="offcanvas-header" to="/profile">
        <div className='profile-image-section d-flex align-items-center'>
        <div className='profile-image'>
          <img src={profile} className="img-fluid"></img>
        </div>
        <div className='profile-detail'>
          <div className='profile-name'>Pallavi</div>
          <Link className='profile-link' to="/profile">View account</Link>
        </div>
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </Link>
      <div class="offcanvas-body">
        <div className='d-flex align-items-center profile-tab-container'>
          <div className='profile-icon'>
          <i class="fa-solid fa-border-all"></i>
          </div>
          <div className='profile-tab'>Orders</div>
        </div>

        <div className='d-flex align-items-center profile-tab-container'>
          <div className='profile-icon'>
          <i class="fa-solid fa-border-all"></i>
          </div>
          <div className='profile-tab'>Orders</div>
        </div>

        <div className='signout-btn' onClick={()=>logout()}>Sign Out</div>
        <hr/>

      </div>
    </div>
</>
    ):(
        <nav class=" home-nav navbar navbar-light bg-light justify-content-between">
  <a class="navbar-brand">Navbar</a>
  <form class="form-inline">
    <a class="btn btn-outline-success my-2 my-sm-0 login-btn mr-4" href="/login" >Login</a>
    <a class="btn btn-outline-success my-2 my-sm-0 login-btn" href="/sign-up" >Sign Up</a>
  </form>
  
  
</nav>
  )
  )
}

export default Header
