import React from "react";
import { useState } from "react";
import Footer from './footerComponent';
import Navbar from './navComponemt';
import DashBoardMenus from './dashboardsMenuComponent';
import { Button, Form } from 'react-bootstrap';
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import Draggable from '../Components/draggableComponent';
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

function SteperformComponent() {

    const [step, setStep] = useState(1);

    const handleNext = () => {
        if (step < 7) setStep((prevStep) => prevStep + 1);
    };

    const handlePrevious = () => {
        if (step > 1) setStep((prevStep) => prevStep - 1);
    };

    const handleSubmit = () => {
        // Handle form submission
        console.log('Form submitted!');
        setStep(7); // Move to final step after submission
    };

    const [tasks, setTasks] = useState([
        { id: 1 },
        { id: 2 },
        { id: 3 },
    ])
    const getTaskPos = id => tasks.findIndex(
        task => task.id == id
    )
    const [newIndexId, setNewIndexId] = useState(null);
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active && over && active.id !== over.id) {
            setTasks((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                console.log(newIndex)
                setNewIndexId(items[newIndex].id)
                return arrayMove(items, oldIndex, newIndex);
               
            });
        
        }
    };

    return (
        <>
            <div class="layout-wrapper layout-content-navbar">
                <div class="layout-container">
                    {/*      <!-- Menu --> */}
                    <DashBoardMenus />
                    {/*         <!-- / Menu --> */}

                    {/*     <!-- Layout container --> */}
                    <div class="layout-page">

                        <Navbar />

                        <div class="content-wrapper">


                            <div class="container-xxl flex-grow-1 container-p-y">



                                <div class="row g-4 mb-4">
                                    <div class="col-sm-4 col-xl-4">
                                        <div class="card crd_detil">
                                            <div class="card-body">
                                                <div class="d-flex align-items-start justify-content-between">
                                                    <div class="content-left">
                                                        <span>Lead Details</span>
                                                        <div class="d-flex align-items-end mt-2">
                                                            <h4 class="mb-0 me-2">SuperAdmin</h4>

                                                        </div>
                                                        <div className="row mt-2">
                                                            <div className="col-12 col-xl-4 col-lg-4 col-md-4">
                                                                <div className="d-flex">
                                                                    <p className="mb--0"> <i class="bx bx-envelope bx-sm"></i> </p><p>Supedmin@gmail.com</p>
                                                                </div>
                                                                <div className="d-flex">
                                                                    <p><i class="bx bx-phone bx-sm"></i></p>  <p>9876543210</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-xl-8 col-lg-8 col-md-8 text-end">

                                                                <p className="mb--0"> <span>Added On :</span> <span>01/07/2024 </span><span></span></p>
                                                                <p className="text-center"><span> Laste Active :</span><span>NA</span></p>

                                                            </div>
                                                        </div>



                                                    </div>
                                                    <div class="avatar">
                                                        <span class="avatar-initial rounded bg-label-primary">
                                                            <i class="bx bx-user bx-sm"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6 col-xl-2">
                                        <div class="card crd_scor">
                                            <div class="card-body card_body">
                                                <div class=" align-items-start justify-content-evenly lead_sore text-center">
                                                    <p className="mb--0 ">3</p><p>Lead Score</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card mt-2">
                                            <div class="card-body card_body">
                                                <div class=" align-items-start justify-content-evenly lead_sore text-center ">
                                                    <p className="mb--0">0%</p><p>Lead Strength</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6 col-xl-3">
                                        <div class="card crd_stat">
                                            <div class="card-body">
                                                <div class="d-flex align-items-start justify-content-between">
                                                    <div class="content-left">
                                                        <span>Communication Status</span>
                                                        <div class="d-flex align-items-end mt-2">
                                                            <p className="mb--0"><span>Email Sent : </span> <span> 0</span></p>
                                                            <p ><span className="ml--40">SMS Sent :</span> <span> 0</span></p>
                                                        </div>
                                                        <div class="d-flex align-items-end mt-2">

                                                            <p className=""><span>Whatsapp Sent : </span> <span> 0</span></p>
                                                        </div>

                                                        <div class="d-flex align-items-end mt-2">
                                                            <p><span>Upcoming Followup :</span> <span>NA</span></p>
                                                        </div>
                                                    </div>
                                                    <div class="avatar">
                                                        <span class="avatar-initial rounded bg-label-success">
                                                            <i class="bx bx-group bx-sm"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6 col-xl-3">
                                        <div class="card card_telephony">
                                            <div class="card-body">
                                                <div class="d-flex align-items-start justify-content-between">
                                                    <div class="content-left">
                                                        <span>Telephony Status</span>
                                                        <div class="d-flex align-items-end ">
                                                            <p><span>Inbound Call : </span> <span> 0</span></p>
                                                        </div>
                                                        <div class="d-flex align-items-end">
                                                            <p className="mb--0"><span>Outbound Call :</span> <span> 0</span></p>

                                                        </div>
                                                        <div class=" align-items-end">
                                                            <span>Lead Source</span>

                                                            <p><span>Offline :</span> <span>Expo</span></p>
                                                        </div>
                                                    </div>
                                                    <div class="avatar">
                                                        <span class="avatar-initial rounded bg-label-warning">
                                                            <i class="bx bx-user-voice bx-sm"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-12 col-md-1 col-xl-1 col-lg-1">
                                                <div className="stepper-steps ">
                                                    <div className={`step ${step === 1 ? 'active' : 'bx bx-check tf-icons chek_icon'}`}> <span className={`step ${step === 1 ? 'active disply' : 'displys'}`}>1</span></div>
                                                    <div className={`line ${step > 1 ? 'active' : ''}`}></div>
                                                    <div className={`step step_line ${step === 2 ? 'active' : ''}`}> 2</div>
                                                    <div className={`line ${step > 2 ? 'active' : ''}`}></div>
                                                    <div className={`step step_line ${step === 3 ? 'active' : ''}`}> 3</div>
                                                    <div className={`line ${step > 3 ? 'active' : ''}`}></div>
                                                    <div className={`step step_line ${step === 4 ? 'active' : ''}`}> 4</div>
                                                    <div className={`line ${step > 4 ? 'active' : ''}`}></div>
                                                    <div className={`step step_line ${step === 5 ? 'active' : ''}`}>5</div>
                                                    <div className={`line ${step > 5 ? 'active' : ''}`}></div>
                                                    <div className={`step step_line ${step === 6 ? 'active' : ''}`}>6</div>
                                                    <div className={`line ${step > 6 ? 'active' : ''}`}></div>
                                                    <div className={`step step_line ${step === 7 ? 'active' : ''}`}>7</div>


                                                </div>
                                            </div>
                                            <div className="col-12 col-md-11 col-xl-11 col-lg-11 ">
                                                <Form className="stepper-form ">
                                                    {step === 1 && (
                                                        <div className="step-content">
                                                            <div>

                                                                <div className="row">

                                                                    <div className="col-12 col-md-5 col-xl-5 col-lg-5 mt-3">
                                                                        <div className="card_details ">
                                                                            <h2>Lead Details</h2>
                                                                            <div className="mb-3">
                                                                                <div className=" d-felx colored">
                                                                                    <i class="bx bx-check-double menu-icon tf-icons mb-1"></i>
                                                                                    <span>Verified Lead</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="carde_img d-flex">
                                                                                <i class="bx bx-user bx-lg"></i>
                                                                                <div className="mt-2 ml--20">
                                                                                    <p className="mb--0">Super Admin</p>
                                                                                    <p>superadmin@gmail.com</p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="mt-3">
                                                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo
                                                                                    pulvinar dapibus leo.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>

                                                                                <div className="row">
                                                                                    <div className="col-12 col-xl-9 col-lg-9 col-md-9 ">
                                                                                        <div className="d-flex">
                                                                                            <p> <i class="bx bx-calendar menu-icon tf-icons lead3"></i><span>01/11/2023</span></p>
                                                                                            <p className="ml--30"> <i class="bx bx-briefcase menu-icon tf-icons lead3"></i><span>Employee</span></p>
                                                                                        </div>
                                                                                        <div className="d-flex ">
                                                                                            <p>  <i class="bx bx-phone menu-icon tf-icons lead3"></i><span>9876543210</span></p>
                                                                                            <p className="ml--30"> <i class="bx bx-group menu-icon tf-icons lead3"></i><span>Lead Plateform</span></p>
                                                                                        </div>

                                                                                    </div>
                                                                                    <div className="col-12 col-xl-3 col-lg-3 col-md-3 mt-4">
                                                                                        <Button variant="primary" onClick={handleNext}>Next</Button>
                                                                                    </div>
                                                                                    <div className="col-12 col-md-10 col-lg-10 col-xl-10">

                                                                                    </div>
                                                                                    <div className="col-12 col-md-2 col-lg-2 col-xl-2">

                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 col-md-3 col-xl-3 col-lg-3">

                                                                    </div>
                                                                </div>


                                                            </div>


                                                        </div>

                                                    )}

                                                    {step === 2 && (
                                                        <div className="step-content">
                                                            <div className="row">
                                                                <div className="col-12 col-md-5 col-xl-5 col-lg-5">
                                                                    <div className=" card_details ">
                                                                    <h2>Re-assing Lead</h2>
                                                                   
                                                                        <div className="mt-5"> 
                                                                            <form id={setNewIndexId}>
                                                                                <div>
                                                                                
                                                                                    <div className=' mt-5'>
                                                                                        <label className='pb-2'>Head Owner(s) - Assigned from</label>
                                                                                        <select>
                                                                                            <option>Option 1</option>
                                                                                            <option>Option 2</option>
                                                                                            <option>Option 3</option>
                                                                                            <option>Option 3</option>
                                                                                            </select>
                                                                                    </div>
                                                                                    <div className='mt-5'>
                                                                                        <label className='pb-2'>Head Owner(s)  - Assigned to</label>
                                                                                        <select>
                                                                                            <option>Option 1</option>
                                                                                            <option>Option 2</option>
                                                                                            <option>Option 3</option>
                                                                                            <option>Option 3</option>
                                                                                        </select>
                                                                                    </div>
                                                                                    <div className='mt-5'>
                                                                                        <label className='pb-2'>Re-assignment Remark</label>
                                                                                        <input className='inputts' type='text' placeholder='Re-assignment Remark' name="TotalQuestions" />
                                                                                    </div>
                                                                                    <div className="col-12 col-md-2 col-xl-2 col-lg-2 mt-3">
                                                                                    <button className="btn btn-primary">Submit</button>
                                                                                    </div>
                                                                                </div>
                                                                            </form>
                                                                        </div>
                                                                  
                                                                    </div>
                                                                    <div className="col-12 col-md-2 col-xl-2 col-lg-2 d-flex mt-3">
                                                                        <Button variant="secondary" onClick={handlePrevious}>Previous</Button>
                                                                        <Button className="ml--20" variant="primary" onClick={handleNext}>Next</Button>
                                                                    </div>
                                                                </div>
                                                                <div className="col-12 col-md-7 col-xl-7 col-lg-7">
                                                                    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
                                                                       
                                                                        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
                                                                            {tasks.map((tasks) => (
                                                                                 <Draggable
                                                                                 key={tasks.id}
                                                                                 id={tasks.id}
                                                                                 
                                                                                 component={
                                                                                <div key={tasks.id}>
                                                                                    <div className="long_card py-3 mt-2">
                                                                                        <div className="row">
                                                                                            <div className="col-12 col-xl-2 col-lg-2 col-md-2 date_col">
                                                                                                <div className="">
                                                                                                    <p className="dates">04 jun 2024</p>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="col-12 col-xl-8 col-lg-8 col-md-8">
                                                                                                <div>
                                                                                                    <p className="namee">Super Admin</p>
                                                                                                    <div>
                                                                                                        <span>superadmin@gmail.com</span>
                                                                                                        <span className="ml--10">9876543210</span>
                                                                                                    </div>
                                                                                                    <div>
                                                                                                        <span>Employee</span>
                                                                                                        <span className="ml--10">Lead Plateform</span>
                                                                                                    </div>
                                                                                                    <p className="mt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="col-12 col-xl-2 col-lg-2 col-md-2 date_col">
                                                                                                <button className="btn btn-primary">Next</button>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>}
                                                                                />
                                                                            ))}
                                                                        </SortableContext>
                                                                    </DndContext>
                                                                </div>
                                                            </div>


                                                        </div>
                                                    )}

                                                    {step === 3 && (
                                                        <div className="step-content">
                                                            <Form.Group controlId="formBasicPassword">
                                                                <Form.Label>Password</Form.Label>
                                                                <Form.Control type="password" placeholder="Password" />
                                                            </Form.Group>
                                                            <Button variant="secondary" onClick={handlePrevious}>Previous</Button>
                                                            <Button variant="primary" onClick={handleNext}>Next</Button>
                                                        </div>
                                                    )}
                                                    {step === 4 && (
                                                        <div className="step-content">
                                                            <Form.Group controlId="formBasicPassword">
                                                                <Form.Label>Password</Form.Label>
                                                                <Form.Control type="password" placeholder="Password" />
                                                            </Form.Group>
                                                            <Button variant="secondary" onClick={handlePrevious}>Previous</Button>
                                                            <Button variant="primary" onClick={handleNext}>Next</Button>
                                                        </div>
                                                    )}
                                                    {step === 5 && (
                                                        <div className="step-content">
                                                            <Form.Group controlId="formBasicPassword">
                                                                <Form.Label>Password</Form.Label>
                                                                <Form.Control type="password" placeholder="Password" />
                                                            </Form.Group>
                                                            <Button variant="secondary" onClick={handlePrevious}>Previous</Button>
                                                            <Button variant="primary" onClick={handleNext}>Next</Button>
                                                        </div>
                                                    )}
                                                    {step === 6 && (
                                                        <div className="step-content">
                                                            <Form.Group controlId="formBasicPassword">
                                                                <Form.Label>Password</Form.Label>
                                                                <Form.Control type="password" placeholder="Password" />
                                                            </Form.Group>
                                                            <Button variant="secondary" onClick={handlePrevious}>Previous</Button>
                                                            <Button variant="primary" onClick={handleNext}>Next</Button>
                                                        </div>
                                                    )}
                                                    {step === 7 && (
                                                        <div className="step-content">
                                                            <Form.Group controlId="formBasicCheck">
                                                                <Form.Check type="checkbox" label="Agree to terms and conditions" />
                                                            </Form.Group>
                                                            <Button variant="secondary" onClick={handlePrevious}>Previous</Button>
                                                            <Button variant="primary" onClick={handleSubmit}>Submit</Button>
                                                        </div>
                                                    )}
                                                </Form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*  <!-- Footer --> */}

                            <Footer />

                            {/*      <!-- / Footer --> */}

                        </div >
                    </div >
                    {/*     <!-- Overlay --> */}
                    < div class="layout-overlay layout-menu-toggle" ></div >
                </div >
                {/* / Layout wrapper  */}

            </div >
        </>
    )
}
export default SteperformComponent