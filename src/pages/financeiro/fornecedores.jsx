import {
    Box,
    IconButton,
    Typography,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Button from 'react-bootstrap/Button';
import "./style.css"
import { React, useEffect, useState } from "react";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const Fornecedores = () => {
    const [pageSize, setPageSize] = useState(10);
    const theme = useTheme();
    const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
    const colors = tokens(theme.palette.mode);
    const [financas, setFinancas] = useState([]);
    const [financa, setFinanca] = useState(null);
    const columns = [
        {
            field: "icone", headerName: "Ações", renderCell: ({ row: { id } }) => {
                return <> < ModeEditIcon className="pointer edit" onClick={() => handleEdit(financas, id)} /> < CheckCircleIcon className="pointer aprovar" onClick={() => handleApprov(financas, id)} />  < DeleteForeverIcon className="pointer lixo" onClick={() => handleDelete(financas, id)} /></>;
            }, width: 100
        },
        {
            field: "nome",
            headerName: "Pessoa/Fornecedor",
            cellClassName: "name-column--cell",
            width: 200,
        },
        { field: "doc", headerName: "CPF/CNPJ", width: 100 },
        { field: "contato", headerName: "Contato", width: 200 },
    ];

    const handleEdit = (financas, id) => {
        console.log('editar');
        const id2 = [id];
        const selectedRowsData = id2.map((id) => financas.find((row) => row.id === id));
        setFinanca(selectedRowsData);
        // setShow(true);
    }
    const handleApprov = (financas, id) => {
        console.log('aprovar');
        const id2 = [id];
        const selectedRowsData = id2.map((id) => financas.find((row) => row.id === id));
        setFinanca(selectedRowsData);
        // setShow(true);
    }
    const handleDelete = (financas, id) => {
        console.log('deletar');
        const id2 = [id];
        const selectedRowsData = id2.map((id) => financas.find((row) => row.id === id));
        setFinanca(selectedRowsData);
        // setShow(true);
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
                <Header title="Pessoa/Fornecedor" subtitle="Realize o cadastro das pessoas e fornecedores para acompanhamento dos registros de despesas e receitas vinculadas a cada um." />
            </Box>
            <Box>
                <Grid
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    container
                    rowSpacing={1}

                >
                    <Grid m='20px 0 0 0' p='10px' xs={12} backgroundColor={colors.primary[400]} >
                        <Box m="0 0 5px 0"><Button size="sm" variant="secondary">Adicionar Pessoa/Fornecedor</Button></Box>
                        <Box
                            m="8px 0 0 0"
                            width="100%"
                            height="70vh"
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
                                pageSize={pageSize}
                                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                rowsPerPageOptions={[5, 10, 20]}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default Fornecedores;