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
import LineChart from "./LineChart";
import "./style.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const VisaoGeral = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
    const colors = tokens(theme.palette.mode);
    const [contas, setContas] = useState([]);
    const [saldoTotal, setSaldoTotal] = useState(0);
    const [recebimentos, setRecebimentos] = useState(0);
    const [pagamentos, setPagamentos] = useState(0);
    const [rows, setRows] = useState([]);
    let recebimentos_aux = 0;
    let pagamentos_aux = 0;

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
                        data.admin === 'true' ?
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

    const getContas = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}getcontas`);
            const contas_aux = res.data;
            let total = 0;
            for (var conta of contas_aux) {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}checkcontareceita/` + conta.id);
                const res2 = await axios.get(`${process.env.REACT_APP_API_URL}checkcontadespesa/` + conta.id);
                Object.defineProperty(conta, 'saldo', {
                    value: (res.data[0].valor - res2.data[0].valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                })
                total = total + (res.data[0].valor - res2.data[0].valor);
            }
            setContas(contas_aux)
            setSaldoTotal(total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
        } catch {
            console.log('erro desconhecido');
        }
    }

    const getRecebimentos = async () => {

        const d = new Date();
        const date = (d.getUTCFullYear() + '-' + (d.getUTCMonth() + 1) + '-' + d.getUTCDate())

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}getrecebimentos/` + date);
            setRecebimentos(res.data[0].valor == null ? 'R$0,00' : res.data[0].valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
        } catch {
            console.log('erro desconhecido');
        }
    }

    const getPagamentos = async () => {

        const d = new Date();
        const date = (d.getUTCFullYear() + '-' + (d.getUTCMonth() + 1) + '-' + d.getUTCDate())

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}getpagamentos/` + date);
            setPagamentos(res.data[0].valor == null ? 'R$0,00' : res.data[0].valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
        } catch {
            console.log('erro desconhecido');
        }
    }

    const getlancamentos = async () => {
        const d = new Date();
        const init = (d.getUTCFullYear() + '-' + (d.getUTCMonth() + 1) + '-' + '01')
        const end = (d.getUTCFullYear() + '-' + (d.getUTCMonth() + 1) + '-' + (new Date(d.getUTCFullYear(), d.getUTCMonth() + 1, 0).getUTCDate()));
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}getlastlancamentos/` + init + '/' + end);
            setRows(ChangeData(res.data));
        } catch {
            console.log('erro desconhecido');
        }
    }

    const ChangeData = (data) => {
        for (var linha of data) {

            if (linha.data) {
                const newdate = new Date(linha.data);
                // const dia = (newdate.getDate() + 1) < 10 ? `0${(newdate.getDate() + 1)}` : (newdate.getDate() + 1);;
                const dia = (newdate.getUTCDate()) < 10 ? `0${(newdate.getUTCDate())}` : (newdate.getUTCDate());;
                // const mes = (newdate.getMonth() + 1) < 10 ? `0${(newdate.getMonth() + 1)}` : (newdate.getMonth() + 1);
                const mes = (newdate.getUTCMonth() + 1) < 10 ? `0${(newdate.getUTCMonth() + 1)}` : (newdate.getUTCMonth() + 1);
                const ano = newdate.getUTCFullYear();
                const formatDate = dia + '/' + mes + '/' + ano;
                Object.defineProperty(linha, 'data', {
                    value: formatDate,
                })
            }

            if (linha.valor) {
                Object.defineProperty(linha, 'valor', {
                    value: (linha.valor ? linha.valor : 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                })
            } else {
                Object.defineProperty(linha, 'valor', {
                    value: (linha.valor ? linha.valor : 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                })
            }
        }
        return (
            data
        )
    }

    useEffect(() => {
        validations();
        getContas();
        getRecebimentos();
        getPagamentos();
        getlancamentos();
    }, [setContas, setRecebimentos]);

    return (
        <Box m="20px">
            <Box
                display={smScreen ? "flex" : "block"}
                flexDirection={smScreen ? "row" : "column"}
                justifyContent={smScreen ? "space-between" : "start"}
                alignItems={smScreen ? "center" : "start"}
                m="10px 0"
            >
                <Header title="Painel Financeiro" subtitle="Bem-vindo ao Painel Financeiro " />
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
                        <Box className="borda2" backgroundColor={colors.primary[400]} p="30px" >
                            <Typography variant="h3" fontWeight="600">
                                Contas de Movimentação
                            </Typography>
                            {/* <TableContainer component={Paper}> */}
                            <Table size="small" aria-label="a dense table" className="borda">
                                <TableBody>
                                    {contas.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.nome}
                                            </TableCell>
                                            <TableCell align="right" >
                                                <b>{row.saldo}</b>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            {/* </TableContainer> */}
                            <Box m="5px 0 0px 0" display="flex"
                                justifyContent="space-between">
                                <Box className="total">Saldo total:</Box>
                                <Box className="total">{saldoTotal}</Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid xs={12} sm={12} md={4}>
                        <Box className="borda3" backgroundColor={colors.primary[400]} p="30px">
                            <Box display="flex" justifyContent="center">
                                <Box><AttachMoneyOutlinedIcon className="icone1" sx={{ fontSize: "30px" }} /></Box>
                                <Box><h4 className="box2">Recebimentos em atraso</h4></Box>
                            </Box>
                            <Box display="flex" justifyContent="center">
                                <Box className="recebimento">{recebimentos}</Box>
                            </Box>
                            <Box display="flex" justifyContent="center">
                                <Link to="/transacoes" className="link">Ir para Transações</Link>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid xs={12} sm={12} md={4}>
                        <Box className="borda4" backgroundColor={colors.primary[400]} p="30px">
                            <Box display="flex" justifyContent="center">
                                <Box><AttachMoneyOutlinedIcon className="icone2" sx={{ fontSize: "30px" }} /></Box>
                                <Box><h4 className="box3">Pagamentos em atraso</h4></Box>
                            </Box>
                            <Box display="flex" justifyContent="center">
                                <Box className="pagamentos">{pagamentos}</Box>
                            </Box>
                            <Box display="flex" justifyContent="center">
                                <Link to="/transacoes" className="link2">Ir para Transações</Link>
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
                        <Typography variant="h4" fontWeight="600">
                            Últimos Lançamentos
                        </Typography>
                        <TableContainer>
                            <Table className="borda" size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className="cabecalho" >Data da Transação</TableCell>
                                        <TableCell className="cabecalho" >Descrição</TableCell>
                                        <TableCell className="cabecalho">Membro/Fornecedor</TableCell>
                                        <TableCell className="cabecalho">Valor da Transação</TableCell>
                                        <TableCell className="cabecalho">Centro de Custo</TableCell>
                                        <TableCell className="cabecalho">Plano de Contas</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell className='bolder' component="th" scope="row">
                                                {row.data}
                                            </TableCell>
                                            <TableCell className='bolder' >
                                                {row.descricao}
                                            </TableCell>
                                            <TableCell className='bolder' >
                                                {row.nome_pessoa_fornecedor}
                                            </TableCell>
                                            <TableCell className={row.categoria == 'Receita' ? 'positivo' : 'negativo'}>
                                                {row.valor}
                                            </TableCell>
                                            <TableCell className='bolder' >
                                                {row.nome_centro_custo}
                                            </TableCell>
                                            <TableCell className='bolder' >
                                                {row.nome_plano_contas}
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
                                        FLUXO DE CAIXA MENSAL ANO ATUAL
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
                            {/* <Box height="250px" m="-20px 0 0 0">
                                <LineChart2 isDashboard={true} />
                            </Box> */}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default VisaoGeral;