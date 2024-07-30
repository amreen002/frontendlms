import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Footer from './footerComponent';
import Navbar from './navComponemt';
import DashBoardMenus from './dashboardsMenuComponent';
import ValidationBatch from '../validation/batchvalidation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
const { REACT_APP_API_ENDPOINT } = process.env;
function BatchesUse() {

    const { batchesId } = useParams();
    const [error, setError] = useState(null);
    const [emailerror, setemail] = useState(null);
    const [roleData, setRoleData] = useState([]);
    const [batches, setBatches] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [Title, setTitle] = useState('');
    const [BatchEniqueId, setBatchEniqueId] = useState('');
    const [InstructorId, setInstructorId] = useState('');
    const [CoursesId, setCoursesId] = useState('')
    const [BatchDuration, setBatchDuration] = useState('');
    const [BatchStartTime, setBatchStartTime] = useState('');
    const [BatchEndTime, setBatchEndTime] = useState('');
    const [BatchsInWeek, setBatchsInWeek] = useState('');
    const [StartedAtWeek, setStartedAtWeek] = useState('');
    const [BatchStatus, setBatchStatus] = useState('');
    const [BatchDatails, setBatchDatails] = useState('');
    const [FindOneInstructor, setFindOneInstructor] = useState({})
    const [courses, setCourses] = useState([]);
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        fetchData();
        fetchData1()
        fetchData2()
    }, []);



    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/listbatches`, {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                });
                const userData = response.data.batchs;
                setBatches(userData)
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const fetchData1 = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/listcourses`, {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                });
                const userData = response.data.courses;
                setCourses(userData)
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const fetchData2 = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/listteachers`, {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                });
                const userData = response.data.teachers.rows;
                setTeachers(userData)
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData3(batchesId)
    }, [batchesId]);

    const fetchData3 = async (batchesId) => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/listbatches/${batchesId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const userData = response.data.batchs;
                setFindOneInstructor(userData);
                setTitle(userData.Title);
                setInstructorId(userData.InstructorId);
                setCoursesId(userData.CoursesId);
                setBatchDuration(userData.BatchDuration);
                setBatchStartTime(userData.BatchStartTime);
                setBatchEndTime(userData.BatchEndTime);
                setBatchsInWeek(userData.BatchsInWeek);
                setStartedAtWeek(userData.StartedAtWeek);
                setBatchStatus(userData.BatchStatus);
                setBatchDatails(userData.BatchDatails);
            } else {
                console.warn('No token found in localStorage');
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    const [errors,setErrors] = useState({})
    const formData = {
        Title,
        InstructorId,
        CoursesId,
        BatchDuration,
        BatchStartTime,
        BatchEndTime,
        BatchsInWeek,
        StartedAtWeek,
        BatchStatus,
        BatchDatails
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedFormData = { ...formData, [name]: value };
        const validationErrors = ValidationBatch(updatedFormData);
        setErrors(validationErrors);
        setTitle(updatedFormData.Title || '');
        setInstructorId(updatedFormData.InstructorId || '');
        setCoursesId(updatedFormData.CoursesId || '');
        setStartedAtWeek(updatedFormData.StartedAtWeek || '');
        setBatchStatus(updatedFormData.BatchStatus || '');
        setBatchsInWeek(updatedFormData.BatchsInWeek || '');
        setBatchStartTime(updatedFormData.BatchStartTime || '');
        setBatchDuration(updatedFormData.BatchDuration || '');
        setBatchDatails(updatedFormData.BatchDatails || '');
        setBatchEndTime(updatedFormData.BatchEndTime || '');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
           
            const token = localStorage.getItem('token');
          
            if (token) {

               const response = await axios.post(`${REACT_APP_API_ENDPOINT}/addbatches`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                window.location.href = "/batches";
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

    const handleDelete = async (batchesId) => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
               const response= await axios.delete(`${REACT_APP_API_ENDPOINT}/deletebatches/${batchesId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                fetchData3(batchesId);
                const userdata = response.data
                window.location.href = "/batches";
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

            const token = localStorage.getItem('token');

            if (token) {
                let updatedUserData = {
                    Title,
                    InstructorId,
                    CoursesId,
                    BatchDuration,
                    BatchStartTime,
                    BatchEndTime,
                    BatchsInWeek,
                    StartedAtWeek,
                    BatchStatus,
                    BatchDatails
    
                }
                const response =   await axios.patch(`${REACT_APP_API_ENDPOINT}/viewsbatches/${batchesId}`, updatedUserData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                fetchData3(batchesId);
                window.location.href = "/batches"
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
                                            <input type="search" class="form-control" placeholder="Search.." 
                                            aria-controls="DataTables_Table_0" />
                                            </label>
                                            </div>
                                            <div class="btn-group d-flex flex-row">
                                                    <button class="btn buttons-collection dropdown-toggle btn-label-secondary mx-3 d-flex" 
                                                    tabindex="0" aria-controls="DataTables_Table_0" type="button" aria-haspopup="dialog" 
                                                    aria-expanded="false">
                                                    <span><i class="bx bx-export me-1"></i>Export</span>
                                                    </button>
                                                  
                                                    <button class="btn btn-secondary add-new btn-primary d-flex cus_Add" tabindex="0" aria-controls="DataTables_Table_0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasAddUser">
                                                   
                                                    <span><i class="bx bx-plus me-0 me-sm-1"></i>Batch</span>
                                                    </button>
                                                 </div>
                                            </div>
                                            </div>
                                            </div>
                                            <table class="datatables-users table border-top dataTable no-footer dtr-column" id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info" width="1390px;">
                                                <thead>
                                                    <tr>
                                                        <th class="control sorting_disabled dtr-hidden" rowspan="1" colspan="1" aria-label=""></th>
                                                        <th class="sorting sorting_desc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="100px;" aria-label="User: activate to sort column ascending" aria-sort="descending">Id</th>
                                                        <th class="sorting sorting_desc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="User: activate to sort column ascending" aria-sort="descending">Name</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="Role: activate to sort column ascending">Class</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="Billing: activate to sort column ascending">Instructor</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="Status: activate to sort column ascending">Batch Time</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="Status: activate to sort column ascending">Class In Week</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="Status: activate to sort column ascending">Batch Started</th>
                                                        <th class="sorting_disabled" rowspan="1" colspan="1" width="145px;" aria-label="Actions">Actions</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {batches.map((item, index) => (
                                                        <tr key={item.id}>
                                                            <td class="sorting_1">
                                                       
                                                            </td>
                                                            <td>{item.BatchEniqueId}</td>
                                                            <td>{item.Title}</td>
                                                            <td>{item.Course && item.Course.name}</td>
                                                            <td>{item.Teacher && item.Teacher.Name}</td>
                                                            <td>{item.BatchStartTime + " to " + item.BatchEndTime}</td>
                                                            <td>{item.BatchsInWeek}</td>
                                                            <td>{item.StartedAtWeek}</td>
                                                            <td><div class="d-inline-block text-nowrap">
                                                                <Link to={`/batches/${item?.id}`} className="navbar-brand" >  <button className="btn btn-sm btn-icon" data-bs-target="#editInstructor" data-bs-toggle="modal">
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
                                            <h5 id="offcanvasAddUserLabel" class="offcanvas-title">Add Batch</h5>
                                            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                        </div>
                                        <div class="offcanvas-body mx-0 flex-grow-0">
                                            <form class="add-new-user pt-0 fv-plugins-bootstrap5 fv-plugins-framework" id="addNewUserForm" onSubmit={handleSubmit} novalidate="novalidate">
                                                <div class="card-body row">

                                                    <div class="mb-3">
                                                        <label class="form-label" for="add-user-fullname">Batche Title</label>
                                                        <input type="text" class="form-control" id="add-user-fullname" placeholder="John Doe" name='Title'
                                                            onChange={handleChange}
                                                            defaultValue={Title} aria-label="John Doe" />
                                                            {errors.Title && <div className='errors'>{errors.Title}</div>}
                                                        <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div></div>

                                                    <div class="mb-3">
                                                        <label for="exampleFormControlSelect2" class="form-label">Instructor</label>
                                                        <select id="exampleFormControlSelect2" class="select2 form-select" name="InstructorId" defaultValue={InstructorId} onChange={handleChange}>
                                                            <option value="">Select</option>
                                                            {teachers.map((option) => (
                                                                <option key={option.id} value={option.id}>{option.Name}</option>
                                                            ))}
                                                        </select>
                                                        {errors.InstructorId && <div className='errors'>{errors.InstructorId}</div>}
                                                    </div>

                                                    <div class="mb-3">
                                                        <label htmlFor="exampleFormControlSelect2" className="form-label">Courses</label>
                                                        <select
                                                            id="exampleFormControlSelect2"
                                                            className="select2 form-select"
                                                            name="CoursesId"
                                                            value={CoursesId}
                                                            onChange={handleChange}
                                                        >
                                                            <option value="">Select</option>
                                                            {courses.map(option => (
                                                                <option key={option.id} value={option.id}>{option.name}</option>
                                                            ))}
                                                        </select>
                                                        {errors.CoursesId && <div className='errors'>{errors.CoursesId}</div>}
                                                    </div>

                                                    <div class="mb-3">
                                                        <label for="exampleFormControlSelect2" class="form-label">Batch Duration</label>
                                                        <select id="exampleFormControlSelect2" class="select2 form-select" name="Education" defaultValue={BatchDuration} onChange={handleChange}>
                                                            <option value="">Batch Duration</option>
                                                            <option value="15"> 15 Days</option>
                                                            <option value="30"> 30 Days</option>
                                                            <option value="45"> 45 Days</option>
                                                            <option value="60"> 60 Days</option>
                                                            <option value="75"> 75 Days</option>
                                                            <option value="90"> 90 Days</option>
                                                            <option value="180"> 180 Days</option>
                                                            <option value="360"> 360 Days</option>
                                                        </select>
                                                        {errors.Education && <div className='errors'>{errors.Education}</div>}

                                                    </div>
                                                    <div class="mb-3">
                                                        <label class="form-label" for="add-user-contact">Batch Start Time</label>
                                                        <input type="time" id="add-user-contact" class="form-control phone-mask" placeholder="Batch Start Time" name="BatchStartTime"
                                                            onChange={handleChange}
                                                            value={BatchStartTime} />
                                                            {errors.BatchStartTime && <div className='errors'>{errors.BatchStartTime}</div>}
                                                    </div>
                                                    <div class="mb-3">
                                                        <label class="form-label" for="add-user">Batch End Time</label>
                                                        <input type="time" id="add-user" class="form-control" placeholder="Batch End Time" name="BatchEndTime"
                                                            onChange={handleChange}
                                                            value={BatchEndTime} />
                                                            {errors.BatchEndTime && <div className='errors'>{errors.BatchEndTime}</div>}
                                                    </div>
                                                    <div class="mb-3">
                                                        <label for="exampleFormControlSelect2" class="form-label">Batchs In Week</label>
                                                        <select id="exampleFormControlSelect2" class="select2 form-select" name="BatchsInWeek" defaultValue={BatchsInWeek} onChange={handleChange}>
                                                            <option value="">Select</option>
                                                            <option value="1 Day">1 Day</option>
                                                            <option value="2 Days">2 Days</option>
                                                            <option value="3 Days">3 Days</option>
                                                            <option value="4 Days">4 Days</option>
                                                            <option value="5 Days">5 Days</option>
                                                            <option value="6 Days">6 Days</option>
                                                            <option value="7 Days">7 Days</option>
                                                            <option value="MON-SAT">MON-SAT</option>
                                                            <option value="Alternate Days">Alternate Days</option>

                                                        </select>
                                                        {errors.BatchsInWeek && <div className='errors'>{errors.BatchsInWeek}</div>}
                                                        </div>
                                                    <div class="mb-3">
                                                        <label class="form-label" for="add-user">Started At Week</label>
                                                        <input type="date" id="add-user" class="form-control" placeholder="Started At Week" name="StartedAtWeek"
                                                            onChange={handleChange}
                                                            value={StartedAtWeek} />
                                                            {errors.StartedAtWeek && <div className='errors'>{errors.StartedAtWeek}</div>}
                                                    </div>
                                                    <div class="mb-3">
                                                        <label for="exampleFormControlSelect2" class="form-label">Batch Status</label>
                                                        <select id="exampleFormControlSelect2" class="select2 form-select" name="BatchStatus" defaultValue={BatchStatus} onChange={handleChange}>
                                                            <option value="">Select</option>
                                                            <option value="Open">Open</option>
                                                            <option value="Close">Close</option>
                                                        </select>
                                                        {errors.BatchStatus && <div className='errors'>{errors.BatchStatus}</div>}</div>
                                                    <div class="mb-3">
                                                        <label class="form-label" for="add-user">Batch Datails</label>
                                                        <input type="text" id="add-user" class="form-control" placeholder="Batch Datails" name="BatchDatails"
                                                            onChange={handleChange}
                                                            value={BatchDatails} />
                                                            {errors.BatchDatails && <div className='errors'>{errors.BatchDatails}</div>}
                                                    </div>
                                                    <div class="mb-3 d-flex">
                                                        <button type="submit" class="btn btn-primary me-sm-3 me-1 data-submit">Submit</button>
                                                        <button type="reset" class="btn btn-label-secondary" data-bs-dismiss="offcanvas">Cancel</button>
                                                        <input type="hidden" />
                                                    </div>




                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                {/*  /*   <!--  Modal table --> */}
                                <div class="modal fade" id="editInstructor" tabindex="-1" aria-hidden="true">
                                    <div class="modal-dialog modal-lg modal-simple modal-edit-user">
                                        <div class="modal-content p-3 p-md-5">
                                            <div class="modal-body">
                                                {/*  <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button> */}
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                <div class="text-center mb-4" style={{marginTop:'-40px'}}>
                                                    <h3 style={{marginTop:'-40px'}}>Batches Information</h3>

                                                </div>
                                                <form id="editUserForm" class="row g-3 fv-plugins-bootstrap5 fv-plugins-framework" onSubmit={handleUpdate} novalidate="novalidate">
                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                        <label class="form-label" for="add-user-fullname">Batche Title</label>
                                                        <input type="text" class="form-control" id="add-user-fullname" placeholder="John Doe" name='Title'
                                                            value={Title}
                                                            onChange={(e) => setTitle(e.target.value)}
                                                            aria-label="John Doe" />
                                                        <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div></div>

                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                        <label for="exampleFormControlSelect2" class="form-label">Instructor</label>
                                                        <select id="exampleFormControlSelect2" class="select2 form-select" name="InstructorId" value={InstructorId} onChange={(e) => setInstructorId(e.target.value)}>
                                                            <option value="">Select</option>
                                                            {teachers.map((option) => (
                                                                <option key={option.id} value={option.id}>{option.Name}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">         <label htmlFor="exampleFormControlSelect2" className="form-label">Courses</label>
                                                        <select
                                                            id="exampleFormControlSelect2"
                                                            className="select2 form-select"
                                                            name="CoursesId"
                                                            value={CoursesId}
                                                            onChange={(e) => setCoursesId(e.target.value)}
                                                        >
                                                            <option value="">Select</option>
                                                            {courses.map(option => (
                                                                <option key={option.id} value={option.id}>{option.name}</option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                        <label for="exampleFormControlSelect2" class="form-label">Batch Duration</label>
                                                        <select id="exampleFormControlSelect2" class="select2 form-select" name="BatchDuration" value={BatchDuration} onChange={(e) => setBatchDuration(e.target.value)}>
                                                            <option value="">Batch Duration</option>
                                                            <option value="15"> 15 Days</option>
                                                            <option value="30"> 30 Days</option>
                                                            <option value="45"> 45 Days</option>
                                                            <option value="60"> 60 Days</option>
                                                            <option value="75"> 75 Days</option>
                                                            <option value="90"> 90 Days</option>
                                                            <option value="180"> 180 Days</option>
                                                            <option value="360"> 360 Days</option>
                                                        </select>

                                                    </div>
                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                        <label class="form-label" for="add-user-contact">Batch Start Time</label>
                                                        <input type="time" id="add-user-contact" class="form-control phone-mask" placeholder="Batch Start Time" name="BatchStartTime"
                                                            onChange={(e) => setBatchStartTime(e.target.value)}
                                                            value={BatchStartTime} />
                                                    </div>
                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                        <label class="form-label" for="add-user">Batch End Time</label>
                                                        <input type="time" id="add-user" class="form-control" placeholder="Batch End Time" name="BatchEndTime"
                                                            onChange={(e) => setBatchEndTime(e.target.value)}
                                                            value={BatchEndTime} />
                                                    </div>
                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                        <label for="exampleFormControlSelect2" class="form-label">Batchs In Week</label>
                                                        <select id="exampleFormControlSelect2" class="select2 form-select" name="BatchsInWeek" value={BatchsInWeek} onChange={(e) => setBatchsInWeek(e.target.value)}>
                                                            <option value="">Select</option>
                                                            <option value="1 Day">1 Day</option>
                                                            <option value="2 Days">2 Days</option>
                                                            <option value="3 Days">3 Days</option>
                                                            <option value="4 Days">4 Days</option>
                                                            <option value="5 Days">5 Days</option>
                                                            <option value="6 Days">6 Days</option>
                                                            <option value="7 Days">7 Days</option>
                                                            <option value="MON-SAT">MON-SAT</option>
                                                            <option value="Alternate Days">Alternate Days</option>

                                                        </select></div>
                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                        <label class="form-label" for="add-user">Started At Week</label>
                                                        <input type="date" id="add-user" class="form-control" placeholder="Started At Week" name="StartedAtWeek"
                                                            onChange={(e) => setStartedAtWeek(e.target.value)}
                                                            value={StartedAtWeek} />
                                                    </div>
                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                        <label for="exampleFormControlSelect2" class="form-label">Batch Status</label>
                                                        <select id="exampleFormControlSelect2" class="select2 form-select" name="BatchStatus" value={BatchStatus} onChange={(e) => setBatchStatus(e.target.value)}>
                                                            <option value="">Select</option>
                                                            <option value="Open">Open</option>
                                                            <option value="Close">Close</option>
                                                        </select></div>
                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                        <label class="form-label" for="add-user">Batch Datails</label>
                                                        <input type="text" id="add-user" class="form-control" placeholder="Batch Datails" name="BatchDatails"
                                                            onChange={(e) => setBatchDatails(e.target.value)}
                                                            value={BatchDatails} />
                                                    </div>
                                                    <div class="mb-3 d-flex">
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

export default BatchesUse