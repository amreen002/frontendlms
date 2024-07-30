import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Navbarmenu from "./Navbarmenu";
import Sidebar from "./sidebar";
import DashboardCard from "./dashboardcardComponent";
const { REACT_APP_API_ENDPOINT, REACT_APP_API_IMG } = process.env;
const datatoken = localStorage.getItem('datatoken');
const coursedatafetch = JSON.parse(datatoken)
function LernerenrollcourseComponent(token) {
    const [table, setTable] = useState("");
    const [course, setCourse] = useState([]);
    const [coursesCount, setCoursesCount] = useState(0);
    const [totalstudent, setTotalstudent] = useState(0);
    const [totalVideoCount, settotalVideoCount] = useState(0);
    const [activeService, setActiveService] = useState(null);
    const fetchData1 = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                let courseurl
                if (coursedatafetch.Role.Name == "Student"||coursedatafetch.Role.Name == "Instructor") {
                    courseurl = "studentcourses"
                } else if (coursedatafetch.Role.Name == "Guest/Viewer") {
                    if (coursedatafetch.studentId||coursedatafetch.teacherId) {
                        courseurl = "studentcourses"
                    } else {
                        courseurl = "listcourses"
                    }

                } else {
                    courseurl = "listcourses"
                }

                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/${courseurl}`, {
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
                            <div class="exrolled-course-wrapper-dashed bg-white">
                                <h5 class="title">Enrolleld Class</h5>
                                <ul class="nav nav-tabs" id="myTab" role="tablist">
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link active " id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home"  aria-selected="true">Enrolleld Class</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Active Class</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Completed Class</button>
                                    </li>
                                </ul>



                                <div class="tab-content mt--30" id="myTabContent">

                                    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div class="row g-5">
                                            {course.map((item) => {
                                                return (
                                                    <div className="col-lg-4 col-md-6 col-sm-12 col-12" key={item.id}>
                                                        <div className="single-course-style-three enroll-course">
                                                            <a href={`/studentmateriales/${item.id}`} className="thumbnail">
                                                                <img src={`${REACT_APP_API_IMG}/${item.CourseUplod}`} alt="Course Thumbnail" />
                                                                <div className="tag-thumb">
                                                                    <span>{item.Category && item.Category.name}</span>
                                                                </div>
                                                            </a>
                                                            <div className="body-area">
                                                                <div className="course-top">
                                                                    <div className="price">{item.CoursePrice} <i className="fa-indian-rupee fa-light"></i></div>
                                                                </div>
                                                                <a href={`/studentmateriales/${item.id}`}>
                                                                    <h5 className="title">{item.name}</h5>
                                                                </a>
                                                                <div className="leasson-students">
                                                                    <div className="lesson">
                                                                        <i className="fa-light fa-calendar-lines-pen"></i>
                                                                        <span>{item.lessionCount} Lessons</span>
                                                                    </div>
                                                                    <div className="students">
                                                                        <i className="fa-light fa-users"></i>
                                                                        <span>{item.studentCount} Student</span>
                                                                    </div>
                                                                </div>
                                                                <div className="progress-wrapper-lesson-compleate">
                                                                    <div className="compleate">
                                                                        <div className="compl">
                                                                            Complete
                                                                        </div>
                                                                        <div className="end">
                                                                            <span>50%</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="progress">
                                                                        <div className="progress-bar wow fadeInLeft bg--primary" role="progressbar" style={{ width: "50%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {coursedatafetch.Role.Name === "Guest/Viewer" && (
                                                                <div className="sociallocker-overlay">
                                                                    <i className="fas fa-lock"></i> Unlock content to login with Instructor or Student.
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}

                                        </div>

                                    </div>

                                    <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                        <div class="row g-5">
                                            {course.map((item) => {
                                                if (item.Status == 1) {
                                                    return (

                                                        <div class="col-lg-4 col-md-6 col-sm-12 col-12">
                                                            {/* <!-- single course style two --> */}
                                                            <div class="single-course-style-three enroll-course">
                                                                <a href={`/studentmateriales/${item.id}`} class="thumbnail">
                                                                    <img src={`${REACT_APP_API_IMG}/${item.CourseUplod}`} alt="dashboard" />
                                                                    <div class="tag-thumb">
                                                                        <span>{item.Category && item.Category.name}</span>
                                                                    </div>
                                                                </a>
                                                                <div class="body-area">
                                                                    <div class="course-top">

                                                                        <div class="price">{item.CoursePrice} <i class="fa-indian-rupee fa-light"></i></div>
                                                                    </div>
                                                                    <a href={`/studentmateriales/${item.id}`}>
                                                                        <h5 class="title">{item.name}</h5>
                                                                    </a>

                                                                    <div class="leasson-students">
                                                                        <div class="lesson">
                                                                            <i class="fa-light fa-calendar-lines-pen"></i>
                                                                            <span>{item.lessionCount} Lessons</span>
                                                                        </div>
                                                                        <div class="students">
                                                                            <i class="fa-light fa-users"></i>
                                                                            <span>{item.studentCount} Student</span>
                                                                        </div>
                                                                    </div>
                                                                    <div class="progress-wrapper-lesson-compleate">
                                                                        <div class="compleate">
                                                                            <div class="compl">
                                                                                Complete
                                                                            </div>
                                                                            <div class="end">
                                                                                <span>50%</span>
                                                                            </div>
                                                                        </div>
                                                                        <div class="progress">
                                                                            <div class="progress-bar wow fadeInLeft bg--primary" role="progressbar" style={{ width: "50%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                                {coursedatafetch.Role.Name === "Guest/Viewer" && (
                                                                    <div className="sociallocker-overlay">
                                                                        <i className="fas fa-lock"></i> Unlock content to login with Instructor or Student.
                                                                    </div>
                                                                )}
                                                                <div className="tags-area-wrapper d-flex" style={{ justifyContent: 'space-between' }}>
                                                                    {/*    <div className='button-roll-course'>
                                                                        <a href={`/createcourse/${item.id}`} className="btnm flex-row d-flex">
                                                                            <div className='icon' style={{ marginRight: '7px' }}>
                                                                                <i className="bx bx-edit"></i>
                                                                            </div>
                                                                            <span>Edit</span>
                                                                        </a>
                                                                    </div>
                                                                    <div className='button-roll-course'>
                                                                        <a href={`#`} className=" flex-row d-flex">
                                                                            <div className='icon' style={{ marginRight: '7px' }}>
                                                                                <i className="bx bx-trash"></i>
                                                                            </div>
                                                                            <span>Delete</span>
                                                                        </a>
                                                                    </div> */}
                                                                </div>
                                                            </div>

                                                            {/* <!-- single course style two end --> */}

                                                        </div>)
                                                } else {
                                                    return null
                                                }
                                            })}
                                        </div>
                                    </div>



                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default LernerenrollcourseComponent;