import { ColorModeContext, useMode } from "./Theme";
import { ThemeProvider } from "@mui/material";
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Login from "./layout/Login";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <BrowserRouter>
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div
          className="app"
          style={{
            display: "flex",
            alignItems: "center",

            height: "100%",
            width: "100%",
            position: "fixed",
            flexDirection: "column",
            alignContent: "center",

            justifyContent: "center",
          }}
        >
          <Login />
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
    
    </BrowserRouter>
  );
}

export default App;
