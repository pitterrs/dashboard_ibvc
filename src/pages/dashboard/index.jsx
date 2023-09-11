import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import axios from "axios";
import { useEffect, useState } from "react";
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import Person3Icon from '@mui/icons-material/Person3';
import Person2Icon from '@mui/icons-material/Person2';
import Groups2Icon from '@mui/icons-material/Groups2';
import GroupsIcon from '@mui/icons-material/Groups';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const colors = tokens(theme.palette.mode);
  const [allHomens, setHomens] = useState();
  const [allMulheres, setMulheres] = useState();
  const [totalmembrosativos, settotalmembrosativos] = useState();
  let qntmembrosatual = [];
  let qntmembrosatual2 = [];
  let qntmembrosanterior = [];
  let totalmembrosinativos = 0;
  const [porcentagemMembrosAtivos, setPorcentagemMembrosAtivos] = useState();
  const [increase, setIncrease] = useState();
  const [qntmembrosinativos, setqntmembrosinativos] = useState();
  const [validation, setValidation] = useState(false);
  const navigate = useNavigate();

  const validations = async () => {
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
            setValidation(true)
          }else{
            setValidation(false)
            window.location.replace(`${process.env.REACT_APP_SITE_URL}login`);
          }
        }
      )
      .catch(({ err }) => {
        setValidation(false)
        toast.error('Ocorreu um erro ao tentar validar seu acesso. Faça login novamente ou entre em contato com o administrador.')
        window.location.replace(`${process.env.REACT_APP_SITE_URL}login`);
      });
  }

  const getMembros = async () => {
    let totalMembrosativos = 0;
    let qntMembrosatual = [];

    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}getallhomens`);
      setHomens(res.data[0].genero)
    } catch (error) {
      console.log('erro desconhecido');
    }

    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}getallmulheres`);
      setMulheres(res.data[0].genero)
    } catch (error) {
      console.log('erro desconhecido');
    }

    ///////////////////////////////////////////

    //Captura a quantidade de membros ativos atualmente
    try {
      const res = await axios.get(`h${process.env.REACT_APP_API_URL}totalmembrosativos`);
      totalMembrosativos = res.data[0].quantidade
    } catch (error) {
      console.log('erro desconhecido');
    }

    //Verifica se já existe um registro de quantidades para o mês atual
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}qntmembrosatual`);
      qntMembrosatual = res.data
    } catch (error) {
      console.log('erro desconhecido');
    }

    //Atualiza/Cria o registro na tabela de quantidades total de membros ativos para o mês atual

    if (qntMembrosatual.length == 0) {
      const dataAtual = new Date();
      const ano = dataAtual.getFullYear();
      let mes = dataAtual.getMonth() + 1;
      if (mes < 10) {
        mes = '0' + mes;
      }
      await axios
        .post(`${process.env.REACT_APP_API_URL}addqntmembros`, {
          ano: ano,
          mes: mes,
          quantidade: totalMembrosativos,
        })
        .then(({ data }) => console.log(data))
        .catch(({ data }) => console.log(data));

    } else {
      await axios
        .put(`${process.env.REACT_APP_API_URL}changeqntmembros`, {
          ano: qntMembrosatual[0].ano,
          mes: qntMembrosatual[0].mes,
          quantidade: totalMembrosativos,
        }).then(({ data }) => console.log(data))
        .catch(({ data }) => console.log(data));
    }

    ///////////////////////////////////////////

    //Captura a quantidade de membros ativos atualmente
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}totalmembrosativos`);
      settotalmembrosativos(res.data[0].quantidade)
    } catch (error) {
      console.log('erro desconhecido');
    }

    //Recupera quantidade de membros ativos do mês atual
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}qntmembrosatual`);
      qntmembrosatual = res.data
    } catch (error) {
      console.log('erro desconhecido');
    }

    //Recupera quantidade de membros ativos do mês passado
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}qntmembrosanterior`);
      qntmembrosanterior = res.data
    } catch (error) {
      console.log('erro desconhecido');
    }

    if (qntmembrosanterior.length > 0) {
      const anterior = qntmembrosanterior[0].quantidade;
      const atual = (qntmembrosatual.length > 0 ? qntmembrosatual[0].quantidade : 0);
      const calculo = calculaporcentagem(atual, anterior)

      if (calculo > 0) {
        let numero = Math.round(calculo * 100);
        const porcentagem = '+' + numero + '%';
        setIncrease(porcentagem);
      } else if (calculo == 0) {
        const porcentagem = '+0%'
        setIncrease(porcentagem);
      } else {
        const numero = Math.round(calculo * 100);
        const porcentagem = numero + '%';
        setIncrease(porcentagem);
      }

      setPorcentagemMembrosAtivos(calculo);
    } else if (qntmembrosanterior.length == 0 && qntmembrosatual.length == 0) {
      const calculo = 0;
      const porcentagem = '+0%'
      setIncrease(porcentagem);
      setPorcentagemMembrosAtivos(calculo);
    } else if (qntmembrosanterior.length == 0 && qntmembrosatual.length > 0) {
      const calculo = 1;
      const numero = Math.round(qntmembrosatual[0].quantidade * 100)
      const porcentagem = '+' + numero + '%';
      setIncrease(porcentagem);
      setPorcentagemMembrosAtivos(calculo);
    }

    //Captura a quantidade de membros inativos atualmente
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}totalmembrosinativos`);
      totalmembrosinativos = res.data[0].quantidade
    } catch (error) {
      console.log('erro desconhecido');
    }

    setqntmembrosinativos(totalmembrosinativos)

    //Verifica se já existe um registro de quantidades de inativos para o mês atual
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}qntmembrosatual2`);
      qntmembrosatual2 = res.data
    } catch (error) {
      console.log('erro desconhecido');
    }

    //Atualiza/Cria o registro na tabela de quantidades total de membros ativos para o mês atual
    if (qntmembrosatual2.length == 0) {
      const dataAtual = new Date();
      const ano = dataAtual.getFullYear();
      let mes = dataAtual.getMonth() + 1;
      if (mes < 10) {
        mes = '0' + mes;
      }
      await axios
        .post(`${process.env.REACT_APP_API_URL}addqntmembros2`, {
          ano: ano,
          mes: mes,
          quantidade: totalmembrosinativos,
        })
        .then(({ data }) => console.log(data))
        .catch(({ data }) => console.log(data));
    } else {
      await axios
        .put(`${process.env.REACT_APP_API_URL}changeqntmembros2`, {
          ano: qntmembrosatual2[0].ano,
          mes: qntmembrosatual2[0].mes,
          quantidade: totalmembrosinativos,
        }).then(({ data }) => console.log(data))
        .catch(({ data }) => console.log(data));
    }

  }

  const calculaporcentagem = (atual, anterior) => {
    let calculo = 0;
    if (anterior > 0) {
      calculo = (((atual - anterior) * 100) / anterior) / 100;
    }
    return (
      calculo
    )
  }

  useEffect(() => {
    validations()
    getMembros();
  }, []);

  return (
    validation ?
    <Box m="20px">
      {/* HEADER */}

      <Box
        display={smScreen ? "flex" : "block"}
        flexDirection={smScreen ? "row" : "column"}
        justifyContent={smScreen ? "space-between" : "start"}
        alignItems={smScreen ? "center" : "start"}
        m="10px 0"
      >
        <Header title="Bem-Vindo" subtitle="Sistema de administração IBVC" />
      </Box>

      {/* GRID & CHARTS */}
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={totalmembrosativos}
              subtitle='Membros Ativos'
              progress={porcentagemMembrosAtivos}
              increase={increase}
              icon={
                <Diversity3OutlinedIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "35px" }}
                />
              }
              icon2={<ProgressCircle progress={porcentagemMembrosAtivos} />}
            />
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={qntmembrosinativos}
              subtitle="Membros Inativos"
              progress="0.50"
              increase=''
              icon={
                <Groups2OutlinedIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "35px" }}
                />
              }
              icon2={<ArrowDownwardOutlinedIcon sx={{ color: colors.greenAccent[600], fontSize: "50px" }} />}
            />
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={allHomens}
              subtitle="Total Homens"
              progress="0.30"
              increase=""
              icon={
                <GroupsIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "35px" }}
                />
              }
              icon2={<Person2Icon sx={{ color: colors.greenAccent[600], fontSize: "50px" }} />}
            />
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={allMulheres}
              subtitle="Total Mulheres"
              progress="0.80"
              increase=""
              icon={
                <Groups2Icon
                  sx={{ color: colors.greenAccent[600], fontSize: "36px" }}
                />
              }
              icon2={<Person3Icon sx={{ color: colors.greenAccent[600], fontSize: "50px" }} />}
            />
          </Box>
        </Grid>

        <Grid
          xs={12}
          sm={12}
          md={8}
          lg={8}
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid xs={12}>
            <Box backgroundColor={colors.primary[400]}>
              <Box
                mt="25px"
                p="0 30px"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    Grafico mensal de novos membros
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.greenAccent[500]}
                  >
                    Ativos/Inativos
                  </Typography>
                </Box>
              </Box>
              <Box height="250px" m="-20px 0 0 0">
                <LineChart isDashboard={true} />
              </Box>
            </Box>
          </Grid>
          {/* <Grid xs={12} sm={12} md={6}>
            <Box backgroundColor={colors.primary[400]} p="30px">
              <Typography variant="h5" fontWeight="600">
                Campaign
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt="25px"
              >
                <ProgressCircle size="125" />
                <Typography
                  variant="h5"
                  color={colors.greenAccent[500]}
                  sx={{ mt: "15px" }}
                >
                  $48,352 revenue generated
                </Typography>
                <Typography>
                  Includes extra misc expenditures and costs
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={6}>
            <Box backgroundColor={colors.primary[400]}>
              <Typography
                variant="h5"
                fontWeight="600"
                sx={{ padding: "30px 30px 0 30px" }}
              >
                Sales Quantity
              </Typography>
              <Box height="250px" mt="-20px">
                <BarChart isDashboard={true} />
              </Box>
            </Box>
          </Grid>
          <Grid xs={12}>
            <Box backgroundColor={colors.primary[400]} padding="30px">
              <Typography
                variant="h5"
                fontWeight="600"
                sx={{ marginBottom: "15px" }}
              >
                Geography Based Traffic
              </Typography>
              <Box height="200px">
                <GeographyChart isDashboard={true} />
              </Box>
            </Box>
          </Grid> */}
        </Grid>
        {/* <Grid xs={12} sm={12} md={4} lg={4} xl={4}>
          <Box
            backgroundColor={colors.primary[400]}
            maxHeight="100vh"
            overflow="auto"
            m="25px 0 0 0"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              color={colors.grey[100]}
              p="15px"
            >
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Resent Transaction
              </Typography>
            </Box>
            {mockTransactions.map((transaction, i) => {
              return (
                <Box
                  key={`${transaction}-${i}`}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`4px solid ${colors.primary[500]}`}
                  p="15px"
                >
                  <Box>
                    <Typography
                      variant="h5"
                      fontWeight="600"
                      color={colors.greenAccent[100]}
                    >
                      {transaction.txId}
                    </Typography>
                    <Typography color={colors.grey[100]}>
                      {transaction.user}
                    </Typography>
                  </Box>
                  <Box color={colors.grey[100]}>{transaction.date}</Box>
                  <Box
                    color={colors.greenAccent[500]}
                    p="5px 10px"
                    borderRadius="4px"
                  >
                    ${transaction.cost}
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Grid> */}
      </Grid>
    </Box>
    : 
    ''
  );
};

export default Dashboard;
