import { React, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import Header from "../../components/Header";
import { Box, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const ChangePass = ({ show4, setShow4, getUsers, user }) => {
    const navigate = useNavigate();
    const [id, setId] = useState(user.id);
    const [senha, setSenha] = useState(null);
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
                        data.super === 'true' ?
                            console.log('Logado')
                            : navigate('/unauthorized')
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
    }, [setSenha]);

    const handleClose = () => {
        setShow4(false);
    }
    const handleChange = async () => {

        if (!senha) { return toast.warn("Preencha o campo 'Senha'"); }

        await axios
            .put(`${process.env.REACT_APP_API_URL}changpass`, {
                id,
                senha
            })
            .then(
                ({ data }) => {
                    if (data.error === true) {
                        toast.error(data.message)
                    } else {
                        toast.success(data.message)
                        setShow4(false);
                        getUsers();
                    }
                }
            )
            .catch(({ data }) => toast.error('Ocorreu um erro ao tentar comutar as alterações, tente novamente mais tarde ou contate o administrador do sistema.'));
    }

    return (
        <Modal size="xl" show={show4} onHide={handleClose}>
            <Modal.Body >
                <Box m="20px" >
                    <Header title="Criar Equipe" subtitle="Você está uma nova Equipe." />
                    <Row>
                        <Col xs lg="9">
                            <div className='fundo'>
                                <Row className="mb-3">
                                    <Col xs lg="6">
                                        <Form.Group as={Col} >
                                            <Form.Label>Senha</Form.Label>
                                            <Form.Control maxLength={10} value={senha} onChange={(e) => setSenha(e.target.value)} size="sm" type="password" placeholder="Digite a nova senha" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Box>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-primary" size="sm" onClick={handleChange}>
                    Salvar Alteração
                </Button>
                <Button variant="outline-success" size="sm" onClick={handleClose}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ChangePass;