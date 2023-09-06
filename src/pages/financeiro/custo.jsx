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
import AddCusto from "./addcusto";
import axios from "axios";
import EditCusto from "./changecusto";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CentroCusto = () => {
    const theme = useTheme();
    const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
    const colors = tokens(theme.palette.mode);
    const [rows, setRows] = useState([]);
    const [onEdit, setOnEdit] = useState();
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
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

    const getCustos = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}getcustos`);
            setRows(res.data)
        } catch {
            console.log('erro desconhecido');
        }
    }

    useEffect(() => {
        validations();
        getCustos();
    }, [setRows]);

    const handleEdit = (row) => {
        setOnEdit(row);
        setShow(true);
    }

    const handleCreate = () => {
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
                <Header title="Centros de Custo" subtitle="O que é? É uma maneira simples, mas eficiente de agrupar as despesas e as receitas, para uma melhor análise de informações financeiras de cada setor da igreja." />
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
                            {/* <Alert variant="outlined" severity="error">
                                Atenção! os centros de custo que possuírem valores cadastrados em lançamentos ou programação não poderão ser excluídos.
                            </Alert> */}
                            <Typography m='0 0 10px 0' variant="h3" fontWeight="600">
                                Lista de Centros de Custo
                            </Typography>
                        </Box>
                        <Box m="0 0 5px 0"><Button onClick={() => handleCreate()} size="sm" variant="secondary">Adicionar Centro de Custo</Button></Box>
                        <TableContainer >
                            <Table size="small" aria-label="a dense table" className="borda">
                                <TableHead >
                                    <TableRow>
                                        <TableCell>Centro de Custo</TableCell>
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
                <EditCusto show={show} setShow={setShow} onEdit={onEdit} setOnEdit={setOnEdit} getCustos={getCustos} />
            )}
            {show2 && (
                <AddCusto show2={show2} setShow2={setShow2} getCustos={getCustos} />
            )}
            <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_RIGHT} />
        </Box>
    )
}

export default CentroCusto;