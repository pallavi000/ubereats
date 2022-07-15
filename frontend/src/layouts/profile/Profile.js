import React from 'react'
import { Link } from 'react-router-dom'
import profile from '../../images/profile.jpeg'


function Profile() {

    const user = JSON.parse(localStorage.getItem('user'))
  return (
    <div className='frontend-profile-section'>
    <div className='row'>
        <div className='col-md-3'>
            <div className='profile-sidebar'>
                <div className='profile-side-item'>Profile Setting</div>
                <div className='profile-side-item'>Order</div>
            </div>
        </div>
        <div className='col-md-9'>
            <div className='profile-setting-header d-flex align-items-center'>
                <div className='profile-setting-image'>
                    <img src={profile} className="img-fluid"/>
                </div>
                <div>
                <div className='profile-setting-name'>Pallavi Bhattarai</div>
                <div className='profile-setting-phone'>9844778587</div>
                </div>
              
            </div>
            <form className='profile-setting-form'>
                <div className='form-group'>
                <label className='form-label d-block'>Name</label>
                    <input type="text" className='profile-input' defaultValue={user.name}></input>
                </div>
                <div className='form-group'>
                <label className='form-label d-block'>Email</label>
                    <input type="email" className='profile-input' defaultValue={user.email}></input>
                </div>


                <button className='profile-update-btn'>Save Changes</button>

            </form>

            <Link className='profile-change-password' to="/change-password">Change Password</Link>

        </div>
    </div>

    </div>
  )
}

export default Profile