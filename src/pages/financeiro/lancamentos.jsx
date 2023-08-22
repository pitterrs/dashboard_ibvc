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

const Lancamentos = () => {
    const theme = useTheme();
    const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
    const colors = tokens(theme.palette.mode);
    const rows2 = [
        createData2('Dízimo', 'Receita', <EditTwoToneIcon />),
        createData2('Ofertas', 'Receita', <EditTwoToneIcon />),
        createData2('Luz', 'Despesa', <EditTwoToneIcon />),
        createData2('Folha de Pagamento', 'Despesa', <EditTwoToneIcon />),
        createData2()
    ];
    function createData2(nome, tipo, edit) {
        return { nome, tipo, edit };
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
                                Atenção! O Plano de conta que possuir registro de lançamento cadastrado em lançamento ou programação não poderão ser excluído.
                            </Alert>
                        </Box>
                        <Box m="0 0 5px 0"><Button size="sm" variant="secondary">Adicionar Plano de conta</Button></Box>
                        <TableContainer >
                            <Table size="small" aria-label="a dense table" className="borda">
                                <TableHead >
                                    <TableRow>
                                        <TableCell>Plano de Conta</TableCell>
                                        <TableCell>Tipo</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows2.map((row) => (
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
                                                {row.edit}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default Lancamentos;