import React from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import ChangeMensageiras from "./modificarmensageira";
import { toast, ToastContainer } from "react-toastify";
import Header from "../../components/Header";

const CorpoDiaconal = () => {

  const [mensageiras, setMensageiras] = useState([]);
  const [show, setShow] = useState(false);
  const [mensageira, setMensageira] = useState(null);

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

  const ChangeData = (data) => {
    let retorno = {};
    for (var linha of data) {
      
      if (linha.nascimento){
        const ano_aniversario = linha.nascimento.substr(0, 4);
        const mes_aniversario = linha.nascimento.substr(5, 2);
        const dia_aniversario = linha.nascimento.substr(8, 2);
        const CalcIdade = (ano_aniversario, mes_aniversario, dia_aniversario) =>{
          var d = new Date,
              ano_atual = d.getFullYear(),
              mes_atual = d.getMonth() + 1,
              dia_atual = d.getDate(),
      
              ano_aniversario = +ano_aniversario,
              mes_aniversario = +mes_aniversario,
              dia_aniversario = +dia_aniversario,
      
              quantos_anos = ano_atual - ano_aniversario;
      
          if (mes_atual < mes_aniversario || mes_atual == mes_aniversario && dia_atual < dia_aniversario) {
              quantos_anos--;
          }
      
          return quantos_anos < 0 ? 0 : quantos_anos;
        }

        const idade = CalcIdade(ano_aniversario,mes_aniversario,dia_aniversario);

        Object.defineProperty(linha, 'idade', {
          value: idade,
        })
      }
    }
    return (
      retorno = data
    );
  };

  const getMensageiras = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}getmensageiras`);
      setMensageiras(ChangeData(res.data))
    } catch (error) {
      console.log('erro desconhecido');
    }
  }

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {
      field: "icone", headerName: "", renderCell: ({ row: { id } }) => {
        return <Button onClick={() => handleEdit(mensageiras, id)} variant="contained">Modificar</Button>;
      }, width: 100
    },
    { field: "nome", headerName: "Name da Mensageira", cellClassName: "name-column--cell", width: 200 },
    { field: "idade", headerName: "Idade", type: "number", headerAlign: "left",align: "left", width: 100 },
    { field: "nascimento", headerName: "Data de Nascimento", type: "date", width: 115 },
    { field: "celular", headerName: "Celular", width: 100 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "etapa", headerName: "Etapa Atual", width: 100 },
    { field: "situacao", headerName: "Situação", width: 100 },
    { field: "funcao", headerName: "Função", width: 100 },
    { field: "responsavel1", headerName: "Responsável Principal", width: 150 },
    { field: "resp1email", headerName: "Email Responsável Principal", width: 120 },
    { field: "resp1contato", headerName: "Contato Responsável Principal", width: 120 },
    { field: "responsavel2", headerName: "Responsável Secundário", width: 150 },
    { field: "resp2email", headerName: "Email Responsável Secundário", width: 150 },
    { field: "resp2contato", headerName: "Contato do Responsável Secundário", width: 130 },
    { field: "outrasinfos", headerName: "Observações", width: 100 },
  ];

  const handleEdit = (mensageiras, id) => {
    const id2 = [id];
    const selectedRowsData = id2.map((id) => mensageiras.find((row) => row.id === id));
    setMensageira(selectedRowsData);
    setShow(true);
  }

  useEffect(() => {
    validations();
    getMensageiras();
  }, [setMensageiras]);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Mensageiras do Rei" subtitle="Relatório das Mensageiras do Rei" />
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
          rows={mensageiras}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
        {show && (
          <ChangeMensageiras show={show} setShow={setShow} mensageira={mensageira} setMensageira={setMensageira} getMensageiras={getMensageiras} />
        )}
        <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_RIGHT} />
      </Box>
    </Box>
  );
};

export default CorpoDiaconal;
