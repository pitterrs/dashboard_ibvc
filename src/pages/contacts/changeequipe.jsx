import { React, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toast } from "react-toastify";
import axios from "axios";
import Header from "../../components/Header";
import { Box, Typography } from "@mui/material";

const EditEquipe = ({ show3, setShow3, equipe, setEquipe, getEquipes }) => {
    const [nome, setNome] = useState(equipe.nome_equipe);
    const handleClose = () => {
        setShow3(false);
        setEquipe(null);
    }

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
                        console.log('Logado')
                    } else {
                        window.location.replace(`${process.env.REACT_APP_SITE_URL}login`);
                    }
                }
            )
            .catch(({ err }) => {
                console.log(err)
                toast.error('Ocorreu um erro ao tentar validar seu acesso. Faça login novamente ou entre em contato com o administrador.')
                window.location.replace(`${process.env.REACT_APP_SITE_URL}login`);
            });
    }

    useEffect(() => {
        validations();
    }, []);

    const handleEdit = async (e) => {
        if (!nome) { return toast.warn("Campo 'nome' é obrigatório"); }

        await axios
            .put(`${process.env.REACT_APP_API_URL}changeequipe/` + equipe.id_equipe, {
                nome: nome,
            }).then(
                ({ data }) => {
                    if (data.code) {
                        toast.error('Erro ao modificar registro no BD. Entre em contato com o administrador')
                    } else {
                        toast.success(data)
                    }
                }
            )
            .catch(({ data }) => toast.error(data));

        setShow3(false);
        getEquipes();
        setEquipe(null);
    }
    return (
        <Modal size="xl" show={show3} onHide={handleClose}>
            <Modal.Body>
                <Box m="20px" >
                    <Header title="Alterar Dados da Equipe" subtitle="Você está modificando os dados da equipe." />
                    <Row>
                        <Col xs lg="5">
                            <div className="fundo">
                                <Typography m='0 0 10px 0' variant="h3" fontWeight="600">
                                    Alterar Equipe
                                </Typography>
                                <Row className="mb-3">
                                    <Form.Group as={Col} >
                                        <Form.Label>Nome da Equipe</Form.Label>
                                        <Form.Control maxLength={45} value={nome} onChange={(e) => setNome(e.target.value)} size="sm" type="text" placeholder="" />
                                    </Form.Group>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Box>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-primary" size="sm" onClick={handleEdit}>
                    Salvar alterações
                </Button>
                <Button variant="outline-success" size="sm" onClick={handleClose}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditEquipe;