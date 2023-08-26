import Grid from "@mui/material/Unstable_Grid2";
import StatBox from "./box";
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import {
    Box,
    Button,
    IconButton,
    Typography,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import { tokens } from "../../theme";

const AllStatBox = ({TotalReceitas, TotalDespesas, ReceitaxDespesa, TotalReceitasPrev, TotalDespesasPrev, ReceitaxDespesaPrev, ClassReceitas, ClassReceitasPrev, ClassDespesas, ClassDespesasPrev, ClassReceitaxDespesa, ClassReceitaxDespesaPrev}) => {

    const theme = useTheme();
    const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
    const colors = tokens(theme.palette.mode);

    return (
        <>
            <Grid className='box-margin' container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid xs={12} sm={12} md={6} lg={3} xl={4}>
                    <Box
                        width="100%"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        className="borda3"
                    >
                        <StatBox
                            title={TotalReceitas}
                            subtitle='Total de receitas no período'
                            progress=''
                            increase=''
                            // icon={
                            //     <Diversity3OutlinedIcon
                            //         sx={{ color: colors.greenAccent[600], fontSize: "35px" }}
                            //     />
                            // }
                            icon2={<AttachMoneyOutlinedIcon sx={{ color: colors.greenAccent[600], fontSize: "40px" }} />}
                            classvalue={ClassReceitas}
                        />
                    </Box>
                </Grid>

                <Grid xs={12} sm={12} md={6} lg={3} xl={4}>
                    <Box
                        width="100%"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        className="borda4"
                    >
                        <StatBox
                            title={TotalDespesas}
                            subtitle='Total de despesas no período'
                            progress=''
                            increase=''
                            // icon={
                            //     <Diversity3OutlinedIcon
                            //         sx={{ color: colors.greenAccent[600], fontSize: "35px" }}
                            //     />
                            // }
                            icon2={<AttachMoneyOutlinedIcon sx={{ color: colors.greenAccent[600], fontSize: "40px" }} />}
                            classvalue={ClassDespesas}
                        />
                    </Box>
                </Grid>

                <Grid xs={12} sm={12} md={6} lg={3} xl={4}>
                    <Box
                        width="100%"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        className={ClassReceitaxDespesa == 'vermelho' ? 'borda4' : 'borda3'}
                    >
                        <StatBox
                            title={ReceitaxDespesa}
                            subtitle='Receitas x Despesas no período'
                            progress=''
                            increase=''
                            // icon={
                            //     <Diversity3OutlinedIcon
                            //         sx={{ color: colors.greenAccent[600], fontSize: "35px" }}
                            //     />
                            // }
                            icon2={<CurrencyExchangeOutlinedIcon sx={{ color: colors.greenAccent[600], fontSize: "40px" }} />}
                            classvalue={ClassReceitaxDespesa}
                        />
                    </Box>
                </Grid>
            </Grid>

            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid xs={12} sm={12} md={6} lg={3} xl={4}>
                    <Box
                        width="100%"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        className="borda3"
                    >
                        <StatBox
                            title={TotalReceitasPrev}
                            subtitle='Total de receitas previstas no período'
                            progress=''
                            increase=''
                            // icon={
                            //     <Diversity3OutlinedIcon
                            //         sx={{ color: colors.greenAccent[600], fontSize: "35px" }}
                            //     />
                            // }
                            icon2={<AttachMoneyOutlinedIcon sx={{ color: colors.greenAccent[600], fontSize: "40px" }} />}
                            classvalue={ClassReceitasPrev}
                        />
                    </Box>
                </Grid>

                <Grid xs={12} sm={12} md={6} lg={3} xl={4}>
                    <Box
                        width="100%"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        className="borda4"
                    >
                        <StatBox
                            title={TotalDespesasPrev}
                            subtitle='Total de despesas previstas no período'
                            progress=''
                            increase=''
                            // icon={
                            //     <Diversity3OutlinedIcon
                            //         sx={{ color: colors.greenAccent[600], fontSize: "35px" }}
                            //     />
                            // }
                            icon2={<AttachMoneyOutlinedIcon sx={{ color: colors.greenAccent[600], fontSize: "40px" }} />}
                            classvalue={ClassDespesasPrev}
                        />
                    </Box>
                </Grid>

                <Grid xs={12} sm={12} md={6} lg={3} xl={4}>
                    <Box
                        width="100%"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        className={ClassReceitaxDespesaPrev == 'vermelho' ? 'borda4' : 'borda3'}
                    >
                        <StatBox
                            title={ReceitaxDespesaPrev}
                            subtitle='Receitas x Despesas previstas no período'
                            progress=''
                            increase=''
                            // icon={
                            //     <Diversity3OutlinedIcon
                            //         sx={{ color: colors.greenAccent[600], fontSize: "35px" }}
                            //     />
                            // }
                            icon2={<CurrencyExchangeOutlinedIcon sx={{ color: colors.greenAccent[600], fontSize: "40px" }} />}
                            classvalue={ClassReceitaxDespesaPrev}
                        />
                    </Box>
                </Grid>
            </Grid>

        </>

    )

}

export default AllStatBox