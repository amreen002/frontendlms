import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbarmenu from './Navbarmenu';
import Sidebar from './sidebar';
import DashboardCard from './dashboardcardComponent';

const { REACT_APP_API_ENDPOINT } = process.env;

function StudentquizattemptComponent() {
  const [questions, setQuestions] = useState([]);
  const [studentquize, setStudentQuize] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [activeEventKey, setActiveEventKey] = useState(null);
  const [uniqueQuizzes, setUniqueQuizzes] = useState([]);
  const [uniqueQuestions, setUniqueQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
    fetchDataStudentResult();
  }, []);

  const fetchQuestions = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.get(`${REACT_APP_API_ENDPOINT}/question?student=true`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const userData = response.data?.questions || [];  // Ensure userData is an array
        setQuestions(userData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchDataStudentResult = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.get(`${REACT_APP_API_ENDPOINT}/studentquize`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const useData = response.data?.studentsquize || [];  // Ensure useData is an array
        setStudentQuize(useData);
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  const handleShow = (quiz) => {
    setCurrentQuiz(quiz);
    navigate('/attemptquestion', { state: { quiz } });  // Pass quiz data with navigate
  };

  const attemptedQuizzes = studentquize?.map(sq => sq.QuizeId) || []; // Ensure `studentquize` is not undefined

  useEffect(() => {
    if (Array.isArray(questions)) {
      // Filter unique questions based on QuizzeId
      const uniqueQuestionsList = questions?.filter((item, index, self) =>
        index === self.findIndex((t) => t.QuizzeId === item.QuizzeId  )
      ) || [];
      setUniqueQuestions(uniqueQuestionsList);

      // Extract unique topic names from questions
      const uniqueTopicNames = new Set();
      questions.forEach(item => {
        if (item?.Quize?.courses && Array.isArray(item.Quize.courses)) {
          item.Quize.courses.forEach(course => {
            if (Array.isArray(course?.topics)) {
              course.topics.forEach(topic => {
                if (topic?.name) {
                  uniqueTopicNames.add(topic.name);
                }
              });
            }
          });
        }
      });

      // Map unique topic names to corresponding quizzes
      const quizzes = Array.from(uniqueTopicNames).map(name => {
        return questions.find(item =>item?.Quize?.courses && Array.isArray(item.Quize.courses) && item.Quize.courses.some(course =>Array.isArray(course.topics) && course.topics.some(topic => topic.name === name)
          )
        );
      });

      setUniqueQuizzes(quizzes);
      
    } else {
      console.error("questions is not a valid array.");
    }
  }, [questions]);

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
              <div className="right-sidebar-dashboard">
                <h5 className="title">Quiz Attempted</h5>
                <div className='accordion'>
                  {uniqueQuizzes.map((quiz, index) => (
                    <div className='card' key={quiz.Quize.id}>
                      <div className='card-header qiuze-view'>
                        <div className="d-flex justify-content-between">
                          <div className="d-flex align-items-start">
                            <button
                              variant="link"
                              onClick={() => setActiveEventKey(activeEventKey === String(index) ? null : String(index))}
                            >
                              {quiz?.Quize?.courses?.map((course, courseIndex) => (
                                <div key={courseIndex}>
                                  {course?.topics?.map((topic, topicIndex) => (
                                    <h5 key={topicIndex}> {index + 1}. {topic?.name}</h5>
                                  ))}
                                </div>
                              ))}
                            </button>
                          </div>
                        </div>
                      </div>
                      {activeEventKey === String(index) && (
                        <div className="accordion-collapse collapse show" eventKey={String(index)}>
                          <div className='card-body'>
                            {uniqueQuestions
                              .filter(item =>
                                item.Quize?.courses?.some(course =>
                                  course.topics?.some(topic =>
                                    quiz.Quize?.courses?.some(c =>
                                      c.topics?.some(t => t.name === topic.name)
                                    )
                                  )
                                )
                              )
                              .map((item, qIndex) => (
                                <div key={qIndex} className="quiz-card mb-3 p-3 border rounded">
                                  <div className='row '>

                                    <div className="d-flex align-items-center justify-content-between">
                                      <div className="col-md-10">
                                        <div className="quiz-details">
                                          <p className="quiz-name mb-1">{item.Quize?.QuizzName}</p>
                                          {/*     <p className="quiz-description text-muted mb-0">
                                        {quiz.Quize?.courses?.map((course, index) => course.Description) || 'No description available'}
                                      </p> */}

                                        </div>
                                      </div>
                                      <div className="col-md-2">
                                        <Button
                                          className="start-button"
                                          variant="primary"
                                          onClick={() => handleShow(item)}
                                          disabled={attemptedQuizzes.includes(item.Quize?.id)}
                                        >
                                          {attemptedQuizzes.includes(item.Quize?.id) ? 'Quiz Attempted' : 'Start Quiz'}
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
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
    </div>

  );
}

export default StudentquizattemptComponent;
