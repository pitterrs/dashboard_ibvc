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
import "./mensageiras.css";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const AddMensageira = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <React.Fragment>
            <Box m="20px" >
                <Header title="Adicionar Nova Mensageira" subtitle="Você está cadastrando uma nova Mensageira do Rei" />
                <Row>
                    <Col xs lg="5">
                        <div className="fundo">
                            <h4>Informações Pessoais</h4>
                            <Row className="mb-3">
                                <Form.Group as={Col} >
                                    <Form.Label>Nome da Mensageira</Form.Label>
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
                                    <Form.Label>Função</Form.Label>
                                    <Form.Control size="sm" type="text" placeholder="Função" />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Etapa</Form.Label>
                                    <Form.Control size="sm" type="text" placeholder="Etapa" />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Situaçao</Form.Label>
                                    <Form.Select size="sm" aria-label="Default select example">
                                        <option>Selecionar</option>
                                        <option value="1">Frequenta</option>
                                        <option value="2">Média Frequência</option>
                                        <option value="3">Baixa Frequência</option>
                                        <option value="4">Não Frequenta</option>
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Data de Nascimento</Form.Label>
                                    <Form.Control size="sm" type="date" />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Outras informações:</Form.Label>
                                    <Form.Control as="textarea" size="sm" type="text" placeholder="" />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Col>
                                    <Button variant="secondary">Cadastrar</Button>
                                </Col>
                            </Row>
                        </div>
                    </Col>

                    <Col xs lg="5" md={{ span: 4, offset: 0 }}>
                        <div className="fundo">
                            <h4>Informações dos Responsáveis</h4>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Responsável Principal</Form.Label>
                                    <Form.Control size="sm" type="text" placeholder="Responsável" />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Email do Responsável</Form.Label>
                                    <Form.Control size="sm" type="text" placeholder="email" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Contato do Responsável</Form.Label>
                                    <Form.Control size="sm" type="text" placeholder="Celular" />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Responsável Secundário</Form.Label>
                                    <Form.Control size="sm" type="text" placeholder="Secundário" />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Email do Responsável Secundário</Form.Label>
                                    <Form.Control size="sm" type="text" placeholder="email" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Contato do Responsável Secundário</Form.Label>
                                    <Form.Control size="sm" type="text" placeholder="Celular" />
                                </Form.Group>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Box>
        </React.Fragment>
    )
}

export default AddMensageira;