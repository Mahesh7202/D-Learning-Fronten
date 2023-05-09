import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { tokens } from "../../Theme";
import Services from '../../service/StudentServices'
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import React from "react";
import Button from '@mui/material/Button';
import { studentColumns } from "../../data/columns";
import { convertCTToFeilds } from "../../util/convertor";
import InfoPopup from "../../layout/InfoPopup";
import Avatar from '@mui/material/Avatar';
import { green, grey, pink } from '@mui/material/colors';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { color } from "@mui/system";


const items = [
  {
    title: "Zipkin",
    avator: "Z",
    websitelink: "https://zipkin.io/",
    baselink: "http://localhost:9411/zipkin",
    context: "ZipKin is an Ui based Application that monitors and mantains the Spring Cloud Sleuth logs"
  },
  {
    title: "ElasticSearch",
    avator: "E",
    websitelink: "https://stackify.com/elasticsearch-tutorial/",
    baselink: "http://localhost:9200",
    context: " It is a NoSQL database which is based on the open-source search engine called Lucene. So Elasticsearch is a search and analytics engine."
  },
  {
    title: "Logstash",
    avator: "L",
    websitelink: "https://www.elastic.co/guide/en/logstash/current/getting-started-with-logstash.html",
    baselink: "",
    context: " It is a data processing pipeline tool which accepts inputs from (multiple) sources, performs different transformations, and exports the data to targets (ElastiSearch)"
  },
  {
    title: "Kibana",
    avator: "K",
    websitelink: "https://www.elastic.co/guide/en/kibana/current/get-started.html",
    baselink: "",
    context: " Kibana helps users to visualize data with graphs and chart in Elasticsearch."
  },

]

function openLink(url, newTab=true) {
  newTab
    ? window.open(url, "_blank", "noopener noreferrer")
    : (window.location.href = url);
}


const Students = () => {

  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);




  return (
    <Box m="20px">
      <Box mb="30px">
        <Typography
          variant="h2"
          color={colors.grey[100]}
          fontWeight="bold"
          sx={{ m: "0 0 5px 0" }}
        >
          Dashboard
        </Typography>
        <Typography variant="h5" color={colors.greenAccent[400]}>
          Services Performance
        </Typography>
      </Box>


      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          fontFamily: "Source Sans Pro,sans-serif",
          "& .MuiDataGrid-root": {
            border: "none",
          },

          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.greenAccent[200]} !important`,
            margin: "7px"
          },
          "& .MuiButtonBase-root:hover": {
            backgroundColor: "#3f9e85"
          },
          "& .MuiChip-clickable:hover": {
            backgroundColor: "#6699c3"
        }

        }}
      >
        {items.map((item) => {

          return (<Box m="15px" >
            <Divider sx={{ margin: "16px" }} textAlign="left">
              <Chip avatar={<Avatar sx={{ backgroundColor: "#000", color: grey[400], fontSize: "10px", }}>{item.avator}</Avatar>}
                label={item.title} sx={{
                  fontFamily: "Source Sans Pro,sans-serif",
                  fontSize: "15px",
                  fontWeight: "500",
                  backgroundColor: "#90caf9",
                  color: "#000",
                }}
                onClick={() => openLink(item.websitelink)}
              // color="#fff"
              />
            </Divider>
            <Button className="service"
              sx={{
                padding: "15px",
                backgroundColor: `${colors.greenAccent[400]}`,

                display: "flex",
                flexDirection: "column",
                alignContent: "flex-start",
                alignItems: "flex-start",
              }}
              variant="contained"
              fullWidth="true"
              onClick={() => openLink(item.baselink)}>

              <Typography
                variant="h3"
                color="#000000de"
                fontWeight="bold"
                sx={{ m: "0 0 5px 0" }}
              >
                {item.title}
              </Typography>
              <Typography variant="h5" m="5px" color={colors.grey[900]}>
                {item.context}
              </Typography>

            </Button>
          </Box>)
        })
        }

      </Box>



    </Box >
  );
};

export default Students;