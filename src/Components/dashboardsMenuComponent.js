import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
const { REACT_APP_API_ENDPOINT } = process.env;
function DashBoardMenu(onLogout) {

    const [table, setTable] = useState("");
    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/userwisedata`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTable(response.data);
            }// Updated state variable
        } catch (err) {
            console.log(err.response);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    //Dropdown Navigation
    const [activeService, setOpenDropdown] = useState(null);

    // Function to toggle a specific dropdown
    const toggleDropdown = (serviceName) => {
        setOpenDropdown(activeService === serviceName ? '' : serviceName);
    };


    //End
    return (

        <aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu">
            <div class="app-brand demo">
                <Link to="/dashboard" class="app-brand-link">
                    <span class="app-brand-logo demo">
                    </span>
                    <span class=" demo menu-text fw-bolder">
                        <div class=" text-center">
                            <img src="../assets/img/dashboard.png" alt className='img-fluid' />
                        </div></span>
                </Link>

                <a href="javascript:void(0);" class="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
                    <i class="bx bx-chevron-left bx-sm align-middle"></i>
                </a>
            </div>

            <div class="menu-inner-shadow"></div>

            <ul class="menu-inner py-1">
                {/*    <!-- Dashboard --> */}
                <li class="menu-item active">
                    <Link to="/dashboard" class="menu-link dash">
                        <i class="menu-icon tf-icons bx bx-home-circle"></i>
                        <div data-i18n="Analytics">Dashboard</div>
                    </Link>
                </li>

                {/* Render  menu Role */}
                {table.Role && table.Role.Name === 'Super Admin' && (
                    <li className={`menu-item ${activeService === 'Super Admin' ? 'active' : ''} show_project_web`}>
                        <a href="#" onClick={() => toggleDropdown('dropdownrole')} className="menu-link  menu-toggle" id="dropdownMenuButton">
                            <i className="menu-icon tf-icons bx bx-check-shield"></i>
                            <div data-i18n="Layouts">Role</div>
                        </a>
                        {/* Step 4: Conditionally render dropdown based on state */}
                        {activeService === 'dropdownrole' && (
                            <ul className="" aria-labelledby="dropdownMenuButton">
                                {/* Dropdown content */}
                                <li className="menu-item">
                                    <Link to="/role" className="menu-link">
                                        <i className='menu-icon bx bx-list-ul'></i>
                                        <div data-i18n="Without menu">Role List</div>
                                    </Link>
                                </li>
                                <li className="menu-item">
                                    <Link to="#" className="menu-link">
                                        <i className='menu-icon bx bx-list-ul'></i>
                                        <div data-i18n="Without menu">Role Permissions</div>
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                )}
                {/* Render  menu Courese */}
                {table.Role && table.Role.Name === 'Super Admin' && (
                    <li className={`menu-item ${activeService === 'Super Admin' ? 'active' : ''} show_project_web`}>
                        <a href="#" onClick={() => toggleDropdown('dropdowncourese')} className="menu-link  menu-toggle" id="dropdownMenuButton">
                            <i className='menu-icon bx bxl-discourse'></i>
                            <div data-i18n="Layouts">Class / Course List</div>
                        </a>
                        {/* Step 4: Conditionally render dropdown based on state */}
                        {activeService === 'dropdowncourese' && (
                            <ul className="" aria-labelledby="dropdownMenuButton">
                                <li className="menu-item">
                                    <Link to="/courses" className="menu-link">
                                        <i className='menu-icon bx bx-list-ul'></i>
                                        <div data-i18n="Without menu">Class / Course List</div>
                                    </Link>
                                </li>

                            </ul>
                        )}
                    </li>
                )}
                {/* Render Lead menu for Sale Department */}
                {['Super Admin', 'Admin', 'Counselor Department'].includes(table.Role && table.Role.Name) && (
                    <li className={`menu-item ${activeService === table.Role && table.Role.Name ? 'active' : ''} show_project_web`}>
                        <a href="#" onClick={() => toggleDropdown('dropdownsaledepartment')} className="menu-link menu-toggle" id="dropdownMenuButton">
                            <i className="menu-icon tf-icons bx bx-layout"></i>
                            <div data-i18n="Layouts">Leads</div>
                        </a>
                        {/* Step 4: Conditionally render dropdown based on state */}
                        {activeService === 'dropdownsaledepartment' && (
                            <ul className="" aria-labelledby="dropdownMenuButton">
                                {/* Dropdown content */}
                                {/*      <li className="menu-item">
                                <Link to="/addsaleteam" className="menu-link">
                                    <i className='bx bx-list-ul'></i>
                                    <div data-i18n="Without menu">Add Lead</div>
                                </Link>
                            </li> */}
                                <li className="menu-item">
                                    <Link to="/addsaleteam" className="menu-link">
                                        <i className='menu-icon bx bx-list-ul'></i>
                                        <div data-i18n="Without menu">Leads List</div>
                                    </Link>
                                </li>

                            </ul>
                        )}
                    </li>
                )}

                {/* Render Lead menu for Enquery */}
                {['Super Admin', 'Admin', 'Counselor Department'].includes(table.Role && table.Role.Name) && (
                    <li className={`menu-item ${activeService === table.Role && table.Role.Name ? 'active' : ''} show_project_web`}>
                        <a href="#" onClick={() => toggleDropdown('dropdownenquery')} className="menu-link menu-toggle" id="dropdownMenuButton">
                            <i className="menu-icon tf-icons bx bx-layout"></i>
                            <div data-i18n="Layouts">Enquiry</div>
                        </a>
                        {/* Step 4: Conditionally render dropdown based on state */}
                        {activeService === 'dropdownenquery' && (
                            <ul className="" aria-labelledby="dropdownMenuButton">
                                <li className="menu-item">
                                    <Link to="/frontdesk" className="menu-link">
                                        <i className='menu-icon bx bx-add-to-queue'></i>
                                        <div data-i18n="Without menu">Add Enquiry</div>
                                    </Link>
                                </li>

                            </ul>
                        )}
                        {activeService === 'dropdownenquery' && (
                            <ul className="" aria-labelledby="dropdownMenuButton">
                                <li className="menu-item">
                                    <Link to="/frontdesklist" className="menu-link">
                                        <i className='menu-icon bx bx-list-ul'></i>
                                        <div data-i18n="Without menu">Enquiry List</div>
                                    </Link>
                                </li>

                            </ul>
                        )}
                    </li>
                )}
                {/* Render Lead menu for Sale Department */}
                {/* {['Super Admin', 'Admin', 'Counselor Department'].includes(table.Role && table.Role.Name) && (
                    <li className={`menu-item ${activeService === table.Role && table.Role.Name ? 'active' : ''} show_project_web`}>
                        <a href="#" onClick={() => toggleDropdown('dropdownmangedlead')} className="menu-link menu-toggle" id="dropdownMenuButton">
                            <i className="menu-icon tf-icons bx bx-layout"></i>
                            <div data-i18n="Layouts">Managed Leads </div>
                        </a>
           
                        {activeService === 'dropdownmangedlead' && (
                            <ul className="" aria-labelledby="dropdownMenuButton">
                                <li className="menu-item">
                                    <Link to="/mangedlead" className="menu-link">
                                        <i className='menu-icon bx bx-list-ul'></i>
                                        <div data-i18n="Without menu">Leads</div>
                                    </Link>
                                </li>

                            </ul>
                        )}
                    </li>
                )} */}

                {/* Render menu for Telecaller Department */}
                {/* {['Super Admin', 'Admin'].includes(table.Role && table.Role.Name) && (
                    <li className={`menu-item ${activeService === table.Role && table.Role.Name ? 'active' : ''} show_project_web`}>
                        <a href="#" onClick={() => toggleDropdown('dropdowntelecallerdepartment')} className="menu-link menu-toggle " id="dropdownMenuButton">
                            <i className="menu-icon tf-icons bx bx-layout "></i>
                            <div data-i18n="Layouts">Telecaller Department</div>
                        </a>
                        {activeService === 'dropdowntelecallerdepartment' && (
                            <ul className="" aria-labelledby="dropdownMenuButton">

                                <li className="menu-item">
                                    <Link to="/telecaller" className="menu-link">
                                        <i className='menu-icon bx bx-list-ul'></i>
                                        <div data-i18n="Without menu">Lead Assign</div>
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                )} */}

                {/* Render menu for Telecaller Team */}
                {/*    {['Super Admin', 'Admin','Counselor Department'].includes(table.Role && table.Role.Name) && (
                    <li className={`menu-item ${activeService === table.Role && table.Role.Name ? 'active' : ''} show_project_web`}>
                        <a href="#" onClick={() => toggleDropdown('dropdowntelecallerteam')} className="menu-link  menu-toggle" id="dropdownMenuButton">
                            <i className="menu-icon tf-icons bx bx-check-shield"></i>
                            <div data-i18n="Layouts">Telecaller Team</div>
                        </a>
                        {activeService === 'dropdowntelecallerteam' && (
                            <ul className="" aria-labelledby="dropdownMenuButton">
                                <li className="menu-item">
                                    <Link to="/telecallerteam" className="menu-link">
                                        <i className='menu-icon bx bx-list-ul'></i>
                                        <div data-i18n="Without navbar">View Assign Lead</div>
                                    </Link>
                                </li>

                            </ul>
                        )}
                    </li>
                )} */}
                {/* Render  menu Front Desk */}
                {/*     {['Super Admin', 'Admin','Counselor Department'].includes(table.Role && table.Role.Name) && (
                    <li className={`menu-item ${activeService === table.Role && table.Role.Name ? 'active' : ''} show_project_web`}>
                        <a href="#" onClick={() => toggleDropdown('dropdownfrontdesk')} className="menu-link  menu-toggle" id="dropdownMenuButton">
                            <i class='menu-icon  bx bx-credit-card-front'></i>
                            <div data-i18n="Layouts">Front Desk</div>
                        </a>

                        {activeService === 'dropdownfrontdesk' && (
                            <ul className="" aria-labelledby="dropdownMenuButton">
                                <li className="menu-item">
                                    <Link to="/frontdesk" className="menu-link">
                                        <i className='menu-icon bx bx-list-ul'></i>
                                        <div data-i18n="Without menu">Lead List</div>
                                    </Link>
                                </li>
                                <li className="menu-item">
                                    <Link to="/frontdesklist" className="menu-link">
                                        <i className='menu-icon bx bx-list-ul'></i>
                                        <div data-i18n="Without menu">Enquery List</div>
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                )} */}

                {/* Render  menu Counselor Department */}
                {/*   {['Super Admin', 'Counselor Department'].includes(table.Role && table.Role.Name) && (
                    <li className={`menu-item ${activeService === table.Role && table.Role.Name ? 'active' : ''} show_project_web`}>
                        <a href="#" onClick={() => toggleDropdown('dropdowncounselodepartmentsss')} className="menu-link  menu-toggle" id="dropdownMenuButton">
                            <i class='menu-icon bx bx-credit-card-front'></i>
                            <div data-i18n="Layouts">Counselor Department</div>
                        </a>
                        {activeService === 'dropdowncounselodepartmentsss' && (
                            <ul className="" aria-labelledby="dropdownMenuButton">
                                <li className="menu-item">
                                    <Link to="/counselordepartment" className="menu-link">
                                        <button className="btn btn-sm btn-icon">
                                            <i className='menu-icon bx bx-list-ul'></i>
                                            <div data-i18n="Without menu">Enquery Detail</div>
                                        </button>
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                )} */}
                {/* Render Users menu based on user role */}
                {['Super Admin', 'Admin'].includes(table.Role && table.Role.Name) && (
                    <li className={`menu-item ${activeService === table.Role && table.Role.Name ? 'active' : ''} show_project_web`}>
                        <a href="#" onClick={() => toggleDropdown('dropdownalluser')} className="menu-link menu-toggle" id="dropdownMenuButton">
                            <i className="menu-icon tf-icons bx bx-user"></i>
                            <div data-i18n="Layouts">Users</div>
                        </a>

                        {/* Step 4: Conditionally render dropdown based on state */}
                        {activeService === 'dropdownalluser' && (
                            <ul className="" aria-labelledby="dropdownMenuButton">
                                {/* Dropdown content */}
                                <li className="menu-item">
                                    <Link to="/userlist" className="menu-link">
                                        <i className='menu-icon bx bx-list-ul'></i>
                                        <div data-i18n="Without navbar">Users List</div>
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                )}

                {/* Render  menu Role */}
                {['Super Admin', 'Administrator'].includes(table.Role && table.Role.Name) && (
                    <li className={`menu-item  ${activeService === table.Role && table.Role.Name ? 'active' : ''} show_project_web`}>
                        <a href="#" onClick={() => toggleDropdown('dropdowninstructor')} className="menu-link  menu-toggle " id="dropdownMenuButton">
                            <i className='menu-icon bx bx-user bx-spain'></i>
                            <div data-i18n="Layouts">Faculty</div>
                        </a>
                        {/* Step 4: Conditionally render dropdown based on state */}
                        {activeService === 'dropdowninstructor' && (
                            <ul className="" aria-labelledby="dropdowninstructor">
                                {/* Dropdown content */}
                                <li className="menu-item">
                                    <Link to="/teachers" className="menu-link">
                                        <i className='menu-icon bx bx-list-ul bx-fade-left'></i>
                                        <div data-i18n="Without menu">All Faculty</div>
                                    </Link>
                                </li>
                                <li className="menu-item">
                                    <Link to="/addteachers" className="menu-link">
                                        <i className='menu-icon bx bx-add-to-queue'></i>
                                        <div data-i18n="Without menu">Add Faculty</div>
                                    </Link>
                                </li>
                            </ul>
                        )}
                        <a href="#" onClick={() => toggleDropdown('dropdowncourese')} className="menu-link  menu-toggle" id="dropdownMenuButton">
                            <i className="menu-icon tf-icons bx bxs-graduation bx-tada-hover"></i>
                            <div data-i18n="Layouts">Boards</div>
                        </a>

                        {/* Step 4: Conditionally render dropdown based on state */}
                        {activeService === 'dropdowncourese' && (
                            <ul className="" aria-labelledby="dropdownMenuButton">
                                {/* Dropdown content */}
                                <li className="menu-item">
                                    <Link to="/coursecategory" className="menu-link">
                                        <i className='menu-icon bx-tada bx bxs-report'></i>
                                        <div data-i18n="Without menu">Boards Category</div>
                                    </Link>
                                </li>
                                <li className="menu-item">
                                    <Link to="/courses" className="menu-link">
                                        <i className='menu-icon bx bx-list-ul'></i>
                                        <div data-i18n="Without menu">All Classes</div>
                                    </Link>
                                </li>
                                <li className="menu-item">
                                    <Link to="/courses" className="menu-link">
                                        <i className='menu-icon bx bx-add-to-queue'></i>
                                        <div data-i18n="Without menu">Add Class / Course</div>
                                    </Link>
                                </li>
                                <li className="menu-item">
                                    <Link to="/coursesreports" className="menu-link">
                                        <i className='menu-icon bx-tada bx bxs-report'></i>
                                        <div data-i18n="Without menu">Class / Course Report</div>
                                    </Link>
                                </li>

                                <li className="menu-item">
                                    <Link to="/topic" className="menu-link">
                                        <i className='menu-icon bx-tada bx bxs-report'></i>
                                        <div data-i18n="Without menu">Subject</div>
                                    </Link>
                                </li>
                                <li className="menu-item">
                                    <Link to="/lession" className="menu-link">
                                        <i className='menu-icon bx-tada bx bxs-report'></i>
                                        <div data-i18n="Without menu">Modules</div>
                                    </Link>
                                </li>
                                <li className="menu-item">
                                    <Link to="/video" className="menu-link">
                                        <i className='menu-icon bx-tada bx bxs-report'></i>
                                        <div data-i18n="Without menu">Content</div>
                                    </Link>
                                </li>
                            </ul>
                        )}
                        <a href="#" onClick={() => toggleDropdown('dropdownbatches')} className="menu-link  menu-toggle" id="dropdownMenuButton">
                            <i className="menu-icon tf-icons bx bx-time-five bx-spin"></i>
                            <div data-i18n="Layouts">Batches</div>
                        </a>
                        {activeService === 'dropdownbatches' && (
                            <ul className="" aria-labelledby="dropdownMenuButton">
                                {/* Dropdown content */}

                                <li className="menu-item">
                                    <Link to="/batches" className="menu-link">
                                        <i className='menu-icon bx bx-list-ul'></i>
                                        <div data-i18n="Without menu">All Batches</div>
                                    </Link>
                                </li>
                                <li className="menu-item">
                                    <Link to="/batches" className="menu-link">
                                        <i className='menu-icon bx bx-add-to-queue'></i>
                                        <div data-i18n="Without menu">add Batches</div>
                                    </Link>
                                </li>
                            </ul>
                        )}

                        <a href="#" onClick={() => toggleDropdown('dropdownstudent')} className="menu-link  menu-toggle" id="dropdownMenuButton">
                            <i className="menu-icon tf-icons bx bxs-group bx-tada-hover"></i>
                            <div data-i18n="Layouts">Student</div>
                        </a>

                        {/* Step 4: Conditionally render dropdown based on state */}
                        {activeService === 'dropdownstudent' && (
                            <ul className="" aria-labelledby="dropdownMenuButton">
                                {/* Dropdown content */}
                                <li className="menu-item">
                                    <Link to="/students" className="menu-link">
                                        <i className='menu-icon bx bx-list-ul'></i>
                                        <div data-i18n="Without menu">All Student</div>
                                    </Link>
                                </li>
                                <li className="menu-item">
                                    <Link to="/students" className="menu-link">
                                        <i className='menu-icon bx bx-add-to-queue'></i>
                                        <div data-i18n="Without menu">Add Student</div>
                                    </Link>
                                </li>
                                <li className="menu-item">
                                    <Link to="/studentsreports" className="menu-link">
                                        <i className='menu-icon bx bxs-report'></i>
                                        <div data-i18n="Without menu">Student Report</div>
                                    </Link>
                                </li>
                            </ul>
                        )}

                        <a href="#" onClick={() => toggleDropdown('dropdownquize')} className="menu-link  menu-toggle" id="dropdownMenuButton">
                            <i className="menu-icon tf-icons bx bxs-envelope bx-tada-hover"></i>
                            <div data-i18n="Layouts">Quizzes</div>
                        </a>

                        {/* Step 4: Conditionally render dropdown based on state */}
                        {activeService === 'dropdownquize' && (
                            <ul className="" aria-labelledby="dropdownMenuButton">
                                {/* Dropdown content */}
                                <li className="menu-item">
                                    <Link to="/quizzes" className="menu-link">
                                        <i className='menu-icon bx bx-list-ul'></i>
                                        <div data-i18n="Without menu">All Quize </div>
                                    </Link>
                                </li>
                                <li className="menu-item">
                                    <Link to="/quizzes" className="menu-link">
                                        <i className='menu-icon bx bx-add-to-queue'></i>
                                        <div data-i18n="Without menu">Add Quize</div>
                                    </Link>
                                </li>

                            </ul>
                        )}
                        <a href="#" onClick={() => toggleDropdown('dropdowquestion')} className="menu-link  menu-toggle" id="dropdownMenuButton">
                            <i className="menu-icon tf-icons bx bx-question-mark bx-tada-hover"></i>

                            <div data-i18n="Layouts">Question</div>
                        </a>
                        {activeService === 'dropdowquestion' && (
                            <ul className="" aria-labelledby="dropdownMenuButton">

                                <li className="menu-item">
                                    <Link to="/question" className="menu-link">
                                        <i className='menu-icon bx bx-list-check'></i>
                                        <div data-i18n="Without menu">All Question</div>
                                    </Link>
                                </li>
                                <li className="menu-item">
                                    <Link to="/addquestions" className="menu-link">
                                        <i className='menu-icon bx bxs-add-to-queue'></i>
                                        <div data-i18n="Without menu">Add Question</div>
                                    </Link>
                                </li>
                                <li className="menu-item">
                                    <Link to="/questioncategory" className="menu-link">
                                        <i className='menu-icon bx bxs-category'></i>
                                        <div data-i18n="Without menu">Question Category</div>
                                    </Link>
                                </li>
                            </ul>
                        )}
                        {/*  <a href="#" onClick={() => toggleDropdown('dropdownquize')} className="menu-link  menu-toggle" id="dropdownMenuButton">
                            <i className="menu-icon tf-icons bx bxs-envelope"></i>
                            <div data-i18n="Layouts">Assignments Activity</div>
                        </a>
 */}
                        {/* Step 4: Conditionally render dropdown based on state */}
                        {activeService === 'dropdownquize' && (
                            <ul className="" aria-labelledby="dropdownMenuButton">
                                {/* Dropdown content */}
                                <li className="menu-item">
                                    <Link to="/courses" className="menu-link">
                                        <i className='menu-icon bx bx-list-ul'></i>
                                        <div data-i18n="Without menu">All Activity </div>
                                    </Link>
                                </li>

                                <li className="menu-item">
                                    <Link to="#" className="menu-link">
                                        <i className='menu-icon bx bx-list-check'></i>
                                        <div data-i18n="Without menu">All Question</div>
                                    </Link>
                                </li>

                            </ul>
                        )}
                    </li>)
                }
            </ul>
        </aside>
    )
}
export default DashBoardMenu;