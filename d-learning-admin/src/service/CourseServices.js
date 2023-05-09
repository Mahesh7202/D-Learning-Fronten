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
    
    deleteCourse(id){
      return axios.delete(course_Service+`/${id}`,config);
    }

    createCourse(data){
      return axios.post(course_Service,data,config);
    }

    updateCourse(id,data){
      return axios.put(course_Service+`/${id}`,data,config);
    }

    getCourseById(id){
      return axios.get(course_Service+`/${id}`,config);
    }
  }

  export default new Services();