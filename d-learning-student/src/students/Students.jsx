import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { tokens } from "../../../d-learning-teacher/src/Theme";
import Services from './Services'
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import React from "react";
import Button from '@mui/material/Button';

const Students = () => {

  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [studentData, setStudentData] = useState([]);
  const [checkboxSelection, setCheckboxSelection] = useState(false);

  const [selectedRows, setSelectedRows] = useState([]);
  const [id,setId] = useState();

  const handleDelete = () => {
    const selectedIDs = new Set(selectedRows);
            //calling an API to delete the selected IDs
          const selectedRowData = studentData.filter((row) =>
            selectedIDs.has(row.id)
          );
            
          selectedRowData.map(async (data)=>{
            const studentId = data.studentId;
            const done = await Services.deleteStudent(studentId);

          });

            // and get the latest results after the deletion

            // then call setRows() to update the data locally here
    setStudentData((student) => student.filter((x) => !selectedIDs.has(x.id)));
  };


  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await Services.getStudents();
    const data = result.data.map((a, index) => ({
      ...a,
      id: index + 1
    }));
    setStudentData(data);
  }

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },

    { field: "studentId", headerName: "Student ID" },
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
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },

    {
      field: "password",
      headerName: "Password",
      flex: 1,
    },

    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
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
      field: "sem_no",
      headerName: "Sem No.",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Box mb="30px">
        <Typography
          variant="h2"
          color={colors.grey[100]}
          fontWeight="bold"
          sx={{ m: "0 0 5px 0" }}
        >
          Student-Service
        </Typography>
        <Typography variant="h5" color={colors.greenAccent[400]}>
          Manages all Students
        </Typography>
      </Box>


      <Box mb="20px">
        <InputAdornment
          position="start"
        >
          <IconButton
            aria-label="toggle create-password"
            style={{ color: colors.greenAccent[400] }}
            onClick={() => setCheckboxSelection(!checkboxSelection)}
          >
            <EditIcon />
            <Typography variant="h5" style={{ margin: '10px' }} color={colors.greenAccent[400]}>
              Edit the Students
            </Typography>
          </IconButton>
        </InputAdornment>
      </Box>


      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
       
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection={checkboxSelection}
          rows={studentData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          onSelectionModelChange={(newSelection) => {
            setSelectedRows(newSelection);
            const selectedIDs = new Set(newSelection);

            const selectedRowData = studentData.filter((row) =>
            selectedIDs.has(row.id)
            );
            
            selectedRowData.map((data)=>{
              setId(data.studentId);
            });
            
          }}
        />
      </Box>

      {checkboxSelection && <Box display="flex" justifyContent="start" >
        <Button type="submit" color="secondary" style={{ minWidth:"64px", padding:"6px 16px", color:"black", borderRadius:"4px", margin:"10px", backgroundColor:"#4cceac"}}  variant='contained' onClick={()=> navigate(`/student/update/${id}`)}>
          Update
        </Button>
        <Button type="submit" onClick={handleDelete}  style={{ minWidth:"64px", padding:"6px 16px",color:"black", borderRadius:"4px",margin:"10px", backgroundColor:"#dc143c"}} startIcon={<DeleteIcon />} variant='contained'>
          Delete
        </Button>
      </Box>}
    </Box>
  );
};

export default Students;