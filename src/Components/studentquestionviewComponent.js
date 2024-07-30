import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Navbarmenu from "./Navbarmenu";
import Sidebar from "./sidebar";
import DashboardCard from "./dashboardcardComponent";
import { set } from 'rsuite/esm/utils/dateUtils';
const { REACT_APP_API_ENDPOINT, REACT_APP_API_IMG } = process.env;
function InstructorviewquizComponent(token) {
    const [quizze, setQuizze] = useState([]);
    const [question, setQuestion] = useState([]);

    const [isVisible, setIsVisible] = useState(false);
    const [student, setstudent] = useState('');
    const toggleVisibility = (id) => {
        setIsVisible(isVisible === id ? null : id);
    };

    useEffect(() => {
        fetchDataQuize()
    }, []);
    useEffect((student) => {
        fetchDataQuestion(student)
    }, [student]);
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
    const fetchDataQuestion = async (student) => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/question?student=true`, {
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





    return (
        <div>
            <section>
                <Navbarmenu />
            </section>


            <DashboardCard />
    

          <div className="dashboard--area-main pt-5 mt-5 pt_sm-50">
                <div className="container">
                    <div className="row g-5">
                        <Sidebar />
                        <div className="col-lg-9">
                            <div className="calender-area">
                                <div className='d-flex justify-content-between'>
                                    <h5 className="title">Quiz Attempt</h5>
                                    <div>
                                        <h5>Timer: 1</h5>
                                    </div>
                                </div>

                                <div className='mt-2'>
                                    <div className='row' style={{ backgroundColor: 'rgb(49 4 2 / 58%)', color: "#fff" }}>
                                        <div className='col-12 py-2'>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <div className='qust'>
                                                    30 Questions
                                                </div>
                                                <div className='d-flex align-items-center'>
                                                    <i className="fa fa-clock fa-light mr-2"></i>
                                                    <div>1m 10s</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-5">
                                    {question.map((item, index) => (
                                        <div key={index} className="mb-5">
                                            <div className="d-flex flex-row align-items-center">
                                                <div className="questnum mr-3">
                                                    <span>{index + 1}</span>
                                                </div>
                                                <div className="outof">
                                                    <p>Question {index + 1} of {question.length}</p>
                                                </div>
                                            </div>
                                            <div className="mt-3 ml-4">
                                                <p>{item.Questions}</p>
                                            </div>

                                            <div className="row ml-3">
                                                <div className="col-12 col-md-6">
                                                    <div className="mt-3">
                                                        <div className="d-flex flex-row align-items-center optiionss mt-2">
                                                            <p className="aaa">A</p>
                                                            <p className="ml-2">{item.Options1}</p>
                                                        </div>
                                                        <div className="d-flex flex-row align-items-center optiionss mt-2">
                                                            <p className="aaa">B</p>
                                                            <p className="ml-2">{item.Options2}</p>
                                                        </div>
                                                        <div className="d-flex flex-row align-items-center optiionss mt-2">
                                                            <p className="aaa">C</p>
                                                            <p className="ml-2">{item.Options3}</p>
                                                        </div>
                                                        <div className="d-flex flex-row align-items-center optiionss mt-2">
                                                            <p className="aaa">D</p>
                                                            <p className="ml-2">{item.Options4}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-5 ml-3">
                                                <div className="row">
                                                    <div className="col-12 col-md-3">
                                                        <div className="prqust">
                                                            <button className="btn btn-primary" onClick={() => toggleVisibility(`${item.id}`)}>
                                                                {isVisible === `${item.id}` ? (
                                                                    <>
                                                                             <i className="fa fa-eye"></i> Show Answer
                                                                  
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                             <i className="fa fa-eye-slash"></i> Hide Answer
                                                                    </>
                                                                )}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                {isVisible ===`${item.id}` && (
                                                    <div className="col-12 mt-5 pb-2">
                                                        <div className="alert alert-info">
                                                            <strong>Answer:</strong> {Array.isArray(item.Answer) ? item.Answer.map(sentences => sentences.toUpperCase()) : item.Answer.toUpperCase()}
                                                        </div>
                                                    </div>
                                                )}

                                            </div>
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