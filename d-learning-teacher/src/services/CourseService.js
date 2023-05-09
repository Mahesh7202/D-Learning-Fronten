import axios from "axios";

  const course_Service = "http://localhost:8094/course"
  const token = localStorage.getItem("token");
  console.log(token);
  const config = {
    headers:{
      'Authorization' : `Bearer ${token}`
    }
  }


  class Services{
   
    getCourses(){
      return axios.get(course_Service,config);
    }
    
    getCourseByCourseType(coursetype){
      return axios.get(course_Service+`/coursetype/${coursetype}`,config);
    }
  }

  export default new Services();