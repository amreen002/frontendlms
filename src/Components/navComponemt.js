import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
const { REACT_APP_API_ENDPOINT ,REACT_APP_API_IMG} = process.env;
function NavAllPages(token) {
    const datatoken =localStorage.getItem('datatoken');
    const coursedatafetch =JSON.parse(datatoken)
    const handleLogout = async () => {
        try {
            await axios.post(`${REACT_APP_API_ENDPOINT}/logout`); // Send logout request to backend
            localStorage.removeItem('token'); // Remove token from local storage or state
            localStorage.removeItem('datatoken'); 
            window.location.href = "/"
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (

        <nav
            class="cus_ndash layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
            id="layout-navbar"
        >
            <div class="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
                <a class="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
                    <i class="bx bx-menu bx-sm"></i>
                </a>
            </div>

            <div class="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
                {/*           <!-- Search --> */}
                <div class="navbar-nav align-items-center">
                    <div class="nav-item d-flex align-items-center">
                        <i class="bx bx-search fs-4 lh-0"></i>
                        <input
                            type="text"
                            class="form-control border-0 shadow-none"
                            placeholder="Search..."
                            aria-label="Search..."
                        />
                    </div>
                </div>
                {/*           <!-- /Search --> */}

                <ul class="navbar-nav flex-row align-items-center ms-auto">


                    {/*     <!-- User --> */}
                    <li class="nav-item navbar-dropdown dropdown-user dropdown">
                        <a class="nav-link dropdown-toggle hide-arrow show" href="#" data-bs-toggle="dropdown">
                            <div class="avatar avatar-online">
                                <img src={`${REACT_APP_API_IMG}/uploads/images/${coursedatafetch.image}`} alt class="w-px-40 h-12px  rounded-circle" />
                            </div>
                        </a>

                        <ul class="dropdown-menu dropdown-menu-end">
                            <ul>

                                <li class="menu-item active">
                                    <a className="menu-link">
                                        <Link to={`/accountusers`} className="navbar-brand">
                                            <div className="d-flex">
                                                <div className="flex-shrink-0 me-3">
                                                    <div className="avatar avatar-online">
                                                        <img src={`${REACT_APP_API_IMG}/uploads/images/${coursedatafetch.image}`} alt="avatar" className="w-px-40 h-12px  rounded-circle" />
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1">

                                                    { coursedatafetch.Role && coursedatafetch.Role.Name == "Super Admin" || coursedatafetch.Role && coursedatafetch.Role.Name== "Admin" || coursedatafetch.Role && coursedatafetch.Role.Name == "Sale Department" || coursedatafetch.Role && coursedatafetch.Role.Name == "Telecaller Department" || coursedatafetch.Role && coursedatafetch.Role.Name== "Telecaller Team" ||coursedatafetch.Role && coursedatafetch.Role.Name == "Front Desk" ||coursedatafetch.Role && coursedatafetch.Role.Name == "Counselor Department" || coursedatafetch.Role && coursedatafetch.Role.Name == "Account Department" || coursedatafetch.Role && coursedatafetch.Role.Name == "Administrator"
                                                        ? (<span className="fw-semibold d-block">{coursedatafetch.roleName}</span>) : ( <span className="fw-semibold d-block">{coursedatafetch.name}</span>)}


                                                    <small className="text-muted">{coursedatafetch.Role && coursedatafetch.Role.Name}</small>
                                                </div>
                                            </div>
                                        </Link>
                                    </a>
                                </li>

                            </ul>

                            <li>
                                <div class="dropdown-divider"></div>
                            </li>
                            <li>
                                <a className="dropdown-item"><Link to={`/userviews/${coursedatafetch.id}`}><i class="bx bx-user me-2"></i>
                                    <span class="align-middle">My Profile</span> </Link></a> 
                                    

                            </li>
                            <li>
                                <a class="dropdown-item" href="#">
                                    <i class="bx bx-cog me-2"></i>
                                    <span class="align-middle">Settings</span>
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="#">
                                    <span class="d-flex align-items-center align-middle">
                                        <i class="flex-shrink-0 bx bx-credit-card me-2"></i>
                                        <span class="flex-grow-1 align-middle">Billing</span>
                                        <span class="flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20">4</span>
                                    </span>
                                </a>
                            </li>
                            <li>
                                <div class="dropdown-divider"></div>
                            </li>
                            <li>
                                <a className="dropdown-item" onClick={handleLogout}>
                                    <i className="bx bx-power-off me-2"></i>
                                    <span className="align-middle">Log Out</span>
                                </a>
                            </li>
                        </ul>

                    </li>
                    {/*     <!--/ User --> */}
                </ul>
            </div>
        </nav>
    )
}
export default NavAllPages; 