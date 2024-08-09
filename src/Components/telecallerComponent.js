import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from './footerComponent';
import Navbar from './navComponemt';
import DashBoardMenus from './dashboardsMenuComponent';
import { useNavigate, useParams, Link } from 'react-router-dom';
const { REACT_APP_API_ENDPOINT, REACT_APP_API_IMG } = process.env;
function TelecallerUse() {
    const [table, setTable] = useState([]);
    const [dataUser, setTabledataUser] = useState([]);
    const [dataUserss, setTabledataUserssss] = useState({});
    const [roleId, setRoleId] = useState('');
    // State variables

    const [selectedColumn, setSelectedColumn] = useState('');



    const [telecallerPersonNames, setTelecallerPersonNames] = useState(() => {
        const savedNames = JSON.parse(localStorage.getItem('telecallerPersonNames'));
        return savedNames !== null ? savedNames : {};
    });

    useEffect(() => {
        fetchData();
        fetchData2()
        fetchData3()
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
                setTable(response.data.saleteam.rows);
            }
        } catch (err) {
            console.log(err.response);
        }
    }

    const fetchData3 = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/userwisedata`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTabledataUserssss(response.data);
            }// Updated state variable
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



    useEffect(() => {
        localStorage.setItem('telecallerPersonNames', JSON.stringify(telecallerPersonNames));
    }, [telecallerPersonNames]);


    const handleUpdate = async (e, saleteamId) => {
        e.preventDefault();
        const { checked } = e.target;
        const newValue = checked ? 'Allotted' : 'Allotted';
        try {
            const token = localStorage.getItem('token');

            if (token) {
                if (window.confirm('Are you sure you want to allocate the Telecaller Department Team Member?')) {
                    await axios.patch(`${REACT_APP_API_ENDPOINT}/viewssaleteam/${saleteamId}`, { telecallerPersonName: newValue, roleId: roleId }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setTelecallerPersonNames(prevState => ({
                        ...prevState,
                        [saleteamId]: newValue,
                    }));
                    fetchData(saleteamId);
                    alert('Lead Assign To Telecallar Department');
                } else {
                    alert('Lead Assign Not To Telecallar Department');

                }
            }
        } catch (error) {
            console.error('Error updating user:', error);
            alert('An error occurred while updating user data');
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
                                        <h2>Leads Views</h2>
                                        <h5 class="card-title">Search Filter</h5>
                                        <div class="d-flex justify-content-between align-items-center row py-3 gap-3 gap-md-0">
                                            <div class="col-md-4 user_role"><select id="UserRole" class="form-select text-capitalize"><option value=""> Select Role </option><option value="Admin">Admin</option><option value="Author">Author</option><option value="Editor">Editor</option><option value="Maintainer">Maintainer</option><option value="Subscriber">Subscriber</option></select></div>
                                            <div class="col-md-4 user_plan"><select id="UserPlan" class="form-select text-capitalize"><option value=""> Select Plan </option><option value="Basic">Basic</option><option value="Company">Company</option><option value="Enterprise">Enterprise</option><option value="Team">Team</option></select></div>
                                            <div class="col-md-4 user_status"><select id="FilterTransaction" class="form-select text-capitalize"><option value=""> Select Status </option><option value="Pending" class="text-capitalize">Pending</option><option value="Active" class="text-capitalize">Active</option><option value="Inactive" class="text-capitalize">Inactive</option></select></div>
                                        </div>
                                    </div>
                                    <div class="card-datatable table-responsive">
                                        <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer">
                                            <div class="row mx-2"><div class="col-md-2">
                                                <div class="me-3">

                                                    <div class="dataTables_length" id="DataTables_Table_0_length"><label>
                                                        <select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" class="form-select">
                                                            <option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">
                                                                100</option></select></label></div></div></div><div class="col-md-10">
                                                    <div class="dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0"><div id="DataTables_Table_0_filter" class="dataTables_filter"><label>
                                                        <input type="search" class="form-control" placeholder="Search.." aria-controls="DataTables_Table_0" />
                                                    </label></div><div class="dt-buttons btn-group flex-wrap"> <div class="btn-group">
                                                        <button class="btn buttons-collection dropdown-toggle btn-label-secondary mx-3" tabindex="0" aria-controls="DataTables_Table_0" type="button" aria-haspopup="dialog" aria-expanded="false"><span><i class="bx bx-export me-1"></i>Export</span></button></div>
                                                        </div></div></div></div><table class="datatables-users table border-top dataTable no-footer dtr-column" id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info" width="1390px;">
                                                <thead>
                                                    <tr>
                                                        <th class="sorting sorting_desc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="115px;" aria-label="User: activate to sort column ascending" aria-sort="descending">S.NO</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="180px;" aria-label="Role: activate to sort column ascending">Full Name</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="115px;" aria-label="Role: activate to sort column ascending">Age</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="118px;" aria-label="Plan: activate to sort column ascending">Contact </th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="100px;" aria-label="Billing: activate to sort column ascending">Email</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="217px;" aria-label="Status: activate to sort column ascending">Working Status</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="217px;" aria-label="Status: activate to sort column ascending">Lead Platform</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="350px;" aria-label="Statusss: activate to sort column ascending">Leads
                                                            Allowcate To Team Member</th>
                                                        {/*                                                         <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="180px;" aria-label="Status: activate to sort column ascending">Team Department</th> */}
                                                        <th class="sorting_disabled" rowspan="1" colspan="1" width="150px;" aria-label="Actions">Actions</th>
                                                        {/*   <th class="sorting_disabled" rowspan="1" colspan="1" width="145px;" aria-label="Actions">Lead Approved By Department</th> */}

                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {table.map((item, index) => (
                                                        <tr key={item.id}>
                                                            <td>{item.id}</td>
                                                            <td>{item.name}</td>
                                                            <td>{item.age}</td>
                                                            <td>{item.phoneNumber}</td>
                                                            <td>{item.email}</td>
                                                            <td>{item.workingStatus}</td>
                                                            <td>{item.leadPlatform}</td>
                                                            {/* Assuming `dataUser` is an array of user objects */}

                                                            <td>
                                                                <div>
                                                                    <select
                                                                        id={`roleSelect-${item.id}`}
                                                                        className="select2 form-select"
                                                                        value={selectedColumn === item.id ? roleId : ''}
                                                                        onChange={(e) => {
                                                                            setSelectedColumn(item.id);
                                                                            setRoleId(e.target.value);
                                                                        }}
                                                                    >
                                                                        <option value="">---------Select-----------</option>
                                                                        {dataUser.map(option => (
                                                                            <option key={option.id} value={option.id}>{option.name}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            </td>


                                                            <td>
                                                                {telecallerPersonNames[item.id] !== null && (
                                                                    <div className="form-check form-switch mb-2">
                                                                        <input
                                                                            className="form-check-input"
                                                                            type="checkbox"
                                                                            id={`telecallerPersonName-${item.id}`}
                                                                            name="telecallerPersonNames"
                                                                            checked={telecallerPersonNames[item.id] === "Allotted"}
                                                                            onChange={(e) => handleUpdate(e, item.id)}
                                                                        />
                                                                        <span>
                                                                            {telecallerPersonNames[item.id]}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            </td>


                                                        </tr>
                                                    ))}


                                                </tbody>


                                            </table>
                                            <div class="row mx-2"><div class="col-sm-12 col-md-6"><div class="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">Showing 1 to 10 of 50 entries</div></div><div class="col-sm-12 col-md-6"><div class="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate"><ul class="pagination"><li class="paginate_button page-item previous disabled" id="DataTables_Table_0_previous"><a aria-controls="DataTables_Table_0" aria-disabled="true" role="link" data-dt-idx="previous" tabindex="-1" class="page-link">Previous</a></li><li class="paginate_button page-item active"><a href="#" aria-controls="DataTables_Table_0" role="link" aria-current="page" data-dt-idx="0" tabindex="0" class="page-link">1</a></li><li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="1" tabindex="0" class="page-link">2</a></li><li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="2" tabindex="0" class="page-link">3</a></li><li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="3" tabindex="0" class="page-link">4</a></li><li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="4" tabindex="0" class="page-link">5</a></li><li class="paginate_button page-item next" id="DataTables_Table_0_next"><a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="next" tabindex="0" class="page-link">Next</a></li></ul></div></div></div></div>
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

export default TelecallerUse