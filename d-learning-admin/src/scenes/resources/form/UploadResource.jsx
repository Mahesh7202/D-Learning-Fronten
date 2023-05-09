import React, { useState } from 'react'
import { Box, Button, Typography, useTheme, TextField } from "@mui/material";
import * as yup from "yup";
import { Formik } from "formik";
import useMediaQuery from '@mui/material/useMediaQuery';
import { tokens } from "../../../Theme";
import { Branch, Department, SemNo } from '../../../data/constants';

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
import Services from '../../../service/StudentServices';

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


function UploadResource() {
    const isNonMobile = useMediaQuery("(min-width: 600px");
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [showPassword, setShowPassword] = useState(true);

    const [open, setOpen] = useState();
    const [ message, setMessage] = useState();
    const [ type,setType] = useState();
  

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const handleFormSubmit = (values) => {
        console.log(values);
        const submit = async (e) =>{
            await Services.UploadResource(values).then(()=>{
                setMessage("Resource Was Uploaded Succesfully");
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
                    Create-Student
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[400]}>
                    Creates New Students
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
                                },"& .MuiFormLabel-root":{
                                    color: "#ffffffb3",
                                   
                                },
                                "& .MuiInputBase-root":{
                                    color:"#fff",
                                    fontSize: "0.8571428571428571rem"
                                },
                                "& .MuiFilledInput-root":{
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
                                "& .MuiIconButton-root":{
                                    backgroundColor:"transparent"
                                },
                                "& .MuiFilledInput-root.Mui-disabled": {
                                    backgroundColor: "#266798",
                                    color: "white"
                                },
                            }}
                        >

                            <FormControl variant="filled" className="MuiFormControl-fullWidth MuiTextField-root css-1vd3lbb-MuiFormControl-root-MuiTextField-root">
                                <InputLabel
                                    className='MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-filled css-7rebqb-MuiFormLabel-root-MuiInputLabel-root'
                                    htmlFor="studentid">Student Id</InputLabel>
                                <FilledInput
                                    className='MuiInputBase-colorPrimary css-fom2fk-MuiInputBase-root-MuiFilledInput-root'
                                    fullWidth
                                    id="studentid"
                                    type='text'
                                    value={values.studentId}
                                    name="studentId"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    errors={!!touched.studentId && !!errors.studentId}
                                    helperText={touched.studentId && errors.studentId}

                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle create-password"
                                                style={{ color: colors.greenAccent[400] }}
                                                onClick={() => setFieldValue(
                                                    `studentId`,
                                                    uuid()
                                                )
                                                }
                                            >
                                                <CachedIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    sx={{ gridColumn: "span 3" }}
                                />
                            </FormControl>


                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="First Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.fname}
                                name="fname"
                                errors={!!touched.fname && !!errors.fname}
                                helperText={touched.fname && errors.fname}
                                sx={{ gridColumn: "span 2" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Last Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.lname}
                                name="lname"
                                errors={!!touched.lname && !!errors.lname}
                                helperText={touched.lname && errors.lname}
                                sx={{ gridColumn: "span 2" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Email Id"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                errors={!!touched.email && !!errors.email}
                                helperText={touched.email && errors.email}
                                sx={{ gridColumn: "span 2" }}
                            />

                            <FormControl variant="filled" className="MuiFormControl-fullWidth MuiTextField-root css-1vd3lbb-MuiFormControl-root-MuiTextField-root">
                                <InputLabel
                                    className='MuiFormLabel-colorPrimary MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-filled css-7rebqb-MuiFormLabel-root-MuiInputLabel-root'
                                    htmlFor="password">Password</InputLabel>
                                <FilledInput
                                    className='MuiInputBase-colorPrimary css-fom2fk-MuiInputBase-root-MuiFilledInput-root'
                                    fullWidth
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    name="password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    errors={!!touched.password && !!errors.password}
                                    helperText={touched.password && errors.password}

                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle create-password"
                                                style={{ color: colors.greenAccent[400] }}
                                                onClick={() => setFieldValue(
                                                    `password`,
                                                    generate({
                                                        length: 8,
                                                        numeric: true
                                                    })
                                                )
                                                }
                                            >
                                                <CachedIcon />
                                            </IconButton>

                                            <IconButton
                                                aria-label="toggle password visibility"
                                                style={{ color: colors.greenAccent[400] }}
                                                onClick={() => (
                                                    setShowPassword(!showPassword)
                                                )}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    sx={{ gridColumn: "span 2" }}
                                />
                            </FormControl>



                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Phone Number"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.phone}
                                name="phone"
                                errors={!!touched.phone && !!errors.phone}
                                helperText={touched.phone && errors.phone}
                                sx={{ gridColumn: "span 2" }}
                            />



                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Age"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.age}
                                name="age"
                                errors={!!touched.age && !!errors.age}
                                helperText={touched.age && errors.age}
                                sx={{ gridColumn: "span 2" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Address"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.address}
                                name="address"
                                multiline
                                rows={4}
                                errors={!!touched.address && !!errors.address}
                                helperText={touched.address && errors.address}
                                sx={{ gridColumn: "span 4" }}
                            />



                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="City"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.city}
                                name="city"
                                errors={!!touched.city && !!errors.city}
                                helperText={touched.city && errors.city}
                                sx={{ gridColumn: "span 2" }}
                            />


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
                                sx={{ gridColumn: "span 2" }}
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
                                Create New Student
                            </Button>
                        </Box>
                    </form>
                )}

            </Formik>

        </Box>


    )
}

export default UploadResource
