import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from './footerComponent';
import Navbar from './navComponemt';
import DashBoardMenus from './dashboardsMenuComponent';
import { FaLock, FaEnvelope, FaWhatsapp, FaGoogle, FaLinkedin, FaBriefcase, FaCircle } from 'react-icons/fa'; // Import necessary icons
import { useNavigate, useParams, Link } from 'react-router-dom';
const { REACT_APP_API_ENDPOINT } = process.env;
function FrontListUse() {
    const datatoken = localStorage.getItem('datatoken');
    const coursedatafetch = JSON.parse(datatoken)
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // Track total pages for pagination
    const [table, setTable] = useState([]);
    const [remark, setRemark] = useState('')
    const [gender, setGender] = useState('');
    const [Education, setEducation] = useState('')
    const [coursesId, setCoursesId] = useState('')
    const [AddressType, setAddressType] = useState('')
    const [PostalCode, setPostalCode] = useState('')
    const [Address, setAddress] = useState('')
    const [City, setCity] = useState('')
    const [DistrictId, setDistrictId] = useState('')
    const [StateId, setStateId] = useState('')
    const [CountryId, setCountryId] = useState('')
    const [CounselingDepartmentAllotted, setCounselingDepartmentAllotted] = useState('')
    const [CounselorName, setCounselorName] = useState('')
    const [CounselorRoomNo, setCounselorRoomNo] = useState('')
    const [Area, setArea] = useState('')
    const [userData, setUserData] = useState({});
    const [coursesTable, setCoursesTable] = useState([]);
    const [countryTable, setCountryTable] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const { frontdeskId } = useParams();
    useEffect(() => {
        fetchData();
        fetchData2();
        fetchData3()

    }, []);

    useEffect(() => {
        fetchData1(frontdeskId);
    }, [frontdeskId]);




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

    const fetchData = async (page = 1) => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/listfrontdesk?page=${page}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTable(response.data.frontdesk.rows);
                setTotalPages(response.data.frontdesk.totalPage || 1); // Ensure totalPages has a default value
            }
        } catch (err) {
            console.log(err.response);
        }
    }
    const fetchData1 = async (frontdeskId) => {
        try {
            if (!frontdeskId) {
                console.log("frontdeskId is undefined");
                return;
            }
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/listfrontdesk/${frontdeskId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const userData = response.data.frontdesk;
                setUserData(userData)
                setGender(userData.gender)
                setEducation(userData.Education);
                setCoursesId(userData.coursesId);
                setAddressType(userData.Address.AddressType);
                setPostalCode(userData.Address.PostalCode);
                setAddress(userData.Address.Address);
                setCity(userData.Address.City);
                setArea(userData.Address.Area);
                setDistrictId(userData.Address.DistrictId);
                setStateId(userData.Address.StateId);
                setCountryId(userData.Address.CountryId);
                setCounselingDepartmentAllotted(userData.CounselingDepartmentAllotted);
                setCounselorName(userData.CounselorName);
                setCounselorRoomNo(userData.CounselorRoomNo);
                setRemark(userData.remark)

            }
        } catch (err) {
            console.log(err.response);
        }
    }

    const fetchData2 = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/listcourses`, {
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

    const fetchData3 = async () => {
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

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const updatedUserData = { remark, gender, Education, coursesId, AddressType, PostalCode, Address, DistrictId, City, StateId, CountryId, Area, CounselingDepartmentAllotted, CounselorName, CounselorRoomNo };
            const token = localStorage.getItem('token');

            if (token) {
                await axios.patch(`${REACT_APP_API_ENDPOINT}/viewsfrontdesk/${frontdeskId}`, updatedUserData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                fetchData(frontdeskId);
                alert("updated successfully!");
            }
        } catch (error) {
            console.error('Error updating:', error);
            alert('An error occurred while updating');
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

                                                            <button class="btn btn-secondary add-new btn-primary d-flex cus_Add" tabindex="0" aria-controls="DataTables_Table_0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasAddUser">

                                                                <span><i class="bx bx-plus me-0 me-sm-1"></i>Lead</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <table class="datatables-users table border-top dataTable no-footer dtr-column" id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info" width="1390px;">
                                                <thead>
                                                    <tr>
                                                    <th scope="col">Enquiry Id</th>
                                                        <th scope="col">Update Lead</th>
                                                      
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Email</th>
                                                        <th scope="col">Assign to User</th>
                                                        <th scope="col">Visiting Date</th>
                                                        <th scope="col">Contact</th>
                                                        <th scope="col">Platform</th>
                                                        <th scope="col">Edit</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {table.map((lead) => (
                                                        <tr key={lead.id}>
                                                            <td><i class="fa-solid fa-id-badge me-1" style={{ color: "#f01010e7" }}></i><span>{lead.enquiryId}</span></td>

                                                            <td>
                                                                {leadIcon(lead)}
                                                            </td>

                                                            <td>
                                                                <i class="fa-solid fa-user me-2"></i><span>{lead.name}</span>
                                                            </td>
                                                            <td>
                                                                <a
                                                                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(lead.email)}&su=${encodeURIComponent('Inquiry from Technogaze')}&body=${encodeURIComponent('Hello,I am reaching out from Technogaze regarding...')}`}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                >
                                                                    <i className="fa-solid fa-envelope me-2"></i>
                                                                    <span>{lead.email}</span>
                                                                </a>
                                                            </td>
                                                            <td>{lead.User && lead.User.Role && lead.User.Role.Name}</td>
                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    <i className="bx bx-calendar me-2"></i>
                                                                    <span className="">{lead.visitDate}</span>
                                                                </div>
                                                            </td>

                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    <a href={`https://web.whatsapp.com/send?phone=+919893688878&text=Hello`} target="_blank" rel="noopener noreferrer">
                                                                        <FaWhatsapp className="lead-li-icon me-2" color="#25D366" />
                                                                        <span>{lead.WhatsApp}</span>
                                                                    </a>,
                                                                    <a href={`tel:${lead.phoneNumber}`}>
                                                                        <span>{lead.phoneNumber}</span>
                                                                    </a>
                                                                </div>                                                </td>
                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    {lead.leadPlatform == "Google" ? (
                                                                        <a href={`https://www.google.com/search?q=${lead.leadPlatform}`} target="_blank" rel="noopener noreferrer">
                                                                            <FaGoogle className="me-1" color="#4285F4" /> {/* Google icon */}
                                                                        </a>
                                                                    ) : lead.leadPlatform == "LinkedIn" ? (
                                                                        <a href={`https://www.linkedin.com/search/results/all/?keywords=${lead.leadPlatform}`} target="_blank" rel="noopener noreferrer">
                                                                            <FaLinkedin className="me-1" color="#0077B5" /> {/* LinkedIn icon */}
                                                                        </a>
                                                                    ) : lead.leadPlatform == "Indeed" ? (
                                                                        <a href={`https://www.indeed.com/q-${lead.leadPlatform}-jobs.html`} target="_blank" rel="noopener noreferrer">
                                                                            <i class="fa-sharp fa-solid fa-info" style={{ color: "#2557a7" }}></i>
                                                                            {/*   <FaBriefcase className="me-2" color="#FAFAFA" /> {/* Indeed icon */}
                                                                        </a>
                                                                    ) : (<i className="bx bx-briefcase me-1"></i>)

                                                                    }

                                                                   

                                                                </div>
                                                            </td>
                                                            <td><div classNmae="d-inline-block text-nowrap">
                                                                <Link to={`/addsaleteam/${lead.id}`} className="pr--5" >
                                                                    <button class="btn btn-sm btn-icon edit_sales" data-bs-target="#editUser" data-bs-toggle="modal">
                                                                        <i class="bx bx-edit"></i>

                                                                    </button>
                                                                </Link>

                                                            </div></td>

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

export default FrontListUse