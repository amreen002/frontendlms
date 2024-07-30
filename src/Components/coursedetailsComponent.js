import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link, } from 'react-router-dom';
import Navbarmenu from "./Navbarmenu";
import Footer from "./FooterFrontend";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const { REACT_APP_API_ENDPOINT, REACT_APP_API_IMG } = process.env;

function CoursedetailsComponent() {
    const settings = {
        dots: false,
        infinite: true,
        autoplay: true, // to enable automatic sliding
        autoplaySpeed: 3500, // speed of autoplay
        slidesToShow: 4,
        slidesToScroll: 4,
        centerMode: true, // to enable center mode
        centerPadding: "70px",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 375,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }

            },
            {
                breakpoint: 365,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }

            }
        ] // ad
    };
    const [courses, setCourse] = useState([]);
    const [totalLessionCount, settotalLessionCount] = useState(0);
    const [totalStudentCount, settotalStudentCount] = useState(0);
    const [Lastupdated, setLastupdated] = useState(null);
    const [CoureseFindOne, setCoureseFindOne] = useState({});
    const { coursesId } = useParams();
    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
        fetchData1(coursesId);
    }, [coursesId]);
    const fetchData = async () => {
        try {
            const response = await axios.get(`${REACT_APP_API_ENDPOINT}/courses`);
            const userDatas = response.data.courses;
            settotalLessionCount(response.data.totalLessionCount)
            settotalStudentCount(response.data.totalStudentCount)
            setLastupdated(response.data.Lastupdated)
            setCourse(userDatas)


        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const fetchData1 = async (coursesId) => {
        try {
            if (!coursesId) {
                console.log("coursesId is undefined");
                return;
            }

            const response = await axios.get(`${REACT_APP_API_ENDPOINT}/courses/${coursesId}`);
            const userData = response.data.courses;
            setCoureseFindOne(userData);
            settotalLessionCount(response.data.totalLessionCount)
            settotalStudentCount(response.data.totalStudentCount)
            setLastupdated(response.data.Lastupdated)


        } catch (err) {
            console.log(err.response);
        }
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [isModalOpenPDF, setIsModalOpenPDF] = useState(false);
    const [modalContentPDF, setModalContentPDF] = useState(null);
    const [isExpandedTopic, setIsExpandedTopic] = useState('');
    const [isExpandedLesson, setIsExpandedLesson] = useState('');
    const [isExpandedVideo, setIsExpandedVideo] = useState('');

    const toggleDropdownTopic = (id) => {
        setIsExpandedTopic(isExpandedTopic === id ? '' : id);
    };

    const toggleDropdownLesson = (id) => {
        setIsExpandedLesson(isExpandedLesson === id ? '' : id);
    };
    const toggleDropdownVideo = (id) => {
        setIsExpandedVideo(isExpandedVideo === id ? '' : id);
    };


    const openModal = (videofiles) => {
        setModalContent(videofiles);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalContent(null);
    };
    const openModalPDF= (file) => {
        setModalContentPDF(file);
        setIsModalOpenPDF(true);
    };

    const closeModalPDF = () => {
        setIsModalOpenPDF(false);
        setModalContentPDF(null);
    };

    return (
        <>
            <section>
                <Navbarmenu />
            </section>

            <div className="course-details-breadcrumb-1 bg_image rts-section-gap pt--110 pb--105">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="single-course-left-align-wrapper">
                                <div className="meta-area">
                                    <a href="index-2.html">Home</a>
                                    <i className="fa-solid fa-chevron-right"></i>
                                    <a className="active" href="#">Course Details</a>
                                </div>
                                <h1 className="title">
                                    {CoureseFindOne.name}  2024: Zero to Mastery
                                </h1>
                                <div className="rating-area">
                                    <div className="stars-area">
                                        <span>4.5</span>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-regular fa-star"></i>
                                    </div>
                                    <div className="students">
                                        <i className="fa-thin fa-users"></i>
                                        <span> {totalStudentCount} Students</span>
                                    </div>
                                    <div className="calender-area-stars">
                                        <i className="fa-light fa-calendar-lines-pen"></i>
                                        <span>Last updated {Lastupdated}</span>
                                    </div>
                                </div>
                                <div className="author-area">
                                    <p> <span>Categories: </span>  {CoureseFindOne.category && CoureseFindOne.category.name}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- course details area start --> */}
            <div className="rts-course-area rts-section-gap">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-8 order-cl-1 order-lg-1 order-md-2 order-sm-2 order-2">
                            <div className="course-details-btn-wrapper pb--50">
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Course Information</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link " id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Course Content</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Instructor</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="contacts-tab" data-bs-toggle="tab" data-bs-target="#contacts" type="button" role="tab" aria-controls="contacts" aria-selected="false">Review</button>
                                    </li>
                                </ul>
                            </div>
                            <div className="tab-content tabcnt mt--50" id="myTabContent">
                                <div className="tab-pane fade  show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div className="course-content-wrapper">
                                        <h5 className="title">About Course</h5>
                                        <p className="disc">
                                            {CoureseFindOne.AboutCourse}
                                        </p>
                                        <h5 className="title">Description</h5>
                                        <p className="disc">
                                            {CoureseFindOne.Description}
                                        </p>
                                        <p className="disc">
                                            {CoureseFindOne.Description}
                                        </p>
                                        <p className="disc">
                                            {CoureseFindOne.Description}
                                        </p>

                                    </div>
                                </div>
                                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <div className="course-content-wrapper-main">
                                        <h5 className="title">Course Content</h5>

                                        {/* <!-- course content accordion area --> */}
                                        <div className="accordion mt--30" id="accordionExample">


                                            <div className="accordion-item">
                                                {CoureseFindOne.topics && Array.isArray(CoureseFindOne.topics) ? (
                                                    CoureseFindOne.topics.map((topic) => (
                                                        <div key={topic.id} className="accordion-item">
                                                            <h2 className="accordion-header" id={`heading${topic.id}`}>
                                                                <button
                                                                    className="accordion-button"
                                                                    onClick={() => toggleDropdownTopic(`collapse${topic.id}`)}
                                                                    type="button"
                                                                    data-bs-toggle="collapse"
                                                                    data-bs-target={`#collapse${topic.id}`}
                                                                    aria-expanded={isExpandedTopic === `collapse${topic.id}`}
                                                                    aria-controls={`collapse${topic.id}`}
                                                                >
                                                                    <span>{topic.name}</span>
                                                                    <span>{CoureseFindOne.lessionCount} Lectures . 9 min</span>
                                                                </button>
                                                            </h2>
                                                            {isExpandedTopic === `collapse${topic.id}` && (
                                                                <div
                                                                    id={`collapse${topic.id}`}
                                                                    className="accordion-collapse collapse show"
                                                                    aria-labelledby={`heading${topic.id}`}
                                                                    data-bs-parent="#accordionExample"
                                                                >
                                                                    {topic.videos && Array.isArray(topic.videos) && topic.videos.map((video) => (

                                                                        
                                                                        <div key={video.id}>
                                                                            <h2 className="accordion-header" id={`heading${video.id}`}>
                                                                                <button
                                                                                    className="accordion-button"
                                                                                    onClick={() => toggleDropdownVideo(`collapse${video.id}`)}
                                                                                    type="button"
                                                                                    data-bs-toggle="collapse"
                                                                                    data-bs-target={`#collapse${video.id}`}
                                                                                    aria-expanded={isExpandedVideo === `collapse${video.id}`}
                                                                                    aria-controls={`collapse${video.id}`}
                                                                                >
                                                                                    <span>{video.Title}</span>
                                                                                </button>
                                                                            </h2>
                                                                            {isExpandedVideo === `collapse${video.id}` && (
                                                                                <div
                                                                                    id={`collapse${video.id}`}
                                                                                    className="accordion-collapse collapse show"
                                                                                    aria-labelledby={`heading${video.id}`}
                                                                                    data-bs-parent="#accordionExample"
                                                                                >
                                                                                  {video.VideoUplod.map((videofiles) => (
                                                                                   
                                                                                    <div className="accordion-body" key={videofiles.id}>
                                                                                        <a href="#" className="play-video-wrapper"  onClick={() => openModal(videofiles)}>
                                                                                              <div className="left">
                                                                                              
                                                                                              <i class="fa-solid fa-share bx-tada-hover" style={{ color: "red" }}></i>
                                                                                                  <i className="fa-light fa-circle-play"></i>
                                                                                                  <span>{videofiles.name}</span>
                                                                                              </div>
                                                                                              <div className="right">
                                                                                                  <span className="play">Preview</span>
                                                                                                  <span>9 min</span>
                                                                                              </div>
                                                                                        </a>
                                                                                    </div>))}
                                                                                </div>
                                                                            )}
                                                                          
                                                                        </div>
                                                                    ))}
                                                                    {topic.lessions && Array.isArray(topic.lessions) && topic.lessions.map((lession) => (
                                                                        <div key={lession.id}>
                                                                            <h2 className="accordion-header" id={`heading${lession.id}`}>
                                                                                <button
                                                                                    className="accordion-button"
                                                                                    onClick={() => toggleDropdownLesson(`collapse${lession.id}`)}
                                                                                    type="button"
                                                                                    data-bs-toggle="collapse"
                                                                                    data-bs-target={`#collapse${lession.id}`}
                                                                                    aria-expanded={isExpandedLesson === `collapse${lession.id}`}
                                                                                    aria-controls={`collapse${lession.id}`}
                                                                                >
                                                                                    <span>{lession.Title}</span>
                                                                                </button>
                                                                            </h2>
                                                                            {isExpandedLesson === `collapse${lession.id}` && (
                                                                                <div
                                                                                    id={`collapse${lession.id}`}
                                                                                    className="accordion-collapse collapse show"
                                                                                    aria-labelledby={`heading${lession.id}`}
                                                                                    data-bs-parent="#accordionExample"
                                                                                >
                                                                                  {lession.LessionUpload.map((file) => (
                                                                                    <div className="accordion-body" key={file.id}>
                                                                                        <a href="#" className="play-video-wrapper"  onClick={() => openModalPDF(file)}>
                                                                                            <div className="left">
                                                                                            <i class="fa-solid fa-share bx-tada-hover" style={{ color: "red" }}></i>
                                                                                                <i className="fa-light fa-file-pdf" style={{ color: "red" }}></i>
                                                                                                <span>{file.name}</span>
                                                                                            </div>
                                                                                        </a>
                                                                                    </div>))}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))
                                                ) : ''}
                                            </div>

                                            {/* Modal */}
                                            {isModalOpen && modalContent && (
                                                <div className=' modal-backdropss' tabindex="-1" aria-labelledby="exampleModalLabel" style={{ display: 'block', paddingRight: '17px' }} aria-modal="true" role="dialog">
                                                    <div className="mdlogs" style={{ display: 'block' }} onClick={closeModal}>
                                                        <div onClick={(e) => e.stopPropagation()}>
                                                            <div className="mt--130" style={{ position: 'relative' }}>

                                                               <button class="btn-close cloes" onClick={closeModal} style={{ position: 'relative' ,float:'right'}}></button>
                         

                                                                <video width="100%" controls>

                                                                    <source src={`${REACT_APP_API_IMG}/${modalContent.path}`} type="video/mp4" />
                                                                    Your browser does not support the video tag.
                                                                </video>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {isModalOpenPDF && modalContentPDF && (

                                                <div className='modal-backdropss' tabindex="-1" aria-labelledby="exampleModalLabel" style={{ display: 'block', paddingRight: '17px' }} aria-modal="true" role="dialog">
                                                    <div className="modal" style={{ display: 'block' }} onClick={closeModalPDF}>
                                                        <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <button className="btn-close" onClick={closeModalPDF} style={{ position: 'relative', float: 'right' }}></button>
                                                                </div>
                                                                <div className="modal-body">
                                                                    <iframe

                                                                        src={`${process.env.REACT_APP_API_IMG}/${modalContentPDF.path}`}
                                                                        width="100%"
                                                                        height="600px"
                                                                        style={{ border: 'none', marginBottom: '20px' }}

                                                                    ></iframe>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        {/* <!-- course content accordion area end --> */}
                                    </div>
                                </div>
   
                            </div>
                          
                        </div>
                        <div className="col-lg-4 order-cl-2 order-lg-2 order-md-1 order-sm-1 order-1  rts-sticky-column-item">
                            {/* <!-- right- sticky bar area --> */}
                            <div className="right-course-details">
                                {/* <!-- single course-sidebar --> */}
                                <div className="course-side-bar">

                                    <div className="thumbnail">
                                        <img src={`${REACT_APP_API_IMG}/${CoureseFindOne.CourseUplod}`} alt="course" />
                                    </div>

                                    <div className="price-area">
                                        <h3 className="title"><i class="fa-indian-rupee fa-light"></i> {CoureseFindOne.CoursePrice}
                                        </h3>

                                        
                                    </div>

                                    <a href="#" className="rts-btn btn-primary" >Add To Cart</a>
                                    {/* <a href="#" className="rts-btn btn-border">Buy Now</a> */}

                                    <div className="what-includes">

                                        <h5 className="title">This course includes: </h5>
                                        <div className="single-include">
                                            <div className="left">
                                                <i className="fa-light fa-chart-bar"></i>
                                                <span>Levels</span>
                                            </div>
                                            <div className="right">
                                                <span>Beginner</span>
                                            </div>
                                        </div>
                                        <div className="single-include">
                                            <div className="left">
                                                <i className="fa-light fa-timer"></i>
                                                <span>Duration</span>
                                            </div>
                                            <div className="right">
                                                <span>{CoureseFindOne.CourseDuration} Days</span>
                                            </div>
                                        </div>
                                        <div className="single-include">
                                            <div className="left">
                                                <i className="fa-regular fa-floppy-disk"></i>
                                                <span>Subject</span>
                                            </div>
                                            <div className="right">
                                                <span>{CoureseFindOne.category && CoureseFindOne.category.name}</span>
                                            </div>
                                        </div>
                                        <div className="single-include">
                                            <div className="left">
                                                <i className="fa-regular fa-pen-to-square"></i>
                                                <span>Update</span>
                                            </div>
                                            <div className="right">
                                                <span>{Lastupdated}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                             
                            </div>
                          
                        </div>
                    </div>
                </div>
            </div>
          

            <div className="rts-section-gapBottom  rts-feature-course-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="title-between-area">
                                <div className="title-area-left-style">
                                    <div className="pre-title">

                                        <span>More Similar Courses</span>
                                    </div>
                                    <h2 className="title">Related Courses</h2>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="slider-container" id='swiperContainerr'>

                       
                            <Slider {...settings} >
                            
                                {courses.map((course) => {
                                    if (course.Status == 1) {
                                        return (
                                            <div  >
                                            <div >
                                                <div class="single-course-style-three" style={{ marginLeft: '15px' }}>
                                                    <a href={`/coursedetails/${course.id}`} class="thumbnail">
                                                        <img src={`${REACT_APP_API_IMG}/${course.CourseUplod}`} alt="course" />
                                                        <div class="tag-thumb">
                                                            <span>{course.Category && course.Category.name}</span>
                                                        </div>
                                                 
                                                    <div class="body-area">
                                                        <div class="course-top">
                                                            <div class="tags">Best Seller</div>
                                                            <div class="price">{course.CoursePrice}</div>
                                                        </div>
                                                        <a href="#">
                                                            <h5 class="title">{course.name}</h5>
                                                        </a>
                                                        <div class="leasson-students">
                                                            <div class="lesson">
                                                                <i class="fa-light fa-calendar-lines-pen"></i>
                                                                <span>{course.lessionCount} Lessons</span>
                                                            </div>
                                                            <div class="students">
                                                                <i class="fa-light fa-users"></i>
                                                                <span>{course.studentCount} Lessons</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    </a>
                                                </div>
                                            </div>
                                            </div>)
                                    } else {
                                        return null
                                    }
                                })}
                              
                            </Slider>


                        

                    </div>

                </div>
            </div>

            <section>
                <Footer />
            </section>
        </>
    )

}
export default CoursedetailsComponent