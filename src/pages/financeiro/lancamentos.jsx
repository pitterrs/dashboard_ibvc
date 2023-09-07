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
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useState, useEffect } from "react";
import EditLanchamento from "./changelancamento";
import AddLancamento from "./addlancamento";
import { useNavigate } from "react-router-dom";

const Lancamentos = () => {
    const theme = useTheme();
    const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
    const colors = tokens(theme.palette.mode);
    const [rows, setRows] = useState([]);
    const [onEdit, setOnEdit] = useState();
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const navigate = useNavigate();
    const [logado, setLogado] = useState(false);

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
                        data.viewfinancas === 'true' ?
                            setLogado(true)
                            : window.location.replace(`${process.env.REACT_APP_SITE_URL}unauthorized`)
                    } else {
                        setLogado(false);
                        window.location.replace(`${process.env.REACT_APP_SITE_URL}login`);
                    }
                }
            )
            .catch(({ err }) => {
                setLogado(false)
                toast.error('Ocorreu um erro ao tentar validar seu acesso. Faça login novamente ou entre em contato com o administrador.')
                window.location.replace(`${process.env.REACT_APP_SITE_URL}login`);
            });
    }

    const getLancamentos = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}getplanos`);
            setRows(res.data)
        } catch {
            console.log('erro desconhecido');
        }
    }

    useEffect(() => {
        validations();
        getLancamentos();
    }, [setRows]);

    const handleEdit = (row) => {
        setOnEdit(row);
        setShow(true);
    }

    const handleCreate = () => {
        setShow2(true);
    }
    return (
        logado ?
        <Box m="20px">
            <Box
                display={smScreen ? "flex" : "block"}
                flexDirection={smScreen ? "row" : "column"}
                justifyContent={smScreen ? "space-between" : "start"}
                alignItems={smScreen ? "center" : "start"}
                m="10px 0"
            >
                <Header title="Plano de contas" subtitle="O plano de contas é criado para tornar a estrutura do fluxo de caixa mais compreensível a fim de que os resultados
                                tornem a análise dos dados compatível com a legislação e a contabilidade da igreja." />
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
                                Atenção! Alterações não terão efeito para os lançamento que já foram cadastrados para o plano de contas antigo. É necessário alterar o lançamento manualmente para refletir a alteração.
                            </Alert>
                            <Typography m='10px 0px 10px 0px' variant="h3" fontWeight="600">
                                Lista de Planos de Contas
                            </Typography>
                        </Box>
                        <Box m="0 0 5px 0"><Button onClick={() => handleCreate()} size="sm" variant="secondary">Adicionar Plano de conta</Button></Box>
                        <TableContainer >
                            <Table size="small" aria-label="a dense table" className="borda">
                                <TableHead >
                                    <TableRow>
                                        <TableCell>Plano de Conta</TableCell>
                                        <TableCell>Tipo</TableCell>
                                        <TableCell>Ações</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.nome}
                                            </TableCell>
                                            <TableCell>
                                                {row.tipo}
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
                <EditLanchamento show={show} setShow={setShow} onEdit={onEdit} setOnEdit={setOnEdit} getLancamentos={getLancamentos} />
            )}
            {show2 && (
                <AddLancamento show2={show2} setShow2={setShow2} getLancamentos={getLancamentos} />
            )}
            <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_RIGHT} />
        </Box>
        : ''
    )
}

export default Lancamentos;