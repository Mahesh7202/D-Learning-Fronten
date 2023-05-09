import React, { useEffect, useState, useCallback } from 'react'
import { Box, Button, Typography, useTheme, TextField } from "@mui/material";
import * as yup from "yup";
import { Formik } from "formik";
import useMediaQuery from '@mui/material/useMediaQuery';
import { tokens } from "../../../Theme";
import { Branch, Department, SemNo, CourseName, Credits } from '../../../data/constants';
import InfoPopup  from "../../../layout/InfoPopup";

import { convertCTToFeilds, convertCttoFeildsValues } from "../../../util/convertor";
import InputLabel from '@material-ui/core/InputLabel';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import Services from '../../../service/CourseServices';

import { useParams } from "react-router-dom";


const userSchema = yup.object().shape({
    // email: yup
    //     .string()
    //     .email("Invalid Email")
    //     /*for other items .matches(REgeX,"msg")*/
    //     .required("required")
});

function UpdateCourse() {
    const isNonMobile = useMediaQuery("(min-width: 600px");
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [showPassword, setShowPassword] = useState(true);

    const { id } = useParams();

    const [initialValues, setIntialValues] = useState();
    const [open, setOpen] = useState();
    const [ message, setMessage] = useState();
    const [ type,setType] = useState();
  


    const loadData = useCallback(async () => {
        const fetchData = await Services.getCourseById(id).then(response => { return response.data; });
        const { d, b, s } = convertCttoFeildsValues(fetchData["coursetype"]);
        const { coursetype, ...a } = fetchData;

        const data = {
            ...a,
            "department": d,
            "branch": b,
            "semno": s
        };
        console.log(data);
        return data;
    }, []);

    useEffect(() => {
        let dataLoaded = true;

        const reloadData = async () => {
            const fetchData = await loadData();
            if (dataLoaded) {
                setIntialValues(fetchData);
            }
        }
        reloadData();
       
        return () => {
            dataLoaded = false;
        }

    }, [loadData]);
    console.log(initialValues);


    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const handleFormSubmit = (values) => {
        const {branch,semno,department, ...rest} = values;
        const data ={
            ...rest,
            "coursetype": department+""+branch+""+semno
        };
        console.log(values,data);
       
        const submit = async (e) => {
            await Services.updateCourse(id, data).then(()=>{
                setMessage("Course Was Updated Succesfully");
                setType("success");

            });
        }
        submit().then(()=> setOpen(true));
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
                    Update-Student
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[400]}>
                    Update Student Details
                </Typography>
            </Box>
            {open&& <InfoPopup message={message} open={open} type={type}/>}

            {initialValues ?
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={userSchema}
                >
                    {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
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
                                    type="text"
                                    label="Su Code"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.sucode}
                                    name="sucode"
                                    disabled
                                    errors={!!touched.sucode && !!errors.sucode}
                                    helperText={touched.sucode && errors.sucode}
                                    sx={{ gridColumn: "span 4" }}
                                />


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
                                    {CourseName.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </TextField>



                                <TextField
                                    fullWidth
                                    variant="filled"
                                    select
                                    label="Credits"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.credits}
                                    name="credits"
                                    errors={!!touched.credits && !!errors.credits}
                                    helperText={touched.credits && errors.credits}
                                    sx={{ gridColumn: "span 1.5" }}
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    <option key="main" value="inital"></option>
                                    {Credits.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </TextField>

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    select
                                    label="Branch"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.branch}
                                    name="branch"
                                    errors={!!touched.branch && !!errors.branch}
                                    helperText={touched.branch && errors.branch}
                                    sx={{ gridColumn: "span 1.5" }}
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    <option key="main" value="inital"></option>
                                    {Branch.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </TextField>

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    select
                                    label="Department"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.department}
                                    name="department"
                                    errors={!!touched.department && !!errors.department}
                                    helperText={touched.department && errors.department}
                                    sx={{ gridColumn: "span 1.5" }}
                                    SelectProps={{
                                        native: true,
                                    }}
                                ><option key="main" value="inital"></option>

                                    {Department.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </TextField>

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    select
                                    label="Sem No."
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.semno}
                                    name="semno"
                                    errors={!!touched.semno && !!errors.semno}
                                    helperText={touched.semno && errors.semno}
                                    sx={{ gridColumn: "span 1.5" }}
                                    SelectProps={{
                                        native: true,
                                    }}
                                ><option key="main" value="inital"></option>

                                    {SemNo.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </TextField>
                            </Box>

                            <Box display="flex" justifyContent="end" mt="20px" >
                                <Button type="submit" color="secondary" variant='contained'>
                                    Create New Course
                                </Button>
                            </Box>
                        </form>
                    )}

                </Formik>

                :
                <Typography>sdfsf</Typography>
            }


        </Box>



    )
}

export default UpdateCourse