import React, { useEffect } from 'react'
import {Link,useNavigate,useLocation} from 'react-router-dom'
import $ from 'jquery'

function Sidebar(props) {

const navigate = useNavigate();

  function logout(e){
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/');
  }
   
    
  
  useEffect(() => {
    const body = document.querySelector('body');
    const  sidebar = body.querySelector('nav');
    const  toggle = body.querySelector(".toggle");
    toggle.addEventListener("click" , () =>{
      sidebar.classList.toggle("close");
    })
  }, [])
  




  function toggleSidebar() {
    const  sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle("close");
  }




    return (
      <div class="sidebar close">
      <header>
          <div class="image-text">
              <span class="image">
                  <img src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/31ee382bd0e6ed84.svg" alt=""/>
              </span>

              <div class="text logo-text">
                  <span class="name">UberEats</span>
                  <span class="profession">{props.user.name}</span>
              </div>
          </div>

          <i class='bx bx-chevron-right toggle' onClick={() => toggleSidebar()}></i>
      </header>

      <div class="menu-bar">
          <div class="menu">

              

              <ul class="menu-links">
                  <li class="sidebar-nav-links">
                      <Link to="/dashboard">
                          <i class='bx bx-home-alt icon' ></i>
                          <span class="text nav-text">Dashboard</span>
                      </Link>
                  </li>

                  <li class="sidebar-nav-links">
                      <Link to="/admin/menu">
                          <i class='bx bx-bar-chart-alt-2 icon' ></i>
                          <span class="text nav-text">Menu</span>
                      </Link>
                  </li>

                  <li class="sidebar-nav-links">
                      <Link to="/admin/category">
                          <i class='bx bx-bell icon'></i>
                          <span class="text nav-text">Categories</span>
                      </Link>
                  </li>

                  <li class="sidebar-nav-links">
                      <Link to="/admin/menu-item">
                          <i class='bx bx-pie-chart-alt icon' ></i>
                          <span class="text nav-text">Menu Items</span>
                      </Link>
                  </li>

                  <li class="sidebar-nav-links">
                      <Link to="#">
                          <i class='bx bx-heart icon' ></i>
                          <span class="text nav-text">Payment Methods</span>
                      </Link>
                  </li>

                  <li class="sidebar-nav-links">
                      <Link to="#">
                          <i class='bx bx-wallet icon' ></i>
                          <span class="text nav-text">Analytics</span>
                      </Link>
                  </li>

              </ul>
          </div>

          <div class="bottom-content">
              <li class="">
                  <a role={'button'} onClick={(e)=>logout(e)}>
                      <i class='bx bx-log-out icon' ></i>
                      <span class="text nav-text">Logout</span>
                  </a>
              </li>

              
              
          </div>
      </div>

  </div>


    )
}

export default Sidebar
