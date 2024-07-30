import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Navbarmenu from "./Navbarmenu";
import Sidebar from "./sidebar";
import DashboardCard from "./dashboardcardComponent";
const { REACT_APP_API_ENDPOINT, REACT_APP_API_IMG } = process.env;
function QuizresultComponent(token) {

    const { studentquizeId } = useParams();
    const [StutentResult, setStutentResult] = useState([])
    const [Incorrect, setIncorrect] = useState(0)
    const [Correct, setCorrect] = useState(0)
    const fetchDataStutentResult = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/studentquize/${studentquizeId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const useData = response.data.studentsquize
                setStutentResult(useData);
                setIncorrect(response.data.totalIncorrectCount)
                setCorrect(response.data.totalCorrectCount)
            }// Updated state variable
        } catch (err) {
            console.log(err.response);
        }
    }

    useEffect(() => {
        fetchDataStutentResult(studentquizeId)
    }, [studentquizeId]);



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
                            <div class=" row">
                                <div className='result text-center py-2'>
                                    <p>Good Try, Akash!</p>
                                    <p>Keep Practicing, Keep Improving.</p>
                                </div>
                                <div className='py-5' style={{ backgroundColor: '#fff' }}>

                                    <div className='row'>
                                        <div className='col-12 col-xl-7 col-lg-7 col-md-7 '>
                                            <div className='text-center'>
                                                <img src="assets/fontend/images/banner/17.png" />
                                                <p>Your Rank</p>
                                                <p className='rankno'>5527 / 6495</p>
                                            </div>
                                            <div>
                                                <div className='row mt-5 text-center'>
                                                    <div className='col-12 col-xl-4 col-lg-4 col-md-4'>
                                                        <p>Incorrect</p>
                                                        <p className='rankno'>{Incorrect}</p>
                                                    </div>
                                                    <div className='col-12 col-xl-4 col-lg-4 col-md-4 crect'>
                                                        <p>Correct</p>
                                                        <p className='rankno'>{Correct}</p>
                                                    </div>
                                                    <div className='col-12 col-xl-4 col-lg-4 col-md-4'>
                                                        <p>TIME TAKEN</p>
                                                        <p className='rankno'>12:17 sec</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='mt-5 '>

                                                <div className='ml--40 flex-row d-flex rettemp'>
                                                    <div className='notpen'>
                                                        <img src="assets/fontend/images/nav/04.png" />
                                                    </div>
                                                    <div class="ml--20"><span class="reattempt__desc-title" ><h3 style={{ marginBottom: '0px' }}>Reattempt Test with</h3></span>
                                                        <span class="text-black-50 ">Learn from past mistakes &amp; improve</span></div>
                                                    <div className='ml--10'>
                                                        <button className='reatquiz mt-1'>Reattempt Quiz</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                       
                                            <div className='col-12 col-xl-5 col-lg-5 col-md-5 corrt'>
                                                <div className='text-center'>
                                                    <p>Your Answer</p>
                                                </div>
                                            <div className='row'>
                                                <div className='anslist'>
                                                <ul className='flex-row d-flex'>
                                                    {StutentResult.map((item, index) => (
                                                        <div className='  mt-2' key={item.id}>
                                                                <li style={{ backgroundColor: item.Correct ? 'green' : item.Incorrect ? 'red' : 'black' }}>
                                                                    {item.id}
                                                                </li>
                                                            
                                                        </div>

                                                    ))}
                                                    </ul>
                                                </div>
                                            </div>
                                                <div className='flex-row d-flex mt-2' style={{ justifyContent: 'space-between', padding: '16px' }}>
                                                    <button className='viwsol'>
                                                        <Link to={`/student/question`} className="single-item">
                                                            <p>View Solution</p>
                                                        </Link>
                                                    </button>
                                                    <button className='viwsol'>
                                                        <Link to={`/student/addquestion`} className="single-item">
                                                            <p>Start Next Quiz</p>
                                                        </Link>
                                                    </button>
                                                </div>
                                                <div className='mt-2'>
                                                    <div className='ml--40 rate'>
                                                        <div>
                                                            <p>Are you happy with the quality of questions?</p>
                                                        </div>
                                                        <div className='flex-row d-flex mt-4' style={{ justifyContent: 'space-evenly', paddingRight: '16px' }}>
                                                            <i className="fa-face-confused fa-light fa-sharp"></i>
                                                            <i className="fa-face-diagonal-mouth fa-light fa-sharp"></i>
                                                            <i className="fa-face-expressionless fa-light fa-sharp"></i>
                                                            <i className="fa-face-grin fa-light fa-sharp"></i>
                                                            <i className="fa-face-grin-beam fa-light fa-sharp"></i>
                                                        </div>
                                                        <div className='flex-row d-flex mt-2' style={{ justifyContent: 'space-evenly', fontSize: '12px' }}>
                                                            <span>Very Bad</span>
                                                            <span>Bad</span>
                                                            <span>Average</span>
                                                            <span>Good</span>
                                                            <span>Very Good</span>
                                                        </div>
                                                    </div>
                                                </div>
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

export default QuizresultComponent;