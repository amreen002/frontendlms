import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Navbarmenu from "./Navbarmenu";
import Sidebar from "./sidebar";
import DashboardCard from "./dashboardcardComponent";
import { set } from 'rsuite/esm/utils/dateUtils';
const { REACT_APP_API_ENDPOINT, REACT_APP_API_IMG } = process.env;
const datatoken = localStorage.getItem('datatoken');
const coursedatafetch = JSON.parse(datatoken)
function InstructorviewquizComponent(token) {
    const [quizze, setQuizze] = useState([]);
    const [question, setQuestion] = useState([]);

    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = (id) => {
        setIsVisible(isVisible === id ? null : id);
    };

    useEffect(() => {
        fetchDataQuize()
        fetchDataQuestion()
    }, []);
    const fetchDataQuize = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/quizze`, {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                });
                const userData = response.data.quizze;
                setQuizze(userData)
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const fetchDataQuestion = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/question`, {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                });
                const userData = response.data.questions;
                setQuestion(userData)

            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    //Dropdown Navigation
    const [activeService, setOpenDropdown] = useState(null);

    // Function to toggle a specific dropdown
    const toggleDropdown = (serviceName) => {
        setOpenDropdown(activeService === serviceName ? '' : serviceName);
    };



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
                                <h5 class="title">Quiz View</h5>
                                {question.map((item, index) => (
                                    <div className='box' key={item.id}>

                                        <div className='pt--5 pl--5'>
                                            <div className='flex-row d-flex'>
                                                <div className='icon grips'>
                                                    <i class="fa-grip-vertical fa-light"></i>
                                                </div>
                                                <div className='grips' style={{ marginLeft: '4px' }}>
                                                    <select>
                                                        <option>{item.Quize.QuizzTestDuration} Minutes</option>
                                                    </select>
                                                </div>
                                                <div className='grips' style={{ marginLeft: '285px' }}>
                                                    <select>
                                                        <i class="fa-light fa-stars"></i>
                                                        <option> AI</option>
                                                        <option> AI</option>
                                                        <option> AI</option>
                                                        <option> AI</option>
                                                        <option> AI</option>
                                                    </select>
                                                </div>
                                                <div className=' grips' style={{ marginLeft: '4px' }}>
                                                    <div className='felx-row d-flex'>
                                                        <div>
                                                            <i class="fa-copy fa-light"></i>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className=' grips' style={{ marginLeft: '4px' }}>
                                                    <div className='felx-row d-flex'>
                                                        <div>
                                                            <i class="fa-light fa-tags"></i>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className=' grips' style={{ marginLeft: '4px' }}>
                                                    <button className='felx-row d-flex' onClick={() => toggleDropdown('dropdownprofile')}>
                                                        <div className=''>
                                                            <i class="fa-light fa-pen icp"></i>
                                                        </div>
                                                        Edit
                                                    </button>
                                                    {activeService === 'dropdownprofile' && (
                                                        <div classNmae="dropdown-menu dropdown-menu-end m-0">
                                                            <Link to={`/quizeupdate/${item.Quize.id}`} classNmae="dropdown-item">View</Link></div>
                                                    )}
                                                </div>
                                                <div className=' grips' style={{ marginLeft: '4px' }}>
                                                    <button className='felx-row d-flex'>
                                                        <div>
                                                            <i class="fa-light fa-trash-alt"></i>
                                                        </div>
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                        <div className='pt--50 pl--5'>
                                            <div>
                                                <p>{item.Questions}</p>
                                            </div>
                                            <div className='pt--20'>
                                                <span className='ansc'>  Answer Choices</span>
                                            </div>
                                            <div className="pt-3">
                                                <div className="row flex-row d-flex">
                                                    <div class="col-lg-4 col-md-6 col-sm-6 col-12 d-flex mt-3">
                                                        <div className="icon">
                                                            <i className={`fa-light ${Array.isArray(item.Answer) && item.Answer.includes("a") || item.Answer === "a" ? 'fa-check selected' : 'fa-times not-selected'}`}></i>
                                                        </div>

                                                        <div>
                                                            <span className="ml--20 crls">{item.Options1}</span>
                                                        </div>


                                                    </div>
                                                    <div class="col-lg-4 col-md-6 col-sm-6 col-12 d-flex mt-3">
                                                        <div className="icon">
                                                            <i className={`fa-light ${Array.isArray(item.Answer) && item.Answer.includes("b") || item.Answer === "b" ? 'fa-check selected' : 'fa-times not-selected'}`}></i>
                                                        </div>

                                                        <div>
                                                            <span className="ml--20 crls">{item.Options2}</span>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className=" row flex-row d-flex">
                                                    <div class="col-lg-4 col-md-6 col-sm-6 col-12 d-flex mt-3">
                                                        <div className="icon">
                                                            <i className={`fa-light ${Array.isArray(item.Answer) && item.Answer.includes("c") || item.Answer === "c" ? 'fa-check selected' : 'fa-times not-selected'}`}></i>
                                                        </div>

                                                        <div>
                                                            <span className="ml--20 crls">{item.Options3}</span>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-4 col-md-6 col-sm-6 col-12 d-flex mt-3">
                                                        <div className="icon">
                                                            <i className={`fa-light ${Array.isArray(item.Answer) && item.Answer.includes("d") || item.Answer === "d" ? 'fa-check selected' : 'fa-times not-selected'}`}></i>
                                                        </div>

                                                        <div>
                                                            <span className="ml--20 crls">{item.Options4}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
 {coursedatafetch.Role.Name === "Guest/Viewer" && (
                                                                    <div className="sociallocker-overlay">
                                                                        <i className="fas fa-lock"></i> Unlock content to login with Instructor or Student.
                                                                    </div>
                                                                )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    );

}

export default InstructorviewquizComponent;