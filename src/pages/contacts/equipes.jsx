import React, { useState, useEffect } from 'react';
import { tokens } from "../../theme";
import Grid from "@mui/material/Unstable_Grid2";
import Header from "../../components/Header";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import "./novomembro.css"
import Button from 'react-bootstrap/Button';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { FaGlasses } from "react-icons/fa";
import AddEquipe from './addequipe';
import { toast, ToastContainer } from "react-toastify";
import DeleteEquipe from './deleteequipe';
import EditEquipe from './changeequipe';
import ViewEquipe from './viewequipe';

const Equipes = () => {
    const theme = useTheme();
    const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
    const colors = tokens(theme.palette.mode);
    const [pageSize, setPageSize] = useState(10);
    const [equipes, setEquipes] = useState([]);
    const [equipe, setEquipe] = useState(null);
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [show4, setShow4] = useState(false);
    const columns = [
        {
            field: "icone", headerName: "Ações", renderCell: ({ row: { id } }) => {
                return <> < ModeEditIcon className="pointer edit" onClick={() => handleEdit(equipes, id)} /> < DeleteForeverIcon className="pointer lixo" onClick={() => handleDelete(equipes, id)} /> <FaGlasses className="pointer aprovar" onClick={() => handleView(equipes, id)} /> </>;
            }, width: 90
        },
        { field: "nome_equipe", headerName: "Nome da Equipe", width: 350 },
    ];

    const getEquipes = async () => {
        try {
            const res = await axios.get(`http://localhost:8800/getequipes`);
            setEquipes(res.data);
        } catch { }
    }

    useEffect(() => {
        getEquipes();
    }, [setEquipes]);

    const handleCreate = () => {
        setShow(true);
    }
    const handleEdit = (equipes, id) => {
        const id2 = [id];
        const selectedRowsData = id2.map((id) => equipes.find((row) => row.id === id));
        setEquipe(selectedRowsData[0]);
        setShow3(true);
    }

    const handleView = (equipes, id) => {
        const id2 = [id];
        const selectedRowsData = id2.map((id) => equipes.find((row) => row.id === id));
        setEquipe(selectedRowsData[0]);
        setShow4(true);
    }

    const handleDelete = (equipes, id) => {
        const id2 = [id];
        const selectedRowsData = id2.map((id) => equipes.find((row) => row.id === id));
        setEquipe(selectedRowsData[0]);
        setShow2(true);
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
                <Header title="Equipes e Ministérios" subtitle="Gerencie e crie novas equipes ou Ministérios aqui." />
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
                            <Button onClick={() => handleCreate()} size="sm" variant='outline-light' >Criar Equipe</Button>
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
                    rows={equipes}
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
                <AddEquipe show={show} setShow={setShow} getEquipes={getEquipes} />
            )}
            {show2 && (
                <DeleteEquipe show2={show2} setShow2={setShow2} equipe={equipe} setEquipe={setEquipe} getEquipes={getEquipes} />
            )}
            {show3 && (
                <EditEquipe show3={show3} setShow3={setShow3} equipe={equipe} setEquipe={setEquipe} getEquipes={getEquipes} />
            )}
            {show4 && (
                <ViewEquipe show4={show4} setShow4={setShow4} equipe={equipe} setEquipe={setEquipe} getEquipes={getEquipes} />
            )}
            <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_RIGHT} />
        </Box>
    )
}

export default Equipes;