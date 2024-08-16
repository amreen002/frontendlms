import React, { useState } from 'react';
import { FaLock, FaEnvelope, FaWhatsapp, FaGoogle, FaLinkedin, FaBriefcase, FaCircle } from 'react-icons/fa'; // Import necessary icons

import Footer from './footerComponent';
import Navbar from './navComponemt';
import DashBoardMenus from './dashboardsMenuComponent';

const EnquiryUpdate = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      address: '',
    });
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleNextStep = (e) => {
      e.preventDefault();
      setCurrentStep((prev) => prev + 1);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
      // Add your form submission logic here
    };
  
    const steps = [
      { step: 1, label: "User Information" },
      { step: 2, label: "Account Setup" },
      { step: 3, label: "Address Information" },
      { step: 4, label: "Confirmation" }
    ];
  return (
    <div>
    {/*     <!-- Layout wrapper --> */}
    <div class="layout-wrapper layout-content-navbar">
        <div class="layout-container">
            {/*      <!-- Menu --> */}
            <DashBoardMenus />
            {/*         <!-- / Menu --> */}

            {/*     <!-- Layout container --> */}
            <div class="layout-page">
                {/*         <!-- Navbar --> */}
                <Navbar />
                {/*              <!-- / Navbar -->

                <!-- Content wrapper --> */}
                <div class="content-wrapper">

                    {/*           <!-- Content --> */}

                    <div class="container-xxl flex-grow-1 container-p-y">
                        <div class="row">
                          <div className='col-12 col-lg-12 '>
                            <div className='leaddetails'>
                                <h2>Enquiry Details</h2>
                            </div>
                          </div>
                            <div class="col-lg-8 mb-4 order-0">
                                <div class="card user_box">
                                    <div class="d-flex align-items-end row">
                                        <div class="col-sm-7">
                                            <div class="card-body">
                                                <h5 class="card-title text-primary cus_icon"><span>J</span>Jhon Doe</h5>
                                                <div className='d-flex'>
                                                  <div className='infotext'>Email:</div>
                                                  <div className='infodetails'> info@technogaze.com</div>
                                                  
                                                </div>
                                                <div className='d-flex'>
                                                <div className='infotext'>Mobile:</div>
                                                <div className='infodetails'>
                                                <a href={`https://web.whatsapp.com/send?phone=+919893688878&text=Hello`} target="_blank" rel="noopener noreferrer">
                                                                       
                                                                        <span>+91-9893089765</span> <FaWhatsapp className="infowht" color="#25D366" />
                                                                    </a>
                                                   
                                                   </div>
                                                </div>
                                                <div className='d-flex'>
                                                <div className='infotext'>Added On:</div>
                                                <div className='infodetails'> 10<sup>th</sup> Aug 2024 <span className='hours'>12 hours ago</span></div>
                                                </div>
                                                <div className='d-flex'>
                                                <div className='infotext'>Last Active:</div>
                                                <div className='infodetails'> 10<sup>th</sup> Aug 2024 <span className='hours'>12 hours ago</span></div>
                                                </div>

                                                
                                            </div>
                                        </div>
                                        <div class="col-sm-5 text-center text-sm-left">
                                            <div class="card-body pb-0 px-0 px-md-4">
                                                <img
                                                    src="../assets/img/illustrations/man-with-laptop-light.png"
                                                    height="140"
                                                    alt="View Badge User"
                                                    data-app-dark-img="illustrations/man-with-laptop-dark.png"
                                                    data-app-light-img="illustrations/man-with-laptop-light.png"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-4 order-1">
                                <div class="row">
                                    <div class="col-lg-6 col-md-12 col-6 mb-4">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="card-title d-flex align-items-start justify-content-between">
                                                    <div class="avatar flex-shrink-0">
                                                        <img
                                                            src="../assets/img/icons/unicons/chart-success.png"
                                                            alt="chart success"
                                                            class="rounded"
                                                        />
                                                    </div>
                                                    <div class="dropdown">
                                                        <button
                                                            class="btn p-0"
                                                            type="button"
                                                            id="cardOpt3"
                                                            data-bs-toggle="dropdown"
                                                            aria-haspopup="true"
                                                            aria-expanded="false"
                                                        >
                                                            <i class="bx bx-dots-vertical-rounded"></i>
                                                        </button>
                                                        <div class="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt3">
                                                            <a class="dropdown-item" href="javascript:void(0);">View More</a>
                                                            <a class="dropdown-item" href="javascript:void(0);">Delete</a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <span class="fw-semibold d-block mb-1">Profit</span>
                                                <h3 class="card-title mb-2">INR-12,628</h3>
                                                <small class="text-success fw-semibold"><i class="bx bx-up-arrow-alt"></i> +72.80%</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-12 col-6 mb-4">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="card-title d-flex align-items-start justify-content-between">
                                                    <div class="avatar flex-shrink-0">
                                                        <img
                                                            src="../assets/img/icons/unicons/wallet-info.png"
                                                            alt="Credit Card"
                                                            class="rounded"
                                                        />
                                                    </div>
                                                    <div class="dropdown">
                                                        <button
                                                            class="btn p-0"
                                                            type="button"
                                                            id="cardOpt6"
                                                            data-bs-toggle="dropdown"
                                                            aria-haspopup="true"
                                                            aria-expanded="false"
                                                        >
                                                            <i class="bx bx-dots-vertical-rounded"></i>
                                                        </button>
                                                        <div class="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt6">
                                                            <a class="dropdown-item" href="javascript:void(0);">View More</a>
                                                            <a class="dropdown-item" href="javascript:void(0);">Delete</a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <span>Sales</span>
                                                <h3 class="card-title text-nowrap mb-1">INR-4,679</h3>
                                                <small class="text-success fw-semibold"><i class="bx bx-up-arrow-alt"></i> +28.42%</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                       
                       
                        </div>
                        <div className='row'>
                            <div className='col-lg-12'>
                            <div className="step-indicator">
    {steps.map((item) => (
      <div
        key={item.step}
        className={`step ${currentStep >= item.step ? 'active' : ''}`}
      >
             <div className="step-label">{item.label}</div>
             <div className="step-number">{item.step}</div>
        {/* {item.step !== steps.length && <div className="step-arrow">→</div>} */}
      </div>
    ))}
  </div>

                            </div>
  <div className='col-lg-12'>
    <div className='cus_row'>
        <div className='d-flex'>
            <div className='details_one'><i class="bx bx-user fs-4 lh-0"></i>Enquiry Update</div>
            {/* <div className='details_two'><a href="">Enquiry Update Details<i class="bx bx-pen fs-4 lh-0"></i></a></div>
            <div className='details_three'><a href=''>Additional Details<i class="bx bx-pen fs-4 lh-0"></i></a></div> */}
        </div>
    </div>
  <div className="d-flex align-items-start">
  <div className="sidebar nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
    <a className="nav-linkk active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true"><i class="bx bx-user fs-4 lh-0"></i>Enquiry Details</a>
    <a className="nav-linkk" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false"><i class="bx bx-time fs-4 lh-0"></i>Time Line</a>
    <a className="nav-linkk" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false"><i class="bx bx-pencil fs-4 lh-0"></i>Follow up & Notes</a>
    <a className="nav-linkk" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false"><i class="bx bx-mail-send fs-4 lh-0"></i>Communications Logs</a>
    <a className="nav-linkk" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-document" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false"><i class="bx bx-lock fs-4 lh-0"></i>Document Locker</a>
    <a className="nav-linkk" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-tickets" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false"><i class="bx bx-badge-check fs-4 lh-0"></i>Tickets</a>
    <a className="nav-linkk" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-callogs" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false"><i class="bx bx-phone-incoming fs-4 lh-0"></i>Call Logs</a>
  </div>
  <div className="tab-content" id="v-pills-tabContent">
    <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
        <div className='form_enquiry'>
        <div className="form-container">
     
     {currentStep === 1 && (
       <form onSubmit={handleNextStep}>
        <div className='form_method'>
        <h2>User Information</h2>
         <label>
           Name:</label>
           <input
             type="text"
             name="name"
              class="form-control"
             value={formData.name}
             onChange={handleChange}
             required
             placeholder='Enter Name'
           />
         
         <label>
           Email:</label>
           <input
             type="email"
             name="email"
             class="form-control"
             value={formData.email}
             onChange={handleChange}
             required
             placeholder='Enter Name'
           />
         </div>
         <button type="submit" class="btn btn-primary">Next</button>
        
        
       </form>
     )}

     {currentStep === 2 && (
       <form onSubmit={handleNextStep}>
         <h2>Account Setup</h2>
         <label>
           Password:</label>
           <input
             type="password"
             name="password"
              class="form-control"
             value={formData.password}
             onChange={handleChange}
             required
             placeholder='Enter Name'
           />
         
         <button type="submit" class="btn btn-primary">Next</button>
       </form>
     )}

     {currentStep === 3 && (
       <form onSubmit={handleNextStep}>
         <h2> Address Information</h2>
         <label>
           Address:</label>
           <input
             type="text"
             name="address"
              class="form-control"
             value={formData.address}
             onChange={handleChange}
             required
           />
         
         <button type="submit" class="btn btn-primary">Next</button>
       </form>
     )}

     {currentStep === 4 && (
       <form onSubmit={handleSubmit}>
         <h2> Confirmation</h2>
         <p>Please confirm your details and submit the form.</p>
         <button type="submit" class="btn btn-primary">Submit</button>
       </form>
     )}
   </div>
             
        </div>
    </div>
    <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">Time Line</div>
    <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">Follow Up & Notes</div>
    <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">Communications Logs</div>
    <div className="tab-pane fade" id="v-pills-document" role="tabpanel" aria-labelledby="v-pills-settings-tab">Document Locker</div>
    <div className="tab-pane fade" id="v-pills-tickets" role="tabpanel" aria-labelledby="v-pills-settings-tab">ticket</div>
    <div className="tab-pane fade" id="v-pills-callogs" role="tabpanel" aria-labelledby="v-pills-settings-tab">call logs</div>
  </div>
</div>
  </div>
</div>
                    </div>



                    {/*         <!-- / Content -->

                    <!-- Footer --> */}
                    <Footer />
                    {/* <!-- / Footer --> */}

                    <div class="content-backdrop fade"></div>
                </div>
                {/*     <!-- Content wrapper --> */}
            </div>
            {/*   <!-- / Layout page --> */}
        </div>

        {/*     <!-- Overlay --> */}
        <div class="layout-overlay layout-menu-toggle"></div>
    </div>
    {/* / Layout wrapper  */}

</div >
  );
};

export default EnquiryUpdate;