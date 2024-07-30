import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link, useLocation } from 'react-router-dom';
import Navbarmenu from './Navbarmenu';
import Sidebar from './sidebar';
import DashboardCard from './dashboardcardComponent';
const { REACT_APP_API_ENDPOINT } = process.env;

function UpdateSubjectComponent({ closeSubject, openSubject }) {
    const [courses, setCourses] = useState([]);
    const { topicId } = useParams();
    const [urlIdSubject, seturlid] = useState('')
    const [formDataTopic, setFormDataTopic] = useState({
        name: '',
        CoursesId: ''
    });

    const handleChangeTopic = (e) => {
        const { name, value } = e.target;
        setFormDataTopic((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (topicId) {
            fetchDataSubject(topicId);
        }
    }, [topicId])

    const fetchData = async () => {
        try {
            const response = await axios.get(`${REACT_APP_API_ENDPOINT}/courses`);
            const userDatas = response.data.courses;
            setCourses(userDatas);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchDataSubject = async (topicId) => {
        try {
            if (!topicId) {
                console.log("SubjectId is undefined");
                return;
            }
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/topic/${topicId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const userData = response.data.topic;
                seturlid(response.data.topic.Course.id)
                setFormDataTopic({
                    name: userData.name,
                    CoursesId: userData.CoursesId,
                });
            }
        } catch (err) {
            console.log(err.response);
        }
    };

    const handleUpdateTopic = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (token) {
                await axios.patch(`${REACT_APP_API_ENDPOINT}/topic/${topicId}`, formDataTopic, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                window.location.href = `/studentmateriales/${urlIdSubject}`
                alert('Subject Successfully Updated');

            }
        } catch (error) {
            alert('Failed to update subject.');
        }
    };

    return (
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
                                <button type="button" className="btn-close" onClick={closeSubject}></button>

                                <form className='row' onSubmit={handleUpdateTopic}>
                                    <><div className='col-12 col-md-6 col-lg-6 col-xl-6'>
                                        <label className='pb-2'>Subject Name</label>
                                        <input className='inputts' type="text" id="name" placeholder="Math/Physics/Science" name="name" value={formDataTopic.name} onChange={handleChangeTopic} required />
                                    </div>

                                        <div className='col-12 col-md-6 col-lg-6 col-xl-6'>

                                            <label htmlFor="CoursesId" className="form-label">Select Class</label>
                                            <select
                                                id="CoursesId"
                                                className="select2 form-select"
                                                name="CoursesId"
                                                value={formDataTopic.CoursesId}
                                                onChange={handleChangeTopic}
                                                required
                                            >
                                                <option value="">Class 6th/7th/8th</option>
                                                {courses.map((option) => (
                                                    <option key={option.id} value={option.id}>{option.name}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="col-3 mb-3 d-flex mt-3">
                                            <button type="submit" className="btn btn-primary me-sm-3 me-1 data-submit">Update</button>
                                            <button type="reset" className="btn btn-label-secondary" data-bs-dismiss="offcanvas">Cancel</button>
                                            <input type="hidden" />
                                        </div>

                                    </>


                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateSubjectComponent;
