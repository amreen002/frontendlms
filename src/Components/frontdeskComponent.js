import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from './footerComponent';
import Navbar from './navComponemt';
import DashBoardMenus from './dashboardsMenuComponent';
import { useNavigate, useParams, Link } from 'react-router-dom';
const { REACT_APP_API_ENDPOINT } = process.env;
function FrontUse() {


    const [selectedItem, setSelectedItem] = useState([]);
    const [date, setDate] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [workingStatus, setWorkingStatus] = useState('');
    const [remark, setRemark] = useState('')
    const [visitDate, setVisitDate] = useState('')
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
    const [roleId, setRoleId] = useState('')

    const navigate = useNavigate();


    const [searchTerm, setSearchTerm] = useState('');
    const [saleTeamData, setSaleTeamData] = useState([]);
    const [TelecallerCheckbox, setTelecallerCheckbox] = useState(false);
    const [createdItems, setCreatedItems] = useState({});
    const [coursesTable, setCoursesTable] = useState([]);
    const [countryTable, setCountryTable] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
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

    useEffect(() => {
        fetchData();
        fetchData1();
        fetchData2()

    }, []);


    const handleCheckboxChange = (e, item) => {
        const isChecked = e.target.checked;
        setCreatedItems(prevState => ({
            ...prevState,
            [item.id]: isChecked
        }));
        if (e.target.checked) {
            setSelectedItem(item);
            setDate(item.date)
            setName(item.name);
            setAge(item.age);
            setPhoneNumber(item.phoneNumber);
            setEmail(item.email);
            setWorkingStatus(item.workingStatus);
            setRemark(item.remark);
            setVisitDate(item.visitDate);
            setRoleId(item.roleId)
            setTelecallerCheckbox(e.target.checked);
        } else {
            setSelectedItem(null); // Unselect if unchecked
            setDate('')
            setName('');
            setAge('');
            setPhoneNumber('');
            setEmail('');
            setWorkingStatus('');
            setRemark('');
            setVisitDate('');
            setRoleId('')
        }
    };

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/listtelecallerteam`, {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                });
                const userData = response.data.telecallerdepartment;
                setSaleTeamData(userData)
                setDate(userData.date)
                setName(userData.name);
                setPhoneNumber(userData.phoneNumber);
                setEmail(userData.email);
                setAge(userData.age);
                setWorkingStatus(userData.workingStatus);
                setRemark(userData.remark);
                setVisitDate(userData.visitDate);
                setRoleId(userData.roleId)
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




    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let formData = { name, workingStatus, phoneNumber, email, age, date, remark, visitDate, roleId, gender, Education, coursesId, AddressType, PostalCode, Address, DistrictId, City, StateId, CountryId, Area, CounselingDepartmentAllotted, CounselorName, CounselorRoomNo }
            const token = localStorage.getItem('token');
            if (token) {
                await axios.post(`${REACT_APP_API_ENDPOINT}/addfrontdesk`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                });
               
                alert("Enquiry Created SuccessFully");
                window.location.href = "/frontdesk"
            }


            const promises = Object.entries(createdItems).map(([telecallerteamId, isChecked]) => {
                const updatedUserData = { TelecallerCheckbox: isChecked };
                return axios.patch(`${REACT_APP_API_ENDPOINT}/updatetelecallerteam/${telecallerteamId}`, updatedUserData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
            });

            await Promise.all(promises);
            fetchData1();
            // Clear local changes after successful update
            setCreatedItems({});
        } catch (error) {
            console.log(error)
            alert('Failed to send message.');
        }
    }

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

                                            <input
                                                class="form-control" placeholder="Search.." aria-controls="DataTables_Table_0"
                                                type="search"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}

                                            />
                                        </label></div><div class="dt-buttons btn-group flex-wrap"> <div class="btn-group"><button class="btn buttons-collection dropdown-toggle btn-label-secondary mx-3" tabindex="0" aria-controls="DataTables_Table_0" type="button" aria-haspopup="dialog" aria-expanded="false"><span><i class="bx bx-export me-1"></i>Export</span></button></div><i class="bx bx-plus me-0 me-sm-1"></i> </div></div></div></div><table class="datatables-users table border-top dataTable no-footer dtr-column" id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info" width="1390px;">
                                                <thead>
                                                    <tr>
                                                        <th class="sorting sorting_desc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="115px;" aria-label="User: activate to sort column ascending" aria-sort="descending">S.NO</th>
                                                        <th class="control sorting_disabled dtr-hidden" rowspan="1" colspan="1" width="100px;" aria-label="">Enquery Forword</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="Role: activate to sort column ascending">LEADS DATE</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="250px;" aria-label="Role: activate to sort column ascending">FULL NAME</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="Role: activate to sort column ascending">AGE</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="Plan: activate to sort column ascending">MOBILE NO </th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="Billing: activate to sort column ascending">EMAIL</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="Billing: activate to sort column ascending">WORKING STATUS</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="250px;" aria-label="Billing: activate to sort column ascending">TELECALLER PERSON NAME</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="Billing: activate to sort column ascending">VISITING DATE</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="Billing: activate to sort column ascending">REMARKS</th>
                                                        <th class="sorting_disabled" rowspan="1" colspan="1" width="110px;" aria-label="Actions">Other Enquery</th>

                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {saleTeamData.map((item) => (
                                                        <tr key={item.id}>
                                                            <td>{item.id}</td>
                                                            <td class="sorting_1" >
                                                                <input
                                                                    type="checkbox"
                                                                    checked={createdItems[item.id] !== undefined ? createdItems[item.id] : item.TelecallerCheckbox}
                                                                    onChange={(e) => handleCheckboxChange(e, item)}
                                                                    disabled={item.TelecallerCheckbox ? true : false}


                                                                />

                                                            </td>
                                                            <td>{selectedItem && selectedItem.id === item.id ? (<div class="mb-3 mt-3 fv-plugins-icon-container">
                                                                <input type="text" className="form-control flatpickr-input" placeholder="YYYY-MM-DD HH:MM" id="flatpickr-datetime" disabled="false" name='date'
                                                                    value={date} onChange={(e) => setDate(e.target.value)} />
                                                            </div>) : (
                                                                <span>{item && item.date}</span>
                                                            )}</td>
                                                            <td>
                                                                {selectedItem && selectedItem.id === item.id ? (<div class="mb-3 mt-3 fv-plugins-icon-container">
                                                                    <input type="text" className="form-control flatpickr-input" id="add-user-fullname" disabled="false" placeholder="John Doe" name='name' value={name}
                                                                        onChange={(e) => setName(e.target.value)} />
                                                                </div>) : (
                                                                    <span>{item && item.name}</span>
                                                                )}
                                                            </td>
                                                            <td> {selectedItem && selectedItem.id === item.id ? (<div class="mb-3 mt-3 fv-plugins-icon-container">
                                                                <input type="number" className="form-control flatpickr-input" id="add-user-fullname" disabled="false" placeholder="John Doe" name='age'
                                                                    value={age}
                                                                    onChange={(e) => setAge(e.target.value)} />
                                                            </div>) : (
                                                                <span>{item && item.age}</span>
                                                            )}
                                                            </td>
                                                            <td> {selectedItem && selectedItem.id === item.id ? (<div class="mb-3 mt-3 fv-plugins-icon-container"><input type="text" id="add-user-contact" disabled="false" className="form-control flatpickr-input" placeholder="+91 (609) 988-44-11" aria-label="john.doe@example.com" name="phoneNumber"
                                                                value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} /></div>) : (<span>{item.phoneNumber}</span>)}</td>

                                                            <td>{selectedItem && selectedItem.id === item.id ? (<div class="mb-3 mt-3 fv-plugins-icon-container"><input type="text" disabled="false" id="add-user-email" className="form-control flatpickr-input" placeholder="john.doe@example.com" aria-label="john.doe@example.com" name='email'
                                                                value={email} onChange={(e) => setEmail(e.target.value)} /></div>) : (
                                                                <span>{item && item.email}</span>
                                                            )}</td>
                                                            <td>{selectedItem && selectedItem.id === item.id ? (<div class="mb-3 mt-3 fv-plugins-icon-container"><input type="text" disabled="false" id="add-user-email" className="form-control flatpickr-input" placeholder="Employe" aria-label="Employe" name='workingStatus'
                                                                value={workingStatus} onChange={(e) => setWorkingStatus(e.target.value)} /></div>) : (
                                                                <span>{item && item.workingStatus}</span>
                                                            )}</td>
                                                            <td>

                                                                {selectedItem && selectedItem.id === item.id ? (<input type="text" className="form-control telecallar-team" id="add-user-fullname" placeholder="John Doe" name='roleId' value={roleId}
                                                                    onChange={(e) => setRoleId(e.target.value)} style={{ display: "none" }} />)

                                                                    : (<span>{item.User && item.User.Role && item.User.Role.Name}</span>)}

                                                            </td>
                                                            <td>{selectedItem && selectedItem.id === item.id ? (<div class="mb-3 mt-3 fv-plugins-icon-container"><input type="text" disabled="false" id="add-user-email" className="form-control flatpickr-input" placeholder="Visite Date" aria-label="Visite Date" name='visitDate'
                                                                value={visitDate} onChange={(e) => setVisitDate(e.target.value)} /></div>) : (
                                                                <span>{item && item.visitDate}</span>
                                                            )}</td>
                                                            <td>{selectedItem && selectedItem.id === item.id ? (<div class="mb-3 mt-3 fv-plugins-icon-container"><input type="text" disabled="false" id="add-user-email" className="form-control flatpickr-input" placeholder="remark" aria-label="remark" name='remark'
                                                                value={remark} onChange={(e) => setRemark(e.target.value)} /></div>) : (
                                                                <span>{item && item.remark}</span>
                                                            )}</td>


                                                            <td>
                                                                {selectedItem && selectedItem.id === item.id ? (<div class="d-inline-block text-nowrap">
                                                                    <div className="navbar-brand" >  <button class="btn btn-sm btn-icon" data-bs-target="#editTeam" data-bs-toggle="modal">
                                                                        <i class='bx bxs-arrow-from-left'></i>
                                                                    </button>
                                                                    </div>

                                                                </div>) : (<i class='bx bxs-arrow-from-left'></i>)}</td>
                                                        </tr>
                                                    ))}

                                                </tbody>
                                            </table>
                                            <div class="row mx-2"><div class="col-sm-12 col-md-6"><div class="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">Showing 1 to 10 of 50 entries</div></div><div class="col-sm-12 col-md-6"><div class="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate"><ul class="pagination"><li class="paginate_button page-item previous disabled" id="DataTables_Table_0_previous"><a aria-controls="DataTables_Table_0" aria-disabled="true" role="link" data-dt-idx="previous" tabindex="-1" class="page-link">Previous</a></li><li class="paginate_button page-item active"><a href="#" aria-controls="DataTables_Table_0" role="link" aria-current="page" data-dt-idx="0" tabindex="0" class="page-link">1</a></li><li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="1" tabindex="0" class="page-link">2</a></li><li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="2" tabindex="0" class="page-link">3</a></li><li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="3" tabindex="0" class="page-link">4</a></li><li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="4" tabindex="0" class="page-link">5</a></li><li class="paginate_button page-item next" id="DataTables_Table_0_next"><a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="next" tabindex="0" class="page-link">Next</a></li></ul></div></div></div></div>
                                    </div>
                                    {/* 
                                <!-- telecalteam Modal table --> */}
                                    <div class="modal fade" id="editTeam" tabindex="-1" aria-hidden="true">
                                        <div class="modal-dialog modal-lg modal-simple modal-edit-user">
                                            <div class="modal-content p-3 p-md-5">
                                                <div class="modal-body">
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    <div class="text-center mb-4">
                                                        <h3>Information</h3>

                                                    </div>
                                                    <form id="editUserForm" class="row g-3 fv-plugins-bootstrap5 fv-plugins-framework" onSubmit={handleSubmit} novalidate="novalidate">


                                                        <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                            <label for="exampleFormControlSelect2" class="form-label">Gender</label>
                                                            <select id="exampleFormControlSelect2" class="select2 form-select" placeholder="gender" name='gender'
                                                                defaultValue={gender} onChange={(e) => setGender(e.target.value)}>
                                                                <option value="">Select</option>
                                                                <option value="Female">Female</option>
                                                                <option value="Male">Male</option>
                                                                <option value="Other">Other</option>
                                                            </select>
                                                        </div>

                                                        <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                            <label for="exampleFormControlSelect2" class="form-label">Education</label>
                                                            <select id="exampleFormControlSelect2" class="select2 form-select" name="Education" defaultValue={Education} onChange={(e) => setEducation(e.target.value)}>
                                                                <option value="">Select</option>
                                                                <option value="Education">Education</option>
                                                                <option value="School">School</option>
                                                                <option value="Graduation">Graduation</option>
                                                                <option value="Master">Master</option>
                                                                <option value="Any other Skill">Any other Skill</option>
                                                                <option value="Other">Other</option>
                                                            </select>
                                                        </div>
                                                        <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                            <label for="exampleFormControlSelect2" class="form-label">Courses Look For</label>
                                                            <select id="exampleFormControlSelect2" class="select2 form-select" name="coursesId" defaultValue={coursesId} onChange={(e) => setCoursesId(e.target.value)}>
                                                                <option value="">Select</option>
                                                                {coursesTable.map((option) => (
                                                                    <option key={option.id} value={option.id}>{option.name}</option>
                                                                ))}
                                                            </select>
                                                        </div>

                                                        <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                            <label for="exampleFormControlSelect2" class="form-label">Address Type</label>
                                                            <select id="exampleFormControlSelect2" class="select2 form-select" name="AddressType" defaultValue={AddressType} onChange={(e) => setAddressType(e.target.value)}>
                                                                <option value="">Select</option>
                                                                <option value="Current Address">Current Address</option>
                                                                <option value="Residential Address">Residential Address</option>
                                                                <option value="Office Address">Office Address</option>
                                                            </select>
                                                        </div>
                                                        <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                            <label class="form-label" for="add-user-email">Address</label>
                                                            <input type="text" id="add-user-email" class="form-control" placeholder="Address" aria-label="Address" name='Address'
                                                                onChange={(e) => setAddress(e.target.value)}
                                                                value={Address} />
                                                            <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                        </div>
                                                        <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                            <label class="form-label" for="add-user-email">Postal Code</label>
                                                            <input type="text" id="add-user-email" class="form-control" placeholder="PostalCode" aria-label="PostalCode" name='PostalCode'
                                                                onChange={(e) => setPostalCode(e.target.value)}
                                                                value={PostalCode} />
                                                            <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                        </div>
                                                        <div className="col-12 col-md-6 fv-plugins-icon-container">
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

                                                        <div className="col-12 col-md-6 fv-plugins-icon-container">
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

                                                        <div className="col-12 col-md-6 fv-plugins-icon-container">
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
                                                            <label class="form-label" for="add-user-email">City</label>
                                                            <input type="text" id="add-user-email" class="form-control" placeholder="City" aria-label="City" name='City'
                                                                onChange={(e) => setCity(e.target.value)}
                                                                value={City} />
                                                            <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                        </div>




                                                        <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                            <label class="form-label" for="add-user-email">Area</label>
                                                            <input type="text" id="add-user-email" class="form-control" placeholder="Area" aria-label="Area" name='Area'
                                                                onChange={(e) => setArea(e.target.value)}
                                                                value={Area} />
                                                            <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                        </div>
                                                        <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                            <label for="exampleFormControlSelect2" class="form-label">Counseling Department Allotted</label>
                                                            <select id="exampleFormControlSelect2" class="select2 form-select" name="CounselingDepartmentAllotted" defaultValue={CounselingDepartmentAllotted} onChange={(e) => setCounselingDepartmentAllotted(e.target.value)}>
                                                                <option value="">Select</option>
                                                                <option value="Counselor Department">Counselor Department</option>

                                                            </select>
                                                        </div>
                                                        <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                            <label class="form-label" for="add-user-email">Counselor Name</label>
                                                            <input type="text" id="add-user-email" class="form-control" placeholder="CounselorName" aria-label="CounselorName" name='CounselorName'
                                                                onChange={(e) => setCounselorName(e.target.value)}
                                                                value={CounselorName} />
                                                            <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                        </div>
                                                        <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                            <label class="form-label" for="add-user-email">Counselor Room No.</label>
                                                            <input type="text" id="add-user-email" class="form-control" placeholder="CounselorRoomNo" aria-label="CounselorRoomNo" name='CounselorRoomNo'
                                                                onChange={(e) => setCounselorRoomNo(e.target.value)}
                                                                value={CounselorRoomNo} />
                                                            <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                        </div>


                                                        <div class="col-12 text-center">
                                                            <button type="submit" class="btn btn-primary me-sm-3 me-1">Submit</button>
                                                            <button type="reset" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                                                        </div>
                                                        <input type="hidden" /></form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*  <!-- Modal -->
                            <!/* -- Edit User Modal --> */}
                                {/*     <div class="modal fade" id="editUser" tabindex="-1" aria-hidden="true">
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
                                                        <input type="date" class="form-control flatpickr-input" placeholder="YYYY-MM-DD HH:MM" id="flatpickr-datetime" name='date'
                                                            defaultValue={date} onChange={(e) => setDate(e.target.value)} />
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
                                                            <span class="input-group-text">+1</span>
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

                                                    {/*    <div class="col-12 col-md-6">
                                                        <label class="form-label" for="modalEditTaxID">remark</label>
                                                        <input type="text" id="modalEditTaxID" name="remark" onChange={(e) => setRemark(e.target.value)}
                                                            defaultValue={remark} class="form-control modal-edit-tax-id" placeholder="remark" />
                                                    </div> */}

                                {/* 
                                                    <div class="col-12 text-center">
                                                        <button type="submit" class="btn btn-primary me-sm-3 me-1">Submit</button>
                                                        <button type="reset" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                                                    </div>
                                                    <input type="hidden" /></form>
                                            </div>
                                        </div>
                                    </div>
                                </div>  */}
                            </div>
                            {/*  <!-- Footer --> */}

                            <Footer />

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