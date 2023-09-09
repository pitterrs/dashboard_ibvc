import React, {useEffect} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Grid from "@mui/material/Unstable_Grid2";
import { Box, useTheme, useMediaQuery, Typography } from "@mui/material";
import { tokens } from "../../theme";
const Error404 = () => {
    const theme = useTheme();
    const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
    const colors = tokens(theme.palette.mode);

    return (
        <Box m="20px" >
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 5 }} alignItems='center' justifyContent="center" m="0 0 10px 0">
                <Typography variant="h1" color={colors.grey[100]}>
                    404
                </Typography>
            </Grid>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 5 }} alignItems='center' justifyContent="center" >
                <p>Página não encontrada.</p>
            </Grid>
        </Box>
    )
}

export default Error404;