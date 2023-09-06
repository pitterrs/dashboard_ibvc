import React, { useState, useEffect } from 'react';
import { tokens } from "../../theme";
import Grid from "@mui/material/Unstable_Grid2";
import Header from "../../components/Header";
import { Box, useTheme, useMediaQuery, Typography } from "@mui/material";
import "./novomembro.css"
import Button from 'react-bootstrap/Button';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { validateSections } from '@mui/x-date-pickers/internals/hooks/useField/useField.utils';
import { toast } from "react-toastify";
const Casamento = () => {

  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const colors = tokens(theme.palette.mode);
  const [pageSize, setPageSize] = useState(10);
  const [aniversariantes, setAniversariantes] = useState([])
  const [membros, setMembros] = useState([]);
  const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
  const [numero, setNumero] = useState();
  const columns = [
    // {
    //   field: "icone", headerName: "Ações", renderCell: ({ row: { id } }) => {
    //     return <> < ModeEditIcon className="pointer edit" onClick={() => handleEdit(transacoes, id)} /> < CheckCircleIcon className="pointer aprovar" onClick={() => handleApprov(transacoes, id)} />  < DeleteForeverIcon className="pointer lixo" onClick={() => handleDelete(transacoes, id)} /></>;
    //   }, width: 90
    // },
    {
      field: "data",
      headerName: "Data",
      width: 140,
    },
    { field: "nome", headerName: "Nome", width: 180 },
  ];

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
            console.log('Logado')
          } else {
            window.location.replace(`${process.env.REACT_APP_SITE_URL}login`);
          }
        }
      )
      .catch(({ err }) => {
        console.log(err)
        toast.error('Ocorreu um erro ao tentar validar seu acesso. Faça login novamente ou entre em contato com o administrador.')
        window.location.replace(`${process.env.REACT_APP_SITE_URL}login`);
      });
  }

  const getMembros = async () => {
    let aniversario_atual = [];
    let aniversariantes_aux = [];
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}getmembros`);
      setMembros(res.data);
      aniversariantes_aux = res.data;
    } catch { }

    const newDate = new Date();
    const month = newDate.getUTCMonth() + 1;

    for (var linha of aniversariantes_aux) {
      let mes = (linha.data_casamento ? linha.data_casamento.substring(5, 7) : '0');
      if (mes == month) {
        const newDate = new Date(linha.data_casamento);
        const dia = (newDate.getUTCDate()) < 10 ? `0${(newDate.getUTCDate())}` : (newDate.getUTCDate());;
        const mes2 = (newDate.getUTCMonth() + 1) < 10 ? `0${(newDate.getUTCMonth() + 1)}` : (newDate.getUTCMonth() + 1);
        const ano = newDate.getUTCFullYear();
        const formatDate = dia + '/' + mes2 + '/' + ano;
        Object.defineProperty(linha, 'data', {
          value: formatDate,
        })
        aniversario_atual.push(linha)
      }
    }
    setNumero(month);
    setAniversariantes(aniversario_atual);
  }

  useEffect(() => {
    validations();
    getMembros();
  }, [setMembros]);

  const handleFilter = (n) => {
    setNumero(n);
    let aniversario = [];
    for (var linha of membros) {
      let mes = (linha.data_casamento ? linha.data_casamento.substring(5, 7) : '0');
      if (mes == n) {
        const newDate = new Date(linha.data_casamento);
        const dia = (newDate.getUTCDate()) < 10 ? `0${(newDate.getUTCDate())}` : (newDate.getUTCDate());;
        const mes2 = (newDate.getUTCMonth() + 1) < 10 ? `0${(newDate.getUTCMonth() + 1)}` : (newDate.getUTCMonth() + 1);
        const ano = newDate.getUTCFullYear();
        const formatDate = dia + '/' + mes2 + '/' + ano;
        Object.defineProperty(linha, 'data', {
          value: formatDate,
        })
        aniversario.push(linha)
      }
    }
    setAniversariantes(aniversario);

  }

  function filterdata(data) {

    return data;
  }

  return (
    <Box m="20px">

      <Box
        display={smScreen ? "flex" : "block"}
        flexDirection={smScreen ? "row" : "column"}
        justifyContent={smScreen ? "space-between" : "start"}
        alignItems={smScreen ? "center" : "start"}
        m="10px 0"
      >
        <Header title="Aniversário de Casamento" subtitle="Aqui você visualiza todos os aniversariantes de casamento" />
      </Box>
      <Grid className='borda-bottom' m='20px 0 0 0' p='10px' xs={12} backgroundColor={colors.primary[400]} >
        <Box>
          <Typography variant="h4">
            Selecione um mês
          </Typography>
        </Box>
      </Grid>
      <Grid p='10px' xs={12} backgroundColor={colors.primary[400]} >
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent='center'>
          <Grid xs={12} sm={12} md={6} lg={3} xl={1}>
            <Box
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              className='border-radius'
            >
              <Button onClick={() => handleFilter('01')} size="sm" variant={numero == '01' ? 'light' : 'outline-light'} >Janeiro</Button>
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={6} lg={3} xl={1}>
            <Box
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              className='border-radius'
            >
              <Button onClick={() => handleFilter('02')} size="sm" variant={numero == '02' ? 'light' : 'outline-light'} >Fevereiro</Button>
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={6} lg={3} xl={1}>
            <Box
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              className='border-radius'
            >
              <Button onClick={() => handleFilter('03')} size="sm" variant={numero == '03' ? 'light' : 'outline-light'} >Março</Button>
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={6} lg={3} xl={1}>
            <Box
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              className='border-radius'
            >
              <Button onClick={() => handleFilter('04')} size="sm" variant={numero == '04' ? 'light' : 'outline-light'} >Abril</Button>
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={6} lg={3} xl={1}>
            <Box
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              className='border-radius'
            >
              <Button onClick={() => handleFilter('05')} size="sm" variant={numero == '05' ? 'light' : 'outline-light'} >Maio</Button>
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={6} lg={3} xl={1}>
            <Box
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              className='border-radius'
            >
              <Button onClick={() => handleFilter('06')} size="sm" variant={numero == '06' ? 'light' : 'outline-light'} >Junho</Button>
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={6} lg={3} xl={1}>
            <Box
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              className='border-radius'
            >
              <Button onClick={() => handleFilter('07')} size="sm" variant={numero == '07' ? 'light' : 'outline-light'} >Julho</Button>
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={6} lg={3} xl={1}>
            <Box
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              className='border-radius'
            >
              <Button onClick={() => handleFilter('08')} size="sm" variant={numero == '08' ? 'light' : 'outline-light'} >Agosto</Button>
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={6} lg={3} xl={1}>
            <Box
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              className='border-radius'
            >
              <Button onClick={() => handleFilter('09')} size="sm" variant={numero == '09' ? 'light' : 'outline-light'} >Setembro</Button>
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={6} lg={3} xl={1}>
            <Box
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              className='border-radius'
            >
              <Button onClick={() => handleFilter('10')} size="sm" variant={numero == '10' ? 'light' : 'outline-light'} >Outubro</Button>
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={6} lg={3} xl={1}>
            <Box
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              className='border-radius'
            >
              <Button onClick={() => handleFilter('11')} size="sm" variant={numero == '11' ? 'light' : 'outline-light'} >Novembro</Button>
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={6} lg={3} xl={1}>
            <Box
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              className='border-radius'
            >
              <Button onClick={() => handleFilter('12')} size="sm" variant={numero == '12' ? 'light' : 'outline-light'} >Dezembro</Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Box
        backgroundColor={colors.primary[400]}
        m="1px 0 0 0"
        width="100%"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={aniversariantes}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
        // getCellClassName={(params) => {
        //   if (params.field === 'valor' && params.row.categoria == 'Receita') {
        //     return 'positivo';
        //   } else if (params.field === 'valor' && params.row.categoria == 'Despesa') {
        //     return 'negativo';
        //   }

        // }}
        />
      </Box>
    </Box>
  )

};

export default Casamento;