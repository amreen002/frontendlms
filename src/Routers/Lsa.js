import React, {useEffect,useState} from 'react';
import Navbarmenu from '../Components/Navbarmenu';

import FooterFrontend from '../Components/FooterFrontend';

const Lsa = () => {
    const [animate1, setAnimate1] = useState(false);

    useEffect(() => {
      setAnimate1(true);
    }, []);

    const [animate3, setAnimate3] = useState(false);

    useEffect(() => {
      setAnimate3(true);
    }, []);

  
  return (


<div>
<section className='sticy-header logo-size'>
        <Navbarmenu />
      </section> 
    
      <section className='pt--110 pb--110  about_one'  >
        <div className='container'>
            <div className='row'>
                <div className='col-12 col-xl-6 col-lg-6 col-md-6'>
                    <div className='lsa_img'>
                              <figure class="wpb_wrapper vc_figure">
                                  <div class="vc_single_image-wrapper   vc_box_border_grey">
                                    <img src='assets/fontend/images/about/Banner-Icon-14.png' className='img-fluid' />

                                      </div>
                              </figure>
                    </div>
                </div>
                 <div className='col-12 col-xl-6 col-lg-6 col-md-6'>
                    <div className='bounce-in-right '>
                              <div className='about_head lsa_bx'>
                              
                                  <h1>UNDERSTANDING LEARNING STYLES</h1>
                              
                              <div className='about_cnt'>
                                  <p>
                                      Learning styles are the unique ways in which individuals engage with learning. </p>

                                  <p>It's about discovering how you best absorb and process information. </p>

                                  <p>Whether you're a visual learner who thrives on images and diagrams,
                                      an auditory learner who absorbs information through listening, or a
                                      kinesthetic learner who learns best through hands-on activities, understanding your
                                      learning style is key to optimizing your educational experience.

                                  </p>
                                  <a href="signup" className='btn btn-primary custom_lsa'>Know your learning style now</a>
                              </div>
                              </div>
                    </div>
                  
                 </div>
                 
            </div>
        </div>
      </section>

      <section className='pt--110 pb--110 about_two' >
        <div className='container'>
                  <div className='row'>
                      <div className='col-12 col-xl-5 col-lg-5 col-md-5'>
                          <div className='lsa_bx2'>
                              <div className='about_hd'>
                            
                                  <h1>
                                      WHY LEARNING STYLE MATTERS?
                                  </h1>
                                  <p>
                                      Recognizing and embracing your learning style isn't just about academic success; it's about empowering yourself with self-awareness. </p>
                                  <p>By understanding how you learn best, you can tailor your study methods, resources, and teaching approaches to match your individual preferences and strengths.</p>
                                  <p>This not only enhances your comprehension and analytical abilities but also fosters better mental and emotional well-being</p>

                              </div>
                          </div>
                      </div>


                      <div className='col-12 col-xl-7 col-lg-7 col-md-7'>
                          <div className='lsa_img2'>
                              <figure class="wpb_wrapper vc_figure">
                                  <div class="">
                                  <img src='assets/fontend/images/about/Banner-Icon-15.png' className='img-fluid' />

                                  </div>
                              </figure>
                          </div>
                      </div>



                  </div>
        </div>
      </section>

     

      <section class="py-5 lsa_cus_bg">
        <div className='container'>
            <div className='row'>
            <div className='col-12 col-xl-12 col-lg-12 col-md-12'>
                        <div className={`about_last ${animate3 ? 'bounce-down' : ''}`}>
                            <h3>
                                What Learning Style Assessment Offers You?
                            </h3>
                        </div>
                    </div>
                <div className='col-12 col-xl-4 col-lg-4 col-md-4'>
                    <div className='benift'>
                     
                      <div className='benifits'>
                      <h2 className='benifites'>BENEFITS</h2>
                           <ul className='list-unstyled'>
                              <li> <span >&#128073;</span> Understanding learning style</li>
                              <li> <span >&#128073;</span> Comprehension and analysis</li>
                              <li><span >&#128073;</span> Mental and emotional health</li>
                              <li><span >&#128073;</span> Self-awareness</li>
                              <li><span >&#128073;</span> Personal management</li>
                           </ul>
                       </div>
                    </div>
                </div>

                <div className='col-12 col-xl-4 col-lg-4 col-md-4'>
                    <div className='benift'>
                    
                    <div className='benifits'>
                    <h2 className='frstd'>FOR STUDENT</h2>
<ul className='list-unstyled'>
    <li><span >&#128073;</span> Identifies best approach for academic success</li>
    <li><span >&#128073;</span> <a href='' class="">Improves academic excellence</a></li>
    <li><span >&#128073;</span> Note taking strategies for improved learning </li>
    <li><span >&#128073;</span> Customised notes tailored to unique learning styles</li>
    <li><span >&#128073;</span> Continuous monitoring and evaluation of performance</li>
</ul>
</div>
                    </div>
                </div>

                <div className='col-12 col-xl-4 col-lg-4 col-md-4'>
                    
                  
                    <div className='benifits'>
                    <h2 className='forparnt'>FOR PARENTS/GUARDIANS</h2>
<ul className='list-unstyled'>
<li><span >&#128073;</span> Helps child excel academically and personally</li>
<li><span >&#128073;</span> Enhanced comprehension and analytical abilities</li>
<li><span >&#128073;</span> Better mental and emotional health</li>
<li><span >&#128073;</span> Increased self awareness - “what works best for them”</li>
<li><span >&#128073;</span> Enhanced personal management </li>
</ul>
</div>
                  
                </div>


          
                    
            </div>
        </div>
      </section>
      <FooterFrontend />
</div>

  )
}
export default Lsa;