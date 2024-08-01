import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Accordion, Card, Button } from 'react-bootstrap';
import Navbarmenu from "./Navbarmenu";
import Sidebar from "./sidebar";
import DashboardCard from "./dashboardcardComponent";
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
                const userData = response.data.quizze.rows;
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
      // Function to toggle a specific dropdown
      const toggleDropdown = (quizName) => {
        setOpenDropdown(activeService === quizName ? null : quizName);
    };
    const [activeEventKey, setActiveEventKey] = useState(null);
    const uniqueQuizzes = Array.from(new Set(question.map(item => item.Quize.QuizzName)))
        .map(name => {
            return question.find(item => item.Quize.QuizzName === name);
        });

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
                        <div className="col-lg-9">
                            <div className="right-sidebar-dashboard">
                                <h5 className="title">Quiz View</h5>
                                <div className='accordion'>
                                    {uniqueQuizzes.map((quiz, index) => (
                                        <div className='card' key={quiz.Quize.id}>
                                            <div className='card-header qiuze-view'>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="d-flex align-items-start">
                                                        <button
                                                            variant="link"
                                                            onClick={() => setActiveEventKey(activeEventKey === String(index) ? null : String(index))}
                                                        >
                                                            {index + 1} {quiz.Quize && quiz.Quize.QuizzName}
                                                        </button>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <i className="fa-light fa-pen icp mr-2"></i>
                                                        <Link to={`/quizeupdate/${quiz.Quize.id}`}>Edit</Link>
                                                    </div>
                                                </div>
                                            </div>
                                            {activeEventKey ==String(index) &&
                                            <div class="accordion-collapse collapse show" eventKey={String(index)} >
                                                <div className='card-body'>
                                                    {question
                                                        .filter(item => item.Quize.QuizzName === quiz.Quize.QuizzName)
                                                        .map((item, qIndex) => (
                                                            <div key={item.id}>
                                                                <div className='row option_icon'>
                                                                    <div className='flex-row d-flex justify-content-evenly'>
                                                                        <div className='grips'>
                                                                            <select>
                                                                                <option>{item.Quize && item.Quize.QuizzTestDuration} Minutes</option>
                                                                            </select>
                                                                        </div>
                                                                        <div className='grips'>
                                                                            <select>
                                                                                <option>AI</option>
                                                                                <option>AI</option>
                                                                                <option>AI</option>
                                                                                <option>AI</option>
                                                                                <option>AI</option>
                                                                            </select>
                                                                        </div>
                                                                        <div className='grips'>
                                                                            <div className='flex-row d-flex'>
                                                                                <div>
                                                                                    <i className="fa-light fa-copy"></i>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className='grips'>
                                                                            <div className='flex-row d-flex'>
                                                                                <div>
                                                                                    <i className="fa-light fa-tags"></i>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                         <div className='grips'>
                                                                            <button className='flex-row d-flex' onClick={() => toggleDropdown('dropdownprofile')}>
                                                                                <div className=''>
                                                                                    <i className="fa-light fa-pen icp"></i>
                                                                                </div>
                                                                                <Link to={`/updatequestion/${item.id}`}>Edit</Link>
                                                                            </button>
                                                                        </div> 
                                                                       <div className='grips'>
                                                                            <button className='flex-row d-flex'>
                                                                                <div>
                                                                                    <i className="fa-light fa-trash-alt"></i>
                                                                                </div>
                                                                            </button>
                                                                        </div> 
                                                                    </div>
                                                                </div>
                                                                <div className='pt-3 pl-3'>
                                                                    <div className='flex-row d-flex'>
                                                                        <p className='mr-3'>Q.</p>
                                                                        <p> {item.Questions}</p>
                                                                    </div>
                                                                    <div className='mt-2'>
                                                                        <span className='ansc'>Answer Choices</span>
                                                                    </div>
                                                                    <div className="pt-2">
                                                                        <div className="row flex-row d-flex">
                                                                            <div className="col-lg-4 col-md-6 col-sm-6 col-12 d-flex mt-3">
                                                                                <div className="icon">
                                                                                    <i className={`fa-light ${Array.isArray(item.Answer) && item.Answer.includes("a") || item.Answer === "a" ? 'fa-check selected right_icons' : 'fa-times not-selected choose_icons'}`}></i>
                                                                                </div>
                                                                                <div>
                                                                                    <span className="ml-3 crls">{item.Options1}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-lg-4 col-md-6 col-sm-6 col-12 d-flex mt-3">
                                                                                <div className="icon">
                                                                                    <i className={`fa-light ${Array.isArray(item.Answer) && item.Answer.includes("b") || item.Answer === "b" ? 'fa-check selected right_icons' : 'fa-times not-selected choose_icons'}`}></i>
                                                                                </div>
                                                                                <div>
                                                                                    <span className="ml-3 crls">{item.Options2}</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row flex-row d-flex">
                                                                            <div className="col-lg-4 col-md-6 col-sm-6 col-12 d-flex mt-3">
                                                                                <div className="icon">
                                                                                    <i className={`fa-light ${Array.isArray(item.Answer) && item.Answer.includes("c") || item.Answer === "c" ? 'fa-check selected right_icons' : 'fa-times not-selected choose_icons'}`}></i>
                                                                                </div>
                                                                                <div>
                                                                                    <span className="ml-3 crls">{item.Options3}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-lg-4 col-md-6 col-sm-6 col-12 d-flex mt-3">
                                                                                <div className="icon">
                                                                                    <i className={`fa-light ${Array.isArray(item.Answer) && item.Answer.includes("d") || item.Answer === "d" ? 'fa-check selected right_icons' : 'fa-times not-selected choose_icons'}`}></i>
                                                                                </div>
                                                                                <div>
                                                                                    <span className="ml-3 crls">{item.Options4}</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                        )}

                                                    {coursedatafetch.Role.Name === "Guest/Viewer" && (
                                                        <div className="sociallocker-overlay">
                                                            <i className="fas fa-lock"></i> Unlock content to login with Instructor or Student.
                                                        </div>
                                                    )}
                                                </div>
                                            </div> }
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );

}

export default InstructorviewquizComponent;