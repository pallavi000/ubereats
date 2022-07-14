import React from 'react'
import Sidebar from './Sidebar'

function Header() {
let user ={}
  if(localStorage.getItem('user')){
     user = JSON.parse(localStorage.getItem('user'))
  }

  return (
    user.role=='company'?(
      <Sidebar user={user}/>
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
