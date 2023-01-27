import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./scenes/homePage";
import LoginPage from "./scenes/loginPage";
import ProfilePage from "./scenes/profilePage";
import { themeSettings } from "./theme";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  const mode = useSelector((state) => {
    return state.mode;
  });
  const theme = useMemo(() => {
    return createTheme(themeSettings(mode));
  }, [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to={"/"} />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
