import React, {useEffect} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Grid from "@mui/material/Unstable_Grid2";
import { Box, useTheme, useMediaQuery, Typography } from "@mui/material";
import { tokens } from "../../theme";
const Unauthorized = () => {
    const theme = useTheme();
    const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
    const colors = tokens(theme.palette.mode);

    const validations = async () => {
        const token = localStorage.getItem("IBVC_token");
        const key = localStorage.getItem("IBVC_key");

        await axios
            .post("http://localhost:8800/validation", {
                Authorization: token,
                key,
            })
            .then(
                ({ data }) => {
                    if (data.error === false) {
                        console.log('Logado')
                    } else {
                        window.location.replace('http://localhost:3000/login');
                    }
                }
            )
            .catch(({ err }) => {
                console.log(err)
                toast.error('Ocorreu um erro ao tentar validar seu acesso. Faça login novamente ou entre em contato com o administrador.')
                window.location.replace('http://localhost:3000/login');
            });
    }

    useEffect(() => {
        validations()
    }, []);
    return (
        <Box m="20px" >
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 5 }} alignItems='center' justifyContent="center" m="0 0 10px 0">
                <Typography variant="h2" color={colors.grey[100]}>
                    Não Autorizado!
                </Typography>
            </Grid>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 5 }} alignItems='center' justifyContent="center" >
                <p>Você não possui acesso a este conteúdo. Para obtê-lo, por favor, entre em contato com o administrador do sistema.</p>
            </Grid>
        </Box>
    )
}

export default Unauthorized;