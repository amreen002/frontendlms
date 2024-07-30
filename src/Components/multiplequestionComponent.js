import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Navbarmenu from "./Navbarmenu";
import Sidebar from "./sidebar";
import DashboardCard from "./dashboardcardComponent";
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Select, { StylesConfig } from 'react-select'
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();
const { REACT_APP_API_ENDPOINT, REACT_APP_API_IMG } = process.env;
function MultiplequestionComponent(token) {
    const navigate = useNavigate();

    //Dropdown Navigation
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [singleOption, setSingleOption] = useState([])
    const [selectedOption, setSelectedOption] = useState('');
    const [selectednewquestion, setselectednewquestion] = useState('');
    const [numQuestions, setNumQuestions] = useState(0);
    const { questionId } = useParams();
    const { quizzeId } = useParams();
    const [question, setQuestion] = useState([]);
    const [studentId, setStudentId] = useState({});
    const [forms, setForms] = useState([]);
    const [options, setOptions] = useState([]);
    const [FindOneQuestion, setFindOneQuestion] = useState({})
    const [CategoryId, setCategoryId] = useState('');
    const [quizze, setQuizze] = useState([]);
    const [category, setCategory] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [QuizzeFindOne, setQuizzeFindOne] = useState('')
    const [StudentsFindAll, setStudentsFindAll] = useState([]);
    const [Instructor, setInstructor] = useState('')

    const handleSelectQuestion = (e, index) => {
        const updatedQuestionType = [...selectednewquestion];
        updatedQuestionType[index] = e.target.value;
        setselectednewquestion(updatedQuestionType);
    };
    useEffect(() => {
        fetchDataQuizzeFindOne(quizzeId)
    }, [quizzeId]);

    useEffect(() => {
        if (forms) {
            const updatedForms = forms.map(form => ({
                ...form,
                studentId: form.studentId ? form.studentId.map(id => String(id)) : []
            }));
            setForms(updatedForms);
        }
    }, [forms]);

    useEffect(() => {
        fetchDataQuestion();
        fetchDataQuizze()
        fetchDataQuestionscategory()
    }, []);

    useEffect(() => {
        fetchDataFindAllStudents(Instructor)
    }, [Instructor]);


    useEffect(() => {
        setNumQuestions(forms.length);
    }, [forms]);


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


    const fetchDataQuizze = async () => {
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
                setQuizzeFindOne(userData)
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

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
                setCategory(userDatas)
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
                const studentdata = response.data.students.rows.map(s => ({
                    value: s.id,
                    label: s.Name
                }));
                setOptions(studentdata);
                setStudentsFindAll(userData)
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const [selectedQuestionType, setSelectedQuestionType] = useState('');
    const [selectedStudents, setSelectedStudents] = useState({});

    const [questionsData, setQuestionsData] = useState({
        Questions: '',
        Type: '',
        CategoryId: '',
        QuizzeId: '',
        Options1: '',
        Options2: '',
        Options3: '',
        Options4: '',
        Answer: [] || '',
        studentId: []
    });


    const toggleDropdown = (index, state) => {
        const updatedExpandedState = { ...isExpanded };
        updatedExpandedState[index] = state;
        setIsExpanded(updatedExpandedState);
    };



    const handleOptionSelect = (option, index) => {
        const updatedOptions = { ...selectedOptions };
        if (!updatedOptions[index]) {
            updatedOptions[index] = [];
        }
        if (updatedOptions[index].includes(option)) {
            updatedOptions[index] = updatedOptions[index].filter(item => item !== option);
        } else {
            updatedOptions[index].push(option);
        }
        setSelectedOptions(updatedOptions);
        const updatedForms = [...forms];
        if (!updatedForms[index]) {
            updatedForms[index] = {};
        }
        updatedForms[index].selectedOptions = updatedOptions[index];
        updatedForms[index].Answer = updatedOptions[index];
        setForms(updatedForms);
    };
    
    

    const handleOptionChange = (e, formIndex) => {
        const { value } = e.target;
        setSelectedOption(value);
        setForms(prevForms => {
            const updatedForms = [...prevForms];
            if (updatedForms[formIndex]) {
                updatedForms[formIndex].Answer = value;
            }
            return updatedForms;
        });
    };

    const handleStudentSelection = (selectedOptions, formIndex) => {
        const selectedIds = selectedOptions ? selectedOptions.map(option => String(option.value)) : [];
        const updatedForms = forms.map((form, i) => (
            i === formIndex ? { ...form, studentId: selectedIds } : form
        ));
        setForms(updatedForms);
        console.log('Updated Forms after selection:', updatedForms);
    };

    

    const handleRemoveOption = (formIndex, optionIndex) => {
        const updatedForms = [...forms];
        const optionKey = `Options${optionIndex + 1}`;
        delete updatedForms[formIndex][optionKey];
        setForms(updatedForms);
    };
    const handleRemoveForm = (index) => {
        // Clone the forms array and remove the item at the specified index
        const updatedForms = forms.filter((_, i) => i !== index);
        
        // Update the state with the modified forms
        setForms(updatedForms);
    };
    

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!Array.isArray(forms)) {
            console.error('Forms is not an array:', forms);
            alert('Data format is incorrect.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (token) {
                for (const formData of forms) {
                    await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/question`, formData, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        }
                    });
                }
                alert('All questions have been successfully created.');
                navigate('/instructor/viewquize');
            } else {
                throw new Error('No authentication token found');
            }
        } catch (error) {
            console.error('Error submitting forms:', error);
            alert('Failed to submit forms. Please try again.');
        }
    };


    // Handle adding a new form
    const handleAddQuestionForm = () => {
        setForms(prevForms => {
            if (!Array.isArray(prevForms)) {
                console.error('Expected prevForms to be an array, but received:', prevForms);
                return [];
            }

            if (prevForms.length < QuizzeFindOne.TotalQuestions) {
                return [...prevForms, { ...questionsData }];
            } else {
                alert("You have reached the maximum number of questions");
                return prevForms;
            }
        });

        setNumQuestions(prevNum => prevNum + 1);
    };





    // Handle input changes for a specific form

    const handleInputChange = (index, name, value) => {
        setForms(prevForms => {
            const updatedForms = [...prevForms];
            updatedForms[index] = { ...updatedForms[index], [name]: value };
            return updatedForms;
        })
    }
    



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



                                <>
                                    <table className='table'>
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
                                                        ({QuizzeFindOne.EasyQuestions}) Questions
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Total Medium (2 Mark)</td>
                                                <td>
                                                    <div className='qust'>
                                                        ({QuizzeFindOne.MediumQuestions}) Questions
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Total Hard (4 Mark)</td>
                                                <td>
                                                    <div className='qust'>
                                                        ({QuizzeFindOne.HardQuestions}) Questions
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
                                                        ({QuizzeFindOne.TotalQuestions}) Total Questions
                                                    </div>
                                                    <div className='flex-row d-flex ml--40'>
                                                        <div className='qust'>
                                                            ({QuizzeFindOne.TotalMarks}) Total Marks
                                                        </div>
                                                    </div>

                                                    <div className='flex-row d-flex ml--40'>
                                                        <div>
                                                            <i className="fa fa-clock"></i>
                                                        </div>
                                                        <div className='flex-row d-flex ml--10'>
                                                            {QuizzeFindOne && QuizzeFindOne.QuizzTestDuration} Time
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='container mt-5'>
                                        <div className="col-3 mb-3 d-flex mt-3">
                                            <button type="button" className="btn btn-primary me-sm-3 me-1 data-submit" onClick={handleAddQuestionForm}>
                                                <i className="fa fa-plus-circle" />
                                            </button>
                                        </div>
                                        <div>Number of Questions: {numQuestions}</div>
                                        <form onSubmit={handleSubmit}>
                                            {Array.isArray(forms) && forms.map((form, index) => (
                                                <Accordion key={index} defaultActiveKey="0">
                                                    <Accordion.Item eventKey={index.toString()}>
                                                        <Accordion.Header>
                                                            
                                                            <div>
                                                            Add Multiple Question {index + 1}
                                                                <i className="fa-light fa-trash-alt crl" onClick={() => handleRemoveForm(index)}></i>
                                                            </div>
                                                        </Accordion.Header>
                                                        <Accordion.Body>
                                                            <div className='row'>
                                                                <div className='col-12 col-md-6 mt-5'>
                                                                    <label className='pb-2'>Choose Type Of Questions</label>
                                                                    <select
                                                                        className='inputts'
                                                                        name="Type"
                                                                        value={form.Type}
                                                                        onChange={(e) => handleInputChange(index, 'Type', e.target.value)}
                                                                    >
                                                                        <option value="">Select</option>
                                                                        <option value="Number of Easy Questions (1 Mark)">Number of Easy Questions (1 Mark)</option>
                                                                        <option value="Number of Medium Questions (2 Mark)">Number of Medium Questions (2 Mark)</option>
                                                                        <option value="Number of Hard Questions (4 Mark)">Number of Hard Questions (4 Mark)</option>
                                                                    </select>
                                                                </div>

                                                                <div className="col-12 col-md-6 mt-5">
                                                                    <label className="pb-2">Students Assign to Questions</label>
                                                                    <Select
                                                                        isMulti
                                                                        value={options.filter(option => form.studentId ? form.studentId.includes(String(option.value)) : [])}
                                                                        name='studentId'
                                                                        onChange={(selectedOptions) => handleStudentSelection(selectedOptions, index)}
                                                                        options={options}
                                                                        components={animatedComponents}
                                                                        inputId="exampleFormControlSelect2"
                                                                    />
                                                                </div>

                                                                <div className='col-12 col-md-6 mt-5'>
                                                                    <label className='pb-2'>Category</label>
                                                                    <select
                                                                        className='inputts'
                                                                        name="CategoryId"
                                                                        value={form.CategoryId}
                                                                        onChange={(e) => handleInputChange(index, 'CategoryId', e.target.value)}
                                                                    >
                                                                        <option value="">Select</option>
                                                                        {category.map(cat => (
                                                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>

                                                                <div className='col-12 col-md-6 mt-5'>
                                                                    <label className='pb-2'>Quiz</label>
                                                                    <select
                                                                        className='inputts'
                                                                        name="QuizzeId"
                                                                        value={form.QuizzeId}
                                                                        onChange={(e) => handleInputChange(index, 'QuizzeId', e.target.value)}
                                                                    >
                                                                        <option value="">--Select---</option>
                                                                        <option key={QuizzeFindOne.id} value={QuizzeFindOne.id}>{QuizzeFindOne.QuizzName}</option>
                                                                    </select>
                                                                </div>

                                                                <div className='col-12 col-md-6 col-lg-6 col-xl-6 mt-5'>
                                                                    <label className='pb-2'>Add a new question</label>
                                                                    <select
                                                                        className='inputts'
                                                                        name="videoselect"
                                                                        onChange={(e) => handleSelectQuestion(e, index)}
                                                                    >
                                                                        <option value={''}>Add a new question</option>
                                                                        <option value={'Multiple_Choice'}>Multiple Choice</option>
                                                                        <option value={'Fill_in_the_Blank'}>Fill in the Blank</option>
                                                                        <option value={'Comprehension'}>Comprehension</option>
                                                                    </select>
                                                                </div>

                                                                <div className='col-12 mt-5 shadow-sm p-3 mb-5 bg-body-tertiary rounded'>
                                                                    <input
                                                                        type='text'
                                                                        className='inputts ints'
                                                                        placeholder='Type question here'
                                                                        name='Questions'
                                                                        value={form.Questions || ''}
                                                                        onChange={(e) => handleInputChange(index, 'Questions', e.target.value)}
                                                                    />
                                                                </div>
                                                                {selectednewquestion[index] === 'Fill_in_the_Blank' &&  (
                                                                    <div className='container mt-5'>
                                                                        <div className='row mt-5'>
                                                                            {['a', 'b', 'c', 'd'].map((option, idx) => (
                                                                                <div className='col-12 col-md-3 col-xl-3 col-lg-3' key={option}>
                                                                                    <div className='shadow-sm p-3 mb-5 bg-body-tertiary rounded'>
                                                                                        <div className='d-flex iconss'>
                                                                                            <div>
                                                                                                <i className="fa-light fa-trash-alt crl" onClick={() => handleRemoveOption(index, idx)}></i>
                                                                                            </div>
                                                                                            <div className='crls'>{option}</div>
                                                                                            <label className={`custom-radio ${form.Answer === option ? 'selected' : ''}`}>
                                                                                                <input
                                                                                                    type="radio"
                                                                                                    name={`option${index}`}
                                                                                                    value={option}
                                                                                                    checked={form.Answer === option}
                                                                                                    onChange={(e) => handleOptionChange(e, index)}
                                                                                                />
                                                                                            </label>
                                                                                        </div>
                                                                                        <input
                                                                                            type='text'
                                                                                            className='inputts ints'
                                                                                            placeholder='Type answer here'
                                                                                            name={`Options${idx + 1}`}
                                                                                            value={form[`Options${idx + 1}`] || ''}
                                                                                            onChange={(e) => handleInputChange(index, `Options${idx + 1}`, e.target.value)}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                            <div className='col-12 col-md-6 col-xl-6 col-lg-6'></div>
                                                                            <div className='col-12 col-md-3 col-xl-3 col-lg-3'></div>
                                                                            <div className='col-12 col-md-3 col-xl-3 col-lg-3 d-flex'>
                                                                                <div className='inputts mt-3'>
                                                                                    <label>Answer:
                                                                                        <input name="Answer" value={form.Answer || ''} readOnly />
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                {selectednewquestion[index] === 'Multiple_Choice' &&  (
                                                                    <div className='row mt-5'>
                                                                        <div className='col-12 col-md-6 col-xl-6 col-lg-6'>
                                                                            <a className='crans' onClick={() => toggleDropdown(index,'single')}>Single Correct Answer</a>
                                                                            <a className='crans ml--10' onClick={() => toggleDropdown(index,'multiple')}>Multiple Correct Answers</a>
                                                                        </div>

                                                                        {isExpanded[index] === "multiple" && (
                                                                            <div className='row mt-5'>
                                                                                {['a', 'b', 'c', 'd'].map((option, idx) => (
                                                                                    <div className='col-12 col-md-3 col-xl-3 col-lg-3' key={option}>
                                                                                        <div className='shadow-sm p-3 mb-5 bg-body-tertiary rounded'>
                                                                                            <div className='d-flex iconss'>
                                                                                                <div>
                                                                                                    <i className="fa-light fa-trash-alt crl" onClick={() => handleRemoveOption(index, idx)}></i>
                                                                                                </div>
                                                                                                <div className='crls'>{option}</div>
                                                                                                <label className={`custom-checkbox ${forms[index]?.selectedOptions?.includes(option) ? 'selected' : ''}`}>
                                                                                                    <input
                                                                                                        type="checkbox"
                                                                                                        name={`option${idx}`}
                                                                                                        value={option}
                                                                                                        checked={forms[index]?.selectedOptions?.includes(option) || false}
                                                                                                        onChange={() => handleOptionSelect(option, index)}
                                                                                                    />
                                                                                                </label>
                                                                                            </div>
                                                                                            <input
                                                                                                type='text'
                                                                                                className='inputts ints'
                                                                                                placeholder='Type answer here'
                                                                                                name={`Options${idx + 1}`}
                                                                                                value={forms[index]?.[`Options${idx + 1}`] || ''}
                                                                                                onChange={(e) => handleInputChange(index, `Options${idx + 1}`, e.target.value)}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                ))}
                                                                                <div className='col-12 col-md-6 col-xl-6 col-lg-6'></div>
                                                                                <div className='col-12 col-md-3 col-xl-3 col-lg-3'></div>
                                                                                <div className='col-12 col-md-3 col-xl-3 col-lg-3 d-flex mt-3'>
                                                                                    {forms[index]?.selectedOptions?.map(option => (
                                                                                        <div className='selected-option boxs' key={option}>
                                                                                            <input value={option} name="Answer" readOnly />
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                        )}
        

                                                                        {isExpanded[index] === "single" &&  (
                                                                            <div className='row mt-5'>
                                                                                {['a', 'b', 'c', 'd'].map((option, idx) => (
                                                                                    <div className='col-12 col-md-3 col-xl-3 col-lg-3' key={option}>
                                                                                        <div className='shadow-sm p-3 mb-5 bg-body-tertiary rounded'>
                                                                                            <div className='d-flex iconss'>
                                                                                                <div>
                                                                                                    <i className="fa-light fa-trash-alt crl" onClick={() => handleRemoveOption(index, idx)}></i>
                                                                                                </div>
                                                                                                <div className='crls'>{option}</div>
                                                                                                <label className={`custom-radio ${form.Answer === option ? 'selected' : ''}`}>
                                                                                                    <input
                                                                                                        type="radio"
                                                                                                        name={`option${idx}`}
                                                                                                        value={option}
                                                                                                        checked={form.Answer === option}
                                                                                                        onChange={(e) => handleOptionChange(e, index)}
                                                                                                    />
                                                                                                </label>
                                                                                            </div>
                                                                                            <input
                                                                                                type='text'
                                                                                                className='inputts ints'
                                                                                                placeholder='Type answer here'
                                                                                                name={`Options${idx + 1}`}
                                                                                                value={form[`Options${idx + 1}`] || ''}
                                                                                                onChange={(e) => handleInputChange(index, `Options${idx + 1}`, e.target.value)}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                ))}
                                                                                <div className='col-12 col-md-6 col-xl-6 col-lg-6'></div>
                                                                                <div className='col-12 col-md-3 col-xl-3 col-lg-3'></div>
                                                                                <div className='col-12 col-md-3 col-xl-3 col-lg-3 d-flex'>
                                                                                    <div className='inputts mt-3'>
                                                                                        <label>Answer:
                                                                                            <input name="Answer" value={form.Answer || ''} readOnly />
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                </Accordion>
                                            ))}
                                            <div className="col-3 mb-3 d-flex mt-3">
                                                <button type="submit" className="btn btn-primary me-sm-3 me-1 data-submit">
                                                    Submit
                                                </button>
                                                <button type="reset" className="btn btn-label-secondary">
                                                    Cancel
                                                </button>
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