import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../d-learning-teacher/src/Theme";
import { Link } from "react-router-dom";
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Branch, Department, SemNo } from "../Data/constants";
import HomeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import { useState } from "react";
import Page from "./ui/Page";
import { useEffect } from "react";
import Card from "./ui/Card";

const AllResources = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    // console.log(location.pathname);
    // console.log(location);
    const colors = tokens(theme.palette.mode);
    const [path, setPath] = useState();


    const [open, setOpen] = useState("Department");


    useEffect(() => {
        const pathnames = location.pathname.split('/').filter((x) => x);
        setPath(pathnames[pathnames.length - 1]);
        //console.log(pathnames);
    }, [location.pathname]);

    return (
        <Box m="20px" style={{ height: "100%" }}>

            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box mb="30px">
                     <Page path={location.pathname+"/"+location.search}/> 
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

                {path === "allresources" && Department.map((item, index) => {
                    const { value, label } = item;

                    const handleClick = () => {
                        navigate(`${location.pathname}/d`,{state:{dept:`${value}`}});
                        setOpen("Branch")

                       // setPath(`${location.pathname}/d?dept=${value}`);
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
                            // button
                            // to={`${location.pathname}/d?dept=${value}`}
                            // component={Link}
                            onClick={handleClick}
                        >
                            <Card label={label}/>
                        </Box>
                    )

                })}

                {path === "d" && Branch.map((item, index) => {
                    const { value, label } = item;

                    const handleClick = () => {
                        
                        navigate(`${location.pathname}/b`,{state:{dept:`${location.state.dept}`,bran:`${value}`}});

                       // setPath(`${location.pathname}/b${location.search}&?bran=${value}`);

                        setOpen("Semno")
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
                            // to={`${location.pathname}/b${location.search}&?bran=${value}`}
                            // component={Link}
                            onClick={handleClick}
                        >
                            <Card label={label}/>
                        </Box>
                    )

                })}

                {path === "b" && SemNo.map((item, index) => {
                    const { value, label } = item;


                    const handleClick = () => {
                        navigate(`${location.pathname}/s`,{state:{dept:`${location.state.dept}`,bran:`${location.state.bran}`,semno:`${value}`}});
                       
                        setOpen("Semno");
                       // setPath(`${location.pathname}/s${location.search}&?semno=${value}`);

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
                          //  to={`${location.pathname}/s${location.search}&?semno=${value}`}
                           // component={Link}
                        >
                            <Card label={label}/>
                        </Box>
                    )

                })}


            </Box>
        </Box>
    );
};

export default AllResources;