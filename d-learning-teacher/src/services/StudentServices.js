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
    
    getStudentByHtkno(id){
      return axios.get(Student_Service+`/htno/${id}`,config);
    }

    getStudentsBytype(department, branch){
      const params = {
        headers: config.headers,
        params:{
          department: department,
          branch: branch
        }
      }
      return axios.get(Student_Service+`/type`,params);
    }
  }

  export default new Services();