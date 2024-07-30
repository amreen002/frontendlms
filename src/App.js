import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
/* import Logins from './Routers/loginRouter'; */
import Dashboards from './Routers/dashboardsRouter';
import AddUserRouters from './Routers/addUserRouter';
import AccountUserRouters from './Routers/accountUserRouters.js';
import UserListRouters from './Routers/listUserRouters.js';
import UserViewsRouters from './Routers/viewsUserRouters.js';
import AddSaleTeamRouters from './Routers/addsaleteamRouters.js';
import TeleCallerRouters from './Routers/telecallerRouters.js';
import TeleCallerTeamRouters from './Routers/telecallerteamRouters.js';
import RoleRouters from './Routers/roleRouters.js';
import FrontDeskRouters from './Routers/frontdeskRouters.js';
import CoursesRouters from './Routers/CoursesRouters.js';
import FrontDeskListRouters from './Routers/frontdesklistRouters.js';
import CounselorDepartmentRouters from './Routers/counselordepartmentRouters.js';
import TeachersRouters from './Routers/teachersRouters.js';
import TeachersAddRouters from './Routers/teachersaddRouters.js';
import StudentRouters from './Routers/studentRouters.js';
import BatchesRouters from './Routers/batchesRouters';
import QuizzeRouters from "./Routers/quizzeRouters";
import CoursesReportsRouters from "./Routers/coursesreportsRouters";
import StudentsReportsRouters from "./Routers/studentsreportsRouters";
import CoursesViewRouters from "./Routers/coursesviewRouters";
import CoursesBatchesRouters from "./Routers/coursesbatchesRouters.js";
import CourseStudentsRouters from "./Routers/coursestudentsRouters.js"
import TopicRouters from "./Routers/topicRouters.js"
import LessionRouters from "./Routers/lessionRouters.js"
import VideoRouters from "./Routers/videoRouters.js"
import QuestionRouters from './Routers/questionRouters.js'
import QuestionCategoryRouters from './Routers/questioncategoryRouters.js'
import CourseCategoryRouters from './Routers/coursecategoryRouters.js'

import Home from './Routers/Home.js';
import AboutPages from './Routers/aboutRouter.js';
import Login from './Components/Login.js';
import InstructorDashboard from './Routers/instructordashboardRouters.js';
import InstructorCourse from './Routers/instructorcourseRouters.js';
import CoursedetailRouter from './Routers/coursedetailsRouter.js'
import InstructorUpdateCourse from './Routers/instructorcourseupdateRouters.js'
import LernerenrollcourseRouter from './Routers/lernerenrollcourseRouter.js'
import CompleteProfile from './Routers/completeprofileRouters.js';
import InstructoreaddquizeRouter from './Routers/instructoreaddquizeRouter.js'
import InstructorviewquizRouter from './Routers/instructorviewquizRouters.js'
import MultiplequestionRouter from './Routers/multiplequestionRouters.js'

import StudentQuestionViewRouter from './Routers/studentquestionviewRouters.js'
import StudentAddquestionRouter from './Routers/studentquizattemptRouter.js'

import SignupRouter from './Routers/signupRouter.js';
import Lsa from './Routers/Lsa.js';

import { CartProvider } from './Context/CartContext';
import CartComponent from './Components/Cart.js';
import CheckoutPage from './Components/CheckoutComponemt.js';
import UsersMyProfileRouter from './Routers/userprofileRouter.js'

import StudentwishlistRouter from './Routers/studenwishlistRouter.js';
import CalenderRouter from './Routers/calenderRouter.js'
import AssignmentRouter from './Routers/assignmentRouter.js'
import AnnouncementRouter from './Routers/annoucmentRouter.js';
import StudentsettingRouters from './Routers/studentsettingRouter.js'
import AssignmentdetailRouter from './Routers/assignmentdetailRouter.js'
import AnnouncementdetailRouter from './Routers/announcmentdetailRouter.js'
import StudentaddreviewRouter from './Routers/studentaddreviewRouter.js'
import AddQuestionsRouter from './Routers/addquestionsRouter.js'
import QuizeResultRouter from './Routers/quizresultRouter.js'
import AttempquestionRouter from './Routers/attemtedquestionRouter.js'
import StudentMaterialesRouter from './Routers/studentmaterialesRouter.js'
import EasyserviceRouter from './Routers/easyserviceRouter.js';


