import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Select, { StylesConfig } from 'react-select'
import makeAnimated from 'react-select/animated'; 
import Footer from './footerComponent';
import Navbar from './navComponemt';
import DashBoardMenus from './dashboardsMenuComponent';
import ValidationaddInstructor from '../validation/instructoraddvalidation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
const animatedComponents = makeAnimated();
const { REACT_APP_API_ENDPOINT, REACT_APP_API_IMG } = process.env;
function ListUse() {
    const [table, setTable] = useState([]);
    const { teachersId } = useParams();
    const [error, setError] = useState(null);
    const [emailerror, setemail] = useState(null);
    const [roleData, setRoleData] = useState([]);
    const [countryTable, setCountryTable] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [Name, setName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Email, setEmail] = useState('');
    const [DOB, setDOB] = useState('');
    const [PhoneNumber, setPhoneNumber] = useState('');
    const [Password, setPassword] = useState("");
    const [StateId, setStateId] = useState('')
    const [CountryId, setCountryId] = useState('')
    const [CousesId, setCousesId] = useState([])
    const [Address, setAddress] = useState('')
    const [City, setCity] = useState('')
    const [DistrictId, setDistrictId] = useState('')
    const [TeacherType, setTeacherType] = useState('')
    const [Username, setUsername] = useState('')
    const [image, setimage] = useState(null)
    const [FindOneInstructor, setFindOneInstructor] = useState({})
    const [YourIntroducationAndSkills, setYourIntroducationAndSkills] = useState('')
    const [options, setOptions] = useState([]);
    const [courses, setCourses] = useState([])
    const [page, setPage] = useState(1);
    const [selectedFiles, setSelectedFiles] = useState(null);
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
    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
    };
    useEffect(() => {
        fetchData();
        fetchData1()
        fetchData2()
        fetchData4()
    }, []);

    const [totalPages, setTotalPages] = useState(1); // Track total pages for pagination

    useEffect(() => {
        fetchData(page);
    }, [page]);

 

    const fetchData = async (page = 1) => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/listteachers?page=${page}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setTable(response.data.teachers.rows);
                setTotalPages(response.data.teachers.totalPage ||1); // Ensure totalPages has a default value
            }
        } catch (err) {
            console.error('Error fetching data:', err.response || err.message); // Enhanced error handling
        }
    };

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

            const response = await axios.get(`${REACT_APP_API_ENDPOINT}/courses`);
            const userDatas = response.data.courses;
            const courses = response.data.courses.map(course => ({
                value: course.id,
                label: course.name
            }));
            setOptions(courses);
            setCourses(userDatas)


        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData3(teachersId)
    }, [teachersId]);
    
    const fetchData3 = async (teachersId) => {
        try {
            const token = localStorage.getItem('token');
    
            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/listteachers/${teachersId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const userData = response.data.teachers;
    
                setFindOneInstructor(userData);
                setName(userData.Name);
                setLastName(userData.LastName);
                setEmail(userData.Email);
                setPhoneNumber(userData.PhoneNumber);
                setUsername(userData.Username);
                setDOB(userData.DOB);
                setTeacherType(userData.TeacherType);
                setCountryId(userData.Address.CountryId);
                setStateId(userData.Address.StateId);
                setDistrictId(userData.Address.DistrictId);
                setAddress(userData.Address.Address);
                setCity(userData.Address.City);
                setYourIntroducationAndSkills(userData.YourIntroducationAndSkills);
                setimage(userData.image);
                const coursesIdsArray = userData.CousesId ? userData.CousesId.split(',').map(id => parseInt(id, 10)) : [];
                setCousesId(coursesIdsArray);  // Se/ Set the state with the array of course IDs
            }
    
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    

/*     const options = courses.map(option => ({
        value: option.id,
        label: option.name
    }));
 */
    // Handle change event
    const handleNewChange = (selectedOptions) => {
        const selectedIds = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setCousesId(selectedIds);
    };
    


    const [errors, setErrors] = useState({})
    
    const formData = {
        Name,
        LastName,
        Email,
        Password,
        DOB,
        TeacherType,
        Username,
        PhoneNumber,
        YourIntroducationAndSkills,
        AddressType: 'Current Address',
        Address,
        StateId,
        CountryId,
        DistrictId,
        City,
        CousesId,
        image

    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedFormData = { ...formData, [name]: value};
        const validationErrors = ValidationaddInstructor(updatedFormData);
        setErrors(validationErrors); 
        setName(updatedFormData.Name || '');
        setLastName(updatedFormData.LastName || '');
        setEmail(updatedFormData.Email || '');
        setPassword(updatedFormData.Password || '');
        setDOB(updatedFormData.DOB || '');
        setTeacherType(updatedFormData.TeacherType || '');
        setUsername(updatedFormData.Username || '');
        setPhoneNumber(updatedFormData.PhoneNumber || '');
        setAddress(updatedFormData.Address || '')
        setStateId(updatedFormData.StateId || '')
        setYourIntroducationAndSkills(updatedFormData.YourIntroducationAndSkills || '');
        setCountryId(updatedFormData.CountryId || '')
        setDistrictId(updatedFormData.DistrictId || '')
        setCity(updatedFormData.City || '')
        setCousesId(updatedFormData.CousesId || '')
        setimage(updatedFormData.image || null)

    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        const formDataWithCoursesId = {
            ...formData,
            CousesId: formData.CousesId.join(',')  // Convert array to comma-separated string
        };
        if (selectedFiles) {
            data.append('file', selectedFiles[0]);
        }
        for (const key in formDataWithCoursesId) {
            data.append(key, formDataWithCoursesId[key]);
        }
        try {
         
            const token = localStorage.getItem('token');

            let response
            if (token) {
           
                response = await axios.post(`${REACT_APP_API_ENDPOINT}/addteachers`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                    }
                });
              
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
                 window.location.href = "/teachers";
            }
          
        } catch (error) {
            toast.error(error.response.data.message ,{
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

    const handleDelete = async (teachersId) => {
        try { 
            const token = localStorage.getItem('token');

            if (token) {
           
                const response =   await axios.delete(`${REACT_APP_API_ENDPOINT}/deleteteachers/${teachersId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const userdata = response.data
                fetchData();
                toast.success(userdata.message,{
                    position: "top-right",
                    autoClose: 5000,
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
                autoClose: 5000,
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
        const formDataWithCoursesId = {
            ...formData,
            CousesId: formData.CousesId.join(',')  // Convert array to comma-separated string
        };
        if (selectedFiles) {
            data.append('file', selectedFiles[0]);
        }
        for (const key in formDataWithCoursesId) {
            data.append(key, formDataWithCoursesId[key]);
        }
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response =  await axios.patch(`${REACT_APP_API_ENDPOINT}/viewsteachers/${teachersId}`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                    }
                });
                const userdata = response.data
                fetchData3(teachersId);
               window.location.href = "/teachers" 
                toast.success(userdata.message,{
                    position: "top-right",
                    autoClose: 5000,
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
                autoClose: 5000,
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

    const [show, setShow] = useState(false)

    const handleshow = () => {
        setShow(show ? false : true)
    }
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
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

                                <div className='card py-2'>

                                <div className="card-datatable table-responsive">
                                    <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer">
                                        <div className="row mx-2">
                                            <div className="col-md-2">
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
                                            </div>
                                            <div className="col-md-10">
                                                <div className="dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0">
                                                    <div id="DataTables_Table_0_filter" className="dataTables_filter">
                                                        <label>
                                                            <input type="search" className="form-control" placeholder="Search.." aria-controls="DataTables_Table_0" />
                                                        </label>
                                                    </div>
                                                    <div className="dt-buttons btn-group flex-wrap">
                                                        <div className="btn-group d-flex flex-row">
                                                            <button
                                                                className="btn buttons-collection dropdown-toggle btn-label-secondary mx-3 d-flex"
                                                                tabIndex="0"
                                                                aria-controls="DataTables_Table_0"
                                                                type="button"
                                                                aria-haspopup="dialog"
                                                                aria-expanded="false"
                                                            >
                                                                <span><i className="bx bx-export me-1"></i>Export</span>
                                                            </button>
                                                            <button
                                                                className="btn btn-secondary add-new btn-primary d-flex cus_Add"
                                                                tabIndex="0"
                                                                aria-controls="DataTables_Table_0"
                                                                type="button"
                                                                data-bs-toggle="offcanvas"
                                                                data-bs-target="#offcanvasAddUser"
                                                            >
                                                                <span><i className="bx bx-plus me-0 me-sm-1"></i>Faculty</span>
                                                            </button>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                     
                                        <table class="datatables-users table border-top dataTable no-footer dtr-column" id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info" width="1390px;">
                                            <thead>
                                                <tr>
                                                    <th className="control sorting_disabled dtr-hidden" rowSpan="1" colSpan="1" aria-label=""></th>
                                                    <th className="sorting sorting_desc" tabIndex="0" aria-controls="DataTables_Table_0" rowSpan="1" colSpan="1" width="100px" aria-label="User: activate to sort column ascending" aria-sort="descending">So.Id</th>
                                                    <th className="sorting sorting_desc" tabIndex="0" aria-controls="DataTables_Table_0" rowSpan="1" colSpan="1" width="200px" aria-label="User: activate to sort column ascending" aria-sort="descending">Name</th>
                                                    <th className="sorting" tabIndex="0" aria-controls="DataTables_Table_0" rowSpan="1" colSpan="1" width="200px" aria-label="Status: activate to sort column ascending">Email</th>
                                                    <th className="sorting" tabIndex="0" aria-controls="DataTables_Table_0" rowSpan="1" colSpan="1" width="170px" aria-label="Status: activate to sort column ascending">MOBILE</th>
                                                    <th className="sorting" tabIndex="0" aria-controls="DataTables_Table_0" rowSpan="1" colSpan="1" width="200px" aria-label="Status: activate to sort column ascending">DOB</th>
                                                    <th className="sorting" tabIndex="0" aria-controls="DataTables_Table_0" rowSpan="1" colSpan="1" width="100px" aria-label="Plan: activate to sort column ascending">Type</th>
                                                    <th className="sorting" tabIndex="0" aria-controls="DataTables_Table_0" rowSpan="1" colSpan="1" width="350px" aria-label="Role: activate to sort column ascending">Address</th>
                                                    <th className="sorting" tabIndex="0" aria-controls="DataTables_Table_0" rowSpan="1" colSpan="1" width="150px" aria-label="Billing: activate to sort column ascending">City</th>
                                                    <th className="sorting_disabled" rowSpan="1" colSpan="1" width="145px" aria-label="Actions">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                
                                                {table.map((item, index) => (
                                                    <tr key={item.id}>
                                                        <td className="sorting_1"></td>
                                                        <td>{item.id}</td>
                                                        <td>{item.Name + " " + item.LastName}</td>
                                                        <td>{item.Email}</td>
                                                        <td>{item.PhoneNumber}</td>
                                                        <td>{item.DOB}</td>
                                                        <td>{item.TeacherType}</td>
                                                        <td>{item.Address && item.Address.Address}</td>
                                                        <td>{item.Address && item.Address.City}</td>
                                                     
                                                       
                                                        
                                                        <td>
                                                            <div className="d-inline-block text-nowrap">
                                                                <Link to={`/teachers/${item.id}`} className="navbar-brand">
                                                                    <button className="btn btn-sm btn-icon" data-bs-target="#editInstructor" data-bs-toggle="modal">
                                                                        <i className="bx bx-edit"></i>
                                                                    </button>
                                                                </Link>
                                                                <button className="btn btn-sm btn-icon delete-record" onClick={() => handleDelete(item.id)}>
                                                                    <i className="bx bx-trash"></i>
                                                                </button>
                                                            </div>
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
                                    
                                    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasAddUser" aria-labelledby="offcanvasAddUserLabel" style={{ width: "28%" }}>
                                        <div class="offcanvas-header">
                                            <h5 id="offcanvasAddUserLabel" class="offcanvas-title">Faculty</h5>
                                            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                        </div>
                                        <div class="offcanvas-body mx-0 flex-grow-0">
                                            <form class="add-new-user pt-0 fv-plugins-bootstrap5 fv-plugins-framework" id="addNewUserForm" onSubmit={handleSubmit} novalidate="novalidate">
                                                <div class="card-body row">

                                                    <div class="col-lg-6 p-t-20">
                                                        {emailerror && <div style={{ color: 'red' }}>{emailerror}</div>}
                                                        <label class="form-label" for="add-user-fullname">Frist Name</label>
                                                        <input type="text" class="form-control" id="add-user-fullname" placeholder="John Doe" name='Name'
                                                            onChange={handleChange}
                                                            autoComplete={false}
                                                            value={Name} aria-label="John Doe" />
                                                        {errors.Name && <div className='errors'>{errors.Name}</div>}
                                                        <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div></div>
                                                    <div class="col-lg-6 p-t-20">
                                                        <label class="form-label" for="add-user-fullname">Last Name</label>
                                                        <input type="text" class="form-control" id="add-user-fullname" placeholder="John Doe" name='LastName'
                                                            onChange={handleChange}
                                                            value={LastName} aria-label="John Doe" />
                                                        {errors.LastName && <div className='errors'>{errors.LastName}</div>}
                                                        <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div></div>
                                                    <div class="col-lg-6 p-t-20">
                                                        <label class="form-label" for="add-user-email">Email</label>
                                                        <input type="text" id="add-user-email" class="form-control" placeholder="john.doe@example.com" name='Email'
                                                            onChange={handleChange}
                                                            value={Email} />
                                                        {errors.Email && <div className='errors'>{errors.Email}</div>}

                                                        <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div></div>
                                                    <div class="col-lg-6 p-t-20">
                                                        <label class="form-label" for="add-user-contact"> Contact</label>
                                                        <input type="number" id="add-user-contact" class="form-control phone-mask" placeholder="+91 (609) 988-44-11" name="PhoneNumber"
                                                            onChange={handleChange}
                                                            value={PhoneNumber} />
                                                        {errors.PhoneNumber && <div className='errors'>{errors.PhoneNumber}</div>}
                                                    </div>
                                                    <div class="col-lg-6 p-t-20">
                                                        <label class="form-label" for="add-user"> User Name</label>
                                                        <input type="text" id="add-user" class="form-control" placeholder="User@123" name="Username"
                                                            onChange={handleChange}
                                                            value={Username} />
                                                        {errors.Username && <div className='errors'>{errors.Username}</div>}
                                                    </div>
                                                    <div class="col-lg-6 p-t-20 paswrd">

                                                        <label class="form-label" for="basic-icon-default-password">Password</label>
                                                        <input type={show ? "text" : "password"}
                                                            onChange={handleChange}
                                                            name='Password'
                                                            value={Password}
                                                            class="form-control password-mask"
                                                            id="basic-default-password12"
                                                            placeholder="Abc@123"
                                                        />
                                                        <i className={`far ${show ? 'fa-eye' : 'fa-eye-slash'}`} onClick={handleshow}></i>
                                                        {error && <div style={{ color: 'red' }}>{error}</div>}
                                                        {errors.Password && <div className='errors'>{errors.Password}</div>}
                                                    </div>
                                                    <div class="col-lg-6 p-t-20">
                                                        <label class="form-label" for="basic-icon-default-password">DOB</label>
                                                        <input type="date"
                                                            onChange={handleChange}
                                                            name='DOB'
                                                            value={DOB}
                                                            class="form-control DOB-mask"
                                                            id="basic-default-DOB"
                                                            placeholder="DOB"
                                                            aria-describedby="basic-default-DOB" />
                                                        {errors.DOB && <div className='errors'>{errors.DOB}</div>}

                                                    </div>
                                                   {/*  <div class="col-lg-6 p-t-20">
                                                        <label for="exampleFormControlSelect2" class="form-label">Class</label>
                                                        <select id="exampleFormControlSelect2"  class="select2 form-select" name="CousesId" value={CousesId} onChange={handleChange}>
                                                            <option value="">Select</option>
                                                            {courses.map((option) => (
                                                                <option key={option.id} value={option.id}>{option.name}</option>
                                                            ))}
                                                        </select>
                                                    </div> */}

                                                      <div class="col-lg-6 p-t-20">
                                                        <label htmlFor="exampleFormControlSelect2" className="form-label">Class</label>
                                                        <Select
                                                            isMulti
                                                            value={options.filter(option => CousesId.includes(option.value))}
                                                            name="CousesId"
                                                            onChange={handleNewChange}
                                                            options={options}
                                                            components={animatedComponents}
                                                            inputId="exampleFormControlSelect2"
                                                        />
                                                         {/* {errors.BatchId && <div className='errors'>{errors.BatchId}</div>} */}

                                                    </div>
                                                    <div class="col-lg-6 p-t-20">
                                                        <label for="exampleFormControlSelect2" class="form-label">Type</label>
                                                        <select id="exampleFormControlSelect2" class="select2 form-select" name="TeacherType" value={TeacherType} onChange={handleChange}>
                                                            <option value="">Select</option>
                                                            <option value="Online">Online</option>
                                                            <option value="Offline">Offline</option>
                                                        </select>
                                                        {errors.TeacherType && <div className='errors'>{errors.TeacherType}</div>}
                                                    </div>
                                                    <div class="col-lg-6 p-t-20">
                                                        <label htmlFor="exampleFormControlSelect2" className="form-label">Country</label>
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
                                                    <div class="col-lg-6 p-t-20">
                                                        <label htmlFor="exampleFormControlSelect2" className="form-label">State</label>
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

                                                    <div class="col-lg-6 p-t-20">
                                                        <label htmlFor="exampleFormControlSelect2" className="form-label"> District</label>
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

                                                    <div class="col-lg-6 p-t-20">
                                                        <label class="form-label" for="add-user-email">Address</label>
                                                        <input type="text" id="add-user-email" class="form-control" placeholder="Address" name='Address'
                                                            onChange={handleChange}
                                                            value={Address} />
                                                        {errors.Address && <div className='errors'>{errors.Address}</div>}
                                                        <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                    </div>
                                                    <div class="col-lg-6 p-t-20">
                                                        <label class="form-label" for="add-user-email">City</label>
                                                        <input type="text" id="add-user-email" class="form-control" placeholder="City" name='City'
                                                            onChange={handleChange}
                                                            value={City} />
                                                        {errors.City && <div className='errors'>{errors.City}</div>}
                                                        <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                    </div>
                                                    <div class="mb-3">
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
                                                    <div class="mb-3">
                                                        <label class="form-label" for="basic-icon-default-message">Introducation & Skills</label>
                                                        <div class="input-group input-group-merge">

                                                            <textarea
                                                                id="basic-icon-default-message"
                                                                class="form-control"
                                                                rows="8"
                                                                placeholder="Hi, Your Introducation And Skills?"
                                                                aria-label="Hi, Your Introducation And Skills?"
                                                                aria-describedby="basic-icon-default-message2"
                                                                name="YourIntroducationAndSkills" value={YourIntroducationAndSkills} onChange={handleChange} />
                                                            {errors.YourIntroducationAndSkills && <div className='errors'>{errors.YourIntroducationAndSkills}</div>}
                                                        </div>

                                                    </div>
                                                    <div class="mb-3 d-flex flex-row">

                                                        <button type="submit" class="btn btn-primary me-sm-3 me-1 data-submit d-flex">Submit</button>
                                                        <button type="reset" class="btn btn-label-secondary d-flex" data-bs-dismiss="offcanvas">Cancel</button>
                                                        <input type="hidden" />
                                                    </div>




                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                </div>
                                {/*  /*   <!--  Modal table --> */}
                                <div class="modal fade" id="editInstructor" tabindex="-1" aria-hidden="true">
                                    <div class="modal-dialog modal-lg modal-simple modal-edit-user">
                                        <div class="modal-content p-3 p-md-5">
                                            <div className='modal-header d-flex'>
                                                <div className='d-flex'>
                                                    <h5 class="modal-title">Faculty Information</h5>
                                                </div>
                                                <div className='d-flex'>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                        aria-label="Close"></button>
                                                </div>


                                            </div>
                                            <div class="modal-body">

                                                <form id="editUserForm" class="row g-3 fv-plugins-bootstrap5 fv-plugins-framework" onSubmit={handleUpdate} novalidate="novalidate">
                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                        {emailerror && <div style={{ color: 'red' }}>{emailerror}</div>}
                                                        <label class="form-label" for="add-user-fullname">Frist Name</label>
                                                        <input type="text" class="form-control" id="add-user-fullname" placeholder="John Doe" name='Name'
                                                            onChange={(e) => setName(e.target.value)}
                                                            defaultValue={Name} aria-label="John Doe" />
                                                        <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div></div>
                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                        <label class="form-label" for="add-user-fullname">Last Name</label>
                                                        <input type="text" class="form-control" id="add-user-fullname" placeholder="John Doe" name='LastName'
                                                            onChange={(e) => setLastName(e.target.value)}
                                                            defaultValue={LastName} aria-label="John Doe" />
                                                        <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div></div>
                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                        <label class="form-label" for="add-user-email">Email</label>
                                                        <input type="text" id="add-user-email" class="form-control" placeholder="john.doe@example.com" name='Email'
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            value={Email} />

                                                        <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div></div>
                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                        <label class="form-label" for="add-user-contact">Contact</label>
                                                        <input type="text" id="add-user-contact" class="form-control phone-mask" placeholder="+91 (609) 988-44-11" name="PhoneNumber"
                                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                                            value={PhoneNumber} />
                                                    </div>
                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                        <label class="form-label" for="add-user">User Name</label>
                                                        <input type="text" id="add-user" class="form-control" placeholder="User@123" name="Username"
                                                            onChange={(e) => setUsername(e.target.value)}
                                                            value={Username} />
                                                    </div>
                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">

                                                        <label class="form-label" for="basic-icon-default-password">DOB</label>
                                                        <input type="date"
                                                            onChange={(e) => setDOB(e.target.value)}
                                                            name='DOB'
                                                            value={DOB}
                                                            class="form-control DOB-mask"
                                                            id="basic-default-DOB"
                                                            placeholder="DOB"
                                                            aria-describedby="basic-default-DOB" />

                                                    </div>
                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                        <label for="exampleFormControlSelect2" class="form-label">Type</label>
                                                        <select id="exampleFormControlSelect2" class="select2 form-select" name="TeacherType" value={TeacherType} onChange={(e) => setTeacherType(e.target.value)}>
                                                            <option value="">Select</option>
                                                            <option value="Online">Online</option>
                                                            <option value="Offline">Offline</option>
                                                        </select>
                                                    </div>
                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                        <label htmlFor="exampleFormControlSelect2" className="form-label">Country</label>
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
                                                        <label htmlFor="exampleFormControlSelect2" className="form-label">State</label>
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
                                                        <label htmlFor="exampleFormControlSelect2" className="form-label">District</label>
                                                        <select
                                                            id="exampleFormControlSelect2"
                                                            className="select2 form-select"
                                                            name="DistrictId"
                                                            value={DistrictId}
                                                            onChange={(e) => setDistrictId(e.target.value)}
                                                        >
                                                            <option value="">Select</option>
                                                            {selectedState && selectedState.Cities.map(city => (
                                                                <option key={city.id} value={city.id}>{city.name}</option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                        <label class="form-label" for="add-user-email">Address</label>
                                                        <input type="text" id="add-user-email" class="form-control" placeholder="Address" name='Address'
                                                            onChange={(e) => setAddress(e.target.value)}
                                                            value={Address} />
                                                        <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                    </div>
                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                        <label class="form-label" for="add-user-email">City</label>
                                                        <input type="text" id="add-user-email" class="form-control" placeholder="Address" name='City'
                                                            onChange={(e) => setCity(e.target.value)}
                                                            value={City} />
                                                        <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                    </div>

                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                        <label htmlFor="exampleFormControlSelect2" className="form-label">Class / Course</label>
                                                        <Select
                                                            isMulti
                                                            value={options.filter(option => CousesId.includes(option.value))}
                                                            name="CousesId"
                                                            onChange={handleNewChange}
                                                            options={options}
                                                            components={animatedComponents}
                                                            inputId="exampleFormControlSelect2"
                                                        />
                                                        <ul>
                                                            {CousesId.map(id => {
                                                                const course = options.find(opt => opt.value === id);
                                                                return course ? <li key={id}>{course.label}</li> : <li key={id}>Unknown Course ID: {id}</li>;
                                                            })}
                                                        </ul>
                                                         {/* {errors.BatchId && <div className='errors'>{errors.BatchId}</div>} */}

                                                    </div>
                                                    {/* <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                    <ul>
                                                        {CousesId.map(id => {
                                                            const course = options.find(opt => opt.value === id);
                                                            return course ? <li key={id}>{course.label}</li> : <li key={id}>Unknown Course ID: {id}</li>;
                                                        })}
                                                    </ul>
                                                    </div> */}
                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">
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
                                                    <div class="mb-3">
                                                        <label class="form-label" for="basic-icon-default-message">Faculty Your Introducation & Skills</label>
                                                        <div class="input-group input-group-merge">
                                                            <textarea
                                                                id="basic-icon-default-message"
                                                                class="form-control"
                                                                rows="8"
                                                                placeholder="Hi, Your Introducation And Skills?"
                                                                aria-label="Hi, Your Introducation And Skills?"
                                                                aria-describedby="basic-icon-default-message2"
                                                                name="YourIntroducationAndSkills" value={YourIntroducationAndSkills} onChange={(e) => setYourIntroducationAndSkills(e.target.value)}></textarea>
                                                        </div>
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

export default ListUse