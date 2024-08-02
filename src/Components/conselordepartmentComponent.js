import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from './footerComponent';
import Navbar from './navComponemt';
import DashBoardMenus from './dashboardsMenuComponent';
import { useNavigate, useParams, Link } from 'react-router-dom';
const { REACT_APP_API_ENDPOINT } = process.env;
function ConselorDepartmentUse() {
    const [table, setTable] = useState([]);
    const [counselordepartment, setCounselorDepartment] = useState([]);
    const { frontdeskId } = useParams();
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
    const [search, setSearch] = useState('');
    const [TelecallerCheckbox, setTelecallerCheckbox] = useState(false);
    const [createdItems, setCreatedItems] = useState({});
    const [CounselingStatus, setCounselingStatus] = ('')

    const [selectedItem, setSelectedItem] = useState([]);

    useEffect(() => {
        fetchData2(search)
    }, [search]);

    useEffect(() => {
        fetchData3()
    }, []);

    const fetchData2 = async (search) => {
        try {

            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/listfrontdesk?search=${search}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                // Assuming response.data directly contains user data
                const userData = response.data.frontdesk;
                setTable(userData)

            }
        } catch (err) {
            console.log(err.response);
        }
    }
    const fetchData3 = async () => {
        try {

            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/listcounselordepartment`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                // Assuming response.data directly contains user data
                const userData = response.data.counselordepartment;
                setCounselorDepartment(userData)

            }
        } catch (err) {
            console.log(err.response);
        }
    }



    const handleCheckboxChange = (e, item) => {
        const isChecked = e.target.checked;
        setCreatedItems(prevState => ({
            ...prevState,
            [item.id]: isChecked
        }));
        if (isChecked) {
            setSelectedItem(item);
            setFormData({
                enquiryId: item.enquiryId,
                date: item.date,
                name: item.name,
                age: item.age,
                phoneNumber: item.phoneNumber,
                email: item.email,
                workingStatus: item.workingStatus,
                remark: item.remark,
                visitDate: item.visitDate,
                AddressableId: item.AddressableId,
                roleId: item.roleId,
                gender: item.gender,
                Education: item.Education,
                coursesId: item.coursesId,
                AddressType: item.AddressType,
                PostalCode: item.PostalCode,
                Address: item.Address,
                DistrictId: item.DistrictId,
                City: item.City,
                StateId: item.StateId,
                CountryId: item.CountryId,
                Area: item.Area,
                CounselingDepartmentAllotted: item.CounselingDepartmentAllotted,
                CounselorName: item.CounselorName,
                CounselorRoomNo: item.CounselorRoomNo,
                CounselingStatus: item.CounselingStatus,

            });
            setTelecallerCheckbox(e.target.checked);
        } else {
            setSelectedItem('');
            setFormData({
                name: '',
                workingStatus: '',
                phoneNumber: '',
                email: '',
                age: '',
                date: '',
                remark: '',
                visitDate: '',
                roleId: '',
                gender: '',
                Education: '',
                coursesId: '',
                AddressType: '',
                PostalCode: '',
                Address: '',
                DistrictId: '',
                City: '',
                StateId: '',
                CountryId: '',
                Area: '',
                CounselingDepartmentAllotted: '',
                CounselorName: '',
                CounselorRoomNo: '',
                TelecallerCheckbox: '',
                CounselingStatus: '',
            });
            setTelecallerCheckbox('');
        }
    };
    const [formData, setFormData] = useState({
        CounselingStatus: '',
        enquiryId: '',
        name: '',
        workingStatus: '',
        phoneNumber: '',
        email: '',
        age: '',
        date: '',
        remark: '',
        visitDate: '',
        roleId: '',
        gender: '',
        Education: '',
        coursesId: '',
        AddressType: '',
        PostalCode: '',
        Address: '',
        DistrictId: '',
        City: '',
        StateId: '',
        CountryId: '',
        Area: '',
        CounselingDepartmentAllotted: '',
        CounselorName: '',
        CounselorRoomNo: '',

    });


    const handleSelectChange = (e) => {
        const { value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            CounselingStatus: value
        }));
    };

    const handleSubmitWrapper = async (e) => {
        e.preventDefault();
        await handleSubmit(e);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');

            if (token) {
                await axios.post(`${REACT_APP_API_ENDPOINT}/addcounselordepartment`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                alert('Counselor Department Is Create Successfully');

            }
            const promises = Object.entries(createdItems).map(async ([frontdeskId, isChecked]) => {
                const updatedUserData = { TelecallerCheckbox: isChecked };
                try {
                    const updateResponse = await axios.patch(`${REACT_APP_API_ENDPOINT}/viewsfrontdesk/${frontdeskId}`, updatedUserData, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });


                } catch (updateError) {
                    console.error(`Failed to update item ${frontdeskId}:`, updateError);
                    throw updateError; // Rethrow to catch in Promise.all
                }
            });
            console.log('Updating created items:', createdItems);
            await Promise.all(promises);

            // Fetch the updated data
            fetchData2(search);

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
                                {/*    {/*                          <!--/ Add Role Modal --> */}
                                <div className="modal fade" id="addCounselorModal" tabindex="-1" aria-hidden="true">
                                    <div className="modal-dialog modal-lg modal-simple modal-dialog-centered modal-add-new-role">
                                        <div className="modal-content p-3 p-md-5">
                                            <div className="modal-body">
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                <div className="text-center mb-4">
                                                    <h3 className="role-title">Search </h3>
                                                    <p>Enquiry Detail</p>
                                                </div>


                                                <div className="col-12 mb-4 fv-plugins-icon-container">
                                                    <label className="form-label" htmlFor="modalRoleName">Enquiry Id</label>
                                                    <input
                                                        class="form-control" placeholder="Search.." aria-controls="DataTables_Table_0"
                                                        type="search"
                                                        value={search}
                                                        onChange={(e) => setSearch(e.target.value)}

                                                    />
                                                    <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                </div>

                                               {/*  <div className="card">

                                                    <div className="card-datatable table-responsive">
                                                        <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer"><div class="row mx-2"><div class="col-md-2"><div class="me-3"><div class="dataTables_length" id="DataTables_Table_0_length"><label><select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" class="form-select"><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select></label></div></div></div><div class="col-md-10"><div class="dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0"><div id="DataTables_Table_0_filter" class="dataTables_filter"><label>
                                                        </label></div><div className="dt-buttons btn-group flex-wrap"> <div className="btn-group">  </div></div></div></div></div>
                                                            <form onSubmit={handleSubmit}>
                                                                <table class="datatables-users table border-top dataTable no-footer dtr-column" id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info" width="1390px">
                                                                    <thead>
                                                                        <tr>
                                                                            <th className="control sorting_disabled dtr-hidden" rowspan="1" colspan="1" aria-label=""></th>
                                                                            <th className="sorting sorting_desc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="115px;" aria-label="User: activate to sort column ascending" aria-sort="descending">S.NO</th>
                                                                            <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="176px;" aria-label="Role: activate to sort column ascending">Enquiry Id</th>
                                                                            <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="176px;" aria-label="Role: activate to sort column ascending">Full Name</th>
                                                                            <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="115px;" aria-label="Role: activate to sort column ascending">Date</th>
                                                                            <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="118px;" aria-label="Plan: activate to sort column ascending">Contact </th>
                                                                            <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="217px;" aria-label="Billing: activate to sort column ascending">Email</th>
                                                                            <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="217px;" aria-label="Status: activate to sort column ascending">Current Address </th>
                                                                            <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="217px;" aria-label="Status: activate to sort column ascending">City</th>
                                                                            <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="217px;" aria-label="Status: activate to sort column ascending">Graduations</th>
                                                                            <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="217px;" aria-label="Status: activate to sort column ascending">Course Name</th>
                                                                            <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="250px;" aria-label="Status: activate to sort column ascending">Counseling Status</th>

                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {table.map((item) => {
                                                                       
                                                                         
                                                                                    <tr key={item.id}>

                                                                                        <td className="sorting_1">
                                                                                            <input
                                                                                                type="checkbox"
                                                                                                checked={createdItems[item.id] !== undefined ? createdItems[item.id] : item.TelecallerCheckbox}
                                                                                                onChange={(e) => handleCheckboxChange(e, item)}
                                                                                                disabled={item.TelecallerCheckbox ? true : false}
                                                                                            />
                                                                                        </td>
                                                                                        <td>{item.id}</td>
                                                                                        <td>{item.enquiryId}</td>
                                                                                        <td>{item.name}</td>
                                                                                        <td>{item.date}</td>
                                                                                        <td>{item.phoneNumber}</td>
                                                                                        <td>{item.email}</td>
                                                                                        <td>{item.Address && item.Address.Address}</td>
                                                                                        <td>{item.Address && item.Address.City}</td>
                                                                                        <td>{item.Education}</td>
                                                                                        <td>{item.Course && item.Course.name}</td>

                                                                                        <td>
                                                                                            {selectedItem && selectedItem.id === item.id ? (
                                                                                                <div>
                                                                                                    <label htmlFor="exampleFormControlSelect2" className="form-label">Status</label>
                                                                                                    <select
                                                                                                        id="exampleFormControlSelect2"
                                                                                                        className="select2 form-select"
                                                                                                        value={formData.CounselingStatus}
                                                                                                        onChange={handleSelectChange}
                                                                                                    >
                                                                                                        <option value="">----Choose one----</option>
                                                                                                        <option value="Processing">Processing</option>
                                                                                                        <option value="Hold">Hold</option>
                                                                                                        <option value="Admission Form">Admission Form</option>
                                                                                                    </select>

                                                                                                    <div class="col-12 text-center">
                                                                                                        <button type="submit" onClick={handleSubmitWrapper} class="btn btn-primary me-sm-3 me-1">Submit</button>

                                                                                                    </div>
                                                                                                </div>

                                                                                            ) : (
                                                                                                <i className='bx bxs-arrow-from-left'></i>
                                                                                            )}
                                                                                        </td>


                                                                                    </tr>
                                                                             
                                                                        })}
                                                                    </tbody>
                                                                </table>
                                                            </form>
                                                            <div class="row mx-2"><div class="col-sm-12 col-md-6"><div class="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">Showing 1 to 10 of 50 entries</div></div><div class="col-sm-12 col-md-6"><div class="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate"><ul class="pagination"><li class="paginate_button page-item previous disabled" id="DataTables_Table_0_previous"><a aria-controls="DataTables_Table_0" aria-disabled="true" role="link" data-dt-idx="previous" tabindex="-1" class="page-link">Previous</a></li><li class="paginate_button page-item active"><a href="#" aria-controls="DataTables_Table_0" role="link" aria-current="page" data-dt-idx="0" tabindex="0" class="page-link">1</a></li><li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="1" tabindex="0" class="page-link">2</a></li><li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="2" tabindex="0" class="page-link">3</a></li><li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="3" tabindex="0" class="page-link">4</a></li><li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="4" tabindex="0" class="page-link">5</a></li><li class="paginate_button page-item next" id="DataTables_Table_0_next"><a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="next" tabindex="0" class="page-link">Next</a></li></ul></div></div></div></div>
                                                    </div>

                                                </div> */}




                                                {/*      <!--/ Add role form --> */}
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
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}

                                            />
                                        </label></div><div class="dt-buttons btn-group flex-wrap"> <div class="btn-group"><button class="btn buttons-collection dropdown-toggle btn-label-secondary mx-3" tabindex="0" aria-controls="DataTables_Table_0" type="button" aria-haspopup="dialog" aria-expanded="false"><span><i class="bx bx-export me-1"></i>Export</span></button></div></div></div></div></div><table class="datatables-users table border-top dataTable no-footer dtr-column" id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info" width="1390px;">
                                                <thead>
                                                    <tr>
                                                        <th class="sorting sorting_desc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1"></th>
                                                        <th class="sorting sorting_desc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="115px;" aria-label="User: activate to sort column ascending" aria-sort="descending">S.NO</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="176px;" aria-label="Role: activate to sort column ascending">Full Name</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="115px;" aria-label="Role: activate to sort column ascending">Age</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="118px;" aria-label="Plan: activate to sort column ascending">Contact </th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="217px;" aria-label="Billing: activate to sort column ascending">Email</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="217px;" aria-label="Status: activate to sort column ascending">Working Status</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="217px;" aria-label="Status: activate to sort column ascending">Enquiry Id</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="217px;" aria-label="Status: activate to sort column ascending">Counseling Status</th>

                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {counselordepartment.map((item) => {
                                                        <tr key={item.id}>
                                                            <td className="sorting_1">
                                                            </td>
                                                            <td>{item.id}</td>
                                                            <td>{item.name}</td>
                                                            <td>{item.age}</td>
                                                            <td>{item.phoneNumber}</td>
                                                            <td>{item.email}</td>
                                                            <td>{item.workingStatus}</td>
                                                            <td>{item.enquiryId}</td>
                                                            <td>{item.CounselingStatus}</td>
                                                        </tr>

                                                    })}
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

export default ConselorDepartmentUse