import React, { useState, useEffect } from "react";
import axios from 'axios';
import FooterFrontend from '../Components/FooterFrontend';
import { useNavigate } from 'react-router-dom';
import Navbarmenu from '../Components/Navbarmenu';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
const { REACT_APP_API_ENDPOINT } = process.env;
const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        userName: '',
        email: '',
        password: '',
        roleName: '',
        phoneNumber: 0,
        departmentId: '',
        studentId: 0,
        teacherId: 0,
        roleSelection: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'roleSelection') {
            if (value === '3') {
                setFormData((prevData) => ({
                    ...prevData,
                    roleSelection: value,
                    teacherId: 3,
                    studentId: 0
                }));
            } else if (value === '4') {
                setFormData((prevData) => ({
                    ...prevData,
                    roleSelection: value,
                    studentId: 4,
                    teacherId: 0
                }));
            } else {
                setFormData((prevData) => ({
                    ...prevData,
                    roleSelection: value,
                    studentId: 0,
                    teacherId: 0
                }));
            }
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            let response = await axios.post(`${REACT_APP_API_ENDPOINT}/signup`, formData, {
            });
            const userdata = response.data
            window.location.href = `/complete-profile/${response.data.users.id}`;
            toast.success(userdata.message, {
                position: "top-right",
                autoClose: true,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",

            });

        } catch (error) {
            toast.error(error.response?.data?.message, {
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

    const handleshow = () => {
        setShow(show ? false : true)
    }






    const [showProfile, setShowProfile] = useState(false);

    const handleProfile = (profiles) => {
        setShowProfile(showProfile === profiles ? '' : profiles);
    };

    return (
        <div>
            <section className='sticy-header logo-size'>
                <Navbarmenu />
            </section>


            <div className="login-registration-wrapper">
                <div className="container">
                    <div className="row g-0">
                        <div class="col-lg-6">
                            <div class="login-page-form-area">
                                <h4 class="title">Sign Up to Your Account👋</h4>
                                <form action="POST" onSubmit={handleSubmit}>
                                    <div class="single-input-wrapper">
                                        <label for="name">Your Name*</label>
                                        <input onChange={handleChange} value={formData.name} name="name" id="name" type="text" placeholder="Enter Your Name" required="" />
                                    </div>
                                    <div class="half-input-wrapper">
                                        <div class="single-input-wrapper">
                                            <label for="username">User Name</label>
                                            <input onChange={handleChange} value={formData.userName} name="userName" id="username" type="text" placeholder="Enter User Name" required="" />
                                        </div>
                                        <div class="single-input-wrapper">
                                            <label for="email">Email*</label>
                                            <input onChange={handleChange} value={formData.email} name="email" id="email" type="email" placeholder="Enter Your Email" required="" />
                                        </div>
                                    </div>
                                    <div class="half-input-wrapper">
                                        <div class="single-input-wrapper paswrd">
                                            <label for="password">Your Password</label>
                                            <input onChange={handleChange} value={formData.password} name="password" id="password" type={show ? "text" : "password"} placeholder="Password" required="" />
                                            <i className={`far ${show ? 'fa-eye' : 'fa-eye-slash'}`} onClick={handleshow}></i>
                                        </div>
                                        <div className="single-input-wrapper">
                                            <label htmlFor="departmentId">Instructor/Student</label>
                                            <select id="departmentId" name="departmentId" className="form-select" value={formData.departmentId} onChange={handleChange}>
                                                <option value="">---Select---</option>
                                                <option value="3">Instructor</option>
                                                <option value="4">Student</option>
                                                <option value="5">Guest/Viewer</option>
                                            </select>
                                        </div>



                                    </div>

                                    {formData.departmentId === "5" && (
                                        <div className="single-input-wrapper">
                                            <label htmlFor="roleSelection">Role</label>
                                            <select id="roleSelection" name="roleSelection" className="form-select" value={formData.studentId === 4 ? "4" : formData.teacherId === 3 ? "3" : ""} onChange={handleChange}>
                                                <option value="">---Select---</option>
                                                <option value="3">Instructor</option>
                                                <option value="4">Student</option>
                                            </select>
                                        </div>
                                    )}
                                    <div class="single-checkbox-filter">
                                        <div class="check-box">
                                            <input type="checkbox" id="type-1" />
                                            <label for="type-1">Accept the Terms and Privacy Policy</label><br />
                                        </div>
                                    </div>
                                    <button type="submit" class="rts-btn btn-primary">Signup</button>


                                </form>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="contact-thumbnail-login-p mt--100">
                                <img src="assets/fontend/images/banner/login-bg.png" width="600" height="495" alt="login-form" />
                            </div>
                        </div>
    </div>
                </div >
            </div >

    <FooterFrontend />
    <ToastContainer />
        </div >
    );
};

export default SignUp;