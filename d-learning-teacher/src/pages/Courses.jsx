import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { tokens } from "../../../d-learning-teacher/src/Theme";
import Services from '../services/CourseService'
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import React from "react";
import Button from '@mui/material/Button';
import { courseColumns } from "../data/columns";
import { convertCTToFeilds } from "../global/convertor";
const Courses = () => {

  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [courseData, setCourseData] = useState([]);

  const [selectedRows, setSelectedRows] = useState([]);
  const [id, setId] = useState();

  const handleDelete = () => {
    const selectedIDs = new Set(selectedRows);
    const selectedRowData = courseData.filter((row) =>
      selectedIDs.has(row.id)
    );

    selectedRowData.map(async (data) => {
      const sucode = data.sucode;
      const done = await Services.deleteCourse(sucode);

    });

    setCourseData((course) => course.filter((x) => !selectedIDs.has(x.id)));
  };


  useEffect(() => {
    console.log(localStorage.getItem("token"))

    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await Services.getCourses();
    const data = [];

    result.data.map((row, index) => {
      const { department, branch, semno } = convertCTToFeilds(row["coursetype"]);
      console.log(department, branch, semno);
      const { coursetype, ...rest } = row;
      data[index] = {
        ...rest,
        id: index + 1,
        "department": department,
        "branch": branch,
        "semno": semno
      }


    })
    setCourseData(data);
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
          Course-Service
        </Typography>
        <Typography variant="h5" color={colors.greenAccent[400]}>
          Manages all Courses
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
          rows={courseData}
          columns={courseColumns}
          components={{ Toolbar: GridToolbar }}
          onSelectionModelChange={(newSelection) => {
            setSelectedRows(newSelection);
            const selectedIDs = new Set(newSelection);

            const selectedRowData = courseData.filter((row) =>
              selectedIDs.has(row.id)
            );

            selectedRowData.map((data) => {
              setId(data.sucode);
            });

          }}
        />
      </Box>

    </Box>
  );
};

export default Courses;