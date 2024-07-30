import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from './footerComponent';
import Navbar from './navComponemt';
import DashBoardMenus from './dashboardsMenuComponent';
import Select, { StylesConfig } from 'react-select'
import makeAnimated from 'react-select/animated'; 
import ValidateCreate from '../validation/addteachervalidations'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
const animatedComponents = makeAnimated();
const { REACT_APP_API_ENDPOINT ,REACT_APP_API_IMG} = process.env;
function ListUse() {
    const [countryTable, setCountryTable] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [Name, setName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Email, setEmail] = useState('');
    const [DOB, setDOB] = useState('');
    const [PhoneNumber, setPhoneNumber] = useState('');
    const [Password, setPassword] = useState("");
    const [StateId, setStateId] = useState('')
    const [CountryId, setCountryId] = useState('')
    const [Address, setAddress] = useState('')
    const [City, setCity] = useState('')
    const [DistrictId, setDistrictId] = useState('')
    const [TeacherType, setTeacherType] = useState('')
    const [Username, setUsername] = useState('')
    const [YourIntroducationAndSkills, setYourIntroducationAndSkills] = useState('')
    const [errors, setErrors] = useState({});
    const [CousesId, setCousesId] = useState('')
    const [courses, setCourses] = useState([])
    const [image, setimage] = useState(null)
    const [selectedFiles, setSelectedFiles] = useState(null);
    const formData = {
        Name,
        LastName,
        Email,
        Password,
        DOB,
        TeacherType,
        Username,
        PhoneNumber,
        YourIntroducationAndSkills,
        AddressType: 'Current Address',
        Address,
        StateId,
        CountryId,
        DistrictId,
        City,
        CousesId,
        image
    }
    const handleCountryChange = (e) => {
        const selectedCountryId = parseInt(e.target.value);
        const selectedCountry = countryTable.find(country => country.id === selectedCountryId);
        setCountryId(selectedCountryId);
        setSelectedCountry(selectedCountry);
        setStateId(''); // Reset state and district selections
        setSelectedState('');
        setDistrictId('');
    };

    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
    };
    const handleStateChange = (e) => {
        const selectedStateId = parseInt(e.target.value);
        const selectedState = selectedCountry ? selectedCountry.Staties.find(state => state.id === selectedStateId) : '';
        setStateId(selectedStateId);
        setSelectedState(selectedState);
        setDistrictId(''); // Reset district selection
    };

    useEffect(() => {
        fetchData2()
        fetchData3()
    }, []);




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

    const options = courses.map(option => ({
        value: option.id,
        label: option.name
    }));

    // Handle change event
    const handleNewChange = (selectedOptions) => {
        const coursesIds = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setCousesId(coursesIds);
    };

    const handleChange = (e) => {
        const { name,files, value } = e.target;
        const updatedFormData = { ...formData, [name]: files ? files[0] : value};
        const validationErrors = ValidateCreate(updatedFormData);
        setErrors(validationErrors);
        setName(updatedFormData.Name || '');
        setLastName(updatedFormData.LastName || '');
        setEmail(updatedFormData.Email || '');
        setPhoneNumber(updatedFormData.PhoneNumber || '');
        setUsername(updatedFormData.Username || '');
        setPassword(updatedFormData.Password || '');
        setDOB(updatedFormData.DOB || '');
        setTeacherType(updatedFormData.TeacherType || '');
        setCountryId(updatedFormData.CountryId || '');
        setStateId(updatedFormData.StateId || '');
        setDistrictId(updatedFormData.DistrictId || '');
        setAddress(updatedFormData.Address || '');
        setCity(updatedFormData.City || '');
        setYourIntroducationAndSkills(updatedFormData.YourIntroducationAndSkills || '');
        setCousesId(updatedFormData.CousesId || '')
        setimage(updatedFormData.image || null)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        const formDataWithCoursesId = {
            ...formData,
            CousesId: formData.CousesId.join(',')  // Convert array to comma-separated string
        };
        if (selectedFiles) {
            data.append('file', selectedFiles[0]);
        }
        for (const key in formDataWithCoursesId) {
            data.append(key, formDataWithCoursesId[key]);
        }
        try {
         
            const token = localStorage.getItem('token');

            let response
            if (token) {
           
                response = await axios.post(`${REACT_APP_API_ENDPOINT}/addteachers`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                    }
                });
              
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
                 window.location.href = "/teachers";
            }
          
        } catch (error) {
            toast.error(error.response.data.message ,{
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

    const [show, setShow] = useState(false)

    const handleshow=()=>{
      setShow(show ? false : true)
    }

    //Dropdown Navigation

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
                                    <div class="card-header border-bottom">
                                        <div class="d-flex justify-content-between align-items-center row py-3 gap-3 gap-md-0">
                                            <div class="offcanvas-header">
                                                <h5 id="offcanvasAddUserLabel" class="offcanvas-title"> Fculty</h5>
                                                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                            </div>
                                            <div class="offcanvas-body mx-0 flex-grow-0">
                                                <form class="add-new-user pt-0 fv-plugins-bootstrap5 fv-plugins-framework" id="addNewUserForm" onSubmit={handleSubmit} novalidate="novalidate">
                                                    <div class="card-body row">

                                                        <div class="col-lg-3 p-t-20">

                                                            <label class="form-label" for="add-user-fullname">Frist Name</label>
                                                            <input type="text" class="form-control" id="add-user-fullname" placeholder="John Doe" name='Name'
                                                                onChange={handleChange}
                                                                value={Name} aria-label="John Doe" />
                                                                 {errors.Name && <span style={{ color: 'red' }}>{errors.Name}</span>}
                                                            <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div></div>
                                                        <div class="col-lg-3 p-t-20">
                                                            <label class="form-label" for="add-user-fullname">Last Name</label>
                                                            <input type="text" class="form-control" id="add-user-fullname" placeholder="John Doe" name='LastName'
                                                                onChange={handleChange}
                                                                value={LastName} aria-label="John Doe" />
                                                                 {errors.LastName && <span style={{ color: 'red' }}>{errors.LastName}</span>}
                                                            <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div></div>
                                                            <div class="col-lg-3 p-t-20">
                                                            <label class="form-label" for="add-user-email">Email</label>
                                                            <input type="text" id="add-user-email" class="form-control" placeholder="john.doe@example.com" name='Email'
                                                                onChange={handleChange}
                                                                value={Email} />
                                                              {errors.Email && <span style={{ color: 'red' }}>{errors.Email}</span>}
                                                            <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div></div>
                                                            <div class="col-lg-3 p-t-20">
                                                            <label class="form-label" for="add-user-contact">Contact</label>
                                                            <input type="number" id="add-user-contact" class="form-control phone-mask" placeholder="+91 (609) 988-44-11" name="PhoneNumber"
                                                                onChange={handleChange}
                                                                value={PhoneNumber} />
                                                                 {errors.PhoneNumber && <span style={{ color: 'red' }}>{errors.PhoneNumber}</span>}
                                                        </div>
                                                        <div class="col-lg-3 p-t-20">
                                                            <label class="form-label" for="add-user">User Name</label>
                                                            <input type="text" id="add-user" class="form-control" placeholder="User@123" name="Username"
                                                                onChange={handleChange}
                                                                value={Username} />
                                                                 {errors.Username && <span style={{ color: 'red' }}>{errors.Username}</span>}
                                                        </div>
                                                        <div class="col-lg-3 p-t-20 paswrd">

                                                            <label class="form-label" for="basic-icon-default-password">Password</label>
                                                            <input  type={show ? "text" : "password"} 
                                                                onChange={handleChange}
                                                                name='Password'
                                                                value={Password}
                                                                class="form-control password-mask"
                                                                id="basic-default-password12"
                                                                placeholder="Abc@123"
                                                            />
                                                               <i className={`far ${show ? 'fa-eye' : 'fa-eye-slash'}`} onClick={handleshow}></i>
                                                             {errors.Password && <span style={{ color: 'red' }}>{errors.Password}</span>}

                                                        </div>
                                                        <div class="col-lg-3 p-t-20">

                                                            <label class="form-label" for="basic-icon-default-password">DOB</label>
                                                            <input type="date"
                                                                onChange={handleChange}
                                                                name='DOB'
                                                                value={DOB}
                                                                class="form-control DOB-mask"
                                                                id="basic-default-DOB"
                                                                placeholder="DOB"
                                                                aria-describedby="basic-default-DOB" />
                                                                 {errors.DOB && <span style={{ color: 'red' }}>{errors.DOB}</span>}

                                                        </div>
                                                        <div class="col-lg-3 p-t-20">
                                                            <label for="exampleFormControlSelect2" class="form-label">Teacher Type</label>
                                                            <select id="exampleFormControlSelect2" class="select2 form-select" name="TeacherType" value={TeacherType} onChange={handleChange}>
                                                                <option value="">Select</option>
                                                                <option value="Online">Online</option>
                                                                <option value="Offline">Offline</option>
                                                            </select>
                                                            {errors.TeacherType && <span style={{ color: 'red' }}>{errors.TeacherType}</span>}
                                                        </div>

                                                        <div class="col-lg-3 p-t-20">
                                                        <label htmlFor="exampleFormControlSelect2" className="form-label">Class / Course</label>
                                                        <Select
                                                            isMulti
                                                            value={options.filter(option => CousesId.includes(option.value))}
                                                            name="CousesId"
                                                            onChange={handleNewChange}
                                                            options={options}
                                                            components={animatedComponents}
                                                            inputId="exampleFormControlSelect2"
                                                        />
                                                         {/* {errors.BatchId && <div className='errors'>{errors.BatchId}</div>} */}

                                                    </div>
                                                        <div class="col-lg-3 p-t-20">
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
                                                            {errors.CountryId && <span style={{ color: 'red' }}>{errors.CountryId}</span>}
                                                        </div>
                                                        <div class="col-lg-3 p-t-20">
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
                                                            {errors.StateId && <span style={{ color: 'red' }}>{errors.StateId}</span>}
                                                        </div>

                                                        <div class="col-lg-3 p-t-20">
                                                            <label htmlFor="exampleFormControlSelect2" className="form-label">District</label>
                                                            <select
                                                                id="exampleFormControlSelect2"
                                                                className="select2 form-select"
                                                                name="DistrictId"
                                                                value={DistrictId}
                                                                onChange={handleChange}
                                                            >
                                                                <option value="">Select</option>
                                                                {selectedState && selectedState.Cities.map(city => (
                                                                    <option key={city.id} value={city.id}>{city.name}</option>
                                                                ))}
                                                            </select>
                                                            {errors.DistrictId && <span style={{ color: 'red' }}>{errors.DistrictId}</span>}
                                                        </div>

                                                        <div class="col-lg-4 p-t-10">
                                                            <label class="form-label" for="add-user-email">Address</label>
                                                            <input type="text" id="add-user-email" class="form-control" placeholder="Address" name='Address'
                                                                onChange={handleChange}
                                                                value={Address} />
                                                                 {errors.Address && <span style={{ color: 'red' }}>{errors.Address}</span>}
                                                            <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                        </div>
                                                        <div class="col-lg-4 p-t-10">
                                                            <label class="form-label" for="add-user-email">City</label>
                                                            <input type="text" id="add-user-email" class="form-control" placeholder="Address" name='City'
                                                                onChange={handleChange}
                                                                value={City} />
                                                                 {errors.City && <span style={{ color: 'red' }}>{errors.City}</span>}
                                                            <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                        </div>
                                                        <div class="col-lg-4 p-t-10">
                                                            <label class="form-label">Upload Image</label>
                                                            <input
                                                                type="file"
                                                                class="form-control"
                                                                id="inputGroupFile04"
                                                                aria-describedby="inputGroupFileAddon04"
                                                                aria-label="Upload"
                                                                onChange={handleFileChange}
                                                            />
                                                            {/*    {errors.file && <div className='errors'>{errors.file}</div>} */}

                                                        </div>
                                                        <div class="mb-3">
                                                            <label class="form-label" for="basic-icon-default-message">Your Introducation & Skills</label>
                                                            <div class="input-group input-group-merge">
                                                                <textarea
                                                                    id="basic-icon-default-message"
                                                                    class="form-control"
                                                                    placeholder="Hi, Do you have a moment to talk Joe?"
                                                                    aria-label="Hi, Do you have a moment to talk Joe?"
                                                                    aria-describedby="basic-icon-default-message2"
                                                                    name="YourIntroducationAndSkills" value={YourIntroducationAndSkills} onChange={handleChange}/>
                                                                     {errors.YourIntroducationAndSkills && <span style={{ color: 'red' }}>{errors.YourIntroducationAndSkills}</span>}
                                                            </div>
                                                        </div>
                                                        <div class="mb-3 d-flex">
                                                            <button type="submit" class="btn btn-primary me-sm-3 me-1 data-submit">Submit</button>
                                                            <button type="reset" class="btn btn-label-secondary" data-bs-dismiss="offcanvas">Cancel</button>
                                                            <input type="hidden" />
                                                        </div>




                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>

                                </div>


                            </div>
                            {/*                <!-- / Content --> */}




                            {/*  <!-- Footer --> */}

                            <Footer />

                            {/*      <!-- / Footer --> */}

                        </div>
                    </div >
                    {/*     <!-- Overlay --> */}
                    < div class="layout-overlay layout-menu-toggle" ></div >
                </div >
                {/* / Layout wrapper  */}

            </div >
            <ToastContainer />
        </>
    )
}

export default ListUse