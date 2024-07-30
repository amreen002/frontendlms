import React from "react";

function CreateCoureComponent({closeCourse}) {


    return (
        <>
      <div class="modal-content " tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <button type="button"  class="btn-close" onClick={closeCourse}></button>
                            <form>
                            <div className="row create_course">
                                <div className="col-12 col-md-6 col-lg-6 col-xl-6 p-3">
                                <div className="single-input">
                                        <label htmlFor="name" className="form-label">Class Title</label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="Class 6th/Class 7th/Class 8th"
                                        />
                                    </div>

                                </div>
                                <div className="col-12 col-md-6 col-lg-6 col-xl-6 p-3">
                                <div className="single-input">
                                        <label htmlFor="slug" className="form-label">Class Price</label>
                                        <input
                                            type="number"
                                            id="slug"
                                            placeholder="Class Price"
                                            name="CoursePrice"
                                           
                                        />
                                    </div>

                                </div>
                                <div className="col-12 col-md-6 col-lg-6 col-xl-6 p-3">
                                <div className="single-input">
                                        <label htmlFor="duration" className="form-label">Class Duration (Days)</label>
                                        <input
                                            type="number"
                                            id="duration"
                                            placeholder="Class Duration"
                                            name="CourseDuration"
                                         
                                        />
                                    </div>

                                </div>
                                <div className="col-12 col-md-6 col-lg-6 col-xl-6 p-3">
                                <div className="single-input">
                                        <label htmlFor="exampleFormControlSelect2" className="form-label">Class Category</label>
                                        <select
                                            id="exampleFormControlSelect2"
                                            className="select2 form-select"
                                            name="CourseCategoryId"
                                          
                                            placeholder="MP/CSBC/ICSE (Board)"
                                        >
                                            <option value="">Select MP/CSBC/ICSE (Board)</option>
                                           
                                        </select>
                                    </div>

                                </div>
                                <div className="col-12 col-md-6 col-lg-6 col-xl-6 p-3">
                                <div className="single-input">
                                        <label class="form-label">Upload Image</label>
                                        <input
                                            type="file"
                                            class="form-control"
                                            id="inputGroupFile04"
                                            aria-describedby="inputGroupFileAddon04"
                                            aria-label="Upload"
                                            name="file"
                                            
                                        /> </div>

                                </div>
                                <div className="col-12 col-md-6 col-lg-6 col-xl-6 p-3">
                                <div className="single-input">
                                        <label class="form-label">About Class</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            name="AboutCourse"
                                            placeholder="About Class Content"
                                           
                                        /> </div>


                                </div>
                                <div className="col-12 col-md-6 col-lg-6 col-xl-6 p-3">
                                <div className="single-input">
                                        <label class="form-label">Description</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            name="Description"
                                            placeholder="Description Class Content"
                                           
                                        /> </div>

                                </div>
                                <div class="col-12 col-lg-12 col-md-12 single-input d-flex">
                                        <button type="submit" class="btn btn-primary data-submit">Submit</button>
                                        <button type="reset" class="btn btn-label-secondary" data-bs-dismiss="#collapseOne" aria-label="Close">Cancel</button>
                                        </div>
                            </div>
                           
                            </form>
              </div>
        </>
    )
}
export default CreateCoureComponent