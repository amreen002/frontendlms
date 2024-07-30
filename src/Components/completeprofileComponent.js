import React, { useState, useEffect } from 'react';
import Navbarmenu from './Navbarmenu';
import FooterFrontend from './FooterFrontend';
import axios from 'axios';
import Select, { StylesConfig } from 'react-select'
import makeAnimated from 'react-select/animated'; 
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
const animatedComponents = makeAnimated();
const { REACT_APP_API_ENDPOINT } = process.env;

const CompleteProfile = () => {

  const [roleData, setSaleTeamData] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState('');
  const [courses, setCourses] = useState([])
  const [batches, setBatches] = useState([])
  const { usersId } = useParams();
  const [userData, setUserData] = useState({});
  const [countryTable, setCountryTable] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    userName: '',
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
    CoursesId:'',
    CousesId:[]
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
  const handleCourseChange = async (e) => {
    const selectedCoursesId = parseInt(e.target.value);
    const selectedCourse = courses.find(course => course.id === selectedCoursesId);
    setFormData({
      ...formData,
      CoursesId: selectedCoursesId,
      BatchId: '' // Reset topic selection
    });

    setSelectedCourses(selectedCourse);
    if (selectedCourse) {
      fetchData2(selectedCoursesId);

    }

  };
    // Handle change event
    const handleNewChange = (selectedOptions) => {
      const selectedIds = selectedOptions ? selectedOptions.map(option => option.value) : [];
      setFormData({
        ...formData,
        CousesId: selectedIds,
      });
    
  };
  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
};
  const fetchData1 = async () => {
    try {
      const response = await axios.get(`${REACT_APP_API_ENDPOINT}/country`);
      const userData = response.data.country;
      setCountryTable(userData)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchData2 = async () => {
    try {

      const response = await axios.get(`${REACT_APP_API_ENDPOINT}/courses`);
      const userDatas = response.data.courses;
      const courses = response.data.courses.map(course => ({
        value: course.id,
        label: course.name
    }));
    setOptions(courses);
      setCourses(userDatas)


    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchData3 = async () => {
    try {
      const response = await axios.get(`${REACT_APP_API_ENDPOINT}/batches`);
      const userData = response.data.batchs;
      setBatches(userData)

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const setTeacherFormData = (userData) => ({
    name: userData?.name || '',
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
    CousesId: userData?.Teachers[0]?.CousesId || '',
    TeacherType: userData?.Teachers[0]?.TeacherType || '',

  });
  const setUserFormData = (userData) => ({
    name: userData?.name || '',
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




  const handleChange = (e) => {
    const { name,value } = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }));
  };


  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    if (selectedFiles) {
      data.append('file', selectedFiles[0]);
    }
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    try {
     const response = await axios.patch(`${REACT_APP_API_ENDPOINT}/signup/${usersId}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data for file upload
        },
      });
      const userdata = response.data
      fetchData(usersId); // Refresh user data after update
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
       window.location.href = '/login'
    } catch (error) {
      console.error('Error updating user:', error);
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
  }
  const [showProfile, setShowProfile] = useState(false);

  const handleProfile = (profiles) => {
    setShowProfile(showProfile === profiles ? '' : profiles);
  };

  return (
    <div>
      <Navbarmenu />
      <section className='py-5'>
        <div className='container'>
          <div className='row'>
            <div className='col-12 col-xl-12 col-lg-12 col-md-12'>

              <form className="form-control llbl" onSubmit={handleUpdate}>


                <div className='cus_head'>
                  <h2>Complete Your Profile</h2>
                </div>
                <div className='row p-4'>
                  <div className='col-12 col-md-6 col-xl-6 col-lg-6 p-4 fieldes' >
                    <label className='field_name'>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className='form-control'
                    />
                  </div>
                  <div className='col-12 col-md-6 col-xl-6 col-lg-6 p-4 fieldes'>
                    <label className='field_name'>User Name</label>
                    <input
                      type="text"
                      name="userName"
                      value={formData.userName}
                      onChange={handleChange}
                      className='form-control'
                    />
                  </div>
                  <div className=' col-12 col-md-6 col-xl-6 col-lg-6 p-4 fieldes'>
                    <label className='field_name'>Email</label>
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className='form-control'
                    />
                  </div>
                  <div className='col-12 col-md-6 col-xl-6 col-lg-6 p-4 fieldes'>
                    <label className='field_name'>Contact</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className='form-control'
                    />
                  </div>
                  <div className='col-12 col-md-6 col-xl-6 col-lg-6 p-4 fieldes' >
                    <label className='field_name'>Instructor/Student/(Guest/Viewer)</label>
                    <select id="departmentId" name="departmentId" disabled="false" className="form-select" value={formData.departmentId} onChange={handleChange}>
                      <option value="">--Select--</option>
                      <option value="3">Instructor</option>
                      <option value="4">Student</option>
                      <option value="5">Guest/Viewer</option>
                    </select>

                  </div>
                  <div className='col-12 col-md-6 col-xl-6 col-lg-6 p-4 fieldes'>
                    <label htmlFor="exampleFormControlSelect2" className="form-label field_name" > Country</label>
                    <select name="CountryId" className="select2 form-select" value={formData.CountryId} onChange={handleCountryChange}>
                      <option value="">Select Country</option>
                      {countryTable.map((country) => (
                        <option key={country.id} value={country.id}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className='col-12 col-md-6 col-xl-6 col-lg-6 p-4 fieldes'>
                    <label htmlFor="exampleFormControlSelect2" className="form-label field_name"> State</label>
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
                  <div className='col-12 col-md-6 col-xl-6 col-lg-6 p-4 fieldes'>
                    <label htmlFor="exampleFormControlSelect2" className="form-label field_name"> District</label>
                    <select name="DistrictId" className="select2 form-select" value={formData.DistrictId} onChange={handleChange} disabled={!selectedState}>
                      <option value="">Select District</option>
                      {selectedState && selectedState.Cities.map(city => (
                        <option key={city.id} value={city.id}>{city.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className='col-12 col-md-6 col-xl-6 col-lg-6 p-4 fieldes'>
                    <label htmlFor="exampleFormControlSelect2" className="form-label field_name"> Address Type</label>
                    <select className="select2 form-select" name="AddressType" value={formData.AddressType} onChange={handleChange}>
                      <option value="">---Select---</option>
                      <option value="Current Address">Current Address</option>
                      <option value="Permanent Address">Permanent Address</option>
                    </select>
                  </div>

                  <div className='col-12 col-md-6 col-xl-6 col-lg-6 p-4 fieldes'>
                    <label class="form-label field_name" for="add-user-email"> City</label>
                    <input type="text" name="City" className='form-control' value={formData.City} onChange={handleChange} placeholder="City" />
                    <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                  </div>

                  <div className='col-12 col-md-6 col-xl-6 col-lg-6 p-4 fieldes'>
                    <label class="form-label field_name" for="add-user-email"> Address</label>
                    <input type="text" className='form-control' name="Address" value={formData.Address} onChange={handleChange} placeholder="Address" />
                    <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                  </div>

                  {userData.departmentId === 4 && (
                    <>
                      <div class="col-12 col-12 col-md-6 col-xl-6 col-lg-6 p-4 fieldes">
                        <label class="form-label field_name" for="add-user-contact">Student Date</label>
                        <input type="date" id="add-user-contact" class="form-control phone-mask" placeholder="Date" name="Date"
                          onChange={handleChange}
                          value={formData.Date} />
                      </div>
                      <div class="col-12 col-12 col-md-6 col-xl-6 col-lg-6 p-4 fieldes">
                        <label for="exampleFormControlSelect2" class="form-label field_name">Student Class</label>
                        <select id="exampleFormControlSelect2" class="select2 form-select" name="CoursesId" value={formData.CoursesId} onChange={handleCourseChange}>
                          <option value="">Select</option>
                          {courses.map((option) => (
                            <option key={option.id} value={option.id}>{option.name}</option>
                          ))}
                        </select>
                      </div>
                      <div class="col-12 col-12 col-md-6 col-xl-6 col-lg-6 p-4 fieldes">
                        <label for="exampleFormControlSelect2" class="form-label field_name">Student Batch</label>
                        <select id="exampleFormControlSelect2" class="select2 form-select" name="BatchId" value={formData.BatchId} onChange={handleChange}>
                          <option value="">Select</option>
                          {selectedCourses && selectedCourses.Batches.map(batch => (
                            <option key={batch.id} value={batch.id}>{batch.Title}</option>
                          ))}
                        </select>
                      </div>
                    </>

                  )}
                  {userData.departmentId === 3 && (<>
                    <div className="col-12 col-md-6 col-xl-6 col-lg-6 p-4 fieldes">
                      <label htmlFor="exampleFormControlSelect2" className="form-label field_name">Class</label>
                      <Select
                        isMulti
                        value={options.filter(option => formData.CousesId.includes(option.value))}
                        name="CousesId"
                        onChange={handleNewChange}
                        options={options}
                        components={animatedComponents}
                        inputId="exampleFormControlSelect2"
                      />
                    </div>
                    <div class="col-12 col-12 col-md-6 col-xl-6 col-lg-6 p-4 fieldes">
                      <label class="form-label field_name" for="add-user-email">DOB</label>
                      <input type="date" className='form-control ' name="DOB" value={formData.DOB} onChange={handleChange} placeholder="DOB" />
                      <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                    </div>
                    <div class="col-12 col-12 col-md-6 col-xl-6 col-lg-6 p-4 fieldes">
                      <label for="exampleFormControlSelect2" class="form-label field_name">Type</label>
                      <select id="exampleFormControlSelect2" class="select2 form-select" name="TeacherType" value={formData.TeacherType} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                      </select>
                    </div>
                    <div class="col-12 p-4">
                      <label class="form-label field_name" for="basic-icon-default-message">Introducation & Skills</label>
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


                  <div className='p-4 col-md-6 col-xl-6 col-lg-6 fieldes'>
                    <label className='field_name'>Profile</label>
                    <input
                      type="file"
                      class="form-control "
                      id="inputGroupFile04"
                      aria-describedby="inputGroupFileAddon04"
                      aria-label="Upload"
                      accept="image/png, image/jpeg"
                      onChange={handleFileChange}


                    />
                  </div>
                  {userData.departmentId === 5 && (
                    <div>
                      {userData.studentId ? (
                        <div className='row mt-4'>
                          <div className="col-12 col-md-6 col-xl-6 col-lg-6 p-4 fieldes">
                            <label className="form-label field_name" htmlFor="add-user-contact">Student Date</label>
                            <input type="date" id="add-user-contact" className="form-control phone-mask" placeholder="Date" name="Date" onChange={handleChange} value={formData.Date} />
                          </div>
                          <div className="col-12 col-md-6 col-xl-6 col-lg-6 p-4 fieldes">
                            <label htmlFor="exampleFormControlSelect2" className="form-label field_name">Student Class</label>
                            <select id="exampleFormControlSelect2" className="select2 form-select" name="CoursesId" value={formData.CoursesId} onChange={handleCourseChange}>
                              <option value="">Select</option>
                              {courses.map((option) => (
                                <option key={option.id} value={option.id}>{option.name}</option>
                              ))}
                            </select>
                          </div>
                          <div className="col-12 col-md-6 col-xl-6 col-lg-6 p-4 fieldes">
                            <label htmlFor="exampleFormControlSelect2" className="form-label field_name">Student Batch</label>
                            <select id="exampleFormControlSelect2" className="select2 form-select" name="BatchId" value={formData.BatchId} onChange={handleChange}>
                              <option value="">Select</option>
                              {selectedCourses && selectedCourses.Batches.map(batch => (
                                <option key={batch.id} value={batch.id}>{batch.Title}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      ) : userData.teacherId ? (
                        <div className='row mt-4'>
                            <div className="col-12 col-md-6 col-xl-6 col-lg-6 p-4 fieldes">
                            <label htmlFor="exampleFormControlSelect2" className="form-label field_name"> Class</label>
          
                              <Select
                                isMulti
                                value={options.filter(option => formData.CousesId.includes(option.value))}
                                name="CousesId"
                                onChange={handleNewChange}
                                options={options}
                                components={animatedComponents}
                                inputId="exampleFormControlSelect2"
                              />
                          </div>
                          <div className="col-12 col-md-6 col-xl-6 col-lg-6 p-4 fieldes">
                            <label className="form-label field_name" htmlFor="add-user-email">DOB</label>
                            <input type="date" className='form-control' name="DOB" value={formData.DOB} onChange={handleChange} placeholder="DOB" />
                            <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                          </div>
                          <div className="col-12 col-md-6 col-xl-6 col-lg-6 p-4 fieldes">
                            <label htmlFor="exampleFormControlSelect2" className="form-label field_name">Type</label>
                            <select id="exampleFormControlSelect2" className="select2 form-select" name="TeacherType" value={formData.TeacherType} onChange={handleChange}>
                              <option value="">Select</option>
                              <option value="Online">Online</option>
                              <option value="Offline">Offline</option>
                            </select>
                          </div>
                          <div className="col-12 p-4 fieldes">
                            <label className="form-label field_name" htmlFor="basic-icon-default-message">Introducation & Skills</label>
                            <textarea
                              id="basic-icon-default-message"
                              className="form-control"
                              rows="8"
                              placeholder="Hi, Your Introducation And Skills?"
                              aria-label="Hi, Your Introducation And Skills?"
                              aria-describedby="basic-icon-default-message2"
                              name="YourIntroducationAndSkills"
                              value={formData.YourIntroducationAndSkills}
                              onChange={handleChange}
                            ></textarea>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
                <button type="submit" className=' btn btn-primary col-2 mt--20'>Complete Profile</button>
              </form>
            </div>
          </div>
          <ToastContainer />

        </div>
      </section>


      <FooterFrontend />
    </div>
  );
};

export default CompleteProfile;