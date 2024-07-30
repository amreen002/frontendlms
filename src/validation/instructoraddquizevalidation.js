
const ValidationInstructoraddquize =(formData) => {

    let error ={}
    if(!formData.QuizzName){
        error.QuizzName ="Quizz Name is require"
    } 
    if(!formData.QuizzStartTime){
        error.QuizzStartTime ="Quizz Start Time is require"
    } 
    if(!formData.QuizzEndTime){
        error.QuizzEndTime ="Quizz End Time is require"
    } 
    if(!formData.QuizzTestDuration){
        error.QuizzTestDuration ="Quizz Test Duration Time is require"
    } 
    if(!formData.EasyQuestions){
        error.EasyQuestions ="Number of Easy Question is require"
    } 
    if(!formData.MediumQuestions){
        error.MediumQuestions ="Number of Medium Questions is require"
    } 
    if(!formData.HardQuestions){
        error.HardQuestions ="Number of Hard Questions is require"
    } 
    if(!formData.TotalQuestions){
        error.TotalQuestions ="Number of Total Questions is require"
    } 
  if(!formData.TotalMarks){
        error.TotalMarks ="Number of Total Marks is require"
    } 
    if(!formData.Instructions){
        error.Instructions ="Instructions is require"
    } 
    if(!formData.exampleFormControlSelect2){
        error.exampleFormControlSelect2 ="Batch Time is require"
    } 
    if(!formData.exampleFormControlSelect2){
        error.exampleFormControlSelect2 ="Quizz Category is require"
    } 
    if(!formData.CourseId){
        error.CourseId ="Course is require"
    } 
    

    return error

}
export default ValidationInstructoraddquize