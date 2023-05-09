import React, { useEffect, useState, useCallback } from 'react'
import { Box, Button, Typography, useTheme, TextField } from "@mui/material";
import * as yup from "yup";
import { Formik, setIn } from "formik";
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
import Checkbox from '@mui/material/Checkbox';

import { generate } from '@wcj/generate-password';
import { v4 as uuid } from 'uuid';
import Services from '../../../service/TeacherServices';
import CourseServices from '../../../service/CourseServices';
import InfoPopup from '../../../layout/InfoPopup';
import { useParams } from "react-router-dom";
import Autocomplete from '@mui/material/Autocomplete';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


const userSchema = yup.object().shape({
    email: yup
        .string()
        .email("Invalid Email")
        /*for other items .matches(REgeX,"msg")*/
        .required("required")
});

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


function UpdateTeacher() {
    const isNonMobile = useMediaQuery("(min-width: 600px");
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [showPassword, setShowPassword] = useState(true);
    const [open, setOpen] = useState();
    const [message, setMessage] = useState();
    const [type, setType] = useState();
    const { id } = useParams();
    const [courses, setCourses] = useState([]);
    const [options, setOptions] = useState([]);
    const [defaultCourses, setDefaultCourses] = useState([]);

    const [initialValues, setIntialValues] = useState();


    const loadData = useCallback(async () => {
        const fetchData = await Services.getTeacherById(id).then((response) => {
             return response.data;
            });

        const data = await Services.getTeacherCoursesByEmcode(fetchData.emcode);
        setDefaultCourses(data.data.courses|| []);
        
        const result = await CourseServices.getCourses();
        const data1 = [];
    
        result.data.map((row, index) => {
            console.log(row);
            data1[index] = row.sucode
        })
        setOptions(data1);
        setCourses(data1);

        console.log(result);

        // console.log(fetchData);
        return fetchData;
    }, []);

    useEffect(() => {
        let dataLoaded = true;

        const reloadData = async () => {
            const fetchData = await loadData();
            if(dataLoaded) {
                setIntialValues(fetchData);
            }
        }
        reloadData();
        return () => {
            dataLoaded = false;
        }

    }, [loadData]);







    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const handleFormSubmit = (values) => {
        console.log(values);
        const submit = async (e) => {
            await Services.updateTeacher(id,values).then(async ()=>{
                setMessage("Teacher Was Updated Succesfully");
                setType("success");
                const id = values.teacherId;

                const data = {
                    emcode: values.emcode,
                    courses: courses
                }
                await Services.UpdateTeacherCoursesByEmcode(id, data);
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
                    Update-Teacher
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[400]}>
                    Update Teacher Details
                </Typography>
            </Box>
            {open&& <InfoPopup message={message} open={open} type={type}/>}

           {initialValues ?
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
                                gridColumn: isNonMobile ? undefined : "span 4",
                                fontFamily: "Source Sans Pro",
                            },
                            "& .MuiFormLabel-root":{
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
                                className='MuiInputLabel-root MuiInputLabel-shrink MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-filled css-7rebqb-MuiFormLabel-root-MuiInputLabel-root'
                                htmlFor="teacherId">Teacher Id</InputLabel>
                            <FilledInput
                                className='MuiInputBase-colorPrimary css-fom2fk-MuiInputBase-root-MuiFilledInput-root'
                                fullWidth
                                id="teacherId"
                                type='text'
                                value={values.teacherId}
                                name="teacherId"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                disabled
                                errors={!!touched.teacherId && !!errors.teacherId}
                                helperText={touched.teacherId && errors.teacherId}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle create-password"
                                            style={{ color: colors.greenAccent[400] }}
                                        >
                                            <LockIcon />
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
                            label="Employee Code No"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.emcode}
                            name="emcode"
                            disabled
                            errors={!!touched.emcode && !!errors.emcode}
                            helperText={touched.emcode && errors.emcode}
                            sx={{ gridColumn: "span 2" }}
                        />


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
                            value={values.phonenumber}
                            name="phonenumber"
                            errors={!!touched.phonenumber && !!errors.phonenumber}
                            helperText={touched.phonenumber && errors.phonenumber}
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
                            sx={{ gridColumn: "span 2" }}
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


                        <Autocomplete
                                multiple
                                id="checkboxes-tags-demo"
                                options={options}
                                disableCloseOnSelect
                               defaultValue={defaultCourses}
                                getOptionLabel={(option) => option}
                                renderOption={(props, option, { selected }) => (
                                    <li {...props}>
                                        <Checkbox
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            style={{ marginRight: 8 }}
                                            checked={selected}
                                        />
                                        {option}
                                    </li>
                                )}
                                style={{ width: 500 }}
                                renderInput={(params) => (
                                    <TextField {...params} 
                                            placeholder="Courses"
                                            label="Courses"
                                            SelectProps={{
                                                native: true,
                                            }}
                                            />
                                )}

                                onChange={(event, value) => setCourses(value)} 
                            />
                            
              


                    </Box>

                    <Box display="flex" justifyContent="end" mt="20px" >
                        <Button style={{padding: "6px 16px",
                                borderRadius: "4px",
                                color: "#000000de",
                                backgroundColor: "#4cceac"}} type="submit" color="secondary" variant='contained'>
                            Update Student
                        </Button>
                    </Box>
                </form>
            )}

        </Formik>:
        <Typography>sdfsf</Typography>
           }

          
        </Box>

    )
}

export default UpdateTeacher