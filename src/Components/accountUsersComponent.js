import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import Footer from './footerComponent';
import Navbar from './navComponemt';
import DashBoardMenus from './dashboardsMenuComponent';
const { REACT_APP_API_ENDPOINT } = process.env;
function AccountP() {
    const [error, setError] = useState(null);
    const [roleData, setSaleTeamData] = useState([]);
    const [countryTable, setCountryTable] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        userName: '',
        lastname:'',
        email: '',
        password: '',
        roleName: '',
        phoneNumber: '',
        message: '',
        image: null,
        AddressType: "Current Address",
        Address:'',
        StateId:'',
        CountryId:'',
        DistrictId:'',
        City:'',
    });
    const [StateId, setStateId] = useState('')
    const [CountryId, setCountryId] = useState('')
    const [Address, setAddress] = useState('')
    const [City, setCity] = useState('')
    const [DistrictId, setDistrictId] = useState('')
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
    useEffect(() => {
        fetchData1()
        fetchData2()
    }, []);
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
    const handleChange = (e) => {
        const { name, files } = e.target;
        if (files) {
            setFormData({
                ...formData,
                [name]: files[0]  // Handle files differently
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        try {
            const token = localStorage.getItem('token');
            let response
            if (token) {
                response = await axios.post(`${REACT_APP_API_ENDPOINT}/users`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                    }
                });
                window.location.href = "/userlist";
                alert('Users SuccessFully Create');
            }
        } catch (error) {
            alert('Failed to send message.');
        }
    };

    return (
        /*      <!-- Layout wrapper --> */
        <div class="layout-wrapper layout-content-navbar">
            <div class="layout-container">
                {/*       <!-- Menu -->*/}
                <DashBoardMenus />
                {/*             <!-- / Menu -->
    
            <!-- Layout container --> */}
                <div class="layout-page">
                    {/*         <!-- Navbar --> */}
                    <Navbar />
                    {/*              <!-- / Navbar -->

                    {/*       <!-- Content wrapper --> */}

                    <div class="content-wrapper">
                        {/*    <!-- Content --> */}

                        <div class="container-xxl flex-grow-1 container-p-y">
                            <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Account Settings /</span> Account</h4>

                            <div class="row">
                                <div class="col-md-12">
                                    <ul class="nav nav-pills flex-column flex-md-row mb-3">
                                        <li class="nav-item">
                                            <a class="nav-link active" href="javascript:void(0);"><i class="bx bx-user me-1"></i> Account</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="pages-account-settings-notifications.html"
                                            ><i class="bx bx-bell me-1"></i> Notifications</a
                                            >
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="pages-account-settings-connections.html"
                                            ><i class="bx bx-link-alt me-1"></i> Connections</a
                                            >
                                        </li>
                                    </ul>
                                    <div class="card mb-4">
                                        <h5 class="card-header">Profile Details</h5>
                                        {/*   <!-- Account --> */}
                                        <div class="card-body">
                                            <div class="d-flex align-items-start align-items-sm-center gap-4">
                                                <img
                                                    src="../assets/img/avatars/1.png"
                                                    alt="user-avatar"
                                                    class="d-block rounded"
                                                    height="100"
                                                    width="100"
                                                    id="uploadedAvatar"
                                                />
                                                <div class="button-wrapper ">
                                                    <label for="upload" class="btn btn-primary me-2 mb-4" tabindex="0">
                                                        <span class="d-none d-sm-block">Upload new photo</span>
                                                        <i class="bx bx-upload d-block d-sm-none"></i>
                                                        <input
                                                            type="file"
                                                            id="upload"
                                                            class="account-file-input"
                                                            hidden
                                                            name="file"
                                                            accept="image/png, image/jpeg"
                                                            value={formData.image} onChange={handleChange}
                                                        />
                                                    </label>
                                                    <button type="button" class="btn btn-outline-secondary account-image-reset mb-4">
                                                        <i class="bx bx-reset d-block d-sm-none"></i>
                                                        <span class="d-none d-sm-block">Reset</span>
                                                    </button>

                                                    <p class="text-muted mb-0">Allowed JPG, GIF or PNG. Max size of 800K</p>
                                                </div>
                                            </div>
                                        </div>
                                        <hr class="my-0" />
                                        <div class="card-body">
                                            <form id="formAccountSettings" method="POST" onSubmit={handleSubmit}>
                                                <div class="row">
                                                    <div class="mb-3 col-md-6">
                                                        <label for="firstName" class="form-label">Frist Name</label>
                                                        <input
                                                            class="form-control"
                                                            type="text"
                                                            id="name"
                                                            name='name'
                                                            onChange={handleChange}
                                                            value={formData.name}
                                                            autofocus
                                                        />
                                                    </div>
                                                    <div class="mb-3 col-md-6">
                                                        <label for="firstName" class="form-label">Last Name</label>
                                                        <input
                                                            class="form-control"
                                                            type="text"
                                                            id="name"
                                                            name='lastname'
                                                            onChange={handleChange}
                                                            value={formData.lastname}
                                                            autofocus
                                                        />
                                                    </div>
                                                    <div class="mb-3 col-md-6">
                                                        <label for="lastName" class="form-label">User Name</label>
                                                        <input class="form-control" type="text" name='userName' id='user-name'
                                                            onChange={handleChange}
                                                            value={formData.userName} />
                                                    </div>
                                                    <div class="mb-3 col-md-6">
                                                        <label for="email" class="form-label">E-mail</label>
                                                        <input
                                                            class="form-control"
                                                            type="text"
                                                            id="email"
                                                            name="email"
                                                            onChange={handleChange}
                                                            value={formData.email}
                                                            placeholder="john.doe@example.com"
                                                        />
                                                    </div>
                                                    <div class="mb-3 col-md-6">
                                                        <label class="form-label" for="phoneNumber">Phone Number</label>
                                                        <div class="input-group input-group-merge">
                                                            <span class="input-group-text">(+91)</span>
                                                            <input
                                                                type="text"
                                                                id="phoneNumber"
                                                                name="phoneNumber"
                                                                onChange={handleChange}
                                                                value={formData.phoneNumber}
                                                                class="form-control"
                                                                placeholder="202 555 0111"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div class="mb-3 col-md-6">
                                                        <label class="form-label" for="basic-icon-default-password">Password</label>
                                                        <input
                                                            type="password"
                                                            onChange={handleChange}
                                                            name='password'
                                                            value={formData.password}
                                                            class="form-control password-mask"
                                                            id="basic-default-password12"
                                                            placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                                            aria-describedby="basic-default-password2"
                                                        />
                                                    </div>
                                                    <div class="mb-3 col-md-6">
                                                    <label class="form-label" for="modalEditUserStatus"></label>
                                                    <select
                                                        id="modalEditUserStatus"
                                                        className="form-select"
                                                        name="departmentId"
                                                        onChange={handleChange}
                                                        value={formData.departmentId}


                                                    >
                                                        {roleData.map((option) => (
                                                            <option key={option.id} value={option.id}>{option.Name}</option>
                                                        ))}
                                                    </select>

                                                </div>

                                                    <div class="mb-3">
                                                        <label htmlFor="exampleFormControlSelect2" className="form-label"> Address Type</label>
                                                        <select className="select2 form-select" name="AddressType" value={formData.AddressType} onChange={handleChange}>
                                                            <option value=" ">---Select---</option>
                                                            <option value="Current Address">Current Address</option>
                                                            <option value="Permanent Address">Permanent Address</option>
                                                        </select>
                                                    </div>
                                                    <div class="mb-3">
                                                        <label htmlFor="exampleFormControlSelect2" className="form-label"> Country</label>
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
                                                    <div class="mb-3">
                                                        <label htmlFor="exampleFormControlSelect2" className="form-label"> State</label>
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

                                                    <div class="col-12">
                                                        <label htmlFor="exampleFormControlSelect2" className="form-label"> District</label>
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

                                                    <div class="mb-3">
                                                        <label class="form-label" for="add-user-email"> City</label>
                                                        <input type="text" id="add-user-email" class="form-control" placeholder="City" name='City'
                                                            onChange={(e) => setCity(e.target.value)}
                                                            value={City} />
                                                        <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                    </div>

                                                    <div class="mb-3">
                                                        <label class="form-label" for="add-user-email"> Address</label>
                                                        <input type="text" id="add-user-email" class="form-control" placeholder="Address" name='Address'
                                                            onChange={(e) => setAddress(e.target.value)}
                                                            value={Address} />
                                                        <div class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                                                    </div>
                                                    <div class="mb-3">
                                                        <label class="form-label" for="basic-icon-default-message">Message</label>
                                                        <div class="input-group input-group-merge">
                                                            <span id="basic-icon-default-message2" class="input-group-text"
                                                            ><i class="bx bx-comment"></i
                                                            ></span>
                                                            <textarea
                                                                id="basic-icon-default-message"
                                                                class="form-control"
                                                                placeholder="Hi, Do you have a moment to talk Joe?"
                                                                aria-label="Hi, Do you have a moment to talk Joe?"
                                                                aria-describedby="basic-icon-default-message2"
                                                                name="message" value={formData.message} onChange={handleChange}></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="mt-2">
                                                    <button type="submit" class="btn btn-primary me-2">Save changes</button>
                                                    <button type="reset" class="btn btn-outline-secondary">Cancel</button>
                                                </div>
                                            </form>
                                        </div>
                                        {/*       <!-- /Account --> */}
                                    </div>
                                    <div class="card">
                                        <h5 class="card-header">Delete Account</h5>
                                        <div class="card-body">
                                            <div class="mb-3 col-12 mb-0">
                                                <div class="alert alert-warning">
                                                    <h6 class="alert-heading fw-bold mb-1">Are you sure you want to delete your account?</h6>
                                                    <p class="mb-0">Once you delete your account, there is no going back. Please be certain.</p>
                                                </div>
                                            </div>
                                            <form id="formAccountDeactivation" onsubmit="return false">
                                                <div class="form-check mb-3">
                                                    <input
                                                        class="form-check-input"
                                                        type="checkbox"
                                                        name="accountActivation"
                                                        id="accountActivation"
                                                    />
                                                    <label class="form-check-label" for="accountActivation"
                                                    >I confirm my account deactivation</label
                                                    >
                                                </div>
                                                <button type="submit" class="btn btn-danger deactivate-account">Deactivate Account</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*        <!-- / Content --> */}

                        {/*      <!-- Footer --> */}
                        <Footer />
                        {/*   <!-- / Footer --> */}

                        <div class="content-backdrop fade"></div>
                    </div>


                    {/*      <!-- Content wrapper --> */}
                </div>
                {/*           <!-- / Layout page --> */}
            </div >

            {/*   <!-- Overlay --> */}
            < div class="layout-overlay layout-menu-toggle" ></div >
        </div >

    )
}
export default AccountP;