import React from 'react'
import {BrowserRouter as Router,Routes,Route, useLocation} from 'react-router-dom'
import axios from 'axios'
import Home from './layouts/Home';
import Header from './global/Header';
import SignUp from './auth/SignUp';
import Login from './auth/Login';
import Dashboard from './admin/Dashboard/Dashboard';
import CompanyProtected from './auth/protected/CompanyProtected'
import CompanyRegister from './auth/CompanyRegister';
import CategoryIndex from './admin/category/CategoryIndex';
import CategoryCreate from './admin/category/CategoryCreate';
import CategoryEdit from './admin/category/CategoryEdit';
import MenuIndex from './admin/menu/MenuIndex';
import CreateMenu from './admin/menu/CreateMenu';
import EditMenu from './admin/menu/EditMenu';
import MenuItemIndex from './admin/menuItem.js/MenuItemIndex';
import CreateMenuItem from './admin/menuItem.js/CreateMenuItem';
import EditMenuItem from './admin/menuItem.js/EditMenuItem';
import CategoryPage from './layouts/CompanyPage';
import CompanyPage from './layouts/CompanyPage';
import Footer from './global/Footer';

axios.defaults.baseURL="http://localhost:5000/api"

function App() {

    let user ={}
    if(localStorage.getItem('user')){
       user = JSON.parse(localStorage.getItem('user'))
    }


  return (
   <Router>
   <Header/>
    <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/sign-up" element={<SignUp/>}/>
      <Route exact path="/login" element={<Login/>}/>
      <Route exact path="/company/register" element={<CompanyRegister/>}/>
      <Route exact path="/company-page/:id" element={<CompanyPage/>}/>

      <Route exact path="/dashboard" element={<CompanyProtected/>}>
        <Route exact path="/dashboard" element={<Dashboard/>}/>
    </Route>

    <Route exact path="/admin/category" element={<CompanyProtected/>}>
        <Route exact path="/admin/category" element={<CategoryIndex/>}/>
    </Route>

    <Route exact path="/admin/category/create" element={<CompanyProtected/>}>
        <Route exact path="/admin/category/create" element={<CategoryCreate/>}/>
    </Route>
    <Route exact path="/admin/category/edit/:id" element={<CompanyProtected/>}>
        <Route exact path="/admin/category/edit/:id" element={<CategoryEdit/>}/>
    </Route>

    <Route exact path="/admin/menu" element={<CompanyProtected/>}>
        <Route exact path="/admin/menu" element={<MenuIndex/>}/>
    </Route>

    <Route exact path="/admin/menu/create" element={<CompanyProtected/>}>
        <Route exact path="/admin/menu/create" element={<CreateMenu/>}/>
    </Route>

    <Route exact path="/admin/menu/edit/:id" element={<CompanyProtected/>}>
        <Route exact path="/admin/menu/edit/:id" element={<EditMenu/>}/>
    </Route>

    
    <Route exact path="/admin/menu-item" element={<CompanyProtected/>}>
        <Route exact path="/admin/menu-item" element={<MenuItemIndex/>}/>
    </Route>

    <Route exact path="/admin/menu-item/create" element={<CompanyProtected/>}>
        <Route exact path="/admin/menu-item/create" element={<CreateMenuItem/>}/>
    </Route>

    <Route exact path="/admin/menu-item/edit/:id" element={<CompanyProtected/>}>
        <Route exact path="/admin/menu-item/edit/:id" element={<EditMenuItem/>}/>
    </Route>



    </Routes>
    {user.role!="company"?(
        <Footer/>
    ):(null)}
   </Router>
  );
}

export default App;
