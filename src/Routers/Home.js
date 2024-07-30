import React, { useEffect,useState, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../Context/CartContext';
import FooterFrontend from '../Components/FooterFrontend';
import Navbarmenu from '../Components/Navbarmenu';
const { REACT_APP_API_ENDPOINT,REACT_APP_API_IMG } = process.env;
const Home = () => {
    const { addToCart } = useContext(CartContext);
    
    const [search ,setSearch]= useState('');
    const Search = (e) => {
        setSearch(e.target.value);
    };
    const [animate5, setAnimate5] = useState(false);
    useEffect(() => {
        setAnimate5(true);
    }, []);

    const [animate15, setAnimate15] = useState(false);
    useEffect(() => {
        setAnimate15(true);
    }, []);

    const [animate2, setAnimate2] = useState(false);

    useEffect(() => {
        setAnimate2(true);
    }, []);
    const [animate4, setAnimate4] = useState(false);

    useEffect(() => {
      setAnimate4(true);
    }, []);
    const [courses, setCourse] = useState([]);
    const [totalLessionCount, settotalLessionCount] = useState(null);
    const [totalStudentCount, settotalStudentCount] = useState(null);
    useEffect(() => {
        fetchData(search)
    }, [search]);

    const fetchData = async (search) => {
        try {
            const response = await axios.get(`${REACT_APP_API_ENDPOINT}/courses?search=${search}`);
            const userDatas = response.data.courses;
            settotalLessionCount(response.data.totalLessionCount)
            settotalStudentCount(response.data.totalStudentCount)
            setCourse(userDatas)


        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    return (



        <div>
        <section className='sticy-header logo-size'>
            <Navbarmenu  Search={Search}/>
        </section>

        <div className="banner-area-one shape-move">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 order-xl-1 order-lg-1 order-sm-2 order-2">
                        <div className="banner-content-one">
                            <div className={`inner pt-3 ${animate2 ? 'fade-in' : ''}`}>
                            <div className="pre-title-banner sliding-text-container">
                                
                                
                                <span className='school sliding-text'>Discover!</span>
                                <span className='school sliding-text'>Blast off to success</span>
                                <span className='school sliding-text'>Explore your LS!</span>
                                <span className='school sliding-text'>Unlock endless possibilities!</span>
                                
                            </div>
                                <h1 className="title-banner">
                                    Discover your learning <br />style,

                                    and <span>ace your grades!</span>
                                    <img src="assets/fontend/images/banner/02.png" alt="banner" />
                                </h1>
                            
                                <p className="disc">
                                Hey there, Middle Schoolers!<br />
Are you ready to embark on an exciting learning journey tailored just for you? 

Welcome to The Good Student Co., where we believe every student has the potential to shine bright like a star in the galaxy of knowledge!

                                </p>
                                    <div class="banner-btn-author-wrapper"><a href="signup" class="rts-btn btn-primary with-arrow">SignUp Now <i class="fa-regular fa-arrow-right"></i></a></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 order--xl-2 order-lg-2 order-sm-1 order-1">
                        <div className={` banner-right-img content ${animate5 ? 'bounce-in-right' : ''}`} >
                            <img src="assets/fontend/images/banner/Banner-Icon-1.png" alt="banner" />
                        </div>
                    </div>
                </div>
            </div>


        </div>

        <div className="about-area-start">
            <div className="container">
                <div className="row align-items-center">
                    <div className='col-12 col-md-7 col-lg-7 col-xl-7'>
                        <div className="about-one-left-image">
                           
                            <div className={` second-order pb-2 ${animate4 ? 'bounce-left' : ''}`}>
                                <img src="assets/fontend/images/about/5.png" alt="about" />
                                
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-5 col-lg-5 col-xl-5 '>
                        <div className="title-area-left-style-11">

                            <h2 className="title">Soar Off To Success</h2>
                            <hr />
                            <p className="post-title">
                                At The Good Student Co., we don't just teach, we empower! We understand that every learner is unique, with their own special way of soaking up knowledge like a sponge. That's why we're here to help you uncover your super-powered learning style and unleash your full potential</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div className="why-choose-us bg-blue bg-choose-us-one bg_image pb-3  shape-move cus_bg_explore">
            <div className="container">
                <div className="row align-items-center">
                   
                    <div className="col-12 col-xl-6 col-lg-6">
                        <div className="title-area-left-style-2">
                        <div class="owText" >
                        <span class="text">Explore</span>
                        </div>
                            <h2 className="title2">YOUR LEARNING STYLE</h2>
                            <p className="post-title">Are you a visual virtuoso who loves to doodle diagrams? Perhaps you're an auditory aficionado who absorbs information through music and sound? Or maybe you're a kinesthetic king or queen who learns best by doing, touching, and moving?</p>
                            <p className='post-title'>Whatever your learning style, we've got you covered! Our cutting-edge assessment tools will pinpoint your strengths and preferences, guiding us to tailor-make your learning experience just for you.</p>
                        </div>
                   
                    </div>
                    <div className="col-lg-6">
                        <div className="why-choose-us-area-image">
                            <img className="one" src="assets/fontend/images/why-choose/2.png" alt="why-choose" />

                        </div>
                    </div>
                </div>
            </div>
          
        </div>


        <div class="category-area-style-one shape-move rts-section-gap bg_image">
            <div class="container">
                <div class="row">

                </div>
                <div class="row">
                <div className={` col-md-6 ${animate15 ? 'bounce-in-right' : ''}`}>
                        <img src='assets/fontend/images/about/join.png' className='img-fluid' style={{width:'80%'}} />
                    </div>
                    <div class="col-lg-6 pt--100">
                    <div class="title-area-center-style who">
                           
                           <h2 class="title ">UNLOCK ENDLESS POSSIBILITIES</h2>
                          
                       </div>
                        <div className='explore_text'>
                            <p>
                            Once we've cracked the code to your unique learning style, get ready to dive into a treasure trove of resources specially curated to suit you. From interactive games and videos to hands-on activities and personalized study plans, our platform is your one-stop shop for academic excellence!
                            </p>
                        </div>
                    </div>
                    

                </div>
            </div>
            {/* <div class="shape-image">
                <div class="shape one" data-speed="0.04" data-revert="true"><img src="assets/fontend/images/banner/15.png" alt="" /></div>
                <div class="shape two" data-speed="0.04"><img src="assets/fontend/images/banner/shape/banner-shape0.svg" alt="" /></div>
                <div class="shape three" data-speed="0.04"><img src="assets/fontend/images/banner/shape/categoryy.gif" alt="" /></div>
            </div> */}
        </div>

        <div className="course-area-start pb-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="title-between-area">
                            <div className="title-area-left-style">
                                <div className="pre-title">
                                  
                                    <h2>Enroll Now</h2>
                                </div>
                                <p className="post-title">You'll find something to spark your curiosity and enhance</p>
                            </div> 
                           <div className="button-group filters-button-group">
                                <button className="button is-checked" data-filter="*">All Courses</button>
                                <button className="button" data-filter=".creative"> Class 6</button>
                                <button className="button" data-filter=".design"> Class 7</button>
                                <button className="button" data-filter=".photo"> Class 8</button>
                            </div> 
                        </div>
                    </div>
                </div>

                    <div className="ms-portfolio-filter-area main-isotop">
                        <div className="portfolio_wrap">
                            <div className="filter row mt--20 portfolio-feed personal">
                                {courses.map((item) => {
                                    if (item.Status == 1) {
                                        return (
                                            <div className="flash grid-item-p element-item transition creative col-xl-3 col-lg-4 col-md-6 col-sm-6" data-category="transition" key={item.id}>
                                                <div className="rts-single-course">
                                                    <a href={`/coursedetails/${item.id}`} class="thumbnail">
                                                        <img src={`${REACT_APP_API_IMG}/${item.CourseUplod}`} alt="course" />
                                                    </a>
                                                    <div className="save-icon" data-bs-toggle="modal" data-bs-target="#exampleModal-login">
                                                        <i className="fa-sharp fa-light fa-bookmark"></i>
                                                    </div>
                                                    <div className="tags-area-wrapper">
                                                        <div className="single-tag">
                                                            <span>{item.Category && item.Category.name}</span>
                                                        </div>
                                                    </div>
                                                    <div className="lesson-studente">
                                                        <div className="lesson">
                                                            <i className="fa-light fa-calendar-lines-pen"></i>
                                                            <span>{item.lessionCount} Lessons</span>
                                                        </div>
                                                        <div className="lesson">
                                                            <i className="fa-light fa-user-group"></i>
                                                            <span>{item.studentCount}  Students</span>
                                                        </div>
                                                    </div>
                                                    <a href={`/coursedetails/${item.id}`}>
                                                        <h5 className="title">{item.name}</h5>
                                                    </a>
                                                    <div className="rating-and-price">
                                                        {/* <div className="rating-area">
                                        <span>4.5</span>
                                        <div className="stars">
                                            <ul>
                                                <li><i className="fa-sharp fa-solid fa-star"></i></li>
                                                <li><i className="fa-sharp fa-solid fa-star"></i></li>
                                                <li><i className="fa-sharp fa-solid fa-star"></i></li>
                                                <li><i className="fa-sharp fa-solid fa-star"></i></li>
                                                <li><i className="fa-sharp fa-regular fa-star"></i></li>
                                            </ul>
                                        </div>
                                    </div> */}
                                                        <div className="price-area">
                                                            <div className="not price">
                                                                <i class="fa-indian-rupee fa-light"></i>-709.99
                                                            </div>
                                                            <div className="price pl-5px" > <i class="fa-indian-rupee fa-light"></i> {item.CoursePrice}
                                                                
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className="tags-area-wrapper" style={{ justifyContent: 'space-between' }}>
                                                        <div className='btns'>
                                                            <a className="btnm flex-row d-flex" onClick={() => addToCart(item)}>
                                                                <div className='icon' style={{ marginRight: '7px' }}>
                                                                    <i className="fa-sharp fa-light fa-cart-arrow-down"></i>
                                                                </div>
                                                                <span>Add to cart</span>
                                                            </a>
                                                        </div>
                                                        <div className='btns'>
                                                            <a className=" flex-row d-flex view_details" href={`/coursedetails/${item.id}`}>
                                                                <div className='icon' style={{ marginRight: '7px' }}>
                                                                    <i className="fa-sharp fa-light fa-eye"></i>
                                                                </div>
                                                                <span>View Details</span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>)
                                    } else {
                                        return null
                                    }
                                })}

                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <section className='py-5 the_good'>
                <div className='container'>
                    <div className='row'>
                    
                        <div className='col-12 col-xl-12 col-lg-12 col-md-12'>
                            <div className='join_st'>
                                <div className='text-center'>
                                    <h4> <span className='join'>JOIN THE</span> <span className='good mt-2'>GOOD STUDENT SQUAD!</span></h4>
                                </div>

                                <div className='join_text'>
                                    <h4>
                                        Ready to join the ranks of the next generation of super scholars? </h4>

                                    <p> <a href="signup">Sign up now</a> and become part of our vibrant community of learners! With regular challenges, contests, and rewards, there's never a dull moment at
                                    </p>
                                    <span className='company'>
                                    The Good Student Co.
                                    </span>
                                       
                                    
                                </div>
                            </div>


                        </div>


                    </div>
                </div>
            </section>
            <section className='joingood'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 col-xl-3 col-lg-3 col-md-3'>
                            <div className='img_one'>
                                <img src='../assets/img/home-img/7.png' className='img-fluid' />
                            </div>
                        </div>
                        <div className='col-12 col-xl-3 col-lg-3 col-md-3'>
                            <div className='img_one'>
                                <img src='../assets/img/home-img/15.png' className='img-fluid' />
                            </div>
                        </div>
                        <div className='col-12 col-xl-3 col-lg-3 col-md-3'>
                            <div className='img_one'>
                                <img src='../assets/img/home-img/23.png' className='img-fluid' />
                            </div>
                        </div>
                        <div className='col-12 col-xl-3 col-lg-3 col-md-3'>
                            <div className='img_one'>
                                <img src='../assets/img/home-img/44.png' className='img-fluid' />
                            </div>
                        </div>

                    </div>
                </div>

            </section>
<section className='shinebr'>
    <div className='container'>
        <div className='row'>


            
              <div className='col-12 col-xl-3 col-lg-3 col-md-3'>
              

              <div className='student_parent_img'>
                                <img src="assets/fontend/images/about/12.png" className='img-fluid' />
                            </div>
              </div>
              <div className='col-12 col-xl-6 col-lg-6 col-md-6'>
              <div class="title-area-center-style cus_shinex">
                                            <div class="pre-title ">
                                              
                                                <h2 className='exploress'>SHINE BRIGHT, STAY CURIOUS</h2>
                                            </div>
                                            <p class="post-title">At The Good Student Co., we're not just about grades – we're 
                                                about nurturing a lifelong love for learning.</p>
                                                <p>
                                                So come on, grab your backpack and join us on an adventure through the fascinating world of knowledge.
                                                </p>
                                                <p>
                                                Together, let's unlock the secrets of the universe and become the best versions of ourselves!
                                                </p>
                                        </div>
              </div>
              <div className='col-12 col-xl-3 col-lg-3 col-md-3'>
              <div class="unloclk"><img src="assets/fontend/images/banner/sun.png" alt=""  /></div>
              </div>
        </div>
    </div>
</section>
<section className='takeoff'>
    <div className='container'>
    <div className='row'>
        <div className='col-12 col-xl-2'></div>
        <div className='col-12 col-xl-8 col-lg-12 col-md-8'>
                            <div class="pt--55 shape sun1 two " >
                                <center>
                                    <img src="assets/fontend/images/about/13.png" alt="" /></center>

                                <div className=''>
                                    <div className='tkeofrdy'>
                                        <div class="title-area-center-style">
                                            <div class="pre-title">
                                                <h2>READY TO TAKE OFF?</h2>
                                            </div>
                                        </div>
                                        <div class="title-area-center-style">

                                            <p class="post-title">
                                                Click below to begin your epic learning quest with
                                                The Good Student Co.
                                                Let's make every day a great day to learn!
                                            </p>

                                        </div>
                                    </div>

                                </div>

                            </div>

        </div>
        <div className='col-12 col-xl-3'>
            
        </div>
                            
                            </div>
    </div>
</section>

            <FooterFrontend />
        </div>
    );
};

export default Home;
