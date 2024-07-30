import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from './footerComponent';
import Navbar from './navComponemt';
import DashBoardMenus from './dashboardsMenuComponent';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import ValidationVideo from '../validation/videovalidation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
const { REACT_APP_API_ENDPOINT ,REACT_APP_API_IMG} = process.env;
function Video() {
    const { videoId } = useParams();
    const navigate = useNavigate();
    const [courses, setCourse] = useState([]);
    const [table, setVideo] = useState([]);
    const [Topic, setTopic] = useState([]);
    const [findOnevideo, setfindOnevido] = useState({})
    const [selectedCourses, setSelectedCourses] = useState('');
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [files, setFiles] = useState([])
    const [removedFiles, setRemovedFiles] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // Track total pages for pagination

    useEffect(() => {
        fetchData(page);
    }, [page]);

    useEffect(() => {
        fetchData(videoId);
    }, [videoId]);

    useEffect(() => {
        fetchData1();
        fetchData2();
        fetchData3()
    }, []);

    const [selectedvideo, setselectedvideo] = useState('');

    const handleSelectVideo = (e) => {
        const value = e.target.value;
        setselectedvideo(value);
    };

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
    }
    
    const fetchData = async (videoId) => {
        try {

            if (!videoId) {
                console.log("lessionId is undefined");
                return;
            }
            const token = localStorage.getItem('token');
            if (token) {
                const lessonResponse = await axios.get(`${REACT_APP_API_ENDPOINT}/video/${videoId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                });
                const lessonData = lessonResponse.data.video;
                setfindOnevido(lessonData)
                setFormData({
                    Title: lessonData.Title,
                    CoursesId: lessonData.CoursesId,
                    TopicId: lessonData.TopicId,
                    VideoUplod: null,
                    VideoIframe: lessonData.VideoIframe,
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
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/video?page=${page}`, {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                });
                const userData = response.data.video.rows;
                setVideo(userData)
                setTotalPages(response.data.video.totalPage ||1); // Ensure totalPages has a default value
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
        Title: '',
        CoursesId: '',
        TopicId: '',
        VideoUplod: [],
        VideoIframe: '',
    });

    const [errors ,setErrors] =useState({})
    useEffect(() => {
        if (findOnevideo?.VideoUplod) {
            setFiles(findOnevideo.VideoUplod.map(file => ({ ...file, isNew: false })));
        }
    }, [findOnevideo]);

    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files) 
        const newFiles = Array.from(event.target.files).map(file => ({
            path: file.path,
            name: file.name,
            isNew: true,
            file // Store the file object for later upload
        }));
        setFiles(prevFiles => [...prevFiles, ...newFiles]);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name] : value
        }));
        const updatedFormData = { ...formData, [name]: value };
        setFormData(updatedFormData);
    
        // Validate the updated form data
        const validationErrors = ValidationVideo(updatedFormData);
        setErrors(validationErrors);
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
        for (const key in formData) {
            data.append(key, formData[key]);
        }
        try {
            const token = localStorage.getItem('token');

            if (token) {

             const response =   await axios.post(`${REACT_APP_API_ENDPOINT}/video`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                    }
                });

                window.location.href = "/video";
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
    const handleDelete = async (videoId) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
             const response =   await axios.delete(`${REACT_APP_API_ENDPOINT}/video/${videoId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                window.location.href = "/video";
                const userdata=response.data
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
        files.forEach(file => {
            if (file.isNew) {
                data.append('files', file.file);
            }
        });
        data.append('removedFiles', JSON.stringify(removedFiles));
        for (const key in formData) {
            data.append(key, formData[key]);
        }
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.patch(`${REACT_APP_API_ENDPOINT}/video/${videoId}`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                    }
                });
                fetchData(videoId)
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

                window.location.href = '/video'
            }
        } catch (error) {
            console.error('Error updating video:', error);
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



                            <div class="container-fluid flex-grow-1 container-p-y">



                                <div class="row g-4 mb-4">
                                    <div className='col-sm-3 col-xl-3 col-lg-3 col-md-3'>
                                        <div class="card">
                                            <div class="card-body">
                                                <div class=" align-items-start justify-content-between">
                                                    <div class="content-left">
                                                        <h3>Add Content</h3>
                                                        <div class="offcanvas-body mx-0">
                                                            <form class="add-new-user pt-0 fv-plugins-bootstrap5 fv-plugins-framework" id="addNewUserForm" onSubmit={handleSubmit} novalidate="novalidate">


                                                                <div class="mb-3 fv-plugins-icon-container">
                                                                    <label class="form-label" for="add-user-fullname">Content Name</label>
                                                                    <input type="text" class="form-control" id="add-user-fullname" placeholder="John Doe" name='Title'
                                                                        value={formData.Title} aria-label="John Doe" onChange={handleChange} />
                                                                        {errors.Title && <div className='errors'>{errors.Title}</div>}
                                                                    <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                                </div>


                                                                <div class="mb-3 fv-plugins-icon-container">
                                                                    <label for="exampleFormControlSelect2" class="form-label">Select Class / Course</label>
                                                                    <select id="exampleFormControlSelect2" class="select2 form-select" name="CoursesId" value={formData.CoursesId} onChange={handleCourseChange}>
                                                                        <option value="">Select</option>
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
                                                                <div class="mb-3 fv-plugins-icon-container">
                                                                    <label for="exampleFormControlSelect2" class="form-label">Select Video</label>
                                                                    <select
                                                                        id="exampleFormControlSelect2"
                                                                        className="select2 form-select"
                                                                        name="videoselect"
                                                                        onChange={handleSelectVideo}
                                                                    >
                                                                        <option value="">Select Video Source</option>
                                                                        <option value="gallery">Video URL</option>
                                                                        <option value="upload">Choose From Gallery</option>
                                                                    </select>
                                                                    {errors.videoselect && <div className='errors'>{errors.videoselect}</div>}


                                                                    {selectedvideo === 'upload' ? (<div class="mb-3">
                                                                        <label class="form-label">Upload Video</label>
                                                                        <div class="input-group">
                                                                        <input
                                                                            type="file"
                                                                            class="form-control"
                                                                            id="inputGroupFile04"
                                                                            aria-describedby="inputGroupFileAddon04"
                                                                            aria-label="Upload"
                                                                            multiple onChange={handleFileChange} />
                                                                    {errors.file && <div className='errors'>{errors.file}</div>}
                                         


                                                                        </div>
                                                                    </div>) : selectedvideo === 'gallery' ? (
                                                                        <div class="mb-3" data-quillbot-parent="oopPrLVIHzQ4Ey_EnMuDh">
                                                                            <label class="form-label">Video Url</label>
                                                                            <textarea id="full-featured-non-premium" name="VideoIframe" value={formData.VideoIframe} onChange={handleChange} class="form-control w-100" data-gramm="false" wt-ignore-input="true" data-quillbot-element="oopPrLVIHzQ4Ey_EnMuDh"></textarea>

                                                                        </div>
                                                                    ) : ''
                                                                    }


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
                                        <div class="card">
                                            <div class="card-datatable table-responsive">
                                                <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer"><div class="card-header d-flex flex-wrap py-0"><div class="me-5 ms-n2 pe-5">
                                                    <div id="DataTables_Table_0_filter" class="dataTables_filter"><label>
                                                        <input type="search" class="form-control" placeholder="Search Category" aria-controls="DataTables_Table_0" /></label></div></div>
                                                    <div class="d-flex justify-content-start justify-content-md-end align-items-baseline">
                                                        <div class="dt-action-buttons d-flex align-items-start align-items-md-center justify-content-sm-center mb-3 mb-sm-0 gap-3 pt-0">
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
                                                                <div class="dt-buttons btn-group flex-wrap">

                                                            </div></div></div></div><table class="datatables-category-list table border-top dataTable no-footer dtr-column" id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info" width="1390px;">
                                                        <thead>
                                                            <tr><th class="control sorting_disabled dtr-hidden" rowspan="1" colspan="1" style={{ width: "0px", display: "none" }} aria-label=""></th>

                                                                <th class="sorting sorting_desc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="678px;" aria-label="Categories: activate to sort column ascending" aria-sort="descending">Content</th>
                                                                <th class="text-nowrap text-sm-end sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="201px;" aria-label="Total Products &amp;nbsp;: activate to sort column ascending">Title  &nbsp;</th>
                                                                {/*  <th class="text-nowrap text-sm-end sorting_disabled" rowspan="1" colspan="1" width="172px;" aria-label="Duration">Duration</th> */}
                                                                <th class="text-lg-center sorting_disabled" rowspan="1" colspan="1" width="113px;" aria-label="Actions">Actions</th></tr>

                                                        </thead>
                                                        <tbody>
                                                            {table.map((item, index) => (
                                                                <tr class="odd">
                                                                    <td class="  control" tabindex="0" style={{ display: "none" }}></td>

                                                                    <td class="sorting_1">
                                                                        <div class="d-flex align-items-center">
                                                                            <div class="avatar-wrapper  test-demo-class me-6 rounded-2">
                                                                                <div class="avatar" style={{
                                                                                    width: "7.375rem",
                                                                                    height: "4.375rem"
                                                                                }}>
                                                                                    <video src={`${REACT_APP_API_IMG}/${item.VideoUplod}`} width="100%" controls="controls" autoplay muted>
                                                                                    </video>
                                                                                </div>
                                                                            </div>
                                                                            <div class="d-flex flex-column justify-content-center">
                                                                                <span class="text-body text-wrap fw-medium">{item.Course && item.Course.name}</span>
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
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div class="fw-medium text-sm-end">{item.Title}</div>
                                                                    </td>

                                                                    {/*   <td>
                                                                        <div class="fw-medium text-sm-end">{item.createdAt}</div>
                                                                    </td> */}
                                                                    <td>
                                                                        <div class="d-inline-block text-nowrap">
                                                                            <Link to={`/video/${item.id}`} className="navbar-brand" >  <button class="btn btn-sm btn-icon" data-bs-target="#editUser" data-bs-toggle="modal">
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
                                                        <label class="form-label" for="add-user-fullname">Content Name</label>
                                                        <input type="text" class="form-control" id="add-user-fullname" placeholder="Content" name='Title'

                                                            value={formData.Title}
                                                            onChange={handleChange} />
                                                        <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                    </div>

                                                    <div class="mb-3">
                                                        <label for="exampleFormControlSelect2" class="form-label">Select Class</label>
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
                                                        <select id="exampleFormControlSelect2" class="select2 form-select" name="TopicId"
                                                            value={formData.TopicId} onChange={(e) => setFormData({ ...formData, TopicId: e.target.value })}
                                                        >
                                                            <option value="">Select</option>
                                                            {selectedCourses && selectedCourses.Topics.map(topic => (
                                                                <option key={topic.id} value={topic.id}>{topic.name}</option>
                                                            ))}
                                                        </select>
                                                    </div>



                                                    <div class="mb-3">
                                                        <label class="form-label">Upload Video</label>
                                                        <div class="input-group">
                                                            <input
                                                                type="file"
                                                                class="form-control"
                                                                id="inputGroupFile04"
                                                                aria-describedby="inputGroupFileAddon04"
                                                                aria-label="Upload"
                                                                multiple onChange={handleFileChange}
                                                            />

                                                        </div>
                                                    </div>
                                                    <div class="mb-3" data-quillbot-parent="oopPrLVIHzQ4Ey_EnMuDh">
                                                        <label class="form-label">Video Url</label>
                                                        <textarea id="full-featured-non-premium" name="VideoIframe" value={formData.VideoIframe} onChange={handleChange} class="form-control w-100" data-gramm="false" wt-ignore-input="true" data-quillbot-element="oopPrLVIHzQ4Ey_EnMuDh"></textarea>
                                                    </div>

                                                    <div className="d-flex flex-wrap">
                                                        {files.map((file, index) => (
                                                            <div key={index} className="col-12 col-md-6 col-lg-4 col-xl-3 mb-3 d-flex flex-column align-items-center" style={{ marginRight: "70px" }}
                                                            >
                                                                <div className="card" style={{ width: '100%' }}>
                                                                    <iframe
                                                                        src={`${process.env.REACT_APP_API_IMG}/${file.path}`}
                                                                        width="100%"
                                                                        height="150px"
                                                                        style={{ border: 'none' }}
                                                                        title={`File ${index}`}
                                                                    ></iframe>
                                                                    <div className="card-body text-center">
                                                                        <button
                                                                            onClick={() => handleRemoveFile(index)}
                                                                            className="btn btn-danger"
                                                                        >
                                                                            Remove
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
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
export default Video
