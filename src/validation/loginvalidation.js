const ValidationLogin=(state)=>{ 
    let error={}
    if(!state.email){
        error.email="Email is requier"
        
    }
    else if(!(/^\S+@\S+\.\S+$/.test(state.email))){
        error.email='Email is invalid'
      }
    if(!state.password){
        error.password="Password is requier"
    }
 /*    else if(state.password.length < 8){
        error.password='Password is minimum 8 charecter '
      }  */
      
 
    return error;
}
export default ValidationLogin