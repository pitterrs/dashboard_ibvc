import { React, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toast } from "react-toastify";
import axios from "axios";
import Header from "../../components/Header";
import { Box } from "@mui/material";
import DeleteMembro from './deletarmembro';
import "./novomembro.css";
import Image from 'react-bootstrap/Image';

const ShowMembro = ({ show2, setShow2, membro, setMembro, getMembros }) => {
    const [logado, setLogado] = useState(false);
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
                        data.changemembros === 'true' ?
                            setLogado(true)
                            : window.location.replace(`${process.env.REACT_APP_SITE_URL}unauthorized`)
                    } else {
                        setLogado(false);
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

    const [nome, setNome] = useState(membro.nome);
    const [email, setEmail] = useState(membro.email);
    const [celular, setCelular] = useState(membro.celular);
    const [telefone, setTelefone] = useState(membro.telefone);
    const [genero, setGenero] = useState(membro.genero);

    const data_nascimento = (!membro.nascimento ? membro.nascimento : membro.nascimento.substr(6, 4) + '-' + membro.nascimento.substr(3, 2) + '-' + membro.nascimento.substr(0, 2));
    const [nascimento, setNascimento] = useState(data_nascimento);

    const [civil, setCivil] = useState(membro.civil);
    const [cep, setCep] = useState(membro.cep);
    const [endereco, setEndereco] = useState(membro.endereco);
    const [bairro, setBairro] = useState(membro.bairro);
    const [numero, setNumero] = useState(membro.numero);
    const [complemento, setComplemento] = useState(membro.complemento);
    const [admissao, setAdmissao] = useState(membro.admissao);

    const data_admissao_aux = (!membro.data_admissao ? membro.data_admissao : membro.data_admissao.substr(6, 4) + '-' + membro.data_admissao.substr(3, 2) + '-' + membro.data_admissao.substr(0, 2));
    const [data_admissao, setDataAdmissao] = useState(data_admissao_aux);
    const [situacao, setSituacao] = useState(membro.situacao);

    const nova_conversao = (!membro.conversao ? membro.conversao : membro.conversao.substr(6, 4) + '-' + membro.conversao.substr(3, 2) + '-' + membro.conversao.substr(0, 2));
    const [conversao, setConversao] = useState(nova_conversao);

    const nova_batismo = (!membro.batismo ? membro.batismo : membro.batismo.substr(6, 4) + '-' + membro.batismo.substr(3, 2) + '-' + membro.batismo.substr(0, 2));
    const [batismo, setBatismo] = useState(nova_batismo);

    const [chamado, setChamado] = useState(membro.chamado);
    const [outrasinfos, setOutrasInfos] = useState(membro.outrasinfos);

    const data_casamento_aux = (!membro.data_casamento ? membro.data_casamento : membro.data_casamento.substr(6, 4) + '-' + membro.data_casamento.substr(3, 2) + '-' + membro.data_casamento.substr(0, 2));
    const [data_casamento, setDataCasamento] = useState(data_casamento_aux);
    const foto = membro.foto;
    const [nome_conjuge, setNome_Conjuge] = useState(membro.conjuge);

    const handleClose = () => {
        setShow2(false);
        setMembro(null);
    }

    return (
        logado ?
            <div>
                <Modal size="xl" show={show2} onHide={handleClose}>
                    <Modal.Body>
                        <Header title="Exibir Membro" subtitle="Você está exibindo um membro" />
                        <Box>
                            <Row>
                                <Col lg="6">
                                    <div className="fundo">
                                        <h4>Informações Pessoais</h4>
                                        <Row className="mb-3">
                                            <Col xs={6} md={4}>
                                                <Image className="imagem" src={foto} roundedCircle />
                                            </Col>
                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} >
                                                <Form.Label>Nome</Form.Label>
                                                <Form.Control disabled required value={nome} maxLength={45} onChange={(e) => setNome(e.target.value)} size="sm" type="text" placeholder="Nome completo" />
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group as={Col}>
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control disabled value={email} maxLength={45} onChange={(e) => setEmail(e.target.value)} size="sm" type="email" placeholder="email" />
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group as={Col}>
                                                <Form.Label>Celular</Form.Label>
                                                <Form.Control disabled value={celular} maxLength={11} onChange={(e) => setCelular(e.target.value)} size="sm" type="text" placeholder="2299999-9999" />
                                            </Form.Group>

                                            <Form.Group as={Col}>
                                                <Form.Label>Telefone</Form.Label>
                                                <Form.Control disabled value={telefone} maxLength={11} onChange={(e) => setTelefone(e.target.value)} size="sm" type="text" placeholder="223050-3050" />
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Form.Label>Genero</Form.Label>
                                            {['radio'].map((type) => (
                                                <div key={`inline-${type}`} className="mb-3" onChange={(e) => setGenero(e.target.value)}>
                                                    <Form.Check
                                                        inline
                                                        label="Masculino"
                                                        name="genero"
                                                        type={type}
                                                        id="masculino"
                                                        value='Masculino'
                                                        checked={genero == 'Masculino' ? 'true' : ''}
                                                        disabled='true'
                                                    />
                                                    <Form.Check
                                                        inline
                                                        label="Feminino"
                                                        name="genero"
                                                        type={type}
                                                        id="feminino"
                                                        value='Feminino'
                                                        checked={genero == 'Feminino' ? 'true' : ''}
                                                        disabled='true'
                                                    />
                                                </div>
                                            ))}
                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group as={Col}>
                                                <Form.Label>Data de Nascimento</Form.Label>
                                                <Form.Control disabled value={nascimento} onChange={(e) => setNascimento(e.target.value)} size="sm" type="date" />
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                            <div>
                                                <Form.Label>Estado Civil</Form.Label>
                                                <Form.Select disabled='true' size="sm" aria-label="Default select example" onChange={(e) => setCivil(e.target.value)}>
                                                    <option>Selecionar</option>
                                                    <option selected={civil == 'Solteiro(a)' ? 'true' : ''} value="Solteiro(a)">Solteiro(a)</option>
                                                    <option selected={civil == 'Casado(a)' ? 'true' : ''} value="Casado(a)">Casado(a)</option>
                                                    <option selected={civil == 'Viúvo(a)' ? 'true' : ''} value="Viúvo(a)">Viúvo(a)</option>
                                                    <option selected={civil == 'Divorciado(a)' ? 'true' : ''} value="Divorciado(a)">Divorciado(a)</option>
                                                </Form.Select>
                                            </div>
                                        </Row>
                                        <Row className={civil == 'Casado(a)' ? 'mb-3' : 'casamento mb-3'}>
                                            <Form.Group as={Col}>
                                                <Form.Label>Data de Casamento</Form.Label>
                                                <Form.Control disabled value={data_casamento} onChange={(e) => setDataCasamento(e.target.value)} size="sm" type="date" />
                                            </Form.Group>
                                            <Form.Group as={Col}>
                                                <Form.Label>Nome do Cônjuge</Form.Label>
                                                <Form.Control disabled value={nome_conjuge} onChange={(e) => setNome_Conjuge(e.target.value)} size="sm" type="text" />
                                            </Form.Group>
                                        </Row>
                                    </div>
                                </Col>

                                <Col xs lg="6">
                                    <div className="fundo">
                                        <h4>Localização</h4>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="formGridEmail">
                                                <Form.Label>CEP</Form.Label>
                                                <Form.Control disabled value={cep} maxLength={9} onChange={(e) => setCep(e.target.value)} size="sm" type="text" placeholder="CEP" />
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="formGridPassword">
                                                <Form.Label>Endereço</Form.Label>
                                                <Form.Control disabled value={endereco} maxLength={45} onChange={(e) => setEndereco(e.target.value)} size="sm" type="text" placeholder="Endereço" />
                                            </Form.Group>
                                        </Row>
                                        <Col lg="6">
                                            <Row className="mb-3">
                                                <Form.Group as={Col} controlId="formGridPassword">
                                                    <Form.Label>Bairro</Form.Label>
                                                    <Form.Control disabled value={bairro} maxLength={30} onChange={(e) => setBairro(e.target.value)} size="sm" type="text" placeholder="Bairro" />
                                                </Form.Group>
                                            </Row>
                                        </Col>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="formGridPassword">
                                                <Form.Label>Número</Form.Label>
                                                <Form.Control disabled value={numero} maxLength={5} onChange={(e) => setNumero(e.target.value)} size="sm" type="text" placeholder="Número" />
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="formGridPassword">
                                                <Form.Label>Complemento</Form.Label>
                                                <Form.Control disabled value={complemento} maxLength={15} onChange={(e) => setComplemento(e.target.value)} size="sm" type="text" placeholder="Complemento" />
                                            </Form.Group>
                                        </Row>
                                    </div>
                                    <div className="fundo">
                                        <h4>Informações Eclesiásticas</h4>
                                        <Row className="mb-4">
                                            <Form.Group as={Col} controlId="formGridEmail">
                                                <Form.Label>Tipo de Admissão</Form.Label>
                                                {['radio'].map((type) => (
                                                    <div key={`inline-${type}`} className="mb-1" onChange={(e) => setAdmissao(e.target.value)}>
                                                        <Form.Check
                                                            inline
                                                            label="Batismo"
                                                            name="admissao"
                                                            type={type}
                                                            id="batismo"
                                                            value="Batismo"
                                                            checked={admissao == 'Batismo' ? 'True' : ''}
                                                            disabled='true'
                                                        />
                                                        <Form.Check
                                                            inline
                                                            label="Transferência"
                                                            name="admissao"
                                                            type={type}
                                                            id="transfer"
                                                            value="Transferência"
                                                            checked={admissao == 'Transferência' ? 'True' : ''}
                                                            disabled='true'
                                                        />
                                                        <Form.Check
                                                            inline
                                                            label="Aclamação"
                                                            name="admissao"
                                                            type={type}
                                                            id="Aclamacao"
                                                            value="Aclamação"
                                                            checked={admissao == 'Aclamação' ? 'True' : ''}
                                                            disabled='true'
                                                        />
                                                    </div>
                                                ))}
                                                <Form.Label>Data de Admissão:</Form.Label>
                                                <Form.Control disabled value={data_admissao} onChange={(e) => setDataAdmissao(e.target.value)} size="sm" type="date" placeholder="" />
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-2">
                                            <Form.Group as={Col} controlId="formGridPassword">
                                                <Form.Label>Situação na Igreja</Form.Label>
                                                {['radio'].map((type) => (
                                                    <div key={`inline-${type}`} className="mb-3" onChange={(e) => setSituacao(e.target.value)}>
                                                        <Form.Check
                                                            inline
                                                            label="Membro Ativo"
                                                            name="situacao"
                                                            type={type}
                                                            id="membro"
                                                            value="Membro Ativo"
                                                            checked={situacao == 'Membro Ativo' ? 'True' : ''}
                                                            disabled='true'
                                                        />
                                                        <Form.Check
                                                            inline
                                                            label="Membro Inativo"
                                                            name="situacao"
                                                            type={type}
                                                            id="membroinativo"
                                                            value="Membro Inativo"
                                                            checked={situacao == 'Membro Inativo' ? 'True' : ''}
                                                            disabled='true'
                                                        />
                                                        <Form.Check
                                                            inline
                                                            label="Afastado"
                                                            name="situacao"
                                                            type={type}
                                                            id="afastado"
                                                            value="Afastado"
                                                            checked={situacao == 'Afastado' ? 'True' : ''}
                                                            disabled='true'
                                                        />
                                                    </div>
                                                ))}
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="formGridPassword">
                                                <Form.Label>Data de Conversão</Form.Label>
                                                <Form.Control disabled value={conversao} onChange={(e) => setConversao(e.target.value)} size="sm" type="date" placeholder="dd/mm/aaaa" />
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="formGridPassword">
                                                <Form.Label>Data de Batismo</Form.Label>
                                                <Form.Control disabled value={batismo} onChange={(e) => setBatismo(e.target.value)} size="sm" type="date" placeholder="dd/mm/aaaa" />
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="formGridPassword">
                                                <Form.Label>Chamado Ministerial</Form.Label>
                                                <Form.Control disabled value={chamado} maxLength={25} onChange={(e) => setChamado(e.target.value)} size="sm" type="text" placeholder="Chamado" />
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="formGridPassword">
                                                <Form.Label>Outras informações:</Form.Label>
                                                <Form.Control disabled value={outrasinfos} maxLength={255} onChange={(e) => setOutrasInfos(e.target.value)} as="textarea" size="sm" type="text" placeholder="" />
                                            </Form.Group>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                        </Box>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-success" size="sm" onClick={handleClose}>
                            Fechar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            : ''
    )
}

export default ShowMembro;