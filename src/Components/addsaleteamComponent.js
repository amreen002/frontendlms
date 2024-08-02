import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from './footerComponent';
import Navbar from './navComponemt';
import DashBoardMenus from './dashboardsMenuComponent';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { FaPlus } from 'react-icons/fa';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Draggable from '../Components/draggableComponent';
const { REACT_APP_API_ENDPOINT } = process.env;
function SaleTeamUse() {
    const [table, setTable] = useState([]);
    const { saleteamId } = useParams();
    const [date, setDate] = useState("");
    const [name, setName] = useState("");
    const [roleId, setroleId] = useState("");
    const [age, setAge] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [workingStatus, setWorkingStatus] = useState("");
    const [leadPlatform, setLeadPlatform] = useState("");
    const [remark, setRemark] = useState("");
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [items, setItems] = useState([]);
    const [nextId, setNextId] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sliderActive, setSliderActive] = useState(false);
    const [dataUser, setTabledataUser] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const inputs = [
        { id: 'date', label: 'Date*' },
        { id: 'remark', label: 'Remark*' },
        { id: 'roleId', label: 'Assign to Counsellor*' },
        { id: 'workingStatus', label: 'Select Specialisation*' },
        { id: 'leadPlatform', label: 'Lead Platform*' },
        { id: 'age', label: 'Age*' },
        { id: 'countryid', label: 'Country*' },
        { id: 'stateid', label: 'State*' },
        { id: 'courseid', label: 'Course*' },
        { id: 'cityid', label: 'City*' },
        { id: 'address', label: 'Address*' },
        { id: 'area', label: 'Area*' },
        { id: 'area', label: 'Area*' },
    ];



    useEffect(() => {
        fetchData1(saleteamId);
    }, [saleteamId]);

    const fetchData1 = async (saleteamId) => {
        try {
            if (!saleteamId) {
                console.log("saleteamId is undefined");
                return;
            }
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/listsaleteam/${saleteamId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                // Assuming response.data directly contains user data

                const userData = response.data.saleteam;
                setUserData(response.data.saleteam)
                // Populate state with fetched user data
                setDate(userData.date)
                setName(userData.name);
                setAge(userData.age);
                setPhoneNumber(userData.phoneNumber);
                setEmail(userData.email);
                setWorkingStatus(userData.workingStatus);
                setLeadPlatform(userData.leadPlatform);
                setRemark(userData.remark)
            }
        } catch (err) {
            console.log(err.response);
        }
    }
    useEffect(() => {
        fetchData();
        fetchData2()
    }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/listsaleteam`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTable(response.data.saleteam);
            }
        } catch (err) {
            console.log(err.response);
        }
    }
    const fetchData2 = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/users?LeadGetAllowated=true`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setTabledataUser(response.data.users.rows);
            }// Updated state variable
        } catch (err) {
            console.log(err.response);
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSubmit = {
            ...formData, // Ensure formData has plain strings
        };
        try {
            const token = localStorage.getItem('token');

            if (token) {
                await axios.post(`${REACT_APP_API_ENDPOINT}/addsaleteam`, dataToSubmit, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                window.location.href = "/addsaleteam"
                alert('Lead Is Create Successfully');
            }
        } catch (error) {
            alert('Failed to send message.');
        }
    }
    const handleDelete = async (saleteamId) => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                await axios.delete(`${REACT_APP_API_ENDPOINT}/deletesaleteam/${saleteamId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                fetchData();
                alert('Lead Successfully Deleted');

            }
        } catch (error) {
            console.error('Error deleting data:', error);
            alert('An error occurred while deleting data');
        }
    }
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const updatedUserData = { date, name, age, phoneNumber, email, workingStatus, leadPlatform, remark };
            const token = localStorage.getItem('token');

            if (token) {
                await axios.patch(`${REACT_APP_API_ENDPOINT}/viewssaleteam/${saleteamId}`, updatedUserData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                fetchData(saleteamId);
                window.location.href = "/addsaleteam"
                alert("Lead Is Updated Successfully!");
            }
        } catch (error) {
            console.error('Error updating:', error);
            alert('An error occurred while updating');
        }

        // Clear input fields after update

    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active && over && active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const handleChange = (e, id) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };



    const addInput = (type) => {
        const id = `input-${type}`;
        if (items.some(item => item.id === id)) {
            handleRemove(id);
            return;
        }

        const newItem = {
            id,
            component: renderInput(type, id),
        };

        setItems((items) => [...items, newItem]);
    };



    const renderInput = (type, id) => {
        switch (type) {
            case 'date':
                return (
                    <input
                        type="date"
                        className="form-control enquery-form"
                        placeholder="Candidate Date*"
                        name="date"
                        onChange={(e) => handleChange(e, id)}
                    />
                );
            case 'name':
                return (
                    <input
                        type="text"
                        className="form-control enquery-form"
                        placeholder="Candidate Name*"
                        name="name"
                        onChange={(e) => handleChange(e, id)}
                    />
                );
            case 'workingStatus':
                return (
                    <select id="exampleFormControlSelect2" class="select2 form-select enquery-form" name="workingStatus" placeholder='Select Specialistion*' onChange={(e) => handleChange(e, id)}>
                        <option value="">Select Specialistion*</option>
                        <option value="Employee">Employee</option>
                        <option value="Student">Student</option>
                        <option value="Entrepreneur">Entrepreneur</option>
                    </select>
                );
            case 'roleId':
                return (
                    <select id="exampleFormControlSelect2" class="select2 form-select enquery-form" name='roleId' onChange={(e) => handleChange(e, id)}>
                        <option value="">Assign to Counsellor*</option>
                        {dataUser.map(option => (
                            <option key={option.id} value={option.id}>{option.name}</option>
                        ))}
                    </select>
                );
            case 'remark':
                return (
                    <input
                        type="text"
                        className="form-control enquery-form"
                        placeholder="Remark*"
                        name="remark"
                        onChange={(e) => handleChange(e, id)}
                    />
                );
            case 'leadPlatform':
                return (
                    <select id="exampleFormControlSelect2" class="select2 form-select enquery-form" placeholder='Choose Forms Interested in*' name='leadPlatform'
                        onChange={(e) => handleChange(e, id)}>
                        <option value="">Choose Forms Interested in*</option>
                        <option value="Employee">Interested</option>
                        <option value="Student">Not Interested</option>
                    </select>
                )
            case 'age':
                return (
                    <input
                        type="number"
                        className="form-control enquery-form"
                        placeholder="Age*"
                        name="age"
                        onChange={(e) => handleChange(e, id)}
                    />
                );
            case 'stateid':
                return (
                    <input
                        type="text"
                        className="form-control enquery-form"
                        placeholder="State*"
                        name="stateid"
                        onChange={(e) => handleChange(e, id)}
                    />
                );
            case 'countryid':
                return (
                    <input
                        type="text"
                        className="form-control enquery-form"
                        placeholder="Country*"
                        name="countryid"
                        onChange={(e) => handleChange(e, id)}
                    />
                );
            case 'cityid':
                return (
                    <input
                        type="text"
                        className="form-control enquery-form"
                        placeholder="City*"
                        name="cityid"
                        onChange={(e) => handleChange(e, id)}
                    />
                );
            case 'courseid':
                return (
                    <input
                        type="text"
                        className="form-control enquery-form"
                        placeholder="Select Course / Class*"
                        name="courseid"
                        onChange={(e) => handleChange(e, id)}
                    />
                );
            case 'address':
                return (
                    <input
                        type="text"
                        className="form-control enquery-form"
                        placeholder="Address*"
                        name="address"
                        onChange={(e) => handleChange(e, id)}
                    />
                );
            case 'area':
                return (
                    <input
                        type="text"
                        className="form-control enquery-form"
                        placeholder="Area*"
                        name="area"
                        onChange={(e) => handleChange(e, id)}
                    />
                );
            case 'leadPlatform':
                return (
                    <input
                        type="text"
                        className="form-control enquery-form"
                        placeholder="Lead Platform*"
                        name="leadPlatform"
                        onChange={(e) => handleChange(e, id)}
                    />
                );
            default:
                return null;
        }
    };

    const toggleDropdown = (type) => {
        setIsExpanded(type);
    };

    const filteredInputs = inputs.filter(input =>
        input.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleRemove = (id) => {
        setItems((items) => items.filter((item) => item.id !== id));
        setFormData((prev) => {
            const newFormData = { ...prev };
            delete newFormData[id];
            return newFormData;
        });
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
                                            <input type="search" class="form-control" placeholder="Search.." aria-controls="DataTables_Table_0" /></label></div>
                                            <div class="btn-group d-flex flex-row">
                                                <button class="btn buttons-collection dropdown-toggle btn-label-secondary mx-3 d-flex"
                                                    tabindex="0" aria-controls="DataTables_Table_0" type="button" aria-haspopup="dialog"
                                                    aria-expanded="false">
                                                    <span><i class="bx bx-export me-1"></i>Export</span>
                                                </button>

                                                <button class="btn btn-secondary add-new btn-primary d-flex cus_Add" tabindex="0" aria-controls="DataTables_Table_0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasAddUser">

                                                    <span><i class="bx bx-plus me-0 me-sm-1"></i>Lead</span>
                                                </button>
                                            </div>
                                        </div></div></div><table class="datatables-users table border-top dataTable no-footer dtr-column" id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info" width="1390px;">
                                                <thead>
                                                    <tr>
                                                        <th class="control sorting_disabled dtr-hidden" rowspan="1" colspan="1" aria-label=""></th>
                                                        <th class="sorting sorting_desc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="100px;" aria-label="User: activate to sort column ascending" aria-sort="descending">S.NO</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="Role: activate to sort column ascending">Full Name</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="Plan: activate to sort column ascending">Contact </th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="250px;" aria-label="Billing: activate to sort column ascending">Email</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="250px;" aria-label="Status: activate to sort column ascending">Working Status</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="250px;" aria-label="Status: activate to sort column ascending">Lead Platform</th>
                                                        <th class="sorting_disabled" rowspan="1" colspan="1" width="118px;" aria-label="Actions">Actions</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {table.map((item) => (
                                                        <tr key={item.id}>
                                                            <td class="sorting_1">

                                                            </td>
                                                            <td>{item.id}</td>
                                                            <td>{item.name}</td>
                                                            <td>{item.phoneNumber}</td>
                                                            <td>{item.email}</td>
                                                            <td>{item.workingStatus}</td>
                                                            <td>{item.leadPlatform}</td>
                                                            <td>
                                                                <div class="d-inline-block text-nowrap">
                                                                    <Link to={`/addsaleteam/${item.id}`} className="navbar-brand" >  <button class="btn btn-sm btn-icon" data-bs-target="#editUser" data-bs-toggle="modal">
                                                                        <i class="bx bx-edit"></i>

                                                                    </button>
                                                                    </Link>
                                                                    <button class="btn btn-sm btn-icon delete-record" onClick={() => handleDelete(item.id)}>
                                                                        <i class="bx bx-trash"></i>
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <div class="row mx-2"><div class="col-sm-12 col-md-6"><div class="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">Showing 1 to 10 of 50 entries</div></div><div class="col-sm-12 col-md-6"><div class="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate"><ul class="pagination"><li class="paginate_button page-item previous disabled" id="DataTables_Table_0_previous"><a aria-controls="DataTables_Table_0" aria-disabled="true" role="link" data-dt-idx="previous" tabindex="-1" class="page-link">Previous</a></li><li class="paginate_button page-item active"><a href="#" aria-controls="DataTables_Table_0" role="link" aria-current="page" data-dt-idx="0" tabindex="0" class="page-link">1</a></li><li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="1" tabindex="0" class="page-link">2</a></li><li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="2" tabindex="0" class="page-link">3</a></li><li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="3" tabindex="0" class="page-link">4</a></li><li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="4" tabindex="0" class="page-link">5</a></li><li class="paginate_button page-item next" id="DataTables_Table_0_next"><a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="next" tabindex="0" class="page-link">Next</a></li></ul></div></div></div></div>
                                    </div>

                                    <div className="offcanvas offcanvas-end w-50" tabIndex="-1" id="offcanvasAddUser" aria-labelledby="offcanvasAddUserLabel">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="offcanvas-header">
                                                    <h5 id="offcanvasAddUserLabel" className="offcanvas-title">Enquiry Information</h5>
                                                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                                </div>
                                            </div>
                                            <div className="offcanvas-body mx-0 flex-grow-0 row de-flex">
                                                <div className="col-md-4">
                                                    <p id="offcanvasAddUserLabel" className="offcanvas-title mb-2">Upload Via</p>
                                                </div>
                                                <div className="col-md-4 form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        onClick={() => toggleDropdown('email')}
                                                        name="flexRadioDefault"
                                                        id="flexRadioDefault1"
                                                        placeholder="Email"
                                                    />
                                                    <span>Email</span>
                                                </div>
                                                <div className="col-md-4 form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        onClick={() => toggleDropdown('mobile')}
                                                        name="flexRadioDefault"
                                                        id="flexRadioDefault1"
                                                        placeholder="Mobile"
                                                    />
                                                    <span>Mobile</span>
                                                </div>

                                                <div className="col-md-6 question-update-lead">
                                                    <div className={`slider ${sliderActive ? 'active' : ''}`}>
                                                        <div className="input-fields-container-lead mx-0 flex-grow-0">
                                                            <div className='row de-flex'>
                                                                <div className='lead col-md-12'>
                                                                    <p className="offcanvas-title-lead mt-4 mb-4">Add Input Fields</p>
                                                                </div>
                                                                <div className='lead col-md-12'><input
                                                                    type="text"
                                                                    className="form-control mb-3"
                                                                    placeholder="Search fields..."
                                                                    value={searchTerm}
                                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                                />
                                                                </div>
                                                                <div className="input-fields-container">
                                                                    <table className="table">
                                                                        <tbody>

                                                                            {filteredInputs.map(input => (
                                                                                <tr key={input.id} className='row de-flex'>
                                                                                    <td className="lead col-md-2">
                                                                                        <input type="checkbox" onClick={() => addInput(input.id)} checked={items.some(item => item.id === `input-${input.id}`)} />
                                                                                    </td>
                                                                                    <td className='lead col-md-10'>
                                                                                        <span>{input.label}</span>
                                                                                    </td>
                                                                                </tr>
                                                                            ))}

                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <form className="add-new-user pt-4" id="addNewUserForm" onSubmit={handleSubmit} noValidate>
                                                        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                                            <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
                                                                <ul className="list widget_dragable" id="dragItemBox">
                                                                    {items.map((item) => (
                                                                        <Draggable
                                                                            key={item.id}
                                                                            id={item.id}
                                                                            component={
                                                                                <li className="draggable_column_item">
                                                                                    {item.component}
                                                                                    <button type="button" className="remove_draggable" onClick={() => handleRemove(item.id)}>×</button>
                                                                                </li>
                                                                            }
                                                                        />
                                                                    ))}
                                                                </ul>
                                                            </SortableContext>
                                                        </DndContext>
                                                        <div className="mb-1 fv-plugins-icon-container">
                                                            <input
                                                                type="text"
                                                                className="form-control enquery-form"
                                                                id="add-user-fullname"
                                                                placeholder="Candidate Name*"
                                                                name="name"
                                                                onChange={(e) => handleChange(e, 'name')}

                                                            />
                                                            <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                        </div>
                                                        {isExpanded === 'mobile' && (
                                                            <div className="mb-1 fv-plugins-icon-container">
                                                                <input
                                                                    type="text"
                                                                    id="add-user-contact"
                                                                    className="form-control phone-mask enquery-form"
                                                                    placeholder="Candidate Mobile Number*"
                                                                    name="phoneNumber"
                                                                    onChange={(e) => handleChange(e, 'phoneNumber')}

                                                                />
                                                            </div>
                                                        )}
                                                        {isExpanded === 'email' && (
                                                            <div className="mb-1 fv-plugins-icon-container">
                                                                <input
                                                                    type="text"
                                                                    id="add-user-email"
                                                                    className="form-control enquery-form"
                                                                    placeholder="Candidate Email Id*"
                                                                    name="email"
                                                                    onChange={(e) => handleChange(e, 'email')}

                                                                />
                                                                <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                            </div>
                                                        )}
                                                        <div className="mb-3 fv-plugins-icon-container d-flex">
                                                            <button type="submit" className="btn btn-primary me-sm-3 me-1 data-submit">Submit</button>
                                                            <button type="reset" className="btn btn-label-secondary" data-bs-dismiss="offcanvas">Cancel</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*  <!-- Modal -->
                            <!-- Edit User Modal --> */}
                                <div class="modal fade" id="editUser" tabindex="-1" aria-hidden="true">
                                    <div class="modal-dialog modal-lg modal-simple modal-edit-user">
                                        <div class="modal-content p-3 p-md-5">
                                            <div class="modal-body">
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                <div class="text-center mb-4">
                                                    <h3>Edit User Information</h3>
                                                    <p>Updating user details will receive a privacy audit.</p>
                                                </div>
                                                <form id="editUserForm" class="row g-3 fv-plugins-bootstrap5 fv-plugins-framework" onSubmit={handleUpdate} novalidate="novalidate">
                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                        <label for="flatpickr-datetime" class="form-label">Date</label>
                                                        <input type="date" class="form-control" placeholder="YYYY-MM-DD HH:MM" id="flatpickr-datetime" name='date'
                                                            value={date} onChange={(e) => setDate(e.target.value)} />
                                                    </div>
                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                        <label class="form-label" for="modalEditUserFirstName">Full Name</label>
                                                        <input type="text" id="modalEditUserFirstName" name='name' class="form-control" placeholder="John"
                                                            value={name} onChange={(e) => setName(e.target.value)}
                                                        />
                                                        <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div></div>
                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                        <label class="form-label" for="modalEditUserLastName">Age</label>
                                                        <input type="text" id="modalEditUserLastName" name='age'
                                                            onChange={(e) => setAge(e.target.value)}
                                                            defaultValue={age} class="form-control" placeholder="Doe" />
                                                        <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div></div>
                                                    <div class="col-12 col-md-6">
                                                        <label class="form-label" for="modalEditUserPhone">Phone Number</label>
                                                        <div class="input-group input-group-merge">
                                                            <span class="input-group-text">+91</span>
                                                            <input type="text" id="modalEditUserPhone"
                                                                name='phoneNumber'
                                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                                                defaultValue={phoneNumber} class="form-control phone-number-mask" placeholder="202 555 0111" />
                                                        </div>
                                                    </div>
                                                    <div class="col-12 col-md-6">
                                                        <label class="form-label" for="modalEditUserEmail">Email</label>
                                                        <input type="text" id="modalEditUserEmail" name='email'
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            defaultValue={email} class="form-control" placeholder="example@domain.com" />
                                                    </div>
                                                    <div class="col-12 col-md-6">
                                                        <label class="form-label" for="modalEditUserEmail">Working Status</label>
                                                        <input type="text" id="modalEditUserEmail" name='workingStatus'
                                                            onChange={(e) => setWorkingStatus(e.target.value)}
                                                            defaultValue={workingStatus} class="form-control" placeholder="student" />
                                                    </div>
                                                    <div class="col-12 col-md-6">
                                                        <label class="form-label" for="modalEditTaxID">leadPlatform</label>
                                                        <input type="text" id="modalEditTaxID" name="leadPlatform" onChange={(e) => setLeadPlatform(e.target.value)}
                                                            defaultValue={leadPlatform} class="form-control modal-edit-tax-id" placeholder="Call" />
                                                    </div>

                                                    <div class="col-12 col-md-6">
                                                        <label class="form-label" for="modalEditTaxID">remark</label>
                                                        <input type="text" id="modalEditTaxID" name="remark" onChange={(e) => setRemark(e.target.value)}
                                                            defaultValue={remark} class="form-control modal-edit-tax-id" placeholder="remark" />
                                                    </div>


                                                    <div class="col-12 text-center">
                                                        <button type="submit" class="btn btn-primary me-sm-3 me-1">Update</button>
                                                        <button type="reset" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                                                    </div>
                                                    <input type="hidden" /></form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*  <!-- Footer --> */}

                            <Footer />

                            {/*      <!-- / Footer --> */}

                        </div>
                    </div >
                    {/*     <!-- Overlay --> */}
                    <div class="layout-overlay layout-menu-toggle"></div>
                </div >
                {/* / Layout wrapper  */}

            </div >

        </>
    )
}

export default SaleTeamUse