const ValidateCreate = (formData) => {
  let error = {}

if (!formData.Name) {
  error.Name = 'First Name is required';
} else if (!/^[a-zA-Z. ]+$/.test(formData.Name.trim())) {
  error.Name = 'First Name should only contain alphabetic characters';
}
if (!formData.LastName) {
  error.LastName = 'Last Name is required';
} else if (!/^[a-zA-Z. ]+$/.test(formData.LastName)) {
  error.LastName = 'Last Name should only contain alphabetic characters';
}
  if (!formData.Email) {
    error.Email = 'Email is required' 
  }
  else if (!(/^\S+@\S+\.\S+$/.test(formData.Email))) {
    error.Email = "Email address 'abc@gmail.com' is invalid."
  }
  if (!formData.PhoneNumber) {
    error.PhoneNumber = 'Phone Number is required';
  // } else if (!/^\d{10}$/.test(formData.PhoneNumber)) {
  //   error.PhoneNumber = 'Phone Number must be 10 digits';
  // } else if (formData.PhoneNumber.length < 10){
    error.PhoneNumber = 'Phone Number minimum 10 digits';
  }
  else if (formData.PhoneNumber.length > 10){
    error.PhoneNumber = 'Phone Number maximum 10 digits';
  }
  if (!formData.Username) {
    error.Username = 'User name is required'
  }
  else if (!(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{3,}$/.test(formData.Username))) {
    error.Username = 'User name is "user123" invalid'
  }
  if (!formData.Password) {
    error.Password = 'Password is required';
  } 
  // else if (formData.Password.length < 8) {
  //   error.Password = 'Password must be at least 8 characters long';
  // } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(formData.Password)) {
  //   error.Password = "Password must contain at least one special character, e.g., 'Abc@123'.";
  // }

  if (!formData.DOB) {
    error.DOB = 'Date of barth is required'
  }
  if (!formData.TeacherType) {
    error.TeacherType = 'Select teacher type is required'
  }
  if (!formData.CountryId) {
    error.CountryId = 'Select country is required'
  }
  if (!formData.StateId) {
    error.StateId = 'Select state is required'
  }
  if (!formData.DistrictId) {
    error.DistrictId = 'Select district is required'
  }
  if (!formData.Address) {
    error.Address = 'Address is required'
  }
  if (!formData.City) {
    error.City = 'City is required'
  }
  if (!formData.YourIntroducationAndSkills) {
    error.YourIntroducationAndSkills = 'Your Introducation And Skills is required'
  }

  return error;
};
export default ValidateCreate
