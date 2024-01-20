import React from 'react';
import { NavLink } from "react-router-dom";

export const Navbar = () => {
    return (
        <div >
            <nav className='navbar navbar-expand-lg navbar-dark main-color py-3'>
                <div className='container-fluid'>
                <img src={require('../../Images/PublicImages/logodlafacebook.jpg')} style={{ maxWidth: '80px', maxHeight: '80px' }} alt='Logo' className='navbar-logo' />
                    <span className='navbar-brand' style={{ color: 'gold' }}>Low-Key Barbershop</span>
                    <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNavDropdown'
                        aria-controls='navbarNavDropdown' aria-expanded='false' aria-label='Toggle Navigation'>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse' id='navbarNavDropdown'>
                        <ul className='navbar navbar-nav'>
                            <li className='nav-item'>
                                <NavLink className='nav-link' to="/home">Home</NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink className='nav-link' to="/barbers">Barbers</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}