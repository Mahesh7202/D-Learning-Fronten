import React, { useState } from 'react'
import { Box, Button, Typography, useTheme, TextField } from "@mui/material";
import * as yup from "yup";
import { Formik } from "formik";
import useMediaQuery from '@mui/material/useMediaQuery';
import { tokens } from "../../../Theme";
import { Branch, Department, SemNo } from '../../../data/constants';
import DropZone from '../ui/DropZone';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import LockIcon from '@material-ui/icons/Lock';
import CachedIcon from '@material-ui/icons/Cached';

import { generate } from '@wcj/generate-password';
import { v4 as uuid } from 'uuid';
import Services from '../../../service/CourseServices';
import { useEffect } from 'react';

const initialValues =

{
    studentId: '',
    fname: '',
    lname: '',
    email: '',
    password: '',
    address: '',
    branch: '',
    department: '',
    semno: '',
};

const userSchema = yup.object().shape({
    email: yup
        .string()
        .email("Invalid Email")
        /*for other items .matches(REgeX,"msg")*/
        .required("required")
});
const Course = [];
function CreateResource() {
    const isNonMobile = useMediaQuery("(min-width: 600px");
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [showPassword, setShowPassword] = useState(true);
    const [CourseName,setcourseName] = useState([]); 
    const [sucode,setSuCode] = useState();
    
    const [open, setOpen] = useState();
    const [ message, setMessage] = useState();
    const [ type,setType] = useState();
  
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const handleFormSubmit = (values) => {
        console.log(values);
        const submit = async (e) => {
            await Services.CreateResource(values).then(()=>{
                setMessage("Resource Was Created Succesfully");
                setType("success");

            });
        }
        submit().then(()=> setOpen(true));
    }

    useEffect(()=>{
        loadData();
    },[]);

    const loadData = async ()=>{
        const result = await Services.getCourses();
        setSuCode(result.data);
        const data= new Set();
        result.data.map((item)=>{
            data.add(item["coursename"]);
        });

        setcourseName(Array.from(data));
    
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
                    Create-Resource
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[400]}>
                    Creates New Resources
                </Typography>
            </Box>
            {open&& <InfoPopup message={message} open={open} type={type}/>}

            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={userSchema}
            >
                {({ values, errors, setFieldValue, touched, handleBlur, handleChange, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0,1fr))"
                            sx={{
                                "& > div": {
                                    gridColumn: isNonMobile ? undefined : "span 4"
                                }, "& .MuiFormLabel-root": {
                                    color: "#ffffffb3",

                                },
                                "& .MuiInputBase-root": {
                                    color: "#fff",
                                    fontSize: "0.8571428571428571rem"
                                },
                                "& .MuiFilledInput-root": {
                                    backgroundColor: "#ffffff17"
                                },
                                "& .MuiFilledInput-root:hover": {
                                    backgroundColor: "#ffffff21"
                                },
                                "& .MuiInputLabel-filled.MuiInputLabel-shrink": {
                                    fontFamily: "Source Sans Pro",
                                    color: '#ffffffb3',
                                    fontSize: "0.86666rem"
                                },
                                "& .MuiFilledInput-underline:after": {
                                    borderBottom: "2px solid #141b2b"
                                },
                                "& .MuiIconButton-root": {
                                    backgroundColor: "transparent"
                                },
                                "& .MuiFilledInput-root.Mui-disabled": {
                                    backgroundColor: "#266798",
                                    color: "white"
                                },
                            }}
                        >



                            <TextField
                                fullWidth
                                variant="filled"
                                select
                                label="CourseName"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.coursename}
                                name="coursename"
                                errors={!!touched.coursename && !!errors.coursename}
                                helperText={touched.coursename && errors.coursename}
                                sx={{ gridColumn: "span 4" }}
                                SelectProps={{
                                    native: true,
                                }}
                            >
                                <option key="main" value="inital"></option>
                                {CourseName.map((option,index) => (
                                    <option key={index} value={index}>
                                        {option}
                                    </option>
                                ))}
                            </TextField>

                            {values.coursename &&
                                <Box m="20px" sx={{
                                    width: "100%",
                                    display: "flex",
                                    gridColumn: "span 4",
                                    flexDirection: "column"
                                }}>
                                    <Typography
                                        variant="h2"
                                        color={colors.greenAccent[400]}
                                        fontWeight="bold"
                                        sx={{ m: "0 0 5px 0" }}
                                    >
                                    {sucode[values.coursename].sucode}
                                    </Typography>
                                    <Typography variant="h5" color={colors.grey[100]} style={{ marginLeft: "8px"}}>
                                        Creates New Resources
                                    </Typography>
                                    <Box mb="30px" style={{
                                        margin: "20px",
                                        width: "80%",
                                        display: "flex",
                                        height: "300px",
                                        alignItems: "center",
                                        gridColumn: "span 5",
                                        justifyContent: "center",
                                        borderStyle: "dashed"
                                    }}>
                                        <DropZone sucode = {sucode[values.coursename].sucode} />
                                    </Box>
                                </Box>


                            }
                        </Box>
                 
                    </form>
                )}

            </Formik>

        </Box>


    )
}

export default CreateResource
