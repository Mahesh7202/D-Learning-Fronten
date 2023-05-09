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
    
    deleteResource(id){
      return axios.delete(Resource_Service+`/${id}`,config);
    }

    UploadResource(sucode,data){
      console.log(token);
      return axios.post(Resource_Service+`/${sucode}/resource/upload`,data,config);
    }

    downloadResource(sucode,resourceid){
      console.log(Resource_Service+`/${sucode}/${resourceid}/download`);
      
     return axios.get(Resource_Service+`/${sucode}/${resourceid}/download`,config);
   
    }

    updateResource(id,data){
      return axios.put(Resource_Service+`/${id}`,data,config);
    }

    getResourceById(id){
      return axios.get(Resource_Service+`/${id}`,config);
    }
  }

  export default new Services();