import axios from "axios";




/*      "ResourceId": null,
        "fname": "harshaaa",
        "lname": "harsha",
        "email": "kalyanharsha@gmail.com",
        "password": "kalyanharsha",
        "address": "kadapa",
        "branch": "btech",
        "department": "cse",
        "sem_no": 7*/



  /*get the student details from Backend Services */
  const Resource_Service = "http://localhost:8093/resource"
  const token = localStorage.getItem("token");
  const config = {
    headers:{
      'Authorization' : `Bearer ${token}`
    }
  }

  class Services{

    
    getResources(){
      return axios.get(Resource_Service,config);
    }

    downloadResource(sucode,resourceid){
      return axios.get(Resource_Service+`/${sucode}/${resourceid}/download`,config);
   
    }

    getResourceById(id){
      return axios.get(Resource_Service+`/${id}`,config);
    }
  }

  export default new Services();