import { ColorModeContext, useMode } from "./Theme";
import { ThemeProvider } from "@mui/material";
import React, { useState,Suspense } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ProSidebarProvider } from "react-pro-sidebar";

import Topbar from "./layout/Topbar";
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import Drawer from "./layout/Drawer";
import Dashboard from "./scenes/dashboard/Dashboard";

import Student from "./scenes/student/Student";
import UpdateStudent from "./scenes/student/form/UpdateStudent";
import CreateStudent from "./scenes/student/form/CreateStudent";

import Teacher from "./scenes/teacher/Teacher";
import UpdateTeacher from "./scenes/teacher/form/UpdateTeacher";
import CreateTeacher from "./scenes/teacher/form/CreateTeacher";

import Courses from "./scenes/courses/Courses";
import CreateCourse from "./scenes/courses/form/CreateCourse";
import UpdateCourse from "./scenes/courses/form/UpdateCourse";


import Resources from "./scenes/resources/Resources";
import CreateResource from "./scenes/resources/form/CreateResource";
// import UpdateResource from "./scenes/resources/form/UpdateReosurce";
import ResourceUi from "./scenes/resources/ui/ResourceUi";
import CoursesAssign from "./scenes/teacher/form/CoursesAssign";
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);


  return (
    <BrowserRouter>
    

    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app" style={{ width: "100%", height: "100%", display: "flex", position: "absolute"}}>
          <ProSidebarProvider>
            <Drawer isSidebar={isSidebar} />
          </ProSidebarProvider>
          <main className="content" style={{ width: "100%", height: "100%"}}>
            <Topbar setIsSidebar={setIsSidebar} />
            
            <Routes>
              <Route path="/admin/" element={<Dashboard />} />
              <Route exact path="/admin/student/view" element={ <Student/>}/>
              <Route exact path="/admin/student/create" element={ <CreateStudent/>}/>
              <Route exact path="/admin/student/update/:id" element={<UpdateStudent/>}/>

              <Route exact path="/admin/teacher/view" element={ <Teacher/>}/>
              <Route exact path="/admin/teacher/create" element={ <CreateTeacher/>}/>
              <Route exact path="/admin/teacher/update/:id" element={<UpdateTeacher/>}/>
              {/* <Route exact path="/admin/teacher/assigncourses/:id" element={<CoursesAssign/>}/> */}


              <Route exact path="/admin/course/view" element={<Courses/>}/>
              <Route exact path="/admin/course/create" element={<CreateCourse/>}/>
              <Route exact path="/admin/course/update/:id" element={<UpdateCourse/>}/>

              <Route exact path="/admin/resource/view" element={<Resources/>}/>
              <Route exact path="/admin/resource/create" element={<CreateResource/>}/>
              <Route exact path="/admin/resource/:sucode" element={<ResourceUi/>}/>
              {/* <Route exact path="/admin/resource/update/:id" element={<UpdateResource/>}/> */}
            </Routes>

         {/*<Route path="/" element={<Dashboard/>} />
            <Route path="/" element={<Dashboard/>} />
            <Route path="/" element={<Dashboard/>} />
            <Route path="/" element={<Dashboard/>} />
            <Route path="/" element={<Dashboard/>} />
            <Route path="/" element={<Dashboard/>} />
            <Route path="/" element={<Dashboard/>} />
            <Route path="/" element={<Dashboard/>} />*/}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
