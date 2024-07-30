import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Footer from './footerComponent';
import Navbar from './navComponemt';
import DashBoardMenus from './dashboardsMenuComponent'; 
import ValidationaddQuestion from '../validation/addquestionValidation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
const { REACT_APP_API_ENDPOINT ,REACT_APP_API_IMG} = process.env;

function Questions() {


    //Dropdown Navigation
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleDropdown = (serviceName) => {
        setIsExpanded(isExpanded === serviceName ? '' : serviceName);
    };
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [singleOption, setSingleOption] = useState([])
    const [selectedOption, setSelectedOption] = useState('');
    const [selectednewquestion, setselectednewquestion] = useState('');
    // Function to handle option selection
    const handleOptionSelect = (option) => {
        if (selectedOptions.includes(option)) {
            const newSelectedOptions = selectedOptions.filter(item => item !== option);
            setSelectedOptions(newSelectedOptions);
            setAnswer(newSelectedOptions);
        } else {
            const newSelectedOptions = [...selectedOptions, option];
            if (newSelectedOptions) {
                setSelectedOptions(newSelectedOptions)
                setAnswer(newSelectedOptions);
            } else {
                setSelectedOptions(' ')
                setAnswer(' ')
            }

        }
    };



    const { questionId } = useParams();
    const [question, setQuestion] = useState([]);
    const [Questions, setQuestions] = useState('');
    const [Type, setType] = useState('');
    const [Options1, setOptions1] = useState('');
    const [Options2, setOptions2] = useState('')
    const [Options3, setOptions3] = useState('');
    const [Options4, setOptions4] = useState('');
    const [Answer, setAnswer] = useState([] || '');
    const [QuizzeId, setQuizzeId] = useState('');

    const [FindOneQuestion, setFindOneQuestion] = useState({})
    const [CategoryId, setCategoryId] = useState('');
    const [quizze, setQuizze] = useState([]);
    const [category, setCategory] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');


    const handleSelectQuestion = (e) => {
        let value = e.target.value;
        value ? setselectednewquestion(e.target.value) : setselectednewquestion('');
    };
    const handleOptionChange = (e) => {
        let value = e.target.value;
        value ? setSelectedOption(e.target.value) : setSelectedOption('');
        setAnswer(e.target.value);
    };
    useEffect(() => {
        fetchDataQuestionFindOne(questionId)
    }, [questionId]);

    useEffect(() => {
        fetchDataQuestion();
        fetchDataQuizze()
        fetchDataQuestionscategory()
    }, []);




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
                setAnswer(userData.Answer);
                setQuizzeId(userData.QuizzeId);
                setCategoryId(userData.CategoryId);
            } else {
                console.warn('No token found in localStorage');
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const[errors,setErrors]=useState({})

    const formData = {
        Questions,
        Type,
        CategoryId,
        QuizzeId,
        Options1,
        Options2,
        Options3,
        Options4,
        Answer,

    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedFormData = { ...formData, [name]: value };
        const validationErrors = ValidationaddQuestion(updatedFormData);
        setErrors(validationErrors);
        setQuestions(updatedFormData.Questions || '');
        setType(updatedFormData.Type || '');
        setCategoryId(updatedFormData.CategoryId || '');
        setQuizzeId(updatedFormData.QuizzeId || '');
        setOptions1(updatedFormData.Options1 || '');
        setOptions2(updatedFormData.Options2 || '');
        setOptions3(updatedFormData.Options3 || '');
        setOptions4(updatedFormData.Options4 || '');
        setAnswer(updatedFormData.Answer || '');
      
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
           

            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.post(`${REACT_APP_API_ENDPOINT}/question`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                window.location.href = "/question";
                const userdata = response.data
                toast.success(userdata.message,{
                    position: "top-right",
                    autoClose: true,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    
                 });

            }
        } catch (error) {
            toast.error(error.response.data.message,{
                position: "top-right",
                autoClose: true,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                
             });

        }
    };

    const handleDelete = async (questionId) => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
             const response =   await axios.delete(`${REACT_APP_API_ENDPOINT}/question/${questionId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                fetchDataQuestionFindOne(questionId);
                const userdata = response.data
                window.location.href = "/question";
                toast.success(userdata.message,{
                    position: "top-right",
                    autoClose: true,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    
                 });

            }
        } catch (error) {
            console.error('Error deleting data:', error);
            toast.error(error.response.data.message,{
                position: "top-right",
                autoClose: true,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                
             });

        }
    };
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            let updatedUserData = {
                Questions,
                Type,
                CategoryId,
                QuizzeId,
                Options1,
                Options2,
                Options3,
                Options4,
                Answer,
            }
            const token = localStorage.getItem('token');

            if (token) {
                const response =  await axios.patch(`${REACT_APP_API_ENDPOINT}/question/${questionId}`, updatedUserData, {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                });
                fetchDataQuestionFindOne(questionId)
                window.location.href = "/question";
                const userdata = response.data
                toast.success(userdata.message,{
                    position: "top-right",
                    autoClose: true,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    
                 });

            }
        } catch (error) {
            console.error('Error updating:', error);
            toast.error(error.response.data.message,{
                position: "top-right",
                autoClose: true,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                
             });

        }

        // Clear input fields after update

    };


    return (
        <>
            {/*     <!-- Layout wrapper --> */}
            <div class="layout-wrapper layout-content-navbar">
                <div class="layout-container">
                    {/*      <!-- Menu --> */}
                    <DashBoardMenus />
                    {/*         <!-- / Menu --> */}

                    {/*     <!-- Layout container --> */}
                    <div class="layout-page">

                        <Navbar />

                        <div class="content-wrapper">



                            <div class="container-xxl flex-grow-1 container-p-y">



                                <div class="row g-4 mb-4">
                                    <div class="col-sm-6 col-xl-3">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="d-flex align-items-start justify-content-between">
                                                    <div class="content-left">
                                                        <span>Session</span>
                                                        <div class="d-flex align-items-end mt-2">
                                                            <h4 class="mb-0 me-2">21,459</h4>
                                                            <small class="text-success">(+29%)</small>
                                                        </div>
                                                        <p class="mb-0">Total Users</p>
                                                    </div>
                                                    <div class="avatar">
                                                        <span class="avatar-initial rounded bg-label-primary">
                                                            <i class="bx bx-user bx-sm"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6 col-xl-3">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="d-flex align-items-start justify-content-between">
                                                    <div class="content-left">
                                                        <span>Paid Users</span>
                                                        <div class="d-flex align-items-end mt-2">
                                                            <h4 class="mb-0 me-2">4,567</h4>
                                                            <small class="text-success">(+18%)</small>
                                                        </div>
                                                        <p class="mb-0">Last week analytics </p>
                                                    </div>
                                                    <div class="avatar">
                                                        <span class="avatar-initial rounded bg-label-danger">
                                                            <i class="bx bx-user-check bx-sm"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6 col-xl-3">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="d-flex align-items-start justify-content-between">
                                                    <div class="content-left">
                                                        <span>Active Users</span>
                                                        <div class="d-flex align-items-end mt-2">
                                                            <h4 class="mb-0 me-2">19,860</h4>
                                                            <small class="text-danger">(-14%)</small>
                                                        </div>
                                                        <p class="mb-0">Last week analytics</p>
                                                    </div>
                                                    <div class="avatar">
                                                        <span class="avatar-initial rounded bg-label-success">
                                                            <i class="bx bx-group bx-sm"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6 col-xl-3">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="d-flex align-items-start justify-content-between">
                                                    <div class="content-left">
                                                        <span>Pending Users</span>
                                                        <div class="d-flex align-items-end mt-2">
                                                            <h4 class="mb-0 me-2">237</h4>
                                                            <small class="text-success">(+42%)</small>
                                                        </div>
                                                        <p class="mb-0">Last week analytics</p>
                                                    </div>
                                                    <div class="avatar">
                                                        <span class="avatar-initial rounded bg-label-warning">
                                                            <i class="bx bx-user-voice bx-sm"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="card">
                                    <div class="card-header border-bottom">
                                        <h5 class="card-title">Search Filter</h5>
                                        <div class="d-flex justify-content-between align-items-center row py-3 gap-3 gap-md-0">
                                            <div class="col-md-4 user_role"><select id="UserRole" class="form-select text-capitalize"><option value=""> Select Role </option><option value="Admin">Admin</option><option value="Author">Author</option><option value="Editor">Editor</option><option value="Maintainer">Maintainer</option><option value="Subscriber">Subscriber</option></select></div>
                                            <div class="col-md-4 user_plan"><select id="UserPlan" class="form-select text-capitalize"><option value=""> Select Plan </option><option value="Basic">Basic</option><option value="Company">Company</option><option value="Enterprise">Enterprise</option><option value="Team">Team</option></select></div>
                                            <div class="col-md-4 user_status"><select id="FilterTransaction" class="form-select text-capitalize"><option value=""> Select Status </option><option value="Pending" class="text-capitalize">Pending</option><option value="Active" class="text-capitalize">Active</option><option value="Inactive" class="text-capitalize">Inactive</option></select></div>
                                        </div>
                                    </div>
                                    <div class="card-datatable table-responsive">
                                        <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer"><div class="row mx-2"><div class="col-md-2"><div class="me-3"><div class="dataTables_length" id="DataTables_Table_0_length"><label><select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" class="form-select"><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select></label></div></div></div><div class="col-md-10"><div class="dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0"><div id="DataTables_Table_0_filter" class="dataTables_filter"><label>
                                            <input type="search" class="form-control" placeholder="Search.." aria-controls="DataTables_Table_0" /></label>
                                        </div>
                                            <div class="btn-group d-flex flex-row">
                                                <button class="btn buttons-collection dropdown-toggle btn-label-secondary mx-3 d-flex"
                                                    tabindex="0" aria-controls="DataTables_Table_0" type="button" aria-haspopup="dialog"
                                                    aria-expanded="false">
                                                    <span><i class="bx bx-export me-1"></i>Export</span>
                                                </button>

                                                <Link class="btn btn-secondary add-new btn-primary d-flex cus_Add"  type="button" to={"/addquestions"}>
                                                   
                                                    <span><i class="bx bx-plus me-0 me-sm-1"></i>Question</span>
                                                </Link>
                                            </div>


                                        </div></div></div><table class="datatables-users table border-top dataTable no-footer dtr-column" id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info" width="1390px;">
                                                <thead>
                                                    <tr>
                                                        <th class="control sorting_disabled dtr-hidden" rowspan="1" colspan="1" aria-label="">Id</th>

                                                        <th class="sorting sorting_desc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="User: activate to sort column ascending" aria-sort="descending">Questions</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="Role: activate to sort column ascending">options</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="Billing: activate to sort column ascending">Quizzes</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="Status: activate to sort column ascending">Category</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="Status: activate to sort column ascending">Answer</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="Status: activate to sort column ascending">Type</th>
                                                        <th class="sorting_disabled" rowspan="1" colspan="1" width="145px;" aria-label="Actions">Actions</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {question.map((item, index) => (
                                                        <tr key={item.id}>
                                                            <td class="sorting_1">
                                                                <td>{index + 1}</td>
                                                            </td>
                                                            <td>{item.Questions}</td>
                                                            <td class="left">
                                                                <div className='flex-row d-flex'>
                                                                    <div className='ques1'>
                                                                        {item.Options1}
                                      </div>
                                                                    <div className='ques2'>
                                                                        {item.Options2}
                                                                    </div>
                                                                    <div className='ques3'>
                                                                        {item.Options3}
                                                                    </div>
                                                                    <div className='ques4'>
                                                                        {item.Options4}
                                                                    </div>
                                                                </div>





                                                            </td>
                                                            <td>{item.Quize && item.Quize.id} {item.Quize && item.Quize.QuizzName}</td>
                                                            <td>{item.CategoriesQuestion && item.CategoriesQuestion.name}</td>
                                                            <td>{item.Answer}</td>
                                                            <td>{item.Type}</td>

                                                            <td><div class="d-inline-block text-nowrap">
                                                                <Link to={`/question/${item.id}`} className="navbar-brand" >  <button className="btn btn-sm btn-icon" data-bs-target="#editQuizze" data-bs-toggle="modal">
                                                                    <i class="bx bx-edit"></i>
                                                                </button>
                                                                </Link>
                                                                <button class="btn btn-sm btn-icon delete-record" onClick={() => handleDelete(item.id)}>
                                                                    <i class="bx bx-trash"></i>
                                                                </button></div></td>

                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <div class="row mx-2"><div class="col-sm-12 col-md-6"><div class="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">Showing 1 to 10 of 50 entries</div></div><div class="col-sm-12 col-md-6"><div class="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate"><ul class="pagination"><li class="paginate_button page-item previous disabled" id="DataTables_Table_0_previous"><a aria-controls="DataTables_Table_0" aria-disabled="true" role="link" data-dt-idx="previous" tabindex="-1" class="page-link">Previous</a></li><li class="paginate_button page-item active"><a href="#" aria-controls="DataTables_Table_0" role="link" aria-current="page" data-dt-idx="0" tabindex="0" class="page-link">1</a></li><li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="1" tabindex="0" class="page-link">2</a></li><li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="2" tabindex="0" class="page-link">3</a></li><li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="3" tabindex="0" class="page-link">4</a></li><li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="4" tabindex="0" class="page-link">5</a></li><li class="paginate_button page-item next" id="DataTables_Table_0_next"><a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="next" tabindex="0" class="page-link">Next</a></li></ul></div></div></div></div>
                                    </div>


                                    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasAddUser" aria-labelledby="offcanvasAddUserLabel" style={{ width: "28%" }}>
                                        <div class="offcanvas-header">
                                            <h5 id="offcanvasAddUserLabel" class="offcanvas-title">Add Question</h5>
                                            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                        </div>
                                        <div class="offcanvas-body mx-0 flex-grow-0">
                                            <form class="add-new-user pt-0 fv-plugins-bootstrap5 fv-plugins-framework" id="addNewUserForm" onSubmit={handleSubmit} novalidate="novalidate">
                                                <div class="card-body row">

                                                    <div class="mb-3">
                                                        <label class="form-label" for="add-user-fullname">Questions</label>
                                                        <input type="text" class="form-control" id="add-user-fullname" placeholder="John Doe" name='Questions'
                                                            onChange={handleChange}
                                                            value={Questions} />
                                                            {errors.Questions &&<div className='errors'>{errors.Questions}</div>}
                                                        <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div></div>

                                                    <div class="mb-3">
                                                        <label for="exampleFormControlSelect2" class="form-label">Type</label>
                                                        <select id="exampleFormControlSelect2" class="select2 form-select" name="Type" value={Type} onChange={handleChange}>
                                                            <option value="">Select</option>
                                                            <option value="Easy">Easy</option>
                                                            <option value="Medium">Medium</option>
                                                            <option value="Hard">Hard</option>
                                                        </select>
                                                        {errors.Type &&<div className='errors'>{errors.Type}</div>}
                                                    </div>

                                                    <div class="mb-3">
                                                        <label class="form-label" for="add-user">Options 1</label>
                                                        <input type="text" id="add-user" class="form-control" placeholder="Options 1" name="Options1"
                                                            onChange={handleChange}
                                                            value={Options1} />
                                                               {errors.Options1 &&<div className='errors'>{errors.Options1}</div>}
                                                    </div>

                                                    <div class="mb-3">
                                                        <label class="form-label" for="add-user">Options 2</label>
                                                        <input type="text" id="add-user" class="form-control" placeholder="Options 2" name="Options2"
                                                            onChange={handleChange}
                                                            value={Options2} />
                                                               {errors.Options2 &&<div className='errors'>{errors.Options2}</div>}
                                                    </div>

                                                    <div class="mb-3">
                                                        <label class="form-label" for="add-user">Options 3</label>
                                                        <input type="text" id="add-user" class="form-control" placeholder="Options 3" name="Options3"
                                                            onChange={handleChange}
                                                            value={Options3} />
                                                               {errors.Options3 &&<div className='errors'>{errors.Options3}</div>}
                                                    </div>
                                                    <div class="mb-3">
                                                        <label class="form-label" for="add-user">Options 4</label>
                                                        <input type="text" id="add-user" class="form-control" placeholder="Options 4" name="Options4"
                                                            onChange={handleChange}
                                                            value={Options4} />
                                                               {errors.Options4 &&<div className='errors'>{errors.Options4}</div>}
                                                    </div>
                                                    <div class="mb-3">
                                                        <label class="form-label" for="add-user">Answer</label>
                                                        <input type="text" id="add-user" class="form-control" placeholder="Answer" name="Answer"
                                                            onChange={handleChange}
                                                            value={Answer} />
                                                               {errors.Answer &&<div className='errors'>{errors.Answer}</div>}
                                                    </div>

                                                    <div class="col-6 fv-plugins-icon-container">
                                                        <label for="exampleFormControlSelect2" class="form-label">Select Quizze</label>
                                                        <select id="exampleFormControlSelect2" class="select2 form-select" name="QuizzeId" value={QuizzeId} onChange={handleChange}>
                                                            <option value="">Select</option>
                                                            {quizze.map((option) => (
                                                                <option key={option.id} value={option.id}>{option.id} {option.QuizzName}</option>
                                                            ))}
                                                        </select>
                                                        {errors.QuizzeId &&<div className='errors'>{errors.QuizzeId}</div>}
                                                    </div>
                                                    <div class="col-6 fv-plugins-icon-container">
                                                        <label for="exampleFormControlSelect2" class="form-label">Questions Category</label>
                                                        <select id="exampleFormControlSelect2" class="select2 form-select" name="CategoryId" value={CategoryId} onChange={handleChange}>
                                                            <option value="">Select</option>
                                                            {category.map((option) => (
                                                                <option key={option.id} value={option.id}>{option.name}</option>
                                                            ))}
                                                        </select>
                                                        {errors.CategoryId &&<div className='errors'>{errors.CategoryId}</div>}
                                                    </div>
                                                    <div class="mb-3 d-flex">
                                                        <button type="submit" class="btn btn-primary me-sm-3 me-1 data-submit">Submit</button>
                                                        <button type="reset" class="btn btn-label-secondary" data-bs-dismiss="offcanvas">Cancel</button>
                                                        <input type="hidden" />
                                                    </div>



                                                </div>
                                                {message && <p style={{ color: 'green' }}>{message}</p>}
                                                {error && <p style={{ color: 'red' }}>{error}</p>}
                                            </form>
                                        </div>
                                    </div>

                                </div>
                                {/*  /*   <!--  Modal table --> */}
                                <div class="modal fade" id="editQuizze" tabindex="-1" aria-hidden="true">
                                    <div class="modal-dialog modal-lg modal-simple modal-edit-user">
                                        <div class="modal-content p-3 p-md-5">
                                            <div class="modal-body">
                                                {/*  <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button> */}
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                <div class="text-center mb-4">
                                                    <h3 style={{ marginTop: '-40px' }}> Information</h3>

                                                </div>
                                                <form id="editUserForm" class="row g-3 fv-plugins-bootstrap5 fv-plugins-framework" onSubmit={handleUpdate} novalidate="novalidate">
                                                <div className='row'>
                                                    <div className='col-12 col-md-6 col-lg-6 col-xl-6 mt-5' >
                                                        <label className='pb-2'>Choose Type Of Questions</label>
                                                        <select className='inputts' name="Type" value={Type} onChange={(e) => setType(e.target.value)}>
                                                            <option value="">Select</option>
                                                            <option value="Easy">Easy</option>
                                                            <option value="Medium">Medium</option>
                                                            <option value="Hard">Hard</option>
                                                        </select>
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
                                                        <label className='pb-2'>Quiz</label>
                                                        <select className='inputts' name="QuizzeId" value={QuizzeId} onChange={(e) => setQuizzeId(e.target.value)}>
                                                            <option value="">Select</option>
                                                            {quizze.map((option) => (
                                                                <option key={option.id} value={option.id}>{option.id} {option.QuizzName}</option>
                                                            ))}
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
                                                                <div className=''>
                                                                    <div className='d-flex iconss' >
                                                                        <div >
                                                                            <i class="fa-light fa-trash-alt crl"></i>
                                                                        </div>
                                                                        <div className='crls'>a</div>

                                                                        <label className={`custom-radio cstmradio ${selectedOption === 'a' ? 'selected' : ''}`}>
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
                                                                <div className=''>
                                                                    <div className='d-flex iconss' >
                                                                        <div>
                                                                            <i class="fa-light fa-trash-alt crl"></i>
                                                                        </div>
                                                                        <div className='crls'>b</div>

                                                                        <label className={`custom-radio cstmradio ${selectedOption === 'b' ? 'selected' : ''}`}>
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
                                                                <div className=''>
                                                                    <div className='d-flex iconss' >
                                                                        <div>
                                                                            <i class="fa-light fa-trash-alt crl"></i>
                                                                        </div>
                                                                        <div className='crls'>c</div>
                                                                        <label className={`custom-radio cstmradio ${selectedOption === 'c' ? 'selected' : ''}`}>
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
                                                                <div className=''>
                                                                    <div className='d-flex iconss' >
                                                                        <div>
                                                                            <i class="fa-light fa-trash-alt crl"></i>
                                                                        </div>
                                                                        <div className='crls'>d</div>
                                                                        <label className={`custom-radio cstmradio ${selectedOption === 'd' ? 'selected' : ''}`}>
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

                                                            
                                                                <div className='selected-option boxs mt-3'  >
                                                                            <input value={Answer} name="Answer"
                                                                                onChange={(e) => setAnswer(e.target.value)} />
                                                                        </div>



                                                            </div>
                                                        </div>
                                                    </div>

                                                ) : selectednewquestion === 'Multiple_Choice' ? (
                                                    <div className='row mt-5 '>
                                                        <div className='col-12 col-md-8 col-xl-8 col-lg-8 text-center choose_btn'>
                                                            <a className='crans' onClick={() => toggleDropdown('single')}>single correct answer </a>
                                                            <a className='crans' onClick={() => toggleDropdown('multiple')}>multiple correct answer </a>
                                                        </div>

                                                        {isExpanded === "multiple" ? (
                                                            <div className='row mt-5'>
                                                                <div className='col-12 col-md-3 col-xl-3 col-lg-3 '>
                                                                    <div className='d-flex' style={{ justifyContent: 'space-between', border: '1px solid #d5d5d561' }}>
                                                                        <div >
                                                                            <i class="fa-light fa-trash-alt crl"></i>
                                                                        </div>
                                                                        <div className='crls'>a</div>


                                                                        <label className={`custom-checkbox chkbx ${selectedOptions.includes('a') ? 'selected' : ''}`}>
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
                                                                        <label className={`custom-checkbox chkbx ${selectedOptions.includes('b') ? 'selected' : ''}`}>
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
                                                                        <label className={`custom-checkbox chkbx ${selectedOptions.includes('c') ? 'selected' : ''}`}>
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
                                                                <div className='col-12 col-md-3 col-xl-3 col-lg-3'>
                                                                    <div className='d-flex' style={{ justifyContent: 'space-between', border: '1px solid #d5d5d561' }}>
                                                                        <div>
                                                                            <i class="fa-light fa-trash-alt crl"></i>
                                                                        </div>
                                                                        <div className='crls'>d</div>
                                                                        <label className={`custom-checkbox chkbx ${selectedOptions.includes('d') ? 'selected' : ''}`}>
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
                                                              
                                                                <div className='col-12 col-md-6 col-xl-6 col-lg-6 d-flex mt-3'>
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
                                                                        <div className=''>
                                                                            <div className='d-flex iconss'> <div >
                                                                                <i class="fa-light fa-trash-alt crl"></i>
                                                                            </div>
                                                                                <div className='crls'>a</div>

                                                                                <label className={`custom-radio cstmradio ${selectedOption === 'a' ? 'selected' : ''}`}>
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
                                                                        <div className=''>
                                                                            <div className='d-flex iconss'>
                                                                                <div>
                                                                                    <i class="fa-light fa-trash-alt crl"></i>
                                                                                </div>
                                                                                <div className='crls'>b</div>

                                                                                <label className={`custom-radio cstmradio ${selectedOption === 'b' ? 'selected' : ''}`}>
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
                                                                        <div className=''>
                                                                            <div className='d-flex iconss'>
                                                                                <div>
                                                                                    <i class="fa-light fa-trash-alt crl"></i>
                                                                                </div>
                                                                                <div className='crls'>c</div>
                                                                                <label className={`custom-radio cstmradio ${selectedOption === 'c' ? 'selected' : ''}`}>
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
                                                                        <div className=''>
                                                                            <div className='d-flex iconss'>
                                                                                <div>
                                                                                    <i class="fa-light fa-trash-alt crl"></i>
                                                                                </div>
                                                                                <div className='crls'>d</div>
                                                                                <label className={`custom-radio cstmradio ${selectedOption === 'd' ? 'selected' : ''}`}>
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
                                                    <div class="col-12 col-md-12 fv-plugins-icon-container d-flex">
                                                        <button type="submit" class="btn btn-primary me-sm-3 me-1 data-submit">Update</button>
                                                        <button type="reset" class="btn btn-label-secondary" data-bs-dismiss="modal">Cancel</button>
                                                        <input type="hidden" />
                                                    </div>
                                                    <input type="hidden" /></form>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            {/*                <!-- / Content --> */}




                            {/*  <!-- Footer --> */}

                            <Footer />

                            {/*      <!-- / Footer --> */}

                        </div>
                    </div >
                    {/*     <!-- Overlay --> */}
                    < div class="layout-overlay layout-menu-toggle" ></div >
                </div >
                {/* / Layout wrapper  */}

            </div >
            <ToastContainer />
        </>
    )
}

export default Questions