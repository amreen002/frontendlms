import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from './footerComponent';
import Navbar from './navComponemt';
import DashBoardMenus from './dashboardsMenuComponent';
import { useNavigate, useParams, Link } from 'react-router-dom';
const { REACT_APP_API_ENDPOINT } = process.env;
function FrontListUse() {
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

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/listfrontdesk`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTable(response.data.frontdesk);
            }
        } catch (err) {
            console.log(err.response);
        }
    }
    const fetchData1 = async () => {
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
                                            <input type="search" class="form-control" placeholder="Search.." aria-controls="DataTables_Table_0" /></label></div><div class="dt-buttons btn-group flex-wrap"> <div class="btn-group"><button class="btn buttons-collection dropdown-toggle btn-label-secondary mx-3" tabindex="0" aria-controls="DataTables_Table_0" type="button" aria-haspopup="dialog" aria-expanded="false"><span><i class="bx bx-export me-1"></i>Export</span></button></div> </div></div></div></div><table class="datatables-users table border-top dataTable no-footer dtr-column" id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info" width="1390px;">
                                                <thead>
                                                    <tr>


                                                        <th class="control sorting_disabled dtr-hidden" rowspan="1" colspan="1" aria-label="" width="112px">S NO.</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="176px;" aria-label="Role: activate to sort column ascending">EQUIRY ID</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="176px;" aria-label="Role: activate to sort column ascending">LEADS DATE</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="Role: activate to sort column ascending">FULL NAME</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="176px;" aria-label="Role: activate to sort column ascending">AGE</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="150px;" aria-label="Plan: activate to sort column ascending">MOBILE NO </th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="Billing: activate to sort column ascending">EMAIL</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="Billing: activate to sort column ascending">WORKING STATUS</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="Billing: activate to sort column ascending">TELECALLER PERSON NAME</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="Billing: activate to sort column ascending">VISITING DATE</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="Billing: activate to sort column ascending">REMARKS</th>
                                                        <th class="sorting_disabled" rowspan="1" colspan="1" width="118px;" aria-label="Update">Update</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {table.map((item, index) => (
                                                        <tr key={item.id}>
                                                            <td className="sorting_1">{index + 1}</td>
                                                            <td>{item.enquiryId}</td>
                                                            <td>{item.date}</td>
                                                            <td>{item.name}</td>
                                                            <td>{item.age}</td>
                                                            <td>{item.phoneNumber}</td>
                                                            <td>{item.email}</td>
                                                            <td>{item.workingStatus}</td>
                                                            <td>{item.User &&item.User.Role&& item.User.Role.Name}</td>
                                                            <td>{item.visitDate}</td>
                                                            <td>{item.remark}</td>
                                                           
                                                            <td><div classNmae="d-inline-block text-nowrap">
                                                                <Link to={`/frontdesklist/${item.id}`} className="navbar-brand" >  <button className="btn btn-sm btn-icon" data-bs-target="#editUserss" data-bs-toggle="modal">
                                                                    <i class="bx bx-edit"></i>
                                                                </button>
                                                                </Link>
                                                            </div></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <div class="row mx-2"><div class="col-sm-12 col-md-6"><div class="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">Showing 1 to 10 of 50 entries</div></div><div class="col-sm-12 col-md-6"><div class="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate"><ul class="pagination"><li class="paginate_button page-item previous disabled" id="DataTables_Table_0_previous"><a aria-controls="DataTables_Table_0" aria-disabled="true" role="link" data-dt-idx="previous" tabindex="-1" class="page-link">Previous</a></li><li class="paginate_button page-item active"><a href="#" aria-controls="DataTables_Table_0" role="link" aria-current="page" data-dt-idx="0" tabindex="0" class="page-link">1</a></li><li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="1" tabindex="0" class="page-link">2</a></li><li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="2" tabindex="0" class="page-link">3</a></li><li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="3" tabindex="0" class="page-link">4</a></li><li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="4" tabindex="0" class="page-link">5</a></li><li class="paginate_button page-item next" id="DataTables_Table_0_next"><a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="next" tabindex="0" class="page-link">Next</a></li></ul></div></div></div></div>
                                    </div>


                                </div>
                                {/*            <!-- telecalteam Modal table --> */}
                                <div class="modal fade" id="editUserss" tabindex="-1" aria-hidden="true">
                                    <div class="modal-dialog modal-lg modal-simple modal-edit-user">
                                        <div class="modal-content p-3 p-md-5">
                                            <div class="modal-body">
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                <div class="text-center mb-4">
                                                    <h3>Information</h3>

                                                </div>
                                                <form id="editUserForm" class="row g-3 fv-plugins-bootstrap5 fv-plugins-framework" onSubmit={handleUpdate} novalidate="novalidate">


                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                        <label for="exampleFormControlSelect2" class="form-label">Gender</label>
                                                        <select id="exampleFormControlSelect2" class="select2 form-select" placeholder="gender" name='gender'
                                                            value={gender} onChange={(e) => setGender(e.target.value)}>
                                                            <option value="">Select</option>
                                                            <option value="Female">Female</option>
                                                            <option value="Male">Male</option>
                                                            <option value="Other">Other</option>
                                                        </select>
                                                    </div>

                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                        <label for="exampleFormControlSelect2" class="form-label">Education</label>
                                                        <select id="exampleFormControlSelect2" class="select2 form-select" name="Education" value={Education} onChange={(e) => setEducation(e.target.value)}>
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
                                                        <select id="exampleFormControlSelect2" class="select2 form-select" name="coursesId" value={coursesId} onChange={(e) => setCoursesId(e.target.value)}>
                                                            <option value="">Select</option>
                                                            {coursesTable.map((option) => (
                                                                <option key={option.id} value={option.id}>{option.name}</option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                        <label for="exampleFormControlSelect2" class="form-label">Address Type</label>
                                                        <select id="exampleFormControlSelect2" class="select2 form-select" name="AddressType" value={AddressType} onChange={(e) => setAddressType(e.target.value)}>
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
                                                        <select id="exampleFormControlSelect2" class="select2 form-select" name="CounselingDepartmentAllotted" value={CounselingDepartmentAllotted} onChange={(e) => setCounselingDepartmentAllotted(e.target.value)}>
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

export default FrontListUse