import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardCard from "./dashboardcardComponent";
import Navbarmenu from './Navbarmenu';
import FooterFrontend from './FooterFrontend';
import { useParams, Link } from 'react-router-dom';
import Sidebar from "./sidebar";
import { Last } from 'react-bootstrap/esm/PageItem';
const { REACT_APP_API_ENDPOINT } = process.env;
function UserMyProfile(token) {
    const { usersId } = useParams();
    const [userData, setUserData] = useState({});
    const [roleData, setSaleTeamData] = useState([]);
    const [countryTable, setCountryTable] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCourses, setSelectedCourses] = useState('');
    const [courses, setCourses] = useState([])
    const [batches, setBatches] = useState([])

    const [formData, setFormData] = useState({
        name: '',
        userName: '',
        lastname:'',
        email: '',
        password: '',
        roleName: '',
        phoneNumber: '',
        image: null,
        AddressType: '',
        Address: '',
        StateId: '',
        CountryId: '',
        DistrictId: '',
        City: '',
        Date: '',
        DOB: '',
        YourIntroducationAndSkills: '',
        TeacherType: '',
        CoursesId: '',
        BatchId: '',
        CousesId:''
    });

    useEffect(() => {
        if (usersId) {
            fetchData(usersId);
        }
    }, [usersId]);

    useEffect(() => {
        fetchData1();
        fetchData2()
        fetchData3()
        fetchData4()
    }, []);



    const handleCountryChange = (e) => {
        const selectedCountryId = parseInt(e.target.value, 10);
        const selectedCountry = countryTable.find((country) => country.id === selectedCountryId);
        setFormData({
            ...formData,
            CountryId: selectedCountryId,
            StateId: '',
            DistrictId: '',
        });
        setSelectedCountry(selectedCountry);
        setSelectedState('');
    };


    const handleStateChange = (e) => {
        const selectedStateId = parseInt(e.target.value, 10);
        const selectedState = selectedCountry ? selectedCountry.Staties.find((state) => state.id === selectedStateId) : '';
        setFormData({
            ...formData,
            StateId: selectedStateId,
            DistrictId: '',
        });
        setSelectedState(selectedState);
    };

    const setTeacherFormData = (userData) => ({
        name: userData?.name || '',
        LastName:userData?.LastName || '',
        userName: userData?.userName || '',
        email: userData?.email || '',
        departmentId: userData?.departmentId || '',
        phoneNumber: userData?.phoneNumber || '',
        image: null,
        CountryId: userData?.Address?.CountryId || '',
        StateId: userData?.Address?.StateId || '',
        DistrictId: userData?.Address?.DistrictId || '',
        Address: userData?.Address?.Address || '',
        City: userData?.Address?.City || '',
        DOB: userData?.Teachers[0]?.DOB || '',
        YourIntroducationAndSkills: userData?.Teachers[0]?.YourIntroducationAndSkills || '',
        TeacherType: userData?.Teachers[0]?.TeacherType || '',
        CousesId: userData?.Teachers[0]?.CousesId || '',
    });
    const setUserFormData = (userData) => ({
        name: userData?.name || '',
        lastname:userData.lastname || '',
        userName: userData?.userName || '',
        email: userData?.email || '',
        departmentId: userData?.departmentId || '',
        phoneNumber: userData?.phoneNumber || '',
        image: null,
        CountryId: userData?.Address?.CountryId || '',
        StateId: userData?.Address?.StateId || '',
        DistrictId: userData?.Address?.DistrictId || '',
        Address: userData?.Address?.Address || '',
        City: userData?.Address?.City || ''
    });
    const setStudentFormData = (userData) => ({
        name: userData?.name || '',
        LastName:userData?.LastName || '',
        userName: userData?.userName || '',
        email: userData?.email || '',
        departmentId: userData?.departmentId || '',
        phoneNumber: userData?.phoneNumber || '',
        image: null,
        CountryId: userData?.Address?.CountryId || '',
        StateId: userData?.Address?.StateId || '',
        DistrictId: userData?.Address?.DistrictId || '',
        Address: userData?.Address?.Address || '',
        City: userData?.Address?.City || '',
        Date: userData?.Students[0]?.Date || '',
        CoursesId: userData?.Students[0]?.CoursesId || '',
        BatchId: userData?.Students[0]?.BatchId || ''
    });
    const setGestFormData = (userData) => {
        const baseData = {
            name: userData?.name || '',
            LastName: userData?.LastName || '',
            userName: userData?.userName || '',
            email: userData?.email || '',
            departmentId: userData?.departmentId || '',
            phoneNumber: userData?.phoneNumber || '',
            image: null,
            CountryId: userData?.Address?.CountryId || '',
            StateId: userData?.Address?.StateId || '',
            DistrictId: userData?.Address?.DistrictId || '',
            Address: userData?.Address?.Address || '',
            City: userData?.Address?.City || ''
        };

        if (userData?.studentId) {
            baseData.Date = userData?.Students[0]?.Date || '';
            baseData.CoursesId = userData?.Students[0]?.CoursesId || '';
            baseData.BatchId = userData?.Students[0]?.BatchId || '';
        }

        if (userData?.teacherId) {
            baseData.CousesId = userData?.Teachers[0]?.CousesId || '';
            baseData.DOB = userData?.Teachers[0]?.DOB || '';
            baseData.YourIntroducationAndSkills = userData?.Teachers[0]?.YourIntroducationAndSkills || '';
            baseData.TeacherType = userData?.Teachers[0]?.TeacherType || '';
        }

        return baseData;
    };


    const fetchData = async (usersId) => {
        try {
            if (!usersId) {
                console.log("userId is undefined");
                return;
            }
            const response = await axios.get(`${REACT_APP_API_ENDPOINT}/signup/${usersId}`);
            const userData = response.data.users;
            setUserData(userData)
            if (userData?.departmentId === 3) {
                setFormData(setTeacherFormData(userData));
            } else if (userData?.departmentId === 4) {
                setFormData(setStudentFormData(userData));
            } else if (userData?.departmentId === 5) {
                setFormData(setGestFormData(userData));
            } else {
                setFormData(setUserFormData(userData));
            }


        } catch (err) {
            console.error('Error fetching user data:', err.response);
        }
    }
    const fetchData1 = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/listrole`, {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                });
                const userDatas = response.data.role;
                setSaleTeamData(userDatas)
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchData2 = async () => {
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


    const fetchData3 = async () => {
        try {

            const response = await axios.get(`${REACT_APP_API_ENDPOINT}/courses`);
            const userDatas = response.data.courses;
            setCourses(userDatas)


        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchData4 = async () => {
        try {
            const response = await axios.get(`${REACT_APP_API_ENDPOINT}/batches`);
            const userData = response.data.batchs;
            setBatches(userData)

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handleChange = (e) => {
        const { name, files, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: files ? files[0] : value
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }
        try {
            const token = localStorage.getItem('token');

            if (token) {
                await axios.patch(`${REACT_APP_API_ENDPOINT}/users/${usersId}`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data for file upload
                        Authorization: `Bearer ${token}`
                    }
                });

                fetchData(usersId); // Refresh user data after update
                alert("User data updated successfully!");
               window.location.href = `/user-my-profile/${usersId}`;
            }
        } catch (error) {
            console.error('Error updating user:', error);
            alert('An error occurred while updating user data');
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



                        <div class="col-lg-9  rts-sticky-column-item" >

                            {/* <form style={{ backgroundColor: "white" }} onSubmit={handleUpdate}> */}
                            <div className='profile flex-row d-flex'>
                                <h5 class="title">My Profile</h5>
                                <div class="d-inline-block text-nowrap">
                                    <Link to={`/user-my-profile/${userData.id}`} className="navbar-brand" >  <button className="btn btn-sm btn-icon" data-bs-target="#edit" data-bs-toggle="modal">
                                        <i class="bx bx-edit"></i>
                                    </button>
                                    </Link>
                                </div>
                            </div>
                            {/* <!-- single My portfolio start--> */}
                            <div style={{ backgroundColor: "white" }} class="right-sidebar-my-profile-dash theiaStickySidebar pt--30">

                                <div class="my-single-portfolio-dashed">
                                    <div class="name">Registration Date</div>
                                    <div class="value">{userData.createdAt}</div>
                                </div>
                                {/* <!-- single My portfolio end--> */}
                                {/* <!-- single My portfolio start--> */}
                                <div class="my-single-portfolio-dashed">
                                    <div class="name">Full Name:</div>
                                    <div class="value">{userData.name}  {userData.lastname}</div>
                                </div>
                                {/* <!-- single My portfolio end--> */}
                                {/* <!-- single My portfolio start--> */}
                                <div class="my-single-portfolio-dashed">
                                    <div class="name">Username:</div>
                                    <div class="value">{userData.userName}</div>
                                </div>
                                {/* <!-- single My portfolio end--> */}
                                {/* <!-- single My portfolio start--> */}
                                <div class="my-single-portfolio-dashed">
                                    <div class="name">Email:</div>
                                    <div class="value">{userData.email}</div>
                                </div>
                                {/* <!-- single My portfolio end--> */}
                                {/* <!-- single My portfolio start--> */}
                                <div class="my-single-portfolio-dashed">
                                    <div class="name">Phone Number:</div>
                                    <div class="value">{userData.phoneNumber}</div>
                                </div>
                                {/* <!-- single My portfolio end--> */}
                                {/* <!-- single My portfolio start--> */}
                                <div class="my-single-portfolio-dashed">
                                    <div class="name">Role</div>
                                    <div class="value">{userData.Role && userData.Role.Name}</div>
                                </div>
                                {/* <!-- single My portfolio end--> */}
                                {/* <!-- single My portfolio start--> */}
                                <div class="my-single-portfolio-dashed">
                                    <div class="name">Biography</div>
                                    <div class="value">{userData?.Address && userData?.Address?.Address || "Not Address"}</div>
                                </div>
                                {/* <!-- single My portfolio end--> */}


                            </div>
                            {/* </form> */}

                        </div>

                        {/*  <!-- Modal -->
                            <!-- Edit User Modal --> */}
                        <div class="modal fade" id="edit" tabindex="-1" aria-hidden="true">
                            <div class="modal-dialog modal-lg modal-simple modal-edit-user">
                                <div class="modal-content p-3 p-md-5">
                                    <div class="modal-body">
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        <div class="text-center mb-4">
                                            <h3>Edit User Information</h3>
                                            <p>Updating user details will receive a privacy audit.</p>
                                        </div>
                                        <form id="editUserForm" class="row g-3 fv-plugins-bootstrap5 fv-plugins-framework" onSubmit={handleUpdate} novalidate="novalidate">

                                            <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                <label class="form-label" htmlFor="name" for="modalEditUserFirstName">Frist Name</label>
                                                <input type="text" id="modalEditUserFirstName" name='name' class="form-control" placeholder="John"
                                                    value={formData.name} onChange={handleChange}
                                                />
                                            </div>

                                            <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                <label class="form-label" htmlFor="name" for="modalEditUserFirstName">Last Name</label>
                                                <input type="text" id="modalEditUserFirstName" name='lastname' class="form-control" placeholder="John"
                                                    value={formData.lastname} onChange={handleChange}
                                                />
                                            </div>

                                            <div class="col-12 col-md-6 fv-plugins-icon-container">
                                                <label class="form-label" for="modalEditUserLastName">User Name</label>
                                                <input type="text" id="modalEditUserLastName" name='userName'
                                                    onChange={handleChange}
                                                    value={formData.userName} class="form-control" placeholder="Doe" />
                                            </div>

                                            <div class="col-12 col-md-6">
                                                <label class="form-label" for="modalEditUserEmail">Email</label>
                                                <input type="text" id="modalEditUserEmail" name='email'
                                                    onChange={handleChange}
                                                    value={formData.email} class="form-control" placeholder="example@domain.com" />
                                            </div>

                                            <div class="col-12 col-md-6">
                                                <label class="form-label" for="modalEditUserPhone">Phone Number</label>
                                                <div class="input-group input-group-merge">
                                                    <input type="text" id="modalEditUserPhone"
                                                        name='phoneNumber'
                                                        onChange={handleChange}
                                                        value={formData.phoneNumber} class="form-control phone-number-mask" placeholder="+91 1021621222" />
                                                </div>
                                            </div>

                                            <div class="col-12 col-md-6">
                                                <label class="form-label" for="modalEditUserStatus">Role</label>
                                                <select
                                                    id="modalEditUserStatus"
                                                    className="form-select"
                                                    name="departmentId"
                                                    onChange={handleChange}
                                                    value={formData.departmentId}
                                                    disabled="false">
                                                    {roleData.map((option) => (
                                                        <option key={option.id} value={option.id}>{option.Name}</option>
                                                    ))}
                                                </select>

                                            </div>

                                            <div class="col-12 col-md-6">
                                                <label htmlFor="exampleFormControlSelect2" className="form-label" > Country</label>
                                                <select name="CountryId" className="select2 form-select" value={formData.CountryId} onChange={handleCountryChange}>
                                                    <option value="">Select Country</option>
                                                    {countryTable.map((country) => (
                                                        <option key={country.id} value={country.id}>
                                                            {country.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div class="col-12 col-md-6">
                                                <label htmlFor="exampleFormControlSelect2" className="form-label"> State</label>
                                                <select name="StateId" className="select2 form-select" value={formData.StateId} onChange={handleStateChange} disabled={!selectedCountry}>
                                                    <option value="">Select State</option>
                                                    {selectedCountry &&
                                                        selectedCountry.Staties.map((state) => (
                                                            <option key={state.id} value={state.id}>
                                                                {state.name}
                                                            </option>
                                                        ))}
                                                </select>
                                            </div>
                                            <div class="col-12 col-md-6">
                                                <label htmlFor="exampleFormControlSelect2" className="form-label"> District</label>
                                                <select name="DistrictId" className="select2 form-select" value={formData.DistrictId} onChange={handleChange} disabled={!selectedState}>
                                                    <option value="">Select District</option>
                                                    {selectedState && selectedState.Cities.map(city => (
                                                        <option key={city.id} value={city.id}>{city.name}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div class="col-12 col-md-6">
                                                <label htmlFor="exampleFormControlSelect2" className="form-label"> Address Type</label>
                                                <select className="select2 form-select" name="AddressType" value={formData.AddressType} onChange={handleChange}>
                                                    <option value=" ">Select</option>
                                                    <option value="Current Address">Current Address</option>
                                                    <option value="Permanent Address">Permanent Address</option>
                                                </select>
                                            </div>

                                            <div class="col-12 col-md-6">
                                                <label class="form-label" for="add-user-email"> City</label>
                                                <input type="text" name="City" className='form-control' value={formData.City} onChange={handleChange} placeholder="City" />
                                                <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                            </div>

                                            <div class="col-12">
                                                <label class="form-label" for="add-user-email"> Address</label>
                                                <input type="text" className='form-control' name="Address" value={formData.Address} onChange={handleChange} placeholder="Address" />
                                                <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                            </div>

                                            {userData.departmentId === 4 && (
                                                <>
                                                    <div class="col-12 col-md-6">
                                                        <label class="form-label" for="add-user-contact">Student Date</label>
                                                        <input type="date" id="add-user-contact" class="form-control phone-mask" placeholder="Date" name="Date"
                                                            onChange={handleChange}
                                                            disabled="false" value={formData.Date} />
                                                    </div>
                                                    <div class="col-12 col-md-6">
                                                        <label for="exampleFormControlSelect2" class="form-label">Student Class</label>
                                                        <select id="exampleFormControlSelect2" disabled="false" class="select2 form-select" name="CoursesId" value={formData.CoursesId} onChange={handleChange}>
                                                            <option value="">Select</option>
                                                            {courses.map((option) => (
                                                                <option key={option.id} value={option.id}>{option.name}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div class="col-12 col-md-6">
                                                        <label for="exampleFormControlSelect2" class="form-label">Student Batch</label>
                                                        <select id="exampleFormControlSelect2" disabled="false" class="select2 form-select" name="BatchId" value={formData.BatchId} onChange={handleChange}>
                                                            <option value="">Select</option>
                                                            {batches.map(batch => (
                                                                <option key={batch.id} value={batch.id}>{batch.Title}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </>

                                            )}
                                            {userData.departmentId === 3 && (<>
                                                <div class="col-12 col-md-6">
                                                    <label for="exampleFormControlSelect2" class="form-label">Class</label>
                                                    <select id="exampleFormControlSelect2" disabled="false" class="select2 form-select" name="CousesId" value={formData.CousesId} onChange={handleChange}>
                                                        <option value="">Select</option>
                                                        {courses.map((option) => (
                                                            <option key={option.id} value={option.id}>{option.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div class="col-12 col-md-6">
                                                    <label class="form-label" for="add-user-email">DOB</label>
                                                    <input type="date" className='form-control' name="DOB" value={formData.DOB} onChange={handleChange} placeholder="DOB" />
                                                    <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                </div>
                                                <div class="col-12">
                                                    <label for="exampleFormControlSelect2" class="form-label">Type</label>
                                                    <select id="exampleFormControlSelect2" class="select2 form-select" name="TeacherType" value={formData.TeacherType} onChange={handleChange}>
                                                        <option value="">Select</option>
                                                        <option value="Online">Online</option>
                                                        <option value="Offline">Offline</option>
                                                    </select>
                                                </div>
                                                <div class="col-12">
                                                    <label class="form-label" for="basic-icon-default-message">Introducation & Skills</label>
                                                    <div class="input-group input-group-merge">

                                                        <textarea
                                                            id="basic-icon-default-message"
                                                            class="form-control"
                                                            rows="8"
                                                            placeholder="Hi, Your Introducation And Skills?"
                                                            aria-label="Hi, Your Introducation And Skills?"
                                                            aria-describedby="basic-icon-default-message2"
                                                            name="YourIntroducationAndSkills" value={formData.YourIntroducationAndSkills} onChange={handleChange}></textarea>
                                                    </div>
                                                </div>
                                            </>
                                            )}
                                            {userData.departmentId === 5 && (
                                                <div>
                                                    {userData.studentId ? (
                                                        <div className='row'>
                                                            <div class="col-12 col-md-6">
                                                                <label class="form-label" for="add-user-contact">Student Date</label>
                                                                <input type="date" id="add-user-contact" class="form-control phone-mask" placeholder="Date" name="Date"
                                                                    onChange={handleChange}
                                                                    disabled="false" value={formData.Date} />
                                                            </div>
                                                            <div class="col-12 col-md-6">
                                                                <label for="exampleFormControlSelect2" class="form-label">Student Courses</label>
                                                                <select id="exampleFormControlSelect2" disabled="false" class="select2 form-select" name="CoursesId" value={formData.CoursesId} onChange={handleChange}>
                                                                    <option value="">Select</option>
                                                                    {courses.map((option) => (
                                                                        <option key={option.id} value={option.id}>{option.name}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div class="col-12">
                                                                <label for="exampleFormControlSelect2" class="form-label">Student Batch</label>
                                                                <select id="exampleFormControlSelect2" disabled="false" class="select2 form-select" name="BatchId" value={formData.BatchId} onChange={handleChange}>
                                                                    <option value="">Select</option>
                                                                    {batches.map(batch => (
                                                                        <option key={batch.id} value={batch.id}>{batch.Title}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    ) : userData.teacherId ? (

                                                        <div className='row'>
                                                                <div class="col-12 col-md-6">
                                                                    <label for="exampleFormControlSelect2" class="form-label">Class</label>
                                                                    <select id="exampleFormControlSelect2" disabled="false" class="select2 form-select" name="CousesId" value={formData.CousesId} onChange={handleChange}>
                                                                        <option value="">Select</option>
                                                                        {courses.map((option) => (
                                                                            <option key={option.id} value={option.id}>{option.name}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            <div class="col-12 col-md-6">
                                                                <label class="form-label" for="add-user-email">DOB</label>
                                                                <input type="date" className='form-control' name="DOB" value={formData.DOB} onChange={handleChange} placeholder="DOB" />
                                                                <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                            </div>
                                                            <div class="col-12">
                                                                <label for="exampleFormControlSelect2" class="form-label">Type</label>
                                                                <select id="exampleFormControlSelect2" class="select2 form-select" name="TeacherType" value={formData.TeacherType} onChange={handleChange}>
                                                                    <option value="">Select</option>
                                                                    <option value="Online">Online</option>
                                                                    <option value="Offline">Offline</option>
                                                                </select>
                                                            </div>
                                                            <div class="col-12">
                                                                <label class="form-label" for="basic-icon-default-message">Introducation & Skills</label>
                                                                <div class="input-group input-group-merge">

                                                                    <textarea
                                                                        id="basic-icon-default-message"
                                                                        class="form-control"
                                                                        rows="8"
                                                                        placeholder="Hi, Your Introducation And Skills?"
                                                                        aria-label="Hi, Your Introducation And Skills?"
                                                                        aria-describedby="basic-icon-default-message2"
                                                                        name="YourIntroducationAndSkills" value={formData.YourIntroducationAndSkills} onChange={handleChange}></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : null}
                                                </div>
                                            )}
                                            <div class="col-12">
                                                <label class="form-label" for="modalEditTaxID">Message</label>
                                                <input type="text" id="modalEditTaxID" name="message" onChange={handleChange}
                                                    value={formData.message} class="form-control modal-edit-tax-id" placeholder="message" />
                                            </div>
                                            <div class="col-12">
                                                <div class="input-group">
                                                    <input
                                                        type="file"
                                                        class="form-control"
                                                        id="inputGroupFile04"
                                                        aria-describedby="inputGroupFileAddon04"
                                                        aria-label="Upload"
                                                        name="file"
                                                        accept="image/png, image/jpeg"
                                                        onChange={handleChange}
                                                        value={formData.image}
                                                    />

                                                </div>
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

                </div>
            </div>

        </div>
    );
}

export default UserMyProfile;