import QuizeUpdateRouter from './Routers/quizeupdateRouter.js';
import UpdatequestionRouter from './Routers/questionupdateRouter.js';
import UpdateSubjectRouter from './Routers/updatesubjectRouter.js';
import UpdateModelRouter from './Routers/updatemodelRouter.js';
import UpdateContentRouter from './Routers/updatecontentRouter.js';
import UpdatequestionsRouter from './Routers/updatequestionsingleRouter.js'
const { REACT_APP_API_ENDPOINT } = process.env;
// -----app-----------------------
function App() {
  const [datatoken, setdatatoken] = React.useState(JSON.parse(localStorage.getItem('datatoken')) || {});
  const token = localStorage.getItem('token');
  const [loggedIn, setLoggedIn] = useState(token ? true : false);

  useEffect(() => {
    if (datatoken) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [datatoken]);


  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post(`${REACT_APP_API_ENDPOINT}/login`, { email, password });
      let datatokendata = response.data.users;
      setdatatoken(datatokendata);

      localStorage.setItem('datatoken', JSON.stringify(datatokendata));
      localStorage.setItem('token', response.data.token);
      setLoggedIn(true);
      // Redirect after setting the loggedIn state
      if (datatokendata?.Role?.Name === 'Student' || datatokendata?.Role?.Name === 'Instructor'||datatoken?.Role?.Name ==='Guest/Viewer') {
        window.location.href = '/dashboard';
      } else if (['Administrator', 'Super Admin', 'Admin', 'Telecaller Department', 'Sale Department', 'Telecaller Team', 'Front Desk', 'Counselor Department', 'Account Department'].includes(datatokendata?.Role?.Name)) {
        window.location.href = '/dashboard/admin';
      } else {
        window.location.href = '/login';
      }
    } catch (error) {
      throw error
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setdatatoken(null);
    localStorage.removeItem('datatoken');
    localStorage.removeItem('token');
    window.location.href = '/'; // Redirect to login page
  };

  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/easyservice" element={<EasyserviceRouter />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPages />} />
          <Route path="/lsa" element={<Lsa />} />

          <Route path="/signup" element={<SignupRouter />} />

          <Route path="/createcourse/coursesId" element={<InstructorUpdateCourse />} />
          <Route path="/cart" element={<CartComponent />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />

          <Route
            path="/dashboard"
            element={
              loggedIn && (datatoken?.Role?.Name === 'Student' || datatoken?.Role?.Name === 'Instructor'||datatoken?.Role?.Name ==='Guest/Viewer') ? (
                <InstructorDashboard userData={datatoken} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/dashboard/admin"
            element={
              loggedIn && ['Super Admin', 'Admin', 'Telecaller Department', 'Administrator','Sale Department', 'Telecaller Team', 'Front Desk', 'Counselor Department', 'Account Department'].includes(datatoken?.Role?.Name) ? (
                <Dashboards userData={datatoken} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route path="*" element={<Navigate to="/login" />} />
         
          <Route
            path="/complete-profile/:usersId"
            element={<CompleteProfile />}
          />
          <Route
            path="/adduser"
            element={loggedIn === true ? (<AddUserRouters onLogout={handleLogout} />) : (<Navigate to="/login" />)}

          />
          <Route
            path="/accountusers"
            element={loggedIn === true ? (<AccountUserRouters onLogout={handleLogout} />) : (<Navigate to="/login" />)}

          />
          <Route
            path="/userlist"
            element={loggedIn === true ? (<UserListRouters onLogout={handleLogout} />) : (<Navigate to="/login" />)}
          />
          <Route
            path="/userviews/:usersId"
            element={loggedIn === true ? (<UserViewsRouters onLogout={handleLogout} />) : (<Navigate to="/login" />)}
          />
          <Route
            path="/addsaleteam"
            element={loggedIn === true ? (<AddSaleTeamRouters onLogout={handleLogout} />) : (<Navigate to="/login" />)}
          />
          <Route
            path="/addsaleteam/:saleteamId"
            element={loggedIn === true ? (<AddSaleTeamRouters onLogout={handleLogout} />) : (<Navigate to="/login" />)}
          />
          <Route
            path="/telecaller"
            element={loggedIn === true ? (<TeleCallerRouters onLogout={handleLogout} />) : (<Navigate to="/login" />)}
          />
          <Route
            path="/telecallerteam"
            element={loggedIn === true ? (<TeleCallerTeamRouters onLogout={handleLogout} />) : (<Navigate to="/login" />)}
          />
          <Route
            path="/role"
            element={loggedIn === true ? (<RoleRouters onLogout={handleLogout} />) : (<Navigate to="/login" />)}
          />
          <Route
            path="/role/:roleId"
            element={loggedIn === true ? (<RoleRouters onLogout={handleLogout} />) : (<Navigate to="/login" />)}
          />
          <Route
            path="/courses"
            element={loggedIn === true ? (<CoursesRouters onLogout={handleLogout} />) : (<Navigate to="/login" />)}
          />
          <Route
            path="/courses/:coursesId"
            element={loggedIn === true ? (<CoursesRouters onLogout={handleLogout} />) : (<Navigate to="/login" />)}
          />
          <Route
            path="/coursesreports"
            element={loggedIn === true ? (<CoursesReportsRouters onLogout={handleLogout} />) : (<Navigate to="/login" />)}
          />
          <Route
            path="/couresview/:coursecodeId"
            element={loggedIn === true ? (<CoursesViewRouters onLogout={handleLogout} />) : (<Navigate to="/login" />)}
          />
          <Route
            path="/couresbatches/:coursecodeId"
            element={loggedIn === true ? (<CoursesBatchesRouters onLogout={handleLogout} />) : (<Navigate to="/login" />)}
          />
          <Route
            path="/couresstudents/:coursecodeId"
            element={loggedIn === true ? (<CourseStudentsRouters onLogout={handleLogout} />) : (<Navigate to="/login" />)}
          />
          <Route
            path="/frontdesk"
            element={loggedIn === true ? (<FrontDeskRouters onLogout={handleLogout} />) : (<Navigate to="/login" />)}
          />
          <Route
            path="/frontdesklist"
            element={loggedIn === true ? (<FrontDeskListRouters onLogout={handleLogout} />) : (<Navigate to="/login" />)}
          />
          <Route
            path="/frontdesklist/:frontdeskId"
            element={loggedIn === true ? (<FrontDeskListRouters onLogout={handleLogout} />) : (<Navigate to="/login" />)}
          />
          <Route
            path="/counselordepartment"
            element={loggedIn === true ? (<CounselorDepartmentRouters onLogout={handleLogout} />) : (<Navigate to="/login" />)}
          />
          <Route
            path="/teachers"
            element={loggedIn === true ? (<TeachersRouters onLogout={handleLogout} />) : (<Navigate to="/login" />)}
          />
          <Route
            path="/teachers/:teachersId"
            element={loggedIn === true ? (<TeachersRouters onLogout={handleLogout} />) : (<Navigate to="/login" />)}
          />
          <Route
            path="/addteachers"
            element={loggedIn === true ? (<TeachersAddRouters onLogout={handleLogout} />) : (<Navigate to="/login" />)}
          />
          <Route
            path="/students"
            element={loggedIn === true ? (<StudentRouters onLogout={handleLogout} />) : (<Navigate to="/login" />)}
          />
          <Route
            path="/students/:studentsId"
            element={loggedIn === true ? (<StudentRouters onLogout={handleLogout} />) : (<Navigate to="/login" />)}
          />
          <Route
            path="/studentsreports"
            element={loggedIn === true ? (<StudentsReportsRouters onLogout={handleLogout} />) : (<Navigate to="/login" />)}
          />
          <Route
            path="/batches"
            element={loggedIn === true ? (<BatchesRouters onLogout={handleLogout} />) : (<Navigate to="/login" />)}
          />
          <Route
            path="/batches/:batchesId"
            element={loggedIn === true ? (<BatchesRouters onLogout={handleLogout} />) : (<Navigate to="/login" />)}
          />
          <Route
            path="/quizzes"
            element={loggedIn === true ? (<QuizzeRouters onLogout={handleLogout} />) : (<Navigate to="/login" />)}
          />
          <Route
            path="/quizzes/:quizzeId"
            element={loggedIn === true ? (<QuizzeRouters onLogout={handleLogout} />) : (<Navigate to="/login" />)}
          />
          <Route
            path="/topic"
            element={loggedIn === true ? (<TopicRouters onLogout={handleLogout} />) : (<Navigate to="/login" />)}
          />
          <Route
            path="/topic/:topicId"
            element={loggedIn === true ? (<TopicRouters onLogout={handleLogout} />) : (<Navigate to="/login" />)}
          />
          <Route
            path="/lession"
            element={loggedIn === true ? (<LessionRouters onLogout={handleLogout} />) : (<Navigate to="/login" />)}
          />
          <Route
            path="/lession/:lessionId"
            element={loggedIn === true ? (<LessionRouters onLogout={handleLogout} />) : (<Navigate to="/login" />)}
          />
          <Route
            path="/video"
            element={loggedIn === true ? (<VideoRouters onLogout={handleLogout} />) : (<Navigate to="/login" />)}
          />
          <Route
            path="/video/:videoId"
            element={loggedIn === true ? (<VideoRouters onLogout={handleLogout} />) : (<Navigate to="/login" />)}

          />
          <Route
            path="/question"
            element={loggedIn === true ? (<QuestionRouters onLogout={handleLogout} />) : (<Navigate to="/login" />)}


          />
          <Route
            path="/question/:questionId"
            element={loggedIn === true ? (<QuestionRouters onLogout={handleLogout} />) : (<Navigate to="/login" />)}

          />
          <Route
            path="/questioncategory"
            element={loggedIn === true ? (<QuestionCategoryRouters onLogout={handleLogout} />) : (<Navigate to="/login" />)}

          />
          <Route
            path="/questioncategory/:questionscategoryId"
            element={loggedIn === true ? (<QuestionCategoryRouters onLogout={handleLogout} />) : <Login onLogin={handleLogin} />}
          />
          <Route
            path="/coursecategory"
            element={loggedIn === true ? (<CourseCategoryRouters onLogout={handleLogout} />) : (<Login onLogin={handleLogin} />)}
          />
          <Route
            path="/coursecategory/:categoriesId"
            element={loggedIn === true ? (<CourseCategoryRouters onLogout={handleLogout} />) : <Login onLogin={handleLogin} />}
          />
          <Route
            path="/coursedetails/:coursesId"
            element={<CoursedetailRouter />}
          />
         {/*  <Route
            path="/createcourse/:coursesId"
            element={loggedIn === true ? (<InstructorUpdateCourse onLogout={handleLogout} />) : <Login onLogin={handleLogin} />} />
 */}
          <Route
            path="/createcourse"
            element={loggedIn === true ? (<InstructorCourse onLogout={handleLogout} />) : <Login onLogin={handleLogin} />} />
          <Route
            path="/lernerenrollcourse"
            element={loggedIn === true ? (<LernerenrollcourseRouter onLogout={handleLogout} />) : <Login onLogin={handleLogin} />} />
          <Route
            path="/instructor/addquize"
            element={loggedIn === true ? (<InstructoreaddquizeRouter onLogout={handleLogout} />) : <Login onLogin={handleLogin} />} />
          <Route
            path="/instructor/viewquize"
            element={loggedIn === true ? (<InstructorviewquizRouter onLogout={handleLogout} />) : <Login onLogin={handleLogin} />}
          />
          <Route
            path="/instructorquestion/:quizzeId"
            element={loggedIn === true ? (<MultiplequestionRouter onLogout={handleLogout} />) : <Login onLogin={handleLogin} />}
          />

          <Route
            path="/student/question"
            element={loggedIn === true ? (<StudentQuestionViewRouter onLogout={handleLogout} />) : <Login onLogin={handleLogin} />}
          />
          <Route
            path="/student/addquestion"
            element={loggedIn === true ? (<StudentAddquestionRouter onLogout={handleLogout} />) : (<Login onLogin={handleLogin} />)} />
          <Route
            path="/user-my-profile/:usersId"
            element={loggedIn === true ? (<UsersMyProfileRouter onLogout={handleLogout} />) : (<Login onLogin={handleLogin} />)} />
          <Route
            path="/addquestions"
            element={loggedIn === true ? (<AddQuestionsRouter onLogout={handleLogout} />) : (<Login onLogin={handleLogin} />)} />

          <Route
            path="/studentwishlist"
            element={<StudentwishlistRouter />} />
          <Route
            path="/studentaddreview"
            element={<StudentaddreviewRouter />} />


          <Route
            path="/calender"
            element={<CalenderRouter />} />
          <Route
            path="/instructor/assignment"
            element={loggedIn===true?(<AssignmentRouter onLogout={handleLogout}/>):(<Login onLogin={handleLogin}/>)} />

          <Route
            path="/announcement"
            element={<AnnouncementRouter />} />

          <Route
            path="/studentsetting"
            element={<StudentsettingRouters />} />

          <Route
            path="/assignmentdetail"
            element={<AssignmentdetailRouter />} />
          <Route
            path="/announcementdetails"
            element={<AnnouncementdetailRouter />} />
          <Route
            path="/quizetresult/:studentquizeId"
            element={loggedIn === true ? (<QuizeResultRouter  onLogout={handleLogout} />) : (<Login onLogin={handleLogin} />)} />
          <Route path='/attemptquestion' element={loggedIn === true ? (<AttempquestionRouter  onLogout={handleLogout} />) : (<Login onLogin={handleLogin} />)} />
          <Route path='/studentmateriales/:coursesId' element={loggedIn === true ? (<StudentMaterialesRouter  onLogout={handleLogout} />) : (<Login onLogin={handleLogin} />)} />
          <Route path='/quizeupdate/:quizzeId'   element={loggedIn === true ? (<QuizeUpdateRouter onLogout={handleLogout} />) : (<Login onLogin={handleLogin} />)} />
          <Route path='/updatequestion/:quizzeId/:questionId'  element={loggedIn === true ? (<UpdatequestionRouter  onLogout={handleLogout} />) : (<Login onLogin={handleLogin} />)} />
          <Route path='/updatequestion/:questionId'  element={loggedIn === true ? (<UpdatequestionsRouter  onLogout={handleLogout} />) : (<Login onLogin={handleLogin} />)} />
          <Route path='/updatesubject/:topicId'   element={loggedIn === true ? (<UpdateSubjectRouter onLogout={handleLogout} />) : (<Login onLogin={handleLogin} />)} />
          <Route path='/updatemodel/:lessionId'   element={loggedIn === true ? (<UpdateModelRouter onLogout={handleLogout} />) : (<Login onLogin={handleLogin} />)} />
          <Route path='/updatecontent/:videoId'   element={loggedIn === true ? (<UpdateContentRouter onLogout={handleLogout} />) : (<Login onLogin={handleLogin} />)} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;