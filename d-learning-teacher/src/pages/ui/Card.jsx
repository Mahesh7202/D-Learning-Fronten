import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../../d-learning-teacher/src/Theme";
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import React from "react";


const Card = ({ label }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Flippy
            flipOnHover={true} // default false
            flipDirection="horizontal" // horizontal or vertical
            // to use toggle method like this.flippy.toggle()
            // if you pass isFlipped prop component will be controlled component.
            // and other props, which will go to div
            style={{ width: '350px', height: '150px' }} /// these are optional style, it is not necessary
        >
            <FrontSide
                style={{ backgroundColor: '#41669d' }}
            >
                <Box sx={{ "& .MuiButtonBase-root": { margin: "auto", width: "100%" } }}>
                    <Typography variant="h3"
                        color={colors.grey[100]}
                        fontWeight="bold"
                        sx={{ m: "0 0 5px 0" }}
                    >
                        {label}
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
                    {label}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[400]}>
                    content
                </Typography>
            </BackSide>
        </Flippy>
    );
};

export default Card;