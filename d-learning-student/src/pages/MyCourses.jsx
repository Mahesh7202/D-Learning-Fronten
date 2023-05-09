import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { tokens } from "../../../d-learning-teacher/src/Theme";
import Services from '../services/ResourceServices';
import CourseServices from '../services/CourseService';
import StudentService from "../services/StudentServices";
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useLocation, useNavigate } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import React from "react";
import Button from '@mui/material/Button';
import { ResourceColumns } from "../data/columns";
const MyCourses = () => {

  const location = useLocation();
  // const [coursetype, setCoursetype] = useState();

  
  ResourceColumns.push(
    {
      field: "resource",
      headerName: "Resources",
      flex: 0.4,
      renderCell: ({ row: { resource }, row: { sucode }, row: { coursename } }) => {
        return (
          <Box
            width="60%"
            m="0"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor="#3da58a"
            borderRadius="4px"
            onClick={() => {
              const tem = location.state||{};
              tem.sucode = sucode;

              navigate(`${location.pathname}/${coursename}`,{state: tem})}}
          >
            {"Resources(" + resource.length + ")"}
          </Box>
        )
      }
    }
  );

  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [resourceData, setResourceData] = useState([]);

  const [id, setId] = useState();

  useEffect(() => {
    loadUser();
  }, []);


  const search = async () => {
    console.log("coursetype");
    const student = await StudentService.getStudentByHtkno(localStorage.getItem("userId"));
    return student.data["department"] + "" + student.data["branch"] + "" + student.data["semno"];
  }

  const loadUser = async () => {
    const {dept,bran,semno} = location.state || {};

    const coursetype = location.state ? dept+''+bran+''+semno:await search() ;

    const result = await Services.getResources();
    const coursedata = await CourseServices.getCourseByCourseType(coursetype);


    const getRes = (a) => {
      const res = result.data.filter((row) => {
        return row.sucode == a.sucode
      });
      return res.length > 0 ? res[0].resource : ''
    }

    const data = coursedata.data.map((a, index) =>
    (
      {
        ...a,
        id: index + 1,
        resource: getRes(a)
      }));

    console.log(data);
    setResourceData(data);
  }



  return (
    <Box m="20px">
      <Box mb="30px">
        <Typography
          variant="h2"
          color={colors.grey[100]}
          fontWeight="bold"
          sx={{ m: "0 0 5px 0" }}
        >
          Resource-Service
        </Typography>
        <Typography variant="h5" color={colors.greenAccent[400]}>
          Manages all Resource
        </Typography>
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
            color: `${colors.greenAccent[200]} !important`,
            margin: "7px"
          },

        }}
      >
        <DataGrid
          rows={resourceData}
          columns={ResourceColumns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default MyCourses;