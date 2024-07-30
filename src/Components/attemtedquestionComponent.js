import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, Link , } from 'react-router-dom';
import Navbarmenu from './Navbarmenu';
import Sidebar from './sidebar';
import DashboardCard from './dashboardcardComponent';

const { REACT_APP_API_ENDPOINT } = process.env;

function AttemtedQuestionComponent() {
    const location = useLocation();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(location.state?.quiz || null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [seconds, setSeconds] = useState(0);
    const [timerEnd, setTimerEnd] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [paused, setPaused] = useState(false); // Add paused state
    const submittedRef = useRef(false);
    const timerEndRef = useRef(timerEnd);
    const intervalRef = useRef(null);
    const pausedTimeRef = useRef(0);
    useEffect(() => {
        if (!quiz) {
            console.error('No quiz data available');
            navigate('/');
            return;
        }

        const savedState = JSON.parse(localStorage.getItem('quizState'));
        if (savedState) {
            setCurrentQuestionIndex(savedState.currentQuestionIndex);
            setSelectedAnswer(savedState.selectedAnswer);
            setAnswers(savedState.answers);
        }

        const { QuizzTestDuration } = quiz.Quize;
        const quizDurationInSeconds = QuizzTestDuration * 60;
        const storedStartTime = localStorage.getItem('quizStartTime');
        const currentTime = Date.now();

        let initialSeconds;

        if (storedStartTime) {
            const elapsedTime = Math.floor((currentTime - parseInt(storedStartTime, 10)) / 1000);
            initialSeconds = quizDurationInSeconds - elapsedTime;
            if (initialSeconds < 0) {
                initialSeconds = 0;
                setTimerEnd(true);
                setSubmitted(true); // Mark quiz as submitted
                autoSubmit()
            }
        } else {
            initialSeconds = quizDurationInSeconds;
            localStorage.setItem('quizStartTime', currentTime.toString());
        }

        setSeconds(initialSeconds);
        setTimerEnd(false);

        const tick = () => {

            setSeconds(prevSeconds => {
                if (prevSeconds <= 1) {
                    setTimerEnd(true);
                    autoSubmit()
                    return 0;
                }
                return prevSeconds - 1;
            });

        };

        intervalRef.current = setInterval(tick, 1000);
        return () => {
            clearInterval(intervalRef.current);

        };
        return localStorage.removeItem('quizStartTime'); // Clean up timer  
    }, [quiz, navigate]);
    

    const updateLocalStorage = (index, answer) => {
        const updatedAnswers = [...answers];
        updatedAnswers[index] = answer;
        setAnswers(updatedAnswers);

        localStorage.setItem('quizState', JSON.stringify({
            currentQuestionIndex,
            selectedAnswer,
            answers: updatedAnswers
        }));
    };

    /* const handleNext = () => {
        const currentAnswer = {
            QuestionId: quiz.Quize.Questions[currentQuestionIndex].id,
            AnswersStudent: selectedAnswer,
            TimeTaken: seconds,
        };
        updateLocalStorage(currentQuestionIndex, currentAnswer);

        if (currentQuestionIndex < quiz.Quize.Questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(answers[currentQuestionIndex + 1]?.AnswersStudent || '');
        }
    }; */
    const handleNext = () => {
        const currentAnswer = {
            QuestionId: quiz.Quize.Questions[currentQuestionIndex].id,
            AnswersStudent: selectedAnswer,
            TimeTaken: seconds,
            QuizeId: quiz.Quize.id,
        };
    
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuestionIndex] = currentAnswer;
        setAnswers(updatedAnswers);
    
        if (currentQuestionIndex < quiz.Quize.Questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(updatedAnswers[currentQuestionIndex + 1]?.AnswersStudent || []);
        }
    
        localStorage.setItem('quizState', JSON.stringify({
            currentQuestionIndex: currentQuestionIndex + 1,
            selectedAnswer: updatedAnswers[currentQuestionIndex + 1]?.AnswersStudent || [],
            answers: updatedAnswers
        }));
    };
    

    /* const handlePrevious = () => {
        const currentAnswer = {
            QuestionId: quiz.Quize.Questions[currentQuestionIndex].id,
            AnswersStudent: selectedAnswer,
            TimeTaken: seconds,
        };
        updateLocalStorage(currentQuestionIndex, currentAnswer);

        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setSelectedAnswer(answers[currentQuestionIndex - 1]?.AnswersStudent || '');
        }
    }; */
    const handlePrevious = () => {
        const currentAnswer = {
            QuestionId: quiz.Quize.Questions[currentQuestionIndex].id,
            AnswersStudent: selectedAnswer,
            TimeTaken: seconds,
            QuizeId: quiz.Quize.id,
        };
    
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuestionIndex] = currentAnswer;
        setAnswers(updatedAnswers);
    
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setSelectedAnswer(updatedAnswers[currentQuestionIndex - 1]?.AnswersStudent || []);
        }
    
        localStorage.setItem('quizState', JSON.stringify({
            currentQuestionIndex: currentQuestionIndex - 1,
            selectedAnswer: updatedAnswers[currentQuestionIndex - 1]?.AnswersStudent || [],
            answers: updatedAnswers
        }));
    };
    
    const handleChange = (e,qIndex) => {
        const { value, type, checked } = e.target;
        let updatedAnswer;

        if (type === 'checkbox') {
            if (checked) {
                updatedAnswer = selectedAnswer ? [...selectedAnswer, value] : [value];
            } else {
                updatedAnswer = selectedAnswer.filter((ans) => ans !== value);
            }
        } else {
            updatedAnswer = value;
        }

        const updatedAnswers = [...answers];
        updatedAnswers[qIndex] = {
            ...updatedAnswers[qIndex],
            AnswersStudent: updatedAnswer
        };
    
        setAnswers(updatedAnswers);
        setSelectedAnswer(updatedAnswer);
    
        localStorage.setItem('quizState', JSON.stringify({
            currentQuestionIndex,
            selectedAnswer: updatedAnswer,
            answers: updatedAnswers
        }));
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        if (submittedRef.current) return;
    
        setSubmitted(true);
        submittedRef.current = true;

        const currentAnswer = {
            QuestionId: quiz.Quize.Questions[currentQuestionIndex].id,
            AnswersStudent: selectedAnswer,
            TimeTaken: seconds,
            QuizeId: quiz.Quize.id,
        };

        const updatedAnswers = [...answers];
        updatedAnswers[currentQuestionIndex] = currentAnswer;
        setAnswers(updatedAnswers);

        console.log(updatedAnswers)
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const formData = {
                    QuizeId: quiz.Quize.id,
                    answers: updatedAnswers,
                };
    
                const response = await axios.post(`${REACT_APP_API_ENDPOINT}/studentquize`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
    
                if (response.status === 200) {
                    setSeconds(0);
                    localStorage.removeItem('quizState');
                    localStorage.removeItem('quizStartTime');
                    navigate(`/quizetresult/${response.data.studentsquize.QuizeId}`);
                } else {
                    alert('Something went wrong');
                }
            }
        } catch (error) {
            console.error('Failed to submit quiz:', error);
            alert('Failed to submit quiz.');
        }
    };
    

    const autoSubmit = async () => {
        if (submittedRef.current || timerEnd) return;
        setTimerEnd(true);
        await handleSubmit();
    };


    

    const togglePause = () => {
        if (paused) {
            setPaused(false);
            const remainingSeconds = pausedTimeRef.current; // Get the remaining seconds when paused
            setSeconds(remainingSeconds); // Set the seconds to the remaining time
            intervalRef.current = setInterval(() => {
                setSeconds(prevSeconds => {
                    if (prevSeconds <= 1) {
                        setTimerEnd(true);
                        handleSubmit(); // Automatically submit the quiz when the timer reaches zero
                        return 0;
                    }
                    return prevSeconds - 1;
                });
            }, 1000);
        } else {
            setPaused(true);
            pausedTimeRef.current = seconds; // Store the remaining time when paused
            clearInterval(intervalRef.current);
        }
    };


    const currentQuestion = quiz?.Quize?.Questions?.[currentQuestionIndex];

    return (
        <div>
            <section>
                <Navbarmenu />
            </section>
            <DashboardCard />
            <div className="dashboard--area-main pt--100 pt_sm--50">
                <div className="container">
                    <div className="row g-5">
                        <Sidebar />
                        <div className="col-lg-9">
                            <div className="calendar-area">
                                {quiz ? (
                                    <>
                                       <div className='flex-row d-flex quiz_timer'>
                                            <h5 className="title quiz_title">Quiz: {quiz.Quize.QuizzName}</h5>
                                         
                                            <div className='flex-row d-flex ml--50 quiz_title'>
                                                <h5>Total Mark: {quiz?.Quize?.TotalMarks}</h5>
                                                <br />
                                                <h5>Timer: {Math.floor(seconds / 60)}:{('0' + (seconds % 60)).slice(-2)}</h5>
                                                <button  style={{ color:'#fff'}} onClick={togglePause}>
                                                    {paused ? <i class="fa-solid fa-play"></i> : <i class="fa-solid fa-pause"></i>}
                                                </button>
                                            </div>
                                        </div>
                                     
                                        <div className='question_paper '>
                                            <div className=''>
                                                <div className='row' style={{ backgroundColor: '#bab0a65c' }}>
                                                    <div className='col-12 py-2'>
                                                        <div className='flex-row d-flex'>
                                                       
                                                            <div className='qust'>
                                                                ({quiz?.Quize?.TotalQuestions}) Questions
                                                            </div>
                                                            <div>
                                                                <div className='flex-row d-flex ml--40'>
                                                                    <div>
                                                                        <i className="fa-clock fa-light"></i>
                                                                    </div>
                                                                    <div className='flex-row d-flex ml--10'>
                                                                        {quiz?.Quize?.QuizzTestDuration} minutes
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='flex-row d-flex mt-5'>
                                                <div className='questnum mr-20'>
                                                    <span>{currentQuestionIndex + 1}</span>
                                                </div>
                                                <div className='outof' style={{ paddingLeft: "11px" }}>
                                                    <p>
                                                        Question  ({currentQuestionIndex + 1} of {quiz?.Quize?.Questions.length})
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='flex-row d-flex' style={{ justifyContent: 'space-between' }}>
                                                <div className='mt-3 ml-60'>
                                                    <p>{currentQuestion?.Questions}</p>
                                                </div>
                                                <div className='mt-3 ml-60'>
                                                    <p>{currentQuestion?.Type}</p>
                                                </div>
                                            </div>
                                            <div className='row ml-50'>

                                                <div className='mt-3'>
                                                    <form onSubmit={handleSubmit}>
                                                        <div className='row'>
                                                            <div className='col-12 col-md-6 col-xl-6 col-lg-6'>
                                                                <input type='hidden' name='QuizeId' value={quiz?.Quize?.id} />
                                                                <input type='hidden' name='QuestionId'  value={currentQuestion?.id} />

                                                                {currentQuestion  && (
                                                                    <div key={currentQuestionIndex}>
                                                                        <h3>Question {currentQuestionIndex + 1}</h3>
                                                                        {Array.isArray(quiz.Quize.Questions[currentQuestionIndex].Answer) ? (
                                                                            ['Options1', 'Options2', 'Options3', 'Options4'].map((option, index) => (
                                                                                <div className='flex-row d-flex options mt-2' key={index}>
                                                                                    <input
                                                                                        type='checkbox'
                                                                                        name={`AnswersStudent`}
                                                                                        style={{ opacity: '1', position: 'static', height: '31px', width: '14px', marginRight: '8px' }}
                                                                                        value={String.fromCharCode(97 + index)} // 'a', 'b', 'c', 'd'
                                                                                        checked={selectedAnswer?.includes(String.fromCharCode(97 + index))}
                                                                                        onChange={(e) => handleChange(e)}
                                                                                    />
                                                                                    <p>{quiz.Quize.Questions[currentQuestionIndex][option]}</p>
                                                                                </div>
                                                                            ))
                                                                        ) :  (
                                                                            ['Options1', 'Options2', 'Options3', 'Options4'].map((option, index) => (
                                                                                <div className='flex-row d-flex options mt-2' key={index}>
                                                                                    <input
                                                                                        type='radio'
                                                                                        name={`AnswersStudent${currentQuestionIndex}`}
                                                                                        style={{ opacity: '1', position: 'static', height: '31px', width: '14px', marginRight: '8px' }}
                                                                                        value={String.fromCharCode(97 + index)} // 'a', 'b', 'c', 'd'
                                                                                        checked={selectedAnswer === String.fromCharCode(97 + index)}
                                                                                        onChange={(e) => handleChange(e)}
                                                                                    />
                                                                                    <p>{currentQuestion[option]}</p>
                                                                                </div>
                                                                            ))
                                                                        )}
                                                                    </div>
                                                                )}

                                                           
                                                                <div className='flex-row d-flex justify-content-between mt-5'>
                                                                    <div className='prqust'>
                                                                        <button type='button' onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
                                                                            <i className="fa-arrow-left fa-regular fa-sharp mr--10"></i> Previous
                                                                        </button>
                                                                    </div>
                                                                    <div className='prqust'>
                                                                        <button type='button' onClick={handleNext} disabled={currentQuestionIndex >= (quiz?.Quize?.Questions.length - 1)}>
                                                                            Next <i className="fa-arrow-right fa-regular fa-sharp ml--10"></i>
                                                                        </button>
                                                                    </div>
                                                                    <div>
                                                                        <button type='submit' className="btn btn-primary">Submit</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>

                                            </div>
                                        </div>
                                     
                                    </>
                                ) : (
                                    <p>No quiz data available</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AttemtedQuestionComponent;
