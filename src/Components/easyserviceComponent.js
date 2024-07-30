import React from "react";
import Navbarmenu from "./Navbarmenu";
import FooterFrontend from './FooterFrontend'


function EasyserviceComponent() {
    return (
        <>
            <div>
                <section className='sticy-header logo-size'>
                    <Navbarmenu />
                </section>
          
                <div className="backcolor">
                <div className="container py-5 ">
                    <div className="row">


                        <div className="col-12 col-md-4 col-xl-4 col-lg-4">
                            <div class="unloclk"><img src="assets/fontend/images/about/easy-service1.png" alt="" /></div>
                        </div>
                        <div className="col-12 col-md-1 col-xl-1 col-lg-1">

                        </div>
                        <div className="col-12 col-md-7 col-xl-7 col-lg-7">
                            <div className="importants">
                                <div className="strap-text">
                                    <h3>“Craft your story, stand out from the crowd”</h3>
                                </div>
                                <h1>WHY IS IT IMPORTANT?</h1>
                                <p>A Statement of Purpose (SOP) or essay provides a quick snapshot into a person's life. In today's world, whether you're applying for college or interviewing for a job, people want to hear your story. They are interested in your background, education, skills, experiences, and most importantly, your learnings. Crafting your story in a way that connects with the reader on an emotional level creates a lasting impression and sets you apart from the rest.</p>
                                <p>At TGSC, we see the SOP/essay as a celebration of your individual story. We appreciate your experiences, accomplishments, and achievements. Our goal is to help you become confident and proud of your journey, showcasing your unique story to the world.</p>

                            </div>
                        </div>


                    </div>
                </div>
                </div>
                
                <div className="backimg py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-7 col-lg-7 col-xl-7 py-5">
                                <h2>HOW CAN WE HELP ?</h2>
                                <p>Our team has firsthand experience working with admissions committees and has been trained through rigorous writing courses abroad. From tutoring at writing centres in the USA to assisting students in India with their applications abroad, we have worked with a diverse range of students. We understand the key elements that make up a compelling personal story. With years of experience, we have developed a framework that helps students craft their own stories, aligning them with the essential components of any application.

                                </p>
                            </div>
                            <div className="col-12 col-md-5 col-lg-5 col-xl-5">
                            
                            <div class="unloclk"><img src="assets/fontend/images/about/easyservice3.png" alt="" /></div>
                            </div>
                        </div>

                    </div>

                </div>
                <section className="py-5 bg-white">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-3 col-xl-3 col-lg-3">
                                <img src="assets/fontend/images/about/easy-service2.png" />
                            </div>
                            <div className="col-12 col-md-9 col-xl-9 col-lg-9 text-center">
                                <h1>OUR UNIQUE SELLING PROPOSITION</h1>
                                <span>“We help you create your stories.” </span>
                                <p>We achieve this by deeply understanding your background and experiences. Empathy is at the heart of our approach. We ensure our advice is grounded in genuine understanding and connection, adhering to the philosophy of “putting ourselves in your shoes.” This personalized approach ensures that every essay we help produce is unique, rich, and reflective of your journey.</p>
                            </div>
                        
                        </div>

                    </div>
                </section>


                <FooterFrontend />
            </div>


        </>
    )


}
export default EasyserviceComponent