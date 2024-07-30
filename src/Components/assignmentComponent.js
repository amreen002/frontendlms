

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Navbarmenu from "./Navbarmenu";
import Sidebar from "./sidebar";
import PopupComponent from './popupComponent';
import DashboardCard from './dashboardcardComponent';
import ProgressBar from './progressbar';
const datatoken = localStorage.getItem('datatoken');
const coursedatafetch = JSON.parse(datatoken)
const { REACT_APP_API_ENDPOINT } = process.env;
function AssignmentComponent(token) {

    const [reportscard, setReportscard] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/reportscard`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const userData = response.data.reportscard;
                setReportscard(userData);
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

            <div class="dashboard--area-main pt--100 pt_sm--50">
                <div class="container">
                    <div class="row g-5">

                        <Sidebar />
                        <div class="col-lg-9">
                            <div class="announcements-wrapper-dashed rts-reviewd-area-dashed table-responsive" style={{ whiteSpace: "nowrap", backgroundColor: '#fff' }}>
                                <h5 class="title">Assignment</h5>
                                <div class="course-short-by-date-wrapper">
                                    <div class="single-course-filter">
                                        <span>Course</span>
                                        <div class="nice-select-wrap"><select class="nice-select" name="price" style={{ display: 'none' }}>
                                            <option>Read (12)</option>
                                            <option value="asc">Stars (30)</option>
                                            <option value="desc">Comments(42)</option>
                                            <option value="pop">Popularity (20)</option>
                                            <option value="low">Questions &amp; Ans (10)</option>
                                            <option value="high">Stars (52)</option>
                                        </select><a href="#" class="drop">Read (12)</a><ul id="price" style={{ display: 'none' }}><li><a href="#" id="asc">Stars (30)</a></li><li><a href="#" id="desc">Comments(42)</a></li><li><a href="#" id="pop">Popularity (20)</a></li><li><a href="#" id="low">Questions &amp; Ans (10)</a></li><li><a href="#" id="high">Stars (52)</a></li></ul></div>
                                    </div>
                                    <div class="single-course-filter short-by">
                                        <span>Course</span>
                                        <div class="nice-select-wrap"><select class="nice-select" name="price" style={{ display: 'none' }}>
                                            <option>Read (12)</option>
                                            <option value="asc">Stars (30)</option>
                                            <option value="desc">Comments(42)</option>
                                            <option value="pop">Popularity (20)</option>
                                            <option value="low">Questions &amp; Ans (10)</option>
                                            <option value="high">Stars (52)</option>
                                        </select><a href="#" class="drop">Read (12)</a><ul id="price" style={{ display: 'none' }}><li><a href="#" id="asc">Stars (30)</a></li><li><a href="#" id="desc">Comments(42)</a></li><li><a href="#" id="pop">Popularity (20)</a></li><li><a href="#" id="low">Questions &amp; Ans (10)</a></li><li><a href="#" id="high">Stars (52)</a></li></ul></div>
                                    </div>
                                    <div class="single-course-filter short-by">
                                        <span>Date</span>
                                        <div class="date-picker-area">
                                            <input placeholder="Select your date" type="text" name="checkIn" id="datepicker" value="mm/dd/yyyy" class="calendar hasDatepicker" />
                                            <i class="fa-light fa-calendar-lines-pen"></i>
                                        </div>
                                    </div>
                                </div>

                                <table class="table-reviews quiz mt--30">
                                    <thead>
                                        
                                        <tr>
                                            <th style={{ width: "20%;" }}>Assignment Name</th>
                                            <th style={{ width: '20%' }}>Quize</th>
                                            <th style={{ width: '20%' }}>Student</th>
                                            <th style={{ width: '20%' }}>Obtainted Marks</th>
                                            <th style={{ width: '10%' }}>Out Of Marks</th>
                                            <th style={{ width: '10%' }}>Total Question</th>
                                            <th style={{ width: '10%' }}>Attempted To Questions</th>
                                            <th style={{ width: '10%' }}>Grads</th>
                                            <th style={{ width: '10%' }}>Percentage</th>
                                            <th style={{ width: '10%' }}>Result</th>
                                          
                                            <th>Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reportscard.map((question) => (
                                            <tr key={question.id}>
                                                <td>
                                                    <div class="information-quiz">
                                                        <p class="quiz">Assignment</p>
                                                        <p>Course: <span style={{ color: "#553CDF" }}>{question.Class}</span></p>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span class="questions">{question.QuizName}</span>
                                                </td>
                                                <td>
                                                    <span class="questions">{question.StudentNames[0]}</span>
                                                </td>
                                                <td>
                                                    <span class="questions">{question.ResultMarks}</span>
                                                </td>
                                                <td>
                                                    <span class="questions">{question.TotalQuizeMarks}</span>
                                                </td>
                                             
                                                <td>
                                                    <span class="questions">{question.TotalQuestions}</span>
                                                </td>
                                                <td>
                                                    <span class="questions">{question.AttemptedQuestions}</span>
                                                </td>
                                                <td>
                                                    <span class="questions" style={{color:"red"}}>{question.Grads}</span>
                                                </td>
                                                <td>
                                                    <ProgressBar percentage={question.Percentage} />
                                                </td>

                                                <td>
                                                    <span class={question.PassStatus === "Pass" ? 'pass' : 'fail'}>{question.PassStatus}</span>
                                                </td>
                                               
                                                <td>
                                                    <div class="betweena-area-assignment">
                                                        <Link to={'/assignmentdetail'}><button class="rts-btn btn-border">Details</button></Link>
                                                    </div>
                                                </td>
                                                {coursedatafetch.Role.Name === "Guest/Viewer" && (
                                                                    <div className="sociallocker-overlay">
                                                                        <i className="fas fa-lock"></i> Unlock content to login with Instructor or Student.
                                                                    </div>
                                                                )}
                                                                <div className="tags-area-wrapper d-flex" style={{ justifyContent: 'space-between' }}></div>
                                            </tr>
                                             
                                        ))}

                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default AssignmentComponent;