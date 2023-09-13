import React, { useState, useEffect } from 'react';
import { tokens } from "../../theme";
import Grid from "@mui/material/Unstable_Grid2";
import Header from "../../components/Header";
import { Box, useTheme, useMediaQuery, Typography } from "@mui/material";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./login.css"
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Alert from '@mui/material/Alert';
const Login = () => {
    const theme = useTheme();
    const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
    const colors = tokens(theme.palette.mode);
    const [email, setEmail] = useState(null);
    const [senha, setSenha] = useState(null);
    const [message, setMessage] = useState();

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
                        window.location.replace(`${process.env.REACT_APP_SITE_URL}`)
                    }
                }
            )
            .catch(({ err }) => {
                // toast.error('Ocorreu um erro ao tentar validar seu acesso. Faça login novamente ou entre em contato com o administrador.')
                // window.location.replace(`${process.env.REACT_APP_SITE_URL}login`);
            });
    }

    useEffect(() => {
        validations();
    }, []);

    const handleSend = async () => {
        await axios
            .post(`${process.env.REACT_APP_API_URL}login`, {
                email,
                senha,
            })
            .then(
                ({ data }) => {
                    if (data.error === false) {
                        localStorage.setItem("IBVC_userId", data.id);
                        localStorage.setItem("IBVC_userName", data.user);
                        localStorage.setItem("IBVC_email", data.email);
                        localStorage.setItem("IBVC_key", data.key);
                        localStorage.setItem("IBVC_token", data.token);
                        localStorage.setItem("IBVC_foto", data.foto);
                        setMessage();
                        window.location.replace(`${process.env.REACT_APP_SITE_URL}`);
                    }
                    setMessage(data.message);
                }
            )
            .catch(({ err }) => {
                console.log(err)
                setMessage('Ocorreu um erro ao tentar realizar o login. Contate o administrador do sistema');
            });
    }

    document.addEventListener("keypress", function (e) {
        if (e.key === 'Enter') {
            if (!email) { return setMessage("Preencha o campo 'Email'") }
            if (!senha) { return setMessage("Preencha o campo 'Senha'"); }
            handleSend()
        }
    });

    return (
        <Box m="20px" >

            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 5 }} alignItems='center' justifyContent="center" >
                <Grid xs={12} sm={12} md={6} lg={3} xl={3} backgroundColor={colors.primary[400]} className="radius" >
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        m='20px 0 20px 0'
                    >
                        <img
                            className="avater-image"
                            alt="profile user"
                            width="180px"
                            height="100px"
                            src={"../../assets/logo.png"}
                        />
                    </Box>
                    <Row className="mb-2">
                        <Form.Group as={Col} >
                            <Form.Label>E-mail do usuário</Form.Label>
                            <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} maxLength='45' size="sm" type="email" placeholder="" />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} >
                            <Form.Label>Senha</Form.Label>
                            <Form.Control value={senha} onChange={(e) => setSenha(e.target.value)} maxLength='10' size="sm" type="password" placeholder="" />
                        </Form.Group>
                    </Row>
                    {message ?
                        <Alert variant="outlined" severity="error">
                            {message}
                        </Alert>
                        : ''
                    }

                    <Box
                        width="100%"
                        backgroundColor={colors.primary[400]}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        p='10px'
                        m="0 0 40px 0"
                    >
                        <Button onClick={handleSend} size="sm" variant='outline-light' >Acessar</Button>
                    </Box>
                    <p>Caso tenha problemas para realizar o acesso, entre em contato com o administrador do sistema</p>
                </Grid>
            </Grid>
            <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_RIGHT} />
        </Box>
    )
}

export default Login;