import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from './footerComponent';
import Navbar from './navComponemt';
import DashBoardMenus from './dashboardsMenuComponent';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FaLock, FaEnvelope, FaWhatsapp, FaGoogle, FaLinkedin, FaBriefcase, FaCircle } from 'react-icons/fa';
const { REACT_APP_API_ENDPOINT } = process.env;
function FrontUse() {
    const datatoken = localStorage.getItem('datatoken');
    const coursedatafetch = JSON.parse(datatoken)
    const [selectedItem, setSelectedItem] = useState([]);
    const [batch, setbatchs] = useState([])
    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [WhatsApp, setWhatsApp] = useState('');
    const [age, setAge] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [workingStatus, setWorkingStatus] = useState('');
    const [leadPlatform, setLeadPlatform] = useState('');
    const [date, setDate] = useState('');
    const [visitDate, setVisitDate] = useState('');
    const [status, setStatus] = useState('');
    const [gender, setGender] = useState('');
    const [Education, setEducation] = useState('');
    const [courseId, setCourseId] = useState('');
    const [batchId, setBatchId] = useState('');
    const [AddressType, setAddressType] = useState('');
    const [PostalCode, setPostalCode] = useState('');
    const [Address, setAddress] = useState('');
    const [City, setCity] = useState('');
    const [Area, setArea] = useState('');
    const [CountryId, setCountryId] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [StateId, setStateId] = useState('');
    const [selectedState, setSelectedState] = useState(null);
    const [DistrictId, setDistrictId] = useState('');
    const [remark, setRemark] = useState('');
    const [createdItems, setCreatedItems] = useState({});
    const [formVisible, setFormVisible] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [saleTeamData, setSaleTeamData] = useState([]);
    const [TelecallerCheckbox, setTelecallerCheckbox] = useState(false);
    const [coursesTable, setCoursesTable] = useState([]);
    const [countryTable, setCountryTable] = useState([]);
    const [lead_status, setleadstatus] = useState('');
    const [username, setusername] = useState('');

    useEffect(() => {
        const indiaOption = countryTable.find(option => option.name === "India");
        if (indiaOption) {
            setCountryId(indiaOption.id);
            setSelectedCountry(indiaOption);
        }
    }, [countryTable]);

    const handleCountryChange = (e) => {
        const selectedCountryId = parseInt(e.target.value);
        const selectedCountry = countryTable.find(country => country.id === selectedCountryId);
        setCountryId(selectedCountryId);
        setSelectedCountry(selectedCountry);
        setStateId('');
        setSelectedState(null);
        setDistrictId('');
    };

    const handleStateChange = (e) => {
        const selectedStateId = parseInt(e.target.value);
        const selectedState = selectedCountry?.Staties.find(state => state.id === selectedStateId);
        setStateId(selectedStateId);
        setSelectedState(selectedState);
        setDistrictId('');
    };






    useEffect(() => {
        fetchData();
        fetchData1();
        fetchData2()
        fetchData3()

    }, []);
    useEffect(() => {
        fetchData(page);
    }, [page]);

    const handleCheckboxChange = (e, item) => {
        const isChecked = e.target.checked;
        setCreatedItems(prevState => ({
            ...prevState,
            [item.id]: isChecked
        }));

        if (isChecked) {
            setSelectedItem(item);
            setName(item.name);
            setLastName(item.lastname);
            setAge(item.age);
            setPhoneNumber(item.phoneNumber);
            setEmail(item.email);
            setWorkingStatus(item.workingStatus);
            setLeadPlatform(item.leadPlatform);
            setStatus(item.status);
            setDate(item.date);
            setVisitDate(item.visitDate);
            setGender(item.gender);
            setEducation(item.Education);
            setCourseId(item.courseId);
            setBatchId(item.batchId);
            setWhatsApp(item.WhatsApp)
            setAddressType(item.Address && item.Address.AddressType);
            setPostalCode(item.Address && item.Address.PostalCode);
            setAddress(item.Address && item.Address.Address);
            setCity(item.Address && item.Address.City);
            setArea(item.Address && item.Address.Area);
            setCountryId(item.Address && item.Address.CountryId);
            setStateId(item.Address && item.Address.StateId);
            setDistrictId(item.Address && item.Address.DistrictId);
            setRemark(item.remark);
            setFormVisible(true);
        } else {
            setSelectedItem(null);
            setFormVisible(false);
        }
    };
    const fetchData = async (page = 1) => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/listsaleteam?page=${page}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const userData = response.data.saleteam.rows
                setSaleTeamData(userData);
                setTotalPages(response.data.saleteam.totalPage || 1); // Ensure totalPages has a default value
            }
        } catch (err) {
            console.log(err.response);
        }
    }
    const fetchData1 = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/courses`, {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                });
                const userData = response.data.courses;
                setCoursesTable(userData)
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
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/batches`, {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                });
                const userDatas = response.data.batchs;
                setbatchs(userDatas)
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = { name, WhatsApp, lastname, age, phoneNumber, email, workingStatus, leadPlatform, date, visitDate, status, gender, Education, courseId, batchId, AddressType, PostalCode, Address, City, Area, CountryId, StateId, DistrictId, remark };
            const token = localStorage.getItem('token');
            if (token) {
                await axios.post(`${REACT_APP_API_ENDPOINT}/addfrontdesk`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                alert("Enquiry Created Successfully");
                window.location.href = "/frontdesklist";
            }

            const promises = Object.entries(createdItems).map(([telecallerteamId, isChecked]) => {
                const updatedUserData = { TelecallerCheckbox: isChecked };
                return axios.patch(`${REACT_APP_API_ENDPOINT}/viewssaleteam/${telecallerteamId}`, updatedUserData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
            });

            await Promise.all(promises);
            fetchData();
            setCreatedItems({});
        } catch (error) {
            console.error(error);
            alert('Failed to send message.');
        }
    };
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };
    const isToday = (date) => {
        const today = new Date();
        return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
    };
    const leadIcon = (lead) => {
        if (isToday(new Date(lead.createdAt))) {
            return lead.TelecallerCheckbox ? (
                <i className="lead-li-icon fa-sharp fa-solid fa-circle-c" style={{ color: "green" }}></i>
            ) : (
                <i className="lead-li-icon fa-sharp fa-solid fa-circle-t" style={{ color: "#FF9800" }}></i>
            );
        } else {
            return lead.TelecallerCheckbox ? (
                <i className="lead-li-icon fa-sharp fa-solid fa-circle-c" style={{ color: "green" }}></i>
            ) : (
                <i className="lead-li-icon fa-sharp fa-solid fa-circle-o" style={{ color: "#007BFF" }}></i>
            );
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

                                <div class="card">
                                    <div class="card-header border-bottom custom_searchbar">
                                        <h5 class="card-title">Search Filter</h5>
                                        <div class="d-flex justify-content-between align-items-center row  gap-3 gap-md-0 cus_srchbox">
                                            <div class="col-md-4 user_roleu"><select id="UserRole" class="form-select text-capitalize"><option value=""> Select Role </option><option value="Admin">Admin</option><option value="Author">Author</option><option value="Editor">Editor</option><option value="Maintainer">Maintainer</option><option value="Subscriber">Subscriber</option></select></div>
                                            <div class="col-md-4 user_plan"><select id="UserPlan" class="form-select text-capitalize"><option value=""> Select Plan </option><option value="Basic">Basic</option><option value="Company">Company</option><option value="Enterprise">Enterprise</option><option value="Team">Team</option></select></div>
                                            <div class="col-md-4 user_status"><select id="FilterTransaction" class="form-select text-capitalize"><option value=""> Select Status </option><option value="Pending" class="text-capitalize">Pending</option><option value="Active" class="text-capitalize">Active</option><option value="Inactive" class="text-capitalize">Inactive</option></select></div>
                                        </div>
                                    </div>
                                    <div class="card-datatable table-responsive">
                                        <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer">
                                            <div class="row mx-2">
                                                <div class="col-md-2">
                                                    <div class="me-3 mt--5">
                                                        <div class="dataTables_length" id="DataTables_Table_0_length">
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
                                                <div class="col-md-10">
                                                    <div class="dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex 
                                                            align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0"  >
                                                        <div id="DataTables_Table_0_filter" class="dataTables_filter"><label>
                                                            <input type="search" class="form-control" placeholder="Search.." aria-controls="DataTables_Table_0" /></label>
                                                        </div>
                                                        <div class="btn-group d-flex flex-row">
                                                            <button class="btn buttons-collection dropdown-toggle btn-label-secondary mx-3 d-flex"
                                                                tabindex="0" aria-controls="DataTables_Table_0" type="button" aria-haspopup="dialog"
                                                                aria-expanded="false">
                                                                <span><i class="bx bx-export me-1"></i>Export</span>
                                                            </button>

                                                            {/*    <button class="btn btn-secondary add-new btn-primary d-flex cus_Add" tabindex="0" aria-controls="DataTables_Table_0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasAddUser">

                                                                <span><i class="bx bx-plus me-0 me-sm-1"></i>Lead</span>
                                                            </button> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <table class="datatables-users table border-top dataTable no-footer dtr-column" id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info" width="1390px;">
                                                <thead>
                                                    <tr>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="100px;" aria-label="User: activate to sort column ascending" aria-sort="descending">S.NO</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="100px;" aria-label="User: activate to sort column ascending" aria-sort="descending">lead</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="40px;" aria-label="User: activate to sort column ascending" aria-sort="descending">✔</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="250px;" aria-label="Role: activate to sort column ascending">Full Name</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="250px;" aria-label="Role: activate to sort column ascending">Assign to Users</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="250px;" aria-label="Plan: activate to sort column ascending">Contact </th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="250px;" aria-label="Billing: activate to sort column ascending">Email</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="Status: activate to sort column ascending">Specialisation</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="100px;" aria-label="Status: activate to sort column ascending">Platform</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {saleTeamData.map((item, index) => (
                                                        <tr key={item.id}>
                                                            <td>{(page - 1) * 10 + index + 1}</td>
                                                            <td>
                                                                {leadIcon(item)}
                                                            </td>
                                                            {coursedatafetch && coursedatafetch.Role && item.User && item.User.Role && coursedatafetch.Role.Name === item.User.Role.Name ? (
                                                                <td>
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={createdItems[item.id] !== undefined ? createdItems[item.id] : item.TelecallerCheckbox}
                                                                        onChange={(e) => handleCheckboxChange(e, item)}
                                                                        disabled={item.TelecallerCheckbox} // Checkbox is disabled if item.TelecallerCheckbox is true
                                                                        data-bs-toggle="offcanvas"
                                                                        data-bs-target="#editTeam"
                                                                    />
                                                                </td>
                                                            ) : (
                                                                <td>
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={item.TelecallerCheckbox} // Reflect the checkbox state for other users
                                                                        disabled // Always disabled for other users
                                                                        data-bs-toggle="offcanvas"
                                                                        data-bs-target="#editTeam"
                                                                    />
                                                                </td>
                                                            )}


                                                            <td>
                                                                <i class="fa-solid fa-user me-2"></i> <span>{item.name}</span>
                                                            </td>
                                                            <td>{item && item.User && item.User.Role && item.User.Role.Name}</td>
                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    <a href={`https://web.whatsapp.com/send?phone=+919893688878&text=Hello`} target="_blank" rel="noopener noreferrer">
                                                                        <FaWhatsapp className="lead-li-icon me-2" color="#25D366" />
                                                                        <span>{item.WhatsApp}</span>
                                                                    </a>,
                                                                    <a href={`tel:${item.phoneNumber}`}>
                                                                        <span>{item.phoneNumber}</span>
                                                                    </a>
                                                                </div>
                                                            </td>
                                                            <td><i class="fa-solid fa-envelope me-2  fw-bold"></i><span>{item.email}</span></td>
                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    <i className="bx bx-briefcase me-2"></i>
                                                                    <span>{item.workingStatus}</span>
                                                                </div>
                                                            </td>

                                                            <td>
                                                                <div className="align-items-center">
                                                                    {item.leadPlatform == "Google" ? (
                                                                        <a href={`https://www.google.com/search?q=${item.leadPlatform}`} target="_blank" rel="noopener noreferrer">
                                                                            <FaGoogle color="#4285F4" /> {/* Google icon */}
                                                                        </a>
                                                                    ) : item.leadPlatform == "LinkedIn" ? (
                                                                        <a href={`https://www.linkedin.com/search/results/all/?keywords=${item.leadPlatform}`} target="_blank" rel="noopener noreferrer">
                                                                            <FaLinkedin color="#0077B5" /> {/* LinkedIn icon */}
                                                                        </a>
                                                                    ) : item.leadPlatform == "Indeed" ? (
                                                                        <a href={`https://www.indeed.com/q-${item.leadPlatform}-jobs.html`} target="_blank" rel="noopener noreferrer">
                                                                            <i class="fa-sharp fa-solid fa-info" style={{ color: "#2557a7" }}></i>
                                                                            {/*   <FaBriefcase className="me-2" color="#FAFAFA" /> {/* Indeed icon */}
                                                                        </a>
                                                                    ) : (<i className="bx bx-briefcase"></i>)

                                                                    }
                                                                </div>
                                                            </td>


                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <div className="row mx-2 pt--20">
                                                <div className="col-sm-12 col-md-12">
                                                    <div className="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">
                                                        Showing {((page - 1) * 10) + 1} to {Math.min(page * 10, totalPages * 10)} of {totalPages * 10} entries
                                                    </div>
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

                                            {/* Offcanvas Component */}
                                            <div
                                                className="offcanvas offcanvas-end w-50"
                                                tabIndex="-1"
                                                id="editTeam"
                                                aria-labelledby="offcanvasExampleLabel"
                                                style={{ display: formVisible ? 'block' : 'none' }}
                                            >

                                                <div className="col-md-12">
                                                    <div className="offcanvas-header cus_headerr">
                                                        <h5 id="offcanvasAddUserLabel" className="offcanvas-title"><i class="bx bx-user bx-sm"></i> Enquiry Information</h5>
                                                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => setFormVisible(false)}></button>
                                                    </div>
                                                </div>

                                                <div className="flex-grow-0 ">
                                                    <div className='col-12 col-xl-12 col-lg-12 col-md-12'>
                                                        <div className='header_choos_details'>
                                                            <form onSubmit={handleSubmit} style={{ backgroundColor: '#fff', paddingLeft: '20px',paddingRight: '20px' }}>
                                                                <div className="row">
                                                                    <div className='card' style={{ boxShadow: " 0 2px 6px 0 rgb(255 255 255 / 0%)", backgroundColor: '#rgb(255 255 255 / 16%)', border: '1px solid rgb(231 181 174)', padding: '20px', borderRadius: '8px' }}>
                                                                        <div className="row">
                                                                            <div className="col-md-4 mb-3">
                                                                                <label htmlFor="edit-name">Frist Name</label>
                                                                                <input
                                                                                    id="edit-name"
                                                                                    type="text"
                                                                                    value={name}
                                                                                    onChange={e => setName(e.target.value)}
                                                                                    className="form-control"
                                                                                    placeholder="Please Enter Your Frist Name"
                                                                                />
                                                                            </div>

                                                                            <div className="col-md-4 mb-3">
                                                                                <label htmlFor="edit-lastname">Last Name</label>
                                                                                <input
                                                                                    id="edit-lastname"
                                                                                    type="text"
                                                                                    value={lastname}
                                                                                    onChange={e => setLastName(e.target.value)}
                                                                                    className="form-control"
                                                                                    placeholder="Please Enter Your Last Name"
                                                                                />
                                                                            </div>

                                                                            <div className="col-md-4 mb-3">
                                                                                <label htmlFor="edit-age">Age</label>
                                                                                <input
                                                                                    id="edit-age"
                                                                                    type="number"
                                                                                    value={age}
                                                                                    onChange={e => setAge(e.target.value)}
                                                                                    className="form-control"
                                                                                    placeholder="Please Enter Your Age"
                                                                                />
                                                                            </div>

                                                                            <div className="col-md-4 mb-3">
                                                                                <label htmlFor="edit-phone">Contact Number</label>
                                                                                <input
                                                                                    id="edit-phone"
                                                                                    type="text"
                                                                                    value={phoneNumber}
                                                                                    onChange={e => setPhoneNumber(e.target.value)}
                                                                                    className="form-control"
                                                                                    placeholder="Please Enter Your Contact Number"
                                                                                />
                                                                            </div>
                                                                            <div className="col-md-4 mb-3">
                                                                                <label htmlFor="edit-phone">WhatsApp Number</label>
                                                                                <input
                                                                                    id="edit-phone"
                                                                                    type="text"
                                                                                    value={WhatsApp}
                                                                                    onChange={e => setWhatsApp(e.target.value)}
                                                                                    className="form-control"
                                                                                    placeholder="Please Enter Your WhatsApp Number"
                                                                                />
                                                                            </div>

                                                                            <div className="col-md-4 mb-3">
                                                                                <label htmlFor="edit-email">Email</label>
                                                                                <input
                                                                                    id="edit-email"
                                                                                    type="email"
                                                                                    value={email}
                                                                                    onChange={e => setEmail(e.target.value)}
                                                                                    className="form-control"
                                                                                    placeholder="Please Enter Your Email"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className='card' style={{ boxShadow: " 0 2px 6px 0 rgb(255 255 255 / 0%)", backgroundColor: '#rgb(255 255 255 / 16%)', border: '1px solid rgb(231 181 174)', padding: '20px', borderRadius: '8px', marginTop: "16px" }}>
                                                                        <div className="row">
                                                                            <div className="col-md-4 mb-3">
                                                                                <label htmlFor="edit-working-status">Select Specialization</label>
                                                                                <select
                                                                                    id="edit-working-status"
                                                                                    value={workingStatus}
                                                                                    onChange={e => setWorkingStatus(e.target.value)}
                                                                                    className="form-control"
                                                                                >
                                                                                    <option value="">Select Specialization</option>
                                                                                    <option value="Employee">Employee</option>
                                                                                    <option value="Student">Student</option>
                                                                                    <option value="Entrepreneur">Entrepreneur</option>
                                                                                </select>
                                                                            </div>

                                                                            <div className="col-md-4 mb-3">
                                                                                <label htmlFor="edit-lead-platform">Lead Platform</label>
                                                                                <select
                                                                                    id="edit-lead-platform"
                                                                                    value={leadPlatform}
                                                                                    onChange={e => setLeadPlatform(e.target.value)}
                                                                                    className="form-control"
                                                                                >
                                                                                    <option value="">Select Lead Platform</option>
                                                                                    <option value="Google">Google</option>
                                                                                    <option value="LinkedIn">LinkedIn</option>
                                                                                    <option value="Indeed">Indeed</option>
                                                                                    <option value="Directly">Directly</option>
                                                                                </select>
                                                                            </div>

                                                                            <div className="col-md-4 mb-3">
                                                                                <label htmlFor="flatpickr-datetime">Enquiry Date</label>
                                                                                <input
                                                                                    id="flatpickr-datetime"
                                                                                    type="date"
                                                                                    value={visitDate}
                                                                                    onChange={e => setVisitDate(e.target.value)}
                                                                                    className="form-control"
                                                                                />
                                                                            </div>

                                                                            <div className="col-md-4 mb-3">
                                                                                <label htmlFor="flatpickr-datetime-next">Next Meeting Date</label>
                                                                                <input
                                                                                    id="flatpickr-datetime-next"
                                                                                    type="date"
                                                                                    value={date}
                                                                                    onChange={e => setDate(e.target.value)}
                                                                                    className="form-control"
                                                                                />
                                                                            </div>

                                                                            <div className="col-md-4 mb-3">
                                                                                <label htmlFor="exampleFormControlSelect2-status">Status</label>
                                                                                <select
                                                                                    id="exampleFormControlSelect2-status"
                                                                                    value={status}
                                                                                    onChange={e => setStatus(e.target.value)}
                                                                                    className="form-control"
                                                                                >
                                                                                    <option value="">Select Status</option>
                                                                                    <option value="1st Call">1st Call</option>
                                                                                    <option value="2nd Call">2nd Call</option>
                                                                                    <option value="3rd Call">3rd Call</option>
                                                                                    <option value="4th Call">4th Call</option>
                                                                                    <option value="Not Responding (N/R)">Not Responding (N/R)</option>
                                                                                    <option value="Other">Other</option>
                                                                                </select>
                                                                            </div>

                                                                            <div className="col-md-4 mb-3">
                                                                                <label htmlFor="exampleFormControlSelect2-gender">Gender</label>
                                                                                <select
                                                                                    id="exampleFormControlSelect2-gender"
                                                                                    value={gender}
                                                                                    onChange={e => setGender(e.target.value)}
                                                                                    className="form-control"
                                                                                >
                                                                                    <option value="">Select Gender</option>
                                                                                    <option value="Female">Female</option>
                                                                                    <option value="Male">Male</option>
                                                                                    <option value="Other">Other</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className='card' style={{ boxShadow: " 0 2px 6px 0 rgb(255 255 255 / 0%)", backgroundColor: '#rgb(255 255 255 / 16%)', border: '1px solid rgb(231 181 174)', padding: '20px', borderRadius: '8px', marginTop: "16px" }}>
                                                                        <div className="row">
                                                                            <div className="col-md-4 mb-3">
                                                                                <label htmlFor="exampleFormControlSelect2-education">Education</label>
                                                                                <select
                                                                                    id="exampleFormControlSelect2-education"
                                                                                    value={Education}
                                                                                    onChange={e => setEducation(e.target.value)}
                                                                                    className="form-control"
                                                                                >
                                                                                    <option value="">Select Education</option>
                                                                                    <option value="School">School</option>
                                                                                    <option value="Graduation">Graduation</option>
                                                                                    <option value="Master">Master</option>
                                                                                    <option value="Any other Skill">Any other Skill</option>
                                                                                    <option value="Other">Other</option>
                                                                                </select>
                                                                            </div>

                                                                            <div className="col-md-4 mb-3">
                                                                                <label htmlFor="exampleFormControlSelect2-courses">Courses</label>
                                                                                <select
                                                                                    id="exampleFormControlSelect2-courses"
                                                                                    value={courseId}
                                                                                    onChange={e => setCourseId(e.target.value)}
                                                                                    className="form-control"
                                                                                >
                                                                                    <option value="">Select Courses</option>
                                                                                    {coursesTable.map(course => (
                                                                                        <option key={course.id} value={course.id}>
                                                                                            {course.name}
                                                                                        </option>
                                                                                    ))}
                                                                                </select>
                                                                            </div>

                                                                            <div className="col-md-4 mb-3">
                                                                                <label htmlFor="exampleFormControlSelect2-webinar-topic">Webinar Topic</label>
                                                                                <select
                                                                                    id="exampleFormControlSelect2-webinar-topic"
                                                                                    value={batchId}
                                                                                    onChange={e => setBatchId(e.target.value)}
                                                                                    className="form-control"
                                                                                >
                                                                                    <option value="">Select Webinar Topic</option>
                                                                                    {batch.map(b => (
                                                                                        <option key={b.id} value={b.id}>
                                                                                            {b.Title}
                                                                                        </option>
                                                                                    ))}
                                                                                </select>
                                                                            </div>

                                                                            <div className="col-md-4 mb-3">
                                                                                <label htmlFor="add-user-address">Address</label>
                                                                                <input
                                                                                    id="add-user-address"
                                                                                    type="text"
                                                                                    value={Address}
                                                                                    onChange={e => setAddress(e.target.value)}
                                                                                    className="form-control"
                                                                                    placeholder="Please Enter Address"
                                                                                />
                                                                            </div>

                                                                            <div className="col-md-4 mb-3" style={{ display: 'none' }}>
                                                                                <label htmlFor="exampleFormControlSelect2-country">Country</label>
                                                                                <select
                                                                                    id="exampleFormControlSelect2-country"
                                                                                    value={CountryId}
                                                                                    onChange={handleCountryChange}
                                                                                    className="form-control"
                                                                                >
                                                                                    <option value="">Select Country</option>
                                                                                    {countryTable
                                                                                        .filter(option => option.name === 'India')
                                                                                        .map(country => (
                                                                                            <option key={country.id} value={country.id}>
                                                                                                {country.name}
                                                                                            </option>
                                                                                        ))}
                                                                                </select>
                                                                            </div>

                                                                            <div className="col-md-4 mb-3">
                                                                                <label htmlFor="exampleFormControlSelect2-state">State</label>
                                                                                <select
                                                                                    id="exampleFormControlSelect2-state"
                                                                                    value={StateId}
                                                                                    onChange={handleStateChange}
                                                                                    className="form-control"
                                                                                >
                                                                                    <option value="">Select State</option>
                                                                                    {selectedCountry?.Staties.map(state => (
                                                                                        <option key={state.id} value={state.id}>
                                                                                            {state.name}
                                                                                        </option>
                                                                                    ))}
                                                                                </select>
                                                                            </div>
                                                                            <div className="col-md-4 mb-3">
                                                                                <label htmlFor="exampleFormControlSelect2-district">City</label>
                                                                                <select
                                                                                    id="exampleFormControlSelect2-district"
                                                                                    value={DistrictId}
                                                                                    onChange={e => setDistrictId(e.target.value)}
                                                                                    className="form-control"
                                                                                >
                                                                                    <option value="">Select City</option>
                                                                                    {selectedState?.Cities.map(city => (
                                                                                        <option key={city.id} value={city.id}>
                                                                                            {city.name}
                                                                                        </option>
                                                                                    ))}
                                                                                </select>
                                                                            </div>
                                                                            <div className="col-md-4 mb-2">
                                                                                <label htmlFor="add-user-postalcode">Address Type</label>
                                                                                <select id="exampleFormControlSelect2" class="select2 form-select enquery-form" name='AddressType' value={AddressType} onChange={e => setAddressType(e.target.value)}>
                                                                                    <option value="">Select Address Type</option>
                                                                                    <option value="Current Address">Current Address</option>
                                                                                    <option value="Permanent Address">Permanent Address</option>
                                                                                    <option value="Residential Address">Residential Address</option>
                                                                                </select>
                                                                            </div>
                                                                            <div className="col-md-4 mb-2">
                                                                                <label htmlFor="add-user-postalcode">Postal Code</label>
                                                                                <input
                                                                                    id="add-user-postalcode"
                                                                                    type="text"
                                                                                    value={PostalCode}
                                                                                    onChange={e => setPostalCode(e.target.value)}
                                                                                    className="form-control"
                                                                                    placeholder="Please Enter Postal Code"
                                                                                />
                                                                            </div>





                                                                            <div className="col-md-12 mb-1">
                                                                                <label htmlFor="add-user-remark">Remark</label>
                                                                                <input
                                                                                    id="add-user-remark"
                                                                                    type="text"
                                                                                    value={remark}
                                                                                    onChange={e => setRemark(e.target.value)}
                                                                                    className="form-control"

                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                                <div className='rows'>
                                                                    <div className="mt-3 fv-plugins-icon-container d-flex">
                                                                        <div className='col-md-6'>
                                                                            <button type="submit" className="btn btn-primary me-sm-3 me-1 data-submit">Submit</button>
                                                                        </div>
                                                                        <div className='col-md-6'>
                                                                            <button type="reset" className="btn btn-label-secondary" data-bs-dismiss="offcanvas">Cancel</button>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div >
                                    </div >


                                </div >



                            </div >
                            {/*  <!-- Footer --> */}

                            < Footer />

                            {/*      <!-- / Footer --> */}

                        </div >
                    </div >
                    {/*     <!-- Overlay --> */}
                    < div class="layout-overlay layout-menu-toggle" ></div >
                </div >
                {/* / Layout wrapper  */}

            </div >

        </>
    )
}

export default FrontUse