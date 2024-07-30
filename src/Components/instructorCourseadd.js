import React from "react";
import Navbarmenu from "./Navbarmenu";
const InstructorCourseadd = () =>{
    return(
<div>
<section>
                <Navbarmenu />
            </section>

    <div className="rts-bread-crumbarea-1 rts-section-gap bg_image">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="breadcrumb-main-wrapper">
                        <h1 className="title">Create Course</h1>
                    
                        <div className="pagination-wrapper">
                            <a href="index-2.html">Home</a>
                            <i className="fa-regular fa-chevron-right"></i>
                            <a className="active" href="create-course.html">Create Course</a>
                        </div>
                     
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div className="crea-te-course-area-start ptb--100">
        <div className="container">
            <div className="row g-5">
                <div className="col-lg-8">
                    <div className="create-course-area-main-wrapper-inner">
                        <div className="accordion" id="accordionExample">
                          
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingOne">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        Course Info
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <div className="course-information-area">
                                            <form action="#" className="top-form-create-course">
                                                <div className="single-input">
                                                    <label for="name">Course Title</label>
                                                    <input id="name" type="text" placeholder="New Course" />
                                                </div>
                                                <div className="single-input">
                                                    <label for="slug">Course Slug</label>
                                                    <input id="slug" type="text" placeholder="New Course" />
                                                </div>
       
                                                <div className="single-input">
                                                    <label for="message-2">About Course</label>
                                                    <textarea id="message-2" placeholder="New Course" ></textarea>
                                                </div>
                                            </form>
                                            <div className="course-setting-title">
                                                <h5 className="title">Course Settings</h5>
                                                <div className="create-course-tab-area">
                                                    <ul className="nav nav-tabs" id="myTab-2" role="tablist">
                                                        <li className="nav-item" role="presentation">
                                                            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true"> <i className="fa-regular fa-gear"></i> General</button>
                                                        </li>
                                                        <li className="nav-item" role="presentation">
                                                            <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false"><i className="fa-regular fa-meter-droplet"></i> Content Drip</button>
                                                        </li>
                                                    </ul>
                                                    <div className="tab-content" id="myTabContent-2">
                                                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                                            <div className="generale-tab-main-wrapper">
                                                           
                                                                <div className="generale-tab-content">
                                                                    <div className="single-checkbox-filter">
                                                                        <div className="check-box">
                                                                            <input type="checkbox" id="type-1" />
                                                                            <label for="type-1">Enable</label><br />
                                                                        </div>
                                                                    </div>

                                                                    <div className="disable">
                                                                        <i className="fa-light fa-circle-check"></i>
                                                                        <span>Enable / Disable content drip</span>
                                                                    </div>
                                                                </div>
                                                                <div className="choosea-category-input">
                                                                    <label for="choose">Choose a category</label>
                                                                    <input id="choose" type="text" placeholder="Search Course Category ex Design, Development, Business" />
                                                                </div>
                                                                <div className="choosea-category-input">
                                                                    <label for="choose">Choose Price</label>
                                                                    <div className="check-box-wrapper">
                                                                        <div className="single-checkbox-filter">
                                                                            <div className="check-box">
                                                                                <input type="checkbox" id="type-3" />
                                                                                <label for="type-3">Free</label><br />
                                                                            </div>
                                                                        </div>
                                                                        <div className="single-checkbox-filter">
                                                                            <div className="check-box">
                                                                                <input type="checkbox" id="type-2" />
                                                                                <label for="type-2">Paid</label><br />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="regular-price-discount-price-area">
                                                                        <div className="input-group mb-3">
                                                                            <span className="input-group-text" id="basic-addon1">$</span>
                                                                            <input id="regular" type="number" className="form-control" placeholder="regular Price" aria-label="Username" aria-describedby="basic-addon1" />
                                                                        </div>
                                                                        <div className="input-group mb-3">
                                                                            <span className="input-group-text" id="basic-addon2">$</span>
                                                                            <input id="discount" type="number" className="form-control" placeholder="Discounted Price" aria-label="Username" aria-describedby="basic-addon1" />
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                         

                                                                <h6 className="title mt--20">Course Thumbnail</h6>
                                                                <div className="course-thumbnail-upload-area">
                                                                    <div className="thumbnail-area">
                                                                        <img src="assets/images/dashboard/05.png" alt="dashboard" />
                                                                    </div>
                                                                    <div className="information">
                                                                        <span>Size: 700 X 430 Pixels</span>
                                                                        <span>File Support:</span>
                                                                        <div className="input-file-type-btn">
                                                                            <input type="file" id="real-file" hidden />
                                                                            <button type="button" className="rts-btn btn-primary" id="custom-button">CHOOSE A FILE</button>
                                                                            <span id="custom-text">No file chosen, yet.</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                                            <div className="generale-tab-content">
                                                                <div className="single-checkbox-filter">
                                                                    <div className="check-box">
                                                                        <input type="checkbox" id="type-12" />
                                                                        <label for="type-12">Enable</label><br />
                                                                    </div>
                                                                </div>

                                                                <div className="disable">
                                                                    <i className="fa-light fa-circle-check"></i>
                                                                    <span>Enable / Disable content drip</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                        </div>
                        <div className="accordion" id="accordionExampls2">
                  
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingTwo">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                        Course Video
                                    </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionExampls2">
                                    <div className="accordion-body">
                                        <h6 className="title">Course Title</h6>
                                        <div className="course-info-video-link">
                                            <select className="nice-select" name="price">
                                                <option>Select Video Source</option>
                                                <option value="asc">External URL</option>
                                                <option value="desc">Youtube Video</option>
                                                <option value="pop">Vimeo Video</option>
                                            </select>
                                            <input type="text" placeholder="Please Enter your Video Link" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                      
                        </div>
                        <div className="accordion" id="accordionExampls3">
                        
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingThree">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                                        Course Builder
                                    </button>
                                </h2>
                                <div id="collapseThree" className="accordion-collapse collapse show" aria-labelledby="headingThree" data-bs-parent="#accordionExampls3">
                                    <div className="accordion-body">
                                        <button className="rts-btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Add new Topic <i className="fa-regular fa-circle-plus"></i></button>
                                    </div>
                                </div>
                            </div>
                      
                        </div>
                        <div className="accordion" id="accordionExampls5">
                         
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingFive">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="true" aria-controls="collapseFive">
                                        Course Attachments
                                    </button>
                                </h2>
                                <div id="collapseFive" className="accordion-collapse collapse show" aria-labelledby="headingFive" data-bs-parent="#accordionExampls5">
                                    <div className="accordion-body">
                                        <button className="rts-btn btn-border"><i className="fa-solid fa-paperclip"></i> Upload Attachments</button>
                                    </div>
                                </div>
                            </div>
                      
                        </div>
                        <div className="accordion" id="accordionExampls6">
                   
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingSix">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="true" aria-controls="collapseSix">
                                        Additional Data
                                    </button>
                                </h2>
                                <div id="collapseSix" className="accordion-collapse collapse show" aria-labelledby="headingSix" data-bs-parent="#accordionExampls6">
                                    <div className="accordion-body">
                                        <form action="#" className="additional-data-form">
                                    
                                            <div className="single-input-area">
                                                <label for="learn">What Will I Learn?</label>
                                                <textarea id="learn" placeholder="Write here the course benefits (One per line)"></textarea>
                                            </div>
                                       
                                            <div className="single-input-area mt--25">
                                                <label for="target">Targeted Audience</label>
                                                <textarea id="target" placeholder="Specify the target audience that will benefit the most from the course. (One line per target audience.)"></textarea>
                                            </div>
                                          
                                            <div className="course-duration-input-area">
                                                <div className="half-single-input">
                                                    <p>Total Course Duration</p>
                                                    <input id="hour" type="number" placeholder="00" />
                                                    <label for="hour">Hour</label>
                                                </div>
                                                <div className="half-single-input">
                                                    <input id="min" type="number" placeholder="00" />
                                                    <label for="min">Min</label>
                                                </div>
                                            </div>
                                            <div className="single-input-area mt--25">
                                                <label for="meterials">Materials Included</label>
                                                <textarea id="meterials" placeholder="A list of assets you will be providing for the students in this course (One Per line)"></textarea>
                                            </div>
                                            <div className="single-input-area mt--25">
                                                <label for="meterials-2">Requirements/Instructions</label>
                                                <textarea id="meterials-2" placeholder="Additional requirements of special instructions for the students (one per line) "></textarea>
                                            </div>
                                            <div className="single-input-area mt--25">
                                                <label for="tags">Course Tag</label>
                                                <textarea id="tags" placeholder="Search Course Tags ex. Design , Development, Business"></textarea>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                          
                        </div>
                        <div className="accordion" id="accordionExampls7">
                         
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingSeven">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="true" aria-controls="collapseSeven">
                                        Certificate Template
                                    </button>
                                </h2>
                                <div id="collapseSeven" className="accordion-collapse collapse show" aria-labelledby="headingSeven" data-bs-parent="#accordionExampls7">
                                    <div className="accordion-body">
                                        <ul className="nav nav-tabs certificate-template-tabs" id="myTab" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link active" id="home-tabs" data-bs-toggle="tab" data-bs-target="#homes" type="button" role="tab" aria-controls="homes" aria-selected="true"><i className="fa-sharp fa-light fa-pager"></i> Landscape</button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link" id="profile-tab-2" data-bs-toggle="tab" data-bs-target="#profiles" type="button" role="tab" aria-controls="profiles" aria-selected="false"><i className="fa-sharp fa-light fa-pager"></i> Portrait</button>
                                            </li>
                                        </ul>
                                        <div className="tab-content certificates-checkbox-tabs" id="myTabContent">
                                            <div className="tab-pane fade show active" id="homes" role="tabpanel" aria-labelledby="home-tabs">
                                                <div className="row g-5 mt--15">
                                                    <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                                                        <div className="rts-image-check-box">
                                                            <input type="radio" id="number1" name="radio-group" value="number1" />
                                                            <label for="number1">
                                                                <img src="assets/images/dashboard/certificates/04.png" alt="Certificate Image" />
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                                                        <div className="rts-image-check-box">
                                                            <input type="radio" id="number2" name="radio-group" value="number2" />
                                                            <label for="number2">
                                                                <img src="assets/images/dashboard/certificates/05.png" alt="Certificate Image" />
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                                                        <div className="rts-image-check-box">
                                                            <input type="radio" id="number3" name="radio-group" value="number3" />
                                                            <label for="number3">
                                                                <img src="assets/images/dashboard/certificates/06.png" alt="Certificate Image" />
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                                                        <div className="rts-image-check-box">
                                                            <input type="radio" id="number4" name="radio-group" value="number4" />
                                                            <label for="number4">
                                                                <img src="assets/images/dashboard/certificates/07.png" alt="Certificate Image" />
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                                                        <div className="rts-image-check-box">
                                                            <input type="radio" id="number5" name="radio-group" value="number5" />
                                                            <label for="number5">
                                                                <img src="assets/images/dashboard/certificates/08.png" alt="Certificate Image" />
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                                                        <div className="rts-image-check-box">
                                                            <input type="radio" id="number6" name="radio-group" value="number6" />
                                                            <label for="number6">
                                                                <img src="assets/images/dashboard/certificates/09.png" alt="Certificate Image" />
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="profiles" role="tabpanel" aria-labelledby="profile-tab">
                                                <div className="row g-5 mt--15">
                                                    <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                                                        <div className="rts-image-check-box">
                                                            <input type="radio" id="number7" name="radio-group" value="number7" />
                                                            <label for="number7">
                                                                <img src="assets/images/dashboard/certificates/11.png" alt="Certificate Image" />
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                                                        <div className="rts-image-check-box">
                                                            <input type="radio" id="number8" name="radio-group" value="number8" />
                                                            <label for="number8">
                                                                <img src="assets/images/dashboard/certificates/12.png" alt="Certificate Image" />
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                                                        <div className="rts-image-check-box">
                                                            <input type="radio" id="number9" name="radio-group" value="number9" />
                                                            <label for="number9">
                                                                <img src="assets/images/dashboard/certificates/13.png" alt="Certificate Image" />
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                                                        <div className="rts-image-check-box">
                                                            <input type="radio" id="number10" name="radio-group" value="number10" />
                                                            <label for="number10">
                                                                <img src="assets/images/dashboard/certificates/14.png" alt="Certificate Image" />
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                                                        <div className="rts-image-check-box">
                                                            <input type="radio" id="number11" name="radio-group" value="number11" />
                                                            <label for="number11">
                                                                <img src="assets/images/dashboard/certificates/15.png" alt="Certificate Image" />
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                                                        <div className="rts-image-check-box">
                                                            <input type="radio" id="number12" name="radio-group" value="number12" />
                                                            <label for="number12">
                                                                <img src="assets/images/dashboard/certificates/16.png" alt="Certificate Image" />
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="preview-course-button-area">
                                                    <button className="rts-btn btn-primary"> <i className="fa-light fa-eye"></i>Preview</button>
                                                    <button className="rts-btn btn-border">Publish <i className="fa-light fa-arrow-right"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                       
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 rts-sticky-column-item cus_course_desnote">
                    <div className="course-upload-tips-wrapper theiaStickySidebar">
                        <h5 className="title">Course Upload Tips</h5>
                        <div className="single-check-wrapper">
                            <i className="fa-light fa-circle-check"></i>
                            <span>Set the Course Price option or make it free.</span>
                        </div>
                        <div className="single-check-wrapper">
                            <i className="fa-light fa-circle-check"></i>
                            <span>Standard size for the course thumbnail is
                            700x430.</span>
                        </div>
                        <div className="single-check-wrapper">
                            <i className="fa-light fa-circle-check"></i>
                            <span>Video section controls the course overview video.</span>
                        </div>
                        <div className="single-check-wrapper">
                            <i className="fa-light fa-circle-check"></i>
                            <span>Course Builder is where you create & organize
                            a course.</span>
                        </div>
                        <div className="single-check-wrapper">
                            <i className="fa-light fa-circle-check"></i>
                            <span>Add Topics in the Course Builder section to create
                            lessons, quizzes, and assignments.</span>
                        </div>
                        <div className="single-check-wrapper">
                            <i className="fa-light fa-circle-check"></i>
                            <span>Prerequisites refers to the fundamental courses
                            to complete before taking this particular course.</span>
                        </div>
                        <div className="single-check-wrapper">
                            <i className="fa-light fa-circle-check"></i>
                            <span>Information from the Additional Data section
                            shows up on the course single page.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    );
}

export default InstructorCourseadd;