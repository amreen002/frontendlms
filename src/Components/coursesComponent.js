import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from './footerComponent';
import Navbar from './navComponemt';
import DashBoardMenus from './dashboardsMenuComponent';
import ValidationCourse from '../validation/coursevalidation';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
const { REACT_APP_API_ENDPOINT } = process.env;
function CoursesP() {
    const { coursesId } = useParams();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const [table, setCourse] = useState([]);

    const [category, setCategory] = useState([]);
    useEffect(() => {
        fetchData(coursesId);
    }, [coursesId]);
    useEffect(() => {
        fetchData1();
        fetchData2();
    }, []);

    const fetchData = async (coursesId) => {
        try {
            if (!coursesId) {
                console.log("coursesId is undefined");
                return;
            }
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/listcourses/${coursesId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                });
                const userData = response.data.courses;
                setUserData(userData);
                setFormData({
                    name:userData.name , 
                    CoursePrice:userData.CoursePrice,
                    CourseCategoryId: userData.CourseCategoryId, 
                    CourseDuration:userData.CourseDuration,
                    CourseUplod:null,
                    AboutCourse:userData.AboutCourse,
                    Description:userData.Description,
                });
            }

        } catch (err) {
            console.log(err.response);
        }
    }
    const fetchData1 = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/listcourses`, {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                });
                const userDatas = response.data.courses;
                setCourse(userDatas)
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const fetchData2 = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/categories`, {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                }); 
                const userDatas = response.data.categories;
                setCategory(userDatas)
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const [errors, setErrors] =useState({})
    const [formData, setFormData] = useState({
        name:'' , CoursePrice:'', CourseCategoryId: '', CourseDuration:'',CourseUplod:null, AboutCourse: '',Description: '',
    });
    const handleChange = (e) => {
        const { name, files, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: files ? files[0] : value
        }));
        const updatedFormData = { ...formData, [name]: value };

        const validationErrors = ValidationCourse(updatedFormData);
        setErrors(validationErrors);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }
        try {
            const token = localStorage.getItem('token');

            if (token) {
             const response =   await axios.post(`${REACT_APP_API_ENDPOINT}/addcourses`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                    }
                });
                const userdata = response.data
                window.location.href = "/courses";
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

            }
        } catch (error) {
            toast.error(error.response.data.message,{
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
    }
    const handleDelete = async (coursesId) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
            const response =    await axios.delete(`${REACT_APP_API_ENDPOINT}/deletecourses/${coursesId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                fetchData(coursesId);
                const userdata = response.data
                window.location.href = "/courses";
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

            }
        } catch (error) {
            console.error('Error deleting data:', error);
            toast.error(error.response.data.message,{
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
    }
    const handleUpdate = async (e) => {
        e.preventDefault();
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }
        try {
            const token = localStorage.getItem('token');
            if (token) {
           const response =   await axios.patch(`${REACT_APP_API_ENDPOINT}/viewscourses/${coursesId}`, data, {
                    headers: {
                         'Content-Type': 'multipart/form-data',
                          Authorization: `Bearer ${token}`
                    }
                });
                fetchData(coursesId)
                const userdata  = response.data
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
                 window.location.href = "/courses";
            }
        } catch (error) {
            console.error('Error updating user:', error);
            toast.error(error.response.data.message,{
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
                                        <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer">
                                            <div class="row mx-2">
                                                <div class="col-md-2">
                                                    <div class="me-3">
                                                        <div class="dataTables_length" id="DataTables_Table_0_length">
                                                            <label>
                                                                <select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" 
                                                                class="form-select">
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
                                                                        <div class="dt-action-buttons text-xl-end text-lg-start 
                                                                        text-md-end text-start d-flex align-items-center 
                                                                        justify-content-end flex-md-row flex-column mb-3 mb-md-0">
                                                                            <div id="DataTables_Table_0_filter" class="dataTables_filter">
                                                                                <label>
                                            <input type="search" class="form-control" placeholder="Search.." aria-controls="DataTables_Table_0" />
                                            </label>
                                            </div>
                                            <div class="btn-group d-flex flex-row">
                                                    <button class="btn buttons-collection dropdown-toggle btn-label-secondary mx-3 d-flex" 
                                                    tabindex="0" aria-controls="DataTables_Table_0" type="button" aria-haspopup="dialog" 
                                                    aria-expanded="false">
                                                    <span><i class="bx bx-export me-1"></i>Export</span>
                                                    </button>
                                                  
                                                    <button class="btn btn-secondary add-new btn-primary d-flex cus_Add" tabindex="0" aria-controls="DataTables_Table_0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasAddUser">
                                                   
                                                    <span><i class="bx bx-plus me-0 me-sm-1"></i>Class/Course</span>
                                                    </button>
                                                 </div>
                                            </div>
                                            </div>
                                            </div>
                                            <table class="datatables-users table border-top dataTable no-footer dtr-column" id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info" width="1390px;">
                                                <thead>
                                                    <tr>
                                                        <th class="control sorting_disabled dtr-hidden" rowspan="1" colspan="1" aria-label="" width="20px;"></th>
                                                        <th class="sorting sorting_desc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="250px;" aria-label="User: activate to sort column ascending" aria-sort="descending">S.NO</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="250px;" aria-label="Role: activate to sort column ascending">Classes / Course</th>
                                                        <th class="sorting_disabled" rowspan="1" colspan="1" width="250px;" aria-label="Actions">Actions</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {table.map((item, index) => (
                                                        <tr key={item.id}>
                                                            <td class="sorting_1">

                                                            </td>
                                                            <td>{index + 1}</td>
                                                            <td>{item.name}</td>

                                                            <td>
                                                                <div class="d-inline-block text-nowrap">
                                                                    <Link to={`/courses/${item.id}`} className="navbar-brand" >  <button class="btn btn-sm btn-icon" data-bs-target="#editUser" data-bs-toggle="modal">
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

                                    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasAddUser" aria-labelledby="offcanvasAddUserLabel">
                                        <div class="offcanvas-header">
                                            <h5 id="offcanvasAddUserLabel" class="offcanvas-title"> New Class / Course</h5>
                                            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                        </div>
                                        <div class="offcanvas-body mx-0 flex-grow-0">
                                            <form class="add-new-user pt-0 fv-plugins-bootstrap5 fv-plugins-framework" id="addNewUserForm" onSubmit={handleSubmit} novalidate="novalidate">


                                                <div class="mb-3 fv-plugins-icon-container">
                                                    <label class="form-label" for="add-user-fullname"> Name</label>
                                                    <input type="text" class="form-control" id="add-user-fullname" placeholder="Class" name='name'
                                                        value={formData.name} aria-label="John Doe" onChange={handleChange} />
                                                        {errors.name && <div className='errors'>{errors.name}</div>}
                                                    <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                </div>
                                                <div class="mb-3 fv-plugins-icon-container">
                                                    <label class="form-label" for="add-user-fullname"> Price</label>
                                                    <input type="number" class="form-control" id="add-user-fullname" placeholder="Class Price" name='CoursePrice'
                                                        value={formData.CoursePrice} onChange={handleChange} />
                                                         {errors.CoursePrice && <div className='errors'>{errors.CoursePrice}</div>}
                                                    <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                </div>
                                                <div class="mb-3 fv-plugins-icon-container">
                                                    <label class="form-label" for="add-user-fullname"> Duration (Days)</label>
                                                    <input type="number" class="form-control" id="add-user-fullname" placeholder="Class Duration" name='CourseDuration'
                                                        value={formData.CourseDuration} onChange={handleChange} />
                                                         {errors.CourseDuration && <div className='errors'>{errors.CourseDuration}</div>}
                                                    <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                </div>
                                                <div class="mb-3 fv-plugins-icon-container">
                                                    <label for="exampleFormControlSelect2" class="form-label">Category</label>
                                                    <select id="exampleFormControlSelect2" class="select2 form-select" name="CourseCategoryId" defaultValue={formData.CourseCategoryId} onChange={handleChange}>
                                                        <option value="">Select</option>
                                                        {category.map((option) => (
                                                            <option key={option.id} value={option.id}>{option.name}</option>
                                                        ))}
                                                    </select>
                                                    {errors.CourseCategoryId && <div className='errors'>{errors.CourseCategoryId}</div>}
                                                </div>
                                                <div class="mb-3 fv-plugins-icon-container">
                                                <label class="form-label">Upload Image</label>
                                                        <input
                                                           type="file"
                                                           class="form-control"
                                                           id="inputGroupFile04"
                                                           aria-describedby="inputGroupFileAddon04"
                                                           aria-label="Upload"
                                                            name="file"
                                                             value={formData.CourseUplod} onChange={handleChange}
                                                        />
                                                         {errors.file && <div className='errors'>{errors.file}</div>}

                                                </div>
                                                <div class="mb-3 fv-plugins-icon-container">
                                                    <label class="form-label" for="add-user-fullname">About</label>
                                                    <input type="text" class="form-control" id="add-user-fullname" placeholder="About Class" name='AboutCourse'
                                                        value={formData.AboutCourse} onChange={handleChange} />
                                                         {errors.AboutCourse && <div className='errors'>{errors.AboutCourse}</div>}
                                                    <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                </div>
                                                <div class="mb-3 fv-plugins-icon-container">
                                                    <label class="form-label" for="add-user-fullname">Description</label>
                                                    <input type="text" class="form-control" id="add-user-fullname" placeholder="Description" name='Description'
                                                        value={formData.Description}  onChange={handleChange} />
                                                         {errors.Description && <div className='errors'>{errors.Description}</div>}
                                                    <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                </div>
                                                <div className='mt-3 d-flex'>
                                                <button type="submit" class="btn btn-primary me-sm-3 me-1 data-submit">Submit</button>
                                                <button type="reset" class="btn btn-label-secondary" data-bs-dismiss="offcanvas">Cancel</button>
                                                </div>
                                               
                                                <input type="hidden" /></form>
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
                                                    <h3 style={{marginTop:'-40px'}}>Edit Information</h3>
                                                    <p>Updating  details will receive a privacy audit.</p>
                                                </div>
                                                <form id="editUserForm" className="row g-3 fv-plugins-bootstrap5 fv-plugins-framework" onSubmit={handleUpdate} novalidate="novalidate">
                                                    <div class="col-12 fv-plugins-icon-container">
                                                        <label class="form-label" for="modalEditUserFirstName">Name</label>
                                                        <input type="text" id="modalEditUserFirstName" name='name' class="form-control" placeholder="Class"
                                                            value={formData.name} onChange={handleChange}
                                                        />
                                                        <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div></div>

                                                    <div class="col-12 fv-plugins-icon-container">
                                                        <label class="form-label" for="add-user-fullname"> Price</label>
                                                        <input type="number" class="form-control" id="add-user-fullname" placeholder="Class Price" name='CoursePrice'
                                                            value={formData.CoursePrice} onChange={handleChange} />
                                                        <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                    </div>
                                                    <div class="mb-3 fv-plugins-icon-container">
                                                        <label class="form-label" for="add-user-fullname"> Duration (Days)</label>
                                                        <input type="number" class="form-control" id="add-user-fullname" placeholder="Class Duration" name='CourseDuration'
                                                            value={formData.CourseDuration} onChange={handleChange} />
                                                        <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                    </div>

                                                    <div class="col-12 fv-plugins-icon-container">
                                                        <label for="exampleFormControlSelect2" class="form-label">Category</label>
                                                        <select id="exampleFormControlSelect2" class="select2 form-select" name="CourseCategoryId" value={formData.CourseCategoryId} onChange={handleChange}>
                                                            <option value="">Select</option>
                                                            {category.map((option) => (
                                                                <option key={option.id} value={option.id}>{option.name}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div class="col-12 fv-plugins-icon-container">
                                                       <label class="form-label">Upload Video</label>
                                                        <input
                                                           type="file"
                                                           class="form-control"
                                                           id="inputGroupFile04"
                                                           aria-describedby="inputGroupFileAddon04"
                                                           aria-label="Upload"
                                                            name="file"
                                                             value={formData.CourseUplod} onChange={handleChange}
                                                        />

                                                </div>
                                                <div class="mb-3 fv-plugins-icon-container">
                                                    <label class="form-label" for="add-user-fullname">About</label>
                                                    <input type="text" class="form-control" id="add-user-fullname" placeholder="About Class" name='AboutCourse'
                                                        value={formData.AboutCourse} onChange={handleChange} />
                                                    <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                </div>
                                                <div class="mb-3 fv-plugins-icon-container">
                                                    <label class="form-label" for="add-user-fullname">Description</label>
                                                    <input type="text" class="form-control" id="add-user-fullname" placeholder="Description" name='Description'
                                                        value={formData.Description}  onChange={handleChange} />
                                                    <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                </div>
                                                    <div class="col-12 text-center d-flex">
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
            <ToastContainer />
        </>
    )
}
export default CoursesP
