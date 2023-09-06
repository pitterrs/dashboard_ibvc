import { React, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Header from "../../components/Header";
import { Box } from "@mui/material";
import DeleteMensageira from './deletarmensageira';
import "./mensageiras.css";

const ChangeMensageiras = ({ show, setShow, mensageira, setMensageira, getMensageiras }) => {

    const [nome, setNome] = useState(mensageira[0].nome);
    const [email, setEmail] = useState(mensageira[0].email || '');
    const [celular, setCelular] = useState(mensageira[0].celular || '');
    const [id, setId] = useState(mensageira[0].id);
    const [funcao, setFuncao] = useState(mensageira[0].funcao);
    const [etapa, setEtapa] = useState(mensageira[0].etapa);
    const [situacao, setSituacao] = useState(mensageira[0].situacao);
    const [outrasinfos, setOutrasInfos] = useState(mensageira[0].outrasinfos);
    const [responsavel1, setResponsalve1] = useState(mensageira[0].responsavel1);
    const [resp1email, setResp1email] = useState(mensageira[0].resp1email);
    const [resp1contato, setResp1contato] = useState(mensageira[0].resp1contato);
    const [responsavel2, setResponsalve2] = useState(mensageira[0].responsavel2);
    const [resp2email, setResp2email] = useState(mensageira[0].resp2email);
    const [resp2contato, setResp2contato] = useState(mensageira[0].resp2contato);
    const [nascimento, setNascimento] = useState(mensageira[0].nascimento);
    const [confirm, setConfirm] = useState(false);

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

    const handleClose = () => {
        setShow(false);
        setMensageira(null);
    }

    const handleEdit = async (e) => {

        // if (!cargo) { return toast.warn("Campo 'Cargo' é obrigatório"); }

        await axios
            .put(`${process.env.REACT_APP_API_URL}changemensageiras/` + mensageira[0].id, {
                funcao: funcao,
                etapa: etapa,
                situacao: situacao,
                outrasinfos: outrasinfos,
                responsavel1: responsavel1,
                resp1email: resp1email,
                resp1contato: resp1contato,
                responsavel2: responsavel2,
                resp2email: resp2email,
                resp2contato: resp2contato,
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
        getMensageiras();
        setMensageira(null);
    }

    const handleDelete = () => {
        setConfirm(true);
    };

    return (
        <Modal size="xl" show={show} onHide={handleClose}>
            <Modal.Body>
                <Box m="20px" >
                    <Header title="Adicionar Nova Mensageira" subtitle="Você está cadastrando uma nova Mensageira do Rei" />
                    <Row>
                        <Col xs lg="5">
                            <div className="fundo">
                                <h4>Informações Pessoais</h4>
                                <Row className="mb-3">
                                    <Form.Group as={Col} >
                                        <Form.Label>Nome da Mensageira</Form.Label>
                                        <Form.Control value={nome} disabled size="sm" type="text" placeholder="" />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col}>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control value={email} disabled size="sm" type="email" placeholder="email" />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col}>
                                        <Form.Label>Celular</Form.Label>
                                        <Form.Control value={celular} disabled size="sm" type="text" placeholder="2299999-9999" />
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label>Função</Form.Label>
                                        <Form.Control value={funcao} onChange={(e) => setFuncao(e.target.value)} size="sm" type="text" placeholder="Função" />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col}>
                                        <Form.Label>Etapa</Form.Label>
                                        <Form.Control value={etapa} onChange={(e) => setEtapa(e.target.value)} size="sm" type="text" placeholder="Etapa" />
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label>Situaçao</Form.Label>
                                        <Form.Select onChange={(e) => setSituacao(e.target.value)} size="sm" aria-label="Default select example">
                                            <option>Selecionar</option>
                                            <option selected={situacao == 'Frequenta' ? 'true' : ''} value="Frequenta">Frequenta</option>
                                            <option selected={situacao == 'Média Frequência' ? 'true' : ''} value="Média Frequência">Média Frequência</option>
                                            <option selected={situacao == 'Baixa Frequência' ? 'true' : ''} value="Baixa Frequência">Baixa Frequência</option>
                                            <option selected={situacao == 'Não Frequenta' ? 'true' : ''} value="Não Frequenta">Não Frequenta</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col}>
                                        <Form.Label>Data de Nascimento</Form.Label>
                                        <Form.Control disabled value={nascimento} size="sm" type="date" />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col}>
                                        <Form.Label>Outras informações:</Form.Label>
                                        <Form.Control value={outrasinfos} onChange={(e) => setOutrasInfos(e.target.value)} as="textarea" size="sm" type="text" placeholder="" />
                                    </Form.Group>
                                </Row>
                            </div>
                        </Col>

                        <Col xs lg="5" md={{ span: 4, offset: 0 }}>
                            <div className="fundo">
                                <h4>Informações dos Responsáveis</h4>
                                <Row className="mb-3">
                                    <Form.Group as={Col}>
                                        <Form.Label>Responsável Principal</Form.Label>
                                        <Form.Control value={responsavel1} onChange={(e) => setResponsalve1(e.target.value)} size="sm" type="text" placeholder="Responsável" />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Email do Responsável Principal</Form.Label>
                                        <Form.Control value={resp1email} onChange={(e) => setResp1email(e.target.value)} size="sm" type="text" placeholder="email" />
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Contato do Responsável Principal</Form.Label>
                                        <Form.Control value={resp1contato} onChange={(e) => setResp1contato(e.target.value)} size="sm" type="text" placeholder="Celular" />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col}>
                                        <Form.Label>Responsável Secundário</Form.Label>
                                        <Form.Control value={responsavel2} onChange={(e) => setResponsalve2(e.target.value)} size="sm" type="text" placeholder="Secundário" />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Email do Responsável Secundário</Form.Label>
                                        <Form.Control value={resp2email} onChange={(e) => setResp2email(e.target.value)} size="sm" type="text" placeholder="email" />
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Contato do Responsável Secundário</Form.Label>
                                        <Form.Control value={resp2contato} onChange={(e) => setResp2contato(e.target.value)} size="sm" type="text" placeholder="Celular" />
                                    </Form.Group>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                    <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_RIGHT} />
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
                <DeleteMensageira confirm={confirm} setConfirm={setConfirm} setShow={setShow} mensageira={mensageira[0].id} setMensageira={setMensageira} getMensageiras={getMensageiras} />
            )}
            <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_RIGHT} />
        </Modal>
    )
}

export default ChangeMensageiras;