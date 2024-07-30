import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Footer from './footerComponent';
import Navbar from './navComponemt';
import DashBoardMenus from './dashboardsMenuComponent';
import ValidationaddStudent from '../validation/addstudentvalidation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
const { REACT_APP_API_ENDPOINT ,REACT_APP_API_IMG} = process.env;
function StudentUse() {
    const [table, setTable] = useState([]);
    const { studentsId } = useParams();
    const { coursecodeId } = useParams();
    const [error, setError] = useState(null);
    const [emailerror, setemail] = useState(null);
    const [roleData, setRoleData] = useState([]);
    const [countryTable, setCountryTable] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCourses, setSelectedCourses] = useState('');
    const [Name, setName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Email, setEmail] = useState('');
    const [PhoneNumber, setPhoneNumber] = useState('');
    const [Password, setPassword] = useState("Abc@123");
    const [StateId, setStateId] = useState('')
    const [CountryId, setCountryId] = useState('')
    const [Address, setAddress] = useState('')
    const [City, setCity] = useState('')
    const [DistrictId, setDistrictId] = useState('')
    const [Username, setUsername] = useState('')
    const [Date, setDate] = useState('');
    const [CoursesId, setCoursesId] = useState('')
    const [BatchId, setBatchId] = useState('')
    const [FindOneInstructor, setFindOneInstructor] = useState({})
    const [courses, setCourses] = useState([])
    const [activeService, setActiveService] = useState(null);
    const [show, setShow] = useState(false)
    const [image, setimage] = useState(null)
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // Track total pages for pagination

    useEffect(() => {
        fetchData(coursecodeId);
    }, [coursecodeId]);

    const handleshow = () => {
        setShow(show ? false : true)
    }

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    }

    const toggleDropdown = (id) => {
        setActiveService(prevState => (prevState === id ? null : id));
    };
    const handleCountryChange = (e) => {
        const selectedCountryId = parseInt(e.target.value);
        const selectedCountry = countryTable.find(country => country.id === selectedCountryId);
        setCountryId(selectedCountryId);
        setSelectedCountry(selectedCountry);
        setStateId(''); // Reset state and district selections
        setSelectedState('');
        setDistrictId('');
    };


    const handleStateChange = (e) => {
        const selectedStateId = parseInt(e.target.value);
        const selectedState = selectedCountry ? selectedCountry.Staties.find(state => state.id === selectedStateId) : '';
        setStateId(selectedStateId);
        setSelectedState(selectedState);
        setDistrictId(''); // Reset district selection
    };

    const handleCourseChange = (e) => {
        const selectedCoursesId = parseInt(e.target.value);
        const selectedCourses = courses.find(course => course.id === selectedCoursesId)
        setCoursesId(selectedCoursesId);
        setSelectedCourses(selectedCourses);
        setBatchId(''); // Reset district selection
    };

    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
    };  

    useEffect(() => {
        fetchData();
        fetchData1()
        fetchData2()
        fetchData4()
    }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/students/${coursecodeId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setTable(response.data.courses);
                setTotalPages(1 ||1)
            }// Updated state variable
        } catch (err) {
            console.log(err.response);
        }
    }

    const fetchData1 = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/listrole`, {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                });
                const userData = response.data.role;
                setRoleData(userData)
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const fetchData2 = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/listcountry`, {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                });
                const userData = response.data.country;
                setCountryTable(userData)
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
                setCourses(userDatas)
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData3(studentsId)
    }, [studentsId]);
    const fetchData3 = async (studentsId) => {
        try {
            const token = localStorage.getItem('token');
            console.log('Fetching data for student ID:', studentsId);
    
            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/liststudents/${studentsId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
    
                if (response.data && response.data.students) {
                    const userData = response.data.students;
                    setFindOneInstructor(userData);
                    setName(userData.Name);
                    setLastName(userData.LastName);
                    setEmail(userData.Email);
                    setPhoneNumber(userData.PhoneNumber);
                    setUsername(userData.Username);
                    setCountryId(userData.Address.CountryId);
                    setStateId(userData.Address.StateId);
                    setDistrictId(userData.Address.DistrictId);
                    setAddress(userData.Address.Address);
                    setCity(userData.Address && userData.Address.City);
                    setDate(userData.Date && userData.Date);
                    setCoursesId(userData.CoursesId);
                    setBatchId(userData.BatchId);
                    setimage(userData.image);
                } else {
                    console.error('No student data found in response');
                }
            } else {
                console.error('No token found');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const [errors, setErrors]   = useState({})

    const formData = {
        Name,
        LastName,
        Email,
        Password,
        Username,
        PhoneNumber,
        AddressType: 'AddressType',
        Address,
        StateId,
        CountryId,
        DistrictId,
        City,
        Date,
        CoursesId,
        BatchId,
        image
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedFormData = { ...formData, [name]: value };
        const validationErrors = ValidationaddStudent(updatedFormData);
        setErrors(validationErrors);
        setName(updatedFormData.Name || '');
        setLastName(updatedFormData.LastName || '');
        setEmail(updatedFormData.Email || '');
        setPhoneNumber(updatedFormData.PhoneNumber || '');
        setUsername(updatedFormData.Username || '');
        setPassword(updatedFormData.Password || '');
        setDate(updatedFormData.Date || '');
        setCoursesId(updatedFormData.CoursesId || '');
        setBatchId(updatedFormData.BatchId || '');
        setCountryId(updatedFormData.CountryId || '');
        setStateId(updatedFormData.StateId || '');
        setDistrictId(updatedFormData.DistrictId || '');
        setCity(updatedFormData.City || '');
        setAddress(updatedFormData.Address || '');
        setimage(updatedFormData.image || null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        if (selectedFiles) {
            data.append('file', selectedFiles[0]);
        }
        for (const key in formData) {
            data.append(key, formData[key]);
        }
        try {
          
            const token = localStorage.getItem('token');
          
            if (token) {

             const   response = await axios.post(`${REACT_APP_API_ENDPOINT}/addstudents`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
                });
                window.location.href = "/students";
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

    const handleDelete = async (studentsId) => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
              const response =  await axios.delete(`${REACT_APP_API_ENDPOINT}/deletestudents/${studentsId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                fetchData();
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
        const data = new FormData();
        if (selectedFiles) {
            data.append('file', selectedFiles[0]);
        }
        for (const key in formData) {
            data.append(key, formData[key]);
        }
        try {
            const token = localStorage.getItem('token');
            if (token) {
               const response = await axios.patch(`${REACT_APP_API_ENDPOINT}/viewsstudents/${studentsId}`, data, {
                   headers: {
                       'Content-Type': 'multipart/form-data',
                       Authorization: `Bearer ${token}`
                   }
                });
                fetchData3(studentsId);
                window.location.href = "/students"
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
                                            <input type="search" class="form-control" placeholder="Search.." 
                                            aria-controls="DataTables_Table_0" /></label>
                                            </div>
                                            <div class="btn-group d-flex flex-row">
                                                    <button class="btn buttons-collection dropdown-toggle btn-label-secondary mx-3 d-flex" 
                                                    tabindex="0" aria-controls="DataTables_Table_0" type="button" aria-haspopup="dialog" 
                                                    aria-expanded="false">
                                                    <span><i class="bx bx-export me-1"></i>Export</span>
                                                    </button>
                                                    <button class="btn btn-secondary add-new btn-primary d-flex cus_Add" tabindex="0" aria-controls="DataTables_Table_0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasAddUser">
                                                    <span><i class="bx bx-plus me-0 me-sm-1"></i>Student</span>
                                                    </button>
                                                 </div>
                                             </div>
                                             </div>
                                             </div>
                                            
                                            <table class="datatables-users table border-top dataTable no-footer dtr-column" id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info" width="1390px;">
                                                <thead>
                                                    <tr>
                                                        <th class="control sorting_disabled dtr-hidden" rowspan="1" colspan="1" aria-label="">#</th>
                                                        <th class="sorting sorting_desc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="100px;" aria-label="User: activate to sort column ascending" aria-sort="descending">Id</th>
                                                        <th class="sorting sorting_desc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="User: activate to sort column ascending" aria-sort="descending">Name</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="Role: activate to sort column ascending">Email</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="Role: activate to sort column ascending">Phone Number</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="Role: activate to sort column ascending">Instructor</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="Role: activate to sort column ascending">Course</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="Role: activate to sort column ascending">Bacth</th>
                                                      {/*   <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="Billing: activate to sort column ascending">Date</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="400px;" aria-label="Status: activate to sort column ascending">Address</th> */}
                                                        <th class="sorting_disabled" rowspan="1" colspan="1" width="145px;" aria-label="Actions">Actions</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {table.map((item, index) => (
                                                        <tr key={item.id}>
                                                            <td class="sorting_1">
                                                                {index + 1}
                                                            </td>
                                                            <td>{item.id}</td>
                                                            <td>{item.Name + " " + item.LastName}</td>
                                                            <td>{item.Email}</td>
                                                            <td>{item.PhoneNumber}</td>
                                                          
                                                            <td>{item.Batch && item.Batch.Teacher && item.Batch.Teacher.Name}</td>
                                                            <td>{item.Course && item.Course.name}</td>
                                                            <td>{item.Batch && item.Batch.Title}</td>
                                                           {/*  <td>{item.Date}</td>
                                                            <td>{item.Address && item.Address.Address}</td> */}
                                                            <td>


                                                                {activeService === item.id && (
                                                                    <div className="dropdown-menu dropdown-menu-end" id="listOnclick">
                                                                        <ul class="navbar-nav ms-auto">
                                                                            <li>
                                                                                <a href='#' className="dropdown-item" >
                                                                                    <button className="btn btn-sm btn-icon">
                                                                                        <i className="bx bx-check"></i>
                                                                                    </button> Join Course
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a href='#' className="dropdown-item">
                                                                                    <button className="btn btn-sm btn-icon">
                                                                                        <i className="bx bx-check"></i>
                                                                                    </button> Course Details
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a href='#' className="dropdown-item">
                                                                                    <button className="btn btn-sm btn-icon">
                                                                                        <i className="bx bx-check"></i>
                                                                                    </button> Change Batch
                                                                                </a>

                                                                            </li>
                                                                            <li>
                                                                                <Link to={`/students/${item.id}`} className="dropdown-item">
                                                                                    <button className="btn btn-sm btn-icon" data-bs-target="#editInstructor" data-bs-toggle="modal">
                                                                                        <i className="bx bx-check"></i>
                                                                                    </button> Student Update
                                                                                </Link>
                                                                            </li>
                                                                            <li>
                                                                                <Link to='#' className="dropdown-item">
                                                                                    <button className="btn btn-sm btn-icon">
                                                                                        <i className="bx bx-check"></i>
                                                                                    </button> Student Delete
                                                                                </Link>

                                                                            </li>
                                                                            <li>
                                                                                <a href='#' className="dropdown-item">
                                                                                    <button className="btn btn-sm btn-icon">
                                                                                        <i className="bx bx-check"></i>
                                                                                    </button> View Installments
                                                                                </a>

                                                                            </li>
                                                                            <li>
                                                                                <a href='#' className="dropdown-item">
                                                                                    <button className="btn btn-sm btn-icon">
                                                                                        <i className="bx bx-check"></i>
                                                                                    </button> Mark As Left
                                                                                </a>

                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                )}

                                                                <div class="d-inline-block text-nowrap">
                                                                    <Link to="#" className="navbar-brand" >  <button className="btn btn-sm btn-icon" onClick={() => toggleDropdown(item.id)}>
                                                                        <i className="bx bx-dots-vertical-rounded"></i>
                                                                    </button>
                                                                    </Link>
                                                                    <Link to={`/students/${item.id}`} className="navbar-brand" >  <button className="btn btn-sm btn-icon" data-bs-target="#editInstructor" data-bs-toggle="modal">
                                                                        <i class="bx bx-edit"></i>
                                                                    </button>
                                                                    </Link>
                                                                    <button class="btn btn-sm btn-icon delete-record" onClick={() => handleDelete(item.id)}>
                                                                        <i class="bx bx-trash"></i>
                                                                    </button>

                                                                </div></td>
                                                            <td>

                                                            </td>

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
                                            <h5 id="offcanvasAddUserLabel" class="offcanvas-title"> Student</h5>
                                            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                        </div>
                                        <div class="offcanvas-body mx-0 flex-grow-0">
                                            <form class="add-new-user pt-0 fv-plugins-bootstrap5 fv-plugins-framework" id="addNewUserForm" onSubmit={handleSubmit} novalidate="novalidate">
                                                <div class="card-body row">

                                                    <div class="col-lg-6">
                                                        {emailerror && <div style={{ color: 'red' }}>{emailerror}</div>}
                                                        <label class="form-label" for="add-user-fullname"> Frist Name</label>
                                                        <input type="text" class="form-control" id="add-user-fullname" placeholder="John Doe" name='Name'
                                                            onChange={handleChange}
                                                            value={Name} aria-label="John Doe" />
                                                            {errors.Name && <div className='errors'>{errors.Name}</div>}
                                                        <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                        </div>
                                                    <div class="col-lg-6">
                                                        <label class="form-label" for="add-user-fullname"> Last Name</label>
                                                        <input type="text" class="form-control" id="add-user-fullname" placeholder="John Doe" name='LastName'
                                                            onChange={handleChange}
                                                            value={LastName} aria-label="John Doe" />
                                                             {errors.LastName && <div className='errors'>{errors.LastName}</div>}
                                                        <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                        </div>
                                                    <div class="mb-3">
                                                        <label class="form-label" for="add-user-email"> Email</label>
                                                        <input type="text" id="add-user-email" class="form-control" placeholder="john.doe@example.com" name='Email'
                                                            onChange={handleChange}
                                                            value={Email} />
                                                             {errors.Email && <div className='errors'>{errors.Email}</div>}

                                                        <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div></div>
                                                    <div class="col-lg-6 ">
                                                        <label class="form-label" for="add-user-contact"> Contact</label>
                                                        <input type="number" id="add-user-contact" class="form-control phone-mask" placeholder="+91 (609) 988-44-11" name="PhoneNumber"
                                                            onChange={handleChange}
                                                            value={PhoneNumber} />
                                                        {errors.PhoneNumber && <div className='errors'>{errors.PhoneNumber}</div>}
                                                    </div>
                                                    <div class="col-lg-6 ">
                                                        <label class="form-label" for="add-user-contact">Alternative Contact</label>
                                                        <input type="number" id="add-user-contact" class="form-control phone-mask" placeholder="+91 (609) 988-44-11" name="PhoneNumber"
                                                            onChange={handleChange}
                                                            value={PhoneNumber} />
                                                        {errors.PhoneNumber && <div className='errors'>{errors.PhoneNumber}</div>}
                                                    </div>
                                                    <div class="col-md-6">
                                                        <label class="form-label" for="add-user"> User Name</label>
                                                        <input type="text" id="add-user" class="form-control" placeholder="User@123" name="Username"
                                                            onChange={handleChange}
                                                            value={Username} />
                                                             {errors.Username && <div className='errors'>{errors.Username}</div>}
                                                    </div>
                                                    <div class="col-md-6 paswrd">

                                                        <label class="form-label" for="basic-icon-default-password"> Password</label>
                                                        <input type={show ? "text" : "password"}
                                                            onChange={handleChange}
                                                            name='Password'
                                                            value={Password}
                                                            class="form-control password-mask"
                                                            id="basic-default-password12"
                                                            placeholder="Abc@123"
                                                        /> <i className={`far ${show ? 'fa-eye' : 'fa-eye-slash'}`} onClick={handleshow}></i>
                                                        
                                                         {errors.Password && <div className='errors'>{errors.Password}</div>}
                                                       
                                                    </div>
                                                    <div class="col-md-6">
                                                        <label class="form-label" for="add-user-contact"> Date</label>
                                                        <input type="date" id="add-user-contact" class="form-control phone-mask" placeholder="Date" name="Date"
                                                            onChange={handleChange}
                                                            value={Date} />
                                                             {errors.Date && <div className='errors'>{errors.Date}</div>}
                                                    </div>
                                                    <div class="col-lg-6 col-md-6 ">
                                                        <label for="exampleFormControlSelect2" class="form-label"> Class / Course</label>
                                                        <select id="exampleFormControlSelect2" class="select2 form-select" name="CoursesId" value={CoursesId} onChange={handleCourseChange}>
                                                            <option value="">Select</option>
                                                            {courses.map((option) => (
                                                                <option key={option.id} value={option.id}>{option.name}</option>
                                                            ))}
                                                        </select>
                                                        {errors.CoursesId && <div className='errors'>{errors.CoursesId}</div>}
                                                    </div>
                                                    <div class="col-lg-6 col-md-6 ">
                                                        <label for="exampleFormControlSelect2" class="form-label"> Batch</label>
                                                        <select id="exampleFormControlSelect2" class="select2 form-select" name="BatchId" value={BatchId} onChange={handleChange}>
                                                            <option value="">Select</option>
                                                            {selectedCourses && selectedCourses.Batches.map(batch => (
                                                                <option key={batch.id} value={batch.id}>{batch.Title}</option>
                                                            ))}
                                                        </select>
                                                        {errors.BatchId && <div className='errors'>{errors.BatchId}</div>}
                                                    </div>
                                                    <div class="col-lg-6 col-md-6">
                                                        <label htmlFor="exampleFormControlSelect2" className="form-label"> Country</label>
                                                        <select
                                                            id="exampleFormControlSelect2"
                                                            className="select2 form-select"
                                                            name="CountryId"
                                                            value={CountryId}
                                                            onChange={handleCountryChange}
                                                        >
                                                            <option value="">Select</option>
                                                            {countryTable.map(option => (
                                                                <option key={option.id} value={option.id}>{option.name}</option>
                                                            ))}
                                                        </select>
                                                        {errors.CountryId && <div className='errors'>{errors.CountryId}</div>}
                                                    </div>
                                                    <div class="col-lg-6 col-md-6">
                                                        <label htmlFor="exampleFormControlSelect2" className="form-label"> State</label>
                                                        <select
                                                            id="exampleFormControlSelect2"
                                                            className="select2 form-select"
                                                            name="StateId"
                                                            value={StateId}
                                                            onChange={handleStateChange}
                                                        >
                                                            <option value="">Select</option>
                                                            {selectedCountry && selectedCountry.Staties.map(state => (
                                                                <option key={state.id} value={state.id}>{state.name}</option>
                                                            ))}
                                                        </select>
                                                        {errors.StateId && <div className='errors'>{errors.StateId}</div>}
                                                    </div>

                                                    <div class="col-lg-6 col-md-6">
                                                        <label htmlFor="exampleFormControlSelect2" className="form-label">  District</label>
                                                        <select
                                                            id="exampleFormControlSelect2"
                                                            className="select2 form-select"
                                                            name="DistrictId"
                                                            value={DistrictId}
                                                            onChange={handleChange}
                                                        >
                                                            <option value="">Select</option>
                                                            {selectedState && selectedState.Cities.map(city => (
                                                                <option key={city.id} value={city.id}>{city.name}</option>
                                                            ))}
                                                        </select>
                                                        {errors.DistrictId && <div className='errors'>{errors.DistrictId}</div>}
                                                    </div>

                                                    <div class="col-lg-6 col-md-6">
                                                        <label class="form-label" for="add-user-email"> City</label>
                                                        <input type="text" id="add-user-email" class="form-control" placeholder="City" name='City'
                                                            onChange={handleChange}
                                                            value={City} />
                                                             {errors.City && <div className='errors'>{errors.City}</div>}
                                                        <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                    </div>

                                                    <div class="col-lg-6 col-md-6">
                                                        <label class="form-label" for="add-user-email"> Address</label>
                                                        <input type="text" id="add-user-email" class="form-control" placeholder="Address" name='Address'
                                                            onChange={handleChange}
                                                            value={Address} />
                                                             {errors.Address && <div className='errors'>{errors.Address}</div>}
                                                        <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                    </div>
                                                    <div class="mb-3 fv-plugins-icon-container">
                                                        <label class="form-label">Upload Image</label>
                                                        <input
                                                            type="file"
                                                            class="form-control"
                                                            id="inputGroupFile04"
                                                            aria-describedby="inputGroupFileAddon04"
                                                            aria-label="Upload"
                                                             onChange={handleFileChange}
                                                        />
                                                        {/*    {errors.file && <div className='errors'>{errors.file}</div>} */}

                                                    </div>
                                                    <div class="mb-3 fv-plugins-icon-container">
                                                        <label class="form-label">Remark</label>
                                                        <textarea
                                                            id="basic-icon-default-message"
                                                            class="form-control"
                                                            placeholder="Hi, Do you have a moment to talk Joe?"
                                                            aria-label="Hi, Do you have a moment to talk Joe?"
                                                            aria-describedby="basic-icon-default-message2"
                                                            name="remark" ></textarea>
                                                        <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
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
                                                <div class="text-center mb-4">
                                                    <h3 style={{marginTop:'-40px'}}>Student Information</h3>

                                                </div>
                                                <form id="editUserForm" class="row g-3 fv-plugins-bootstrap5 fv-plugins-framework" onSubmit={handleUpdate} novalidate="novalidate">
                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                        {emailerror && <div style={{ color: 'red' }}>{emailerror}</div>}
                                                        <label class="form-label" for="add-user-fullname"> Frist Name</label>
                                                        <input type="text" class="form-control" id="add-user-fullname" placeholder="John Doe" name='Name'
                                                            onChange={(e) => setName(e.target.value)}
                                                            value={Name} aria-label="John Doe" />
                                                        <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div></div>
                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                        <label class="form-label" for="add-user-fullname"> Last Name</label>
                                                        <input type="text" class="form-control" id="add-user-fullname" placeholder="John Doe" name='LastName'
                                                            onChange={(e) => setLastName(e.target.value)}
                                                            value={LastName} aria-label="John Doe" />
                                                        <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div></div>
                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                        <label class="form-label" for="add-user-email"> Email</label>
                                                        <input type="text" id="add-user-email" class="form-control" placeholder="john.doe@example.com" name='Email'
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            value={Email} />

                                                        <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div></div>
                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                        <label class="form-label" for="add-user-contact"> Contact</label>
                                                        <input type="text" id="add-user-contact" class="form-control phone-mask" placeholder="+91 (609) 988-44-11" name="PhoneNumber"
                                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                                            value={PhoneNumber} />
                                                    </div>
                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                        <label class="form-label" for="add-user"> User Name</label>
                                                        <input type="text" id="add-user" class="form-control" placeholder="User@123" name="Username"
                                                            onChange={(e) => setUsername(e.target.value)}
                                                            value={Username} />
                                                    </div>
                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                        <label class="form-label" for="add-user-contact"> Date</label>
                                                        <input type="date" id="add-user-contact" class="form-control phone-mask" placeholder="Date" name="Date"
                                                            onChange={(e) => setDate(e.target.value)}
                                                            value={Date} />
                                                    </div>
                                             
                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                        <label htmlFor="exampleFormControlSelect2" className="form-label"> Country</label>
                                                        <select
                                                            id="exampleFormControlSelect2"
                                                            className="select2 form-select"
                                                            name="CountryId"
                                                            value={CountryId}
                                                            onChange={handleCountryChange}
                                                        >
                                                            <option value="">Select</option>
                                                            {countryTable.map(option => (
                                                                <option key={option.id} value={option.id}>{option.name}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                        <label htmlFor="exampleFormControlSelect2" className="form-label"> State</label>
                                                        <select
                                                            id="exampleFormControlSelect2"
                                                            className="select2 form-select"
                                                            name="StateId"
                                                            value={StateId}
                                                            onChange={handleStateChange}
                                                        >
                                                            <option value="">Select</option>
                                                            {selectedCountry && selectedCountry.Staties.map(state => (
                                                                <option key={state.id} value={state.id}>{state.name}</option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                        <label htmlFor="exampleFormControlSelect2" className="form-label"> District</label>
                                                        <select id="exampleFormControlSelect2"
                                                            className="select2 form-select"
                                                            name="DistrictId"
                                                            value={DistrictId}
                                                            onChange={(e) => setDistrictId(e.target.value)}>
                                                            <option value="">Select</option>
                                                            {selectedState && selectedState.Cities.map(city => (
                                                                <option key={city.id} value={city.id}>{city.name}</option>
                                                            ))}
                                                        </select>
                                                    </div>


                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                        <label class="form-label" for="add-user-email"> City</label>
                                                        <input type="text" id="add-user-email" class="form-control" placeholder="Address" name='City'
                                                            onChange={(e) => setCity(e.target.value)}
                                                            value={City} />
                                                        <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                    </div>

                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                        <label for="exampleFormControlSelect2" class="form-label"> Class</label>
                                                        <select id="exampleFormControlSelect2" class="select2 form-select" name="CoursesId" value={CoursesId} onChange={handleCourseChange}>
                                                            <option value="">Select</option>
                                                            {courses.map((option) => (
                                                                <option key={option.id} value={option.id}>{option.name}</option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                        <label for="exampleFormControlSelect2" class="form-label"> Batch</label>
                                                        <select id="exampleFormControlSelect2" class="select2 form-select" name="BatchId" value={BatchId} onChange={(e) => setBatchId(e.target.value)}>
                                                            <option value="">Select</option>
                                                            {selectedCourses && selectedCourses.Batches.map(batch => (
                                                                <option key={batch.id} value={batch.id}>{batch.Title}</option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <div class="mb-3 fv-plugins-icon-container">
                                                        <label class="form-label" for="add-user-email"> Address</label>
                                                        <input type="text" id="add-user-email" class="form-control" placeholder="Address" name='Address'
                                                            onChange={(e) => setAddress(e.target.value)}
                                                            value={Address} />
                                                        <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                    </div>
                                                    <div class="mb-3 fv-plugins-icon-container">
                                                        <label class="form-label">Upload Image</label>
                                                        <input
                                                            type="file"
                                                            class="form-control"
                                                            id="inputGroupFile04"
                                                            aria-describedby="inputGroupFileAddon04"
                                                            aria-label="Upload"
                                                             onChange={handleFileChange}
                                                        />
                                                        {/*    {errors.file && <div className='errors'>{errors.file}</div>} */}

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

export default StudentUse 