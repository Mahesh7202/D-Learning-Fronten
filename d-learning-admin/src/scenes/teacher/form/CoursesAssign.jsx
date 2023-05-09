import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import { tokens } from '../../../Theme';
import { useLocation, useParams } from 'react-router-dom';
import TeacherServices from '../../../service/TeacherServices';
import Services from '../../../service/CourseServices';
import { Box, Button, Typography, useTheme } from "@mui/material";

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function CoursesAssign() {
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([0, 1, 2, 3]);
  const [right, setRight] = React.useState([4, 5, 6, 7]);


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();

  const [open, setOpen] = useState();
  const [message, setMessage] = useState();
  const [type, setType] = useState();
  const [emcode, setEmcode] = useState();

  const {id} = useParams();
  const [teacherId, setTeacherId] = useState();
  const [teacherName, setTeacherName] = useState();


  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);


  useEffect(() => {
      setTeacherName(location.state.name);
      setEmcode(location.state.emcode);
      loadUser().then(()=>setOpen(true));
    }, []);
  
    const loadUser = async () => {
      
      
      const result1 = await TeacherServices.getTeacherCoursesById(location.state.emcode);
      console.log(emcode);
      
      if(result1.data){
        setMessage("Course data Loaded Successfull");
        setType("success");
      }else{
        setMessage("Unable to load Course Data");
        setType("error");
      }
      console.log(result1.data);
      
       setRight(result1.data.courses || [] );


    }



  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (items) => (
    <Paper sx={{ width: 200, height: 230, overflow: 'auto' }}>
      <List dense component="div" role="list">
        {items.map((value, index) => {
          const labelId = `transfer-list-item-${value}-label`;
            console.log(value);
          return (
            <ListItem
              key={index}
              role="listitem"
              button
              onClick={handleToggle(index)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(index) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Box m="20px">
    <Box mb="30px">
        <Typography
            variant="h2"
            color={colors.grey[100]}
            fontWeight="bold"
            sx={{ m: "0 0 5px 0" }}
        >
            {teacherName}
        </Typography>
        <Typography variant="h5" color={colors.greenAccent[400]}>
           {emcode && emcode}
        </Typography>
    </Box>
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>{customList(left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(right)}</Grid>
    </Grid>
    </Box>
  );
}

export default CoursesAssign

