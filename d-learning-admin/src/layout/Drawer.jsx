import React, { useState } from 'react'
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../Theme";
import { useNavigate } from "react-router-dom";
import HomeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { v4 as uuid } from 'uuid';
import { ItemData } from '../data/ItemData';
import admin from '../assests/face.jpg';
import MenuIcon from '@mui/icons-material/Menu';
import CottageIcon from '@mui/icons-material/Cottage';
import CloseIcon from '@mui/icons-material/Close';

function Drawer() {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const navigate = useNavigate();
  const { collapseSidebar } = useProSidebar();

  return (
    <Box style={{ display: 'flex', height: '100%' }}
      sx={{
        "& .ps-sidebar-container": {
          background: `${colors.primary[400]} !important`
        },    
        "& .MuiButtonBase-root":{
          color:"#fff"
        },
        "& .MuiButtonBase-root:hover":{
          color: "#868dfb!important",
          backgroundColor:"transparent"
        },

        "& .ps-menu-button:hover": {
          color: "#868dfb !important",
          backgroundColor: "transparent !important"
        },
        "& .ps-menu-button:active": {
          color: "#868dfb !important",
          backgroundColor: "transparent !important"
        },

        "& .ps-menu-button": {
          backgroundColor: "transparent !important"
        }

      }}>

      <Sidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            key={uuid()}
            onClick={() => {
              setIsCollapsed(!isCollapsed);
              collapseSidebar();
            }}
            icon={isCollapsed ? <MenuIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMINIS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            )}

          </MenuItem>

          {/*USER*/}
          {
            !isCollapsed &&
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  src={admin}
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>

              <Box textAlign="center" >
                <Typography variant='h4' color={colors.grey[100]} fontWeight="bold" sx={{ m: "10px 0 0 0" }}>Adminstrator</Typography>
                <Typography variant='h6' color={colors.greenAccent[500]}>Admin</Typography>
              </Box>
            </Box>
          }


          {/*Menu Items*/}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>

            <MenuItem
              active={selected === "Home"}
              style={{
                color: colors.grey[100],
              }}
              onClick={() => setSelected("Home")}
              icon={<CottageIcon/>}
            >
              <Typography>Home</Typography>
            </MenuItem>



            {ItemData.map((item, index) => {
              const { title, items } = item;
              return (
                <>
                  <Typography
                    variant="h6"
                    color={colors.grey[300]}
                    sx={{ m: "15px 0 5px 20px" }}
                  >
                    {title}
                  </Typography>
                  {
                    items.map((item, index) => {
                      const { name, to, icon } = item;

                      return (
                        <MenuItem
                          active={selected === name}
                          style={{
                            color: colors.grey[100],
                          }}
                          onClick={() => {setSelected(title);
                            navigate(to)
                          }}
                          icon={icon}
                        >
                          <Typography>{name}</Typography>
                         
                        </MenuItem>
                      );
                    })
                  }
                </>
              );
            })}
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  )
}

export default Drawer