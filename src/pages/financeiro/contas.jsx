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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from 'react-bootstrap/Button';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import "./style.css"
import Alert from '@mui/material/Alert';
import { useState, useEffect } from "react";
import EditConta from "./modalcontas";
import { toast, ToastContainer } from "react-toastify";
import AddConta from "./addconta";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Contas = () => {
    const theme = useTheme();
    const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
    const colors = tokens(theme.palette.mode);
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [onEdit, setOnEdit] = useState();
    const [contas, setContas] = useState([]);
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
            for (var conta of contas_aux) {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}checkcontareceita/` + conta.id);
                const res2 = await axios.get(`${process.env.REACT_APP_API_URL}checkcontadespesa/` + conta.id);
                Object.defineProperty(conta, 'saldo', {
                    value: (res.data[0].valor - res2.data[0].valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                })
            }
            setContas(contas_aux)
            // setContas(res.data)
        } catch {
            console.log('erro desconhecido');
        }
    }
    useEffect(() => {
        validations();
        getContas();
    }, [setContas]);

    const handleEdit = (row) => {
        setOnEdit(row);
        setShow(true);
    }
    const handleCreate = () => {
        setShow2(true);
        console.log('teste');
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
                <Header title="Contas" subtitle="Realize o cadastro das contas utilizadas pela igreja." />
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
                        <Box m="0 0 5px 0">
                            <Alert variant="outlined" severity="error">
                                Atenção! As contas que possuírem valores cadastrados em lançamentos não poderão ser excluídas.
                            </Alert>
                            <Typography m='10px 0px 10px 0px' variant="h3" fontWeight="600">
                                Lista de Contas Cadastradas
                            </Typography>
                        </Box>
                        <Box m="0 0 5px 0"><Button onClick={() => handleCreate()} size="sm" variant="secondary">Adicionar Conta</Button></Box>
                        <TableContainer>
                            <Table className="borda" size="small" aria-label="a dense table">
                                <TableHead >
                                    <TableRow>
                                        <TableCell >Nome do Banco</TableCell>
                                        <TableCell >Agência</TableCell>
                                        <TableCell>Nº da Conta</TableCell>
                                        <TableCell>Tipo</TableCell>
                                        <TableCell>Saldo</TableCell>
                                        <TableCell>Ações</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {contas.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.nome}
                                            </TableCell>
                                            <TableCell>
                                                {row.agencia}
                                            </TableCell>
                                            <TableCell>
                                                {row.conta}
                                            </TableCell>
                                            <TableCell>
                                                {row.tipo}
                                            </TableCell>
                                            <TableCell>
                                                {row.saldo}
                                            </TableCell>
                                            <TableCell>
                                                <EditTwoToneIcon onClick={() => handleEdit(row)} className="pointer" />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Box>
            {show && (
                <EditConta show={show} setShow={setShow} onEdit={onEdit} setOnEdit={setOnEdit} getContas={getContas} />
            )}
            {show2 && (
                <AddConta show2={show2} setShow2={setShow2} getContas={getContas} />
            )}
            <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_RIGHT} />
        </Box>
    )
}

export default Contas;