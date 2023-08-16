import React from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import { useEffect, useState } from "react";
import axios from "axios";

import Header from "../../components/Header";

const Mensageiras = () => {

  const [membros, setMembros] = useState([]);

  const getMembros = async () => {
    try {
      const res = await axios.get(`http://localhost:8800/`);
      setMembros(res.data)
    } catch (error) {
      console.log('erro desconhecido');
    }
  }

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "Id", width: 100 },
    { field: "nome", headerName: "Name da Mensageira", cellClassName: "name-column--cell", width: 200 },
    { field: "idade", headerName: "Idade", type: "number", headerAlign: "left",align: "left", width: 100 },
    { field: "nascimento", headerName: "Data de Nascimento", type: "date", width: 115 },
    { field: "celular", headerName: "Celular", width: 100 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "etapa", headerName: "Etapa Atual", width: 100 },
    { field: "situacao", headerName: "Situação", width: 100 },
    { field: "funcao", headerName: "Função", width: 100 },
    { field: "responsavel1", headerName: "Responsável Principal", width: 150 },
    { field: "contato1", headerName: "Contato Responsável", width: 120 },
    { field: "responsavel2", headerName: "Responsável Secundário", width: 150 },
    { field: "contato2", headerName: "Contato do Secundário", width: 130 },
    { field: "observacao", headerName: "Observações", width: 100 },
  ];

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
    </Box>
  );
};

export default Mensageiras;
