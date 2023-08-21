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
const VisaoGeral = () => {

    const theme = useTheme();
    const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
    const colors = tokens(theme.palette.mode);

    const rows = [
        createData('Banco do Brasil', 'R$11.351,57' ),
        createData('Banco Santander', 'R$2.598,20'),
        createData('Itaú', '500,25'),
        createData('Bradesco', '850,00'),
        createData('Caixa Fisico', '758,54'),
        createData(),
    ];

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
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
                            <Typography variant="h4" fontWeight="600">
                                Contas de Movimentação
                            </Typography>
                            {/* <TableContainer component={Paper}> */}
                                <Table sx={{ minWidth: 450 }} size="small" aria-label="a dense table">
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
                        </Box>
                    </Grid>
                    <Grid xs={12} sm={12} md={4}>
                        <Box backgroundColor={colors.primary[400]} p="30px">
                            <Typography variant="h5" fontWeight="600">
                                Campaign
                            </Typography>
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                mt="25px"
                            >
                                <ProgressCircle size="125" />
                                <Typography
                                    variant="h5"
                                    color={colors.greenAccent[500]}
                                    sx={{ mt: "15px" }}
                                >
                                    $48,352 revenue generated
                                </Typography>
                                <Typography>
                                    Includes extra misc expenditures and costs
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid xs={12} sm={12} md={4}>
                        <Box backgroundColor={colors.primary[400]} p="30px">
                            <Typography m="0px 0px 10px 0px" variant="h2" fontWeight="600">
                                < AccountBalanceIcon sx={{ fontSize: "30px" }} />
                                Contas de Movimentação
                            </Typography>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <Typography color={colors.greenAccent[500]} gutterBottom variant="h5" component="div">
                                            Banco do Brasil
                                        </Typography>
                                        <Typography color={colors.greenAccent[500]} gutterBottom variant="h5" component="div">
                                            Santander
                                        </Typography>
                                        <Typography color={colors.greenAccent[500]} gutterBottom variant="h5" component="div">
                                            Bradesco
                                        </Typography>
                                        <Typography variant="h4" gutterBottom>
                                            Total: R$15.157,19
                                        </Typography>
                                        {/* <Typography variant="body2" color="text.secondary">
                                            ID: 1030114
                                        </Typography> */}
                                    </Grid>
                                    {/* <Grid item>
                                        <Typography variant="h4">
                                            Total
                                        </Typography>
                                    </Grid> */}
                                </Grid>
                                <Grid item >
                                    <Typography gutterBottom variant="h5" component="div">
                                        R$15.157,19
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="div">
                                        R$15.157,19
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="div">
                                        R$15.157,19
                                    </Typography>
                                    {/* <Typography variant="h4" component="div">
                                        R$15.157,19
                                    </Typography> */}
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default VisaoGeral;