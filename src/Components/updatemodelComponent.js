import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link, useLocation } from 'react-router-dom';
import Navbarmenu from './Navbarmenu';
import Sidebar from './sidebar';
import DashboardCard from './dashboardcardComponent';
import { Editor } from '@tinymce/tinymce-react';
const { REACT_APP_API_ENDPOINT } = process.env;
function CreateModelComponent({ closePopup }) {
    const { lessionId } = useParams();
    const [table, setLession] = useState([]);
    const [courses, setCourse] = useState([]);
    const [Topic, setTopic] = useState([]);
    const [findOnelession, setFindOneLession] = useState({})
    const [selectedCourses, setSelectedCourses] = useState('');
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [files, setFiles] = useState([])
    const [removedFiles, setRemovedFiles] = useState([]);
    const [urlIdModel, seturlid] = useState('')
    // lession start add

    let [formDataLession, setFormDataLession] = useState({
        LessionTitle: "",
        CoursesId: "",
        TopicId: "",
        LessionUpload: null,

    });

    useEffect(() => {
        fetchData(lessionId);
    }, [lessionId]);

    useEffect(() => {
        fetchData1();
        fetchData2();
        fetchData3()
    }, [])

    const handleCourseChange = async (e) => {
        const selectedCoursesId = parseInt(e.target.value);
        const selectedCourse = courses.find(course => course.id === selectedCoursesId);
        setFormDataLession({
            ...formDataLession,
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
                seturlid(lessonData.Course.id)
                setFindOneLession(lessonData)
                setFormDataLession({
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

    const fetchData1 = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/lession`, {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                });
                const userData = response.data.lession;
                setLession(userData)
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

    // lession start handleChangeLession
    const handleChangeLession = (e) => {
        const { name, files, value } = e.target;
        setFormDataLession(formDataLession => ({
            ...formDataLession,
            [name]: files ? files[0] : value
        }));
    };

    useEffect(() => {
        if (findOnelession?.LessionUpload) {
            setFiles(findOnelession.LessionUpload.map(file => ({ ...file, isNew: false })));
        }
    }, [findOnelession]);

    const handleFileChange = (event) => {
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

    // lession start handleSubmitLession
    const handleUpdateLession = async (e) => {
        e.preventDefault();
        // Append files to FormData
        const data = new FormData();
        files.forEach(file => {
            if (file.isNew) {
                data.append('files', file.file);
            }
        });
        data.append('removedFiles', JSON.stringify(removedFiles));
        // Append other form data
        for (const key in formDataLession) {
            data.append(key, formDataLession[key]);
        }
        try {
            const token = localStorage.getItem('token');
            if (token) {

                await axios.patch(`${REACT_APP_API_ENDPOINT}/lession/${lessionId}`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                    }
                });
                window.location.href = `/studentmateriales/${urlIdModel}`
                alert('Lession Successfully Update');


            }


        } catch (error) {
            alert('Failed to send message.');
        }
    }

    
    // end lession 
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
                                    <form onSubmit={handleUpdateLession}>
                                        <div>
                                            <div className="col-12 col-md-12 col-lg-12 col-xl-12 p-3">
                                                <div className="single-input">
                                                    <label for="name" class="form-label">Title</label>
                                                    <input type="text" class="form-control" value={formDataLession.LessionTitle}
                                                        onChange={handleChangeLession} placeholder="Chapteres / History" name='LessionTitle' aria-label="John Doe" />
                                                </div>

                                            </div>
                                            <div className="col-12 col-md-12 col-lg-12 col-xl-12 p-3">
                                                <div className="single-input">
                                                    <label for="exampleFormControlSelect2" class="form-label">Select Class</label>
                                                    <select id="exampleFormControlSelect2" class="select2 form-select" name="CoursesId"
                                                        value={formDataLession.CoursesId}
                                                        onChange={handleCourseChange}>
                                                        <option value="">Select</option>
                                                        {courses.map((option) => (
                                                            <option key={option.id} value={option.id}>{option.name}</option>
                                                        ))}
                                                    </select>
                                                </div>

                                            </div>
                                            <div className="col-12 col-md-12 col-lg-12 col-xl-12 p-3">
                                                <div className="single-input">
                                                    <label for="exampleFormControlSelect2" class="form-label">Select Subject</label>
                                                    <select id="exampleFormControlSelect2" class="select2 form-select" name="TopicId" value={formDataLession.TopicId} onChange={handleChangeLession}>
                                                        <option value="">Select</option>
                                                        {selectedCourses && selectedCourses.Topics.map(topic => (
                                                            <option key={topic.id} value={topic.id}>{topic.name}</option>
                                                        ))}
                                                    </select>
                                                </div>

                                            </div>
                                            <div className="col-12 col-md-12 col-lg-12 col-xl-12 p-3">
                                                <div className="single-input">
                                                    <label htmlFor="exampleFormControlSelect2" className="form-label">
                                                        Upload Module PDF | Docx | Doc
                                                    </label>
                                                    <div className="row">
                                                        {files.map((file, index) => (
                                                            <div key={index} className="col-12 col-md-4 col-lg-4 col-xl-4 mb-3">
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
                                                    <div className="input-group mt-3">
                                                        <input
                                                            type="file"
                                                            className="form-control"
                                                            id="inputGroupFile04"
                                                            aria-describedby="inputGroupFileAddon04"
                                                            aria-label="Upload"
                                                            multiple
                                                            onChange={handleFileChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="col-12 col-md-12 col-lg-12 col-xl-12 p-3">
                                                <Editor
                                                    apiKey='exts6nr12i36iql71yx4ho3on1mhmj48cv5o8anbtk8xzn59'
                                                    init={{
                                                        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker',
                                                        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                                                    }}
                                                    initialValue="Welcome to TinyMCE!"
                                                />


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
export default CreateModelComponent