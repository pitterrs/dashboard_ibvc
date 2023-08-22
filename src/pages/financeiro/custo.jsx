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

const CentroCusto = () =>{
    const theme = useTheme();
    const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
    const colors = tokens(theme.palette.mode);
    const rows2 = [
        createData2('Departamento financeiro', <EditTwoToneIcon />),
        createData2('Departamento de eventos', <EditTwoToneIcon />),
        createData2('Departamento de jovens', <EditTwoToneIcon />),
        createData2()
    ];
    function createData2(nome, edit) {
        return { nome, edit };
    }
    return(
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
                            <Alert variant="outlined" severity="error">
                            Atenção! os centros de custo que possuírem valores cadastrados em lançamentos ou programação não poderão ser excluídos.
                            </Alert>
                        </Box>
                        <Box m="0 0 5px 0"><Button size="sm" variant="secondary">Adicionar Centro de Custo</Button></Box>
                        <TableContainer >
                            <Table size="small" aria-label="a dense table" className="borda">
                                <TableHead >
                                    <TableRow>
                                        <TableCell>Centro de Custo</TableCell>
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
                                            <TableCell align="right">
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

export default CentroCusto;