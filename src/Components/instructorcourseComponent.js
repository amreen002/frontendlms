import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, } from 'react-router-dom';
import Navbarmenu from "./Navbarmenu";
import { Editor } from '@tinymce/tinymce-react';
import ValidationInstructorcourse from '../validation/instructorcourseValidation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
const { REACT_APP_API_ENDPOINT } = process.env;
const InstructorCourseadd = () => {
    const { coursesId } = useParams();
    const [userData, setUserData] = useState({});
    const [courses, setCourse] = useState([]);
    const [category, setCategory] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState('');
    const [selectedvideo, setselectedvideo] = useState('');
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [formStepsNum, setFormStepsNum] = useState(1);
    const handleSelectVideo = (e) => {
        const value = e.target.value;
        setselectedvideo(value);
    };
    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
    };
    useEffect(() => {
        fetchData(coursesId);
    }, [coursesId]);

    useEffect(() => {
        fetchData1();
        fetchData2();
    }, []);



    //Dropdown Navigation
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleDropdown = (serviceName) => {
        setIsExpanded(isExpanded === serviceName ? '' : serviceName);
    };

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
                setFormDataCourse({
                    name: userData.name,
                    CoursePrice: userData.CoursePrice,
                    CourseCategoryId: userData.CourseCategoryId,
                    CourseDuration: userData.CourseDuration,
                    CourseUplod: null,
                    AboutCourse: userData.AboutCourse,
                    Description: userData.Description,
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
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/courses`, {
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

    // course add start

    const [formDataCourse, setFormDataCourse] = useState({
        name: '',
        CoursePrice: '',
        CourseDuration: '',
        CourseCategoryId: '',
        CourseUplod: null,
        AboutCourse: '',
        Description: '',
    });

    // topic start add

    const [formDataTopic, setFormDataTopic] = useState({
        name: '',
        CoursesId: ''
    });

    // lession start add

    let [formDataLession, setFormDataLession] = useState({
        LessionTitle: "",
        CoursesId: "",
        TopicId: "",
        LessionUpload: [],

    });

    // video start add 

    let [formDataVideo, setFormDataVideo] = useState({
        Title: '',
        CoursesId: '',
        TopicId: '',
        VideoUplod: [],
        VideoIframe: '',
    });


    // end video 

    // course start handleChangeCourse
    const handleChangeCourse = (e) => {
        const { name, files, value } = e.target;
        setFormDataCourse(formDataCourse => ({
            ...formDataCourse,
            [name]: files ? files[0] : value
        }));

    };

    const handleCourseChange = async (e) => {
        const selectedCoursesId = parseInt(e.target.value);
        const selectedCourse = courses.find(course => course.id === selectedCoursesId);
        setFormDataLession({
            ...formDataLession,
            CoursesId: selectedCoursesId,
            TopicId: '' // Reset topic selection
        });
        setFormDataVideo({
            ...formDataVideo,
            CoursesId: selectedCoursesId,
            TopicId: '' // Reset topic selection
        });
        setSelectedCourses(selectedCourse);
        if (selectedCourse) {
            fetchData1(selectedCoursesId);

        }

    };


    // topic start handleChangeTopic
    const handleChangeTopic = (e) => {
        const { name, value } = e.target;
        setFormDataTopic({
            ...formDataTopic,
            [name]: value,
        });
    };

    // lession start handleChangeLession
    const handleChangeLession = (e) => {
        const { name, value } = e.target;
        setFormDataLession(formDataLession => ({
            ...formDataLession,
            [name]: value
        }));
    };
    // video start handleChangeVideo
    const handleChangeVideo = (e) => {
        const { name, value } = e.target;
        setFormDataVideo(formDataVideo => ({
            ...formDataVideo,
            [name]: value
        }));
    };

    // course start handleSubmitCourse
    const handleSubmitCourse = async (e) => {
        e.preventDefault();
        const validationErrors = ValidationInstructorcourse(formDataCourse);

        const data = new FormData();
        for (const key in formDataCourse) {
            data.append(key, formDataCourse[key]);
        }
        // Assuming you have an API
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const userdata = await axios.post(`${REACT_APP_API_ENDPOINT}/addcourses`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                    }
                });

                toast.success(userdata.message, {
                    position: "top-right",
                    autoClose: true,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",

                });
                handleNext()
            }

        } catch (error) {
            toast.error(error.response?.data?.message, {
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
    // end course 

    // topic start handleSubmitTopic
    const handleSubmitTopic = async (e) => {
        e.preventDefault();
        // Assuming you have an API
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.post(`${REACT_APP_API_ENDPOINT}/topic`, formDataTopic, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const userdata = response.data
                toast.success(userdata.response, {
                    position: "top-right",
                    autoClose: true,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

                handleNext()

            }
        } catch (error) {
            toast.error(error.response.data.message, {
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
    // end topic 


    // lession start handleSubmitLession
    const handleSubmitLession = async (e) => {
        e.preventDefault();
        // Assuming you have an API
        const data = new FormData();
        // Append files to FormData
        if (selectedFiles) {
            for (let i = 0; i < selectedFiles.length; i++) {
                data.append('files', selectedFiles[i]);
            }
        }

        for (const key in formDataLession) {
            data.append(key, formDataLession[key]);
        }
        try {
            const token = localStorage.getItem('token');
            if (token) {

                let response = await axios.post(`${REACT_APP_API_ENDPOINT}/lession`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                    }
                });
                toast.success(response.message, {
                    position: "top-right",
                    autoClose: true,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",

                });

                handleNext()

            }

        } catch (error) {
            toast.error(error.response.data.message, {
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
    // end lession 


    // video start handleSubmitVideo
    const handleSubmitVideo = async (e) => {
        e.preventDefault();
        // Assuming you have an API
        const data = new FormData();
        // Append files to FormData
        if (selectedFiles) {
            for (let i = 0; i < selectedFiles.length; i++) {
                data.append('files', selectedFiles[i]);
            }
        }
        for (const key in formDataVideo) {
            data.append(key, formDataVideo[key]);
        }
        try {
            const token = localStorage.getItem('token');
            if (token) {

                const response = await axios.post(`${REACT_APP_API_ENDPOINT}/video`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                    }
                });
                window.location.href = '/createcourse'
                const userdata = response.data
                toast.success('All Data Submitted Successfully', {
                    position: "top-right",
                    autoClose: true,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",

                });
                handleNext()

            }


        } catch (error) {
            toast.error(error.response.data.message, {
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
    const handleNext = () => {
        if (formStepsNum < 4) {
            setFormStepsNum(formStepsNum + 1);
        }
    };

    const handlePrev = () => {
        if (formStepsNum > 1) {
            setFormStepsNum(formStepsNum - 1);
        }
    };

    /*    const validateCurrentStep = () => {
           // Validation logic for each step
           switch (formStepsNum) {
               case 1:
                   return validateTopic();
               case 2:
                   return validateLession();
               case 3:
                   return validateVideo();
               default:
                   return false;
           }
       };
       
       
       const validateTopic = () => {
           // Validate topic data
           return formDataTopic.name && formDataTopic.CoursesId;
       };
       
       const validateLession = () => {
           // Validate lession data
           return formDataLession.LessionTitle && formDataLession.CoursesId;
       };
       
       const validateVideo = () => {
           // Validate video data
           return formDataVideo.Title && (formDataVideo.VideoIframe || formDataVideo.file);
       };
        */
    const getProgressWidth = () => {
        return ((formStepsNum - 1) / (4 - 1)) * 100 + '%';
    };

    const isPrevDisabled = formStepsNum === 1;
    const isNextDisabled = formStepsNum === 4;
    return (
        <div>
            <section>
                <Navbarmenu />
            </section>

            <div className="rts-bread-crumbarea-1 rts-section-gap bg_image pt--110 pb--110">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-main-wrapper">
                                <h1 className="title ttl2">Add Class Details</h1>

                                <div className="pagination-wrapper">
                                    <a href={`/`}>Home</a>
                                    <i className="fa-regular fa-chevron-right"></i>
                                    <a className="active" href="create-course.html">Create Class</a>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="create-te-course-area-start ptb--100 bg-white">
                <div className="container">
                    <div className="row  g-5">
                        <div className="col-lg-8">

                            {/* Progress Bar */}
                            <div className="progress-container">
                                <div className={`progress ${formStepsNum > 1 ? 'active' : ''}`} style={{ width: getProgressWidth() }}></div>
                                <div className={`circle ${formStepsNum >= 2 ? 'active' : ''} ${formStepsNum > 2 ? 'checkmark-visible' : ''}`} data-title="Personal">
                                    {formStepsNum > 2 ? <span className="checkmark">✔</span> : '2'}
                                </div>
                                <div className={`circle ${formStepsNum >= 3 ? 'active' : ''} ${formStepsNum > 3 ? 'checkmark-visible' : ''}`} data-title="Contact">
                                    {formStepsNum > 3 ? <span className="checkmark">✔</span> : '3'}
                                </div>
                                <div className={`circle ${formStepsNum >= 4 ? 'active' : ''} ${formStepsNum > 4 ? 'checkmark-visible' : ''}`} data-title="Experiences">
                                    {formStepsNum > 4 ? <span className="checkmark">✔</span> : '4'}
                                </div>
                                <div className={`circle ${formStepsNum >= 1 ? 'active' : ''} ${formStepsNum > 1 ? 'checkmark-visible' : ''}`} data-title="Links">
                                    {formStepsNum > 1 ? <span className="checkmark">✔</span> : '1'}
                                </div>
                            </div>

                            {/* Form Steps */}
                            {formStepsNum === 1 && (
                                <form onSubmit={handleSubmitCourse} className="form-step active">
                                    <h3>Class / Course Informations</h3>
                                    <div className='row'>
                                        <div className="single-input col-md-6">
                                            <label htmlFor="name" className="form-label">Select Class / Course Title</label>
                                            <select
                                                id="exampleFormControlSelect2"
                                                className="select2 form-select"
                                                name="name"
                                                value={formDataCourse.name}
                                                onChange={handleChangeCourse}
                                            >
                                                <option value="">Class 6th/7th/8th/Course</option>
                                                {courses.map(option => (
                                                    <option key={option.name} value={option.name}>{option.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="single-input col-md-6">
                                            <label htmlFor="CoursePrice" className="form-label">Class/ Course Price</label>
                                            <input
                                                type="number"
                                                className="select2 form-select"
                                                placeholder="Class Price"
                                                name="CoursePrice"
                                                value={formDataCourse.CoursePrice}
                                                onChange={handleChangeCourse}
                                            />
                                        </div>
                                        <div className="single-input col-md-6">
                                            <label htmlFor="CourseDuration" className="form-label">Class/ Course Duration (Days)</label>
                                            <input
                                                type="number"
                                                className="select2 form-select"
                                                placeholder="Class Duration"
                                                name="CourseDuration"
                                                value={formDataCourse.CourseDuration}
                                                onChange={handleChangeCourse}
                                            />
                                        </div>
                                        <div className="single-input col-md-6">
                                            <label htmlFor="CourseCategoryId" className="form-label">Class / Course Category</label>
                                            <select
                                                id="exampleFormControlSelect2"
                                                className="select2 form-select"
                                                name="CourseCategoryId"
                                                value={formDataCourse.CourseCategoryId}
                                                onChange={handleChangeCourse}
                                                placeholder="MP/CSBC/ICSE (Board)"
                                            >
                                                <option value="">Select MP/CSBC/ICSE (Board)</option>
                                                {category.map(option => (
                                                    <option key={option.id} value={option.id}>{option.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="single-input col-md-6">
                                            <label className="form-label">Upload Image</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                id="inputGroupFile04"
                                                aria-describedby="inputGroupFileAddon04"
                                                aria-label="Upload"
                                                name="file"
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                        <div className="single-input col-md-6">
                                            <label className="form-label">About Class / Course</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="AboutCourse"
                                                placeholder="About Class Content"
                                                value={formDataCourse.AboutCourse}
                                                onChange={handleChangeCourse}
                                            />
                                        </div>
                                        <div className="single-input col-md-6">
                                            <label className="form-label">Description</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="Description"
                                                placeholder="Description Class Content"
                                                value={formDataCourse.Description}
                                                onChange={handleChangeCourse}
                                            />
                                        </div>
                                    </div>
                                    <div className='flex-row d-flex justify-content-between mt-5'>
                                        <div className='prqust-course'>
                                            <button type='button' onClick={handleNext} disabled={isNextDisabled}>
                                                Next <i className="fa-arrow-right fa-regular fa-sharp ml--10"></i>
                                            </button>
                                        </div>
                                        <div className='prqust-course'>
                                            <button type='submit' >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            )}

                            {formStepsNum === 2 && (
                                <form className="form-step active" onSubmit={handleSubmitTopic}>
                                    <h3>Subject Informations</h3>

                                    <div className="single-input">
                                        <label for="name" class="form-label">Subject Name</label>
                                        <input id="name" name='name' class="form-control" value={formDataTopic.name} onChange={handleChangeTopic} type="text" placeholder="Mathes/Physic/Science" />
                                    </div>

                                    <div className="single-input">

                                        <label for="exampleFormControlSelect2" class="form-label">Select Class</label>
                                        <select id="exampleFormControlSelect2" class="select2 form-select" name="CoursesId" value={formDataTopic.CoursesId} onChange={handleChangeTopic}>
                                            <option value="">Class 6th/7th/8th</option>
                                            {courses.map((option) => (
                                                <option key={option.id} value={option.id}>{option.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='flex-row d-flex justify-content-between mt-5'>
                                        <div className='prqust-course'>
                                            <button type='button' onClick={handlePrev} disabled={isPrevDisabled}>
                                                <i className="fa-arrow-left fa-regular fa-sharp ml--10"></i> Previous
                                            </button>
                                        </div>
                                        <div className='prqust-course'>
                                            <button type='submit' disabled={isNextDisabled}>
                                                Next <i className="fa-arrow-right fa-regular fa-sharp ml--10"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            )}

                            {formStepsNum === 3 && (
                                <form className="form-step active" onSubmit={handleSubmitLession}>
                                    <h3>Lession Informations</h3>
                                    <div className='row'>
                                        <div className="single-input col-md-12">
                                            <label for="name" class="form-label">Title</label>
                                            <input type="text" class="form-control" id="name" placeholder="Chapteres / History" name='LessionTitle' value={formDataLession.LessionTitle} aria-label="John Doe" onChange={handleChangeLession} />
                                        </div>


                                        <div className="single-input col-md-6">
                                            <label for="exampleFormControlSelect2" class="form-label">Select Class</label>
                                            <select id="exampleFormControlSelect2" class="select2 form-select" name="CoursesId" value={formDataLession.CoursesId} onChange={handleCourseChange}>
                                                <option value="">Select</option>
                                                {courses.map((option) => (
                                                    <option key={option.id} value={option.id}>{option.name}</option>
                                                ))}
                                            </select>
                                        </div>


                                        <div className="single-input col-md-6">
                                            <label for="exampleFormControlSelect2" class="form-label">Select Subject</label>
                                            <select id="exampleFormControlSelect2" class="select2 form-select" name="TopicId" value={formDataLession.TopicId} onChange={handleChangeLession} >
                                                <option value="">Select</option>
                                                {selectedCourses && selectedCourses.Topics.map(topic => (
                                                    <option key={topic.id} value={topic.id}>{topic.name}</option>
                                                ))}
                                            </select>
                                        </div>



                                        <div className="single-input col-md-12">
                                            <label for="exampleFormControlSelect2" class="form-label">Upload Module PDF | Docx | Doc</label>

                                            <div class="input-group">
                                                <input
                                                    type="file"
                                                    class="form-control"
                                                    id="inputGroupFile04"
                                                    aria-describedby="inputGroupFileAddon04"
                                                    aria-label="Upload"
                                                    name="file"
                                                    multiple onChange={handleFileChange} />

                                            </div>
                                        </div>
                                        <div className="single-input col-md-12">
                                            <Editor
                                                apiKey='exts6nr12i36iql71yx4ho3on1mhmj48cv5o8anbtk8xzn59'
                                                init={{
                                                    plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker',
                                                    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                                                }}
                                                initialValue="Welcome to TinyMCE!"
                                            />
                                        </div>
                                    </div>
                                    <div className='flex-row d-flex justify-content-between mt-5'>
                                        <div className='prqust-course'>
                                            <button type='button' onClick={handlePrev} disabled={isPrevDisabled}>
                                                <i className="fa-arrow-left fa-regular fa-sharp ml--10"></i> Previous
                                            </button>
                                        </div>
                                        <div className='prqust-course'>
                                            <button type='submit' disabled={isNextDisabled} >
                                                Next <i className="fa-arrow-right fa-regular fa-sharp ml--10"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            )}

                            {formStepsNum === 4 && (
                                <form className="form-step active" onSubmit={handleSubmitVideo}>
                                    <h3>Video Informations</h3>
                                    <div className='row'>
                                        <div className="single-input">
                                            <label for="name" class="form-label">Title</label>
                                            <input type="text" class="form-control" id="name" placeholder="Content Title" name='Title' value={formDataVideo.Title} aria-label="John Doe" onChange={handleChangeVideo} />
                                        </div>


                                        <div className="single-input">
                                            <label for="exampleFormControlSelect2" class="form-label">Select Class</label>
                                            <select id="exampleFormControlSelect2" class="select2 form-select" name="CoursesId" value={formDataVideo.CoursesId} onChange={handleCourseChange} >
                                                <option value="">Select</option>
                                                {courses.map((option) => (
                                                    <option key={option.id} value={option.id}>{option.name}</option>
                                                ))}
                                            </select>
                                        </div>


                                        <div className="single-input">
                                            <label for="exampleFormControlSelect2" class="form-label">Select Subject</label>
                                            <select id="exampleFormControlSelect2" class="select2 form-select" name="TopicId" value={formDataVideo.TopicId} onChange={handleChangeVideo} >
                                                <option value="">Select</option>
                                                {selectedCourses && selectedCourses.Topics.map(topic => (<option key={topic.id} value={topic.id}>{topic.name}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="single-input">
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

                                            {selectedvideo === 'upload' ? (
                                                <div className="single-input">
                                                    <label className="form-label">Upload Video</label>
                                                    <div className="input-group">
                                                        <input
                                                            type="file"
                                                            class="form-control"
                                                            id="inputGroupFile04"
                                                            aria-describedby="inputGroupFileAddon04"
                                                            aria-label="Upload"
                                                            multiple onChange={handleFileChange} />
                                                    </div>
                                                </div>
                                            ) : selectedvideo === 'gallery' ? (
                                                <div className="single-input" data-quillbot-parent="oopPrLVIHzQ4Ey_EnMuDh">

                                                    <label className="form-label">Video Url</label>
                                                    <textarea
                                                        id="full-featured-non-premium"
                                                        name="VideoIframe"
                                                        value={formDataVideo.VideoIframe} onChange={handleChangeVideo}
                                                        className="form-control w-100"
                                                        data-gramm="false"
                                                        wt-ignore-input="true"
                                                        data-quillbot-element="oopPrLVIHzQ4Ey_EnMuDh"
                                                    ></textarea>
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className='flex-row d-flex justify-content-between mt-5'>
                                        <div className='prqust-course'>
                                            <button type='button' onClick={handlePrev}>
                                                <i className="fa-arrow-left fa-regular fa-sharp ml--10"></i> Previous
                                            </button>
                                        </div>
                                        <div className='prqust-course'>
                                            <button type='submit' >
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            )}

                        </div>
                        <div className="col-lg-4 rts-sticky-column-item">
                            <div className="course-upload-tips-wrapper theiaStickySidebar">
                                <h5 className="title">Course Upload Tips</h5>
                                <div className="single-check-wrapper">
                                    <i className="fa-light fa-circle-check"></i>
                                    <span>Set the Course Price option or make it free.</span>
                                </div>
                                <div className="single-check-wrapper">
                                    <i className="fa-light fa-circle-check"></i>
                                    <span>Standard size for the course thumbnail is 700x430.</span>
                                </div>
                                <div className="single-check-wrapper">
                                    <i className="fa-light fa-circle-check"></i>
                                    <span>Video section controls the course overview video.</span>
                                </div>
                                <div className="single-check-wrapper">
                                    <i className="fa-light fa-circle-check"></i>
                                    <span>Course Builder is where you create & organize a course.</span>
                                </div>
                                <div className="single-check-wrapper">
                                    <i className="fa-light fa-circle-check"></i>
                                    <span>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</span>
                                </div>
                                <div className="single-check-wrapper">
                                    <i className="fa-light fa-circle-check"></i>
                                    <span>Prerequisites refers to the fundamental courses to complete before taking this particular course.</span>
                                </div>
                                <div className="single-check-wrapper">
                                    <i className="fa-light fa-circle-check"></i>
                                    <span>Information from the Additional Data section shows up on the course single page.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>

        </div >
    );
}

export default InstructorCourseadd;