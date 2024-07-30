import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select, { StylesConfig } from 'react-select'
import makeAnimated from 'react-select/animated';
import { Link, useParams } from 'react-router-dom';
import Footer from './footerComponent';
import Navbar from './navComponemt';
import DashBoardMenus from './dashboardsMenuComponent';
const animatedComponents = makeAnimated();
const { REACT_APP_API_ENDPOINT, REACT_APP_API_IMG } = process.env;
function ListUse() {
    const [table, setTable] = useState([]);
    const { usersId } = useParams();
    const [error, setError] = useState(null);
    const [emailerror, setEmail] = useState(null);
    const [password, setPassword] = useState("Abc@123");
    const [roleData, setSaleTeamData] = useState([]);
    const [countryTable, setCountryTable] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCourses, setSelectedCourses] = useState('');
    const [courses, setCourses] = useState([])
    const [batches, setBatches] = useState([])
    const [options, setOptions] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [isVisible, setIsVisible] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // Track total pages for pagination


    const toggleVisibility = (id) => {
        setIsVisible(isVisible === id ? null : id);
    };
    const [formData, setFormData] = useState({
        name: '',
        lastname:'',
        userName: '',
        email: '',
        password: '',
        roleName: '',
        phoneNumber: '',
        image: null,
        AddressType: '',
        departmentId: '',
        Address: '',
        StateId: '',
        CountryId: '',
        DistrictId: '',
        City: '',
        DOB: '',
        YourIntroducationAndSkills: '',
        TeacherType: '',
        Date: '',
        CoursesId: '',
        BatchId: '',
        CousesId: [],
        studentId: 0,
        teacherId: 0,
        roleSelection: ''
    });

    const handleCountryChange = (e) => {
        const selectedCountryId = parseInt(e.target.value, 10);
        const selectedCountry = countryTable.find((country) => country.id === selectedCountryId);
        setFormData({
            ...formData,
            CountryId: selectedCountryId,
            StateId: '',
            DistrictId: '',
        });
        setSelectedCountry(selectedCountry);
        setSelectedState('');
    };

    const handleStateChange = (e) => {
        const selectedStateId = parseInt(e.target.value, 10);
        const selectedState = selectedCountry ? selectedCountry.Staties.find((state) => state.id === selectedStateId) : '';
        setFormData({
            ...formData,
            StateId: selectedStateId,
            DistrictId: '',
        });
        setSelectedState(selectedState);
    };


    const handleNewChange = (selectedOptions) => {
        const selectedIds = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setFormData({
            ...formData,
            CousesId: selectedIds,
        });

    };
    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };
    useEffect(() => {
        fetchData(page);
    }, [page]);

    useEffect(() => {
        fetchData();
        fetchData1()
        fetchData2()
        fetchData3()
        fetchData4()
    }, []);

    const fetchData = async (page = 1) => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/users?page=${page}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setTable(response.data.users);
                setTotalPages(response.data.users.totalPage ||1);
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
                setSaleTeamData(userData)
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

    const fetchData3 = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/listcourses`, {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                });
                const userDatas = response.data.courses;
                const courses = response.data.courses.map(course => ({
                    value: course.id,
                    label: course.name
                }));
                setOptions(courses);
                setCourses(userDatas)
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchData4 = async () => {
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
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'roleSelection') {
            if (value === '3') {
                setFormData((prevData) => ({
                    ...prevData,
                    roleSelection: value,
                    teacherId: 3,
                    studentId: 0
                }));
            } else if (value === '4') {
                setFormData((prevData) => ({
                    ...prevData,
                    roleSelection: value,
                    studentId: 4,
                    teacherId: 0
                }));
            } else {
                setFormData((prevData) => ({
                    ...prevData,
                    roleSelection: value,
                    studentId: 0,
                    teacherId: 0
                }));
            }
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
        if (name === 'departmentId') {
            toggleVisibility(value);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        if (selectedFiles) {
            data.append('file', selectedFiles[0]);
        }    
         const formDataWithCoursesId = {
            ...formData,
            CousesId: formData.CousesId.join(',')  // Convert array to comma-separated string
        };
        for (const key in formDataWithCoursesId) {
            data.append(key, formDataWithCoursesId[key]);
        }
        try {
            const token = localStorage.getItem('token');
            let response
            if (token) {
                response = await axios.post(`${REACT_APP_API_ENDPOINT}/users`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                    }
                });
                window.location.href = "/userlist";
                alert('Users SuccessFully Create');
            }
        } catch (error) {
            alert('Failed to send message.');
        }
    };

    const handleDelete = async (usersId) => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                await axios.delete(`${REACT_APP_API_ENDPOINT}/users/${usersId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                fetchData();
                alert('Data successfully deleted');
            }
        } catch (error) {
            console.error('Error deleting data:', error);
            alert('An error occurred while deleting data');
        }
    };

    //Dropdown Navigation
    const [activeService, setOpenDropdown] = useState(null);

    // Function to toggle a specific dropdown
    const toggleDropdown = (serviceName) => {
        setOpenDropdown(activeService === serviceName ? '' : serviceName);
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
                                        <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer"><div class="row mx-2"><div class="col-md-2"><div class="me-3"><div class="dataTables_length" id="DataTables_Table_0_length"><label><select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" class="form-select">
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option><option value="100">100</option>
                                        </select></label>
                                        </div></div></div>
                                            <div class="col-md-10">
                                                <div class="dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center 
                                                justify-content-end flex-md-row flex-column mb-3 mb-md-0">
                                                    <div id="DataTables_Table_0_filter" class="dataTables_filter"><label>
                                                        <input type="search" class="form-control" placeholder="Search.." aria-controls="DataTables_Table_0" /></label>
                                                    </div>
                                                    <div class="btn-group d-flex flex-row">
                                                        <button class="btn buttons-collection dropdown-toggle btn-label-secondary mx-3 d-flex"
                                                            tabindex="0" aria-controls="DataTables_Table_0" type="button" aria-haspopup="dialog"
                                                            aria-expanded="false">
                                                            <span><i class="bx bx-export me-1"></i>Export</span>
                                                        </button>

                                                        <button class="btn btn-secondary add-new btn-primary d-flex cus_Add" tabindex="0" aria-controls="DataTables_Table_0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasAddUser">

                                                            <span><i class="bx bx-plus me-0 me-sm-1"></i>User</span>
                                                        </button>
                                                    </div>

                                                </div></div></div><table class="datatables-users table border-top dataTable no-footer dtr-column" id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info" width="1390px;">
                                                <thead>
                                                    <tr>
                                                        <th class="control sorting_disabled dtr-hidden" rowspan="1" colspan="1" aria-label=""></th>
                                                        <th class="sorting sorting_desc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="353px;" aria-label="User: activate to sort column ascending" aria-sort="descending">So.Id</th>
                                                        <th class="sorting sorting_desc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="353px;" aria-label="User: activate to sort column ascending" aria-sort="descending">Full Name</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="176px;" aria-label="Role: activate to sort column ascending">User Name</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="118px;" aria-label="Plan: activate to sort column ascending">Contact </th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="217px;" aria-label="Billing: activate to sort column ascending">Email</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="115px;" aria-label="Status: activate to sort column ascending">Role</th>
                                                        <th class="sorting_disabled" rowspan="1" colspan="1" width="145px;" aria-label="Actions">Actions</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {table.map((item, index) => (
                                                        <tr key={item.id}>
                                                            <td class="sorting_1">
                                                                <div class="d-flex justify-content-start align-items-center user-name">
                                                                    <div class="avatar-wrapper"><div class="avatar avatar-sm me-3">
                                                                        <img src={`${REACT_APP_API_IMG}/uploads/images/${item.image}`} alt="Avatar" class="rounded-circle" />
                                                                    </div>
                                                                    </div>
                                                                    <div class="d-flex flex-column">
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>{index + 1}</td>
                                                            <td>{item.name} {item.lastname}</td>
                                                            <td>{item.userName}</td>
                                                            <td>{item.phoneNumber}</td>
                                                            <td>{item.email}</td>
                                                            <td>{item.Role && item.Role.Name}</td>
                                                            <td>
                                                                <div class="d-inline-block text-nowrap">
                                                                    <button class="btn btn-sm btn-icon" onClick={() => toggleDropdown('dropdownprofile')}>
                                                                        <i class="bx bx-edit"></i>
                                                                    </button>
                                                                    <button class="btn btn-sm btn-icon delete-record" onClick={() => handleDelete(item.id)}>
                                                                        <i class="bx bx-trash"></i>
                                                                    </button>

                                                                    {activeService === 'dropdownprofile' && (
                                                                        <div classNmae="dropdown-menu dropdown-menu-end m-0">
                                                                            <Link to={`/userviews/${item.id}`} classNmae="dropdown-item">View</Link></div>
                                                                    )}</div>
                                                            </td>

                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <div class="row mx-2"><div class="col-sm-12 col-md-6"><div class="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">Showing 1 to 10 of 50 entries</div></div><div class="col-sm-12 col-md-6"><div class="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate"><ul class="pagination"><li class="paginate_button page-item previous disabled" id="DataTables_Table_0_previous"><a aria-controls="DataTables_Table_0" aria-disabled="true" role="link" data-dt-idx="previous" tabindex="-1" class="page-link">Previous</a></li><li class="paginate_button page-item active"><a href="#" aria-controls="DataTables_Table_0" role="link" aria-current="page" data-dt-idx="0" tabindex="0" class="page-link">1</a></li><li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="1" tabindex="0" class="page-link">2</a></li><li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="2" tabindex="0" class="page-link">3</a></li><li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="3" tabindex="0" class="page-link">4</a></li><li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="4" tabindex="0" class="page-link">5</a></li><li class="paginate_button page-item next" id="DataTables_Table_0_next"><a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="next" tabindex="0" class="page-link">Next</a></li></ul></div></div></div></div>
                                    </div>

                                    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasAddUser" aria-labelledby="offcanvasAddUserLabel">
                                        <div class="offcanvas-header">
                                            <h5 id="offcanvasAddUserLabel" class="offcanvas-title">Add User</h5>
                                            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                        </div>
                                        <div class="offcanvas-body mx-0 flex-grow-0">
                                            <form class="add-new-user row g-3 pt-0 fv-plugins-bootstrap5 fv-plugins-framework" id="addNewUserForm" onSubmit={handleSubmit} novalidate="novalidate">


                                                <div class="col-12 col-md-6">
                                                    {emailerror && <div style={{ color: 'red' }}>{emailerror}</div>}
                                                    <label class="form-label" for="add-user-fullname">Frist Name</label>
                                                    <input type="text" class="form-control" id="add-user-fullname" placeholder="John Doe" name='name'
                                                        onChange={handleChange}
                                                        value={formData.name} aria-label="John Doe" />
                                                    <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div></div>
                                                <div class="col-12 col-md-6">
                                                    {emailerror && <div style={{ color: 'red' }}>{emailerror}</div>}
                                                    <label class="form-label" for="add-user-fullname">Last Name</label>
                                                    <input type="text" class="form-control" id="add-user-fullname" placeholder="John Doe" name='lastname'
                                                        onChange={handleChange}
                                                        value={formData.lastname} aria-label="John Doe" />
                                                    <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div></div>


                                                <div class="col-12 col-md-6">
                                                    <label class="form-label" for="add-user-fullname">User Name</label>
                                                    <input type="text" class="form-control" id="add-user-fullname" placeholder="John Doe" name='userName'
                                                        onChange={handleChange}
                                                        value={formData.userName} aria-label="John Doe" />
                                                    <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div></div>


                                                <div class="col-12 col-md-6">
                                                    <label class="form-label" for="add-user-email">Email</label>
                                                    <input type="text" id="add-user-email" class="form-control" placeholder="john.doe@example.com" name='email'
                                                        onChange={handleChange}
                                                        value={formData.email} />

                                                    <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div></div>


                                                <div class="col-12 col-md-6">
                                                    <label class="form-label" for="add-user-contact">Contact</label>
                                                    <input type="number" id="add-user-contact" class="form-control phone-mask" placeholder="+91 (609) 988-44-11" name="phoneNumber"
                                                        onChange={handleChange}
                                                        value={formData.phoneNumber} />
                                                </div>


                                                <div class="col-12 col-md-6">
                                                    <label class="form-label" for="basic-icon-default-password">Password</label>
                                                    <input type="password"
                                                        onChange={handleChange}
                                                        name='password'
                                                        value={formData.password}
                                                        class="form-control password-mask"
                                                        id="basic-default-password12"
                                                        placeholder="Abc@123"
                                                        aria-describedby="basic-default-password2" />
                                                    {error && <div style={{ color: 'red' }}>{error}</div>}
                                                </div>

                                                <div className="col-12 col-md-6">
                                                    <label htmlFor="exampleFormControlSelect2" className="form-label">Roles</label>
                                                    <select
                                                        id="modalEditUserStatus"
                                                        className="form-select"
                                                        name="departmentId"
                                                        value={formData.departmentId}
                                                        onChange={handleChange}
                                                    >
                                                        {roleData.map((option) => (
                                                            <option key={option.id} value={option.id}>{option.Name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div class="col-lg-6 p-t-20">
                                                    <label htmlFor="exampleFormControlSelect2" className="form-label"> Address Type</label>
                                                    <select className="select2 form-select" name="AddressType" value={formData.AddressType} onChange={handleChange}>
                                                        <option value=" ">---Select---</option>
                                                        <option value="Current Address">Current Address</option>
                                                        <option value="Permanent Address">Permanent Address</option>
                                                    </select>
                                                </div>
                                                <div class="col-lg-6 p-t-20">
                                                    <label htmlFor="exampleFormControlSelect2" className="form-label"> Country</label>
                                                    <select
                                                        id="exampleFormControlSelect2"
                                                        className="select2 form-select"
                                                        name="CountryId"
                                                        value={formData.CountryId}
                                                        onChange={handleCountryChange}
                                                    >
                                                        <option value="">Select</option>
                                                        {countryTable.map(option => (
                                                            <option key={option.id} value={option.id}>{option.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div class="col-lg-6 p-t-20">
                                                    <label htmlFor="exampleFormControlSelect2" className="form-label"> State</label>
                                                    <select
                                                        id="exampleFormControlSelect2"
                                                        className="select2 form-select"
                                                        name="StateId"
                                                        value={formData.StateId}
                                                        onChange={handleStateChange}
                                                    >
                                                        <option value="">Select</option>
                                                        {selectedCountry && selectedCountry.Staties.map(state => (
                                                            <option key={state.id} value={state.id}>{state.name}</option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div class="col-lg-6 p-t-20">
                                                    <label htmlFor="exampleFormControlSelect2" className="form-label"> District</label>
                                                    <select
                                                        id="exampleFormControlSelect2"
                                                        className="select2 form-select"
                                                        name="DistrictId"
                                                        value={formData.DistrictId}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="">Select</option>
                                                        {selectedState && selectedState.Cities.map(city => (
                                                            <option key={city.id} value={city.id}>{city.name}</option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div class="mb-3">
                                                    <label class="form-label" for="add-user-email"> City</label>
                                                    <input type="text" id="add-user-email" class="form-control" placeholder="City" name='City'
                                                        onChange={handleChange}
                                                        value={formData.City} />
                                                    <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                </div>

                                                <div class="mb-3">
                                                    <label class="form-label" for="add-user-email"> Address</label>
                                                    <input type="text" id="add-user-email" class="form-control" placeholder="Address" name='Address'
                                                        onChange={handleChange}
                                                        value={formData.Address} />
                                                    <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                </div>


                                                {isVisible === '4' && (
                                                    <>
                                                        <div class="col-12">
                                                            <label class="form-label" for="add-user-contact">Student Date</label>
                                                            <input type="date" id="add-user-contact" class="form-control phone-mask" placeholder="Date" name="Date"
                                                                onChange={handleChange}
                                                                value={formData.Date} />
                                                        </div>
                                                        <div class="col-12 col-md-6">
                                                            <label for="exampleFormControlSelect2" class="form-label">Student Courses</label>
                                                            <select id="exampleFormControlSelect2" class="select2 form-select" name="CoursesId" value={formData.CoursesId} onChange={handleChange}>
                                                                <option value="">Select</option>
                                                                {courses.map((option) => (
                                                                    <option key={option.id} value={option.id}>{option.name}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div class="col-12 col-md-6">
                                                            <label for="exampleFormControlSelect2" class="form-label">Student Batch</label>
                                                            <select id="exampleFormControlSelect2" class="select2 form-select" name="BatchId" value={formData.BatchId} onChange={handleChange}>
                                                                <option value="">Select</option>
                                                                {batches.map(batch => (
                                                                    <option key={batch.id} value={batch.id}>{batch.Title}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </>

                                                )}


                                                {isVisible === '3' && (<>
                                                    <div class="col-12">
                                                        <label htmlFor="exampleFormControlSelect2" className="form-label field_name"> Class</label>

                                                        <Select
                                                            isMulti
                                                            value={options.filter(option => formData.CousesId.includes(option.value))}
                                                            name="CousesId"
                                                            onChange={handleNewChange}
                                                            options={options}
                                                            components={animatedComponents}
                                                            inputId="exampleFormControlSelect2"
                                                        />
                                                    </div>

                                                    <div class="col-12 col-md-6">
                                                        <label class="form-label" for="add-user-email">DOB</label>
                                                        <input type="date" className='form-control' name="DOB" value={formData.DOB} onChange={handleChange} placeholder="DOB" />
                                                        <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                    </div>
                                                    <div class="col-12 col-md-6">
                                                        <label for="exampleFormControlSelect2" class="form-label">Type</label>
                                                        <select id="exampleFormControlSelect2" class="select2 form-select" name="TeacherType" value={formData.TeacherType} onChange={handleChange}>
                                                            <option value="">Select</option>
                                                            <option value="Online">Online</option>
                                                            <option value="Offline">Offline</option>
                                                        </select>
                                                    </div>
                                                    <div class="col-12">
                                                        <label class="form-label" for="basic-icon-default-message">Introducation & Skills</label>
                                                        <div class="input-group input-group-merge">

                                                            <textarea
                                                                id="basic-icon-default-message"
                                                                class="form-control"
                                                                rows="8"
                                                                placeholder="Hi, Your Introducation And Skills?"
                                                                aria-label="Hi, Your Introducation And Skills?"
                                                                aria-describedby="basic-icon-default-message2"
                                                                name="YourIntroducationAndSkills" value={formData.YourIntroducationAndSkills} onChange={handleChange}></textarea>
                                                        </div>
                                                    </div>
                                                </>
                                                )}

                                                {isVisible === '5' && (
                                                    <div>
                                                        {formData.studentId==4 ? (
                                                            <div className='row'>
                                                                <div class="col-12">
                                                                    <label class="form-label" for="add-user-contact">Student Date</label>
                                                                    <input type="date" id="add-user-contact" class="form-control phone-mask" placeholder="Date" name="Date"
                                                                        onChange={handleChange}
                                                                        value={formData.Date} />
                                                                </div>
                                                                <div class="col-12 col-md-6">
                                                                    <label for="exampleFormControlSelect2" class="form-label">Student Courses</label>
                                                                    <select id="exampleFormControlSelect2" class="select2 form-select" name="CoursesId" value={formData.CoursesId} onChange={handleChange}>
                                                                        <option value="">Select</option>
                                                                        {courses.map((option) => (
                                                                            <option key={option.id} value={option.id}>{option.name}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                                <div class="col-12 col-md-6">
                                                                    <label for="exampleFormControlSelect2" class="form-label">Student Batch</label>
                                                                    <select id="exampleFormControlSelect2" class="select2 form-select" name="BatchId" value={formData.BatchId} onChange={handleChange}>
                                                                        <option value="">Select</option>
                                                                        {batches.map(batch => (
                                                                            <option key={batch.id} value={batch.id}>{batch.Title}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        ) : formData.teacherId==3 ? (
                                                            <div className='row'>
                                                                <div class="col-12">
                                                                    <label htmlFor="exampleFormControlSelect2" className="form-label field_name"> Class</label>
                                                                    <Select
                                                                        isMulti
                                                                        value={options.filter(option => formData.CousesId.includes(option.value))}
                                                                        name="CousesId"
                                                                        onChange={handleNewChange}
                                                                        options={options}
                                                                        components={animatedComponents}
                                                                        inputId="exampleFormControlSelect2"
                                                                    />
                                                                </div>

                                                                <div class="col-12 col-md-6">
                                                                    <label class="form-label" for="add-user-email">DOB</label>
                                                                    <input type="date" className='form-control' name="DOB" value={formData.DOB} onChange={handleChange} placeholder="DOB" />
                                                                    <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                                </div>
                                                                <div class="col-12 col-md-6">
                                                                    <label for="exampleFormControlSelect2" class="form-label">Type</label>
                                                                    <select id="exampleFormControlSelect2" class="select2 form-select" name="TeacherType" value={formData.TeacherType} onChange={handleChange}>
                                                                        <option value="">Select</option>
                                                                        <option value="Online">Online</option>
                                                                        <option value="Offline">Offline</option>
                                                                    </select>
                                                                </div>
                                                                <div class="col-12">
                                                                    <label class="form-label" for="basic-icon-default-message">Introducation & Skills</label>
                                                                    <div class="input-group input-group-merge">

                                                                        <textarea
                                                                            id="basic-icon-default-message"
                                                                            class="form-control"
                                                                            rows="8"
                                                                            placeholder="Hi, Your Introducation And Skills?"
                                                                            aria-label="Hi, Your Introducation And Skills?"
                                                                            aria-describedby="basic-icon-default-message2"
                                                                            name="YourIntroducationAndSkills" value={formData.YourIntroducationAndSkills} onChange={handleChange}></textarea>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                )}
                                                {isVisible === "5" && (
                                                    <div className="single-input-wrapper">
                                                        <label htmlFor="roleSelection">Role</label>
                                                        <select id="roleSelection" name="roleSelection" className="form-select" value={formData.studentId === 4 ? "4" : formData.teacherId === 3 ? "3" : ""} onChange={handleChange}>
                                                            <option value="">---Select---</option>
                                                            <option value="3">Instructor</option>
                                                            <option value="4">Student</option>
                                                        </select>
                                                    </div>
                                                )}
                                                <div class="col-12">
                                                    <label class="form-label" for="basic-icon-default-message">Message</label>
                                                    <div class="input-group input-group-merge">
                                                        <textarea
                                                            id="basic-icon-default-message"
                                                            class="form-control"
                                                            placeholder="Hi, Do you have a moment to talk Joe?"
                                                            aria-label="Hi, Do you have a moment to talk Joe?"
                                                            aria-describedby="basic-icon-default-message2"
                                                            name="message" value={formData.message} onChange={handleChange}></textarea>
                                                    </div>
                                                </div>

                                                <div class="col-12">
                                                    <div class="input-group">
                                                        <input
                                                            type="file"
                                                            class="form-control"
                                                            id="inputGroupFile04"
                                                            aria-describedby="inputGroupFileAddon04"
                                                            aria-label="Upload"
                                                            accept="image/png, image/jpeg"
                                                            onChange={handleFileChange}
                                                        />

                                                    </div>
                                                </div>
                                                <div className='d-flex'>
                                                    <button type="submit" class="btn btn-primary me-sm-3 me-1 data-submit">Submit</button>
                                                    <button type="reset" class="btn btn-label-secondary" data-bs-dismiss="offcanvas">Cancel</button>
                                                </div>

                                                <input type="hidden" /></form>
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

        </>
    )
}

export default ListUse