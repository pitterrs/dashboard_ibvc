import { useState, useEffect } from "react";
import { Menu, Sidebar, MenuItem, SubMenu } from "react-pro-sidebar";
import { useProSidebar } from "react-pro-sidebar";

import { useSidebarContext } from "./sidebarContext";

import { Link } from "react-router-dom";
import { tokens } from "../../../theme";
import { useTheme, Box, Typography, IconButton } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import Woman2OutlinedIcon from '@mui/icons-material/Woman2Outlined';
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { toast } from "react-toastify";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SwitchRightOutlinedIcon from "@mui/icons-material/SwitchRightOutlined";
import SwitchLeftOutlinedIcon from "@mui/icons-material/SwitchLeftOutlined";
import Groups3SharpIcon from '@mui/icons-material/Groups3Sharp';
import GroupAddSharpIcon from '@mui/icons-material/GroupAddSharp';
import CakeIcon from '@mui/icons-material/Cake';
import WcIcon from '@mui/icons-material/Wc';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import Groups2Icon from '@mui/icons-material/Groups2';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import "./style.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
      routerLink={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const MyProSidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Dashboard");
  const { sidebarRTL, setSidebarRTL, sidebarImage } = useSidebarContext();
  const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();
  const [logado, setLogado] = useState(false);
  const UserName = localStorage.getItem("IBVC_userName");
  const foto = localStorage.getItem("IBVC_foto");
  const validation = async () => {

    const token = localStorage.getItem("IBVC_token");
    const key = localStorage.getItem("IBVC_key");

    await axios
      .post(`${process.env.REACT_APP_API_URL}validation`, {
        Authorization: token,
        key,
      })
      .then(
        ({ data }) => {
          if (data.error === false) {
            setLogado(true);
          }else{
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
  return (
    logado ?
      <Box
        sx={{
          position: "sticky",
          display: "flex",
          height: "100vh",
          top: 0,
          bottom: 0,
          zIndex: 10000,
          "& .sidebar": {
            border: "none",
          },
          "& .menu-icon": {
            backgroundColor: "transparent !important",
          },
          "& .menu-item": {
            // padding: "5px 35px 5px 20px !important",
            backgroundColor: "transparent !important",
          },
          "& .menu-anchor": {
            color: "inherit !important",
            backgroundColor: "transparent !important",
          },
          "& .menu-item:hover": {
            color: `${colors.blueAccent[500]} !important`,
            backgroundColor: "transparent !important",
          },
          "& .menu-item.active": {
            color: `${colors.greenAccent[500]} !important`,
            backgroundColor: "transparent !important",
          },
        }}
      >
        <Sidebar
          breakPoint="md"
          rtl={sidebarRTL}
          backgroundColor={colors.primary[400]}
          image={sidebarImage}
        >
          <Menu iconshape="square">
            <MenuItem
              icon={
                collapsed ? (
                  <MenuOutlinedIcon onClick={() => collapseSidebar()} />
                ) : sidebarRTL ? (
                  <SwitchLeftOutlinedIcon
                    onClick={() => setSidebarRTL(!sidebarRTL)}
                  />
                ) : (
                  <SwitchRightOutlinedIcon
                    onClick={() => setSidebarRTL(!sidebarRTL)}
                  />
                )
              }
              style={{
                margin: "10px 0 20px 0",
                color: colors.grey[100],
              }}
            >
              {!collapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >
                  <Typography variant="h3" color={colors.grey[100]}>
                    ADMINIS
                  </Typography>
                  <IconButton
                    onClick={
                      broken ? () => toggleSidebar() : () => collapseSidebar()
                    }
                  >
                    <CloseOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>
            {!collapsed && (
              <Box mb="25px">
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    "& .avater-image": {
                      backgroundColor: colors.primary[500],
                    },
                  }}
                >
                  <img
                    className="avater-image"
                    alt="profile user"
                    width="100px"
                    height="100px"
                    src={`../../assets/${foto}`}
                    // src={`../../assets/user.png`}
                    style={{ cursor: "pointer", borderRadius: "50%" }}
                  />
                </Box>
                <Box textAlign="center">
                  <Typography
                    variant="h3"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0" }}
                  >
                    {UserName}
                  </Typography>
                </Box>
              </Box>
            )}
            <Box paddingLeft={collapsed ? undefined : "10%"}>
              <Item
                title="Home"
                to="/"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 20px 5px 20px" }}
              >
                Secretaria
              </Typography>
              <Item
                title="Relatório de Membros"
                to="/membros"
                icon={<Groups3SharpIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Cadastrar Membro"
                to="/novomembro"
                icon={<GroupAddSharpIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Aniversariantes"
                to="/aniversario"
                icon={<CakeIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Aniversário de Casamento"
                to="/casamento"
                icon={<WcIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 20px 5px 20px" }}
              >
                Equipes/Ministerios
              </Typography>
              <Item
                title="Equipes"
                to="/equipes"
                selected={selected}
                setSelected={setSelected}
                icon={<Diversity3Icon />}
              />
              {/* Inicio Sub Menu */}
              <SubMenu component={<Link className="link texto-menu" />} icon={<Groups2Icon className="tamanho" />} label="Mensageiras do Rei" >
                <MenuItem>
                  <Item
                    title="Gerenciar Membros"
                    to="/mensageiras"
                    selected={selected}
                    setSelected={setSelected}
                  />
                </MenuItem>
                <MenuItem>
                  <Item
                    title="Adicionar Mensageira"
                    to="/addmensageira"
                    selected={selected}
                    setSelected={setSelected}
                  />
                </MenuItem>
              </SubMenu>
              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 20px 5px 20px" }}
              >
                Finanças
              </Typography>
              <Item
                title="Visão Geral"
                to="/dashboard"
                icon={<BarChartOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Transações"
                to="/transacoes"
                icon={<LocalAtmIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              {/* Inicio Sub Menu */}
              <SubMenu component={<Link className="link texto-menu" />} icon={<SettingsOutlinedIcon className="tamanho" />} label="Configurações" >
                <MenuItem>
                  <Item
                    title="Gerenciar Contas"
                    to="/contas"
                    selected={selected}
                    setSelected={setSelected}
                  />
                </MenuItem>
                <MenuItem>
                  <Item
                    title="Centros de Custo"
                    to="/centrocusto"
                    selected={selected}
                    setSelected={setSelected}
                  />
                </MenuItem>
                <MenuItem>
                  <Item
                    title="Plano de Contas"
                    to="/lancamentos"
                    selected={selected}
                    setSelected={setSelected}
                  />
                </MenuItem>
                <MenuItem>
                  <Item
                    title="Pessoas/Fornecedores"
                    to="/fornecedores"
                    selected={selected}
                    setSelected={setSelected}
                  />
                </MenuItem>
              </SubMenu>
              {/* Fim Sub Menu */}
              <Item
                title="Gerenciar Acessos"
                to="/access"
                icon={<LockOpenIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          </Menu>
        </Sidebar>
      </Box>
      :
      ''
  );
};

export default MyProSidebar;
