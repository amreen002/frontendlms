import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Navbarmenu from "./Navbarmenu";
import Sidebar from "./sidebar";
import Select, { StylesConfig } from 'react-select'
import makeAnimated from 'react-select/animated';
import DashboardCard from "./dashboardcardComponent";
import ValidationInstructoraddquize from '../validation/instructoraddquizevalidation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
const { REACT_APP_API_ENDPOINT } = process.env;
const animatedComponents = makeAnimated();
const datatoken = localStorage.getItem('datatoken');
const coursedatafetch = JSON.parse(datatoken)
function InstructoreaddquizeComponent(token) {
    const datatoken = localStorage.getItem('datatoken');
    const coursedatafetch = JSON.parse(datatoken)
    const [table, setTable] = useState("");
    const [course, setCourse] = useState([]);
    const [coursesCount, setCoursesCount] = useState(null);
    const [totalstudent, setTotalstudent] = useState(null);
    const [totalVideoCount, settotalVideoCount] = useState(null);
    const [activeService, setActiveService] = useState(null);

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
                setCoursesCount(response.data.coursescount);
                setTotalstudent(response.data.totalStudentCount)
                settotalVideoCount(response.data.totalVideoCount)
                setCourse(userDatas)

            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {

        fetchData1()
    }, []);


    const { quizzeId } = useParams();
    const [quizze, setQuizze] = useState([]);
    const [QuizzName, setQuizzName] = useState('');
    const [QuizzStartTime, setQuizzStartTime] = useState('');
    const [QuizzEndTime, setQuizzEndTime] = useState('');
    const [QuizzTestDuration, setQuizzTestDuration] = useState('')
    const [EasyQuestions, setEasyQuestions] = useState('');
    const [MediumQuestions, setMediumQuestions] = useState('');
    const [HardQuestions, setHardQuestions] = useState('');
    const [TotalQuestions, setTotalQuestions] = useState('');
    const [TotalMarks, setTotalMarks] = useState('');
    const [Instructions, setInstructions] = useState('');
    const [CourseId, setCourseId] = useState('');
    const [FindOneInstructor, setFindOneInstructor] = useState({})
    const [QuizzCategoryId, setQuizzCategoryId] = useState([]);
    const [batch, setBatchs] = useState([]);
    const [category, setCategory] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        setTotalQuestions(parseInt(EasyQuestions) + parseInt(MediumQuestions) + parseInt(HardQuestions));
        setTotalMarks(parseInt(EasyQuestions) * 1 + parseInt(MediumQuestions) * 2 + parseInt(HardQuestions) * 4);
    }, [EasyQuestions, MediumQuestions, HardQuestions]);

    useEffect(() => {
        fetchDataFindOne(quizzeId)
    }, [quizzeId]);

    useEffect(() => {
        fetchQuizze()
        fetchBatches()
        fetchQuestionscategory()
    }, []);

    // Format options for react-select
    const [BatchId, setBatchId] = useState([]);

    // Format options for react-select
    const options = batch.map(option => ({

        value: option.id,
        label: option.Title,
    }));

    // Handle change event
    const handleChange = (selectedOptions) => {
        const batchIds = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setBatchId(batchIds);
    };

    const fetchQuizze = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/quizze`, {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                });
                const userData = response.data.quizze.rows;
                setQuizze(userData)
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const fetchBatches = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/batches`, {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                });
                const userData = response.data.batchs;
                setBatchs(userData)
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const fetchQuestionscategory = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/questionscategory`, {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                });
                const userDatas = response.data.questionscategory;
                setCategory(userDatas)
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchDataFindOne = async (quizzeId) => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/quizze/${quizzeId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const userData = response.data.quizze;

                setFindOneInstructor(userData);
                setQuizzName(userData.QuizzName);
                setQuizzStartTime(userData.QuizzStartTime);
                setQuizzEndTime(userData.QuizzEndTime);
                setQuizzTestDuration(userData.QuizzTestDuration);
                setEasyQuestions(userData.EasyQuestions);
                setMediumQuestions(userData.MediumQuestions);
                setHardQuestions(userData.HardQuestions);
                setTotalQuestions(userData.TotalQuestions);
                setTotalMarks(userData.TotalMarks);
                setInstructions(userData.Instructions);
                setQuizzCategoryId(userData.QuizzCategoryId);
                setBatchId(Array.isArray(userData.BatchId) ? userData.BatchId : []);
                setCourseId(userData.CourseId)
            } else {
                console.warn('No token found in localStorage');
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const [errors, setErrors] = useState({})
    const formData = {
        QuizzName,
        QuizzStartTime,
        QuizzEndTime,
        QuizzTestDuration,
        EasyQuestions,
        MediumQuestions,
        HardQuestions,
        TotalQuestions,
        TotalMarks,
        Instructions,
        BatchId,
        QuizzCategoryId,
        CourseId,
    }
    const handleChanges = (e) => {
        const { name, value } = e.target;
        const updatedFormData = { ...formData, [name]: value };
        const validationErrors = ValidationInstructoraddquize(updatedFormData);
        setErrors(validationErrors);
        setQuizzName(updatedFormData.QuizzName || '');
        setQuizzStartTime(updatedFormData.QuizzStartTime || '');
        setQuizzEndTime(updatedFormData.QuizzEndTime || '');
        setQuizzTestDuration(updatedFormData.QuizzTestDuration || '');
        setEasyQuestions(updatedFormData.EasyQuestions || '');
        setMediumQuestions(updatedFormData.MediumQuestions || '');
        setHardQuestions(updatedFormData.HardQuestions || '');
        setTotalQuestions(updatedFormData.TotalQuestions || '');
        setTotalMarks(updatedFormData.TotalMarks || '');
        setInstructions(updatedFormData.Instructions || '');
        setBatchId(updatedFormData.BatchId || '');
        setQuizzCategoryId(updatedFormData.QuizzCategoryId || '');
        setCourseId(updatedFormData.CourseId || '');
    }



    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
          
    
            const token = localStorage.getItem('token');

            if (!token) {
                alert('Token not found. Please log in again.');
                return;
            }

            const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/quizze`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const userdata =  response.data.quizze

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
             navigate(`/instructorquestion/${userdata.id}`); 
            if (response.status === 200) {
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
                 navigate(`/instructorquestion/${userdata.id}`); 
            } else {
                console.error('Unexpected response status:', response.status);
                toast.error(userdata.message,{
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
            console.error('Error creating quiz:', error);
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
        <div>
            <section>
                <Navbarmenu />
            </section>

            <DashboardCard />

            <div class="dashboard--area-main pt--100 pt_sm--50">
                <div class="container">
                    <div class="row g-5">
                        <Sidebar />
                        <div className="col-lg-9">
                            <div className="right-sidebar-dashboard" style={{ backgroundColor: '#fff' }}>
                                <h5 className="title">Manage Quiz</h5>
                                <form className='row' onSubmit={handleSubmit}>
                                {coursedatafetch.Role.Name === "Guest/Viewer" ? (
                                        <div className="sociallocker">
                                            <div className="sociallocker-content">
                                                <div className='col-12 col-md-6 col-lg-6 col-xl-6'>
                                                    <label className='pb-2'>Name Quiz</label>
                                                    <input className='inputts' name='QuizzName' onChange={(e) => setQuizzName(e.target.value)} value={QuizzName} placeholder='Name Quiz' type='text' />
                                                </div>
                                                <div className='col-12 col-md-3 col-lg-3 col-xl-3'>
                                                    <label className='pb-2'>Start Time</label>
                                                    <input className='inputts' type="datetime-local" name="QuizzStartTime" onChange={(e) => setQuizzStartTime(e.target.value)} value={QuizzStartTime} />
                                                </div>
                                                <div className='col-12 col-md-3 col-lg-3 col-xl-3'>
                                                    <label className='pb-2'>End Time</label>
                                                    <input className='inputts' type="datetime-local" name="QuizzEndTime" onChange={(e) => setQuizzEndTime(e.target.value)} value={QuizzEndTime} />
                                                </div>
                                                <div className='col-12 col-md-6 col-lg-6 col-xl-6 mt-5'>
                                                    <label className='pb-2'>Test Duration (in minutes)</label>
                                                    <input className='inputts' type='number' placeholder='Test Duration' name="QuizzTestDuration" onChange={(e) => setQuizzTestDuration(e.target.value)} value={QuizzTestDuration} />
                                                </div>
                                                <div className='col-12 col-md-6 col-lg-6 col-xl-6 mt-5'>
                                                    <label className='pb-2'>Number of Easy Questions (1 Mark)</label>
                                                    <input className='inputts' type='number' placeholder='Number of easy questions' name="EasyQuestions" onChange={(e) => setEasyQuestions(e.target.value)} value={EasyQuestions} />
                                                </div>
                                                <div className='col-12 col-md-6 col-lg-6 col-xl-6 mt-5'>
                                                    <label className='pb-2'>Number of Medium Questions (2 Marks)</label>
                                                    <input className='inputts' type='number' placeholder='Number of medium questions' name="MediumQuestions" onChange={(e) => setMediumQuestions(e.target.value)} value={MediumQuestions} />
                                                </div>
                                                <div className='col-12 col-md-6 col-lg-6 col-xl-6 mt-5'>
                                                    <label className='pb-2'>Number of Hard Questions (4 Marks)</label>
                                                    <input className='inputts' type='number' placeholder='Number of hard questions' name="HardQuestions" onChange={(e) => setHardQuestions(e.target.value)} value={HardQuestions} />
                                                </div>
                                                <div className='col-12 col-md-6 col-lg-6 col-xl-6 mt-5'>
                                                    <label className='pb-2'>Total Questions</label>
                                                    <input className='inputts' type='number' placeholder='Total Questions' name="TotalQuestions" onChange={(e) => setTotalQuestions(e.target.value)} value={TotalQuestions} />
                                                </div>
                                                <div className='col-12 col-md-6 col-lg-6 col-xl-6 mt-5'>
                                                    <label className='pb-2'>Total Marks</label>
                                                    <input className='inputts' type='number' placeholder='Total Marks' name="TotalMarks" onChange={(e) => setTotalMarks(e.target.value)} value={TotalMarks} />
                                                </div>
                                                <div className='col-12 col-md-6 col-lg-6 col-xl-6 mt-5'>
                                                    <label className='pb-2'>Introduction</label>
                                                    <input className='inputts' type='text' placeholder='Introduction' name="Instructions" onChange={(e) => setInstructions(e.target.value)} value={Instructions} />
                                                </div>
                                                <div className='col-12 col-md-6 col-lg-6 col-xl-6 mt-5'>
                                                    <label className='pb-2'>Batch</label>
                                                    <Select
                                                        isMulti
                                                        value={options.filter(option => BatchId.includes(option.value))}
                                                        name="BatchId"
                                                        onChange={(selectedOptions) => setBatchId(selectedOptions.map(option => option.value))}
                                                        options={options}
                                                    />
                                                </div>
                                                <div className='col-12 col-md-6 col-lg-6 col-xl-6 mt-5'>
                                                    <label className='pb-2'>Course Category</label>
                                                    <select className='inputts' name="QuizzCategoryId" value={QuizzCategoryId} onChange={(e) => setQuizzCategoryId(e.target.value)}>
                                                        <option value="">Select</option>
                                                        {category.map((option) => (
                                                            <option key={option.id} value={option.id}>{option.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className='col-12 col-md-6 col-lg-6 col-xl-6 mt-5'>
                                                    <label className='pb-2'>Courses</label>
                                                    <select className='inputts' name="CourseId" value={CourseId} onChange={(e) => setCourseId(e.target.value)}>
                                                        <option value="">Select</option>
                                                        {course.map((option) => (
                                                            <option key={option.id} value={option.id}>{option.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="col-3 mb-3 d-flex mt-3">
                                                    <button type="submit" className="btn btn-primary me-sm-3 me-1 data-submit">Submit</button>
                                                    <button type="reset" className="btn btn-label-secondary" data-bs-dismiss="offcanvas">Cancel</button>
                                                    <input type="hidden" />
                                                </div>


                                                <div className="sociallocker-overlay mt-5">
                                                    <i className="fas fa-lock"></i> Unlock content to login with Instructor or Student.
                                                </div>
                                            </div>
                                        </div>
                                    ) : (<><div className='col-12 col-md-6 col-lg-6 col-xl-6'>
                                        <label className='pb-2'>Name Quiz</label>
                                        <input className='inputts' name='QuizzName' onChange={(e) => setQuizzName(e.target.value)} value={QuizzName} placeholder='Name Quiz' type='text' />
                                    </div>
                                        <div className='col-12 col-md-3 col-lg-3 col-xl-3'>
                                            <label className='pb-2'>Start Time</label>
                                            <input className='inputts' type="datetime-local" name="QuizzStartTime" onChange={(e) => setQuizzStartTime(e.target.value)} value={QuizzStartTime} />
                                        </div>
                                        <div className='col-12 col-md-3 col-lg-3 col-xl-3'>
                                            <label className='pb-2'>End Time</label>
                                            <input className='inputts' type="datetime-local" name="QuizzEndTime" onChange={(e) => setQuizzEndTime(e.target.value)} value={QuizzEndTime} />
                                        </div>
                                        <div className='col-12 col-md-6 col-lg-6 col-xl-6 mt-5'>
                                            <label className='pb-2'>Test Duration (in minutes)</label>
                                            <input className='inputts' type='number' placeholder='Test Duration' name="QuizzTestDuration" onChange={(e) => setQuizzTestDuration(e.target.value)} value={QuizzTestDuration} />
                                        </div>
                                        <div className='col-12 col-md-6 col-lg-6 col-xl-6 mt-5'>
                                            <label className='pb-2'>Number of Easy Questions (1 Mark)</label>
                                            <input className='inputts' type='number' placeholder='Number of easy questions' name="EasyQuestions" onChange={(e) => setEasyQuestions(e.target.value)} value={EasyQuestions} />
                                        </div>
                                        <div className='col-12 col-md-6 col-lg-6 col-xl-6 mt-5'>
                                            <label className='pb-2'>Number of Medium Questions (2 Marks)</label>
                                            <input className='inputts' type='number' placeholder='Number of medium questions' name="MediumQuestions" onChange={(e) => setMediumQuestions(e.target.value)} value={MediumQuestions} />
                                        </div>
                                        <div className='col-12 col-md-6 col-lg-6 col-xl-6 mt-5'>
                                            <label className='pb-2'>Number of Hard Questions (4 Marks)</label>
                                            <input className='inputts' type='number' placeholder='Number of hard questions' name="HardQuestions" onChange={(e) => setHardQuestions(e.target.value)} value={HardQuestions} />
                                        </div>
                                        <div className='col-12 col-md-6 col-lg-6 col-xl-6 mt-5'>
                                            <label className='pb-2'>Total Questions</label>
                                            <input className='inputts' type='number' placeholder='Total Questions' name="TotalQuestions" onChange={(e) => setTotalQuestions(e.target.value)} value={TotalQuestions} />
                                        </div>
                                        <div className='col-12 col-md-6 col-lg-6 col-xl-6 mt-5'>
                                            <label className='pb-2'>Total Marks</label>
                                            <input className='inputts' type='number' placeholder='Total Marks' name="TotalMarks" onChange={(e) => setTotalMarks(e.target.value)} value={TotalMarks} />
                                        </div>
                                        <div className='col-12 col-md-6 col-lg-6 col-xl-6 mt-5'>
                                            <label className='pb-2'>Introduction</label>
                                            <input className='inputts' type='text' placeholder='Introduction' name="Instructions" onChange={(e) => setInstructions(e.target.value)} value={Instructions} />
                                        </div>
                                        <div className='col-12 col-md-6 col-lg-6 col-xl-6 mt-5'>
                                            <label className='pb-2'>Batch</label>
                                            <Select
                                                isMulti
                                                value={options.filter(option => BatchId.includes(option.value))}
                                                name="BatchId"
                                                onChange={(selectedOptions) => setBatchId(selectedOptions.map(option => option.value))}
                                                options={options}
                                            />
                                        </div>
                                        <div className='col-12 col-md-6 col-lg-6 col-xl-6 mt-5'>
                                            <label className='pb-2'>Course Category</label>
                                            <select className='inputts' name="QuizzCategoryId" value={QuizzCategoryId} onChange={(e) => setQuizzCategoryId(e.target.value)}>
                                                <option value="">Select</option>
                                                {category.map((option) => (
                                                    <option key={option.id} value={option.id}>{option.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className='col-12 col-md-6 col-lg-6 col-xl-6 mt-5'>
                                            <label className='pb-2'>Courses</label>
                                            <select className='inputts' name="CourseId" value={CourseId} onChange={(e) => setCourseId(e.target.value)}>
                                                <option value="">Select</option>
                                                {course.map((option) => (
                                                    <option key={option.id} value={option.id}>{option.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-3 mb-3 d-flex mt-3">
                                            <button type="submit" className="btn btn-primary me-sm-3 me-1 data-submit">Submit</button>
                                            <button type="reset" className="btn btn-label-secondary" data-bs-dismiss="offcanvas">Cancel</button>
                                            <input type="hidden" />
                                        </div>

                                    </>)
                                    }

                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default InstructoreaddquizeComponent;