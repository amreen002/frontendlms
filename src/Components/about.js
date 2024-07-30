import React, {useEffect,useState} from 'react';
import Navbarmenu from '../Components/Navbarmenu';
import FooterFrontend from '../Components/FooterFrontend';

const About = () => {
   
    const [animate1, setAnimate1] = useState(false);

    useEffect(() => {
      setAnimate1(true);
    }, []);
     
    const [animate2, setAnimate2] = useState(false);

    useEffect(() => {
      setAnimate2(true);
    }, []);

    const [animate3, setAnimate3] = useState(false);

    useEffect(() => {
      setAnimate3(true);
    }, []);

    const [animate4, setAnimate4] = useState(false);

  useEffect(() => {
    setAnimate4(true);
  }, []);
  return (


<div>
<section className='sticy-header logo-size'>
        <Navbarmenu />
      </section> 
          {/* <div class="breadcrumb-bar">
              <div class="container">
                  <div class="row">
                      <div class="col-md-12 col-12">
                          <h2 class="breadcrumb-title">About Us</h2>
                          <nav aria-label="breadcrumb" class="page-breadcrumb">
                              <ol class="breadcrumb">
                                  <li class="breadcrumb-item"><a href="#">Home</a></li>
                                  <li class="breadcrumb-item" aria-current="page">About Us</li>
                              </ol>
                          </nav>
                      </div>
                  </div>
              </div>
          </div> */}
          <section class="cmpny">
              <div class="container">
                  <div class="row" >
                      <div className="col-12 col-xl-8 col-lg-8 col-md-8">
                        <div className='cus_abtn'>
                        <div className={` content ${animate1 ? 'bounce-in-right' : ''}`}>
                         <div class="section-sub-head dd">
                                 
                                 <h2 class="headline  headline-aligned-to-left  
                                 headline-with-subtitle pt-2 pb-2 ">Discover the TGSC Difference: Your Path to Understanding</h2>
                             </div>
                        
                         <div >
                             <div class="elementor-widget-container">
                                 <p>At TGSC, we believe that understanding is the key to successful learning. Each individual has a unique way of
                                     grasping concepts – some learn through analogies, others through flowcharts, and some by simply listening.
                                     Recognising and embracing these differences is what sets us apart.
                                 </p>
                             </div>
                         </div>
                         </div>
                             


                          <div className={`pt-3 ${animate2 ? 'fade-in' : ''}`}>
                          <div class="section-sub-head ">
                                 <span className='whyy'>Why Choose TGSC?</span>
                                  <h2 class="headline  headline-aligned-to-left  
                                  headline-with-subtitle pt-2 pb-2 ">Personalised Learning Experience</h2>
                              </div>
                              <div class="elementor-widget-container">
                                  <p>
                                  In the traditional Indian education system, large class sizes and rigid teaching methods 
make it nearly impossible for educators to cater to each student’s unique learning style. 
At TGSC, we bridge this gap by providing a personalised learning experience tailored to your 
child's needs. Our platform assesses their learning style and offers customised notes and consultations,
 ensuring they understand concepts in the way that suits them best.
                                  </p>
                              </div>
                          




                          </div>
                        </div>
                        
                      </div>
                      <div className={`col-lg-4 order--xl-2 order-lg-2 order-sm-1 order-1 ${animate3 ? 'bounce-down' : ''}`}>
                          <div className="banner-right-img">
                              <img src="assets/fontend/images/about/11.png" alt="banner" />
                          </div>
                      </div>
                     
                  </div>
                
              </div>
          </section>
<section className='py-5 cust_aboutbox'>
    <div className="container">
        <div className='row'>
            <div className='col-12 col-xl-12 col-lg-12 col-md-12 box_one'>
                <div className='row'>
               
                              <div className='col-12 col-xl-12 col-lg-12 col-md-12'>
                                  <div className={` cntt content ${animate1 ? 'bounce-in-right' : ''}`}>

                                      <div class="section-sub-head headone d-flex">
<div className='image_abt1'>
    <img src='assets/fontend/images/about/Banner-Icon-11.png' className='img-fluid' />
</div>


                                      <div >
                                          <div class="elementor-widget-container peraone">
                                          <h2 class="headline  headline-aligned-to-left  
                       headline-with-subtitle pt-2 pb-2 ">Comprehensive Learning Management System</h2>
                                              <p>Our innovative Learning Management System (LMS) empowers students to take control of their learning journey. They can monitor and evaluate their scores, performance, and understanding, making learning a more engaging and rewarding experience. With TGSC, education is no longer a one-size-fits-all approach but a personalised journey toward mastery.

                                              </p>
                                          </div>
                                      </div>
                                      </div>
                                  </div>
                              </div>
                              
                </div>
                
            </div>

            <div className='col-12 col-xl-12 col-lg-12 col-md-12 box_two mt--20'>
                <div className='row'>
                 
                 <div className='col-12 col-xl-12 col-lg-12 col-md-12'>
                 <div className= {` content cnty ${animate4 ? 'bounce-left' : ''}`}>
               
               <div class="section-sub-head headtwo d-flex">
       
               <div >
                   <div class="elementor-widget-container peratwo">
                   <h2 class="headline  headline-aligned-to-left  
                       headline-with-subtitle pt-2 pb-2 ">Expert Consultations and Support</h2>
                       <p>We provide more than just resources – we offer ongoing support through expert consultations. Our team of dedicated educators is committed to helping your child succeed by addressing their individual learning needs and providing continuous guidance.
                       </p>
                   </div>
               </div>
               <div className='image_abt2'>
    <img src='assets/fontend/images/about/Banner-Icon-12.png' className='img-fluid' />
</div>
               </div>
      </div>
                 </div>
                </div>
               
            </div>

            <div className='col-12 col-xl-12 col-lg-12 col-md-12  box_three mt--20'>
                <div className='row'>
                              <div className='col-12 col-xl-12 col-lg-12 col-md-12'>
                                  <div className={`cnthre content ${animate1 ? 'bounce-in-right' : ''}`}>

                                      <div class="section-sub-head headthree d-flex">
                                      <div className='image_abt3'>
    <img src='assets/fontend/images/about/Banner-Icon-13.png' className='img-fluid' />
</div>
                                      <div >
                                          <div class="elementor-widget-container perathree">
                                          <h2 class="headline  headline-aligned-to-left  
                       headline-with-subtitle pt-2 pb-2 ">Our Unique Advantages</h2>
                                              <p>Our USP lies in our dedication to personalised education. We recognise that no single method of teaching works for everyone. By focusing on understanding and catering to individual learning styles, we ensure that every student can reach their full potential. With TGSC, your child won’t have to look back and say, “I wish I knew it earlier.”
                                              </p>
                                          </div>
                                      </div>
                                      </div>
                                  </div>
                              </div>
                             
                </div>
               
            </div>
        </div>
    </div>
</section>
<section className='box_avbt_img'> 
</section>
         <section className='invest'>
          
            <div className='container'>
                <div className='row'>
                    
                    <div className='col-12 col-xl-12 col-lg-12 col-md-12'>
                        <div className='abt_cnt'>
                            <h2>Invest in Your Child’s Future</h2>
                            
                            <p>
                            Choosing TGSC means investing in a future where your child understands concepts deeply and thoroughly. Our platform is designed to make learning accessible, engaging, and effective for every student. Don’t let your child’s education be limited by traditional methods – empower them with the tools and support they need to thrive.
Join us at TGSC and experience the future of learning. Together, we can make understanding the foundation of education.
                            </p>
                            <h2 className='mt--10'>Story behind our idea</h2>
                           
                            <p>
                            I have always been an average grade scorer, but my love for learning has never waned. From grade 6 in 
                            my ICSE school, we had separate subjects for biology, physics, and chemistry. My childhood was marked 
                            by an insatiable curiosity, always seeking the logic behind everything. My parents, recognizing my
                             inquisitiveness, believed I would thrive in these subjects. However, the Indian education system 
                             prioritized rote learning over understanding, leaving little room for satisfying a curious mind. 
                             Despite my efforts, I ended up scoring average marks.
                             </p>
 <p>
 In grade 8, during a parent-teacher meeting, my teachers bluntly told my parents, "She isn’t made for science; 
 she should opt for commercial studies in grade 9." Though my parents encouraged me to pursue science, believing in
  my potential, I was a sensitive teenager and the teachers’ words stung. I decided to drop science, convinced that 
  they were right. My parents, respecting my decision, didn’t pressurize me, trusting that I would eventually find my path.
  </p>
  <p>
 For grades 9 and 10, I studied commercial studies. Yet, when the time came to choose subjects for grade 11, I 
 found myself at another crossroads. I had assumed I would continue with commerce, but the teachers doubted my 
 aptitude for it. I didn’t enjoy commerce either; it lacked the curiosity and experimentation I craved. With limited 
 options, I chose humanities, drawn by my passion for history.
 </p>
  <p>
 In my heart, I believed I had finally found my calling and aimed to pursue economics. However, life had other plans.
  When I went to the USA for my undergraduate degree, I declared my major as Environment and Business Economics. The
   American curriculum required me to explore various subjects before settling on a major. I took science courses and, 
   to my astonishment, found them not only understandable but fascinating. Working part-time in labs, I discovered a newfound 
   clarity and retention in my studies. I graduated with a Bachelor of Science, cum laude.
   </p>
  <p>
 As I adapted my study habits to fit my learning style, my comprehension and retention improved dramatically. Concepts 
 that once seemed difficult became clear, and recalling information during exams became easier. My grades rose, boosting
  my confidence along with them. This experience made me reflect on my educational journey. Had my teachers not demotivated 
  me and instead focused on my learning style, I might have embraced science earlier.
  </p>
  <p>
 This realization inspired me to create The Good Student Co. Our mission is to help each child understand subjects in a way 
 that suits their unique learning style. We believe that every child doesn’t have to fit into a particular prototype to be 
 successful; their unique self is enough to reach the skies.
 </p>
  <p>
 This journey taught me the importance of leveraging my strengths and being adaptable. Understanding my learning
  preferences allowed me to study more effectively and efficiently, transforming my academic performance. The skills 
  and self-awareness I gained from this experience continue to benefit me, proving the lasting value of personalized 
  learning strategies.
  </p>        
                        </div>
                    </div>
                </div>
            </div>
         </section>
    <section className='investt'>

    </section>
      <FooterFrontend />
</div>

  )
}
export default About;