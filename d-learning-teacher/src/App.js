import { ColorModeContext, useMode } from "./Theme";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import UpdateStudent from "./students/form/UpdateStudent";
import { Route, Routes } from "react-router";
import CreateStudent from "./students/form/CreateStudent";
import Students from "./pages/Students";
import React from 'react';
import Dashboard from "./layout/Dashboard";
import Courses from "./pages/Courses";
import AllResources from "./pages/AllResources";
import MyCourses from "./pages/MyCourses";
import Profile from "./pages/Profile";
import { BrowserRouter } from "react-router-dom";
import ResourceUi from "./pages/ui/ResourceUi";
import Topbar from "./layout/Topbar";

function App() {
  const [theme, colorMode] = useMode();

  return (<BrowserRouter>
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Topbar/>
          <main className="content" style={{width: "100%", height: "100%"}}>
          <Routes>
              <Route path="/teacher" element={<Dashboard />} />
              <Route exact path="/teacher/allresources/*" element={ <AllResources/>}/>
              
              <Route exact path="/teacher/mycourses" element={<MyCourses/>}/>
              <Route exact path="/teacher/mycourses/:coursename" element={<ResourceUi/>}/>
              
              <Route exact path="/teacher/allresources/d/b/s" element={<MyCourses/>}/>
              <Route exact path="/teacher/allresources/d/b/s/:coursename" element={<ResourceUi/>}/>

              <Route exact path="/teacher/courses" element={<Courses/>}/>
              <Route exact path="/teacher/profile" element={<Profile/>}/>
              <Route exact path="/teacher/students" element={<Students/>}/>
             
            </Routes>

          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
