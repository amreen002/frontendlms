import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from './footerComponent';
import Navbar from './navComponemt';
import DashBoardMenus from './dashboardsMenuComponent';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import ValidationLession from '../validation/lessionvalidation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const { REACT_APP_API_ENDPOINT } = process.env;
function Topic() {
    const { lessionId } = useParams();
    const navigate = useNavigate();
    const [courses, setCourse] = useState([]);
    const [table, setLession] = useState([]);
    const [Topic, setTopic] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState('');
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [findOnelession, setFindOneLession] = useState({})
    const [files, setFiles] = useState([])
    const [removedFiles, setRemovedFiles] = useState([]);
    const [urlIdModel, seturlid] = useState('')
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // Track total pages for pagination

    useEffect(() => {
        fetchData(page);
    }, [page]);

    useEffect(() => {
        fetchData(lessionId);
    }, [lessionId])

    useEffect(() => {
        fetchData1();
        fetchData2();
        fetchData3()
    }, []);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    }

    const handleCourseChange = async (e) => {
        const selectedCoursesId = parseInt(e.target.value);
        const selectedCourse = courses.find(course => course.id === selectedCoursesId);
        setFormData({
            ...formData,
            CoursesId: selectedCoursesId,
            TopicId: '' // Reset topic selection
        });
        setSelectedCourses(selectedCourse);
        if (selectedCoursesId) {
            fetchData3(selectedCoursesId);
        }
    };
    const fetchData = async (lessionId) => {
        try {

            if (!lessionId) {
                console.log("moduleId is undefined");
                return;
            }
            const token = localStorage.getItem('token');
            if (token) {
                const lessonResponse = await axios.get(`${REACT_APP_API_ENDPOINT}/lession/${lessionId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                });
                const lessonData = lessonResponse.data.lession;
                setFindOneLession(lessonData)
                setFormData({
                    LessionTitle: lessonData.LessionTitle,
                    CoursesId: lessonData.CoursesId,
                    TopicId: lessonData.TopicId,
                    LessionUpload: null,
                });

                if (lessonData.CoursesId) {
                    fetchData2(lessonData.CoursesId);
                }

            }
        } catch (error) {
            console.error('Failed to fetch initial data:', error);
        }
    };

    const fetchData1 = async (page = 1) => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/lession?page=${page}`, {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                });
                const userData = response.data.lession.rows;
                setLession(userData)
                setTotalPages(response.data.lession.totalPage ||1); // Ensure totalPages has a default value
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

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
                setCourse(userData)
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchData3 = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/topic`, {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                });
                const userData = response.data.topic;
                setTopic(userData)
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const [formData, setFormData] = useState({
        LessionTitle: "",
        CoursesId: "",
        TopicId: "",
        LessionUpload: [],
    });
    const [errors,setErrors] =useState({})

    const handleChange = (e) => {
        const { name,value} = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value,

        }));
        const updatedFormData = { ...formData, [name]: value };
        setFormData(updatedFormData);
    
        // Validate the updated form data
        const validationErrors = ValidationLession(updatedFormData);
        setErrors(validationErrors);

    };

    useEffect(() => {
        if (findOnelession?.LessionUpload) {
            setFiles(findOnelession.LessionUpload.map(file => ({ ...file, isNew: false })));
        }
    }, [findOnelession]);

    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
        const newFiles = Array.from(event.target.files).map(file => ({
            path: file.path,
            name: file.name,
            isNew: true,
            file // Store the file object for later upload
        }));
        setFiles(prevFiles => [...prevFiles, ...newFiles]);
    };

    const handleRemoveFile = (index) => {
        const fileToRemove = files[index];
        if (!fileToRemove.isNew) {
            setRemovedFiles(prev => [...prev, fileToRemove.path]);
        }
        setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();

        // Append files to FormData
        if (selectedFiles) {
          for (let i = 0; i < selectedFiles.length; i++) {
            data.append('files', selectedFiles[i]);
          }
        }
    
        // Append other form data
        for (const key in formData) {
          data.append(key, formData[key]);
        }
    
        try {
            const token = localStorage.getItem('token');

            if (token) {

             const response =   await axios.post(`${REACT_APP_API_ENDPOINT}/lession`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                    }
                });

                window.location.href = "/lession";
                const userdata = response.data
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
    const handleDelete = async (lessionId) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
              const response=  await axios.delete(`${REACT_APP_API_ENDPOINT}/lession/${lessionId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                fetchData(lessionId)
                const userdata = response.data
                window.location.href = "/lession";
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
                position: "top-center",
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

        files.forEach(file => {
            if (file.isNew) {
                data.append('files', file.file);
            }
        });
        data.append('removedFiles', JSON.stringify(removedFiles));
        // Append other form data
        for (const key in formData) {
            data.append(key, formData[key]);
        }
  
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response =   await axios.patch(`${REACT_APP_API_ENDPOINT}/lession/${lessionId}`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                    }
                });
                fetchData(lessionId)
                const userdata = response.data
                toast.success(userdata.message,{
                    position: "top-center",
                    autoClose: true,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    
                 });

                window.location.href = "/lession";;
            }
        } catch (error) {
            console.error('Error updating lesson:', error);
            toast.error(error.response.data.message,{
                position: "top-center",
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



                            <div class="container-fluid flex-grow-1 container-p-y">



                                <div class="row g-4 mb-4">
                                    <div className='col-sm-3 col-xl-3 col-lg-3 col-md-3'>
                                        <div class="card">
                                            <div class="card-body">
                                                <div class=" align-items-start justify-content-between">
                                                    <div class="content-left">
                                                        <h3>Add Module</h3>
                                                        <div class=" mx-0">
                                                            <form class="add-new-user pt-0 fv-plugins-bootstrap5 fv-plugins-framework" id="addNewUserForm" onSubmit={handleSubmit} novalidate="novalidate">


                                                                <div class="mb-3 fv-plugins-icon-container">
                                                                    <label class="form-label" for="add-user-fullname">Module Name</label>
                                                                    <input type="text" class="form-control" id="add-user-fullname" placeholder="Module" name='LessionTitle'
                                                                        value={formData.LessionTitle} aria-label="John Doe" onChange={handleChange} />
                                                                        {errors.LessionTitle && <div className='errors'>{errors.LessionTitle}</div>}
                                                                    <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                                </div>


                                                                <div class="mb-3 fv-plugins-icon-container">
                                                                    <label for="exampleFormControlSelect2" class="form-label">Select Class / Course</label>
                                                                    <select id="exampleFormControlSelect2" class="select2 form-select" name="CoursesId" value={formData.CoursesId} onChange={handleCourseChange}>
                                                                        <option value="Select">Select</option>
                                                                        {courses.map((option) => (
                                                                            <option key={option.id} value={option.id}>{option.name}</option>
                                                                        ))}
                                                                    </select>
                                                                    {errors.CoursesId && <div className='errors'>{errors.CoursesId}</div>}
                                                                </div>


                                                                <div class="mb-3 fv-plugins-icon-container">
                                                                    <label for="exampleFormControlSelect2" class="form-label">Select Subject</label>
                                                                    <select id="exampleFormControlSelect2" class="select2 form-select" name="TopicId" value={formData.TopicId} onChange={handleChange}>
                                                                        <option value="">Select</option>
                                                                        {selectedCourses && selectedCourses.Topics.map(topic => (
                                                                            <option key={topic.id} value={topic.id}>{topic.name}</option>
                                                                        ))}
                                                                    </select>
                                                                    {errors.TopicId && <div className='errors'>{errors.TopicId}</div>}
                                                                </div>

                                                                <div class="mb-3">
                                                                    <label for="exampleFormControlSelect2" class="form-label">Upload Module PDF</label>
                                                                    <div class="input-group">
                                                                        <input
                                                                            type="file"
                                                                            class="form-control"
                                                                            id="inputGroupFile04"
                                                                            aria-describedby="inputGroupFileAddon04"
                                                                            aria-label="Upload"
                                                                            name="file"
                                                                            multiple onChange={handleFileChange} />
                                                                         {errors.file && <div className='errors'>{errors.file}</div>}
                                                                           

                                                                    </div>
                                                                </div>
                                                                <div class="mb-3">
                                                                    <Editor
                                                                        apiKey='exts6nr12i36iql71yx4ho3on1mhmj48cv5o8anbtk8xzn59'
                                                                        init={{
                                                                            plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker',
                                                                            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                                                                        }}
                                                                        initialValue="Welcome to TinyMCE!"
                                                                    />
                                                                </div>
                                                                <div class="mb-3 fv-plugins-icon-container">
                                                                    <button type="submit" class="btn btn-primary me-sm-3 me-1 data-submit">Submit</button>

                                                                </div>
                                                                <input type="hidden" /></form>

                                                        </div>
                                                    </div>
                                                    {/*     <div class="avatar">
                                                        <span class="avatar-initial rounded bg-label-primary">
                                                            <i class="bx bx-user bx-sm"></i>
                                                        </span>
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="col-sm-9 col-xl-9 col-lg-9 col-md-9">
                                        <div className="card">
                                            <div class="card-header border-bottom">
                                                <h5 class="card-title">List All Modules</h5>
                                                <div class="d-flex justify-content-between align-items-center row py-3 gap-3 gap-md-0">
                                                    <div class="col-md-4 user_role"><select id="UserRole" class="form-select text-capitalize"><option value=""> Select Role </option><option value="Admin">Admin</option><option value="Author">Author</option><option value="Editor">Editor</option><option value="Maintainer">Maintainer</option><option value="Subscriber">Subscriber</option></select></div>
                                                    <div class="col-md-4 user_plan"><select id="UserPlan" class="form-select text-capitalize"><option value=""> Select Plan </option><option value="Basic">Basic</option><option value="Company">Company</option><option value="Enterprise">Enterprise</option><option value="Team">Team</option></select></div>
                                                    <div class="col-md-4 user_status"><select id="FilterTransaction" class="form-select text-capitalize"><option value=""> Select Status </option><option value="Pending" class="text-capitalize">Pending</option><option value="Active" class="text-capitalize">Active</option><option value="Inactive" class="text-capitalize">Inactive</option></select></div>
                                                </div>
                                            </div>
                                            <div class="card-datatable table-responsive">
                                                <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer"><div class="row mx-2"><div class="col-md-2">
                                                    <div className="me-3">
                                                        <div className="dataTables_length" id="DataTables_Table_0_length">
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
                                                    </div><div class="col-md-10"><div class="dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0"><div id="DataTables_Table_0_filter" class="dataTables_filter"><label>
                                                    <input type="search" class="form-control" placeholder="Search.." aria-controls="DataTables_Table_0" /></label></div><div class="dt-buttons btn-group flex-wrap"> <div class="btn-group"><button class="btn buttons-collection dropdown-toggle btn-label-secondary mx-3" tabindex="0" aria-controls="DataTables_Table_0" type="button" aria-haspopup="dialog" aria-expanded="false"><span><i class="bx bx-export me-1"></i>Export</span></button></div><i class="bx bx-plus me-0 me-sm-1"></i> </div></div></div></div><table class="datatables-users table border-top dataTable no-footer dtr-column" id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info" width="1390px;">
                                                        <thead>
                                                            <tr>
                                                                <th class="control sorting_disabled dtr-hidden" rowspan="1" colspan="1" aria-label="" width="20px;"></th>
                                                                <th class="sorting sorting_desc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="100px;" aria-label="User: activate to sort column ascending" aria-sort="descending">Id</th>
                                                                <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="270px;" aria-label="Role: activate to sort column ascending">Module</th>
                                                                <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="350px;" aria-label="Role: activate to sort column ascending">Class / Course</th>
                                                                <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="400px;" aria-label="Role: activate to sort column ascending">Subject</th>
                                                                <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="Role: activate to sort column ascending">Board</th>
                                                                <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="50px;" aria-label="Role: activate to sort column ascending">Duration</th>
                                                                <th class="sorting_disabled" rowspan="1" colspan="1" width="100px;" aria-label="Actions">Actions</th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {table.map((item, index) => (
                                                                <tr key={item.id}>
                                                                    <td class="sorting_1">

                                                                    </td>
                                                                    <td>{index + 1}</td>
                                                                    <td>{item.LessionTitle}</td>
                                                                    <td>{item.Course && item.Course.name}</td>
                                                                    
                                                                    <td>        <div class="d-flex flex-column justify-content-center">
                                                                               
                                                                                <span class="text-muted text-truncate mb-0 d-none d-sm-block">
                                                                                    <small>
                                                                                        <td className="left">
                                                                                            <div className='flex-row d-flex'>
                                                                                                <div className='ques1'>
                                                                                                {item.Topic && item.Topic.name}
                                                                                                </div>
                                                                                            </div>
                                                                                        </td></small>
                                                                                </span>
                                                                            </div></td>
                                                                    <td>{item.Course && item.Course.Category && item.Course.Category.name}</td>
                                                                    <td><Link to={'#'}>{item.Course && item.Course.CourseDuration} Days</Link></td>
                                                                    <td>
                                                                        <div class="d-inline-block text-nowrap">
                                                                            <Link to={`/lession/${item.id}`} className="navbar-brand" >  <button class="btn btn-sm btn-icon" data-bs-target="#editUser" data-bs-toggle="modal">
                                                                                <i class="bx bx-edit"></i>

                                                                            </button>
                                                                            </Link>
                                                                            <button class="btn btn-sm btn-icon delete-record" onClick={() => handleDelete(item.id)}>
                                                                                <i class="bx bx-trash"></i>
                                                                            </button>
                                                                            <button class="btn btn-sm btn-icon delete-record">
                                                                                <i class="bx bx-eye"></i>
                                                                            </button>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                    <div className="row mx-2">
                                                        <div className="col-sm-12 col-md-6">
                                                            <div className="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">
                                                                Showing {((page - 1) * 10) + 1} to {Math.min(page * 10, totalPages * 10)} of {totalPages * 10} entries
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-12 col-md-6">
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
                                                    <h3>Edit Information</h3>
                                                    <p>Updating  details will receive a privacy audit.</p>
                                                </div>
                                                <form id="editUserForm" className="row g-3 fv-plugins-bootstrap5 fv-plugins-framework" onSubmit={handleUpdate} novalidate="novalidate">

                                                    <div class="mb-3 fv-plugins-icon-container">
                                                        <label class="form-label" for="add-user-fullname">Module Name</label>
                                                        <input type="text" class="form-control" id="add-user-fullname" placeholder="Module" name='LessionTitle'

                                                            value={formData.LessionTitle}
                                                            onChange={handleChange} />
                                                        <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                    </div>

                                                    <div class="mb-3">
                                                        <label for="exampleFormControlSelect2" class="form-label">Select Class / Course</label>
                                                        <select id="exampleFormControlSelect2" class="select2 form-select" name="CoursesId"
                                                            value={formData.CoursesId}
                                                            onChange={handleCourseChange}>
                                                            <option value="">Select</option>
                                                            {courses.map((option) => (
                                                                <option key={option.id} value={option.id}>{option.name}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div class="mb-3">
                                                        <label for="exampleFormControlSelect2" class="form-label">Select Subject</label>
                                                        <select id="exampleFormControlSelect2" class="select2 form-select" name="TopicId" value={formData.TopicId} onChange={handleChange}>
                                                            <option value="">Select</option>
                                                            {selectedCourses && selectedCourses.Topics.map(topic => (
                                                                <option key={topic.id} value={topic.id}>{topic.name}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div class="mb-3">
                                                        <div class="input-group">
                                                            <input
                                                                type="file"
                                                                class="form-control"
                                                                id="inputGroupFile04"
                                                                aria-describedby="inputGroupFileAddon04"
                                                                aria-label="Upload"
                                                                multiple onChange={handleFileChange} />


                                                        </div>
                                                    </div>
                                                    <div className="d-flex flex-wrap">
                                                        {files.map((file, index) => (
                                                            <div key={index} className="col-12 col-md-6 col-lg-6 col-xl-6 mb-3">
                                                                <div className="card">
                                                                    <div className="card-body">
                                                                        <iframe
                                                                            src={`${process.env.REACT_APP_API_IMG}/${file.path}`}
                                                                            width="100%"
                                                                            height="300px"
                                                                            style={{ border: 'none' }}
                                                                        ></iframe>
                                                                        <button
                                                                            onClick={() => handleRemoveFile(index)}
                                                                            className="btn btn-danger mt-2 w-100"
                                                                        >
                                                                            Remove
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div class="mb-3">
                                                        <Editor
                                                            apiKey='exts6nr12i36iql71yx4ho3on1mhmj48cv5o8anbtk8xzn59'
                                                            init={{
                                                                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker',
                                                                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                                                            }}
                                                            initialValue="Welcome to TinyMCE!"
                                                        />
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
export default Topic
