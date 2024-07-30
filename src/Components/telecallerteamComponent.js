import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from './footerComponent';
import Navbar from './navComponemt';
import DashBoardMenus from './dashboardsMenuComponent';
import { useNavigate, useParams, Link } from 'react-router-dom';
const { REACT_APP_API_ENDPOINT ,REACT_APP_API_IMG} = process.env;


function TelecalTeam() {

    const { saleteamId } = useParams();
    const [selectedItem, setSelectedItem] = useState([]);
    const [date, setDate] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [workingStatus, setWorkingStatus] = useState('');
    const [leadPlatform, setLeadPlatform] = useState('');
    const [status, setStatus] = useState('');
    const [remark, setRemark] = useState('')
    const [createdAt, setCreatedAt] = useState('');
    const [visitDate, setVisitDate] = useState('')
    const [roleId, setRoleId] = useState('')
    const [userData, setUserData] = useState({});

    useEffect(() => {
        fetchData1(saleteamId);
    }, [saleteamId]);
    const [searchTerm, setSearchTerm] = useState('');
    const [saleTeamData, setSaleTeamData] = useState([]);
    const [TelecallerCheckbox, setTelecallerCheckbox] = useState(false);
    const [createdItems, setCreatedItems] = useState({});

    useEffect(() => {
        fetchData1(saleteamId);
    }, [searchTerm]); // Trigger fetch data when searchTerm changes

    useEffect(() => {
        fetchData0();
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
            setLeadPlatform(item.leadPlatform);
            setStatus(item.status);
            setCreatedAt(item.createdAt);
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
            setLeadPlatform('');
            setStatus('');
            setCreatedAt('');
            setRemark('');
            setVisitDate('');
            setRoleId('')
        }

    };

    const fetchData0 = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/usertelecallerteam`, {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                });
                const userData = response.data.usertelecallerteam;
                setSaleTeamData(userData)
                setDate(userData.date)
                setName(userData.name);
                setAge(userData.age);
                setPhoneNumber(userData.phoneNumber);
                setEmail(userData.email);
                setWorkingStatus(userData.workingStatus);
                setLeadPlatform(userData.leadPlatform);
                setRoleId(userData.roleId)
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
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
                const userData = response.data.saleteam;
                setUserData(response.data.saleteam)
                setDate(userData.date)
                setName(userData.name);
                setAge(userData.age);
                setPhoneNumber(userData.phoneNumber);
                setEmail(userData.email);
                setWorkingStatus(userData.workingStatus);
                setLeadPlatform(userData.leadPlatform);
                setTelecallerCheckbox(userData.TelecallerCheckbox);
                setRoleId(userData.roleId)
            }
        } catch (err) {
            console.log(err.response);
        }
    }






    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e)
        try {


            const token = localStorage.getItem('token');
            if (token) {
                const formData = { name, age, phoneNumber, email, workingStatus, leadPlatform, date, status, remark, visitDate, roleId };
                if (window.confirm('Are you sure you want to Lead Forwarded ?')) {
                    // Save it! 
                    await axios.post(`${REACT_APP_API_ENDPOINT}/addtelecallerteam`, formData, {
                        headers: {
                            Authorization: `Bearer ${token}`

                        }
                    });
                    alert('Lead Forwarded To Front Desk');
                    window.location.href = "/telecallerteam";
                } else {
                    // Do nothing!
                    console.log('Lead Forword Not To Front Desk');

                }
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
            fetchData1();
            // Clear local changes after successful update
            setCreatedItems({});
        } catch (error) {
            alert('Failed to send message.');
        }
    }



    return (
        <>
            {/*     <!-- Layout wrapper --> */}
            <div class="layout-wrapper layout-content-navbar">
                <div class="layout-container">
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
                                                        <th class="control sorting_disabled dtr-hidden" rowspan="1" colspan="1" width="200px;" aria-label="">Enquery Forword</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="176px;" aria-label="Role: activate to sort column ascending">Full Name</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="115px;" aria-label="Role: activate to sort column ascending">Age</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="115px;" aria-label="Role: activate to sort column ascending">Telecaller Person Name</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="150px;" aria-label="Plan: activate to sort column ascending">Contact </th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="Billing: activate to sort column ascending">Email</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="Status: activate to sort column ascending">Working Status</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="Status: activate to sort column ascending">Lead Platform</th>
                                                        <th class="sorting_disabled" rowspan="1" colspan="1" width="110px;" aria-label="Actions">Status</th>

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
                                                            {/*            <td>{selectedItem && selectedItem.id === item.id ? (<div class="mb-3 fv-plugins-icon-container">
                                                                <input type="date" class="form-control flatpickr-input" placeholder="YYYY-MM-DD HH:MM" id="flatpickr-datetime" name='date'
                                                                    value={date} onChange={(e) => setDate(e.target.value)} />
                                                            </div>) : (
                                                                <span>{item && item.date}</span>
                                                            )}</td> */}
                                                            <td>
                                                                {selectedItem && selectedItem.id === item.id ? (
                                                                    <input type="text" className="form-control telecallar-team" disabled="false" id="add-user-fullname" placeholder="John Doe" name='name' value={name}
                                                                        onChange={(e) => setName(e.target.value)} />
                                                                ) : (
                                                                    <span>{item && item.name}</span>
                                                                )}
                                                            </td>

                                                            <td> {selectedItem && selectedItem.id === item.id ? (
                                                                <input type="number" className="form-control telecallar-team" disabled="false" id="add-user-fullname" placeholder="John Doe" name='age'
                                                                    value={age}
                                                                    onChange={(e) => setAge(e.target.value)} />
                                                            ) : (
                                                                <span>{item && item.age}</span>
                                                            )}
                                                            </td>
                                                            <td>

                                                                <input type="text" className="form-control telecallar-team" id="add-user-fullname" placeholder="John Doe" name='roleId' value={roleId}
                                                                    onChange={(e) => setRoleId(e.target.value)} style={{ display: "none" }} />

                                                                <span>{item.User && item.User.Role && item.User.Role.Name}</span>

                                                            </td>
                                                            <td> {selectedItem && selectedItem.id === item.id ? (<input type="text" id="add-user-contact" disabled="false" className="form-control telecallar-team" placeholder="+91 (609) 988-44-11" aria-label="john.doe@example.com" name="phoneNumber"
                                                                value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />) : (<span>{item.phoneNumber}</span>)}</td>

                                                            <td>{selectedItem && selectedItem.id === item.id ? (<input type="text" id="add-user-email" disabled="false" className="form-control telecallar-team" placeholder="john.doe@example.com" aria-label="john.doe@example.com" name='email'
                                                                value={email} onChange={(e) => setEmail(e.target.value)} />) : (
                                                                <span>{item && item.email}</span>
                                                            )}</td>
                                                            <td>{selectedItem && selectedItem.id === item.id ? (<input type="text" id="add-user-email" disabled="false" className="form-control telecallar-team" placeholder="Employe" aria-label="Employe" name='workingStatus'
                                                                value={workingStatus} onChange={(e) => setWorkingStatus(e.target.value)} />) : (
                                                                <span>{item && item.workingStatus}</span>
                                                            )}</td>
                                                            <td>{selectedItem && selectedItem.id === item.id ? (<input type="text" id="add-user-email" disabled="false" className="form-control telecallar-team" placeholder="Call" aria-label="Call" name='leadPlatform'
                                                                value={leadPlatform} onChange={(e) => setLeadPlatform(e.target.value)} />) : (
                                                                <span>{item && item.leadPlatform}</span>
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
                                                        <h3>Status</h3>

                                                    </div>
                                                    <form id="editUserForm" class="row g-3 fv-plugins-bootstrap5 fv-plugins-framework" onSubmit={handleSubmit} novalidate="novalidate">
                                                        <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                            <label for="flatpickr-datetime" class="form-label">Visiting Date</label>
                                                            <input type="date" class="form-control" placeholder="YYYY-MM-DD HH:MM" id="flatpickr-datetime" name='visitDate'
                                                                defaultValue={visitDate} onChange={(e) => setVisitDate(e.target.value)} />
                                                        </div>

                                                        <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                            <label for="exampleFormControlSelect2" class="form-label">Status</label>
                                                            <select id="exampleFormControlSelect2" class="select2 form-select" name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                                                                <option value="" selected >----Choose one----</option>
                                                                <option value="1st Call">1st Call</option>
                                                                <option value="2nd Call">2nd Call</option>
                                                                <option value="3rd Call">3rd Call</option>
                                                                <option value="4rd Call">4rd Call</option>
                                                                <option value="Not Responding (N/R)">Not Responding (N/R)</option>
                                                                <option value="Other">Other</option>
                                                            </select>
                                                        </div>
                                                        <div class="col-12 col-md-12">
                                                            <label class="form-label" for="modalEditTaxID">remark</label>
                                                            <input type="text" id="modalEditTaxID" name="remark" disabled="false" onChange={(e) => setRemark(e.target.value)}

                                                                defaultValue={remark} className="form-control modal-edit-tax-id" placeholder="remark" />
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

export default TelecalTeam