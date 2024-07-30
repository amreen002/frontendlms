import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link, useLocation } from 'react-router-dom';
import Navbarmenu from './Navbarmenu';
import Sidebar from './sidebar';
import DashboardCard from './dashboardcardComponent';
import { Editor } from '@tinymce/tinymce-react';
import ValidationVideo from '../validation/videovalidation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
const { REACT_APP_API_ENDPOINT } = process.env;

function CreateContentComponent({ closeContent }) {
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
    const [urlIdContent, seturlid] = useState('')
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
                seturlid(lessonData.Course.id)
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

    const fetchData1 = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/video`, {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                });
                const userData = response.data.video;
                setVideo(userData)
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchData2 = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/studentcourses`, {
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

    const [errors, setErrors] = useState({})
    useEffect(() => {
        if (findOnevideo?.VideoUplod) {
            setFiles(findOnevideo.VideoUplod.map(file => ({ ...file, isNew: false })));
        }
    }, [findOnevideo]);
  
    const handleFileChange = (event) => {
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
            [name]: value
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
             
                window.location.href = `/studentmateriales/${urlIdContent}`
            }
        } catch (error) {
            console.error('Error updating video:', error);
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
    };


    return (
        <>
            <div>
                <section>
                    <Navbarmenu />
                </section>
                <DashboardCard />
                <div className="dashboard--area-main pt--100 pt_sm--50">
                    <div className="container">
                        <div className="row g-5">
                            <Sidebar />
                            <div class="col-lg-9">
                                <div class="right-sidebar-dashboard" style={{ backgroundColor: '#fff' }}>
                                    <form onSubmit={handleUpdate}>
                                        <div className="row">
                                            <div className="col-12 col-md-6 col-lg-6 col-xl-6 p-3">
                                                <div className="single-input">
                                                    <label for="name" class="form-label">Title</label>
                                                    <input type="text" class="form-control" id="name" placeholder="Content Title" name='Title'  value={formData.Title} aria-label="John Doe" onChange={handleChange}/>

                                                </div>

                                            </div>
                                            <div className="col-12 col-md-6 col-lg-6 col-xl-6 p-3">
                                                <div className="single-input">
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

                                            </div>
                                            <div className="col-12 col-md-6 col-lg-6 col-xl-6 p-3">
                                                <div className="single-input">
                                                    <label for="exampleFormControlSelect2" class="form-label">Select Subject</label>
                                                    <select id="exampleFormControlSelect2" class="select2 form-select" name="TopicId" value={formData.TopicId} onChange={handleChange}>
                                                        <option value="">Select</option>
                                                        {selectedCourses && selectedCourses.Topics.map(topic => (
                                                            <option key={topic.id} value={topic.id}>{topic.name}</option>
                                                        ))}
                                                    </select>
                                                </div>

                                            </div>
                                            <div className="col-12 col-md-6 col-lg-6 col-xl-6 p-3">
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
                                                                    multiple onChange={handleFileChange}></input>
                                                            </div>
                                                        </div>
                                                    ) : selectedvideo === 'gallery' ? (
                                                        <div className="single-input" data-quillbot-parent="oopPrLVIHzQ4Ey_EnMuDh">

                                                            <label className="form-label">Video Url</label>
                                                            <textarea
                                                                id="full-featured-non-premium"
                                                                name="VideoIframe"
                                                                value={formData.VideoIframe} onChange={handleChange} 
                                                                className="form-control w-100"
                                                                data-gramm="false"
                                                                wt-ignore-input="true"
                                                                data-quillbot-element="oopPrLVIHzQ4Ey_EnMuDh"
                                                            ></textarea>
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="d-flex flex-wrap">
                                                {files.map((file, index) => (
                                                    <div key={index} className="col-12 col-md-6 col-lg-4 col-xl-3 mb-3 d-flex flex-column align-items-center"  style={{ marginRight: "70px"}}  
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
                                            <div class="col-12 col-lg-12 col-md-12 single-input d-flex">
                                                <button type="submit" class="btn btn-primary data-submit">Update</button>
                                                <button type="reset" class="btn btn-label-secondary" data-bs-dismiss="#collapseOne" aria-label="Close">Cancel</button>
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default CreateContentComponent