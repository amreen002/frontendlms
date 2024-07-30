import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Navbarmenu from "./Navbarmenu";
import Sidebar from "./sidebar";
import DashboardCard from './dashboardcardComponent';
const datatoken = localStorage.getItem('datatoken');
const coursedatafetch = JSON.parse(datatoken)
function StudentaddreviewComponent(token) {


    const [rating, setRating] = useState(0);

    const handleStarClick = (starIndex) => {
        // If the second star is clicked, automatically select the first star as well
        if (starIndex === 1) {
            setRating(2);  // Set rating to 2 (or whatever value represents both stars selected)
        } else {
            setRating(starIndex + 1);  // Increment rating normally for other stars
        }
    };


    return (
        <div>
            <section>
                <Navbarmenu />
            </section>

            <DashboardCard />
            <div class="dashboard--area-main pt--100 pt_sm--50">
                <div class="container">
                    <div class="row g-5">

                        <Sidebar />
                        <div class="col-lg-9">
                            <div class="calender-area-wrapper">
                                <h5 className='title'>Add Review</h5>

                                <hr />

                                <div className='mt-5 '>



                                    {coursedatafetch.Role.Name === "Guest/Viewer" ? (
                                        <div className="sociallocker">
                                            <div className="sociallocker-content">
                                                <form>
                                                    <div className='row mt-4'>
                                                        <div className='col-md-6 col-xl-6 col-lg-6'>
                                                            <label className='pb-2 labelss'>Select Course</label>
                                                            <select className='inputts' name="CategoryId" >
                                                                <option>UI/UX Design for Expert</option>
                                                                <option> Speaking Korean for Beginners</option>
                                                                <option>How to play the Guitar</option>
                                                                <option>UI/UX Design for Expert</option>
                                                            </select>
                                                        </div>
                                                        <div className='col-md-6 col-xl-6 col-lg-6'>
                                                            <label className='pb-2 labelss'>Select Date</label>
                                                            <input type='date' className='inputts' />
                                                        </div>
                                                    </div>
                                                    <div className='mt-5'>
                                                        <div className=''>


                                                            <label className='pb-2 labelss addreview'>Give Review</label>
                                                            <div className='text-center rating'>
                                                                {[...Array(5)].map((_, index) => (
                                                                    <i class="fa-solid fa-star-sharp ml--10" key={index}
                                                                        onClick={() => handleStarClick(index)}
                                                                        style={{ cursor: 'pointer', color: index < rating ? 'gold' : 'gray' }} ></i>))}

                                                            </div>


                                                        </div>

                                                    </div>
                                                    <div className='row mt-5'>
                                                        <div className='col-md-3 col-xl-3 col-lg-3'>
                                                            <Link to={'/addreview'} className='btnrs'>Submit</Link>
                                                        </div>
                                                    </div>
                                                    <div className="sociallocker-overlay">
                                                        <i className="fas fa-lock"></i> Unlock content to login with Instructor or Student.
                                                    </div>
                                                </form>
                                            </div>
                                        </div>

                                    ) : (<>   <form>   <div className='row mt-4'>
                                        <div className='col-md-6 col-xl-6 col-lg-6'>
                                            <label className='pb-2 labelss'>Select Course</label>
                                            <select className='inputts' name="CategoryId" >
                                                <option>UI/UX Design for Expert</option>
                                                <option> Speaking Korean for Beginners</option>
                                                <option>How to play the Guitar</option>
                                                <option>UI/UX Design for Expert</option>
                                            </select>
                                        </div>
                                        <div className='col-md-6 col-xl-6 col-lg-6'>
                                            <label className='pb-2 labelss'>Select Date</label>
                                            <input type='date' className='inputts' />
                                        </div>
                                    </div>
                                        <div className='mt-5'>
                                            <div className=''>


                                                <label className='pb-2 labelss addreview'>Give Review</label>
                                                <div className='text-center rating'>
                                                    {[...Array(5)].map((_, index) => (
                                                        <i class="fa-solid fa-star-sharp ml--10" key={index}
                                                            onClick={() => handleStarClick(index)}
                                                            style={{ cursor: 'pointer', color: index < rating ? 'gold' : 'gray' }} ></i>))}

                                                </div>


                                            </div>

                                        </div>
                                        <div className='row mt-5'>
                                            <div className='col-md-3 col-xl-3 col-lg-3'>
                                                <Link to={'/addreview'} className='btnrs'>Submit</Link>
                                            </div>
                                        </div> </form>
                                    </>)}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default StudentaddreviewComponent;