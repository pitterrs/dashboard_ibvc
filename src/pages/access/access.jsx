import React, { useState, useEffect } from 'react';
import { tokens } from "../../theme";
import Grid from "@mui/material/Unstable_Grid2";
import Header from "../../components/Header";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import "./access.css"
import Button from 'react-bootstrap/Button';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AddUser from './adduser';
import ChangeUser from './changeuser';
import DeleteUser from './deleteuser';
import ChangePass from './changepass';

const Access = () => {
    const theme = useTheme();
    const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
    const colors = tokens(theme.palette.mode);
    const [pageSize, setPageSize] = useState(10);
    const [users, setUsers] = useState([]);
    const [equipe, setEquipe] = useState(null);
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [show4, setShow4] = useState(false);
    const [user, setUser] = useState(null);
    const columns = [
        {
            field: "icone", headerName: "Ações", renderCell: ({ row: { id } }) => {
                return <> < ModeEditIcon className="pointer edit" onClick={() => handleEdit(users, id)} /> < DeleteForeverIcon className="pointer lixo" onClick={() => handleDelete(users, id)} /> </>;
            }, width: 80
        },
        { field: "nome", headerName: "Nome do Usuário", width: 350 },
        { field: "email", headerName: "E-mail", width: 250 },
        {
            field: "icone2", headerName: "Ações", renderCell: ({ row: { id } }) => {
                return <> <Button onClick={() => handlePass(users, id)} size="sm" variant='outline-light' >Alterar Senha</Button></>;
            }, width: 120
        },
    ];
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
                        data.admin === 'true' && data.super === 'true' ?
                        console.log('Logado')
                        : navigate('/unauthorized')
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

    const getUsers = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}getusers`);
            setUsers(res.data);
        } catch { }
    }

    useEffect(() => {
        validations();
        getUsers();
    }, [setUsers]);

    const handleCreate = () => {
        setShow(true);
    }
    const handleEdit = (user, id) => {
        const id2 = [id];
        const selectedRowsData = id2.map((id) => user.find((row) => row.id === id));
        setUser(selectedRowsData[0]);
        setShow2(true);
    }

    const handlePass = (user, id) => {
        const id2 = [id];
        const selectedRowsData = id2.map((id) => user.find((row) => row.id === id));
        setUser(selectedRowsData[0]);
        setShow4(true);
    }

    const handleDelete = (user, id) => {
        const id2 = [id];
        const selectedRowsData = id2.map((id) => user.find((row) => row.id === id));
        setUser(selectedRowsData[0]);
        setShow3(true);
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
                <Header title="Gerenciamento de acessos" subtitle="Estabeleça e administre os privilégios de acesso para todos os usuários." />
            </Box>
            <Grid p='10px' xs={12} backgroundColor={colors.primary[400]} >
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent='rigth'>
                    <Grid xs={12} sm={12} md={6} lg={3} xl={1}>
                        <Box
                            width="100%"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            className='border-radius'
                        >
                            <Button onClick={() => handleCreate()} size="sm" variant='outline-light' >Adicionar Usuário</Button>
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
                    rows={users}
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
            {show && (
                <AddUser show={show} setShow={setShow} getUsers={getUsers} />
            )}
            {show2 && (
                <ChangeUser show2={show2} setShow2={setShow2} user={user} getUsers={getUsers} />
            )}
            {show3 && (
                <DeleteUser show3={show3} setShow3={setShow3} user={user} getUsers={getUsers} />
            )}
            {show4 && (
                <ChangePass show4={show4} setShow4={setShow4} user={user} getUsers={getUsers} />
            )}
            <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_RIGHT} />
        </Box>
)
}

export default Access;