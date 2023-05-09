import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { tokens } from "../../Theme";
import Services from '../../service/TeacherServices'
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import React from "react";
import Button from '@mui/material/Button';
import { teacherColumns } from "../../data/columns";
import { convertCTToFeilds } from "../../util/convertor";
import InfoPopup from "../../layout/InfoPopup";
const Teachers = () => {
  const [open, setOpen] = useState();
  const [message, setMessage] = useState();
  const [type, setType] = useState();
  const [emcode, setEmcode] = useState();


  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [teacherData, setTeacherData] = useState([]);
  const [checkboxSelection, setCheckboxSelection] = useState(false);

  const [name, setName] = useState();
  const [selectedRows, setSelectedRows] = useState([]);
  const [id, setId] = useState();

  const handleDelete = () => {
    const selectedIDs = new Set(selectedRows);
    //calling an API to delete the selected IDs
    const selectedRowData = teacherData.filter((row) =>
      selectedIDs.has(row.id)
    );

    selectedRowData.map(async (data) => {
      const teacherId = data.teacherId;
      const done = await Services.deleteTeacher(teacherId);

    });

    setTeacherData((teacher) => teacher.filter((x) => !selectedIDs.has(x.id)));
  };


  useEffect(() => {
    console.log(localStorage.getItem("token"))

    loadUser().then(() => setOpen(true));


  }, []);

  const loadUser = async () => {
    const result = await Services.getTeachers();
    if (result.data) {
      setMessage("Teacher data Loaded Successfull");
      setType("success");
    } else {
      setMessage("Unable to load Teacher Data");
      setType("error");
    }
    console.log(result.data);
    const data = [];
    result.data.map((row, index) => {
      const { department, branch, ...rest } = row;
      const ct = convertCTToFeilds(department + "" + branch);

      data[index] = {
        ...rest,
        id: index + 1,
        "department": ct["department"],
        "branch": ct["branch"],
      }
    })
    setTeacherData(data);
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
          Teacher-Service
        </Typography>
        <Typography variant="h5" color={colors.greenAccent[400]}>
          Manages all Teachers
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
              Edit the Teachers
            </Typography>
          </IconButton>
        </InputAdornment>
      </Box>

      {open && <InfoPopup message={message} open={open} type={type} />}
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
          checkboxSelection={checkboxSelection}
          rows={teacherData}
          columns={teacherColumns}
          components={{ Toolbar: GridToolbar }}
          onSelectionModelChange={(newSelection) => {
            setSelectedRows(newSelection);
            const selectedIDs = new Set(newSelection);

            const selectedRowData = teacherData.filter((row) =>
              selectedIDs.has(row.id)
            );

            selectedRowData.map((data) => {
              setId(data.teacherId);
              setName(data.fname+' '+data.lname);
              setEmcode(data.emcode);
              console.log(data.emcode);
            });

          }}
        />
      </Box>


      {checkboxSelection && <Box display="flex" justifyContent="start" >

        {/* <Button type="submit" onClick={() => navigate(`/admin/teacher/assigncourses/${id}`, {state:{name: `${name}`, emcode: `${emcode}`}})} style={{ minWidth: "64px", padding: "6px 16px", color: "black", borderRadius: "4px", margin: "10px", backgroundColor: "#dc143c" }} startIcon={<DeleteIcon />} variant='contained'>
          Assign Courses
        </Button> */}
        <Button type="submit" color="secondary" style={{ minWidth: "64px", padding: "6px 16px", color: "black", borderRadius: "4px", margin: "10px", backgroundColor: "#4cceac" }} variant='contained' onClick={() => navigate(`/admin/teacher/update/${id}`)}>
          Update
        </Button>
        <Button type="submit" onClick={handleDelete} style={{ minWidth: "64px", padding: "6px 16px", color: "black", borderRadius: "4px", margin: "10px", backgroundColor: "#dc143c" }} startIcon={<DeleteIcon />} variant='contained'>
          Delete
        </Button>
      </Box>}
    </Box>
  );
};

export default Teachers;