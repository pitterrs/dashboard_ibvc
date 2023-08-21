import { React, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Header from "../../components/Header";
import { Box } from "@mui/material";
import DeleteDiacono from './deletardiacono';
import "./corpodiaconal.css";

const ChangeDiaconos = ({ show, setShow, diacono, setDiacono, getDiaconos }) => {

    const [nome, setNome] = useState(diacono[0].nome);
    const [email, setEmail] = useState(diacono[0].email || '');
    const [celular, setCelular] = useState(diacono[0].celular || '');
    const [cargo, setCargo] = useState(diacono[0].cargo);
    const [confirm, setConfirm] = useState(false);

    const handleClose = () => {
        setShow(false);
        setDiacono(null);
    }

    const handleEdit = async (e) => {

        if (!cargo) { return toast.warn("Campo 'Cargo' é obrigatório"); }

        await axios
            .put("http://localhost:8800/changediaconos/" + diacono[0].id, {
                nome: nome,
                email: email,
                celular: celular,
                cargo: cargo,
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
        getDiaconos();
        setDiacono(null);
    }

    const handleDelete = () => {
        setConfirm(true);
    };

    return (
        <Modal size="xl" show={show} onHide={handleClose}>
            <Modal.Body>
                <Box m="20px" >
                    <Header title="Modificar Integrante do Corpo Diaconal" subtitle="Você está modificando um membro do Corpo Diaconal." />
                    <Row>
                        <Col xs lg="5">
                            <div className="fundo">
                                <h4>Informações Pessoais</h4>
                                <p>Caso sejá necessário alterar informações como 'Nome', 'Email e 'Celular' acesse o cadastro de Membros.</p>
                                <Row className="mb-3">
                                    <Form.Group as={Col} >
                                        <Form.Label>Nome</Form.Label>
                                        <Form.Control value={nome} disabled size="sm" type="text" placeholder="" />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col}>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control value={email} disabled size="sm" type="email" placeholder="" />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col}>
                                        <Form.Label>Celular</Form.Label>
                                        <Form.Control value={celular} disabled size="sm" type="text" placeholder="" />
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label>Cargo</Form.Label>
                                        <Form.Control value={cargo} onChange={(e) => setCargo(e.target.value)} size="sm" type="text" placeholder="Cargo" />
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
                <Button variant="outline-danger" size="sm" onClick={handleDelete}>
                    Deletar
                </Button>
                <Button variant="outline-success" size="sm" onClick={handleClose}>
                    Fechar
                </Button>
            </Modal.Footer>
            {confirm && (
                <DeleteDiacono confirm={confirm} setConfirm={setConfirm} setShow={setShow} diacono={diacono[0].id} setDiacono={setDiacono} getDiaconos={getDiaconos} />
            )}
            <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_RIGHT} />
        </Modal>
    )
}

export default ChangeDiaconos;