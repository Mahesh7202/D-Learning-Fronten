import { Box, Button, Divider, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../../d-learning-teacher/src/Theme";
import React, { useState } from "react";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { useEffect } from "react";
import { useLocation, useParams } from "react-router";
import Services from "../../services/ResourceServices";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import FileUi from "./FileUi";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const ResourceUi = () => {
    const theme = useTheme();
    const location = useLocation();
    console.log(location);
    const colors = tokens(theme.palette.mode);
    const { sucode } = location.state;
    const { coursename } = useParams();

    const filetype = ["PDF", "PPT", "LINKS"];

    const [resource, setResource] = useState();

    useEffect(() => {
        loadData();
    }, []);




    const loadData = async () => {
        const result = await Services.getResourceById(sucode);
        const resource = result.data.resource;
        const data = {
            PDF: [],
            PPT: [],
            LINKS: []
        }
        resource.map((item, index) => {
            const type = item.resourcetype.split("/");
            const t = type[type.length - 1];
            switch (t.toUpperCase()) {
                case "PDF":
                    data["PDF"].push(item);
                    break;

                case "PPT":
                    data["PPT"].push(item);
                    break;

                case "LINKS":
                    data["LINKS"].push(item);
                    break;
            }
        });
        setResource(data);
    }


    return (
        <Box m="20px" style={{ height: "100%" }}>

            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box mb="30px">
                    <Typography
                        variant="h2"
                        color={colors.grey[100]}
                        fontWeight="bold"
                        sx={{ m: "0 0 5px 0" }}
                    >
                        {coursename}
                    </Typography>
                    <Typography variant="h5" color={colors.greenAccent[400]}>
                        {sucode}
                    </Typography>
                </Box>
            </Box>

            {/* GRID & CHARTS */}
         <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
                m="20px"
                style={{
                    height: "100%",
                    display: "block",

                }}
            >
                {filetype.map((v) => {

                    const item = resource ? resource[v.toUpperCase()] : '';

                    return (<>
                        <Divider component="div" textAlign="left" role="presentation">
                            <Typography
                                variant="h3"
                                color={colors.greenAccent[400]}
                                sx={{ m: "0 0 5px 0" }}
                            > {v}</Typography>
                        </Divider>


                        {item.length>0 && <Box m="30px" style={{
                            width: "100%",
                            display: "flex",
                            height: "300px",
                            gridColumn: "span 5",
                            padding: "10px",
                            position: "relative"
                        }}>
                            {item.map((t) =>
                            <FileUi URL={t.resourceURL}
                                    id={t.resourceid}
                                    length={t.resourcelength}
                                    name={t.resourcename}
                                    type={t.resourcetype}
                                    cname={coursename}
                                    sucode={sucode}
                            />
                        )}

                           
                        </Box>}

                    </>)
                })}

            </Box>
        </Box >
    );
};

export default ResourceUi;