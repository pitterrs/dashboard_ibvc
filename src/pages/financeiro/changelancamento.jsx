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
import DeleteLancamento from './deletelancamento';
import { useNavigate } from "react-router-dom";

const EditLanchamento = ({ show, setShow, onEdit, setOnEdit, getLancamentos }) => {
    const [nome, setNome] = useState(onEdit.nome);
    const [tipo, setTipo] = useState(onEdit.tipo);
    const [confirm, setConfirm] = useState(false);
    const navigate = useNavigate();

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
                        data.admin === 'true' ?
                        console.log('Logado')
                        : navigate('/unauthorized')
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
        validations();
    }, []);

    const handleClose = () => {
        setShow(false);
        setOnEdit(null);
    }
    const handleEdit = async (e) => {
        if (!nome) { return toast.warn("Campo 'nome' é obrigatório"); }

        await axios
            .put("http://localhost:8800/changeplano/" + onEdit.id, {
                nome: nome,
                tipo: tipo
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

        setShow(false);
        getLancamentos();
        setOnEdit(null);
    }
    const handleDelete = () => {
        setConfirm(true);
    };
    return (
        <Modal size="xl" show={show} onHide={handleClose}>
            <Modal.Body>
                <Box m="20px" >
                    <Header title="Alterar Plano de Contas" subtitle="Você está modificando um Plano de Contas." />
                    <Row>
                        <Col xs lg="5">
                            <div className="fundo">
                                <Typography m='0 0 10px 0' variant="h3" fontWeight="600">
                                    Plano de Contas
                                </Typography>
                                <Row className="mb-3">
                                    <Form.Group as={Col} >
                                        <Form.Label>Nome do Plano de Contas</Form.Label>
                                        <Form.Control maxLength='20' value={nome} onChange={(e) => setNome(e.target.value)} size="sm" type="text" placeholder="" />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <div>
                                        <Form.Label>Categoria</Form.Label>
                                        <Form.Select size="sm" aria-label="Default select example" onChange={(e) => setTipo(e.target.value)}>
                                            <option selected={tipo == 'Despesas' ? 'true' : ''} value="Despesas">Despesas</option>
                                            <option selected={tipo == 'Receitas' ? 'true' : ''} value="Receitas">Receitas</option>
                                        </Form.Select>
                                    </div>
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
                <Button variant="outline-danger" size="sm" onClick={handleDelete}>
                    Deletar
                </Button>
                <Button variant="outline-success" size="sm" onClick={handleClose}>
                    Fechar
                </Button>
            </Modal.Footer>
            {confirm && (
                <DeleteLancamento confirm={confirm} setConfirm={setConfirm} setShow={setShow} onEdit={onEdit} setOnEdit={setOnEdit} getLancamentos={getLancamentos} />
            )}
        </Modal>
    )
}

export default EditLanchamento;