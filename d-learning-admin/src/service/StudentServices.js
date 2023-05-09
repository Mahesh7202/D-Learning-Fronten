import axios from "axios";




/*      "studentId": null,
        "fname": "harshaaa",
        "lname": "harsha",
        "email": "kalyanharsha@gmail.com",
        "password": "kalyanharsha",
        "address": "kadapa",
        "branch": "btech",
        "department": "cse",
        "sem_no": 7*/



  /*get the student details from Backend Services */
  const Student_Service = "http://localhost:8072/student"
  const token = localStorage.getItem("token");
  const config = {
    headers:{
      'Authorization' : `Bearer ${token}`
    }
  }
  class Services{

    
    getStudents(){
      return axios.get(Student_Service,config);
    }
    
    deleteStudent(id){
      console.log(id);
      return axios.delete(Student_Service+`/${id}`,config);
    }

    createStudent(data){
      return axios.post(Student_Service,data,config);
    }

    updateStudent(id,data){
      return axios.put(Student_Service+`/${id}`,data,config);
    }

    getStudentById(id){
      return axios.get(Student_Service+`/${id}`,config);
    }
  }

  export default new Services();