import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Footer from './footerComponent';
import Navbar from './navComponemt';
import DashBoardMenus from './dashboardsMenuComponent';
import { Button, Form } from 'react-bootstrap';
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import Draggable from '../Components/draggableComponent';
import { FaCheckCircle, FaTimesCircle, FaLock, FaEnvelope } from 'react-icons/fa'; // Import necessary icons

import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
const { REACT_APP_API_ENDPOINT, REACT_APP_API_IMG } = process.env;
function SteperformComponent() {
    const { saleteamId } = useParams();
    const [step, setStep] = useState(1);
    const [table, setTable] = useState([]);
    const [dataUser, setTabledataUser] = useState([]);
    const [dataUserss, setTabledataUserssss] = useState({});
    const [roleId, setRoleId] = useState('');
    const [selectedTask, setSelectedTask] = useState(null);
    // State variables
    const [selectedColumn, setSelectedColumn] = useState('');

    const [selectedItem, setSelectedItem] = useState([]);
    const [date, setDate] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [workingStatus, setWorkingStatus] = useState('');
    const [leadPlatform, setLeadPlatform] = useState('');
    const [status, setStatus] = useState('');
    const [remark, setRemark] = useState('')
    const [createdAt, setCreatedAt] = useState('');
    const [visitDate, setVisitDate] = useState('')
    const [userData, setUserData] = useState({});
    const [formVisible, setFormVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [saleTeamData, setSaleTeamData] = useState([]);
    const [TelecallerCheckbox, setTelecallerCheckbox] = useState(false);
    const [createdItems, setCreatedItems] = useState({});
    const [showOtpInput, setShowOtpInput] = useState({ email: false, mobile: false });
    const [otp, setOtp] = useState({ email: '', mobile: '' });
    const [otpVerified, setOtpVerified] = useState({ email: false, mobile: false });


    const [telecallerPersonNames, setTelecallerPersonNames] = useState(() => {
        const savedNames = JSON.parse(localStorage.getItem('telecallerPersonNames'));
        return savedNames !== null ? savedNames : {};
    });

    useEffect(() => {
        fetchData0();
        fetchData();
        fetchData2()
        fetchData3()
    }, []);


    useEffect(() => {
        fetchData4(saleteamId);
    }, [saleteamId]);

    const fetchData0 = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/usertelecallerteam`, {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                });
                const userData = response.data.usertelecallerteam;
                setSaleTeamData(userData)
                setDate(userData.date)
                setName(userData.name);
                setAge(userData.age);
                setPhoneNumber(userData.phoneNumber);
                setEmail(userData.email);
                setWorkingStatus(userData.workingStatus);
                setLeadPlatform(userData.leadPlatform);
                setRoleId(userData.roleId)
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/listsaleteam`, {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                });
                setTable(response.data.saleteam);
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

    const fetchData4 = async (saleteamId) => {
        try {
            if (!saleteamId) {
                console.log("saleteamId is undefined");
                return;
            }
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/listsaleteam/${saleteamId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                });
                const userData = response.data.saleteam;
                setUserData(response.data.saleteam)
                setDate(userData.date)
                setName(userData.name);
                setAge(userData.age);
                setPhoneNumber(userData.phoneNumber);
                setEmail(userData.email);
                setWorkingStatus(userData.workingStatus);
                setLeadPlatform(userData.leadPlatform);
                setTelecallerCheckbox(userData.TelecallerCheckbox);
                setRoleId(userData.roleId)
            }
        } catch (err) {
            console.log(err.response);
        }
    }

    useEffect(() => {
        localStorage.setItem('telecallerPersonNames', JSON.stringify(telecallerPersonNames));
    }, [telecallerPersonNames]);

    const handleOtpVerification = (type) => {
        // Add OTP verification logic here
        console.log(`Verifying OTP for ${type}: ${otp[type]}`);
        setOtpVerified({ ...otpVerified, [type]: true });
        setShowOtpInput({ ...showOtpInput, [type]: false });
    };
    // Trigger fetch data when searchTerm changes

    const handleCheckboxChange = (e, item) => {
        const isChecked = e.target.checked;
        setCreatedItems(prevState => ({
            ...prevState,
            [item.id]: isChecked
        }));


        if (e.target.checked) {
            setSelectedItem(item);
            setDate(item.date)
            setName(item.name);
            setAge(item.age);
            setPhoneNumber(item.phoneNumber);
            setEmail(item.email);
            setWorkingStatus(item.workingStatus);
            setLeadPlatform(item.leadPlatform);
            setStatus(item.status);
            setCreatedAt(item.createdAt);
            setRemark(item.remark);
            setVisitDate(item.visitDate);
            setRoleId(item.roleId)
            setTelecallerCheckbox(e.target.checked);
            setFormVisible(true);
        } else {
            setSelectedItem(null); // Unselect if unchecked
            setDate('')
            setName('');
            setAge('');
            setPhoneNumber('');
            setEmail('');
            setWorkingStatus('');
            setLeadPlatform('');
            setStatus('');
            setCreatedAt('');
            setRemark('');
            setVisitDate('');
            setRoleId('')
            setFormVisible(false);
        }

    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e)
        try {


            const token = localStorage.getItem('token');
            if (token) {
                const formData = { name, age, phoneNumber, email, workingStatus, leadPlatform, date, status, remark, visitDate, roleId };
                if (window.confirm('Are you sure you want to Lead Forwarded ?')) {
                    // Save it! 
                    await axios.post(`${REACT_APP_API_ENDPOINT}/addtelecallerteam`, formData, {
                        headers: {
                            Authorization: `Bearer ${token}`

                        }
                    });
                    alert('Lead Forwarded To Front Desk');
                    window.location.href = "/telecallerteam";
                } else {
                    // Do nothing!
                    console.log('Lead Forword Not To Front Desk');

                }
            }

            const promises = Object.entries(createdItems).map(([telecallerteamId, isChecked]) => {
                const updatedUserData = { TelecallerCheckbox: isChecked };
                return axios.patch(`${REACT_APP_API_ENDPOINT}/viewssaleteam/${telecallerteamId}`, updatedUserData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
            });

            await Promise.all(promises);
            fetchData4();
            // Clear local changes after successful update
            setCreatedItems({});
        } catch (error) {
            alert('Failed to send message.');
        }
    }


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

    const handleNext = () => {
        setStep((prevStep) => prevStep + 1);
    };

    const handlePrevious = () => {
        setStep((prevStep) => prevStep - 1);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active && over && active.id !== over.id) {
            setTable((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
            setSelectedTask(table.find(task => task.id === active.id));

        }
    };

    return (
        <>
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
                                    {/* <!-- Lead Details Card --> */}
                                    <div class="col-sm-4 col-xl-4">
                                        <div class="card crd_detil">
                                            <div class="card-body">
                                                <div class="d-flex align-items-start justify-content-between">
                                                    {/*  <!-- Content Left --> */}
                                                    <div class="content-left">
                                                        <span class="fs-5 fw-bold">Lead Details</span>
                                                        <div class="d-flex align-items-end mt-2">
                                                            <h4 class="mb-0 me-2">SuperAdmin</h4>
                                                        </div>
                                                        <div class="row mt-2">
                                                            <div class="col-12 col-xl-4">
                                                                <div class="d-flex align-items-center mb-2">
                                                                    <i class="bx bx-envelope bx-sm me-2"></i>
                                                                    <p class="mb-0">Supedmin@gmail.com</p>
                                                                </div>
                                                                <div class="d-flex align-items-center">
                                                                    <i class="bx bx-phone bx-sm me-2"></i>
                                                                    <p class="mb-0">9876543210</p>
                                                                </div>
                                                            </div>
                                                            <div class="col-12 col-xl-8 text-end">
                                                                <p class="mb-0"><span class="fw-bold">Added On:</span> 01/07/2024</p>
                                                                <p class="text-center"><span class="fw-bold">Last Active:</span> NA</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/*    <!-- Avatar --> */}
                                                    <div class="avatar">
                                                        <span class="avatar-initial rounded bg-label-primary">
                                                            <i class="bx bx-user bx-sm"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* 
    <!-- Lead Score and Strength Cards --> */}
                                    <div class="col-sm-6 col-xl-2">
                                        {/*    <!-- Lead Score Card --> */}
                                        <div class="card crd_scor">
                                            <div class="card-body card_body text-center">
                                                <p class="mb-0 fs-4 fw-bold">3</p>
                                                <p class="mb-0">Lead Score</p>
                                            </div>
                                        </div>
                                        {/*         <!-- Lead Strength Card --> */}
                                        <div class="card mt-2">
                                            <div class="card-body card_body text-center">
                                                <p class="mb-0 fs-4 fw-bold">0%</p>
                                                <p class="mb-0">Lead Strength</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/*   <!-- Communication Status Card --> */}
                                    <div class="col-sm-6 col-xl-3">
                                        <div class="card crd_stat">
                                            <div class="card-body">
                                                <div class="d-flex align-items-start justify-content-between">
                                                    {/*    <!-- Content Left --> */}
                                                    <div class="content-left">
                                                        <span class="fs-5 fw-bold">Communication Status</span>
                                                        <div class="d-flex flex-column mt-2">
                                                            <p class="mb-0"><span class="fw-bold">Email Sent:</span> 0</p>
                                                            <p class="mb-0"><span class="fw-bold">SMS Sent:</span> 0</p>
                                                            <p class="mb-0"><span class="fw-bold">Whatsapp Sent:</span> 0</p>
                                                            <p class="mb-0"><span class="fw-bold">Upcoming Followup:</span> NA</p>
                                                        </div>
                                                    </div>
                                                    {/*   <!-- Avatar --> */}
                                                    <div class="avatar">
                                                        <span class="avatar-initial rounded bg-label-success">
                                                            <i class="bx bx-group bx-sm"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/*     <!-- Telephony Status Card --> */}
                                    <div class="col-sm-6 col-xl-3">
                                        <div class="card card_telephony">
                                            <div class="card-body">
                                                <div class="d-flex align-items-start justify-content-between">
                                                    {/*   <!-- Content Left --> */}
                                                    <div class="content-left">
                                                        <span class="fs-5 fw-bold">Telephony Status</span>
                                                        <div class="d-flex flex-column mt-2">
                                                            <p class="mb-0"><span class="fw-bold">Inbound Call:</span> 0</p>
                                                            <p class="mb-0"><span class="fw-bold">Outbound Call:</span> 0</p>
                                                            <p class="mb-0"><span class="fw-bold">Lead Source:</span> Offline: Expo</p>
                                                        </div>
                                                    </div>
                                                    {/*   <!-- Avatar --> */}
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


                                <div className="">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-12 col-md-1 col-xl-1 col-lg-1">
                                                <div className="stepper-steps">
                                                    <div className={`step ${step === 1 ? 'active' : 'bx bx-check tf-icons chek_icon'}`}> <span className={`step ${step === 1 ? 'active disply' : 'displys'}`}>1</span></div>
                                                    <div className={`line ${step > 1 ? 'active' : ''}`}></div>
                                                    <div className={`step step_line ${step === 2 ? 'active' : 'bx bx-check tf-icons chek_icon'}`}> <span className={`step ${step === 2 ? 'active disply' : 'displys'}`}>2</span></div>
                                                    <div className={`line ${step > 2 ? 'active' : ''}`}></div>
                                                    <div className={`step step_line ${step === 3 ? 'active' : ''}`}> 3</div>
                                                    <div className={`line ${step > 3 ? 'active' : ''}`}></div>
                                                    <div className={`step step_line ${step === 4 ? 'active' : ''}`}> 4</div>
                                                    <div className={`line ${step > 4 ? 'active' : ''}`}></div>
                                                    <div className={`step step_line ${step === 5 ? 'active' : ''}`}>5</div>
                                                    <div className={`line ${step > 5 ? 'active' : ''}`}></div>
                                                    <div className={`step step_line ${step === 6 ? 'active' : ''}`}>6</div>
                                                    <div className={`line ${step > 6 ? 'active' : ''}`}></div>
                                                    <div className={`step step_line ${step === 7 ? 'active' : ''}`}>7</div>


                                                </div>
                                            </div>
                                            <div className="col-12 col-md-11 col-xl-11 col-lg-11 ">
                                                <Form className="stepper-form ">
                                                    {step === 1 && (
                                                        <div className="step-content">
                                                            <div className="container">
                                                                <div className="row">
                                                                    {/*              <!-- Lead Details Card --> */}
                                                                    <div className="col-12 col-md-6 col-xl-5 mt-3">
                                                                        <div className="card card-lead-details shadow-sm">
                                                                            <div className="card-body">
                                                                                <h2 className="card-title-lead">Lead Details</h2>
                                                                                <div className="card-status-lead d-flex align-items-center mb-3">
                                                                                    <i className="bx bx-check-double menu-icon-lead tf-icons me-2"></i>
                                                                                    <span className="status-text-lead">Verified Lead</span>
                                                                                </div>
                                                                                <div className="card-profile-lead d-flex align-items-center mb-3">
                                                                                    <div className="avatar-lead">
                                                                                        <i className="bx bx-user bx-lg"></i>
                                                                                    </div>
                                                                                    <div className="profile-info-lead ms-3">
                                                                                        <p className="mb-0 fw-bold">Super Admin</p>
                                                                                        <p className="text-muted">superadmin@gmail.com</p>
                                                                                    </div>
                                                                                </div>
                                                                                <p className="card-descriptionlead mb-4">
                                                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                                                                                </p>
                                                                                <div className="row">
                                                                                    <div className="col-12 col-md-6 mb-3">
                                                                                        <div className="d-flex flex-column lead-info">
                                                                                            <div className="info-item mb-2">
                                                                                                <i className="bx bx-calendar info-icon"></i>
                                                                                                <span className="info-text">01/11/2023</span>
                                                                                            </div>
                                                                                            <div className="info-item mb-2">
                                                                                                <i className="bx bx-briefcase info-icon"></i>
                                                                                                <span className="info-text">Employee</span>
                                                                                            </div>

                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-12 col-md-6 mb-3">
                                                                                        <div className="d-flex flex-column lead-info">
                                                                                            <div className="info-item mb-2">
                                                                                                <i className="bx bx-phone info-icon"></i>
                                                                                                <span className="info-text">9876543210</span>
                                                                                            </div>
                                                                                            <div className="info-item">
                                                                                                <i className="bx bx-group info-icon"></i>
                                                                                                <span className="info-text">Lead Platform</span>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-12 col-md-4 text-end">
                                                                                        <Button variant="primary" onClick={handleNext}>Next <i className="fa-arrow-right fa-regular fa-sharp ml--10"></i></Button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {/*   <!-- Empty Space (Optional) --> */}
                                                                    <div className="col-12 col-md-6 col-xl-7 mt-3">
                                                                        {/*    <!-- Additional content or empty space --> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    )}

                                                    {step === 2 && (
                                                        <div className="step-content">
                                                            <div className="row">
                                                                <div className="col-12 col-md-5 col-xl-5 col-lg-5">
                                                                    <div className="card-details p-4 bg-light shadow-sm rounded">
                                                                        <h2 className="mb-4">Re-assign Lead</h2>
                                                                        <h4 className="mb-4">{selectedTask && selectedTask.name}</h4>
                                                                        {selectedTask && (
                                                                            <form id={selectedTask.id}>
                                                                                <div className="mb-4">
                                                                                    <label className="form-label">Head Owner(s) - Assigned from</label>
                                                                                    <select className="form-select">
                                                                                        <option value={dataUserss.id}>{dataUserss.name}</option>
                                                                                    </select>
                                                                                </div>
                                                                                <div className="mb-4">
                                                                                    <label className="form-label">Head Owner(s) - Assigned to</label>
                                                                                    <select
                                                                                        id={`roleSelect-${selectedTask.id}`}
                                                                                        className="form-select"
                                                                                        value={roleId}
                                                                                        onChange={(e) => setRoleId(e.target.value)}
                                                                                    >
                                                                                        <option value="">-Select Assigned to-</option>
                                                                                        {dataUser.map(option => (
                                                                                            <option key={option.id} value={option.id}>{option.name}</option>
                                                                                        ))}
                                                                                    </select>
                                                                                </div>
                                                                                {telecallerPersonNames[selectedTask.id] !== null && (
                                                                                    <div className="mb-4">
                                                                                        <input
                                                                                            className="form-check-input"
                                                                                            type="checkbox"
                                                                                            id={`telecallerPersonName-${selectedTask.id}`}
                                                                                            name="telecallerPersonNames"
                                                                                            checked={telecallerPersonNames[selectedTask.id] === "Allotted"}
                                                                                            onChange={(e) => handleUpdate(e, selectedTask.id)}
                                                                                        />
                                                                                        <span>
                                                                                            {telecallerPersonNames[selectedTask.id] ? telecallerPersonNames[selectedTask.id] : "Re-assignment Remark"}
                                                                                        </span>
                                                                                    </div>
                                                                                )}
                                                                                <div className="justify-content-between mt-4">
                                                                                    <div className="row d-flex">
                                                                                        <div className="col-md-6">
                                                                                            <Button variant="secondary" onClick={handlePrevious}>Previous</Button>
                                                                                        </div>
                                                                                        <div className="col-md-6">
                                                                                            <Button variant="primary" onClick={handleNext}>Next</Button>
                                                                                        </div>
                                                                                    </div>


                                                                                </div>
                                                                            </form>
                                                                        )}
                                                                        <div className="col-12 col-md-3 text-end">
                                                                            <button variant="primary" onClick={handleNext}>Skip <i className="fa-arrow-right fa-regular fa-sharp ml--10"></i></button>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-12 col-md-7 col-xl-7 col-lg-7">
                                                                    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>

                                                                        <SortableContext items={table} strategy={verticalListSortingStrategy}>
                                                                            {table.map((tasks) => (
                                                                                <Draggable
                                                                                    key={tasks.id}
                                                                                    id={tasks.id}

                                                                                    component={
                                                                                        <div key={tasks.id}>
                                                                                            <div className="long_card py-3 mt-2">
                                                                                                <div className="row">
                                                                                                    <div className="col-12 col-xl-2 col-lg-2 col-md-2 date_col">
                                                                                                        <div className="">
                                                                                                            <p className="dates">{tasks.date}</p>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className="col-12 col-xl-8 col-lg-8 col-md-8">
                                                                                                        <div>
                                                                                                            <p className="namee">{tasks.name}</p>
                                                                                                            <div>
                                                                                                                <span>{tasks.email}</span>
                                                                                                                <span className="ml--10">{tasks.phoneNumber}</span>
                                                                                                            </div>
                                                                                                            <div>
                                                                                                                <span>{tasks.workingStatus}</span>
                                                                                                                <span className="ml--10">{tasks.leadPlatform}</span>
                                                                                                            </div>
                                                                                                            <p className="mt-3">{tasks.remark}</p>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div className="col-12 col-xl-2 col-lg-2 col-md-2 date_col">
                                                                                                        <button className="btn btn-primary">Next</button>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>}
                                                                                />
                                                                            ))}
                                                                        </SortableContext>
                                                                    </DndContext>
                                                                </div>


                                                            </div>


                                                        </div>
                                                    )}

                                                    {step === 3 && (
                                                        <div className="step-content">
                                                            <div className="card">
                                                                <div className="card-datatable table-responsive">
                                                                    <table className="datatables-users table border-top">
                                                                        <thead>
                                                                            <tr>
                                                                                <th width="150px">S.NO</th>
                                                                                <th width="250px">Enquiry Forward</th>
                                                                                <th width="300px">Full Name</th>
                                                                                <th width="350px">Telecaller Person Name</th>
                                                                                <th width="190px;">Contact</th>
                                                                                <th width="200px;">Email</th>


                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {saleTeamData.map((item, index) => (
                                                                                <tr key={item.id}>
                                                                                    <td>{index + 1}</td>
                                                                                    <td>

                                                                                        <input
                                                                                            type="checkbox"
                                                                                            checked={createdItems[item.id] !== undefined ? createdItems[item.id] : item.TelecallerCheckbox}
                                                                                            onChange={(e) => handleCheckboxChange(e, item)}
                                                                                            disabled={item.TelecallerCheckbox}
                                                                                            data-bs-toggle="offcanvas" data-bs-target="#editTeam"

                                                                                        />
                                                                                    </td>

                                                                                    <td>{item.name}</td>

                                                                                    <td>{item.User && item.User.Role && item.User.Role.Name}</td>
                                                                                    <td>{item.phoneNumber}</td>
                                                                                    <td>{item.email}</td>

                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-md-3 text-md-start">
                                                                <button variant="primary" onClick={handleNext}>Next <i className="fa-arrow-right fa-regular fa-sharp ml--10"></i></button>
                                                            </div>
                                                            {/* Offcanvas Component */}
                                                            <div
                                                                className="offcanvas offcanvas-end w-40"
                                                                tabindex="-1"
                                                                id="editTeam"
                                                                aria-labelledby="offcanvasExampleLabel"
                                                                style={{ display: formVisible ? 'block' : 'none' }}
                                                            >
                                                                <div className="offcanvas-header">
                                                                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">Edit Team</h5>
                                                                    <button
                                                                        type="button"
                                                                        className="btn-close"
                                                                        aria-label="Close"
                                                                        onClick={() => setFormVisible(false)}
                                                                    ></button>
                                                                </div>
                                                                <div className="offcanvas-body">
                                                                    {selectedItem && (
                                                                        <form onSubmit={handleSubmit}>
                                                                            <div className="mb-3">
                                                                                <label htmlFor="edit-name" className="form-label">Full Name</label>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    id="edit-name"
                                                                                    value={selectedItem?.name || ''}
                                                                                    onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })}
                                                                                />
                                                                            </div>
                                                                            <div className="mb-3">
                                                                                <label htmlFor="edit-age" className="form-label">Age</label>
                                                                                <input
                                                                                    type="number"
                                                                                    className="form-control"
                                                                                    id="edit-age"
                                                                                    value={selectedItem?.age || ''}
                                                                                    onChange={(e) => setSelectedItem({ ...selectedItem, age: e.target.value })}
                                                                                />
                                                                            </div>
                                                                            <div className="mb-3">
                                                                                <input
                                                                                    type="hidden"
                                                                                    className="form-control telecallar-team"
                                                                                    id="add-user-fullname"
                                                                                    name='roleId'
                                                                                    value={selectedItem?.roleId || ''}
                                                                                    onChange={(e) => setSelectedItem({ ...selectedItem, roleId: e.target.value })}
                                                                                    style={{ display: "none" }}
                                                                                />
                                                                            </div>
                                                                            <div className="mb-3">
                                                                                <label htmlFor="edit-phone" className="form-label">Contact</label>
                                                                                <div className="d-flex align-items-center">
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        id="edit-phone"
                                                                                        value={selectedItem?.phoneNumber || ''}
                                                                                        onChange={(e) => setSelectedItem({ ...selectedItem, phoneNumber: e.target.value })}
                                                                                    />
                                                                                    <Button
                                                                                        variant="outline-secondary"
                                                                                        className="ml-2"
                                                                                        onClick={() => setShowOtpInput({ ...showOtpInput, mobile: !showOtpInput.mobile })}
                                                                                    >
                                                                                        <FaLock /> {showOtpInput.mobile ? 'Cancel' : 'Verify'}
                                                                                    </Button>
                                                                                </div>
                                                                                {showOtpInput.mobile && (
                                                                                    <div className="mt-2">
                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control"
                                                                                            placeholder="Enter OTP"
                                                                                            value={otp.mobile}
                                                                                            onChange={(e) => setOtp({ ...otp, mobile: e.target.value })}
                                                                                        />
                                                                                        <Button
                                                                                            variant="primary"
                                                                                            className="mt-2"
                                                                                            onClick={() => handleOtpVerification('mobile')}
                                                                                        >
                                                                                            Verify OTP
                                                                                        </Button>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                            <div className="mb-3">
                                                                                <label htmlFor="edit-email" className="form-label">Email</label>
                                                                                <div className="d-flex align-items-center">
                                                                                    <input
                                                                                        type="email"
                                                                                        className="form-control"
                                                                                        id="edit-email"
                                                                                        value={selectedItem?.email || ''}
                                                                                        onChange={(e) => setSelectedItem({ ...selectedItem, email: e.target.value })}
                                                                                    />
                                                                                    <Button
                                                                                        variant="outline-secondary"
                                                                                        className="ml-2"
                                                                                        onClick={() => setShowOtpInput({ ...showOtpInput, email: !showOtpInput.email })}
                                                                                    >
                                                                                        <FaEnvelope /> {showOtpInput.email ? 'Cancel' : 'Verify'}
                                                                                    </Button>
                                                                                </div>
                                                                                {showOtpInput.email && (
                                                                                    <div className="mt-2">
                                                                                        <input
                                                                                            type="text"
                                                                                            className="form-control"
                                                                                            placeholder="Enter OTP"
                                                                                            value={otp.email}
                                                                                            onChange={(e) => setOtp({ ...otp, email: e.target.value })}
                                                                                        />
                                                                                        <Button
                                                                                            variant="primary"
                                                                                            className="mt-2"
                                                                                            onClick={() => handleOtpVerification('email')}
                                                                                        >
                                                                                            Verify OTP
                                                                                        </Button>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                            <div className="mb-3">
                                                                                <label htmlFor="edit-working-status" className="form-label">Working Status</label>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    id="edit-working-status"
                                                                                    value={selectedItem?.workingStatus || ''}
                                                                                    onChange={(e) => setSelectedItem({ ...selectedItem, workingStatus: e.target.value })}
                                                                                />
                                                                            </div>
                                                                            <div className="mb-3">
                                                                                <label htmlFor="edit-lead-platform" className="form-label">Lead Platform</label>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    id="edit-lead-platform"
                                                                                    value={selectedItem?.leadPlatform || ''}
                                                                                    onChange={(e) => setSelectedItem({ ...selectedItem, leadPlatform: e.target.value })}
                                                                                />
                                                                            </div>
                                                                            <div className="mb-3">
                                                                                <label htmlFor="flatpickr-datetime" className="form-label">Visiting Date</label>
                                                                                <input
                                                                                    type="date"
                                                                                    className="form-control"
                                                                                    id="flatpickr-datetime"
                                                                                    name='visitDate'
                                                                                    defaultValue={visitDate}
                                                                                    onChange={(e) => setVisitDate(e.target.value)}
                                                                                />
                                                                            </div>
                                                                            <div className="mb-3">
                                                                                <label htmlFor="exampleFormControlSelect2" className="form-label">Status</label>
                                                                                <select
                                                                                    id="exampleFormControlSelect2"
                                                                                    className="form-select"
                                                                                    name="status"
                                                                                    value={status}
                                                                                    onChange={(e) => setStatus(e.target.value)}
                                                                                >
                                                                                    <option value="">----Choose one----</option>
                                                                                    <option value="1st Call">1st Call</option>
                                                                                    <option value="2nd Call">2nd Call</option>
                                                                                    <option value="3rd Call">3rd Call</option>
                                                                                    <option value="4th Call">4th Call</option>
                                                                                    <option value="Not Responding (N/R)">Not Responding (N/R)</option>
                                                                                    <option value="Other">Other</option>
                                                                                </select>
                                                                            </div>
                                                                            <div className="mb-3">
                                                                                <label htmlFor="modalEditTaxID" className="form-label">Remark</label>
                                                                                <input
                                                                                    type="text"
                                                                                    id="modalEditTaxID"
                                                                                    name="remark"
                                                                                    onChange={(e) => setRemark(e.target.value)}
                                                                                    defaultValue={remark}
                                                                                    className="form-control"
                                                                                    placeholder="Remark"
                                                                                />
                                                                            </div>
                                                                            <Button type="submit" className="btn btn-primary">Save</Button>
                                                                        </form>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {step === 4 && (
                                                        <div className="step-content">
                                                            <Form.Group controlId="formBasicPassword">
                                                                <Form.Label>Password</Form.Label>
                                                                <Form.Control type="password" placeholder="Password" />
                                                            </Form.Group>
                                                            <Button variant="secondary" onClick={handlePrevious}>Previous</Button>
                                                            <Button variant="primary" onClick={handleNext}>Next</Button>
                                                        </div>
                                                    )}
                                                    {step === 5 && (
                                                        <div className="step-content">
                                                            <Form.Group controlId="formBasicPassword">
                                                                <Form.Label>Password</Form.Label>
                                                                <Form.Control type="password" placeholder="Password" />
                                                            </Form.Group>
                                                            <Button variant="secondary" onClick={handlePrevious}>Previous</Button>
                                                            <Button variant="primary" onClick={handleNext}>Next</Button>
                                                        </div>
                                                    )}
                                                    {step === 6 && (
                                                        <div className="step-content">
                                                            <Form.Group controlId="formBasicPassword">
                                                                <Form.Label>Password</Form.Label>
                                                                <Form.Control type="password" placeholder="Password" />
                                                            </Form.Group>
                                                            <Button variant="secondary" onClick={handlePrevious}>Previous</Button>
                                                            <Button variant="primary" onClick={handleNext}>Next</Button>
                                                        </div>
                                                    )}
                                                    {step === 7 && (
                                                        <div className="step-content">
                                                            <Form.Group controlId="formBasicCheck">
                                                                <Form.Check type="checkbox" label="Agree to terms and conditions" />
                                                            </Form.Group>
                                                            <Button variant="secondary" onClick={handlePrevious}>Previous</Button>
                                                            <Button variant="primary" /* onClick={handleSubmit} */>Submit</Button>
                                                        </div>
                                                    )}
                                                </Form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*  <!-- Footer --> */}

                            <Footer />

                            {/*      <!-- / Footer --> */}

                        </div >
                    </div >
                    {/*     <!-- Overlay --> */}
                    < div class="layout-overlay layout-menu-toggle" ></div >
                </div >
                {/* / Layout wrapper  */}

            </div >
        </>
    )
}
export default SteperformComponent