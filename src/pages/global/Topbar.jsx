import React from "react";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import { useTheme, Box, IconButton, InputBase } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useProSidebar } from "react-pro-sidebar";
import LogoutIcon from '@mui/icons-material/Logout';
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { toggleSidebar, broken, rtl } = useProSidebar();
  const [logado, setLogado] = useState(false);

  const validation = async () => {

    const token = localStorage.getItem("IBVC_token");
    const key = localStorage.getItem("IBVC_key");

    await axios
      .post("http://localhost:8800/validation", {
        Authorization: token,
        key,
      })
      .then(
        ({ data }) => {
          if (data.error === false) {
            setLogado(true);
          } else {
            setLogado(false);
            (data.number === 401 ?
              toast.error(data.message) : setLogado(false))
            // navigate('/login');
          }
        }
      )
      .catch(({ err }) => {
        console.log(err)
      });
  }
  useEffect(() => {
    validation();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("IBVC_userId");
    localStorage.removeItem("IBVC_userName");
    localStorage.removeItem("IBVC_email");
    localStorage.removeItem("IBVC_key");
    localStorage.removeItem("IBVC_token");
    window.location.replace('http://localhost:3000/login');
  };

  const handleConfig = () => {
    window.location.replace('http://localhost:3000/access');
  };

  return (
    logado ?
      <Box display="flex" justifyContent="space-between" p={2}>
        <Box display="flex">
          {broken && !rtl && (
            <IconButton
              sx={{ margin: "0 6 0 2" }}
              onClick={() => toggleSidebar()}
            >
              <MenuOutlinedIcon />
            </IconButton>
          )}
          {/* <Box
            display="flex"
            backgroundColor={colors.primary[400]}
            p={0.2}
            borderRadius={1}
          >
            <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search" />
            <IconButton type="button">
              <SearchIcon />
            </IconButton>
          </Box> */}
        </Box>
        <Box display="flex">
          <IconButton>
            <SettingsOutlinedIcon onClick={() => handleConfig()} />
          </IconButton>
          <IconButton>
            <LogoutIcon onClick={() => handleLogout()} />
          </IconButton>
          {broken && rtl && (
            <IconButton
              sx={{ margin: "0 6 0 2" }}
              onClick={() => toggleSidebar()}
            >
              <MenuOutlinedIcon />
            </IconButton>
          )}
        </Box>
      </Box>
      : ''
  );
};

export default Topbar;
