import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
const { REACT_APP_API_ENDPOINT, REACT_APP_API_IMG } = process.env;
const Sidebar = () => {
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
    const datatoken = localStorage.getItem('datatoken');
    const table = JSON.parse(datatoken)

    //Dropdown Navigation
    const [activeService, setOpenDropdown] = useState(null);

    // Function to toggle a specific dropdown
    const toggleDropdown = (serviceName) => {
        setOpenDropdown(activeService === serviceName ? '' : serviceName);
    };

    return (

        <div className="col-lg-3 rts-sticky-column-item">

            <div className="left-sindebar-dashboard theiaStickySidebar">
                {table.Role && table.Role.Name === 'Instructor' ? (
                    <div>
                        <div className="dashboard-left-single-wrapper">

                            <Link to={`/dashboard`} className="single-item active">
                                <i className="fa-light fa-house"></i>
                                <p>Dashboard</p>
                            </Link>

                            <Link to={`/user-my-profile/${table.id}`} className="single-item">
                                <i className="fa-regular fa-user"></i>
                                <p>My Profile</p>
                            </Link>

                            {/* <a href="enroll-course.html" className="single-item">
                                <i className="fa-light fa-graduation-cap"></i>
                                <p>Enrolled Class</p>
                            </a> */}



                            <Link to={`/studentaddreview`} className="single-item">
                                <i className="fa-regular fa-star"></i>
                                <p>Reviews</p>
                            </Link>
                            <Link to={`/instructor/addquize`} className="single-item">
                                <i className="fa-sharp fa-light fa-bullseye-pointer"></i>
                                <p>My Quiz Add</p>
                            </Link>

                            <Link to={`/instructor/viewquize`} className="single-item">
                                <i className="fa-regular fa-circle-question"></i>
                                <p>Question & Answer</p>
                            </Link>

                            <Link to={`/calender`} className="single-item">
                                <i className="fa-light fa-calendar-days"></i>
                                <p>Calendar</p>
                            </Link>

                        </div>

                        <div className="dashboard-left-single-wrapper mt--40">
                            <h4 className="title mb--5">Instructor</h4>

                            <Link to={`/lernerenrollcourse`} className="single-item">
                                <i className="fa-light fa-book"></i>
                                <p>My Class</p>
                            </Link>

                            <Link to={`/instructor/assignment`} className="single-item">
                                <i className="fa-regular fa-page"></i>
                                <p>Assignments</p>
                            </Link>

                            <Link to={`/announcement`} className="single-item">
                                <i className="fa-solid fa-megaphone"></i>
                                <p>Announcements</p>
                            </Link>


                        </div>

                        <div className="dashboard-left-single-wrapper bbnone mt--40">
                            <h4 className="title mb--5">User</h4>

                            <Link to={`/studentsetting`} className="single-item">
                                <i className="fa-sharp fa-regular fa-gear"></i>
                                <p>Settings</p>
                            </Link>
                            <a className="single-item" onClick={handleLogout}>
                                <i className="fa-light fa-right-from-bracket"></i>
                                <p>Logout</p>
                            </a>


                        </div>
                    </div>
                ):(null)}
                {table.Role && table.Role.Name === 'Student' ? (
                    <div>
                        <div className="dashboard-left-single-wrapper">

                            <Link to={`/dashboard`} className="single-item active">
                                <i className="fa-light fa-house"></i>
                                <p>Dashboard</p>
                            </Link>

                            <Link to={`/user-my-profile/${table.id}`} className="single-item">
                                <i className="fa-regular fa-user"></i>
                                <p>My Profile</p>
                            </Link>

                            <Link to={`/student/addquestion`} className="single-item">
                                <i className="fa-sharp fa-light fa-bullseye-pointer"></i>
                                <p>My Quiz Attempts</p>
                            </Link>


                        </div>
                        <div className="dashboard-left-single-wrapper mt--40">
                            <h4 className="title mb--5">Students</h4>

                            <Link to={`/lernerenrollcourse`} className="single-item">
                                <i className="fa-light fa-book"></i>
                                <p>My Class / Course</p>
                            </Link>



                        </div>
                        <div className="dashboard-left-single-wrapper bbnone mt--40">
                            <h4 className="title mb--5">User</h4>

                            <Link to={`/studentsetting`} className="single-item">
                                <i className="fa-sharp fa-regular fa-gear"></i>
                                <p>Settings</p>
                            </Link>
                            <a className="single-item" onClick={handleLogout}>
                                <i className="fa-light fa-right-from-bracket"></i>
                                <p>Logout</p>
                            </a>


                        </div>
                    </div>
                ):(null)}
                {table.Role && table.Role.Name === 'Guest/Viewer' ? (
                    <div>
                        {table.studentId ? (
                            <div>
                              
                                    <div className="dashboard-left-single-wrapper">

                                        <Link to={`/dashboard`} className="single-item active">
                                            <i className="fa-light fa-house"></i>
                                            <p>Dashboard</p>
                                        </Link>

                                        <Link to={`/user-my-profile/${table.id}`} className="single-item">
                                            <i className="fa-regular fa-user"></i>
                                            <p>My Profile</p>
                                        </Link>

                                        <Link to={`/student/addquestion`} className="single-item">
                                            <i className="fa-sharp fa-light fa-bullseye-pointer"></i>
                                            <p>My Quiz Attempts</p>
                                        </Link>


                                    </div>

                                    <div className="dashboard-left-single-wrapper mt--40">
                                        <h4 className="title mb--5">Students</h4>

                                        <Link to={`/lernerenrollcourse`} className="single-item">
                                            <i className="fa-light fa-book"></i>
                                            <p>My Class</p>
                                        </Link>



                                    </div>
                                    <div className="dashboard-left-single-wrapper bbnone mt--40">
                                        <h4 className="title mb--5">User</h4>

                                    <Link to={`/studentsetting`} className="single-item">
                                        <i className="fa-sharp fa-regular fa-gear"></i>
                                        <p>Settings</p>
                                    </Link>
                                        <a className="single-item" onClick={handleLogout}>
                                            <i className="fa-light fa-right-from-bracket"></i>
                                            <p>Logout</p>
                                        </a>
                                    </div>
                               

                            </div>
                        ):(null)}
                        {table.teacherId ? (
                            <div>
                                <div className="dashboard-left-single-wrapper">

                                    <Link to={`/dashboard`} className="single-item active">
                                        <i className="fa-light fa-house"></i>
                                        <p>Dashboard</p>
                                    </Link>

                                    <Link to={`/user-my-profile/${table.id}`} className="single-item">
                                        <i className="fa-regular fa-user"></i>
                                        <p>My Profile</p>
                                    </Link>

                                    <Link to={`/studentaddreview`} className="single-item">
                                        <i className="fa-regular fa-star"></i>
                                        <p>Reviews</p>
                                    </Link>
                                    <Link to={`/instructor/addquize`} className="single-item">
                                        <i className="fa-sharp fa-light fa-bullseye-pointer"></i>
                                        <p>My Quiz Add</p>
                                    </Link>

                                    <Link to={`/instructor/viewquize`} className="single-item">
                                        <i className="fa-regular fa-circle-question"></i>
                                        <p>Question & Answer</p>
                                    </Link>

                                    <Link to={`/calender`} className="single-item">
                                        <i className="fa-light fa-calendar-days"></i>
                                        <p>Calendar</p>
                                    </Link>

                                </div>

                                <div className="dashboard-left-single-wrapper mt--40">
                                    <h4 className="title mb--5">Instructor</h4>

                                    <Link to={`/lernerenrollcourse`} className="single-item">
                                        <i className="fa-light fa-book"></i>
                                        <p>My Class</p>
                                    </Link>

                                    <Link to={`/instructor/assignment`} className="single-item">
                                        <i className="fa-regular fa-page"></i>
                                        <p>Assignments</p>
                                    </Link>

                                    <Link to={`/announcement`} className="single-item">
                                        <i className="fa-solid fa-megaphone"></i>
                                        <p>Announcements</p>
                                    </Link>


                                </div>

                                <div className="dashboard-left-single-wrapper bbnone mt--40">
                                    <h4 className="title mb--5">User</h4>

                                    <Link to={`/studentsetting`} className="single-item">
                                        <i className="fa-sharp fa-regular fa-gear"></i>
                                        <p>Settings</p>
                                    </Link>
                                    <a className="single-item" onClick={handleLogout}>
                                        <i className="fa-light fa-right-from-bracket"></i>
                                        <p>Logout</p>
                                    </a>


                                </div>
                            </div>
                        ):(null)}
                    </div>
                ):(null)}
            </div>

        </div>

    );
}
export default Sidebar;