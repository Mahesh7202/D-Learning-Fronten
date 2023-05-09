import axios from "axios";

export const StudentsDatas = [
    {
      id: 1,
      name: "Jon Snow",
      email: "jonsnow@gmail.com",
      age: 35,
      phone: "(665)121-5454",
      address: "0912 Won Street, Alabama, SY 10001",
      city: "New York",
      studentId: 1
      
    },
    {
      id: 2,
      name: "Cersei Lannister",
      email: "cerseilannister@gmail.com",
      age: 42,
      phone: "(421)314-2288",
      address: "1234 Main Street, New York, NY 10001",
      city: "New York",
      studentId: 2
      
    },
    {
      id: 3,
      name: "Jaime Lannister",
      email: "jaimelannister@gmail.com",
      age: 45,
      phone: "(422)982-6739",
      address: "3333 Want Blvd, Estanza, NAY 42125",
      city: "New York",
      studentId: 3
      
    },
    {
      id: 4,
      name: "Anya Stark",
      email: "anyastark@gmail.com",
      age: 16,
      phone: "(921)425-6742",
      address: "1514 Main Street, New York, NY 22298",
      city: "New York",
      studentId: 4
      
    },
    {
      id: 5,
      name: "Daenerys Targaryen",
      email: "daenerystargaryen@gmail.com",
      age: 31,
      phone: "(421)445-1189",
      address: "11122 Welping Ave, Tenting, CD 21321",
      city: "Tenting",
      
      studentId: 5
    },
    {
      id: 6,
      name: "Ever Melisandre",
      email: "evermelisandre@gmail.com",
      age: 150,
      phone: "(232)545-6483",
      address: "1234 Canvile Street, Esvazark, NY 10001",
      city: "Esvazark",
      
      studentId: 6
    },
    {
      id: 7,
      name: "Ferrara Clifford",
      email: "ferraraclifford@gmail.com",
      age: 44,
      phone: "(543)124-0123",
      address: "22215 Super Street, Everting, ZO 515234",
      city: "Evertin",
      
      studentId: 7
    },
    {
      id: 8,
      name: "Rossini Frances",
      email: "rossinifrances@gmail.com",
      age: 36,
      phone: "(222)444-5555",
      address: "4123 Ever Blvd, Wentington, AD 142213",
      city: "Esteras",
      
      studentId: 8
    },
    {
      id: 9,
      name: "Harvey Roxie",
      email: "harveyroxie@gmail.com",
      age: 65,
      phone: "(444)555-6239",
      address: "51234 Avery Street, Cantory, ND 212412",
      city: "Colunza",
      
      studentId: 9
    },
    {
      id: 10,
      name: "Enteri Redack",
      email: "enteriredack@gmail.com",
      age: 42,
      phone: "(222)444-5555",
      address: "4123 Easer Blvd, Wentington, AD 142213",
      city: "Esteras",
      
      studentId: 10
    },
    {
      id: 11,
      name: "Steve Goodman",
      email: "stevegoodmane@gmail.com",
      age: 11,
      phone: "(444)555-6239",
      address: "51234 Fiveton Street, CunFory, ND 212412",
      city: "Colunza",
      
      studentId: 11
    },
  ];




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
  const Student_Service = "http://localhost:8090/student"
  const token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJLdUJyNHBhY2JwaWNZTGRfLUZDa2lTaWhiYXBCZm1NQTQ4SFNOZDVpMzVZIn0.eyJleHAiOjE2Njk4Mjc3MzIsImlhdCI6MTY2OTgxNTczMiwianRpIjoiN2NlMmU2ZmUtMzBhMC00Zjg0LWFiMDItNmQxYzllNDcyZjc3IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MTgwL2F1dGgvcmVhbG1zL2UtbGVhcm5pbmctcmVhbG0iLCJhdWQiOlsicmVhbG0tbWFuYWdlbWVudCIsImFjY291bnQiXSwic3ViIjoiZTgxOTI3ZDMtZmIzOS00Y2MwLWE3Y2EtMzc5MWVlNWMyZGQ0IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZS1sZWFybmVyIiwic2Vzc2lvbl9zdGF0ZSI6IjU3MTY2ZGU5LTE2MGYtNGEwMS05NTQ5LTQyMjZlY2JmMGRhNiIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZS1sZWFybmVyLXVzZXItY3JlYXRvciIsImRlZmF1bHQtcm9sZXMtZS1sZWFybmluZy1yZWFsbSIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJyZWFsbS1tYW5hZ2VtZW50Ijp7InJvbGVzIjpbInZpZXctaWRlbnRpdHktcHJvdmlkZXJzIiwidmlldy1yZWFsbSIsIm1hbmFnZS1pZGVudGl0eS1wcm92aWRlcnMiLCJpbXBlcnNvbmF0aW9uIiwicmVhbG0tYWRtaW4iLCJjcmVhdGUtY2xpZW50IiwibWFuYWdlLXVzZXJzIiwicXVlcnktcmVhbG1zIiwidmlldy1hdXRob3JpemF0aW9uIiwicXVlcnktY2xpZW50cyIsInF1ZXJ5LXVzZXJzIiwibWFuYWdlLWV2ZW50cyIsIm1hbmFnZS1yZWFsbSIsInZpZXctZXZlbnRzIiwidmlldy11c2VycyIsInZpZXctY2xpZW50cyIsIm1hbmFnZS1hdXRob3JpemF0aW9uIiwibWFuYWdlLWNsaWVudHMiLCJxdWVyeS1ncm91cHMiXX0sImUtbGVhcm5lciI6eyJyb2xlcyI6WyJBRE1JTiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwic2lkIjoiNTcxNjZkZTktMTYwZi00YTAxLTk1NDktNDIyNmVjYmYwZGE2IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ1c2VyLWNyZWF0In0.y3GQb3E4ie6JUH6-dIi_YX42tXD_z4pOzg4Z691TMIUZGAy2bBqPcCzQKeHW_bbe_2DBwfuk7BAReMuL54avwuD9nCAcfz3Fa05qTJefu2Z6gMWxL2Uo22JmJNbWK20gMmvcXNcvPMa7cjQAH4UHCOtNktiQcyNGcDcBtQPRWqUdLq1e6UytTpPUOFrbovYEYJ-Koy8rsn1GqZ0TCrzO3Hp2d_JbaxC5vjNAo1PtlW5rl_aWEa2s5dVuXOh0VusVoTKiswyINJrb1e04RgIq3b_36CVO0Aid6mh106FI10ZsmQjR4wwZvk0eq9XJZah1lpuGzueP9mNo751D74-ssw";
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