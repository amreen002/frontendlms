import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Navbarmenu from "./Navbarmenu";
import Sidebar from "./sidebar";
import DashboardCard from "./dashboardcardComponent";
import Accordion from 'react-bootstrap/Accordion';
import { TupleSchema } from 'yup';
const { REACT_APP_API_ENDPOINT, REACT_APP_API_IMG } = process.env;
function MultiplequestionComponent(token) {
    const navigate = useNavigate();
    const { questionId, quizzeId } = useParams();
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [singleOption, setSingleOption] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [selectednewquestion, setselectednewquestion] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [question, setQuestion] = useState([]);
    const [Questions, setQuestions] = useState('');
    const [Type, setType] = useState('');
    const [Options1, setOptions1] = useState('');
    const [Options2, setOptions2] = useState('');
    const [Options3, setOptions3] = useState('');
    const [Options4, setOptions4] = useState('');
    const [Answer, setAnswer] = useState([]);
    const [QuizzeId, setQuizzeId] = useState('');
    const [studentId, setStudentId] = useState({});
    const [FindOneQuestion, setFindOneQuestion] = useState({});
    const [CategoryId, setCategoryId] = useState('');
    const [quizze, setQuizze] = useState([]);
    const [category, setCategory] = useState([]);
    const [QuizzeFindOne, setQuizzeFindOne] = useState('');
    const [StudentsFindAll, setStudentsFindAll] = useState([]);
    const [Instructor, setInstructor] = useState('');

    const toggleDropdown = (serviceName) => {
        setIsExpanded(isExpanded === serviceName ? '' : serviceName);
    };

    const handleSelectQuestion = (e) => {
        let value = e.target.value;
        setselectednewquestion(value || '');
    };

    const handleOptionChange = (e) => {
        let value = e.target.value;
        setSelectedOption(value || '');
        setAnswer(value || '');
    };

    const handleOptionSelect = (option) => {
        if (selectedOptions.includes(option)) {          
            const newSelectedOptions = selectedOptions.filter(item => item !== option);
            setSelectedOptions(newSelectedOptions);
            setSingleOption(newSelectedOptions)
            setAnswer(newSelectedOptions);
            console.log(newSelectedOptions)
        } else {
            const newSelectedOptions = [...selectedOptions, option];
            setSelectedOptions(newSelectedOptions);
            setSingleOption(newSelectedOptions)
            console.log(newSelectedOptions)
            setAnswer(newSelectedOptions);
        } 
    };

    useEffect(() => {
        fetchDataQuestionFindOne(questionId);
    }, [questionId]);

/*     useEffect(() => {
        fetchDataQuizzeFindOne(quizzeId);
    }, [quizzeId]); */

    useEffect(() => {
        fetchDataQuestion();
        fetchDataQuizze();
        fetchDataQuestionscategory();
    }, []);

    useEffect(() => {
        fetchDataFindAllStudents(Instructor);
    }, [Instructor]);

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
                setQuestion(userData);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchDataQuizze = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/quizze`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const userData = response.data.quizze;
                setQuizze(userData);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchDataQuizzeFindOne = async (quizzeId) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/quizze/${quizzeId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const userData = response.data.quizze;
                setQuizzeFindOne(userData);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchDataQuestionscategory = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/questionscategory`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const userDatas = response.data.questionscategory;
                setCategory(userDatas);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchDataQuestionFindOne = async (questionId) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/question/${questionId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const userData = response.data.questions;

                setFindOneQuestion(userData);
                setQuestions(userData.Questions);
                setType(userData.Type);
                setOptions1(userData.Options1);
                setOptions2(userData.Options2);
                setOptions3(userData.Options3);
                setOptions4(userData.Options4);
                setQuizzeId(userData.QuizzeId);
                setCategoryId(userData.CategoryId);

                const initialStudentState = {};
                userData.Students.map(student => {
                    initialStudentState[student.id] = true ;
                });
                setStudentId(initialStudentState)
                let initialAnswerState = {};

                if (Array.isArray(userData.Answer)) {
                    userData.Answer.forEach((answer) => {
                        initialAnswerState[answer] = true;
                    });
                    const answerArray = Object.keys(initialAnswerState);
                     setAnswer(answerArray); 
                } else if (typeof userData.Answer === 'string') {
                    initialAnswerState = userData.Answer;
                    setAnswer(initialAnswerState);
                }
            } else {
                console.warn('No token found in localStorage');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchDataFindAllStudents = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/liststudents?Instructor=true`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const userData = response.data.students.rows;
                setStudentsFindAll(userData);
            }
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const handleChangestudent = (id) => {
        setStudentId(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };


    const handleUpdate = async (e) => {
        e.preventDefault();
        const selectedStudents = Object.keys(studentId).filter((id) => studentId[id]);
        try {
            let formData = {
                Questions,
                Type,
                CategoryId,
                QuizzeId,
                Options1,
                Options2,
                Options3,
                Options4,
                Answer,
                studentId: selectedStudents,
            };

            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.patch(`${REACT_APP_API_ENDPOINT}/question/${questionId}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                await fetchDataQuestionFindOne(questionId);
                window.location.href = `/instructor/viewquize`;
                alert('Question Successfully Updated');
            }
        } catch (error) {
            alert('Failed to send message.');
        }
    };

    const toggleDropdown1 = () => {
        setDropdownOpen(!dropdownOpen);
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
                            <div class="right-sidebar-dashboard" style={{ backgroundColor: '#fff' }}>
                                <h5 class="title">Multiple Questions</h5>



                                <><table className='table'>
                                    <thead>
                                        <tr>
                                            <th>Type</th>
                                            <th>Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Total Easy (1 Mark)</td>
                                            <td>
                                                <div className='qust'>
                                                    ({FindOneQuestion.Quize && FindOneQuestion.Quize.EasyQuestions}) Questions
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Total Medium (2 Mark)</td>
                                            <td>
                                                <div className='qust'>
                                                    ({FindOneQuestion.Quize && FindOneQuestion.Quize.MediumQuestions}) Questions
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Total Hard (4 Mark)</td>
                                            <td>
                                                <div className='qust'>
                                                    ({FindOneQuestion.Quize && FindOneQuestion.Quize.HardQuestions}) Questions
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>


                                    <div className='mt-2'>
                                        <div className='row' style={{ backgroundColor: 'rgba(49, 4, 2, 0.58)', color: "#fff" }}>
                                            <div className='col-12 py-2'>
                                                <div className='flex-row d-flex ml--40'>
                                                    <div className='qust'>
                                                        ({FindOneQuestion.Quize && FindOneQuestion.Quize.TotalQuestions}) Total Questions
                                                    </div>
                                                    <div className='flex-row d-flex ml--40'>
                                                        <div className='qust'>
                                                            ({FindOneQuestion.Quize && FindOneQuestion.Quize.TotalMarks}) Total Marks
                                                        </div>
                                                    </div>

                                                    <div className='flex-row d-flex ml--40'>
                                                        <div>
                                                            <i className="fa fa-clock"></i>
                                                        </div>
                                                        <div className='flex-row d-flex ml--10'>
                                                            {FindOneQuestion.Quize && FindOneQuestion.Quize.QuizzTestDuration} Time
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className='row mt-5'>

                                        <form onSubmit={handleUpdate} >
                                            <div className='row'>
                                                <div className='col-12 col-md-6 col-lg-6 col-xl-6 mt-5' >
                                                    <label className='pb-2'>Choose Type Of Questions</label>
                                                    <select className='inputts' name="Type" value={Type} onChange={(e) => setType(e.target.value)}>
                                                        <option value="">Select</option>
                                                        <option value="Number of Easy Questions (1 Mark)">Number of Easy Questions (1 Mark)</option>
                                                        <option value="Number of Medium Questions (2 Mark)">Number of Medium Questions (2 Mark)</option>
                                                        <option value="Number of Hard Questions (4 Mark)">Number of Hard Questions (4 Mark)</option>
                                                    </select>
                                                </div>
                                                <div className="col-12 col-md-6 col-lg-6 col-xl-6 mt-5">
                                                    <label className="pb-2">Students Assigned to Questions</label>
                                                   
                                                    <div className="dropdown">
                                                        <button className='crans'type="button" onClick={toggleDropdown1} aria-haspopup="true" aria-expanded={dropdownOpen}>
                                                            Select Students
                                                        </button>
                                                       
                                                        {dropdownOpen && (
                                                            <div className="dropdown-menu show w-100">
                                                                {StudentsFindAll.map((student) => (
                                                                    <div key={student.id} className="dropdown-item d-flex align-items-center">
                                                                        <input
                                                                            type="checkbox"
                                                                            className=" me-2"
                                                                            id={`dropdown_student_${student.id}`}
                                                                            checked={!!studentId[student.id]}
                                                                            onChange={() => handleChangestudent(student.id)}
                                                                            disabled={!!studentId[student.id]} 
                                                                    
                                                                        />
                                                                        <label className="form-check-label" htmlFor={`dropdown_student_${student.id}`}>
                                                                            {student.Name}
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                
                                                    
                                                </div>


                                                <div className='col-12 col-md-6 col-lg-6 col-xl-6 mt-5' >
                                                    <label className='pb-2'>Category</label>
                                                    <select className='inputts' name="CategoryId" value={CategoryId} onChange={(e) => setCategoryId(e.target.value)}>
                                                        <option value="">Select</option>
                                                        {category.map((option) => (
                                                            <option key={option.id} value={option.id}>{option.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className='col-12 col-md-6 col-lg-6 col-xl-6 mt-5' >
                                                    <label className='pb-2'>Quizzed</label>
                                                    <select className='inputts' name="QuizzeId" value={QuizzeId} onChange={(e) => setQuizzeId(e.target.value)}>
                                                        <option value="">--Select---</option>
                                                        <option key={FindOneQuestion.Quize && FindOneQuestion.Quize.id} value={FindOneQuestion.Quize && FindOneQuestion.Quize.id}>{FindOneQuestion.Quize && FindOneQuestion.Quize.QuizzName}</option>

                                                    </select>
                                                </div>
                                                <div className='col-12 col-md-6 col-lg-6 col-xl-6 mt-5' >
                                                    <label className='pb-2'>Add a new question</label>
                                                    <select className='inputts' name="videoselect"
                                                        onChange={handleSelectQuestion} >
                                                        <option value={''}>Add a new question</option>
                                                        <option value={'Multiple_Choice'}>Multiple Choice</option>
                                                        <option value={'Fill_in_the_Blank'}>Fill in the Blank</option>
                                                        <option value={'Comprehension'}>Comprehension</option>
                                                    </select>


                                                </div>
                                            </div>
                                            <div className='col-12 mt-5 shadow-sm p-3 mb-5 bg-body-tertiary rounded'>
                                                <input type='text' className='inputts ints' placeholder='Type question here' name='Questions'
                                                    onChange={(e) => setQuestions(e.target.value)}
                                                    value={Questions} />
                                            </div>

                                            {selectednewquestion === 'Fill_in_the_Blank' ? (
                                                <div className='container mt-5'>
                                                    <div className='row mt-5'>
                                                        <div className='col-12 col-md-3 col-xl-3 col-lg-3 '>
                                                            <div className='shadow-sm p-3 mb-5 bg-body-tertiary rounded'>
                                                                <div className='d-flex iconss' >
                                                                    <div >
                                                                        <i class="fa-light fa-trash-alt crl"></i>
                                                                    </div>
                                                                    <div className='crls'>a</div>

                                                                    <label className={`custom-radio ${selectedOption === 'a' ? 'selected' : ''}`}>
                                                                        <input
                                                                            type="radio"
                                                                            name="optin"
                                                                            id="Green"
                                                                            value="a"
                                                                            checked={selectedOption === 'a'}
                                                                            onChange={handleOptionChange}
                                                                        />

                                                                    </label>

                                                                </div>
                                                                <input type='text' className='inputts ints ' placeholder='type answer here' name="Options1"
                                                                    onChange={(e) => setOptions1(e.target.value)}
                                                                    value={Options1} />
                                                            </div>
                                                        </div>
                                                        <div className='col-12 col-md-3 col-xl-3 col-lg-3 '>
                                                            <div className='shadow-sm p-3 mb-5 bg-body-tertiary rounded'>
                                                                <div className='d-flex iconss' >
                                                                    <div>
                                                                        <i class="fa-light fa-trash-alt crl"></i>
                                                                    </div>
                                                                    <div className='crls'>b</div>

                                                                    <label className={`custom-radio ${selectedOption === 'b' ? 'selected' : ''}`}>
                                                                        <input
                                                                            type="radio"
                                                                            name="optin"
                                                                            id="Green"
                                                                            value="b"
                                                                            checked={singleOption === "b"}
                                                                            onChange={handleOptionChange} />
                                                                    </label>

                                                                </div>
                                                                <input type='text' className='inputts ints ' placeholder='type answer here' name="Options2"
                                                                    onChange={(e) => setOptions2(e.target.value)}
                                                                    value={Options2} />
                                                            </div>
                                                        </div>
                                                        <div className='col-12 col-md-3 col-xl-3 col-lg-3 '>
                                                            <div className='shadow-sm p-3 mb-5 bg-body-tertiary rounded'>
                                                                <div className='d-flex iconss' >
                                                                    <div>
                                                                        <i class="fa-light fa-trash-alt crl"></i>
                                                                    </div>
                                                                    <div className='crls'>c</div>
                                                                    <label className={`custom-radio ${selectedOption === 'c' ? 'selected' : ''}`}>
                                                                        <input
                                                                            type="radio"
                                                                            name="optin"
                                                                            id="Green"
                                                                            value="c"
                                                                            checked={singleOption === "c"}
                                                                            onChange={handleOptionChange} />
                                                                    </label>
                                                                </div>
                                                                <input type='text' className='inputts ints ' placeholder='type answer here' name="Options3"
                                                                    onChange={(e) => setOptions3(e.target.value)}
                                                                    value={Options3} />
                                                            </div>
                                                        </div>
                                                        <div className='col-12 col-md-3 col-xl-3 col-lg-3 '>
                                                            <div className='shadow-sm p-3 mb-5 bg-body-tertiary rounded'>
                                                                <div className='d-flex iconss' >
                                                                    <div>
                                                                        <i class="fa-light fa-trash-alt crl"></i>
                                                                    </div>
                                                                    <div className='crls'>d</div>
                                                                    <label className={`custom-radio ${selectedOption === 'd' ? 'selected' : ''}`}>
                                                                        <input
                                                                            type="radio"
                                                                            name="optin"
                                                                            id="Green"
                                                                            value="d"
                                                                            checked={singleOption === "d"}
                                                                            onChange={handleOptionChange} />
                                                                    </label>

                                                                </div>
                                                                <input type='text' className='inputts ints ' placeholder='type answer here' name="Options4"
                                                                    onChange={(e) => setOptions4(e.target.value)}
                                                                    value={Options4} />
                                                            </div>
                                                        </div>
                                                        <div className='col-12 col-md-6 col-xl-6 col-lg-6'></div>
                                                        <div className='col-12 col-md-3 col-xl-3 col-lg-3'></div>
                                                        <div className='col-12 col-md-3 col-xl-3 col-lg-3 d-flex'>



                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        <div className='col-12 col-md-6 col-xl-6 col-lg-6'></div>
                                                        <div className='col-12 col-md-3 col-xl-3 col-lg-3'></div>
                                                        <div className='col-12 col-md-3 col-xl-3 col-lg-3 d-flex mt-3'>

                                                            <div className='inputts mt-3'  >
                                                                <label>Answer:
                                                                    <input value={Answer} name="Answer" onChange={(e) => setAnswer(e.target.value)} />
                                                                </label>
                                                            </div>


                                                        </div>
                                                    </div>
                                                </div>

                                            ) : selectednewquestion === 'Multiple_Choice' ? (
                                                <div className='row mt-5 '>
                                                    <div className='col-12 col-md-6 col-xl-6 col-lg-6'>
                                                        <a className='crans' onClick={() => toggleDropdown('single')}>single correct answer </a>
                                                        <a className='crans ml--10' onClick={() => toggleDropdown('multiple')}>multiple correct answer </a>
                                                    </div>

                                                    {isExpanded === "multiple" ? (
                                                        <div className='row mt-5'>
                                                            <div className='col-12 col-md-3 col-xl-3 col-lg-3 '>
                                                                <div className='d-flex' style={{ justifyContent: 'space-between', border: '1px solid #d5d5d561' }}>
                                                                    <div >
                                                                        <i class="fa-light fa-trash-alt crl"></i>
                                                                    </div>
                                                                    <div className='crls'>a</div>


                                                                    <label className={`custom-checkbox ${selectedOptions.includes('a') ? 'selected' : ''}`}>
                                                                        <input
                                                                            type="checkbox"
                                                                            name="optin"
                                                                            value="a"
                                                                            checked={selectedOptions.includes('a')}
                                                                            onChange={() => handleOptionSelect('a')}
                                                                        />

                                                                    </label>

                                                                </div>
                                                                <input type='text' className='inputts ints ' placeholder='type answer here' name="Options1"
                                                                    onChange={(e) => setOptions1(e.target.value)}
                                                                    value={Options1} />
                                                            </div>
                                                            <div className='col-12 col-md-3 col-xl-3 col-lg-3 '>
                                                                <div className='d-flex' style={{ justifyContent: 'space-between', border: '1px solid #d5d5d561' }}>
                                                                    <div>
                                                                        <i class="fa-light fa-trash-alt crl"></i>
                                                                    </div>
                                                                    <div className='crls'>b</div>
                                                                    <label className={`custom-checkbox ${selectedOptions.includes('b') ? 'selected' : ''}`}>
                                                                        <input
                                                                            type="checkbox"
                                                                            name="optin"
                                                                            value="b"
                                                                            checked={selectedOptions.includes('b')}
                                                                            onChange={() => handleOptionSelect('b')}
                                                                        />

                                                                    </label>
                                                                </div>
                                                                <input type='text' className='inputts ints ' placeholder='type answer here' name="Options2"
                                                                    onChange={(e) => setOptions2(e.target.value)}
                                                                    value={Options2} />
                                                            </div>
                                                            <div className='col-12 col-md-3 col-xl-3 col-lg-3 '>
                                                                <div className='d-flex' style={{ justifyContent: 'space-between', border: '1px solid #d5d5d561' }}>
                                                                    <div>
                                                                        <i class="fa-light fa-trash-alt crl"></i>
                                                                    </div>
                                                                    <div className='crls'>c</div>
                                                                    <label className={`custom-checkbox ${selectedOptions.includes('c') ? 'selected' : ''}`}>
                                                                        <input
                                                                            type="checkbox"
                                                                            name="optin"
                                                                            value="c"
                                                                            checked={selectedOptions.includes('c')}
                                                                            onChange={() => handleOptionSelect('c')}
                                                                        />

                                                                    </label>

                                                                </div>
                                                                <input type='text' className='inputts ints ' placeholder='type answer here' name="Options3"
                                                                    onChange={(e) => setOptions3(e.target.value)}
                                                                    value={Options3} />
                                                            </div>
                                                            <div className='col-12 col-md-3 col-xl-3 col-lg-3 '>
                                                                <div className='d-flex' style={{ justifyContent: 'space-between', border: '1px solid #d5d5d561' }}>
                                                                    <div>
                                                                        <i class="fa-light fa-trash-alt crl"></i>
                                                                    </div>
                                                                    <div className='crls'>d</div>
                                                                    <label className={`custom-checkbox ${selectedOptions.includes('d') ? 'selected' : ''}`}>
                                                                        <input
                                                                            type="checkbox"
                                                                            name="optin"
                                                                            value="d"
                                                                            checked={selectedOptions.includes('d')}
                                                                            onChange={() => handleOptionSelect('d')}
                                                                        />

                                                                    </label>

                                                                </div>
                                                                <input type='text' className='inputts ints ' placeholder='type answer here' name="Options4"
                                                                    onChange={(e) => setOptions4(e.target.value)}
                                                                    value={Options4} />
                                                            </div>
                                                            <div className='col-12 col-md-6 col-xl-6 col-lg-6'></div>
                                                            <div className='col-12 col-md-3 col-xl-3 col-lg-3'></div>
                                                            <div className='col-12 col-md-3 col-xl-3 col-lg-3 d-flex mt-3'>
                                                                {selectedOptions.map(option => (
                                                                    <div className='selected-option boxs' key={option} >
                                                                        <input value={option} name="Answer"
                                                                            onChange={(e) => setAnswer(e.target.value)}
                                                                        />
                                                                    </div>
                                                                ))}

                                                            </div>

                                                        </div>) : isExpanded === "single" ? (

                                                            <div className='row mt-5'>
                                                                <div className='col-12 col-md-3 col-xl-3 col-lg-3 '>
                                                                    <div className='shadow-sm p-3 mb-5 bg-body-tertiary rounded'>
                                                                        <div className='d-flex iconss'> <div >
                                                                            <i class="fa-light fa-trash-alt crl"></i>
                                                                        </div>
                                                                            <div className='crls'>a</div>

                                                                            <label className={`custom-radio ${selectedOption === 'a' ? 'selected' : ''}`}>
                                                                                <input
                                                                                    type="radio"
                                                                                    name="optin"
                                                                                    id="Green"
                                                                                    value="a"
                                                                                    checked={selectedOption === 'a'}
                                                                                    onChange={handleOptionChange}
                                                                                />

                                                                            </label>

                                                                        </div>
                                                                        <input type='text' className='inputts ints ' placeholder='type answer here' name="Options1"
                                                                            onChange={(e) => setOptions1(e.target.value)}
                                                                            value={Options1} />
                                                                    </div>
                                                                </div>
                                                                <div className='col-12 col-md-3 col-xl-3 col-lg-3 '>
                                                                    <div className='shadow-sm p-3 mb-5 bg-body-tertiary rounded'>
                                                                        <div className='d-flex iconss'>
                                                                            <div>
                                                                                <i class="fa-light fa-trash-alt crl"></i>
                                                                            </div>
                                                                            <div className='crls'>b</div>

                                                                            <label className={`custom-radio ${selectedOption === 'b' ? 'selected' : ''}`}>
                                                                                <input
                                                                                    type="radio"
                                                                                    name="optin"
                                                                                    id="Green"
                                                                                    value="b"
                                                                                    checked={singleOption === "b"}
                                                                                    onChange={handleOptionChange} />
                                                                            </label>

                                                                        </div>
                                                                        <input type='text' className='inputts ints ' placeholder='type answer here' name="Options2"
                                                                            onChange={(e) => setOptions2(e.target.value)}
                                                                            value={Options2} />
                                                                    </div>
                                                                </div>
                                                                <div className='col-12 col-md-3 col-xl-3 col-lg-3 '>
                                                                    <div className='shadow-sm p-3 mb-5 bg-body-tertiary rounded'>
                                                                        <div className='d-flex iconss'>
                                                                            <div>
                                                                                <i class="fa-light fa-trash-alt crl"></i>
                                                                            </div>
                                                                            <div className='crls'>c</div>
                                                                            <label className={`custom-radio ${selectedOption === 'c' ? 'selected' : ''}`}>
                                                                                <input
                                                                                    type="radio"
                                                                                    name="optin"
                                                                                    id="Green"
                                                                                    value="c"
                                                                                    checked={singleOption === "c"}
                                                                                    onChange={handleOptionChange} />
                                                                            </label>
                                                                        </div>
                                                                        <input type='text' className='inputts ints ' placeholder='type answer here' name="Options3"
                                                                            onChange={(e) => setOptions3(e.target.value)}
                                                                            value={Options3} />
                                                                    </div>
                                                                </div>
                                                                <div className='col-12 col-md-3 col-xl-3 col-lg-3 '>
                                                                    <div className='shadow-sm p-3 mb-5 bg-body-tertiary rounded'>
                                                                        <div className='d-flex iconss'>
                                                                            <div>
                                                                                <i class="fa-light fa-trash-alt crl"></i>
                                                                            </div>
                                                                            <div className='crls'>d</div>
                                                                            <label className={`custom-radio ${selectedOption === 'd' ? 'selected' : ''}`}>
                                                                                <input
                                                                                    type="radio"
                                                                                    name="optin"
                                                                                    id="Green"
                                                                                    value="d"
                                                                                    checked={singleOption === "d"}
                                                                                    onChange={handleOptionChange} />
                                                                            </label>

                                                                        </div>
                                                                        <input type='text' className='inputts ints ' placeholder='type answer here' name="Options4"
                                                                            onChange={(e) => setOptions4(e.target.value)}
                                                                            value={Options4} />
                                                                    </div>
                                                                </div>
                                                                <div className='col-12 col-md-6 col-xl-6 col-lg-6'></div>
                                                                <div className='col-12 col-md-3 col-xl-3 col-lg-3'></div>
                                                                <div className='col-12 col-md-3 col-xl-3 col-lg-3 d-flex'>

                                                                    <div className='selected-option boxs mt-3'  >
                                                                        <input value={Answer} name="Answer"
                                                                            onChange={(e) => setAnswer(e.target.value)} />
                                                                    </div>


                                                                </div>
                                                            </div>

                                                        ) : ''
                                                    }


                                                </div>
                                            ) : ''}

                                            <div class="col-3 mb-3 d-flex mt-3">
                                                <button type="submit" class="btn btn-primary me-sm-3 me-1 data-submit">Update</button>
                                                <button type="reset" class="btn btn-label-secondary" data-bs-dismiss="offcanvas">Cancel</button>
                                                <input type="hidden" />
                                            </div>
                                        </form>


                                    </div>

                                </>


                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default MultiplequestionComponent;