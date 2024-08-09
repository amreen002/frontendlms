
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Footer from './footerComponent';
import Navbar from './navComponemt';
import DashBoardMenus from './dashboardsMenuComponent';
import { Button, Form } from 'react-bootstrap';
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import ThankYouCard from '../Components/thankyouComponent'; // Adjust the import path as needed
import Draggable from '../Components/draggableComponent';
import { FaLock, FaEnvelope, FaWhatsapp, FaGoogle, FaLinkedin, FaBriefcase, FaCircle } from 'react-icons/fa'; // Import necessary icons
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
const { REACT_APP_API_ENDPOINT, REACT_APP_API_IMG } = process.env;
function SteperformComponent() {
    const datatoken = localStorage.getItem('datatoken');
    const coursedatafetch = JSON.parse(datatoken)
    const { saleteamId } = useParams();
    const [formStepsNum, setFormStepsNum] = useState(1);
    const [table, setTable] = useState([]);
    const [dataUser, setTabledataUser] = useState([]);
    const [dataUserss, setTabledataUserssss] = useState({});
    const [roleId, setRoleId] = useState('');
    const [selectedTask, setSelectedTask] = useState(null);
    // State variables
    const [selectedItem, setSelectedItem] = useState([]);
    const [date, setDate] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [workingStatus, setWorkingStatus] = useState('');
    const [leadPlatform, setLeadPlatform] = useState('');
    const [status, setStatus] = useState('');
    const [remark, setRemark] = useState('')
    const [createdAt, setCreatedAt] = useState('');
    const [visitDate, setVisitDate] = useState('')
    const [gender, setGender] = useState('');
    const [Education, setEducation] = useState('')
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
    const [userData, setUserData] = useState({});
    const [formVisible, setFormVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [saleTeamData, setSaleTeamData] = useState([]);
    const [teamData, setTeamData] = useState([]);
    const [TelecallerCheckbox, setTelecallerCheckbox] = useState(false);
    const [createdItems, setCreatedItems] = useState({});
    const [AddressableId, setAddressableId] = useState('');
    const [batchId, setbatchId] = useState('');
    const [courseId, setcourseId] = useState('');
    const [lead_status, setleadstatus] = useState('');
    const [username, setusername] = useState('');
    const [coursesTable, setCoursesTable] = useState([]);
    const [countryTable, setCountryTable] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [frontdesk, setFront] = useState([]);
    const { frontdeskId } = useParams();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // Track total pages for pagination
    const [otp, setOtp] = useState({ phone: '', email: '' });
    const [otpVerified, setOtpVerified] = useState({ phone: false, email: false });
    const [phoneNumber, setPhoneNumber] = useState(selectedItem ? selectedItem.phoneNumber : '');
    const [showOtpInput, setShowOtpInput] = useState({ phone: false, email: false });
    const [otpSentTime, setOtpSentTime] = useState(null);
    const [timeLeft, setTimeLeft] = useState(0);
    const [email, setEmail] = useState(selectedItem ? selectedItem.email : '');

    useEffect(() => {
        if (otpSentTime) {
            const timer = setInterval(() => {
                const timeElapsed = Math.floor((Date.now() - otpSentTime) / 1000);
                const timeRemaining = 60 - timeElapsed; // Adjusted to 30 seconds
                setTimeLeft(timeRemaining);
                if (timeRemaining <= 0) {
                    clearInterval(timer);
                    setShowOtpInput({ phone: false, email: false });
                }
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [otpSentTime]);

    const handleCountryChange = (e) => {
        const selectedCountryId = parseInt(e.target.value);
        const selectedCountry = countryTable.find(country => country.id === selectedCountryId);
        setCountryId(selectedCountryId);
        setSelectedCountry(selectedCountry);
        setStateId(''); // Reset state and district selections
        setSelectedState('');
        setDistrictId('');
    };


    const handleStateChange = (e) => {
        const selectedStateId = parseInt(e.target.value);
        const selectedState = selectedCountry ? selectedCountry.Staties.find(state => state.id === selectedStateId) : '';
        setStateId(selectedStateId);
        setSelectedState(selectedState);
        setDistrictId(''); // Reset district selection
    };
    const isToday = (date) => {
        const today = new Date();
        return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
    };
    const leadIcon = (lead) => {
        if (isToday(new Date(lead.createdAt))) {
            return lead.TelecallerCheckbox ? (
                <i className="lead-li-icon fa-sharp fa-solid fa-circle-c" style={{ color: "green" }}></i>
            ) : (
                <i className="lead-li-icon fa-sharp fa-solid fa-circle-t" style={{ color: "#FF9800" }}></i>
            );
        } else {
            return lead.TelecallerCheckbox ? (
                <i className="lead-li-icon fa-sharp fa-solid fa-circle-c" style={{ color: "green" }}></i>
            ) : (
                <i className="lead-li-icon fa-sharp fa-solid fa-circle-o" style={{ color: "#007BFF" }}></i>
            );
        }
    };
    const [telecallerPersonNames, setTelecallerPersonNames] = useState(() => {
        const savedNames = JSON.parse(localStorage.getItem('telecallerPersonNames'));
        return savedNames !== null ? savedNames : {};
    });

    useEffect(() => {
        fetchData0();
        fetchData();
        fetchData2()
        fetchData3()
        fetchData4()
        fetchData5()
        fetchData6()
        fetchData7()
        fetchData8()
    }, []);


    useEffect(() => {
        fetchData4(saleteamId);
    }, [saleteamId]);

    useEffect(() => {
        fetchData9(frontdeskId);
    }, [frontdeskId]);

    useEffect(() => {
        fetchData0(page);
        fetchData5(page);
        fetchData8(page)
    }, [page]);

    useEffect(() => {
        if (selectedItem) {
            setName(selectedItem.name || '');
            setLastName(selectedItem.lastname || '');
            setRoleId(selectedItem.roleId || '');
            setPhoneNumber(selectedItem.phoneNumber || '');
            setEmail(selectedItem.email || '');
            setWorkingStatus(selectedItem.workingStatus || '');
            setLeadPlatform(selectedItem.leadPlatform || '');
            setVisitDate(selectedItem.visitDate || '');
            setStatus(selectedItem.status || '');
            setRemark(selectedItem.remark || '');
            setAddressableId(selectedItem.AddressableId || '');
            setbatchId(selectedItem.batchId || '');
            setcourseId(selectedItem.courseId || '');
            setleadstatus(selectedItem.lead_status || '');
            setusername(selectedItem.username || '');
        }
    }, [selectedItem]);

    const fetchData0 = async (page = 1) => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/usertelecallerteam?page=${page}`, {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                });
                const userData = response.data.usertelecallerteam.rows;
                setTotalPages(response.data.usertelecallerteam.totalPage || 1); // Ensure totalPages has a default value
                console.log(userData)
                setSaleTeamData(userData)
                setDate(userData.date)
                setName(userData.name);
                setAge(userData.age);
                setPhoneNumber(userData.phoneNumber);
                setEmail(userData.email);
                setWorkingStatus(userData.workingStatus);
                setLeadPlatform(userData.leadPlatform);
                setRoleId(userData.roleId)
                setStatus(userData.status)
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
                setUserData(userData);
                setName(userData.name);
                setLastName(userData.lastname);
                setAge(userData.age);
                setPhoneNumber(userData.phoneNumber);
                setEmail(userData.email);
                setWorkingStatus(userData.workingStatus);
                setLeadPlatform(userData.leadPlatform);
                setTelecallerCheckbox(userData.TelecallerCheckbox);
                setRoleId(userData.roleId);
                setStatus(userData.status);
                setAddressableId(userData.AddressableId);
                setbatchId(userData.batchId);
                setcourseId(userData.courseId);
                setleadstatus(userData.lead_status);
                setusername(userData.username);
            }
        } catch (err) {
            console.log(err.response);
        }
    };


    const fetchData5 = async (page = 1) => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/listtelecallerteam?page=${page}`, {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                });
                const userData = response.data.telecallerdepartment.rows;
                setTotalPages(response.data.telecallerdepartment.totalPage || 1); // Ensure totalPages has a default value
                setTeamData(userData)
                setDate(userData.date)
                setName(userData.name);
                setPhoneNumber(userData.phoneNumber);
                setEmail(userData.email);
                setAge(userData.age);
                setWorkingStatus(userData.workingStatus);
                setRemark(userData.remark);
                setVisitDate(userData.visitDate);
                setRoleId(userData.roleId)
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchData6 = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/courses`, {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                });
                const userData = response.data.courses;
                setCoursesTable(userData)
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchData7 = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/listcountry`, {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                });
                const userData = response.data.country;
                setCountryTable(userData)
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchData8 = async (page = 1) => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/listfrontdesk?page=${page}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setFront(response.data.frontdesk.rows);
                setTotalPages(response.data.frontdesk.totalPage || 1); // Ensure totalPages has a default value
            }
        } catch (err) {
            console.log(err.response);
        }
    }
    const fetchData9 = async (frontdeskId) => {
        try {
            if (!frontdeskId) {
                console.log("frontdeskId is undefined");
                return;
            }
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/listfrontdesk/${frontdeskId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const userData = response.data.frontdesk;
                setUserData(userData)
                setGender(userData.gender)
                setEducation(userData.Education);
                setcourseId(userData.courseId);
                setAddressType(userData.Address.AddressType);
                setPostalCode(userData.Address.PostalCode);
                setAddress(userData.Address.Address);
                setCity(userData.Address.City);
                setArea(userData.Address.Area);
                setDistrictId(userData.Address.DistrictId);
                setStateId(userData.Address.StateId);
                setCountryId(userData.Address.CountryId);
                setCounselingDepartmentAllotted(userData.CounselingDepartmentAllotted);
                setCounselorName(userData.CounselorName);
                setCounselorRoomNo(userData.CounselorRoomNo);
                setRemark(userData.remark)

            }
        } catch (err) {
            console.log(err.response);
        }
    }


    const handleSubmit2 = async (e) => {
        e.preventDefault();
        try {
            let formData = { name, workingStatus, phoneNumber, email, age, date, remark, visitDate, roleId, gender, Education, courseId, AddressType, PostalCode, Address, DistrictId, City, StateId, CountryId, Area, CounselingDepartmentAllotted, CounselorName, CounselorRoomNo }
            const token = localStorage.getItem('token');
            if (token) {
                await axios.post(`${REACT_APP_API_ENDPOINT}/addfrontdesk`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                });

                alert("Enquiry Created SuccessFully");
            }


            const promises = Object.entries(createdItems).map(([telecallerteamId, isChecked]) => {
                const updatedUserData = { TelecallerCheckbox: isChecked };
                return axios.patch(`${REACT_APP_API_ENDPOINT}/updatetelecallerteam/${telecallerteamId}`, updatedUserData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
            });

            await Promise.all(promises);
            handleNext()
            fetchData6()
            // Clear local changes after successful update
            setCreatedItems({});
        } catch (error) {
            console.log(error)
            alert('Failed to send message.');
        }
    }


    useEffect(() => {
        localStorage.setItem('telecallerPersonNames', JSON.stringify(telecallerPersonNames));
    }, [telecallerPersonNames]);

    const handleOtpVerification = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${REACT_APP_API_ENDPOINT}/verifyotp`, { otp, phoneNumber, email });
            if (response.data.success) {
                alert('OTP verified successfully');
                setOtpSentTime(Date.now());
                setShowOtpInput(true);
                // You can add additional actions upon successful verification
            } else {
                alert('Invalid OTP');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
        }
    };

    const handleSendOtp = async (e, type) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (token) {
                let response = await axios.post(`${REACT_APP_API_ENDPOINT}/sendotp`, {
                    phoneNumber: type === 'phone' ? phoneNumber : undefined,
                    email: type === 'email' ? email : undefined
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                })
                if (response.status === 200) {
                    alert('OTP sent successfully');
                    setOtpSentTime(Date.now());
                    setShowOtpInput(prevState => ({ ...prevState, [type]: true }));
                } else {
                    alert('Failed to send OTP');
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

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
            setLastName(item.lastname);
            setAddressableId(item.AddressableId);
            setbatchId(item.batchId);
            setcourseId(item.courseId);
            setleadstatus(item.lead_status);
            setusername(item.username);
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
            setLastName('');
            setRoleId('')
            setAddressableId('');
            setbatchId('');
            setcourseId('');
            setleadstatus('');
            setusername('');
            setFormVisible(false);
        }

    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e)
        try {


            const token = localStorage.getItem('token');
            if (token) {
                const formData = { name, age, phoneNumber, email, workingStatus, leadPlatform, date, status, remark, visitDate, roleId, lastname, username, courseId, batchId, AddressableId, lead_status };
                if (window.confirm('Are you sure you want to Lead Forwarded ?')) {
                    // Save it! 
                    await axios.post(`${REACT_APP_API_ENDPOINT}/addtelecallerteam`, formData, {
                        headers: {
                            Authorization: `Bearer ${token}`

                        }
                    });
                    alert('Lead Forwarded To Front Desk');
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
            handleNext()
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

    const handleUpdate2 = async (e) => {
        e.preventDefault();
        try {
            const updatedUserData = { remark, gender, Education, courseId, AddressType, PostalCode, Address, DistrictId, City, StateId, CountryId, Area, CounselingDepartmentAllotted, CounselorName, CounselorRoomNo };
            const token = localStorage.getItem('token');

            if (token) {
                await axios.patch(`${REACT_APP_API_ENDPOINT}/viewsfrontdesk/${frontdeskId}`, updatedUserData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                fetchData(frontdeskId);
                alert("updated successfully!");
            }
        } catch (error) {
            console.error('Error updating:', error);
            alert('An error occurred while updating');
        }

    };

    const handleNext = () => {
        if (formStepsNum < 6) {
            setFormStepsNum(formStepsNum + 1);
        }
    };

    const handlePrevious = () => {
        if (formStepsNum > 1) {
            setFormStepsNum(formStepsNum - 1);
        }
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active && over && active.id !== over.id) {
            setSaleTeamData((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
            setSelectedTask(saleTeamData.find(task => task.id === active.id));

        }
    };

    const getProgressWidth = () => {
        const progressWidths = ['0%', '0%', '25%', '48%', '73%', '96%'];
        return progressWidths[formStepsNum] || '0%';
    };
    const isPrevDisabled = formStepsNum === 1;
    const isNextDisabled = formStepsNum === 6;
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
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
                                                            <span class="mb-0 me-2">SuperAdmin</span>
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

                                <div className="create-te-course-area-start ptb--25 bg-white">
                                    <div className="container">
                                        <div className="row  g-5">
                                            <div className="col-12 col-md-12 col-xl-12 col-lg-12">
                                                {/* Progress Bar */}
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
                                                    <div className={`circle ${formStepsNum >= 5 ? 'active' : ''} ${formStepsNum > 5 ? 'checkmark-visible' : ''}`} data-title="FiveStep">
                                                        {formStepsNum > 5 ? <span className="checkmark">✔</span> : '5'}
                                                    </div>
                                                    <div className={`circle ${formStepsNum >= 1 ? 'active' : ''} ${formStepsNum > 1 ? 'checkmark-visible' : ''}`} data-title="Links">
                                                        {formStepsNum > 1 ? <span className="checkmark">✔</span> : '1'}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-12 col-xl-12 col-lg-12 ">
                                                {/* Form Steps */}
                                                {formStepsNum === 1 && (
                                                    <div className="step-content">
                                                        <div className="container">
                                                            <div className="row">
                                                                {/*              <!-- Lead Details Card --> */}
                                                                <div className="col-12 col-md-12 col-xl-12 mt-1">
                                                                    <div className="card card-lead-details shadow-sm">
                                                                        <div className="table-responsive">
                                                                            <table className="table table-hover">
                                                                                <thead>
                                                                                    <tr>
                                                                                        <th scope="col" width="50px">s.no</th>
                                                                                        <th scope="col" width="50px">Lead</th>
                                                                                        <th scope="col" width="300px" >Name</th>
                                                                                        <th scope="col" width="300px">Email</th>
                                                                                        <th scope="col" width="300px">Assign to Users</th>
                                                                                        <th scope="col" width="150px">Specialistion</th>
                                                                                        <th scope="col" width="150px">Contact</th>
                                                                                        <th scope="col" width="100px">Platform</th>

                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    {saleTeamData.map((lead, index) => (
                                                                                        <tr key={lead.id}>
                                                                                            <td>{(page - 1) * 10 + index + 1}</td>
                                                                                            <td>
                                                                                                {leadIcon(lead)}
                                                                                            </td>
                                                                                            <td>
                                                                                                <i class="fa-solid fa-user me-2"></i>{lead.name}<span>{lead.lastname}</span>
                                                                                            </td>
                                                                                            <td>
                                                                                                <a
                                                                                                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(lead.email)}&su=${encodeURIComponent('Inquiry from Technogaze')}&body=${encodeURIComponent('Hello,I am reaching out from Technogaze regarding...')}`}
                                                                                                    target="_blank"
                                                                                                    rel="noopener noreferrer"
                                                                                                >
                                                                                                    <i className="fa-solid fa-envelope me-2"></i>
                                                                                                    <span>{lead.email}</span>
                                                                                                </a>
                                                                                            </td>
                                                                                            <td>{lead.User && lead.User.Role && lead.User.Role.Name}</td>
                                                                                            <td>
                                                                                                <div className="d-flex align-items-center">
                                                                                                    <i className="bx bx-briefcase me-2"></i>
                                                                                                    <span>{lead.workingStatus}</span>
                                                                                                </div>
                                                                                            </td>
                                                                                            <td>
                                                                                                <div className="d-flex align-items-center">
                                                                                                    <a href={`https://web.whatsapp.com/send?phone=+919893688878&text=Hello`} target="_blank" rel="noopener noreferrer">
                                                                                                        <FaWhatsapp className="lead-li-icon me-2 " color="#25D366" /> {/* WhatsApp icon */}
                                                                                                    </a>
                                                                                                    <a href={`tel:${lead.phoneNumber}`}>
                                                                                                        <span>{lead.phoneNumber}</span>
                                                                                                    </a>


                                                                                                </div>
                                                                                            </td>
                                                                                            <td>
                                                                                                <div className="align-items-center">
                                                                                                    {lead.leadPlatform == "Google" ? (
                                                                                                        <a href={`https://www.google.com/search?q=${lead.leadPlatform}`} target="_blank" rel="noopener noreferrer">
                                                                                                            <FaGoogle color="#4285F4" /> {/* Google icon */}
                                                                                                        </a>
                                                                                                    ) : lead.leadPlatform == "LinkedIn" ? (
                                                                                                        <a href={`https://www.linkedin.com/search/results/all/?keywords=${lead.leadPlatform}`} target="_blank" rel="noopener noreferrer">
                                                                                                            <FaLinkedin color="#0077B5" /> {/* LinkedIn icon */}
                                                                                                        </a>
                                                                                                    ) : lead.leadPlatform == "Indeed" ? (
                                                                                                        <a href={`https://www.indeed.com/q-${lead.leadPlatform}-jobs.html`} target="_blank" rel="noopener noreferrer">
                                                                                                            <i class="fa-sharp fa-solid fa-info" style={{ color: "#2557a7" }}></i>
                                                                                                            {/*   <FaBriefcase className="me-2" color="#FAFAFA" /> {/* Indeed icon */}
                                                                                                        </a>
                                                                                                    ) : (<i className="bx bx-briefcase"></i>)

                                                                                                    }




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
                                                        <div className="col-12 col-md-2 text-end mt-3">
                                                            <button variant="primary" onClick={handleNext}>Next <i className="fa-arrow-right fa-regular fa-sharp ml--10"></i></button>
                                                        </div>
                                                    </div>
                                                )}
                                                {formStepsNum === 2 && (
                                                    <><div className="step-content">
                                                        <div className="row">
                                                            <div className="col-12 col-md-5 col-xl-5 col-lg-5 mt-1">
                                                                <div className="card-details p-4 bg-light shadow-sm rounded">
                                                                    <h2 className="mb-4">Re-Assign Lead</h2>
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
                                                                                    defaultValue={roleId}
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


                                                                <div>
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

                                                            <div className="col-12 col-md-7 col-xl-7 col-lg-7">
                                                                <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>

                                                                    <SortableContext items={saleTeamData} strategy={verticalListSortingStrategy}>
                                                                        {saleTeamData.map((tasks) => (
                                                                            <Draggable
                                                                                key={tasks.id}
                                                                                id={tasks.id}

                                                                                component={
                                                                                    <div key={tasks.id}>
                                                                                        <div className="long_card py-3 mt-2">
                                                                                            <div className="row">
                                                                                                <div className="col-12 col-xl-2 col-lg-2 col-md-2 date_col">
                                                                                                    <div className="">
                                                                                                        <p className="dates">{leadIcon(tasks)}</p>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="col-12 col-xl-8 col-lg-8 col-md-8">
                                                                                                    <div>
                                                                                                        <p className="namee">{tasks.name} {tasks.lastname}</p>
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

                                                    </>
                                                )}
                                                {formStepsNum === 3 && (
                                                    <div className="row">
                                                        {/*              <!-- Lead Details Card --> */}
                                                        <div className="col-12 col-md-12 col-xl-12 mt-1">
                                                            <div className="card">
                                                                <div className="card-header">
                                                                    <h5 className="card-title">Lead Details</h5>
                                                                </div>
                                                                <div className="card-datatable table-responsive">
                                                                    <table className="datatables-users table table-striped border-top">
                                                                        <thead>
                                                                            <tr>
                                                                                <th scope="col">S.NO</th>
                                                                                <th scope="col">Update Lead</th>
                                                                                <th scope="col">Enquiry Forward</th>
                                                                                <th scope="col">Full Name</th>
                                                                                <th scope="col">Assign to Users</th>
                                                                                <th scope="col">Contact</th>
                                                                                <th scope="col">Email</th>
                                                                                <th scope="col">Platform</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {saleTeamData.map((item, index) => (
                                                                                <tr key={item.id}>
                                                                                    <td>{(page - 1) * 10 + index + 1}</td>
                                                                                    <td>{leadIcon(item)}</td>
                                                                                    {coursedatafetch && coursedatafetch.Role && item.User && item.User.Role && coursedatafetch.Role.Name === item.User.Role.Name ? (
                                                                                        <td>
                                                                                            <input
                                                                                                type="checkbox"
                                                                                                checked={createdItems[item.id] !== undefined ? createdItems[item.id] : item.TelecallerCheckbox}
                                                                                                onChange={(e) => handleCheckboxChange(e, item)}
                                                                                                disabled={item.TelecallerCheckbox}
                                                                                                data-bs-toggle="offcanvas"
                                                                                                data-bs-target="#editTeam"
                                                                                            />
                                                                                        </td>
                                                                                    ) : (
                                                                                        <td>
                                                                                            <input
                                                                                                type="checkbox"
                                                                                                disabled
                                                                                                data-bs-toggle="offcanvas"
                                                                                                data-bs-target="#editTeam"
                                                                                            />
                                                                                        </td>
                                                                                    )}

                                                                                    <td>
                                                                                        <i class="fa-solid fa-user me-2"></i>{item.name}<span>{item.lastname}</span>
                                                                                    </td>
                                                                                    <td>{item.User && item.User.Role && item.User.Role.Name}</td>
                                                                                    <td>
                                                                                        <div className="d-flex align-items-center">
                                                                                            <a href={`https://web.whatsapp.com/send?phone=+919893688878&text=Hello`} target="_blank" rel="noopener noreferrer">
                                                                                                <FaWhatsapp className="lead-li-icon me-2" color="#25D366" />
                                                                                            </a>
                                                                                            <a href={`tel:${item.phoneNumber}`}>
                                                                                                <span>{item.phoneNumber}</span>
                                                                                            </a>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td>
                                                                                        <a
                                                                                            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(item.email)}&su=${encodeURIComponent('Inquiry from Technogaze')}&body=${encodeURIComponent('Hello,I am reaching out from Technogaze regarding...')}`}
                                                                                            target="_blank"
                                                                                            rel="noopener noreferrer"
                                                                                        >
                                                                                            <i className="fa-solid fa-envelope me-2"></i>
                                                                                            <span>{item.email}</span>
                                                                                        </a>
                                                                                    </td>
                                                                                    <td>
                                                                                        <div className="d-flex align-items-center">
                                                                                            {item.leadPlatform == "Google" ? (
                                                                                                <a href={`https://www.google.com/search?q=${item.leadPlatform}`} target="_blank" rel="noopener noreferrer">
                                                                                                    <FaGoogle className="me-2" color="#4285F4" /> {/* Google icon */}
                                                                                                </a>
                                                                                            ) : item.leadPlatform == "LinkedIn" ? (
                                                                                                <a href={`https://www.linkedin.com/search/results/all/?keywords=${item.leadPlatform}`} target="_blank" rel="noopener noreferrer">
                                                                                                    <FaLinkedin className="me-2" color="#0077B5" /> {/* LinkedIn icon */}
                                                                                                </a>
                                                                                            ) : item.leadPlatform == "Indeed" ? (
                                                                                                <a href={`https://www.indeed.com/q-${item.leadPlatform}-jobs.html`} target="_blank" rel="noopener noreferrer">
                                                                                                    <i class="fa-sharp fa-solid fa-info" style={{ color: "#2557a7" }}></i>
                                                                                                    {/*   <FaBriefcase className="me-2" color="#FAFAFA" /> {/* Indeed icon */}
                                                                                                </a>
                                                                                            ) : (<i className="bx bx-briefcase me-2"></i>)

                                                                                            }


                                                                                            <span>{item.leadPlatform}</span>
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
                                                        {/* Offcanvas Component */}
                                                        <div
                                                            className="offcanvas offcanvas-end"
                                                            tabIndex="-1"
                                                            id="editTeam"
                                                            aria-labelledby="offcanvasExampleLabel"
                                                            style={{ display: formVisible ? 'block' : 'none' }}
                                                        >
                                                            <div className="offcanvas-header">
                                                                <h5 className="offcanvas-title" id="offcanvasExampleLabel">Verify Form Counselor</h5>
                                                                <button
                                                                    type="button"
                                                                    className="btn-close"
                                                                    aria-label="Close"
                                                                    onClick={() => setFormVisible(false)}
                                                                ></button>
                                                            </div>
                                                            <div className="offcanvas-body">
                                                                {selectedItem && (
                                                                    <form className="row" onSubmit={handleSubmit}>
                                                                        <div className="mb-3">
                                                                            <label htmlFor="edit-first-name" className="form-label">First Name</label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                id="edit-first-name"
                                                                                value={selectedItem.name}
                                                                                onChange={(e) => setName(e.target.value)}
                                                                            />
                                                                        </div>
                                                                        <div className="mb-3">
                                                                            <label htmlFor="edit-last-name" className="form-label">Last Name</label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                id="edit-last-name"
                                                                                value={selectedItem.lastname}
                                                                                onChange={(e) => setLastName(e.target.value)}
                                                                            />
                                                                        </div>
                                                                        <input
                                                                            type="hidden"
                                                                            className="form-control telecallar-team"
                                                                            id="add-user-roleId"
                                                                            name="roleId"
                                                                            value={selectedItem.roleId}
                                                                            onChange={(e) => setRoleId(e.target.value)}
                                                                        />
                                                                        <div className="mb-3">
                                                                            <label htmlFor="edit-phone" className="form-label">Contact</label>
                                                                            <div className="d-flex align-items-center">
                                                                                <input
                                                                                    type="tel"
                                                                                    className="form-control"
                                                                                    id="phoneNumber"
                                                                                    value={phoneNumber}
                                                                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                                                                    required
                                                                                />
                                                                                <button
                                                                                    type="button"
                                                                                    className="btn btn-outline-secondary ml-2"
                                                                                    onClick={(e) => handleSendOtp(e, 'phone')}
                                                                                /*  disabled={timeLeft > 0 && showOtpInput.phone} */
                                                                                >
                                                                                    {showOtpInput.phone ? 'Resend OTP' : 'Send OTP'}
                                                                                </button>
                                                                            </div>
                                                                            {showOtpInput.phone && (
                                                                                <div className="mt-2">
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        placeholder="Enter OTP"
                                                                                        value={otp.phone}
                                                                                        onChange={(e) => setOtp(prevState => ({ ...prevState, phone: e.target.value }))}
                                                                                    />
                                                                                    <button
                                                                                        type="button"
                                                                                        className="btn btn-primary mt-2"
                                                                                        onClick={(e) => handleOtpVerification(e, 'phone')}
                                                                                    /*   disabled={timeLeft <= 0} */
                                                                                    >
                                                                                        Verify OTP
                                                                                    </button>
                                                                                    {timeLeft > 0 && <p>OTP expires in {timeLeft} seconds</p>}
                                                                                </div>
                                                                            )}
                                                                        </div>


                                                                        <div className="mb-3">
                                                                            <label htmlFor="edit-email" className="form-label">Email</label>
                                                                            <div className="d-flex align-items-center">
                                                                                <input
                                                                                    type="email"
                                                                                    className="form-control"
                                                                                    id="email"
                                                                                    value={email}
                                                                                    onChange={(e) => setEmail(e.target.value)}
                                                                                    required
                                                                                />
                                                                                <button
                                                                                    type="button"
                                                                                    className="btn btn-outline-secondary ml-2"
                                                                                    onClick={(e) => handleSendOtp(e, 'email')}
                                                                                >
                                                                                    <FaEnvelope /> {showOtpInput.email ? 'Cancel' : 'Send OTP'}
                                                                                </button>
                                                                            </div>
                                                                            {showOtpInput.email && (
                                                                                <div className="mt-2">
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        placeholder="Enter OTP"
                                                                                        value={otp.email}
                                                                                        onChange={(e) => setOtp(prevState => ({ ...prevState, email: e.target.value }))}
                                                                                    />
                                                                                    <button
                                                                                        type="button"
                                                                                        className="btn btn-primary mt-2"
                                                                                        onClick={(e) => handleOtpVerification(e, 'email')}
                                                                                    >
                                                                                        Verify OTP
                                                                                    </button>
                                                                                    {timeLeft > 0 && <p>OTP expires in {timeLeft} seconds</p>}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                        <div className="mb-3">
                                                                            <label htmlFor="edit-working-status" className="form-label">Select Specialistion</label>
                                                                            <select id="exampleFormControlSelect2" class="select2 form-select enquery-form" name="workingStatus" placeholder='Select Specialistion*' value={selectedItem.workingStatus}
                                                                                onChange={(e) => setWorkingStatus(e.target.value)}>
                                                                                <option value="">Select Specialistion*</option>
                                                                                <option value="Employee">Employee</option>
                                                                                <option value="Student">Student</option>
                                                                                <option value="Entrepreneur">Entrepreneur</option>
                                                                            </select>
                                                                        </div>
                                                                        <div className="mb-3">
                                                                            <label htmlFor="edit-lead-platform" className="form-label">Lead Platform</label>
                                                                            <select id="exampleFormControlSelect2" class="select2 form-select enquery-form" name="leadPlatform" placeholder='Select Lead Platform*' value={selectedItem?.leadPlatform}
                                                                                onChange={(e) => setLeadPlatform(e.target.value)}>
                                                                                <option value="">Select Specialistion*</option>
                                                                                <option value="Google">Google</option>
                                                                                <option value="Linkdin">Linkdin</option>
                                                                                <option value="Indeen">Indeen</option>
                                                                                <option value="Directly">Directly Communication</option>
                                                                            </select>
                                                                        </div>
                                                                        <div className="mb-3">
                                                                            <label htmlFor="flatpickr-datetime" className="form-label">Visiting Date</label>
                                                                            <input
                                                                                type="date"
                                                                                className="form-control"
                                                                                id="flatpickr-datetime"
                                                                                name='visitDate'
                                                                                value={selectedItem?.visitDate}
                                                                                onChange={(e) => setVisitDate(e.target.value)}
                                                                            />
                                                                        </div>
                                                                        <div className="mb-3">
                                                                            <label htmlFor="exampleFormControlSelect2" className="form-label">Status</label>
                                                                            <select
                                                                                id="exampleFormControlSelect2"
                                                                                className="form-select"
                                                                                name="status"
                                                                                value={selectedItem?.status}
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
                                                                                value={selectedItem?.remark}
                                                                                onChange={(e) => setRemark(e.target.value)}
                                                                                className="form-control"
                                                                                placeholder="Remark"
                                                                            />
                                                                        </div>
                                                                        <button type="submit" className="btn btn-success" disabled={!otpVerified.phone && !otpVerified.email}>
                                                                            Submit
                                                                        </button>
                                                                    </form>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="justify-content-between mt-4">
                                                            <div className="row d-flex">
                                                                <div className="col-md-2">
                                                                    <Button variant="secondary" onClick={() => setFormStepsNum(prev => prev > 1 ? prev - 1 : prev)} disabled={formStepsNum === 1}>  <i className="fa-arrow-left fa-regular fa-sharp mr--10"></i>Previous</Button>
                                                                </div>
                                                                <div className="col-md-2">
                                                                    <Button variant="primary" onClick={() => setFormStepsNum(prev => prev < 5 ? prev + 1 : prev)} disabled={formStepsNum === 5}>Next  <i className="fa-arrow-right fa-regular fa-sharp ml--10"></i></Button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                )}
                                                {formStepsNum === 4 && (
                                                    <div className="step-content">
                                                        <div className="container">
                                                            <div className="row">
                                                                {/*              <!-- Lead Details Card --> */}
                                                                <div className="col-12 col-md-12 col-xl-12 mt-1">
                                                                    <div className="card">
                                                                        <div className="card-datatable table-responsive">
                                                                            <table className="datatables-users table border-top">
                                                                                <thead>
                                                                                    <tr>
                                                                                        <th width="50px">S.NO</th>
                                                                                        <th width="200px">Update Lead</th>
                                                                                        <th width="250px">Enquiry Forward</th>
                                                                                        <th width="300px">Full Name</th>
                                                                                        <th width="350px">Assign to Users</th>
                                                                                        <th width="190px;">Contact</th>
                                                                                        <th width="250px;">Email</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    {teamData.map((item, index) => (
                                                                                        <tr key={item.id}>
                                                                                            <td>{(page - 1) * 10 + index + 1}</td>
                                                                                            <td>
                                                                                                {leadIcon(item)}
                                                                                            </td>
                                                                                            {coursedatafetch && coursedatafetch.Role && item.User && item.User.Role && coursedatafetch.Role.Name === item.User.Role.Name ? (
                                                                                                <td>
                                                                                                    <input
                                                                                                        type="checkbox"
                                                                                                        checked={createdItems[item.id] !== undefined ? createdItems[item.id] : item.TelecallerCheckbox}
                                                                                                        onChange={(e) => handleCheckboxChange(e, item)}
                                                                                                        disabled={item.TelecallerCheckbox}
                                                                                                        data-bs-toggle="offcanvas"
                                                                                                        data-bs-target="#editTeam"
                                                                                                    />
                                                                                                </td>
                                                                                            ) : (
                                                                                                <td>
                                                                                                    <input
                                                                                                        type="checkbox"
                                                                                                        checked={item.TelecallerCheckbox} // Reflect the checkbox state for other users
                                                                                                        disabled // Always disabled for other users
                                                                                                        data-bs-toggle="offcanvas"
                                                                                                        data-bs-target="#editTeam"
                                                                                                    />
                                                                                                </td>
                                                                                            )}

                                                                                            <td>
                                                                                                <i class="fa-solid fa-user me-2"></i> <span>{item.name}</span>
                                                                                            </td>
                                                                                            <td>{item.User && item.User.Role && item.User.Role.Name}</td>
                                                                                            <td>
                                                                                                <div className="d-flex align-items-center">
                                                                                                    <a href={`https://web.whatsapp.com/send?phone=+919893688878&text=Hello`} target="_blank" rel="noopener noreferrer">
                                                                                                        <FaWhatsapp className="lead-li-icon me-2" color="#25D366" />
                                                                                                    </a>
                                                                                                    <a href={`tel:${item.phoneNumber}`}>
                                                                                                        <span>{item.phoneNumber}</span>
                                                                                                    </a>
                                                                                                </div>
                                                                                            </td>
                                                                                            <td>
                                                                                                <a
                                                                                                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(item.email)}&su=${encodeURIComponent('Inquiry from Technogaze')}&body=${encodeURIComponent('Hello,I am reaching out from Technogaze regarding...')}`}
                                                                                                    target="_blank"
                                                                                                    rel="noopener noreferrer"
                                                                                                >
                                                                                                    <i className="fa-solid fa-envelope me-2"></i>
                                                                                                    <span>{item.email}</span>
                                                                                                </a>
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
                                                                    <div className="justify-content-between mt-4">
                                                                        <div className="row d-flex">
                                                                            <div className="col-md-2">
                                                                                <Button variant="secondary" onClick={() => setFormStepsNum(prev => prev > 1 ? prev - 1 : prev)} disabled={formStepsNum === 1}>  <i className="fa-arrow-left fa-regular fa-sharp mr--10"></i>Previous</Button>
                                                                            </div>
                                                                            <div className="col-md-2">
                                                                                <Button variant="primary" onClick={() => setFormStepsNum(prev => prev < 5 ? prev + 1 : prev)} disabled={formStepsNum === 5}>Next  <i className="fa-arrow-right fa-regular fa-sharp ml--10"></i></Button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {/* Offcanvas Component */}
                                                                    <div
                                                                        className="offcanvas offcanvas-end w-50"
                                                                        tabIndex="-1"
                                                                        id="editTeam"
                                                                        aria-labelledby="offcanvasExampleLabel"
                                                                        style={{ display: formVisible ? 'block' : 'none' }}
                                                                    >
                                                                        <div className="offcanvas-header">
                                                                            <h5 className="offcanvas-title" id="offcanvasExampleLabel">Verify All Information Counselor</h5>
                                                                            <button
                                                                                type="button"
                                                                                className="btn-close"
                                                                                aria-label="Close"
                                                                                onClick={() => setFormVisible(false)}
                                                                            ></button>
                                                                        </div>
                                                                        <div className="offcanvas-body">
                                                                            {selectedItem && (
                                                                                <form onSubmit={handleSubmit2}>
                                                                                    <div className="row">
                                                                                        <div className="col-md-4 mb-3">
                                                                                            <label htmlFor="edit-name" className="form-label">Full Name</label>
                                                                                            <input
                                                                                                type="text"
                                                                                                className="form-control"
                                                                                                id="edit-name"
                                                                                                value={selectedItem?.name}
                                                                                                onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })}
                                                                                            />
                                                                                        </div>
                                                                                        <div className="col-md-4 mb-3">
                                                                                            <label htmlFor="edit-age" className="form-label">Age</label>
                                                                                            <input
                                                                                                type="number"
                                                                                                className="form-control"
                                                                                                id="edit-age"
                                                                                                value={selectedItem?.age || ''}
                                                                                                onChange={(e) => setSelectedItem({ ...selectedItem, age: e.target.value })}
                                                                                            />
                                                                                        </div>
                                                                                        <div className="col-md-4 mb-3">
                                                                                            <label htmlFor="edit-phone" className="form-label">Contact</label>
                                                                                            <input
                                                                                                type="text"
                                                                                                className="form-control"
                                                                                                id="edit-phone"
                                                                                                value={selectedItem?.phoneNumber || ''}
                                                                                                onChange={(e) => setSelectedItem({ ...selectedItem, phoneNumber: e.target.value })}
                                                                                            />
                                                                                        </div>
                                                                                        <div className="col-md-4 mb-3">
                                                                                            <label htmlFor="edit-email" className="form-label">Email</label>
                                                                                            <input
                                                                                                type="email"
                                                                                                className="form-control"
                                                                                                id="edit-email"
                                                                                                value={selectedItem?.email || ''}
                                                                                                onChange={(e) => setSelectedItem({ ...selectedItem, email: e.target.value })}
                                                                                            />
                                                                                        </div>
                                                                                        <div className="col-md-4 mb-3">
                                                                                            <label htmlFor="edit-working-status" className="form-label">Select Specialistion</label>
                                                                                            <select id="exampleFormControlSelect2" class="select2 form-select enquery-form" name="workingStatus" placeholder='Select Specialistion*' value={selectedItem?.workingStatus || ''}
                                                                                                onChange={(e) => setSelectedItem({ ...selectedItem, workingStatus: e.target.value })}>
                                                                                                <option value="">Select Specialistion*</option>
                                                                                                <option value="Employee">Employee</option>
                                                                                                <option value="Student">Student</option>
                                                                                                <option value="Entrepreneur">Entrepreneur</option>
                                                                                            </select>
                                                                                        </div>
                                                                                        <div className="col-md-4 mb-3">
                                                                                            <label htmlFor="edit-lead-platform" className="form-label">Lead Platform</label>
                                                                                            <select id="exampleFormControlSelect2" class="select2 form-select enquery-form" name="leadPlatform" placeholder='Select Lead Platform*' value={selectedItem?.leadPlatform || ''}
                                                                                                onChange={(e) => setSelectedItem({ ...selectedItem, leadPlatform: e.target.value })}>
                                                                                                <option value="">Select Specialistion*</option>
                                                                                                <option value="Google">Google</option>
                                                                                                <option value="LinkedIn">LinkedIn</option>
                                                                                                <option value="Indeen">Indeen</option>
                                                                                                <option value="Directly">Directly Communication</option>
                                                                                            </select>
                                                                                        </div>
                                                                                        <div className="col-md-4 mb-3">
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
                                                                                        <div className="col-md-4 mb-3">
                                                                                            <label htmlFor="exampleFormControlSelect2" className="form-label">Status</label>
                                                                                            <select
                                                                                                id="exampleFormControlSelect2"
                                                                                                className="form-select"
                                                                                                name="status"
                                                                                                value={selectedItem?.status || ''}
                                                                                                onChange={(e) => setSelectedItem({ ...selectedItem, status: e.target.value })}
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
                                                                                        <div className="col-md-4 mb-3">
                                                                                            <label htmlFor="exampleFormControlSelect2" className="form-label">Gender</label>
                                                                                            <select
                                                                                                id="exampleFormControlSelect2"
                                                                                                className="select2 form-select"
                                                                                                placeholder="gender"
                                                                                                name='gender'
                                                                                                defaultValue={gender}
                                                                                                onChange={(e) => setGender(e.target.value)}
                                                                                            >
                                                                                                <option value="">Select</option>
                                                                                                <option value="Female">Female</option>
                                                                                                <option value="Male">Male</option>
                                                                                                <option value="Other">Other</option>
                                                                                            </select>
                                                                                        </div>
                                                                                        <div className="col-md-6 mb-3">
                                                                                            <label htmlFor="exampleFormControlSelect2" className="form-label">Education</label>
                                                                                            <select
                                                                                                id="exampleFormControlSelect2"
                                                                                                className="select2 form-select"
                                                                                                name="Education"
                                                                                                defaultValue={Education}
                                                                                                onChange={(e) => setEducation(e.target.value)}
                                                                                            >
                                                                                                <option value="">Select</option>
                                                                                                <option value="Education">Education</option>
                                                                                                <option value="School">School</option>
                                                                                                <option value="Graduation">Graduation</option>
                                                                                                <option value="Master">Master</option>
                                                                                                <option value="Any other Skill">Any other Skill</option>
                                                                                                <option value="Other">Other</option>
                                                                                            </select>
                                                                                        </div>
                                                                                        <div className="col-md-6 mb-3">
                                                                                            <label htmlFor="exampleFormControlSelect2" className="form-label">Courses Look For</label>
                                                                                            <select
                                                                                                id="exampleFormControlSelect2"
                                                                                                className="form-select"
                                                                                                name="courseId"
                                                                                                value={selectedItem?.courseId || ''}
                                                                                                onChange={(e) => setSelectedItem({ ...selectedItem, courseId: e.target.value })}
                                                                                            >
                                                                                                <option value="">Select</option>
                                                                                                {coursesTable.map((option) => (
                                                                                                    <option key={option.id} value={option.id}>{option.name}</option>
                                                                                                ))}
                                                                                            </select>
                                                                                        </div>
                                                                                        <div className="col-md-4 mb-3">
                                                                                            <label htmlFor="exampleFormControlSelect2" className="form-label">Address Type</label>
                                                                                            <select
                                                                                                id="exampleFormControlSelect2"
                                                                                                className="select2 form-select"
                                                                                                name="AddressType"
                                                                                                defaultValue={AddressType}
                                                                                                onChange={(e) => setAddressType(e.target.value)}
                                                                                            >
                                                                                                <option value="">Select</option>
                                                                                                <option value="Current Address">Current Address</option>
                                                                                                <option value="Residential Address">Residential Address</option>
                                                                                                <option value="Office Address">Office Address</option>
                                                                                            </select>
                                                                                        </div>
                                                                                        <div className="col-md-4 mb-3">
                                                                                            <label className="form-label" htmlFor="add-user-email">Address</label>
                                                                                            <input
                                                                                                type="text"
                                                                                                id="add-user-email"
                                                                                                className="form-control"
                                                                                                placeholder="Address"
                                                                                                aria-label="Address"
                                                                                                name='Address'
                                                                                                onChange={(e) => setAddress(e.target.value)}
                                                                                                value={Address}
                                                                                            />
                                                                                        </div>
                                                                                        <div className="col-md-4 mb-3">
                                                                                            <label className="form-label" htmlFor="add-user-email">Postal Code</label>
                                                                                            <input
                                                                                                type="text"
                                                                                                id="add-user-email"
                                                                                                className="form-control"
                                                                                                placeholder="PostalCode"
                                                                                                aria-label="PostalCode"
                                                                                                name='PostalCode'
                                                                                                onChange={(e) => setPostalCode(e.target.value)}
                                                                                                value={PostalCode}
                                                                                            />
                                                                                        </div>

                                                                                        <div className="col-md-4 mb-3">
                                                                                            <label className="form-label" htmlFor="add-user-email">City</label>
                                                                                            <input
                                                                                                type="text"
                                                                                                id="add-user-email"
                                                                                                className="form-control"
                                                                                                placeholder="City"
                                                                                                aria-label="City"
                                                                                                name='City'
                                                                                                onChange={(e) => setCity(e.target.value)}
                                                                                                value={City}
                                                                                            />
                                                                                        </div>
                                                                                        <div className="col-md-4 mb-3">
                                                                                            <label className="form-label" htmlFor="add-user-email">Area</label>
                                                                                            <input
                                                                                                type="text"
                                                                                                id="add-user-email"
                                                                                                className="form-control"
                                                                                                placeholder="Area"
                                                                                                aria-label="Area"
                                                                                                name='Area'
                                                                                                onChange={(e) => setArea(e.target.value)}
                                                                                                value={Area}
                                                                                            />
                                                                                        </div>
                                                                                        <div className="col-md-4 mb-3">
                                                                                            <label htmlFor="edit-counselor-name" className="form-label">Counselor Name</label>
                                                                                            <input
                                                                                                type="text"
                                                                                                className="form-control"
                                                                                                id="edit-counselor-name"
                                                                                                value={CounselorName || ''}
                                                                                                onChange={(e) => setCounselorName(e.target.value)}
                                                                                            />
                                                                                        </div>
                                                                                        <div className="col-md-12 mb-3">
                                                                                            <label htmlFor="edit-remark" className="form-label">Remarks</label>
                                                                                            <textarea
                                                                                                className="form-control"
                                                                                                id="edit-remark"
                                                                                                rows="3"
                                                                                                value={remark || ''}
                                                                                                onChange={(e) => setRemark(e.target.value)}
                                                                                            ></textarea>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="d-flex justify-content-end">
                                                                                        <Button
                                                                                            variant="secondary"
                                                                                            className="me-2"
                                                                                            onClick={() => setFormVisible(false)}
                                                                                        >
                                                                                            Close
                                                                                        </Button>
                                                                                        <Button variant="primary" type="submit">
                                                                                            Save changes
                                                                                        </Button>
                                                                                    </div>
                                                                                </form>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                {formStepsNum === 5 && (
                                                    <div className="step-content">
                                                        <div className="container">
                                                            <div className="row">
                                                                {/*              <!-- Lead Details Card --> */}
                                                                <div className="col-12 col-md-12 col-xl-12 mt-1">
                                                                    <div className="card card-lead-details shadow-sm">
                                                                        <div className="table-responsive">
                                                                            <table className="table table-hover">
                                                                                <thead>
                                                                                    <tr>
                                                                                        <th scope="col">Update Lead</th>
                                                                                        <th scope="col">Enquiry Id</th>
                                                                                        <th scope="col">Name</th>
                                                                                        <th scope="col">Email</th>
                                                                                        <th scope="col">Assign to User</th>
                                                                                        <th scope="col">Visiting Date</th>
                                                                                        <th scope="col">Contact</th>
                                                                                        <th scope="col">Platform</th>
                                                                                        <th scope="col">Edit</th>

                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    {frontdesk.map((lead) => (
                                                                                        <tr key={lead.id}>
                                                                                            <td>
                                                                                                {leadIcon(lead)}
                                                                                            </td>
                                                                                            <td><i class="fa-solid fa-id-badge me-1" style={{ color: "#f01010e7" }}></i><span>{lead.enquiryId}</span></td>

                                                                                            <td>
                                                                                                <i class="fa-solid fa-user me-2"></i><span>{lead.name}</span>
                                                                                            </td>
                                                                                            <td>
                                                                                                <a
                                                                                                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(lead.email)}&su=${encodeURIComponent('Inquiry from Technogaze')}&body=${encodeURIComponent('Hello,I am reaching out from Technogaze regarding...')}`}
                                                                                                    target="_blank"
                                                                                                    rel="noopener noreferrer"
                                                                                                >
                                                                                                    <i className="fa-solid fa-envelope me-2"></i>
                                                                                                    <span>{lead.email}</span>
                                                                                                </a>
                                                                                            </td>
                                                                                            <td>{lead.User && lead.User.Role && lead.User.Role.Name}</td>
                                                                                            <td>
                                                                                                <div className="d-flex align-items-center">
                                                                                                    <i className="bx bx-calendar me-2"></i>
                                                                                                    <span className="">{lead.visitDate}</span>
                                                                                                </div>
                                                                                            </td>

                                                                                            <td>
                                                                                                <div className="d-flex align-items-center">
                                                                                                    <a href={`https://web.whatsapp.com/send?phone=+919893688878&text=Hello`} target="_blank" rel="noopener noreferrer">
                                                                                                        <FaWhatsapp className="lead-li-icon me-1 " color="#25D366" /> {/* WhatsApp icon */}
                                                                                                    </a>
                                                                                                    <a href={`tel:${lead.phoneNumber}`}>
                                                                                                        <span>{lead.phoneNumber}</span>
                                                                                                    </a>


                                                                                                </div>
                                                                                            </td>
                                                                                            <td>
                                                                                                <div className="d-flex align-items-center">
                                                                                                    {lead.leadPlatform == "Google" ? (
                                                                                                        <a href={`https://www.google.com/search?q=${lead.leadPlatform}`} target="_blank" rel="noopener noreferrer">
                                                                                                            <FaGoogle className="me-1" color="#4285F4" /> {/* Google icon */}
                                                                                                        </a>
                                                                                                    ) : lead.leadPlatform == "Linkdin" ? (
                                                                                                        <a href={`https://www.linkedin.com/search/results/all/?keywords=${lead.leadPlatform}`} target="_blank" rel="noopener noreferrer">
                                                                                                            <FaLinkedin className="me-1" color="#0077B5" /> {/* LinkedIn icon */}
                                                                                                        </a>
                                                                                                    ) : lead.leadPlatform == "Indeed" ? (
                                                                                                        <a href={`https://www.indeed.com/q-${lead.leadPlatform}-jobs.html`} target="_blank" rel="noopener noreferrer">
                                                                                                            <i class="fa-sharp fa-solid fa-info" style={{ color: "#2557a7" }}></i>
                                                                                                            {/*   <FaBriefcase className="me-2" color="#FAFAFA" /> {/* Indeed icon */}
                                                                                                        </a>
                                                                                                    ) : (<i className="bx bx-briefcase me-1"></i>)

                                                                                                    }

                                                                                                    <span>{lead.leadPlatform}</span>

                                                                                                </div>
                                                                                            </td>
                                                                                            <td><div classNmae="d-inline-block text-nowrap">
                                                                                                <Link to={`/mangedlead/${lead.id}`} className="navbar-brand" >  <button className="btn btn-sm btn-icon" data-bs-target="#editUserss" data-bs-toggle="modal">
                                                                                                    <i class="bx bx-edit"></i>
                                                                                                </button>
                                                                                                </Link>
                                                                                            </div></td>

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
                                                                <div className="justify-content-between mt-4">
                                                                    <div className="row d-flex">
                                                                        <div className="col-md-2">
                                                                            <Button variant="secondary" onClick={() => setFormStepsNum(prev => prev > 1 ? prev - 1 : prev)} disabled={formStepsNum === 1}>  <i className="fa-arrow-left fa-regular fa-sharp mr--10"></i>Previous</Button>
                                                                        </div>
                                                                        <div className="col-md-2">
                                                                            <Button variant="primary" onClick={handleNext}>Next  <i className="fa-arrow-right fa-regular fa-sharp ml--10"></i></Button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/*            <!-- telecalteam Modal table --> */}
                                                        <div class="modal fade" id="editUserss" tabindex="-1" aria-hidden="true">
                                                            <div class="modal-dialog modal-lg modal-simple modal-edit-user">
                                                                <div class="modal-content p-3 p-md-5">
                                                                    <div class="modal-body">
                                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                        <div class="text-center mb-4">
                                                                            <h3>Information</h3>

                                                                        </div>
                                                                        <form id="editUserForm" class="row g-3 fv-plugins-bootstrap5 fv-plugins-framework" onSubmit={handleUpdate2} novalidate="novalidate">


                                                                            <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                                                <label for="exampleFormControlSelect2" class="form-label">Gender</label>
                                                                                <select id="exampleFormControlSelect2" class="select2 form-select" placeholder="gender" name='gender'
                                                                                    value={gender} onChange={(e) => setGender(e.target.value)}>
                                                                                    <option value="">Select</option>
                                                                                    <option value="Female">Female</option>
                                                                                    <option value="Male">Male</option>
                                                                                    <option value="Other">Other</option>
                                                                                </select>
                                                                            </div>

                                                                            <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                                                <label for="exampleFormControlSelect2" class="form-label">Education</label>
                                                                                <select id="exampleFormControlSelect2" class="select2 form-select" name="Education" value={Education} onChange={(e) => setEducation(e.target.value)}>
                                                                                    <option value="">Select</option>
                                                                                    <option value="Education">Education</option>
                                                                                    <option value="School">School</option>
                                                                                    <option value="Graduation">Graduation</option>
                                                                                    <option value="Master">Master</option>
                                                                                    <option value="Any other Skill">Any other Skill</option>
                                                                                    <option value="Other">Other</option>
                                                                                </select>
                                                                            </div>
                                                                            <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                                                <label for="exampleFormControlSelect2" class="form-label">Courses Look For</label>
                                                                                <select id="exampleFormControlSelect2" class="select2 form-select" name="courseId" value={courseId} onChange={(e) => setcourseId(e.target.value)}>
                                                                                    <option value="">Select</option>
                                                                                    {coursesTable.map((option) => (
                                                                                        <option key={option.id} value={option.id}>{option.name}</option>
                                                                                    ))}
                                                                                </select>
                                                                            </div>

                                                                            <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                                                <label for="exampleFormControlSelect2" class="form-label">Address Type</label>
                                                                                <select id="exampleFormControlSelect2" class="select2 form-select" name="AddressType" value={AddressType} onChange={(e) => setAddressType(e.target.value)}>
                                                                                    <option value="">Select</option>
                                                                                    <option value="Current Address">Current Address</option>
                                                                                    <option value="Residential Address">Residential Address</option>
                                                                                    <option value="Office Address">Office Address</option>
                                                                                </select>
                                                                            </div>
                                                                            <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                                                <label class="form-label" for="add-user-email">Address</label>
                                                                                <input type="text" id="add-user-email" class="form-control" placeholder="Address" aria-label="Address" name='Address'
                                                                                    onChange={(e) => setAddress(e.target.value)}
                                                                                    value={Address} />
                                                                                <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                                            </div>
                                                                            <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                                                <label class="form-label" for="add-user-email">Postal Code</label>
                                                                                <input type="text" id="add-user-email" class="form-control" placeholder="PostalCode" aria-label="PostalCode" name='PostalCode'
                                                                                    onChange={(e) => setPostalCode(e.target.value)}
                                                                                    value={PostalCode} />
                                                                                <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                                            </div>

                                                                            <div className="col-12 col-md-6 fv-plugins-icon-container">
                                                                                <label htmlFor="exampleFormControlSelect2" className="form-label">Country</label>
                                                                                <select
                                                                                    id="exampleFormControlSelect2"
                                                                                    className="select2 form-select"
                                                                                    name="CountryId"
                                                                                    value={CountryId}
                                                                                    onChange={handleCountryChange}
                                                                                >
                                                                                    <option value="">Select</option>
                                                                                    {countryTable.map(option => (
                                                                                        <option key={option.id} value={option.id}>{option.name}</option>
                                                                                    ))}
                                                                                </select>
                                                                            </div>

                                                                            <div className="col-12 col-md-6 fv-plugins-icon-container">
                                                                                <label htmlFor="exampleFormControlSelect2" className="form-label">State</label>
                                                                                <select
                                                                                    id="exampleFormControlSelect2"
                                                                                    className="select2 form-select"
                                                                                    name="StateId"
                                                                                    value={StateId}
                                                                                    onChange={handleStateChange}
                                                                                >
                                                                                    <option value="">Select</option>
                                                                                    {selectedCountry && selectedCountry.Staties.map(state => (
                                                                                        <option key={state.id} value={state.id}>{state.name}</option>
                                                                                    ))}
                                                                                </select>
                                                                            </div>

                                                                            <div className="col-12 col-md-6 fv-plugins-icon-container">
                                                                                <label htmlFor="exampleFormControlSelect2" className="form-label">District</label>
                                                                                <select
                                                                                    id="exampleFormControlSelect2"
                                                                                    className="select2 form-select"
                                                                                    name="DistrictId"
                                                                                    value={DistrictId}
                                                                                    onChange={(e) => setDistrictId(e.target.value)}
                                                                                >
                                                                                    <option value="">Select</option>
                                                                                    {selectedState && selectedState.Cities.map(city => (
                                                                                        <option key={city.id} value={city.id}>{city.name}</option>
                                                                                    ))}
                                                                                </select>
                                                                            </div>



                                                                            <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                                                <label class="form-label" for="add-user-email">City</label>
                                                                                <input type="text" id="add-user-email" class="form-control" placeholder="City" aria-label="City" name='City'
                                                                                    onChange={(e) => setCity(e.target.value)}
                                                                                    value={City} />
                                                                                <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                                            </div>



                                                                            <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                                                <label class="form-label" for="add-user-email">Area</label>
                                                                                <input type="text" id="add-user-email" class="form-control" placeholder="Area" aria-label="Area" name='Area'
                                                                                    onChange={(e) => setArea(e.target.value)}
                                                                                    value={Area} />
                                                                                <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                                            </div>
                                                                            <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                                                <label for="exampleFormControlSelect2" class="form-label">Counseling Department Allotted</label>
                                                                                <select id="exampleFormControlSelect2" class="select2 form-select" name="CounselingDepartmentAllotted" value={CounselingDepartmentAllotted} onChange={(e) => setCounselingDepartmentAllotted(e.target.value)}>
                                                                                    <option value="">Select</option>
                                                                                    <option value="Counselor Department">Counselor Department</option>

                                                                                </select>
                                                                            </div>
                                                                            <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                                                <label class="form-label" for="add-user-email">Counselor Name</label>
                                                                                <input type="text" id="add-user-email" class="form-control" placeholder="CounselorName" aria-label="CounselorName" name='CounselorName'
                                                                                    onChange={(e) => setCounselorName(e.target.value)}
                                                                                    value={CounselorName} />
                                                                                <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                                            </div>
                                                                            <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                                                <label class="form-label" for="add-user-email">Counselor Room No.</label>
                                                                                <input type="text" id="add-user-email" class="form-control" placeholder="CounselorRoomNo" aria-label="CounselorRoomNo" name='CounselorRoomNo'
                                                                                    onChange={(e) => setCounselorRoomNo(e.target.value)}
                                                                                    value={CounselorRoomNo} />
                                                                                <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                                            </div>


                                                                            <div class="d-flex  col-12 text-center">
                                                                                <button type="submit" class="btn btn-primary me-sm-3 me-1">Update</button>
                                                                                <button type="reset" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                                                                            </div>
                                                                            <input type="hidden" /></form>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>


                                                    </div>

                                                )}
                                                {formStepsNum === 6 && (<ThankYouCard handleNext={handleNext} />)}
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