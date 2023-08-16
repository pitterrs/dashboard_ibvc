import React from "react";
import { Box, useTheme, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import Header from "../../components/Header";
import ModificarMembro from "./modificarmembro";

const Membros = () => {

  const [membros, setMembros] = useState([]);
  const [show, setShow] = useState(false);
  const [membro, setMembro] = useState(null);

  const ChangeData = (data) => {
    let retorno = {};
    for (var linha of data) {
      // Object.defineProperty(linha, 'icone', {
      //   value: <HomeOutlinedIcon />,
      // })
      if (linha.nascimento) {
        const newdate = new Date(linha.nascimento);
        const dia = (newdate.getDate() + 1) < 10 ? `0${(newdate.getDate() + 1)}` : (newdate.getDate() + 1);;
        const mes = (newdate.getMonth() + 1) < 10 ? `0${(newdate.getMonth() + 1)}` : (newdate.getMonth() + 1);
        const ano = newdate.getFullYear();
        const formatDate = dia + '/' + mes + '/' + ano;
        Object.defineProperty(linha, 'nascimento', {
          value: formatDate,
        })
      }
      if (linha.conversao) {
        const newdate = new Date(linha.conversao);
        const dia = (newdate.getDate() + 1) < 10 ? `0${(newdate.getDate() + 1)}` : (newdate.getDate() + 1);;
        const mes = (newdate.getMonth() + 1) < 10 ? `0${(newdate.getMonth() + 1)}` : (newdate.getMonth() + 1);
        const ano = newdate.getFullYear();
        const formatDate = dia + '/' + mes + '/' + ano;
        Object.defineProperty(linha, 'conversao', {
          value: formatDate,
        })
      }
      if (linha.batismo) {
        const newdate = new Date(linha.batismo);
        const dia = (newdate.getDate() + 1) < 10 ? `0${(newdate.getDate() + 1)}` : (newdate.getDate() + 1);;
        const mes = (newdate.getMonth() + 1) < 10 ? `0${(newdate.getMonth() + 1)}` : (newdate.getMonth() + 1);
        const ano = newdate.getFullYear();
        const formatDate = dia + '/' + mes + '/' + ano;
        Object.defineProperty(linha, 'batismo', {
          value: formatDate,
        })
      }
    }
    return (
      retorno = data
    );
  };

  const getMembros = async () => {
    try {
      const res = await axios.get(`http://localhost:8800/getmembros`);
      setMembros(ChangeData(res.data))
    } catch (error) {
      console.log('erro desconhecido');
    }
  }

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {
      field: "icone", headerName: "", renderCell: ({ row: { id } }) => {
        return <Button onClick={() => handleEdit(membros, id)} variant="contained">Modificar</Button>;
      }, width: 100
    },
    { field: "nome", headerName: "Name", cellClassName: "name-column--cell", width: 200 },
    { field: "idade", headerName: "Idade", type: "number", headerAlign: "left", align: "left", width: 100 },
    { field: "celular", headerName: "Celular", width: 100 },
    { field: "telefone", headerName: "Telefone", width: 100 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "genero", headerName: "Genero", width: 100 },
    { field: "nascimento", type: 'date', headerName: "Data de Nascimento", width: 120 },
    { field: "civil", headerName: "Estado Civil", width: 120 },
    { field: "admissao", headerName: "Admissão", width: 100 },
    { field: "obs_admissao", headerName: "Obs Admissão", width: 100 },
    { field: "situacao", headerName: "Situação", width: 100 },
    { field: "conversao", headerName: "Conversão", width: 100 },
    { field: "batismo", headerName: "Batismo", width: 100 },
    { field: "chamado", headerName: "Chamado", width: 100 },
    { field: "cep", headerName: "CEP", width: 100 },
    { field: "endereco", headerName: "Endereço", width: 250 },
    { field: "numero", headerName: "Número", width: 100 },
    { field: "complemento", headerName: "Complemento", width: 100 },
    { field: "outrasinfos", headerName: "Outras Informações", width: 250 },
  ];

  const handleEdit = (membros, id) => {
    const id2 = [id];
    const selectedRowsData = id2.map((id) => membros.find((row) => row.id === id));
    setMembro(selectedRowsData);
    setShow(true);
  }

  useEffect(() => {
    getMembros();
  }, [setMembros]);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Relatório de Membros" subtitle="Relatório com todos os membros cadastrados" />
      </Box>
      <Box
        m="8px 0 0 0"
        width="100%"
        height="80vh"
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
          rows={membros}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
      {show && (
        <ModificarMembro show={show} setShow={setShow} membro={membro} setMembro={setMembro} getMembros={getMembros} />
      )}
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_RIGHT} />
    </Box>
  );
};

export default Membros;
