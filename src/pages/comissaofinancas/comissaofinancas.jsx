import React from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import ChangeFinancas from "./modificarfinancas";
import { toast, ToastContainer } from "react-toastify";

import Header from "../../components/Header";

const ComissaoFinancas = () => {

  const [financas, setFinancas] = useState([]);
  const [show, setShow] = useState(false);
  const [financa, setFinanca] = useState(null);

  const getFinancas = async () => {
    try {
      const res = await axios.get(`http://localhost:8800/getfinancas`);
      setFinancas(res.data)
    } catch (error) {
      console.log('erro desconhecido');
    }
  }

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {
      field: "icone", headerName: "", renderCell: ({ row: { id } }) => {
        return <Button onClick={() => handleEdit(financas, id)} variant="contained">Modificar</Button>;
      }, width: 100
    },
    {
      field: "nome",
      headerName: "Name",
      cellClassName: "name-column--cell",
      width: 200,
    },
    { field: "celular", headerName: "Phone Number", width: 100 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "cargo", headerName: "Cargo", width: 250 },
  ];

  const handleEdit = (financas, id) => {
    const id2 = [id];
    const selectedRowsData = id2.map((id) => financas.find((row) => row.id === id));
    setFinanca(selectedRowsData);
    setShow(true);
  }

  useEffect(() => {
    getFinancas();
  }, [setFinancas]);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Comissão de Finanças" subtitle="Membros da Comissão de Finanças" />
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
          rows={financas}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
        {show && (
          <ChangeFinancas show={show} setShow={setShow} financa={financa} setFinanca={setFinanca} getFinancas={getFinancas} />
        )}
        <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_RIGHT} />
      </Box>
    </Box>
  );
};

export default ComissaoFinancas;
