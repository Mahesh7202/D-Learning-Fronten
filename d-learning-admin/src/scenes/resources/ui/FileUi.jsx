import {
    Box, IconButton, Typography, useTheme, Dialog,
    DialogActions, Button,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";
import { tokens } from "../../../Theme";
import React, { useState } from "react";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import InfoIcon from '@mui/icons-material/Info';
import { useEffect } from "react";
import Services from '../../../service/ResourceServices';


const FileUi = (props) => {
    const { URL, id, length, name, type, cname, sucode } = props;
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDownload = async () =>{
        const file = await Services.downloadResource(sucode,id);
        console.log(file);
        window.open("http://localhost:8093/resource/2301K1241069T/0bc37962-4114-45e8-9a16-8f7f0a6c299a/download","_blank");
        
    }

    return (

        <>
            <Box m="10px" style={{
                width: "250px",
                display: "flex",
                height: "250px",
                flexDirection: "column",
                flexWrap: "nowrap",
                position: "relative"

            }}
            >

                <Box style={{
                    width: "100%",
                    height: "100%",
                    backgroundImage: 'url("https://icons-for-free.com/iconfiles/png/512/file+generic+file+illustrator+pdf+vector+format+icon-1320166937345498684.png")',
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    objectFit: "cover",
                    zIndex: "0"
                }}>
                    <div style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "flex-end"
                    }}>
                        <Box style={{
                            width: "100%",
                            height: "50%",
                            backgroundColor: "#000000f0",
                            zIndex: "1",
                            margin: "0px 19px 0px 19px",
                            borderRadius: "36px 36px 15px 15px",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "flex-start",
                            padding: "26px",
                            justifyContent: "center"
                        }} >

                            <Typography variant="h5"
                                color={colors.greenAccent[700]}
                                fontWeight="bold"
                                sx={{ m: "0 0 5px 0" }}
                            >
                                {name}
                            </Typography>
                        </Box>

                    </div>
                </Box>
                <IconButton
                    style={{
                        position: "absolute",
                        top: "-9px",
                        right: "25px",
                        margin: "7px",
                        color: `${colors.greenAccent[600]}`
                    }} onClick={handleClickOpen}>
                    <InfoIcon />
                </IconButton>

                <IconButton
                    style={{
                        position: "absolute",
                        bottom: "-9px",
                        right: "25px",
                        margin: "7px",
                        color: `${colors.greenAccent[600]}`
                    }} onClick={handleDownload}>
                    <CloudDownloadIcon />
                </IconButton>

            </Box>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                
            >
                <DialogTitle id="alert-dialog-title">
                    <Typography variant="h3"
                        color={colors.greenAccent[700]}
                        fontWeight="bold"
                        sx={{ m: "0 0 5px 0" }}
                    >{cname}</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" style={{
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "column",
                          flexWrap: "nowrap",
                          alignContent: "center",
                          justifyContent: "center"
                      
                    }}

                    sx={{
                        "& .MuiTypography-root":{
                            display: "flex",flexDirection: "column",alignContent: "center",
                            justifyContent: "center",alignItems: "center", lineHeight: "1.5"}
                        }}
                    
                    >

                        <Box style={{
                            width: "250px",
                            height: "250px",
                            backgroundImage: 'url("https://icons-for-free.com/iconfiles/png/512/file+generic+file+illustrator+pdf+vector+format+icon-1320166937345498684.png")',
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            objectFit: "cover",

                        }} />
                        <Typography variant="h4"
                            color={colors.grey[100]}
                            fontWeight="bold"
                            sx={{ m: "0 0 5px 0" }}
                        >Resource Id:
                        <Typography variant="h5"
                            color={colors.greenAccent[700]}
                            fontWeight="bold"
                            sx={{ m: "0 0 5px 0" }}
                        >{id}</Typography></Typography>


                        <Typography variant="h4"
                            color={colors.grey[100]}
                            fontWeight="bold"
                            sx={{ m: "0 0 5px 0" }}
                        >Resource Name:
                        <Typography variant="h5"
                            color={colors.greenAccent[700]}
                            fontWeight="bold"
                            sx={{ m: "0 0 5px 0" }}
                        >{name}</Typography></Typography>

                        <Typography variant="h4"
                            color={colors.grey[100]}
                            fontWeight="bold"
                            sx={{ m: "0 0 5px 0" }}
                        >Resource Type:
                        <Typography variant="h5"
                            color={colors.greenAccent[700]}
                            fontWeight="bold"
                            sx={{ m: "0 0 5px 0" }}
                        >{type}</Typography></Typography>

                        <Typography variant="h4"
                            color={colors.grey[100]}
                            fontWeight="bold"
                            sx={{ m: "0 0 5px 0" }}
                        >Resource Length:
                        <Typography variant="h5"
                            color={colors.greenAccent[700]}
                            fontWeight="bold"
                            sx={{ m: "0 0 5px 0" }}
                        >{length}</Typography></Typography>

                        <Typography variant="h4"
                            color={colors.grey[100]}
                            fontWeight="bold"
                            sx={{ m: "0 0 5px 0" }}
                        >Resource URL:
                        <Typography variant="h5"
                            color={colors.greenAccent[700]}
                            fontWeight="bold"
                            sx={{ m: "0 0 5px 0" }}
                        >{URL}</Typography></Typography>



                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button  style={{padding: "6px 16px",
                                borderRadius: "4px",
                                color: "#000000de",
                                backgroundColor: "#4cceac"}} onClick={handleClose}>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>



        </>
    );
};

export default FileUi;
