import React, { useContext } from 'react';

import { Box, IconButton, InputBase, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from '../../../d-learning-teacher/src/Theme';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@material-ui/icons/Search';

function Topbar() {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box display="flex" justifyContent="space-between" p={2} sx={{
      "& .MuiButtonBase-root":{
        color:"#fff"
      },
      "& .MuiInputBase-input":{
        color:"#fff",
        padding:"4px 0 5px"
      }
    }}>

      {/*SEARCH BOX */}
      <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px">
        <InputBase className="input-search" sx={{ ml: 2, flex: 1}} placeholder="Search" />
        <IconButton type='button' sx={{p:1}}>
          <SearchIcon />
        </IconButton>
      </Box>


      {/*Icon BOX */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          { theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ): (
            <LightModeOutlinedIcon />
          )}
        </IconButton>


        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>

        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>

        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>


    </Box>
  )
}

export default Topbar