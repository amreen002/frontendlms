import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from './footerComponent';
import Navbar from './navComponemt';
import DashBoardMenus from './dashboardsMenuComponent';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { debounce } from 'lodash';
import { FaLock, FaEnvelope, FaWhatsapp, FaGoogle, FaLinkedin, FaBriefcase, FaCircle } from 'react-icons/fa'; // Import necessary icons
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Draggable from '../Components/draggableComponent';
const { REACT_APP_API_ENDPOINT } = process.env;
function SaleTeamUse() {
    const datatoken = localStorage.getItem('datatoken');
    const coursedatafetch = JSON.parse(datatoken)
    const [table, setTable] = useState([]);
    const { saleteamId } = useParams();
    const [date, setDate] = useState("");
    const [name, setName] = useState("");
    const [roleId, setroleId] = useState("");
    const [age, setAge] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [workingStatus, setWorkingStatus] = useState("");
    const [leadPlatform, setLeadPlatform] = useState("");
    const [remark, setRemark] = useState("");
    const [userData, setUserData] = useState({});
    const [formData, setFormData] = useState({});
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sliderActive, setSliderActive] = useState(false);
    const [dataUser, setTabledataUser] = useState([]);
    const [countryTable, setCountryTable] = useState([]);
    const [courses, setCourses] = useState([])
    const [state, setstate] = useState([])
    const [city, setcity] = useState([])
    const [batch, setbatchs] = useState([])
    const [userDataFinOne, setUserDataFindOne] = useState({});
    const [isExpanded, setIsExpanded] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // Track total pages for pagination
    const [selectedTask, setSelectedTask] = useState(null);
    const [checkedInputs, setCheckedInputs] = useState({});
    const [telecallerPersonNames, setTelecallerPersonNames] = useState(() => {
        const savedNames = JSON.parse(localStorage.getItem('telecallerPersonNames'));
        return savedNames !== null ? savedNames : {};
    })

    const [allInputFields, setAllInputFields] = useState([]);
    const fetchAllInputFields = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/inputfeilds`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const userData = response.data.checkedInputs
                const initial = {};
                setAllInputFields(response.data.checkedInputs || []);
                userData.map(items => {
                    // Initialize the checkedInputs state here if needed
                    initial[items.id] = { isChecked: items.checkedInputs.isChecked };
                });
                setCheckedInputs(initial);
            }
        } catch (error) {
            console.error('Error fetching all input fields', error);
        }
    };

    // Basic debounce function
    function debounce(func, wait) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    const debouncedUpdateCheckboxState = debounce(async (inputId, isChecked, label, type) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                await axios.patch(`${REACT_APP_API_ENDPOINT}/inputfeilds/${inputId}`,
                    {
                        userId: coursedatafetch.id,
                        checkedInputs: {
                            id: type,
                            label,
                            isChecked
                        }
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
            }
        } catch (error) {
            console.error('Error updating checkbox state', error);
        }
    }, 300);
    // Adjust debounce delay as needed


    // Function to handle checkbox change
    const handleCheckboxChange = (e, id, type, label) => {
        const { checked } = e.target;
        setCheckedInputs((prev) => {
            const newCheckedInputs = { ...prev };

            if (newCheckedInputs[id]) {
                newCheckedInputs[id].isChecked = checked;
            } else {
                newCheckedInputs[id] = {
                    id: type,
                    label,
                    isChecked: checked
                };
            }

            // Update the checkbox state on the server
            debouncedUpdateCheckboxState(id, checked, label, type);

            return newCheckedInputs;
        });
    };



    // saleteamId set data



    // saleteamId set data
    useEffect(() => {
        fetchData1(saleteamId);
    }, [saleteamId]);

    // page set data
    useEffect(() => {
        fetchData(page);
    }, [page])

    // all view set data
    useEffect(() => {
        fetchData();
        fetchData2()
        fetchData3()
        fetchData4()
        fetchData5()
        fetchData6()
        fetchData7()
        fetchData8()
        fetchAllInputFields()
    }, [])

    // update telecallerPersonNames use set data
    useEffect(() => {
        localStorage.setItem('telecallerPersonNames', JSON.stringify(telecallerPersonNames));
    }, [telecallerPersonNames]);

    // lead fetch data
    const fetchData = async (page = 1) => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/listsaleteam?page=${page}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTable(response.data.saleteam.rows);
                setTotalPages(response.data.saleteam.totalPage || 1); // Ensure totalPages has a default value
            }
        } catch (err) {
            console.log(err.response);
        }
    }
    // lead fetch data getbyId
    const fetchData1 = async (saleteamId) => {
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
                // Assuming response.data directly contains user data

                const userData = response.data.saleteam;
                setUserData(response.data.saleteam)
                // Populate state with fetched user data
                setDate(userData.date)
                setName(userData.name);
                setAge(userData.age);
                setPhoneNumber(userData.phoneNumber);
                setEmail(userData.email);
                setWorkingStatus(userData.workingStatus);
                setLeadPlatform(userData.leadPlatform);
                setroleId(userData.roleId);
                setRemark(userData.remark)
                /*  setStatus(userData.status) */
            }
        } catch (err) {
            console.log(err.response);
        }
    }
    // Assigin to user fetch data 
    const fetchData2 = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/users?assignToUsers=true`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const userData = response.data.users.rows
                setTabledataUser(userData);
            }// Updated state variable
        } catch (err) {
            console.log(err.response);
        }
    }
    // country fetch data 
    const fetchData3 = async () => {
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
    }
    // course fetch data 
    const fetchData4 = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/listcourses`, {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                });
                const userDatas = response.data.courses;
                setCourses(userDatas)
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    // state fetch data 
    const fetchData5 = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/state`, {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                });
                const userDatas = response.data.state;
                setstate(userDatas)
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    // batch fetch data 
    const fetchData6 = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/batches`, {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                });
                const userDatas = response.data.batchs;
                setbatchs(userDatas)
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    // city fetch data 
    const fetchData7 = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/city`, {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                });
                const userDatas = response.data.city;
                setcity(userDatas)
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    // user wise data fetch data 
    const fetchData8 = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/userwisedata`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUserDataFindOne(response.data);
            }// Updated state variable
        } catch (err) {
            console.log(err.response);
        }
    }
    // lead create
    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSubmit = {
            ...formData, // Ensure formData has plain strings
        };
        try {
            const token = localStorage.getItem('token');

            if (token) {
                await axios.post(`${REACT_APP_API_ENDPOINT}/addsaleteam`, dataToSubmit, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                window.location.href = "/addsaleteam"
                alert('Lead Is Create Successfully');
            }
        } catch (error) {
            alert('Failed to send message.');
        }
    }
    // lead delete
    const handleDelete = async (saleteamId) => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                await axios.delete(`${REACT_APP_API_ENDPOINT}/deletesaleteam/${saleteamId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                fetchData();
                alert('Lead Successfully Deleted');

            }
        } catch (error) {
            console.error('Error deleting data:', error);
            alert('An error occurred while deleting data');
        }
    }
    // lead update
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const updatedUserData = { date, name, age, phoneNumber, email, workingStatus, leadPlatform, remark };
            const token = localStorage.getItem('token');

            if (token) {
                await axios.patch(`${REACT_APP_API_ENDPOINT}/viewssaleteam/${saleteamId}`, updatedUserData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                fetchData(saleteamId);
                window.location.href = "/addsaleteam"
                alert("Lead Is Updated Successfully!");
            }
        } catch (error) {
            console.error('Error updating:', error);
            alert('An error occurred while updating');
        }

        // Clear input fields after update

    }
    // lead update assign to users
    const handleUpdateAssignToUsers = async (e, saleteamId) => {
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
                    fetchData1(saleteamId);
                    alert('Lead Assign To Telecallar Department');
                } else {
                    alert('Lead Assign Not To Telecallar Department');

                }
            }
        } catch (error) {
            console.error('Error updating user:', error);
            alert('An error occurred while updating user data');
        }
    }

    // Handle drag and drop end event
    const handleDragEnd = async (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setAllInputFields((items) => {
                const oldIndex = items.findIndex(item => item.id === active.id);
                const newIndex = items.findIndex(item => item.id === over.id);
                const newItems = arrayMove(items, oldIndex, newIndex);
                return newItems;
            });
        }
    };
    const handleChange = (e, id) => {
        const { value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };



    // Mapping of types to rendering logic
    const inputTypes = {
        date: ({ id }) => (
            <input
                id={id}
                type="date"
                className="form-control enquery-form"
                placeholder="Candidate Date"
                name={id}
                value={formData[id] || ''}
                onChange={(e) => handleChange(e, id)}
            />
        ),
        username: ({ id }) => (
            <input
                id={id}
                type="text"
                className="form-control enquery-form"
                placeholder="Candidate User Name"
                name={id}
                value={formData[id] || ''}
                onChange={(e) => handleChange(e, id)}
            />
        ),
        workingStatus: ({ id }) => (
            <select
                id={id}
                className="select2 form-select enquery-form"
                name={id}
                placeholder="Select Specialization"
                onChange={(e) => handleChange(e, id)}
                value={formData[id] || ''}
            >
                <option value="">Select Specialization</option>
                <option value="Employee">Employee</option>
                <option value="Student">Student</option>
                <option value="Entrepreneur">Entrepreneur</option>
            </select>
        ),
        remark: ({ id }) => (
            <input
                id={id}
                type="text"
                className="form-control enquery-form"
                placeholder="Remark"
                name={id}
                value={formData[id] || ''}
                onChange={(e) => handleChange(e, id)}
            />
        ),
        lead_status: ({ id }) => (
            <select
                id={id}
                className="select2 form-select enquery-form"
                name={id}
                placeholder="Choose Forms Interested in"
                onChange={(e) => handleChange(e, id)}
                value={formData[id] || ''}
            >
                <option value="">Choose Forms Interested in</option>
                <option value="Interested">Interested</option>
                <option value="Not Interested">Not Interested</option>
            </select>
        ),
        status: ({ id }) => (
            <select
                id={id}
                className="select2 form-select enquery-form"
                name={id}
                placeholder="Choose Status"
                onChange={(e) => handleChange(e, id)}
                value={formData[id] || ''}
            >
                <option value="">Choose Status</option>
                <option value="1st Call">1st Call</option>
                <option value="2nd Call">2nd Call</option>
                <option value="3rd Call">3rd Call</option>
                <option value="4th Call">Not Responding (N/R)</option>
                <option value="Other">Other</option>
            </select>
        ),
        age: ({ id }) => (
            <input
                id={id}
                type="number"
                className="form-control enquery-form"
                placeholder="Age"
                name={id}
                onChange={(e) => handleChange(e, id)}
                value={formData[id] || ''}
            />
        ),
        StateId: ({ id }) => (
            <select
                id={id}
                className="select2 form-select enquery-form"
                name="StateId"
                onChange={(e) => handleChange(e, id)}
                value={formData[id] || ''}
            >
                <option value="">Select State</option>
                {state.map(option => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        ),
        CountryId: ({ id }) => (
            <select
                id={id}
                className="select2 form-select enquery-form"
                name={id}
                onChange={(e) => handleChange(e, id)}
                value={formData[id] || ''}
            >
                <option value="">Select Country</option>
                {countryTable.map(option => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        ),
        DistrictId: ({ id }) => (
            <select
                id={id}
                className="select2 form-select enquery-form"
                name={id}
                onChange={(e) => handleChange(e, id)}
                value={formData[id] || ''}
            >
                <option value="">Select City</option>
                {city.map(option => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        ),
        courseId: ({ id }) => (
            <select
                id={id}
                className="select2 form-select enquery-form"
                name={id}
                onChange={(e) => handleChange(e, id)}
                value={formData[id] || ''}
            >
                <option value="">Select Course/Class</option>
                {courses.map(option => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        ),
        batchId: ({ id }) => (
            <select
                id={id}
                className="select2 form-select enquery-form"
                name={id}
                onChange={(e) => handleChange(e, id)}
                value={formData[id] || ''}
            >
                <option value="">Select Webinar Topic</option>
                {batch.map(option => (
                    <option key={option.id} value={option.id}>
                        {option.Title}
                    </option>
                ))}
            </select>
        ),
        AddressType: ({ id }) => (
            <select
                id={id}
                className="select2 form-select enquery-form"
                name={id}
                onChange={(e) => handleChange(e, id)}
                value={formData[id] || ''}
            >
                <option value="">Select Address Type</option>
                <option value="Current Address">Current Address</option>
                <option value="Permanent Address">Permanent Address</option>
                <option value="Residential Address">Residential Address</option>
            </select>
        ),
        PostalCode: ({ id }) => (
            <input
                id={id}
                type="number"
                className="form-control enquery-form"
                placeholder="Postal Code"
                name={id}
                onChange={(e) => handleChange(e, id)}
                value={formData[id] || ''}
            />
        ),
        Address: ({ id }) => (
            <input
                id={id}
                type="text"
                className="form-control enquery-form"
                placeholder="Address"
                name={id}
                onChange={(e) => handleChange(e, id)}
                value={formData[id] || ''}
            />
        ),
        Area: ({ id }) => (
            <input
                id={id}
                type="text"
                className="form-control enquery-form"
                placeholder="Area"
                name={id}
                onChange={(e) => handleChange(e, id)}
                value={formData[id] || ''}
            />
        ),
        leadPlatform: ({ id }) => (
            <select
                id={id}
                className="select2 form-select enquery-form"
                name={id}
                placeholder="Select Lead Platform"
                onChange={(e) => handleChange(e, id)}
                value={formData[id] || ''}
            >
                <option value="">Select Lead Platform</option>
                <option value="Google">Google</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Indeed">Indeed</option>
                <option value="Directly">Direct Communication</option>
            </select>
        ),
    };

    // Render input function
    const renderInput = (type, id) => {

        const InputComponent = inputTypes[type];
        return InputComponent ? <InputComponent id={id} /> : null;
    };

    // Map through all input fields and render only the checked ones
    const allInputFieldsData = allInputFields
        .filter(item => checkedInputs[item.id]?.isChecked) // Filter only checked items
        .map(item => ({
            id: item.checkedInputs.id,
            component: renderInput(item.type, item.checkedInputs.id)
        }));

    // function toggleDropdown
    const toggleDropdown = (type) => {
        setIsExpanded(type);
    }
    // function searching 
    /*   const filteredInputs = inputs.filter(input =>
          input.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
   */
    // function remove input
    const handleRemove = (id) => {
        setAllInputFields((items) => items.filter(item => item.id !== `input-${id}`));
        const newData = { ...formData };
        delete newData[`input-${id}`];
        setFormData(newData);
    }

    // function page
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    }

    // function date D/M/Y
    const isToday = (date) => {
        const today = new Date();
        return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
    }

    // function lead view icon
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
                                    <div class="card-header border-bottom custom_searchbar">
                                        <h5 class="card-title">Search Filter</h5>
                                        <div class="d-flex justify-content-between align-items-center row  gap-3 gap-md-0 cus_srchbox">
                                            <div class="col-md-4 user_roleu"><select id="UserRole" class="form-select text-capitalize"><option value=""> Select Role </option><option value="Admin">Admin</option><option value="Author">Author</option><option value="Editor">Editor</option><option value="Maintainer">Maintainer</option><option value="Subscriber">Subscriber</option></select></div>
                                            <div class="col-md-4 user_plan"><select id="UserPlan" class="form-select text-capitalize"><option value=""> Select Plan </option><option value="Basic">Basic</option><option value="Company">Company</option><option value="Enterprise">Enterprise</option><option value="Team">Team</option></select></div>
                                            <div class="col-md-4 user_status"><select id="FilterTransaction" class="form-select text-capitalize"><option value=""> Select Status </option><option value="Pending" class="text-capitalize">Pending</option><option value="Active" class="text-capitalize">Active</option><option value="Inactive" class="text-capitalize">Inactive</option></select></div>
                                        </div>
                                    </div>
                                    <div class="card-datatable table-responsive">
                                        <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer">
                                            <div class="row mx-2">
                                                <div class="col-md-2">
                                                    <div class="me-3 mt--5">
                                                        <div class="dataTables_length" id="DataTables_Table_0_length">
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
                                                </div>
                                                <div class="col-md-10">
                                                    <div class="dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex 
                                                            align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0"  >
                                                        <div id="DataTables_Table_0_filter" class="dataTables_filter"><label>
                                                            <input type="search" class="form-control" placeholder="Search.." aria-controls="DataTables_Table_0" /></label>
                                                        </div>
                                                        <div class="btn-group d-flex flex-row">
                                                            <button class="btn buttons-collection dropdown-toggle btn-label-secondary mx-3 d-flex"
                                                                tabindex="0" aria-controls="DataTables_Table_0" type="button" aria-haspopup="dialog"
                                                                aria-expanded="false">
                                                                <span><i class="bx bx-export me-1"></i>Export</span>
                                                            </button>

                                                            <button class="btn btn-secondary add-new btn-primary d-flex cus_Add" tabindex="0" aria-controls="DataTables_Table_0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasAddUser">

                                                                <span><i class="bx bx-plus me-0 me-sm-1"></i>Lead</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <table class="datatables-users table border-top dataTable no-footer dtr-column" id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info" width="1390px;">
                                                <thead>
                                                    <tr>
                                                        <th class="control sorting_disabled dtr-hidden" rowspan="1" colspan="1" aria-label=""></th>
                                                        <th class="sorting sorting_desc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="100px;" aria-label="User: activate to sort column ascending" aria-sort="descending">S.NO</th>
                                                        <th class="sorting sorting_desc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="90px;" aria-label="User: activate to sort column ascending" aria-sort="descending">lead</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="310px;" aria-label="Role: activate to sort column ascending">Full Name</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="250px;" aria-label="Plan: activate to sort column ascending">Contact </th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="250px;" aria-label="Billing: activate to sort column ascending">Email</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="Status: activate to sort column ascending">Specialisation</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="100px;" aria-label="Status: activate to sort column ascending">Platform</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="200px;" aria-label="Status: activate to sort column ascending">Assign To Users</th>
                                                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" width="100px;" aria-label="Actions">Actions</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {table.map((item, index) => (
                                                        <tr key={item.id}>
                                                            <td class="sorting_1">

                                                            </td>
                                                            <td>{(page - 1) * 10 + index + 1}</td>
                                                            <td>
                                                                {leadIcon(item)}
                                                            </td>
                                                            <td>
                                                                <i class="fa-solid fa-user me-2"></i><span>{item.name}</span>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    <a href={`https://web.whatsapp.com/send?phone=+919893688878&text=Hello`} target="_blank" rel="noopener noreferrer">
                                                                        <FaWhatsapp className="lead-li-icon me-2" color="#25D366" />
                                                                        <span>{item.WhatsApp}</span>
                                                                    </a>,
                                                                    <a href={`tel:${item.phoneNumber}`}>
                                                                        <span>{item.phoneNumber}</span>
                                                                    </a>
                                                                </div>
                                                            </td>
                                                            <td><i class="fa-solid fa-envelope me-2  fw-bold"></i><span>{item.email}</span></td>
                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    <i className="bx bx-briefcase me-2"></i>
                                                                    <span>{item.workingStatus}</span>
                                                                </div>
                                                            </td>

                                                            <td>
                                                                <div className="align-items-center">
                                                                    {item.leadPlatform == "Google" ? (
                                                                        <a href={`https://www.google.com/search?q=${item.leadPlatform}`} target="_blank" rel="noopener noreferrer">
                                                                            <FaGoogle color="#4285F4" /> {/* Google icon */}
                                                                        </a>
                                                                    ) : item.leadPlatform == "LinkedIn" ? (
                                                                        <a href={`https://www.linkedin.com/search/results/all/?keywords=${item.leadPlatform}`} target="_blank" rel="noopener noreferrer">
                                                                            <FaLinkedin color="#0077B5" /> {/* LinkedIn icon */}
                                                                        </a>
                                                                    ) : item.leadPlatform == "Indeed" ? (
                                                                        <a href={`https://www.indeed.com/q-${item.leadPlatform}-jobs.html`} target="_blank" rel="noopener noreferrer">
                                                                            <i class="fa-sharp fa-solid fa-info" style={{ color: "#2557a7" }}></i>
                                                                            {/*   <FaBriefcase className="me-2" color="#FAFAFA" /> {/* Indeed icon */}
                                                                        </a>
                                                                    ) : (<i className="bx bx-briefcase"></i>)

                                                                    }




                                                                </div>
                                                            </td>

                                                            <td>
                                                                <div className="d-inline-block text-nowrap edt_pencil">
                                                                    <Link to={`/addsaleteam/${item.id}`} className="pr--5 pt-3">
                                                                        <button
                                                                            className="btn btn-sm btn-icon edit_sales"
                                                                            data-bs-target="#AssignUsers"
                                                                            data-bs-toggle="modal"
                                                                            onClick={() => setSelectedTask(item)}
                                                                        >
                                                                            <i className="fas fa-user-plus"></i>
                                                                        </button>
                                                                    </Link>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="d-inline-block text-nowrap edt_pencil">
                                                                    <Link to={`/addsaleteam/${item.id}`} className="pr--5" >
                                                                        <button class="btn btn-sm btn-icon edit_sales" data-bs-target="#editUser" data-bs-toggle="modal">
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
                                            <div className="row mx-2 pt--20">
                                                <div className="col-sm-12 col-md-12">
                                                    <div className="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">
                                                        Showing {((page - 1) * 10) + 1} to {Math.min(page * 10, totalPages * 10)} of {totalPages * 10} entries
                                                    </div>
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
                                        </div >
                                    </div >
                                    {coursedatafetch && coursedatafetch.Role && coursedatafetch.Role.Name === "Super Admin" ?
                                        (<div className="offcanvas offcanvas-end w-50" tabIndex="-1" id="offcanvasAddUser" aria-labelledby="offcanvasAddUserLabel">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="offcanvas-header cus_headerr">
                                                        <h5 id="offcanvasAddUserLabel" className="offcanvas-title"><i class="bx bx-user bx-sm"></i> Lead Information</h5>
                                                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-0 ">
                                                    <div className='col-12 col-xl-12 col-lg-12 col-md-12'>
                                                        <div className='header_choos_details'>
                                                            <div className='d-flex'>
                                                                <div className="">
                                                                    <p id="offcanvasAddUserLabel" className="offcanvas-title"> Upload Via</p>
                                                                </div>
                                                                <div className=" form-check cus_email">
                                                                    <input
                                                                        className="form-check-input"
                                                                        type="radio"
                                                                        onClick={() => toggleDropdown('email')}
                                                                        name="flexRadioDefault"
                                                                        id="flexRadioDefault1"
                                                                        placeholder="Email" checked
                                                                    />
                                                                    <span>Email</span>
                                                                </div>
                                                                <div className=" form-check cus_mobile">
                                                                    <input
                                                                        className="form-check-input"
                                                                        type="radio"
                                                                        onClick={() => toggleDropdown('mobile')}
                                                                        name="flexRadioDefault"
                                                                        id="flexRadioDefault1"
                                                                        placeholder="Mobile"
                                                                    />
                                                                    <span>Mobile</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className='row'>
                                                        <div className="col-md-6 question-update-lead">
                                                            <div className={`slider pt--15 ${sliderActive ? 'active' : ''}`}>
                                                                <div className="input-fields-container-lead mx-0 flex-grow-0">
                                                                    <div className=''>
                                                                        <div className='flex-row'>
                                                                            <div className='heading_frm'>
                                                                                <h2>Addon Below field <small>(If Required)</small></h2>
                                                                            </div>
                                                                        </div>
                                                                        <div className='lead col-md-12'>

                                                                            <input
                                                                                type="text"
                                                                                className="form-control search_dta mb-3"
                                                                                placeholder="Search fields..."
                                                                                value={searchTerm}
                                                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                                            />
                                                                        </div>
                                                                        <div className="input-fields-container">
                                                                            {allInputFields.map((item) => (
                                                                                <div key={item.id} className="d-flex pb-2 cus_btm_left">
                                                                                    <div className="input_cus">
                                                                                        <input
                                                                                            type="checkbox"
                                                                                            checked={!!checkedInputs[item.id]?.isChecked}
                                                                                            onChange={(e) => handleCheckboxChange(e, item.id, item.type, item.checkedInputs?.label)}
                                                                                        />
                                                                                    </div>
                                                                                    <div className="name_cus">
                                                                                        <span>{item.checkedInputs?.label}</span>
                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                        </div>

                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <form className="add-new-user" id="addNewUserForm" onSubmit={handleSubmit} noValidate>
                                                                <div className='right_form-fields'>


                                                                    <div className="mb-1 fv-plugins-icon-container lead-form">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control enquery-form"
                                                                            id="add-user-fullname"
                                                                            placeholder="Candidate First Name"
                                                                            name="name"
                                                                            onChange={(e) => handleChange(e, 'name')}
                                                                        />
                                                                        <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                                    </div>
                                                                    <div className="mb-1 fv-plugins-icon-container lead-form">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control enquery-form"
                                                                            id="add-user-fullname"
                                                                            placeholder="Candidate Last Name"
                                                                            name="lastname"
                                                                            onChange={(e) => handleChange(e, 'lastname')}
                                                                        />
                                                                        <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                                    </div>
                                                                    <div className="mb-1 fv-plugins-icon-container lead-form">
                                                                        <select
                                                                            id="exampleFormControlSelect2"
                                                                            className="select2 form-select enquery-form"
                                                                            name='roleId'
                                                                            onChange={(e) => handleChange(e, 'roleId')}
                                                                        >
                                                                            <option value="">Assign to Owner</option>
                                                                            <option value={userDataFinOne.id}>{userDataFinOne.name}</option>
                                                                        </select>
                                                                        <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                                    </div>
                                                                    <div className="mb-1 fv-plugins-icon-container lead-form">
                                                                        <input
                                                                            type="text"
                                                                            id="add-user-contact"
                                                                            className="form-control phone-mask enquery-form"
                                                                            placeholder="Candidate Mobile Number"
                                                                            name="phoneNumber"
                                                                            onChange={(e) => handleChange(e, 'phoneNumber')}
                                                                        />
                                                                    </div>
                                                                    <div className="mb-1 fv-plugins-icon-container lead-form">
                                                                        <input
                                                                            type="text"
                                                                            id="add-user-contact"
                                                                            className="form-control phone-mask enquery-form"
                                                                            placeholder="Candidate WhatsApp Number"
                                                                            name="WhatsApp"
                                                                            onChange={(e) => handleChange(e, 'WhatsApp')}
                                                                        />
                                                                    </div>
                                                                    <div className="mb-1 fv-plugins-icon-container lead-form">
                                                                        <input
                                                                            type="text"
                                                                            id="add-user-email"
                                                                            className="form-control enquery-form"
                                                                            placeholder="Candidate Email Id"
                                                                            name="email"
                                                                            onChange={(e) => handleChange(e, 'email')}
                                                                        />
                                                                        <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                                    </div>
                                                                    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                                                        <SortableContext items={allInputFieldsData.map(item => item.id)} strategy={verticalListSortingStrategy}>
                                                                            <ul className="list widget_dragable cus_leftsfields" id="dragItemBox">
                                                                                {allInputFieldsData.map((item) => (
                                                                                    item.component && (
                                                                                        <Draggable key={item.id} id={item.id} component={<li className="draggable_column_item">{item.component}</li>} />
                                                                                    )
                                                                                ))}
                                                                            </ul>
                                                                        </SortableContext>
                                                                    </DndContext>

                                                                </div>
                                                                <div className="mb-3 fv-plugins-icon-container d-flex mr--45">
                                                                    <button type="submit" className="btn btn-primary me-sm-3 me-1 data-submit">Submit</button>
                                                                    <button type="reset" className="btn btn-label-secondary" data-bs-dismiss="offcanvas">Cancel</button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>) : (<div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasAddUser" aria-labelledby="offcanvasAddUserLabel">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="offcanvas-header cus_headerr header_choos_details">
                                                        <h5 id="offcanvasAddUserLabel" className="offcanvas-title"><i class="bx bx-user bx-sm"></i> Lead Information</h5>
                                                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-0 ">
                                                    <div className='container'>
                                                        <div className='row'>
                                                            <div className="col-md-12">
                                                                <form className="add-new-user" id="addNewUserForm" onSubmit={handleSubmit} noValidate>
                                                                    <div className='right_form-fields'>



                                                                        <div className="mb-1 fv-plugins-icon-container lead-form">
                                                                            <input
                                                                                type="text"
                                                                                className="form-control enquery-form"
                                                                                id="add-user-fullname"
                                                                                placeholder="Candidate Frist Name"
                                                                                name="name"
                                                                                onChange={(e) => handleChange(e, 'name')}

                                                                            />
                                                                            <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                                        </div>
                                                                        <div className="mb-1 fv-plugins-icon-container lead-form">
                                                                            <input
                                                                                type="text"
                                                                                className="form-control enquery-form"
                                                                                id="add-user-fullname"
                                                                                placeholder="Candidate Last Name"
                                                                                name="lastname"
                                                                                onChange={(e) => handleChange(e, 'lastname')}

                                                                            />
                                                                            <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                                        </div>


                                                                        <div className="mb-1 fv-plugins-icon-container lead-form"><select id="exampleFormControlSelect2" class="select2 form-select enquery-form" name='roleId' onChange={(e) => handleChange(e, 'roleId')}>
                                                                            <option value="">Assign to Owner</option>
                                                                            <option value={userDataFinOne.id}>{userDataFinOne.name}</option>
                                                                        </select>
                                                                            <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                                        </div>


                                                                        <div className="mb-1 fv-plugins-icon-container lead-form">
                                                                            <input
                                                                                type="text"
                                                                                id="add-user-contact"
                                                                                className="form-control phone-mask enquery-form"
                                                                                placeholder="Candidate Mobile Number"
                                                                                name="phoneNumber"
                                                                                onChange={(e) => handleChange(e, 'phoneNumber')}

                                                                            />
                                                                        </div>
                                                                        <div className="mb-1 fv-plugins-icon-container lead-form">
                                                                            <input
                                                                                type="text"
                                                                                id="add-user-contact"
                                                                                className="form-control phone-mask enquery-form"
                                                                                placeholder="Candidate WhatsApp Number"
                                                                                name="WhatsApp"
                                                                                onChange={(e) => handleChange(e, 'WhatsApp')}

                                                                            />
                                                                        </div>
                                                                        <div className="mb-1 fv-plugins-icon-container lead-form">
                                                                            <input
                                                                                type="text"
                                                                                id="add-user-email"
                                                                                className="form-control enquery-form"
                                                                                placeholder="Candidate Email Id"
                                                                                name="email"
                                                                                onChange={(e) => handleChange(e, 'email')}

                                                                            />
                                                                            <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                                        </div>
                                                                        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                                                            <SortableContext items={allInputFieldsData.map(item => item.id)} strategy={verticalListSortingStrategy}>
                                                                                <ul className="list widget_dragable cus_leftsfields" id="dragItemBox">
                                                                                    {allInputFieldsData.map((item) => (
                                                                                        item.component && (
                                                                                            <Draggable key={item.id} id={item.id} component={<li className="draggable_column_item">{item.component}</li>} />
                                                                                        )
                                                                                    ))}
                                                                                </ul>
                                                                            </SortableContext>
                                                                        </DndContext>


                                                                    </div>
                                                                    <div className="mb-3 fv-plugins-icon-container d-flex mr--45">
                                                                        <button type="submit" className="btn btn-primary me-sm-3 me-1 data-submit">Submit</button>
                                                                        <button type="reset" className="btn btn-label-secondary" data-bs-dismiss="offcanvas">Cancel</button>
                                                                    </div>
                                                                </form>


                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>)}
                                </div >
                                {/*  <!-- Modal -->
                            <!-- Edit User Modal --> */}
                                <div class="modal fade modal_addsalteam" id="editUser" tabindex="-1" aria-hidden="true">
                                    <div class="modal-dialog modal-lg modal-simple modal-edit-user">
                                        <div class="modal-content">
                                            <div class="modal-header update_info">
                                                <div className='flex-row'>
                                                    <div>
                                                        <h5 class="modal-title">Edit User Information</h5>

                                                    </div>

                                                </div>

                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <div className='pl--25 pr--25 pb--25 pt--20'>
                                                    <form id="editUserForm" class="row g-3 fv-plugins-bootstrap5 fv-plugins-framework" onSubmit={handleUpdate} novalidate="novalidate">
                                                        <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                            <label for="flatpickr-datetime" class="form-label">Date</label>
                                                            <input type="date" class="form-control" placeholder="YYYY-MM-DD HH:MM" id="flatpickr-datetime" name='date'
                                                                value={date} onChange={(e) => setDate(e.target.value)} />
                                                        </div>
                                                        <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                            <label class="form-label" for="modalEditUserFirstName">Full Name</label>
                                                            <input type="text" id="modalEditUserFirstName" name='name' class="form-control" placeholder="John"
                                                                value={name} onChange={(e) => setName(e.target.value)}
                                                            />
                                                            <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div></div>
                                                        <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                            <label class="form-label" for="modalEditUserLastName">Age</label>
                                                            <input type="text" id="modalEditUserLastName" name='age'
                                                                onChange={(e) => setAge(e.target.value)}
                                                                defaultValue={age} class="form-control" placeholder="Doe" />
                                                            <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div></div>
                                                        <div class="col-12 col-md-6">
                                                            <label class="form-label" for="modalEditUserPhone">Phone Number</label>
                                                            <div class="input-group input-group-merge">
                                                                <span class="input-group-text">+91</span>
                                                                <input type="text" id="modalEditUserPhone"
                                                                    name='phoneNumber'
                                                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                                                    defaultValue={phoneNumber} class="form-control phone-number-mask phnnmbr" placeholder="202 555 0111" />
                                                            </div>
                                                        </div>
                                                        <div class="col-12 col-md-6">
                                                            <label class="form-label" for="modalEditUserEmail">Email</label>
                                                            <input type="text" id="modalEditUserEmail" name='email'
                                                                onChange={(e) => setEmail(e.target.value)}
                                                                defaultValue={email} class="form-control" placeholder="example@domain.com" />
                                                        </div>
                                                        <div class="col-12 col-md-6">
                                                            <label class="form-label" for="modalEditUserEmail">Working Status</label>
                                                            <input type="text" id="modalEditUserEmail" name='workingStatus'
                                                                onChange={(e) => setWorkingStatus(e.target.value)}
                                                                defaultValue={workingStatus} class="form-control" placeholder="student" />
                                                        </div>
                                                        <div class="col-12 col-md-6">
                                                            <label class="form-label" for="modalEditTaxID">leadPlatform</label>
                                                            <input type="text" id="modalEditTaxID" name="leadPlatform" onChange={(e) => setLeadPlatform(e.target.value)}
                                                                defaultValue={leadPlatform} class="form-control modal-edit-tax-id" placeholder="Call" />
                                                        </div>

                                                        <div class="col-12 col-md-6">
                                                            <label class="form-label" for="modalEditTaxID">remark</label>
                                                            <input type="text" id="modalEditTaxID" name="remark" onChange={(e) => setRemark(e.target.value)}
                                                                defaultValue={remark} class="form-control modal-edit-tax-id" placeholder="remark" />
                                                        </div>


                                                        <div class="col-12 text-center ">
                                                            <div className='d-flex'>

                                                                <button type="submit" class="btn btn-primary me-sm-3 me-1">Update</button>


                                                                <button type="reset" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">Cancel</button>


                                                            </div>

                                                        </div>
                                                        <input type="hidden" />
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div >

                                {/* Edit User to Assign Modal */}
                                <div
                                    className="modal fade modal_addsalteam"
                                    id="AssignUsers"
                                    tabIndex="-1"
                                    aria-hidden="true"
                                >
                                    <div className="modal-dialog modal-lg modal-simple modal-edit-user">
                                        <div className="modal-content">
                                            <div className="modal-header update_info">
                                                <div className="flex-row">
                                                    <div>
                                                        <h5 className="modal-title">Re-Assign Lead</h5>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="btn-close"
                                                    data-bs-dismiss="modal"
                                                    aria-label="Close"
                                                ></button>
                                            </div>
                                            <div className="modal-body">
                                                <div className="pl--25 pr--25 pb--25 pt--20">
                                                    <div className="card-details p-4 bg-light shadow-sm rounded">

                                                        <h4 className="mb-4">{selectedTask && selectedTask.name}</h4>
                                                        {selectedTask && (
                                                            <form id={selectedTask.id}>
                                                                <div className="mb-4">
                                                                    <label className="form-label">Head Owner(s) - Assigned from</label>
                                                                    <select className="form-select">
                                                                        <option value={userDataFinOne.id}>{userDataFinOne.name}</option>
                                                                    </select>
                                                                </div>
                                                                <div className="mb-4">
                                                                    <label className="form-label">Head Owner(s) - Assigned to</label>
                                                                    <select
                                                                        id={`roleSelect-${selectedTask.id}`}
                                                                        className="form-select"
                                                                        defaultValue={roleId}
                                                                        onChange={(e) => setroleId(e.target.value)}
                                                                    >
                                                                        <option value="">-Select Assigned to-</option>
                                                                        {dataUser.map(option => (
                                                                            <option key={option.id} value={option.id}>{option.name}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                                {telecallerPersonNames[selectedTask.id] !== null && (
                                                                    <div className='mb-4'>
                                                                        <input
                                                                            className="form-check-input"
                                                                            type="checkbox"
                                                                            id={`telecallerPersonName-${selectedTask.id}`}
                                                                            name="telecallerPersonNames"
                                                                            checked={telecallerPersonNames[selectedTask.id] === "Allotted"}
                                                                            onChange={(e) => handleUpdateAssignToUsers(e, selectedTask.id)}
                                                                        />
                                                                        <span>
                                                                            {telecallerPersonNames[selectedTask.id] === "Allotted" ? `Assigned to ${telecallerPersonNames[selectedTask.id]}` : "Re-Assign this lead"}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                                <div className="justify-content-between mt-4">
                                                                    <div className="row d-flex">
                                                                        <div className="col-md-6">
                                                                            <button type="submit" class="btn btn-primary me-sm-3 me-1">
                                                                                Update
                                                                            </button>
                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <button type="reset" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div >
                            {/*  <!-- Footer --> */}

                            < Footer />

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

export default SaleTeamUse