import React from 'react'
import {Link,useNavigate,useLocation} from 'react-router-dom'
import $ from 'jquery'

function Sidebar(props) {

const navigate = useNavigate();

  function logout(e){
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/');
  }
   
  let sidebar = document.querySelector(".sidebar");
  let closeBtn = document.querySelector("#btn");
  let searchBtn = document.querySelector(".bx-search");


  function dashboard(){
    $('.sidebar').toggleClass("open");
    menuBtnChange();
  }
  
  // following are the code to change sidebar button(optional)
  function menuBtnChange() {
    if($('.sidebar').hasClass("open")){
      $('#btn').removeClass("fa-bars");
      $('#btn').addClass("fa-align-right")
    }else {
       $('#btn').removeClass("fa-align-right")
       $('#btn').addClass("fa-bars");
    }
   }



    return (
  <div class="sidebar">
  <div class="logo-details">
    <i class="fa fa-bandcamp icon" aria-hidden="true"></i>
      <div class="logo_name">Logo</div>
        <i class="fa fa-bars" id="btn" onClick={(e)=>dashboard(e)} aria-hidden="true"></i>
  </div>
  <ul class="nav-list">
    <li>
      <Link to="/dashboard">
        <i class="fa fa-th-large" aria-hidden="true"></i>
        <span class="links_name">Dashboard</span>
      </Link>
       <span class="tooltip">Dashboard</span>
    </li>
        <li>
     <Link to="/admin/menu/index">
       <i class="fa fa-audio-description" aria-hidden="true"></i>
       <span class="links_name">Menu</span>
     </Link>
     <span class="tooltip">Menu</span>
   </li>
   <li>
   <Link to="/admin/category/index">
    <i class="fa fa-star" aria-hidden="true"></i>
     <span class="links_name">Category</span>
   </Link>
   <span class="tooltip">Category</span>
 </li>
   <li>
     <Link to="/admin/menuitem">
      <i class="fa fa-th" aria-hidden="true"></i>
       <span class="links_name">Menu Item</span>
     </Link>
     <span class="tooltip">Menu Item</span>
   </li>

   <li>
     <Link to="/withdraw">
      <i class="fa fa-th" aria-hidden="true"></i>
       <span class="links_name">Payment</span>
     </Link>
     <span class="tooltip">Payment</span>
   </li>

   <li>
     <Link to="/transaction">
      <i class="fa fa-th" aria-hidden="true"></i>
       <span class="links_name">Analytics</span>
     </Link>
     <span class="tooltip">Analytics</span>
   </li>

  
 
   <li class="profile">
       <div class="profile-details">
       <Link to="/admin/profile">
       <i class="fa fa-cog" aria-hidden="true"></i>

         <div class="name_job">
           <div class="name">user name</div>
           <div class="job">{props.user?.name}</div>
         </div>
         </Link>
       </div>
       <i class="fa fa-sign-out" id ="log_out" onClick={()=>logout()} aria-hidden="true"></i>
   </li>
  </ul>
</div>

    )
}

export default Sidebar
