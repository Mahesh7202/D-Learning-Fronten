import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { tokens } from "../../Theme";
import Services from '../../service/ResourceServices';
import CourseServices from '../../service/CourseServices';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import React from "react";
import Button from '@mui/material/Button';
import {ResourceColumns} from "../../data/columns";
import { unstable_resetCreateSelectorCache } from "@mui/x-data-grid/utils/createSelector";
import InfoPopup from "../../layout/InfoPopup";
const Resources = () => {
  ResourceColumns.push(
    {
      field: "resource",
      headerName: "Resources",
      flex: 0.4,
      renderCell: ({ row: { resource }, row:{ sucode }, row:{ coursename }}) => {
        return(
          <Box 
            width="60%"
            m="0"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor="#3da58a"
            borderRadius="4px"
            onClick = {()=>{ navigate(`/admin/resource/${sucode}`,{state:{coursename:`${coursename}`}})}}
          >
            {"Resources("+resource.length+")"}
          </Box>
        )
      }
    }
  );
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [resourceData, setResourceData] = useState([]);
  const [checkboxSelection, setCheckboxSelection] = useState(false);
  const [open, setOpen] = useState();
  const [ message, setMessage] = useState();
  const [ type,setType] = useState();


  const [selectedRows, setSelectedRows] = useState([]);
  const [id,setId] = useState();

  const handleDelete = () => {
    const selectedIDs = new Set(selectedRows);
            //calling an API to delete the selected IDs
          const selectedRowData = resourceData.filter((row) =>
            selectedIDs.has(row.id)
          );
            
          selectedRowData.map(async (data)=>{
            const sucode = data.sucode;
            const done = await Services.deleteresource(sucode);

          });

    setResourceData((resource) => resource.filter((x) => !selectedIDs.has(x.id)));
  };


  useEffect(() => {
    loadUser().then(()=> setOpen(true));
  }, []);

  const loadUser = async () => {
    const result = await Services.getResources();
    const coursedata = await CourseServices.getCourses();
    console.log(coursedata);
    console.log(result.data);
    if(result.data && coursedata.data){
      setMessage("Resource data Loaded Successfull");
      setType("success");
    }else{
      setMessage("Unable to load Resource Data");
      setType("error");
    }
    const data = result.data.map((a, index) => 
    (
      {
      
      ...a,
      id: index + 1,
      coursename: coursedata.data.map(row=> row.sucode == a.sucode ? row.coursename : '')[0]
    }));
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
      {open&& <InfoPopup message={message} open={open} type={type}/>}


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
              Edit the Resources
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
            color: `${colors.greenAccent[200]} !important`,
            margin: "7px"
          },
         
        }}
      >
        <DataGrid
          checkboxSelection={checkboxSelection}
          rows={resourceData}
          columns={ResourceColumns}
          components={{ Toolbar: GridToolbar }}
          onSelectionModelChange={(newSelection) => {
            setSelectedRows(newSelection);
            const selectedIDs = new Set(newSelection);

            const selectedRowData = resourceData.filter((row) =>
            selectedIDs.has(row.id)
            );
            
            selectedRowData.map((data)=>{
              setId(data.sucode);
            });
          }}
        />
      </Box>

      {checkboxSelection && <Box display="flex" justifyContent="start" >
        <Button type="submit" color="secondary" style={{ minWidth:"64px", padding:"6px 16px", color:"black", borderRadius:"4px", margin:"10px", backgroundColor:"#4cceac"}}  variant='contained' onClick={()=> navigate(`/resource/update/${id}`)}>
          Update
        </Button>
        <Button type="submit" onClick={handleDelete}  style={{ minWidth:"64px", padding:"6px 16px",color:"black", borderRadius:"4px",margin:"10px", backgroundColor:"#dc143c"}} startIcon={<DeleteIcon />} variant='contained'>
          Delete
        </Button>
      </Box>}
    </Box>
  );
};

export default Resources;