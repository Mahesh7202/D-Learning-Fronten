import axios from "axios";




/*      "TeacherId": null,
        "fname": "harshaaa",
        "lname": "harsha",
        "email": "kalyanharsha@gmail.com",
        "password": "kalyanharsha",
        "address": "kadapa",
        "branch": "btech",
        "department": "cse",
        "sem_no": 7*/



  /*get the Teacher details from Backend Services */
  const Teacher_Service = "http://localhost:8072/teacher"
  const token = localStorage.getItem("token");
  const config = {
    headers:{
      'Authorization' : `Bearer ${token}`
    }
  }
  class Services{

    
    getTeachers(){
      return axios.get(Teacher_Service,config);
    }
    
    deleteTeacher(id){
      console.log(id);
      return axios.delete(Teacher_Service+`/${id}`,config);
    }

    createTeacher(data){
      return axios.post(Teacher_Service,data,config);
    }

    updateTeacher(id,data){
      return axios.put(Teacher_Service+`/${id}`,data,config);
    }

    getTeacherById(id){
      return axios.get(Teacher_Service+`/${id}`,config);
    }

    
    getTeacherByEmcode(emcode){
      return axios.get(Teacher_Service+`/emcode/${emcode}`,config);
    }


    getTeacherCoursesByEmcode(emcode){
      return axios.get(Teacher_Service+`/courses/${emcode}`, config);
    }

    UpdateTeacherCoursesByEmcode(id,data){
      return axios.put(Teacher_Service+`/courses/${id}`, data, config);
    }
  }

  export default new Services();