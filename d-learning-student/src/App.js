import { ColorModeContext, useMode } from "./Theme";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import UpdateStudent from "./students/form/UpdateStudent";
import { Route, Routes } from "react-router";
import CreateStudent from "./students/form/CreateStudent";
import Students from "./students/Students";
import React from "react";
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

  return (
    <BrowserRouter>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Topbar />
            <main className="content" style={{ width: "100%", height: "100%" }}>
              <Routes>
                <Route path="/student" element={<Dashboard />} />
                <Route
                  exact
                  path="/student/allresources/*"
                  element={<AllResources />}
                />

                <Route
                  exact
                  path="/student/mycourses"
                  element={<MyCourses />}
                />
                <Route
                  exact
                  path="/student/mycourses/:coursename"
                  element={<ResourceUi />}
                />

                <Route
                  exact
                  path="/student/allresources/d/b/s"
                  element={<MyCourses />}
                />
                <Route
                  exact
                  path="/student/allresources/d/b/s/:coursename"
                  element={<ResourceUi />}
                />

                <Route exact path="/student/courses" element={<Courses />} />
                <Route exact path="/student/profile" element={<Profile />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
