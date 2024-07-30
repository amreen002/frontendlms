import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link, useLocation } from 'react-router-dom';
import Navbarmenu from "./Navbarmenu";
import Sidebar from './sidebar';
import DashboardCard from './dashboardcardComponent';
const datatoken = localStorage.getItem('datatoken');
const coursedatafetch = JSON.parse(datatoken)
const { REACT_APP_API_ENDPOINT, REACT_APP_API_IMG } = process.env;

function Materiales() {
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

    const { videoId } = useParams();
    const [userData, setUserData] = useState({});
    const [Topic, setTopic] = useState({});
    const [category, setCategory] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState('');
    const [selectedvideo, setselectedvideo] = useState('');
    const [subject, setSubject] = useState({})


    const handleSelectVideo = (e) => {
        const value = e.target.value;
        setselectedvideo(value);
    };



    useEffect(() => {
        fetchData();
    }, [])


    useEffect(() => {
        fetchData1(coursesId);
    }, [coursesId])


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
    }


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
    const [activeService, setActiveService] = useState(null);

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
    const openModalPDF = (file) => {
        setModalContentPDF(file);
        setIsModalOpenPDF(true);
    };

    const closeModalPDF = () => {
        setIsModalOpenPDF(false);
        setModalContentPDF(null);
    };


    //Dropdown Navigation
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleDropdown = (serviceName) => {
        setIsExpanded(isExpanded === serviceName ? '' : serviceName);
    };



    const fetchData2 = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                const response = await axios.get(`${REACT_APP_API_ENDPOINT}/categories`, {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                });
                const userDatas = response.data.categories;
                setCategory(userDatas)
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    return (
        <div>
            <section>
                <Navbarmenu />
            </section>


            <DashboardCard />
            <div className="dashboard--area-main pt--100 pt_sm--50">
                <div className="container">
                    <div className="row g-5">
                        <Sidebar />
                        {/* <!-- course details area start --> */}
                        <div class="col-lg-9" >
                            <div class="exrolled-course-wrapper-dashed " style={{backgroundColor:"#fff"}}>
                                <div className="rts-course-area rts-section-gap">
                                    <div className="container">
                                        <div className="row g-5">
                                            <div className="col-lg-12 order-cl-1 order-lg-1 order-md-2 order-sm-2 order-2">
                                                <div className="course-details-btn-wrapper pb--50">
                                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                                        <li className="nav-item" role="presentation">
                                                            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Course Information</button>
                                                        </li>
                                                        <li className="nav-item" role="presentation">
                                                            <button className="nav-link " id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Course Content</button>
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
                                                            {/* <p className="disc">
                                                                {CoureseFindOne.Description}
                                                            </p>
                                                            <p className="disc">
                                                                {CoureseFindOne.Description}
                                                            </p> */}

                                                        </div>
                                                    </div>
                                                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                                        <div className="course-content-wrapper-main">

                                                            <div className='flex-row d-flex'>
                                                                <h5 className="title">{CoureseFindOne.name}</h5>
                                                            </div>



                                                            {/* <!-- course content accordion area --> */}
                                                            <div className="accordion mt--30" id="accordionExample">


                                                                <div>
                                                                    {CoureseFindOne.topics && Array.isArray(CoureseFindOne.topics) ? (
                                                                        CoureseFindOne.topics.map((topic) => (
                                                                            <div key={topic.id} className="accordion-item mb-4 acordin_space">
                                                                                <h2 className="accordion-header arr_clrs" id={`heading${topic.id}`}>
                                                                                    <button
                                                                                        className="accordion-button"
                                                                                        onClick={() => toggleDropdownTopic(`collapse${topic.id}`)}
                                                                                        type="button"
                                                                                        data-bs-toggle="collapse"
                                                                                        data-bs-target={`#collapse${topic.id}`}
                                                                                        aria-expanded={isExpandedTopic === `collapse${topic.id}`}
                                                                                        aria-controls={`collapse${topic.id}`}
                                                                                    >
                                                                                        <span className='topic_name'>{topic.name}</span>

                                                                                        <span className='timess'>{CoureseFindOne.lessionCount} Lectures . 9 min
                                                                                            <i class="fa-chevron-double-down fa-regular ml--10">{coursedatafetch?.Role?.Name === "Instructor" && (
                                                                                                <Link to={`/updatesubject/${topic.id}`}  >
                                                                                                    <i class="fa-light fa-pen-to-square ml--15" ></i>
                                                                                                </Link>)}
                                                                                            </i></span>
                                                                                    </button>
                                                                                </h2>
                                                                                {isExpandedTopic === `collapse${topic.id}` && (
                                                                                    <div
                                                                                        id={`collapse${topic.id}`}
                                                                                        className="accordion-collapse collapse show "
                                                                                        aria-labelledby={`heading${topic.id}`}
                                                                                        data-bs-parent="#accordionExample"
                                                                                    >
                                                                                        {topic.videos && Array.isArray(topic.videos) && topic.videos.map((video) => (


                                                                                            <div key={video.id}>
                                                                                                <h2 className="accordion-header acordion_head backa_color" id={`heading${video.id}`}>
                                                                                                    <button
                                                                                                        className="accordion-button ardion_btn "
                                                                                                        onClick={() => toggleDropdownVideo(`collapse${video.id}`)}
                                                                                                        type="button"
                                                                                                        data-bs-toggle="collapse"
                                                                                                        data-bs-target={`#collapse${video.id}`}
                                                                                                        aria-expanded={isExpandedVideo === `collapse${video.id}`}
                                                                                                        aria-controls={`collapse${video.id}`}
                                                                                                    >
                                                                                                        <span className='flex-row d-flex ml--10 titlees'>
                                                                                                        <i class="fa-arrow-right-long fa-regular mr--10 mt-1 arrow_icon" ></i> {video.Title}</span> 
                                                                                                        <i class="fa-chevron-double-down titlees fa-regular ml--10">{coursedatafetch?.Role?.Name === "Instructor" && (
                                                                                                            <Link to={`/updatecontent/${video.id}`}  >
                                                                                                                <i class="fa-light fa-pen-to-square titlees ml--15" ></i>
                                                                                                            </Link>)}
                                                                                                        </i>
                                                                                                    </button>
                                                                                                </h2>
                                                                                                {isExpandedVideo === `collapse${video.id}` && (
                                                                                                    <div
                                                                                                        id={`collapse${video.id}`}
                                                                                                        className="accordion-collapse acordion_head  collapse show  p-3"
                                                                                                        aria-labelledby={`heading${video.id}`}
                                                                                                        data-bs-parent="#accordionExample"
                                                                                                    >
                                                                                                        {video.VideoUplod.map((videofiles) => (

                                                                                                            <div className=" text-end" key={videofiles.id}>


                                                                                                                <div className='row'>
                                                                                                                    <div className="col-12 col-md-6 col-lg-6 col-lx-6  ">
                                                                                                                        <a href="#" className="play-video-wrapperes d-flex " onClick={() => openModal(videofiles)}>
                                                                                                                       
                                                                                                                            <video src={`${REACT_APP_API_IMG}/${videofiles.path}`} autoplay="true" muted className='videoes_play'>
                                                                                                                            </video>
                                                                                                                           <div className='video_icons'>
                                                                                                                            <i class="fa-play-circle fa-regular "></i>
                                                                                                                           </div>
                                                                                                                           
                                                                                                                            <div className='mt-3 ml--10 videos_name'>{videofiles.name}</div>
                                                                                                                         
                                                                                                                        </a>
                                                                                                                    </div>

                                                                                                                    <div className="col-12 col-md-6 col-lg-6 col-lx-6 text-end mt-4 ">
                                                                                                                        <span className="play timess ">Preview</span>
                                                                                                                        <span className='min_nine timess mr--15'> 9 min</span>
                                                                                                                       

                                                                                                                    </div>



                                                                                                                </div>


                                                                                                            </div>))}
                                                                                                    </div>
                                                                                                )}

                                                                                            </div>
                                                                                        ))}
                                                                                        {topic.lessions && Array.isArray(topic.lessions) && topic.lessions.map((lession) => (
                                                                                            <div key={lession.id}>
                                                                                                <h2 className="accordion-header acordion_head colorsss " id={`heading${lession.id}`}>
                                                                                                    <button
                                                                                                        className="accordion-button"
                                                                                                        onClick={() => toggleDropdownLesson(`collapse${lession.id}`)}
                                                                                                        type="button"
                                                                                                        data-bs-toggle="collapse"
                                                                                                        data-bs-target={`#collapse${lession.id}`}
                                                                                                        aria-expanded={isExpandedLesson === `collapse${lession.id}`}
                                                                                                        aria-controls={`collapse${lession.id}`}
                                                                                                    >
                                                                                                        <p className='d-flex mb--0 ml--10 titlees'><i class="fa-arrow-right-long fa-regular mr--10 mt-1 arrow_icon"></i> Lession Title : <span className='titlees'> {lession.Title} </span>
                                                                                                            
                                                                                                        </p> 
                                                                                                        <i class="fa-chevron-double-down chervn fa-regular">{coursedatafetch?.Role?.Name === "Instructor" && (
                                                                                                            <Link to={`/updatemodel/${lession.id}`}>
                                                                                                                <i class="fa-light fa-pen-to-square squer ml--15" ></i>
                                                                                                            </Link>
                                                                                                        )}</i>
                                                                                                    </button>
                                                                                                </h2>
                                                                                                {isExpandedLesson === `collapse${lession.id}` && (
                                                                                                    <div
                                                                                                        id={`collapse${lession.id}`}
                                                                                                        className="accordion-collapse acordion_head  collapse show  p-4"
                                                                                                        aria-labelledby={`heading${lession.id}`}
                                                                                                        data-bs-parent="#accordionExample"
                                                                                                    >
                                                                                                        {lession.LessionUpload.map((file) => (
                                                                                                            <div className="accordion-body" key={file.id}>
                                                                                                                <a href="#" className="play-video-wrapper" onClick={() => openModalPDF(file)}>
                                                                                                                    <div className="left editers">
                                                                                                                        <i class="fa-solid fa-share bx-tada-hover" ></i>
                                                                                                                        <i class="fa-file-pdf fa-light mt-1 p-1"></i>
                                                                                                                        <span className='p-1 ml--10'>{file.name}

                                                                                                                        </span>

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

                                                                                    <button class="btn-close cloes" onClick={closeModal} style={{ position: 'relative', float: 'right' }}></button>


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

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )

}
export default Materiales