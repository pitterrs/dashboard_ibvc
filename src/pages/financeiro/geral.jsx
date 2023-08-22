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
import ProgressCircle from "../../components/ProgressCircle";
import Header from "../../components/Header";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import { Link } from "react-router-dom";
import { React, useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import LineChart from "../../components/LineChart";
const VisaoGeral = () => {

    const theme = useTheme();
    const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
    const colors = tokens(theme.palette.mode);
    const [financas, setFinancas] = useState([]);
    const [pageSize, setPageSize] = useState(10);

    const getFinancas = async () => {
        try {
            const res = await axios.get(`http://localhost:8800/getfinancas`);
            setFinancas(res.data)
        } catch (error) {
            console.log('erro desconhecido');
        }
    }

    useEffect(() => {
        getFinancas();
    }, [setFinancas]);

    const rows = [
        createData('Banco do Brasil', 'R$11.351,57'),
        createData('Banco Santander', 'R$2.598,20'),
        createData('Itaú', '500,25'),
        createData('Bradesco', '850,00'),
        createData('Caixa Fisico', '758,54'),
        createData(),
    ];

    const rows2 = [
        createData2('21/08/2023', 'Transferência entre contas Bradesco x Santander', 'IBVC', 'R$11.351,57', 'Departamento Financeiro', 'Contabilidade'),
        createData2('21/08/2023', 'Transferência entre contas', 'IBVC', 'R$11.351,57', 'Departamento Financeiro', 'Contabilidade'),
        createData2('21/08/2023', 'Transferência entre contas', 'IBVC', 'R$11.351,57', 'Departamento Financeiro', 'Contabilidade'),
        createData2('21/08/2023', 'Transferência entre contas', 'IBVC', 'R$11.351,57', 'Departamento Financeiro', 'Contabilidade'),
        createData2('21/08/2023', 'Transferência entre contas', 'IBVC', 'R$11.351,57', 'Departamento Financeiro', 'Contabilidade'),
        createData2('21/08/2023', 'Transferência entre contas', 'IBVC', 'R$11.351,57', 'Departamento Financeiro', 'Contabilidade'),
        createData2()
    ];

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    function createData2(data, descricao, pessoa, valor, centrocusto, plano) {
        return { data, descricao, pessoa, valor, centrocusto, plano };
    }

    const columns = [
        // {
        //     field: "icone", headerName: "Ações", renderCell: ({ row: { id } }) => {
        //         return <> < ModeEditIcon className="pointer edit" onClick={() => handleEdit(financas, id)} /> < CheckCircleIcon className="pointer aprovar" onClick={() => handleApprov(financas, id)} />  < DeleteForeverIcon className="pointer lixo" onClick={() => handleDelete(financas, id)} /></>;
        //     }, width: 100
        // },
        {
            field: "nome",
            headerName: "Data da Transação",
            cellClassName: "name-column--cell",
            width: 200,
        },
        { field: "celular", headerName: "Descrição", width: 100 },
        { field: "email", headerName: "Membro/fornecedor", width: 200 },
        { field: "cargo", headerName: "Valor da Transação", width: 250 },
        { field: "Teste", headerName: "Centro de Custo", width: 250 },
        { field: "Teste2", headerName: "Plano de Contas", width: 250 },
    ];

    return (
        <Box m="20px">
            <Box
                display={smScreen ? "flex" : "block"}
                flexDirection={smScreen ? "row" : "column"}
                justifyContent={smScreen ? "space-between" : "start"}
                alignItems={smScreen ? "center" : "start"}
                m="10px 0"
            >
                <Header title="Dashboard Financeiro" subtitle="Bem-vindo ao Dashboard Financeiro " />
            </Box>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    container
                    rowSpacing={2}
                    columnSpacing={{ xs: 1, sm: 2, md: 2 }}
                >
                    <Grid xs={12} sm={12} md={4} >
                        <Box backgroundColor={colors.primary[400]} p="30px" >
                            <Typography variant="h3" fontWeight="600">
                                Contas de Movimentação
                            </Typography>
                            {/* <TableContainer component={Paper}> */}
                            <Table size="small" aria-label="a dense table">
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.calories}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            {/* </TableContainer> */}
                            <Box display="flex"
                                justifyContent="space-between">
                                <Box>Saldo total:</Box>
                                <Box>R$2.135,31</Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid xs={12} sm={12} md={4}>
                        <Box backgroundColor={colors.primary[400]} p="30px">
                            <Box display="flex" justifyContent="center">
                                <Box><AttachMoneyOutlinedIcon sx={{ fontSize: "30px" }} /></Box>
                                <Box><h4>Recebimentos em atraso</h4></Box>
                            </Box>
                            <Box display="flex" justifyContent="center">
                                <Box>R$123.456,32</Box>
                            </Box>
                            <Box display="flex" justifyContent="center">
                                <Link>Visualizar Recebimentos</Link>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid xs={12} sm={12} md={4}>
                        <Box backgroundColor={colors.primary[400]} p="30px">
                            <Box display="flex" justifyContent="center">
                                <Box><AttachMoneyOutlinedIcon sx={{ fontSize: "30px" }} /></Box>
                                <Box><h4>Pagamentos em atraso</h4></Box>
                            </Box>
                            <Box display="flex" justifyContent="center">
                                <Box>R$123.456,32</Box>
                            </Box>
                            <Box display="flex" justifyContent="center">
                                <Link>Visualizar Recebimentos</Link>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            
            <Box>
                <Grid
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    container
                    rowSpacing={1}

                >
                    <Grid m='20px 0 0 0' p='10px' xs={12} backgroundColor={colors.primary[400]}>
                        <Typography variant="h3" fontWeight="600">
                            10 ÚLTIMAS TRANSAÇÕES
                        </Typography>
                        <TableContainer>
                            <Table size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell width='150'>Data da Transação</TableCell>
                                        <TableCell width='350'>Descrição</TableCell>
                                        <TableCell>Membro/Fornecedor</TableCell>
                                        <TableCell>Valor da Transação</TableCell>
                                        <TableCell>Centro de Custo</TableCell>
                                        <TableCell>Plano de Contas</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows2.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.data}
                                            </TableCell>
                                            <TableCell>
                                                {row.descricao}
                                            </TableCell>
                                            <TableCell>
                                                {row.pessoa}
                                            </TableCell>
                                            <TableCell>
                                                {row.valor}
                                            </TableCell>
                                            <TableCell>
                                                {row.centrocusto}
                                            </TableCell>
                                            <TableCell>
                                                {row.plano}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
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
                                        FLUXO DE CAIXA MÊS ATUAL
                                    </Typography>
                                    <Typography
                                        variant="h5"
                                        fontWeight="600"
                                        color={colors.greenAccent[500]}
                                    >
                                        Receitas/Despesas
                                    </Typography>
                                </Box>
                            </Box>
                            <Box height="250px" m="-20px 0 0 0">
                                <LineChart isDashboard={true} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default VisaoGeral;