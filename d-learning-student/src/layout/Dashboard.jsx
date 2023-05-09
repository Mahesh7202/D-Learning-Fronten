import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../d-learning-teacher/src/Theme";
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import React from "react";
import { DashboardElements } from "../Data/ItemData"
import HomeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { useNavigate } from "react-router";

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    return (
        <Box m="20px" style={{ height: "100%" }}>

            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box mb="30px">
                    <Typography
                        variant="h2"
                        color={colors.greenAccent[400]}
                        fontWeight="bold"
                        sx={{ m: "0 0 5px 0" }}
                    >
                        Student Dashboard
                    </Typography>
                    
                </Box>
            </Box>

            {/* GRID & CHARTS */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
                style={{
                    height: "100%",
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap",
                    flexDirection: "row",
                }}
            >
                {DashboardElements.map((item, index) => {
                    const { title, content, to, icon } = item;
                    
                    const handleClick = ()=>{
                        navigate("/student/"+title.toLowerCase());
                    }
                    return (
                    <Box
                        gridColumn="span 3"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                            "& .flippy-front": {
                                alignItems: "center",
                                display: "flex",
                                justifyContent: "center"
                            }
                        }}
                        onClick={handleClick}
                    >
                        <Flippy
                            flipOnHover={true} // default false
                            flipDirection="horizontal" // horizontal or vertical
                            // to use toggle method like this.flippy.toggle()
                            // if you pass isFlipped prop component will be controlled component.
                            // and other props, which will go to div
                            style={{ width: '350px', height: '150px' }} /// these are optional style, it is not necessary
                        >
                             
                            <FrontSide
                                style={{
                                    backgroundColor: '#41669d',
                                }}
                            >
                                <Box sx={{ "& .MuiButtonBase-root":{ margin:"auto", width:"100%"}}}>
                                    <IconButton type='button' sx={{ alignItem:"center",p: 1 }}>
                                        <HomeOutlinedIcon />
                                    </IconButton>
                                    <Typography variant="h3"
                                        color={colors.grey[100]}
                                        fontWeight="bold"
                                        sx={{ m: "0 0 5px 0" }}
                                    >
                                        {title}
                                    </Typography>
                                </Box>
                               
                            </FrontSide>
                            <BackSide
                                style={{ backgroundColor: '#175852' }}>
                                <Typography
                                    variant="h2"
                                    color={colors.grey[100]}
                                    fontWeight="bold"
                                    sx={{ m: "0 0 5px 0" }}
                                >
                                    {title}
                                </Typography>
                                <Typography variant="h5" color={colors.greenAccent[400]}>
                                    {content}
                                </Typography>
                            </BackSide>
                        </Flippy>
                    </Box>
                    )

                })}
            </Box>
        </Box>
    );
};

export default Dashboard;