const ValidationInstructorcourse=(formDataCourse)=>{
 

    if (!formDataCourse || typeof formDataCourse !== 'object') {
        throw new Error('Invalid formDataCourse object passed to validation function');
    }
    let error ={}
    if(!formDataCourse.name){
        formDataCourse.name='Name is require'
    }
    if(!formDataCourse.CoursePrice){
        formDataCourse.CoursePrice='Course Price is require'
    }
    if(!formDataCourse.CourseDuration){
        formDataCourse.CourseDuration='Course Duration is require'
    }
    if(!formDataCourse.CourseCategoryId){
        formDataCourse.CourseCategoryId='Course Category is require'
    }
    if(!formDataCourse.CourseUplod){
        formDataCourse.CourseUplod='Course Uplod is require'
    }
    if(!formDataCourse.AboutCourse){
        formDataCourse.AboutCourse='About Course is require'
    }
    if(!formDataCourse.Description){
        formDataCourse.Description='Description is require'
    }

    return error
}
export default ValidationInstructorcourse