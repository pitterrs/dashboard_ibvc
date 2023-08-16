import { Box, useTheme } from "@mui/material";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import React from "react";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./comissaofinancas.css";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Addfinancas = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <React.Fragment>
            <Box m="20px" >
                <Header title="Novo Integrante da Comissão" subtitle="Você está cadastrando um novo membro na Comissão de Finanças" />
                <Row>
                    <Col xs lg="5">
                        <div className="fundo">
                            <h4>Informações Pessoais</h4>
                            <Row className="mb-3">
                                <Form.Group as={Col} >
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control size="sm" type="text" placeholder="Nome completo" />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control size="sm" type="email" placeholder="email" />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Celular</Form.Label>
                                    <Form.Control size="sm" type="text" placeholder="2299999-9999" />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Cargo</Form.Label>
                                    <Form.Control size="sm" type="text" placeholder="Cargo" />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Col>
                                    <Button variant="secondary">Cadastrar Integrante</Button>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Box>
        </React.Fragment>
    )
}

export default Addfinancas;