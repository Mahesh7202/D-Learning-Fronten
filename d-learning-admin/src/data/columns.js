import { Box } from "@mui/material";
import { Navigate } from "react-router";


export const studentColumns = [
    { field: "id", headerName: "ID", flex:0.2 },

    { field: "studentId", headerName: "Student ID" },
    {
      field: "htno",
      headerName: "HallTicket No.",
      flex: 0.6,
    },
    {
      field: "fname",
      headerName: "First Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "lname",
      headerName: "LastName",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.2
    },
    {
      field: "phonenumber",
      headerName: "Phone Number",
      flex: 0.7,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },

    {
      field: "password",
      headerName: "Password",
      flex: 0.7,
    },

    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      flex: 0.5
    },

    {
      field: "branch",
      headerName: "Branch",
      flex: 0.5

    },
    {
      field: "department",
      headerName: "Department",
      flex: 0.5
    },
    {
      field: "semno",
      headerName: "Sem No.",
      flex: 0.5
    },
  ];

  

export const teacherColumns = [
  { field: "id", headerName: "ID", flex:0.2 },

  { field: "teacherId", headerName: "Teacher ID" },
  {
    field: "emcode",
    headerName: "Employee Code No.",
    flex: 0.6,
  },
  {
    field: "fname",
    headerName: "First Name",
    flex: 1,
    cellClassName: "name-column--cell",
  },
  {
    field: "lname",
    headerName: "LastName",
    flex: 1,
    cellClassName: "name-column--cell",
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    headerAlign: "left",
    align: "left",
    flex: 0.2
  },
  {
    field: "phonenumber",
    headerName: "Phone Number",
    flex: 0.7,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
  },

  {
    field: "password",
    headerName: "Password",
    flex: 0.7,
  },

  {
    field: "address",
    headerName: "Address",
    flex: 1,
  },

  {
    field: "branch",
    headerName: "Branch",
    flex: 0.5

  },
  {
    field: "department",
    headerName: "Department",
    flex: 0.5
  },

];


  export const courseColumns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "sucode",
      headerName: "Su Code",
      flex: 1,
    },
    {
      field: "coursename",
      headerName: "Course Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
   
    {
      field: "credits",
      headerName: "Credits",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "branch",
      headerName: "Branch",
      flex: 1,
    },
    {
      field: "department",
      headerName: "Department",
      flex: 1,
    },
    {
      field: "semno",
      headerName: "Sem No.",
      flex: 1,
    },
  ];


  
  export const ResourceColumns = [
    { field: "id", headerName: "ID", flex: 0.2 },
    {
      field: "sucode",
      headerName: "Su Code",
      flex: 0.3,
    },
    {
      field: "coursename",
      headerName: "Course Name",
      flex: 1,
      cellClassName: "name-column--cell",
    }
  ];


  