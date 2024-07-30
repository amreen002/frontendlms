import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Navbarmenu from "./Navbarmenu";
import Sidebar from "./sidebar";
import DashboardCard from "./dashboardcardComponent";
const  {REACT_APP_API_ENDPOINT,REACT_APP_API_IMG} = process.env;
function InstructorDashboard(token) {
    const [table, setTable] = useState("");
    const [course, setCourse] = useState([]);
    const [coursesCount, setCoursesCount] = useState(null);
    const [totalstudent, setTotalstudent] = useState(null);
    const [totalVideoCount, settotalVideoCount] = useState(null);
    const [activeService, setActiveService] = useState(null);
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
    const fetchData1 = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/listcourses`, {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                });
                const userDatas = response.data.courses;
                setCoursesCount(response.data.coursescount);
                setTotalstudent(response.data.totalStudentCount)
                settotalVideoCount(response.data.totalVideoCount)
                setCourse(userDatas)

            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData();
        fetchData1()
    }, []);

    return (
        <div>
            <section>
                <Navbarmenu />
            </section>
            <DashboardCard />
           

            <div class="dashboard--area-main pt--100 pt_sm--50">
                <div class="container">
                    <div class="row g-5">
                        <Sidebar />
                        <div class="col-lg-9">
                            <div class="right-sidebar-dashboard">
                                <div class="row g-5">
                                    <div class="col-lg-4 col-md-6 col-sm-6 col-12">

                                        <div class="single-dashboard-card">
                                            <div class="icon">
                                                <i class="fa-light fa-book-open-cover"></i>
                                            </div>
                                            <h5 class="title"><span class="counter">30</span></h5>
                                            <p>Enrolled Class</p>
                                        </div>

                                    </div>
                                    <div class="col-lg-4 col-md-6 col-sm-6 col-12">

                                        <div class="single-dashboard-card">
                                            <div class="icon">
                                                <i class="fa-regular fa-graduation-cap"></i>
                                            </div>
                                            <h5 class="title"><span class="counter">10</span></h5>
                                            <p>Active Class</p>
                                        </div>

                                    </div>
                                    <div class="col-lg-4 col-md-6 col-sm-6 col-12">

                                        <div class="single-dashboard-card">
                                            <div class="icon">
                                                <i class="fa-light fa-trophy"></i>
                                            </div>
                                            <h5 class="title"><span class="counter">36</span></h5>
                                            <p>Completed Class</p>
                                        </div>

                                    </div>
                                    <div class="col-lg-4 col-md-6 col-sm-6 col-12">

                                        <div class="single-dashboard-card">
                                            <div class="icon">
                                                <i class="fa-light fa-user"></i>
                                            </div>
                                            <h5 class="title"><span class="counter">{totalstudent}</span></h5>
                                            <p>Total Students</p>
                                        </div>

                                    </div>
                                    <div class="col-lg-4 col-md-6 col-sm-6 col-12">

                                        <div class="single-dashboard-card">
                                            <div class="icon">
                                                <i class="fa-light fa-book"></i>
                                            </div>
                                            <h5 class="title"><span class="counter">{coursesCount}</span></h5>
                                            <p>Total Class</p>
                                        </div>

                                    </div>
                                    <div class="col-lg-4 col-md-6 col-sm-6 col-12">

                                        <div class="single-dashboard-card">
                                            <div class="icon">
                                                <i class="fa-sharp fa-solid fa-dollar-sign"></i>
                                            </div>
                                            <h5 class="title">$<span class="counter">2900</span></h5>
                                            <p>Total Earning</p>
                                        </div>

                                    </div>
                                </div>
                             
                           

                                {/* <div className='row'>
                                    <div className='col-12 col-xl-12 col-lg-12 col-md-12'>
                                        <div className='hide-content pt--20'>
                                            <h2>Hide Content for guest User</h2>
                                        </div>
                                        <div className="sociallocker">
	
	<div className="sociallocker-content">
		
    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <div className="single-course-style-three enroll-course">
                                                        <a href="/studentmateriales/12" className="thumbnail">
                                                            <img src="http://localhost:8080/uploads\images\2024-07-09T06-21-53.562Z-
                                                        testingakash.mp4" alt="dashboard" />
                                                                <div className="tag-thumb">
                                                                    <span>CBSC</span>
                                                                </div>
                                                        </a>
                                                        <div className="body-area">
                                                            <div className="course-top">
                                                                <div className="price">1231233 <i class="fa-indian-rupee fa-light">
                                                                </i>
                                                                </div>
                                                            </div>
                                                            <a href="/studentmateriales/12">
                                                                <h5 className="title">asdf</h5>
                                                            </a>
                                                            <div className="leasson-students">
                                                                <div className="lesson">
                                                                    <i className="fa-light fa-calendar-lines-pen"></i>
                                                                    <span>0 Lessons</span>
                                                                </div>
                                                                <div className="students">
                                                                    <i className="fa-light fa-users"></i>
                                                                    <span>0 Student</span>
                                                                </div>
                                                            </div>
                                                            <div className="progress-wrapper-lesson-compleate">
                                                                <div className="compleate">
                                                                    <div className="compl">Complete</div>
                                                                    <div className="end"><span>50%</span></div>
                                                                </div>
                                                                <div className="progress">
                                                                   
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
	</div>
	<div className="sociallocker-overlay"><i class="fas fa-lock"></i>Unlock content to login with Instructor or Student.</div>
</div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default InstructorDashboard;