import React, { useState } from 'react'
import { Box, Button, Typography, useTheme, TextField } from "@mui/material";
import * as yup from "yup";
import { Formik } from "formik";
import useMediaQuery from '@mui/material/useMediaQuery';
import { tokens } from "../Theme";
import { useNavigate } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import {Roles, steps, QontoConnector, QontoStepIcon} from '../data/logindata';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import jwt_decode from "jwt-decode";
import { getToken,getRole } from '@e-learning/Auth';


const initialValues =
{
    userid: '',
    password: '',
};

const userSchema = yup.object().shape({});


function Login() {
    const isNonMobile = useMediaQuery("(min-width: 600px");
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [showPassword, setShowPassword] = useState(true);
    const [step, setStep] = useState(0);
    const [logintype, setLoginType] = useState();

    const navigate = useNavigate();

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const handleFormSubmit = (values) => {

        const submit = async (e) => {
            await getToken(values);
            const role = await getRole(logintype);
            console.log(role);
            if(role.toLowerCase() === logintype && localStorage.getItem("token")) {
                localStorage.setItem("userId", values["userid"]);
                navigate(logintype);
            }else{
                console.log("you r not a "+logintype);
            }
        }
        submit();
    }


    return (
        <Box m="20px">
            <Box mb="30px">
                <Typography
                    variant="h2"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    style={{
                        alignItems: "center",
                        display: "flex",
                        lineHeight: "2",
                        justifyContent: "center"
                    }}
                    sx={{ m: "0 0 5px 0", }}
                >
                    Login
                </Typography>
                <Stepper alternativeLabel activeStep={step} connector={<QontoConnector />}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
            {step === 0 ?
                <Box mb="30px"
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0,1fr))"
                    sx={{
                        "& .MuiButtonBase-root:hover": {
                            backgroundColor: "#7c71711f"
                        }
                    }}
                >
                    <List style={{ gridColumn: "span 12" }} sx={{ width: '100%', maxWidth: 360 }}>
                        {Roles.map((item, index) => {
                            const { role, image } = item;
                            return (
                                <Button variant="contained"
                                    sx={{ width: '100%', margin: "10px", backgroundColor: "#ffffff1f" }}
                                    endIcon={<SendIcon />}
                                    onClick={()=>{
                                        setStep((prevActiveStep) => prevActiveStep + 1);
                                        setLoginType(role.toLowerCase())
                                    }}
                                >
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar src={image}>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={role} secondary="" />
                                    </ListItem>
                                </Button>
                            )
                        })}
                    </List>
                </Box>
                : 
                <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            //validationSchema={userSchema}
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
                            label="User Id"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.userid}
                            name="userid"
                            errors={!!touched.userid && !!errors.userid}
                            helperText={touched.userid && errors.userid}
                            sx={{ gridColumn: "span 13" }}
                        />

                        <FormControl variant="filled" className="MuiFormControl-fullWidth MuiTextField-root css-1vd3lbb-MuiFormControl-root-MuiTextField-root" style={{ gridColumn: "span 13" }}>
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
                            />
                        </FormControl>
                    </Box>

                    <Box display="flex" justifyContent="end" mt="20px" >
                        <Button type="Back" color="secondary" variant='contained' onClick={() => setStep((prevActiveStep) => prevActiveStep - 1)} style={{ minWidth: "64px", padding: "6px 16px", color: "black", borderRadius: "4px", margin: "10px", backgroundColor: "#4cceac" }}>
                            Back
                        </Button>
                        <Button type="submit" color="secondary" variant='contained' style={{ minWidth: "64px", padding: "6px 16px", color: "black", borderRadius: "4px", margin: "10px", backgroundColor: "#4cceac" }}>
                            Login
                        </Button>
                    </Box>
                </form>
            )}

        </Formik>
                }

        </Box >


    )
}

export default Login