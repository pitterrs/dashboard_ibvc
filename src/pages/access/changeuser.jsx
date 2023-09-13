import { React, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import Header from "../../components/Header";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Image from 'react-bootstrap/Image';
import "./access.css";

const ChangeUser = ({ show2, setShow2, getUsers, user }) => {
    const navigate = useNavigate();
    const [id, setId] = useState(user.id)
    const [nome, setNome] = useState(user.nome);
    const [email, setEmail] = useState(user.email);
    const [superAdmin, setSuperAdmin] = useState(user.super);
    const [changemembros, setChangeMembros] = useState(user.changemembros);
    const [viewequipes, setViewEquipes] = useState(user.viewequipes);
    const [createequipes, setCreateEquipes] = useState(user.createequipes);
    const [viewfinancas, setViewFinancas] = useState(user.viewfinancas);
    const [createfinancas, setCreateFinancas] = useState(user.createfinancas);
    const [logado, setLogado] = useState(false);
    const [imagem, setImagem] = useState(user.foto);
    const [foto, setFoto] = useState(null);
    const validations = async () => {
        console.log(user.foto);
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
                            setLogado(true)
                            :
                            navigate('/unauthorized')
                    } else {
                        setLogado(false)
                        window.location.replace(`${process.env.REACT_APP_SITE_URL}login`);
                    }
                }
            )
            .catch(({ err }) => {
                setLogado(false)
                toast.error('Ocorreu um erro ao tentar validar seu acesso. Faça login novamente ou entre em contato com o administrador.')
                window.location.replace(`${process.env.REACT_APP_SITE_URL}login`);
            });
    }

    useEffect(() => {
        validations();
    }, []);

    const handleClose = () => {
        setShow2(false);
    }
    const handleChange = async () => {

        const token = localStorage.getItem("IBVC_token");
        const key = localStorage.getItem("IBVC_key");

        if (!nome) { return toast.warn("Preencha o campo 'Nome'"); }
        if (!email) { return toast.warn("Preencha o campo 'Email'"); }

        const dados = new FormData();

        dados.append("nome", nome);
        dados.append("email", email);
        dados.append("super", superAdmin);
        dados.append("changemembros", changemembros);
        dados.append("viewequipes", viewequipes);
        dados.append("createequipes", createequipes);
        dados.append("viewfinancas", viewfinancas);
        dados.append("createfinancas", createfinancas);
        dados.append("token", token);
        dados.append("key", key);
        dados.append("imagem", foto);
        // dados.append("foto_name", user.foto_name);

        await axios
            .put(`${process.env.REACT_APP_API_URL}changeuser/` + id, dados, {
                headers: {
                    "Content-Type": `multipart/form-data`,
                },
            })
            .then(
                ({ data }) => {
                    if (data.error === true) {
                        toast.error(data.message)
                    } else {
                        if (data.foto) {
                            localStorage.setItem("IBVC_foto", data.foto);
                        }
                        toast.success(data.message)
                        setShow2(false);
                        getUsers();
                    }
                }
            )
            .catch(error => {
                if (error.response.status === 401) {
                    window.location.replace(`${process.env.REACT_APP_SITE_URL}login`);
                }
                if (error.response.status === 500) {
                    toast.error(error.response.data.message);
                }
                if (error.response.status === 403) {
                    window.location.replace(`${process.env.REACT_APP_SITE_URL}unauthorized`);
                }
                window.location.replace(`${process.env.REACT_APP_SITE_URL}error`);
            });
    }

    const setChangeMembrosFunction = (e) => {
        if (e == true) {
            setChangeMembros('true');
        } else {
            setChangeMembros('false');
        }
    }
    const setViewEquipesFunction = (e) => {
        if (e == true) {
            setViewEquipes('true');
        } else {
            setViewEquipes('false');
        }
    }
    const setCreateEquipesFunction = (e) => {
        if (e == true) {
            setCreateEquipes('true');
        } else {
            setCreateEquipes('false');
        }
    }
    const setViewFinancasFunction = (e) => {
        if (e == true) {
            setViewFinancas('true');
        } else {
            setViewFinancas('false');
        }
    }
    const setCreateFinancasFunction = (e) => {
        if (e == true) {
            setCreateFinancas('true');
        } else {
            setCreateFinancas('false');
        }
    }

    const setSuperAdminFunction = (e) => {
        if (e == true) {
            setSuperAdmin('true');
        } else {
            setSuperAdmin('false');
        }
    }

    const clicou = () => {
        const inputImg = document.getElementById('input')
        inputImg.click();
    }

    const setImagemFunction = (data) => {
        if (data?.size > 524288) {
            return toast.warn('Arquivo muito grande. Selecione um arquivo menor')
        }
        if (data == undefined) {
            setImagem(null);
            setFoto(null);
        } else {
            setFoto(data);
            var lerArquivo = new FileReader();

            lerArquivo.onload = function (imagem) {
                const imagembase64_aux = imagem.target.result;
                setImagem(imagembase64_aux);
            }

            lerArquivo.readAsDataURL(data);
        }
    }

    return (
        logado ?
            <Modal size="xl" show={show2} onHide={handleClose}>
                <Modal.Body >
                    <Box m="20px" >
                        <Header title="Alterar Usuário" subtitle="Você está alterando as informaçõs do usuário." />
                        <Row>
                            <Col xs lg="12">
                                <div className='fundo'>
                                    <Row className="mb-3">
                                        <Col xs={6} md={4}>
                                            <Image className="imagem" src={imagem} onClick={clicou} roundedCircle />
                                            <Form.Control id='input' className='input' accept={['.png', '.jpg', 'jpeg']} onChange={(e) => setImagemFunction(e.target.files[0])} rest la type="file" size="sm" />
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col xs lg="5">
                                            <Form.Group as={Col} >
                                                <Form.Label>Nome do Usuário</Form.Label>
                                                <Form.Control maxLength={45} value={nome} onChange={(e) => setNome(e.target.value)} size="sm" type="text" placeholder="Nome" />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col xs lg="5">
                                            <Form.Group as={Col} >
                                                <Form.Label>E-mail</Form.Label>
                                                <Form.Control disabled maxLength={45} value={email} onChange={(e) => setEmail(e.target.value)} size="sm" type="email" placeholder="Email" />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Form.Label>Administração de acessos:</Form.Label>
                                        <Col xs lg="6">
                                            <Form.Check
                                                inline
                                                label="Modificar Membros"
                                                name="group2"
                                                type="checkbox"
                                                onChange={(e) => setChangeMembrosFunction(e.target.checked)}
                                                checked={changemembros == 'true' ? 'true' : false}

                                            />
                                            <Form.Check
                                                inline
                                                label="Visualizar Equipes"
                                                name="group3"
                                                type="checkbox"
                                                onChange={(e) => setViewEquipesFunction(e.target.checked)}
                                                checked={viewequipes == 'true' ? 'true' : false}

                                            />
                                            <Form.Check
                                                inline
                                                label="Criar/Modificar Equipes"
                                                name="group4"
                                                type="checkbox"
                                                onChange={(e) => setCreateEquipesFunction(e.target.checked)}
                                                checked={createequipes == 'true' ? 'true' : false}

                                            />
                                            <Form.Check
                                                inline
                                                label="Visualizar Finanças"
                                                name="group5"
                                                type="checkbox"
                                                onChange={(e) => setViewFinancasFunction(e.target.checked)}
                                                checked={viewfinancas == 'true' ? 'true' : false}

                                            />
                                            <Form.Check
                                                inline
                                                label="Criar/Modificar Finanças"
                                                name="group6"
                                                type="checkbox"
                                                onChange={(e) => setCreateFinancasFunction(e.target.checked)}
                                                checked={createfinancas == 'true' ? 'true' : false}

                                            />
                                            <Form.Check
                                                inline
                                                label="Controle de Usuários"
                                                name="group7"
                                                type="checkbox"
                                                onChange={(e) => setSuperAdminFunction(e.target.checked)}
                                                checked={superAdmin == 'true' ? 'true' : false}
                                            />
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Box>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary" size="sm" onClick={handleChange}>
                        Salvar Alterações
                    </Button>
                    <Button variant="outline-success" size="sm" onClick={handleClose}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
            :
            ''
    )
}

export default ChangeUser;