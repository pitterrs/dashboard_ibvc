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

const AllStatBox = () => {

    const theme = useTheme();
    const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
    const colors = tokens(theme.palette.mode);

    return (
        <>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
                    <Box
                        width="100%"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <StatBox
                            title='R$19.998,00'
                            subtitle='Total de receitas no período'
                            progress=''
                            increase=''
                            // icon={
                            //     <Diversity3OutlinedIcon
                            //         sx={{ color: colors.greenAccent[600], fontSize: "35px" }}
                            //     />
                            // }
                            icon2={<AttachMoneyOutlinedIcon sx={{ color: colors.greenAccent[600], fontSize: "40px" }} />}
                        />
                    </Box>
                </Grid>

                <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
                    <Box
                        width="100%"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <StatBox
                            title='R$-2.000,00'
                            subtitle='Total de despesas no período'
                            progress=''
                            increase=''
                            // icon={
                            //     <Diversity3OutlinedIcon
                            //         sx={{ color: colors.greenAccent[600], fontSize: "35px" }}
                            //     />
                            // }
                            icon2={<AttachMoneyOutlinedIcon sx={{ color: colors.greenAccent[600], fontSize: "40px" }} />}
                        />
                    </Box>
                </Grid>

                <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
                    <Box
                        width="100%"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <StatBox
                            title='R$8.000,00'
                            subtitle='Receitas x Despesas no período'
                            progress=''
                            increase=''
                            // icon={
                            //     <Diversity3OutlinedIcon
                            //         sx={{ color: colors.greenAccent[600], fontSize: "35px" }}
                            //     />
                            // }
                            icon2={<CurrencyExchangeOutlinedIcon sx={{ color: colors.greenAccent[600], fontSize: "40px" }} />}
                        />
                    </Box>
                </Grid>

                <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
                    <Box
                        width="100%"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <StatBox
                            title='R$24.998,00'
                            subtitle='Total em total as contas'
                            progress=''
                            increase=''
                            // icon={
                            //     <Diversity3OutlinedIcon
                            //         sx={{ color: colors.greenAccent[600], fontSize: "35px" }}
                            //     />
                            // }
                            icon2={<AccountBalanceOutlinedIcon sx={{ color: colors.greenAccent[600], fontSize: "40px" }} />}
                        />
                    </Box>
                </Grid>
            </Grid>

            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
                    <Box
                        width="100%"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <StatBox
                            title='R$22.218,00'
                            subtitle='Total de receitas previstas no período'
                            progress=''
                            increase=''
                            // icon={
                            //     <Diversity3OutlinedIcon
                            //         sx={{ color: colors.greenAccent[600], fontSize: "35px" }}
                            //     />
                            // }
                            icon2={<AttachMoneyOutlinedIcon sx={{ color: colors.greenAccent[600], fontSize: "40px" }} />}
                        />
                    </Box>
                </Grid>

                <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
                    <Box
                        width="100%"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <StatBox
                            title='R$-20.187,00'
                            subtitle='Total de despesas previstas no período'
                            progress=''
                            increase=''
                            // icon={
                            //     <Diversity3OutlinedIcon
                            //         sx={{ color: colors.greenAccent[600], fontSize: "35px" }}
                            //     />
                            // }
                            icon2={<AttachMoneyOutlinedIcon sx={{ color: colors.greenAccent[600], fontSize: "40px" }} />}
                        />
                    </Box>
                </Grid>

                <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
                    <Box
                        width="100%"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <StatBox
                            title='R$2.031,00'
                            subtitle='Receitas x Despesas previstas no período'
                            progress=''
                            increase=''
                            // icon={
                            //     <Diversity3OutlinedIcon
                            //         sx={{ color: colors.greenAccent[600], fontSize: "35px" }}
                            //     />
                            // }
                            icon2={<CurrencyExchangeOutlinedIcon sx={{ color: colors.greenAccent[600], fontSize: "40px" }} />}
                        />
                    </Box>
                </Grid>

                <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
                    <Box
                        width="100%"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <StatBox
                            title='R$24.998,00'
                            subtitle='Total em total as contas'
                            progress=''
                            increase=''
                            // icon={
                            //     <Diversity3OutlinedIcon
                            //         sx={{ color: colors.greenAccent[600], fontSize: "35px" }}
                            //     />
                            // }
                            icon2={<AccountBalanceOutlinedIcon sx={{ color: colors.greenAccent[600], fontSize: "40px" }} />}
                        />
                    </Box>
                </Grid>

                
            </Grid>

        </>

    )

}

export default AllStatBox