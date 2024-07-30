import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Navbarmenu from "./Navbarmenu";
import Sidebar from "./sidebar";
import PopupComponent from './popupComponent';
import CreateAnnouncement from './createannouncement';
import DashboardCard from './dashboardcardComponent';
function AnnouncementComponent() {
 

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };



  return (
    <div>
      <section>
        <Navbarmenu />
      </section>
<DashboardCard/>

      <div class="dashboard--area-main pt--100 pt_sm--50">
        <div class="container">
          <div class="row g-5">

            <Sidebar />
            <div class="col-lg-9">
                   <div style={{backgroundColor:"#fff"}}>
                   <div class="announcements-wrapper-dashed">
                        <div class="top-announcement-wrapper">
                            <div class="left-wrapper">
                                <div class="icon">
                                    <img src="assets/fontend/images/dashboard/announcement/01.png" alt="announcement"/>
                                </div>
                                <div class="information">
                                    <span >Create Announcement</span>
                                    <p>Notify all students of your course</p>
                                </div>
                            </div>
                            <div class="right"  onClick={openPopup}>
                                <button class="rts-btn btn-primary" >Add New Announcement  <i class="fa-add fa-light" ></i> </button>
                            </div>
                        </div>
                        <div class="course-short-by-date-wrapper">
                            <div class="single-course-filter">
                                <span>Course</span>
                                <select class="nice-select inputts" name="price">
                                    <option>Read (12)</option>
                                    <option value="asc">Stars (30)</option>
                                    <option value="desc">Comments(42)</option>
                                    <option value="pop">Popularity (20)</option>
                                    <option value="low">Questions & Ans (10)</option>
                                    <option value="high">Stars (52)</option>
                                </select>
                            </div>
                            <div class="single-course-filter short-by">
                                <span>Course</span>
                                <select class="nice-select inputts" name="price">
                                    <option>Read (12)</option>
                                    <option value="asc">Stars (30)</option>
                                    <option value="desc">Comments(42)</option>
                                    <option value="pop">Popularity (20)</option>
                                    <option value="low">Questions & Ans (10)</option>
                                    <option value="high">Stars (52)</option>
                                </select>
                            </div>
                            <div class="single-course-filter short-by">
                                <span>Date</span>
                                <div class="date-picker-area">
                                    <input type='date' className='inputts'/>
                                  
                                </div>
                            </div>
                        </div>
                        <div class="rts-reviewd-area-dashed table-responsive" style={{whiteSpace:" nowrap;"}}>
                            <table class="table-reviews quiz announcement">
                                <thead>
                                    <tr>
                                    <th style={{width: "30%;"}}>Date</th>
                                        <th>Announcements</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div class="information-quiz">
                                                <span>November 28, 2023</span>
                                                <p class="quiz">9:20 pm</p>
                                            </div>
                                        </td>
                                        <td class="announcement-1">
                                            <div class="left">
                                                <p>Recently Update Web Design Course</p>
                                                <span>Course: New Courses</span>
                                            </div>
                                            <div class="right">
                                              <Link to={'/announcementdetails'}> <button class="rts-btn btn-primary">Details</button></Link> 
                                                <i class="fa-regular fa-ellipsis-vertical"></i>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="information-quiz">
                                                <span>November 28, 2023</span>
                                                <p class="quiz">9:20 pm</p>
                                            </div>
                                        </td>
                                        <td class="announcement-1">
                                            <div class="left">
                                                <p>Recently Update Web Design Course</p>
                                                <span>Course: New Courses</span>
                                            </div>
                                            <div class="right">
                                            <Link to={'/announcementdetails'}> <button class="rts-btn btn-primary">Details</button></Link> 
                                            <i class="fa-regular fa-ellipsis-vertical"></i>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="information-quiz">
                                                <span>November 28, 2023</span>
                                                <p class="quiz">9:20 pm</p>
                                            </div>
                                        </td>
                                        <td class="announcement-1">
                                            <div class="left">
                                                <p>Recently Update Web Design Course</p>
                                                <span>Course: New Courses</span>
                                            </div>
                                            <div class="right">
                                            <Link to={'/announcementdetails'}> <button class="rts-btn btn-primary">Details</button></Link> 
                                            <i class="fa-regular fa-ellipsis-vertical"></i>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="information-quiz">
                                                <span>November 28, 2023</span>
                                                <p class="quiz">9:20 pm</p>
                                            </div>
                                        </td>
                                        <td class="announcement-1">
                                            <div class="left">
                                                <p>Recently Update Web Design Course</p>
                                                <span>Course: New Courses</span>
                                            </div>
                                            <div class="right">
                                            <Link to={'/announcementdetails'}> <button class="rts-btn btn-primary">Details</button></Link> 
                                            <i class="fa-regular fa-ellipsis-vertical"></i>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="information-quiz">
                                                <span>November 28, 2023</span>
                                                <p class="quiz">9:20 pm</p>
                                            </div>
                                        </td>
                                        <td class="announcement-1">
                                            <div class="left">
                                                <p>Recently Update Web Design Course</p>
                                                <span>Course: New Courses</span>
                                            </div>
                                            <div class="right">
                                            <Link to={'/announcementdetails'}> <button class="rts-btn btn-primary">Details</button></Link> 
                                            <i class="fa-regular fa-ellipsis-vertical"></i>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="information-quiz">
                                                <span>November 28, 2023</span>
                                                <p class="quiz">9:20 pm</p>
                                            </div>
                                        </td>
                                        <td class="announcement-1">
                                            <div class="left">
                                                <p>Recently Update Web Design Course</p>
                                                <span>Course: New Courses</span>
                                            </div>
                                            <div class="right">
                                            <Link to={'/announcementdetails'}> <button class="rts-btn btn-primary">Details</button></Link> 
                                            <i class="fa-regular fa-ellipsis-vertical"></i>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="pagination-full-width">
                                <span>Page 1 of 4</span>
                                <div class="pagination">
                                    <ul>
                                        <li><a href="#0" class="prev"><i class="fa-solid fa-chevron-left"></i></a></li>
                                        <li><a href="#0">1</a></li>
                                        <li><a href="#0">2</a></li>
                                        <li><a href="#0">3</a></li>
                                        <li><a href="#0">4</a></li>
                                        <li><a href="#0" class="next"><i class="fa-solid fa-chevron-right"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                   </div>
                </div>
          </div>
        </div>
      </div>
      {isPopupOpen &&  
    <div className=' login-pupup-modal  modal-backdropss  'tabindex="-1" aria-labelledby="exampleModalLabel" style={{display: 'block', paddingRight: '17px'}} aria-modal="true" role="dialog">
    <div className=' modal-dialog modalzs'>
                                   <CreateAnnouncement closePopup={closePopup} />

                                      </div></div>}
    
    </div>
  );
}

export default AnnouncementComponent;