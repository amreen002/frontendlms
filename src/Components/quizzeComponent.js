import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Footer from './footerComponent';
import Navbar from './navComponemt';
import DashBoardMenus from './dashboardsMenuComponent';
import Select, { StylesConfig } from 'react-select'
import makeAnimated from 'react-select/animated'; 
import ValidationQuize from '../validation/quizevalidation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
const { REACT_APP_API_ENDPOINT ,REACT_APP_API_IMG} = process.env;

const animatedComponents = makeAnimated();

function Quizze() {

    const { quizzeId } = useParams();
    const [quizze, setQuizze] = useState([]);
    const [QuizzName, setQuizzName] = useState('');
    const [QuizzStartTime, setQuizzStartTime] = useState('');
    const [QuizzEndTime, setQuizzEndTime] = useState('');
    const [QuizzTestDuration, setQuizzTestDuration] = useState('')
    const [EasyQuestions, setEasyQuestions] = useState('');
    const [MediumQuestions, setMediumQuestions] = useState('');
    const [HardQuestions, setHardQuestions] = useState('');
    const [TotalQuestions, setTotalQuestions] = useState('');
    const [TotalMarks, setTotalMarks] = useState('');
    const [Instructions, setInstructions] = useState('');
    const [CourseId,setCourseId]= useState('');
    const [FindOneInstructor, setFindOneInstructor] = useState({})
    const [QuizzCategoryId, setQuizzCategoryId] = useState([]);
    const [batch, setBatchs] = useState([]);
    const [category, setCategory] = useState([]);
    const [course, setCourse] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // Track total pages for pagination

    useEffect(() => {
        fetchData(page);
    }, [page]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    }
    useEffect(() => {
        setTotalQuestions(parseInt(EasyQuestions) + parseInt(MediumQuestions) + parseInt(HardQuestions));
        setTotalMarks(parseInt(EasyQuestions) * 1 + parseInt(MediumQuestions) * 2 + parseInt(HardQuestions) * 4);
    }, [EasyQuestions, MediumQuestions, HardQuestions]);



    useEffect(() => {
        fetchData3(quizzeId)
    }, [quizzeId]);

    useEffect(() => {
        fetchData();
        fetchData1()
        fetchData2()
        fetchData4()
    }, []);

    // Format options for react-select
    const [BatchId, setBatchId] = useState([]);

    // Format options for react-select
    const options = batch.map(option => ({
        value: option.id,
        label: option.Title
    }));

    // Handle change event
    const handleChange = (selectedOptions) => {
        const batchIds = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setBatchId(batchIds);
    };

    const fetchData = async (page = 1) => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/quizze?page=${page}`, {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                });
                const userData = response.data.quizze.rows;
                setQuizze(userData)
                setTotalPages(response.data.students.totalPage ||1)
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const fetchData1 = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/listbatches`, {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                });
                const userData = response.data.batchs;
                setBatchs(userData)
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const fetchData2 = async () => {
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

    const fetchData3 = async (quizzeId) => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/quizze/${quizzeId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const userData = response.data.quizze;

                setFindOneInstructor(userData);
                setQuizzName(userData.QuizzName);
                setQuizzStartTime(userData.QuizzStartTime);
                setQuizzEndTime(userData.QuizzEndTime);
                setQuizzTestDuration(userData.QuizzTestDuration);
                setEasyQuestions(userData.EasyQuestions);
                setMediumQuestions(userData.MediumQuestions);
                setHardQuestions(userData.HardQuestions);
                setTotalQuestions(userData.TotalQuestions);
                setTotalMarks(userData.TotalMarks);
                setInstructions(userData.Instructions);
                setQuizzCategoryId(userData.QuizzCategoryId);
                setBatchId(Array.isArray(userData.BatchId) ? userData.BatchId : []);
                setCourseId(userData.CourseId)
            } else {
                console.warn('No token found in localStorage');
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    const fetchData4 = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/listcourses`, {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                });
                const userDatas = response.data.courses;
                setCourse(userDatas)
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const [errors, setErrors] = useState({})
    const formData = {
        QuizzName,
        QuizzStartTime,
        QuizzEndTime,
        QuizzTestDuration,
        EasyQuestions,
        MediumQuestions,
        HardQuestions,
        TotalQuestions,
        TotalMarks,
        Instructions,
        BatchId,
        QuizzCategoryId,
        CourseId,
    }
    const handleChanges = (e) => {
        const { name, value } = e.target;
        const updatedFormData = { ...formData, [name]: value };
        const validationErrors = ValidationQuize(updatedFormData);
        setErrors(validationErrors);
        setQuizzName(updatedFormData.QuizzName || '');
        setQuizzStartTime(updatedFormData.QuizzStartTime || '');
        setQuizzEndTime(updatedFormData.QuizzEndTime || '');
        setQuizzTestDuration(updatedFormData.QuizzTestDuration || '');
        setEasyQuestions(updatedFormData.EasyQuestions || '');
        setMediumQuestions(updatedFormData.MediumQuestions || '');
        setHardQuestions(updatedFormData.HardQuestions || '');
        setTotalQuestions(updatedFormData.TotalQuestions || '');
        setTotalMarks(updatedFormData.TotalMarks || '');
        setInstructions(updatedFormData.Instructions || '');
        setBatchId(updatedFormData.BatchId || '');
        setQuizzCategoryId(updatedFormData.QuizzCategoryId || '');
        setCourseId(updatedFormData.CourseId || '');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
           
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.post(`${REACT_APP_API_ENDPOINT}/quizze`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                window.location.href = "/quizzes";
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

    const handleDelete = async (quizzeId) => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
            const response =    await axios.delete(`${REACT_APP_API_ENDPOINT}/quizze/${quizzeId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                fetchData(quizzeId);
                window.location.href = "/quizzes";
                const userdata =response.data
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
                QuizzName,
                QuizzStartTime,
                QuizzEndTime,
                QuizzTestDuration,
                EasyQuestions,
                MediumQuestions,
                HardQuestions,
                TotalQuestions,
                TotalMarks,
                Instructions,
                BatchId,
                QuizzCategoryId,
                CourseId
            }
            const token = localStorage.getItem('token');

            if (token) {
                const response =  await axios.patch(`${REACT_APP_API_ENDPOINT}/quizze/${quizzeId}`, updatedUserData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                fetchData3(quizzeId)
                window.location.href = "/quizzes";
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
                                        <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer"><div class="row mx-2"><div class="col-md-2">
                                        <div className="me-3">
                                                <div className="dataTables_length" id="DataTables_Table_0_length">
                                                    <label>
                                                        <select
                                                            name="DataTables_Table_0_length"
                                                            aria-controls="DataTables_Table_0"
                                                            className="form-select"
                                                            onChange={(e) => setPage(1)} // Reset to page 1 on changing page size
                                                        >
                                                            <option value="10">10</option>
                                                            <option value="25">25</option>
                                                            <option value="50">50</option>
                                                            <option value="100">100</option>
                                                        </select>
                                                    </label>
                                                </div>
                                            </div>
                                            </div><div class="col-md-10"><div class="dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0"><div id="DataTables_Table_0_filter" class="dataTables_filter"><label>
                                            <input type="search" class="form-control" placeholder="Search.." aria-controls="DataTables_Table_0" /></label>
                                            </div>
                                            <div class="btn-group d-flex flex-row">
                                                    <button class="btn buttons-collection dropdown-toggle btn-label-secondary mx-3 d-flex" 
                                                    tabindex="0" aria-controls="DataTables_Table_0" type="button" aria-haspopup="dialog" 
                                                    aria-expanded="false">
                                                    <span><i class="bx bx-export me-1"></i>Export</span>
                                                    </button>
                                                  
                                                    <button class="btn btn-secondary add-new btn-primary d-flex cus_Add" tabindex="0" aria-controls="DataTables_Table_0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasAddUser">
                                                   
                                                    <span><i class="bx bx-plus me-0 me-sm-1"></i>Quize</span>
                                                    </button>
                                                 </div>
                                             </div>
                                             </div>
                                             </div
                                             ><table class="datatables-users table border-top dataTable no-footer dtr-column" id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info" width="1390px;">
                                                <thead>
                                                    <tr>
                                                        <th class="control sorting_disabled dtr-hidden" rowspan="1" colspan="1" aria-label="">Id</th>

                                                        <th class="sorting sorting_desc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="User: activate to sort column ascending" aria-sort="descending">Name</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="Role: activate to sort column ascending">Start</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="Billing: activate to sort column ascending">End</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="Status: activate to sort column ascending">Duration</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="Status: activate to sort column ascending">Questions</th>

                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="Status: activate to sort column ascending">Marks</th>
                                                        <th class="sorting_disabled" rowspan="1" colspan="1" width="145px;" aria-label="Actions">Actions</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {quizze.map((item, index) => (
                                                        <tr key={item.id}>
                                                            <td class="sorting_1">
                                                                <td>{index + 1}</td>
                                                            </td>
                                                            <td>{item.QuizzName}</td>
                                                            <td>{item.QuizzStartTime}</td>
                                                            <td>{item.QuizzEndTime}</td>
                                                            <td>{item.QuizzTestDuration} Minutes</td>
                                                            <td>{item.TotalQuestions}</td>

                                                            <td>{item.TotalMarks}</td>
                                                            <td><div class="d-inline-block text-nowrap">
                                                                <Link to={`/quizzes/${item.id}`} className="navbar-brand" >  <button className="btn btn-sm btn-icon" data-bs-target="#editQuizze" data-bs-toggle="modal">
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
                                            <div className="row mx-2">
                                                <div className="col-sm-12 col-md-6">
                                                    <div className="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">
                                                        Showing {((page - 1) * 10) + 1} to {Math.min(page * 10, totalPages * 10)} of {totalPages * 10} entries
                                                    </div>
                                                </div>
                                                <div className="col-sm-12 col-md-6">
                                                    <div className="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate">
                                                        <ul className="pagination">
                                                            <li className={`paginate_button page-item previous ${page === 1 ? 'disabled' : ''}`}>
                                                                <a href="#" aria-controls="DataTables_Table_0" role="link" onClick={() => handlePageChange(page - 1)} className="page-link">Previous</a>
                                                            </li>
                                                            {[...Array(totalPages).keys()].map(p => (
                                                                <li key={p + 1} className={`paginate_button page-item ${page === p + 1 ? 'active' : ''}`}>
                                                                    <a href="#" aria-controls="DataTables_Table_0" role="link" onClick={() => handlePageChange(p + 1)} className="page-link">{p + 1}</a>
                                                                </li>
                                                            ))}
                                                            <li className={`paginate_button page-item next ${page === totalPages ? 'disabled' : ''}`}>
                                                                <a href="#" aria-controls="DataTables_Table_0" role="link" onClick={() => handlePageChange(page + 1)} className="page-link">Next</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasAddUser" aria-labelledby="offcanvasAddUserLabel" style={{ width: "28%" }}>
                                        <div class="offcanvas-header">
                                            <h5 id="offcanvasAddUserLabel" class="offcanvas-title">Add Quizze</h5>
                                            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                        </div>
                                        <div class="offcanvas-body mx-0 flex-grow-0">
                                            <form class="add-new-user pt-0 fv-plugins-bootstrap5 fv-plugins-framework" id="addNewUserForm" onSubmit={handleSubmit} novalidate="novalidate">
                                                <div class="card-body row">

                                                    <div class="mb-3">
                                                        <label class="form-label" for="add-user-fullname">Quizze Name</label>
                                                        <input type="text" class="form-control" id="add-user-fullname" placeholder="John Doe" name='QuizzName'
                                                            onChange={handleChanges}
                                                            defaultValue={QuizzName} aria-label="John Doe" />
                                                             {errors.QuizzName && <div className='errors'>{errors.QuizzName}</div>}
                                                        <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div></div>



                                                    <div class="mb-3">
                                                        <label class="form-label" for="add-user-contact">Quizze Start Time</label>
                                                        <input type="datetime-local" id="add-user-contact" class="form-control phone-mask" placeholder="Quizz Start Time" name="QuizzStartTime"
                                                            onChange={handleChanges}
                                                            value={QuizzStartTime} />
                                                             {errors.QuizzStartTime && <div className='errors'>{errors.QuizzStartTime}</div>}
                                                    </div>
                                                    <div class="mb-3">
                                                        <label class="form-label" for="add-user">Quizze End Time</label>
                                                        <input type="datetime-local" id="add-user" class="form-control" placeholder="Quizz End Time" name="QuizzEndTime"
                                                            onChange={handleChanges}
                                                            value={QuizzEndTime} />
                                                             {errors.QuizzEndTime && <div className='errors'>{errors.QuizzEndTime}</div>}
                                                    </div>

                                                    <div class="mb-3">
                                                        <label class="form-label" for="add-user">Test duration (in Minutes)</label>
                                                        <input type="number" id="add-user" class="form-control" placeholder="Quizze Test Duration" name="QuizzTestDuration"
                                                            onChange={handleChanges}
                                                            value={QuizzTestDuration} />
                                                    </div>
                                                    {errors.QuizzTestDuration && <div className='errors'>{errors.QuizzTestDuration}</div>}

                                                    <div class="mb-3">
                                                        <label class="form-label" for="add-user">No of Easy Questions (1 Mark)</label>
                                                        <input type="number" id="add-user" class="form-control" placeholder="Easy Questions" name="EasyQuestions"
                                                            onChange={handleChanges}
                                                            value={EasyQuestions} />
                                                             {errors.EasyQuestions && <div className='errors'>{errors.EasyQuestions}</div>}
                                                    </div>
                                                    <div class="mb-3">
                                                        <label class="form-label" for="add-user">No of Medium Questions (2 Mark)</label>
                                                        <input type="number" id="add-user" class="form-control" placeholder="Medium Questions" name="MediumQuestions"
                                                            onChange={handleChanges}
                                                            value={MediumQuestions} />
                                                             {errors.MediumQuestions && <div className='errors'>{errors.MediumQuestions}</div>}
                                                    </div>
                                                    <div class="mb-3">
                                                        <label class="form-label" for="add-user"> No of Hard Questions (4 Mark)</label>
                                                        <input type="number" id="add-user" class="form-control" placeholder="Hard Questions" name="HardQuestions"
                                                            onChange={handleChanges}
                                                            value={HardQuestions} />
                                                             {errors.HardQuestions && <div className='errors'>{errors.HardQuestions}</div>}
                                                    </div>
                                                    <div class="mb-3">
                                                        <label class="form-label" for="add-user">Total Questions</label>
                                                        <input type="number" id="add-user" class="form-control" placeholder="Total Questions" name="TotalQuestions"
                                                            value={TotalQuestions}
                                                            onChange={handleChanges} />
                                                             {errors.number && <div className='errors'>{errors.number}</div>}
                                                    </div>
                                                    <div class="mb-3">
                                                        <label class="form-label" for="add-user">Total Marks</label>
                                                        <input type="number" id="add-user" class="form-control" placeholder="Total Marks" name="TotalMarks"
                                                            value={TotalMarks}
                                                            onChange={handleChanges} />
                                                             {errors.TotalMarks && <div className='errors'>{errors.TotalMarks}</div>}
                                                    </div>
                                                    <div class="mb-3">
                                                        <label class="form-label" for="add-user">Instructions</label>
                                                        <input type="text" id="add-user" class="form-control" placeholder="Instructions" name="Instructions"
                                                            onChange={handleChanges}
                                                            value={Instructions} />
                                                             {errors.Instructions && <div className='errors'>{errors.Instructions}</div>}
                                                    </div>

                                                    <div className="col-6 fv-plugins-icon-container">
                                                        <label htmlFor="exampleFormControlSelect2" className="form-label">Batch</label>
                                                        <Select
                                                            isMulti
                                                            value={options.filter(option => BatchId.includes(option.value))}
                                                            name="BatchId"
                                                            onChange={handleChange}
                                                            options={options}
                                                            components={animatedComponents}
                                                            inputId="exampleFormControlSelect2"
                                                        />
                                                         {errors.BatchId && <div className='errors'>{errors.BatchId}</div>}

                                                    </div>
                                                    <div class="col-6 fv-plugins-icon-container mb-3">
                                                        <label for="exampleFormControlSelect2" class="form-label">Courses Category</label>
                                                        <select id="exampleFormControlSelect2" class="select2 form-select" name="QuizzCategoryId" value={QuizzCategoryId} onChange={handleChanges}>
                                                            <option value="">Select</option>
                                                            {category.map((option) => (
                                                                <option key={option.id} value={option.id}>{option.name}</option>
                                                            ))}
                                                        </select>
                                                        {errors.QuizzCategoryId && <div className='errors'>{errors.QuizzCategoryId}</div>}
                                                    </div>
                                                    <div class="col-6 fv-plugins-icon-container mb-3 ">
                                                        <label for="exampleFormControlSelect2" class="form-label">Courses</label>
                                                        <select id="exampleFormControlSelect2" class="select2 form-select" name="CourseId" value={CourseId} onChange={handleChanges}>
                                                            <option value="">Select</option>
                                                            {course.map((option) => (
                                                                <option key={option.id} value={option.id}>{option.name}</option>
                                                            ))}
                                                        </select>
                                                        {errors.CourseId && <div className='errors'>{errors.CourseId}</div>}
                                                    </div>
                                                    <div class="mb-3 d-flex mt-5">
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
                                                    <h3 style={{marginTop:'-40px'}}>Batches Information</h3>

                                                </div>
                                                <form id="editUserForm" class="row g-3 fv-plugins-bootstrap5 fv-plugins-framework" onSubmit={handleUpdate} novalidate="novalidate">
                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                        <label class="form-label" for="add-user-fullname">Quizze Name</label>
                                                        <input type="text" class="form-control" id="add-user-fullname" placeholder="John Doe" name='QuizzName'
                                                            onChange={(e) => setQuizzName(e.target.value)}
                                                            value={QuizzName} aria-label="John Doe" />
                                                        <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div></div>



                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                        <label class="form-label" for="add-user-contact">Quizze Start Time</label>
                                                        <input type="datetime-local" id="add-user-contact" class="form-control phone-mask" placeholder="Quizz Start Time" name="QuizzStartTime"
                                                            onChange={(e) => setQuizzStartTime(e.target.value)}
                                                            value={QuizzStartTime} />
                                                    </div>
                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                        <label class="form-label" for="add-user">Quizze End Time</label>
                                                        <input type="datetime-local" id="add-user" class="form-control" placeholder="Quizz End Time" name="QuizzEndTime"
                                                            onChange={(e) => setQuizzEndTime(e.target.value)}
                                                            value={QuizzEndTime} />
                                                    </div>

                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                        <label class="form-label" for="add-user">Quizze Test Duration</label>
                                                        <input type="number" id="add-user" class="form-control" placeholder="Quizze Test Duration" name="QuizzTestDuration"
                                                            onChange={(e) => setQuizzTestDuration(e.target.value)}
                                                            value={QuizzTestDuration} />
                                                    </div>
                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                        <label class="form-label" for="add-user">Easy Questions</label>
                                                        <input type="number" id="add-user" class="form-control" placeholder="Easy Questions" name="EasyQuestions"
                                                            onChange={(e) => setEasyQuestions(e.target.value)}
                                                            value={EasyQuestions} />
                                                    </div>
                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                        <label class="form-label" for="add-user">Medium Questions</label>
                                                        <input type="number" id="add-user" class="form-control" placeholder="Medium Questions" name="MediumQuestions"
                                                            onChange={(e) => setMediumQuestions(e.target.value)}
                                                            value={MediumQuestions} />
                                                    </div>
                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                        <label class="form-label" for="add-user">Hard Questions</label>
                                                        <input type="number" id="add-user" class="form-control" placeholder="Hard Questions" name="HardQuestions"
                                                            onChange={(e) => setHardQuestions(e.target.value)}
                                                            value={HardQuestions} />
                                                    </div>
                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                        <label class="form-label" for="add-user">Total Questions</label>
                                                        <input type="number" id="add-user" class="form-control" placeholder="Total Questions" name="TotalQuestions"
                                                            onChange={(e) => setTotalQuestions(e.target.value)}
                                                            value={TotalQuestions} />
                                                    </div>
                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                        <label class="form-label" for="add-user">Total Marks</label>
                                                        <input type="number" id="add-user" class="form-control" placeholder="Total Marks" name="TotalMarks"
                                                            onChange={(e) => setTotalQuestions(e.target.value)}
                                                            value={TotalMarks} />
                                                    </div>
                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                        <label class="form-label" for="add-user">Instructions</label>
                                                        <input type="text" id="add-user" class="form-control" placeholder="Instructions" name="Instructions"
                                                            onChange={(e) => setInstructions(e.target.value)}
                                                            value={Instructions} />
                                                    </div>

                                                    <div className="col-6 fv-plugins-icon-container">
                                                        <label htmlFor="exampleFormControlSelect2" className="form-label">Batch</label>

                                                        <Select
                                                            isMulti
                                                            value={options.filter(option => BatchId.includes(option.value))}
                                                            name="BatchId"
                                                            onChange={handleChange}
                                                            options={options}
                                                            components={animatedComponents}
                                                            inputId="exampleFormControlSelect2"
                                                        />

                                                    </div>
                                                    <div class="col-6 fv-plugins-icon-container">
                                                        <label for="exampleFormControlSelect2" class="form-label">Courses Category</label>
                                                        <select id="exampleFormControlSelect2" class="select2 form-select" name="QuizzCategoryId" value={QuizzCategoryId} onChange={(e) => setQuizzCategoryId(e.target.value)}>
                                                            <option value="">Select</option>
                                                            {category.map((option) => (
                                                                <option key={option.id} value={option.id}>{option.name}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div class="col-6 fv-plugins-icon-container">
                                                        <label for="exampleFormControlSelect2" class="form-label">Courses</label>
                                                        <select id="exampleFormControlSelect2" class="select2 form-select" name="CourseId" value={CourseId} onChange={(e) => setCourseId(e.target.value)}>
                                                            <option value="">Select</option>
                                                            {course.map((option) => (
                                                                <option key={option.id} value={option.id}>{option.name}</option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <div class="mb-3 d-flex mt-3">
                                                        <button type="submit" class="btn btn-primary me-sm-3 me-1 data-submit">Submit</button>
                                                        <button type="reset" class="btn btn-label-secondary" data-bs-dismiss="offcanvas">Cancel</button>
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

export default Quizze