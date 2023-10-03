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

const ModificarMembro = ({ show, setShow, membro, setMembro, getMembros }) => {
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

    const [nome, setNome] = useState(membro[0].nome);
    const [email, setEmail] = useState(membro[0].email);
    const [celular, setCelular] = useState(membro[0].celular);
    const [telefone, setTelefone] = useState(membro[0].telefone);
    const [genero, setGenero] = useState(membro[0].genero);

    const data_nascimento = (!membro[0].nascimento ? membro[0].nascimento : membro[0].nascimento.substr(6, 4) + '-' + membro[0].nascimento.substr(3, 2) + '-' + membro[0].nascimento.substr(0, 2));
    const [nascimento, setNascimento] = useState(data_nascimento);

    const [civil, setCivil] = useState(membro[0].civil);
    const [cep, setCep] = useState(membro[0].cep);
    const [endereco, setEndereco] = useState(membro[0].endereco);
    const [numero, setNumero] = useState(membro[0].numero);
    const [complemento, setComplemento] = useState(membro[0].complemento);
    const [admissao, setAdmissao] = useState(membro[0].admissao);

    const data_admissao_aux = (!membro[0].data_admissao ? membro[0].data_admissao : membro[0].data_admissao.substr(6, 4) + '-' + membro[0].data_admissao.substr(3, 2) + '-' + membro[0].data_admissao.substr(0, 2));
    const [data_admissao, setDataAdmissao] = useState(data_admissao_aux);
    const [situacao, setSituacao] = useState(membro[0].situacao);

    const nova_conversao = (!membro[0].conversao ? membro[0].conversao : membro[0].conversao.substr(6, 4) + '-' + membro[0].conversao.substr(3, 2) + '-' + membro[0].conversao.substr(0, 2));
    const [conversao, setConversao] = useState(nova_conversao);

    const nova_batismo = (!membro[0].batismo ? membro[0].batismo : membro[0].batismo.substr(6, 4) + '-' + membro[0].batismo.substr(3, 2) + '-' + membro[0].batismo.substr(0, 2));
    const [batismo, setBatismo] = useState(nova_batismo);

    const [chamado, setChamado] = useState(membro[0].chamado);
    const [outrasinfos, setOutrasInfos] = useState(membro[0].outrasinfos);
    const [confirm, setConfirm] = useState(false);

    const data_casamento_aux = (!membro[0].data_casamento ? membro[0].data_casamento : membro[0].data_casamento.substr(6, 4) + '-' + membro[0].data_casamento.substr(3, 2) + '-' + membro[0].data_casamento.substr(0, 2));
    const [data_casamento, setDataCasamento] = useState(data_casamento_aux)
    const [imagem, setImagem] = useState(membro[0].foto);
    const [foto, setFoto] = useState(null);
    const [nome_conjuge, setNome_Conjuge] = useState(membro[0].conjuge);

    const handleClose = () => {
        setShow(false);
        setMembro(null);
    }

    const handleEdit = async (e) => {

        let totalmembrosativos = 0;
        let qntmembrosatual = [];
        let totalmembrosinativos = 0;
        let qntmembrosatual2 = [];

        if (!nome) { return toast.warn("Campo 'Nome' é obrigatório"); }

        const token = localStorage.getItem("IBVC_token");
        const key = localStorage.getItem("IBVC_key");

        const dados = new FormData();
        dados.append("nome", nome);
        dados.append("email", email);
        dados.append("celular", celular);
        dados.append("telefone", telefone);
        dados.append("genero", genero);
        dados.append("nascimento", nascimento);
        dados.append("civil", civil);
        dados.append("cep", cep);
        dados.append("endereco", endereco);
        dados.append("numero", numero);
        dados.append("complemento", complemento);
        dados.append("admissao", admissao);
        dados.append("data_admissao", data_admissao);
        dados.append("situacao", situacao);
        dados.append("conversao", conversao);
        dados.append("batismo", batismo);
        dados.append("chamado", chamado);
        dados.append("outrasinfos", outrasinfos);
        dados.append("data_casamento", data_casamento);
        dados.append("token", token);
        dados.append("key", key);
        dados.append("imagem", foto);
        dados.append("nome_conjuge", nome_conjuge);

        await axios
            .put(`${process.env.REACT_APP_API_URL}changemembro/` + membro[0].id, dados, {
                headers: {
                    "Content-Type": `multipart/form-data`,
                },
            }).then(
                ({ data }) => {
                    if (data.error === true) {
                        toast.error(data.message)
                    } else {
                        toast.success(data.message)
                        setShow(false);
                        getMembros();
                        setMembro(null);
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

        //Captura a quantidade de membros ativos atualmente
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}totalmembrosativos`);
            totalmembrosativos = res.data[0].quantidade
        } catch (error) {
            console.log('erro desconhecido');
        }

        //Verifica se já existe um registro de quantidades para o mês atual
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}qntmembrosatual`);
            qntmembrosatual = res.data
        } catch (error) {
            console.log('erro desconhecido');
        }

        //Atualiza/Cria o registro na tabela de quantidades total de membros ativos para o mês atual
        if (qntmembrosatual.length == 0) {
            const dataAtual = new Date();
            const ano = dataAtual.getUTCFullYear();
            let mes = dataAtual.getUTCMonth() + 1;
            if (mes < 10) {
                mes = '0' + mes;
            }
            await axios
                .post(`${process.env.REACT_APP_API_URL}addqntmembros`, {
                    ano: ano,
                    mes: mes,
                    quantidade: totalmembrosativos,
                })
                .then(({ data }) => console.log(data))
                .catch(({ data }) => console.log(data));
        } else {
            await axios
                .put(`${process.env.REACT_APP_API_URL}changeqntmembros`, {
                    ano: qntmembrosatual[0].ano,
                    mes: qntmembrosatual[0].mes,
                    quantidade: totalmembrosativos,
                }).then(({ data }) => console.log(data))
                .catch(({ data }) => console.log(data));
        }

        //////////////
        //Captura a quantidade de membros ativos atualmente
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}totalmembrosinativos`);
            totalmembrosinativos = res.data[0].quantidade
        } catch (error) {
            console.log('erro desconhecido');
        }

        //Verifica se já existe um registro de quantidades para o mês atual
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}qntmembrosatual2`);
            qntmembrosatual2 = res.data
        } catch (error) {
            console.log('erro desconhecido');
        }

        //Atualiza/Cria o registro na tabela de quantidades total de membros ativos para o mês atual
        if (qntmembrosatual2.length == 0) {
            const dataAtual = new Date();
            const ano = dataAtual.getUTCFullYear();
            let mes = dataAtual.getUTCMonth() + 1;
            if (mes < 10) {
                mes = '0' + mes;
            }
            await axios
                .post(`${process.env.REACT_APP_API_URL}addqntmembros2`, {
                    ano: ano,
                    mes: mes,
                    quantidade: totalmembrosinativos,
                })
                .then(({ data }) => console.log(data))
                .catch(({ data }) => console.log(data));
        } else {
            await axios
                .put(`${process.env.REACT_APP_API_URL}changeqntmembros2`, {
                    ano: qntmembrosatual2[0].ano,
                    mes: qntmembrosatual2[0].mes,
                    quantidade: totalmembrosinativos,
                }).then(({ data }) => console.log(data))
                .catch(({ data }) => console.log(data));
        }
    }

    const handleDelete = () => {
        setConfirm(true);
    };

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
            <div>
                <Modal size="xl" show={show} onHide={handleClose}>
                    <Modal.Body>
                        <Header title="Modificar Membro" subtitle="Você está modificando um membro" />
                        <Box>
                            <Row>
                                <Col lg="6">
                                    <div className="fundo">
                                        <h4>Informações Pessoais</h4>
                                        <Row className="mb-3">
                                            <Col xs={6} md={4}>
                                                <Image className="imagem" src={imagem} onClick={clicou} roundedCircle />
                                                <Form.Control id='input' className='input' accept={['.png', '.jpg', 'jpeg']} onChange={(e) => setImagemFunction(e.target.files[0])} rest la type="file" size="sm" />
                                            </Col>
                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} >
                                                <Form.Label>Nome</Form.Label>
                                                <Form.Control required value={nome} maxLength={45} onChange={(e) => setNome(e.target.value)} size="sm" type="text" placeholder="Nome completo" />
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group as={Col}>
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control value={email} maxLength={45} onChange={(e) => setEmail(e.target.value)} size="sm" type="email" placeholder="email" />
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group as={Col}>
                                                <Form.Label>Celular</Form.Label>
                                                <Form.Control value={celular} maxLength={11} onChange={(e) => setCelular(e.target.value)} size="sm" type="text" placeholder="2299999-9999" />
                                            </Form.Group>

                                            <Form.Group as={Col}>
                                                <Form.Label>Telefone</Form.Label>
                                                <Form.Control value={telefone} maxLength={11} onChange={(e) => setTelefone(e.target.value)} size="sm" type="text" placeholder="223050-3050" />
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
                                                    />
                                                    <Form.Check
                                                        inline
                                                        label="Feminino"
                                                        name="genero"
                                                        type={type}
                                                        id="feminino"
                                                        value='Feminino'
                                                        checked={genero == 'Feminino' ? 'true' : ''}
                                                    />
                                                </div>
                                            ))}
                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group as={Col}>
                                                <Form.Label>Data de Nascimento</Form.Label>
                                                <Form.Control value={nascimento} onChange={(e) => setNascimento(e.target.value)} size="sm" type="date" />
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                            <div>
                                                <Form.Label>Estado Civil</Form.Label>
                                                <Form.Select size="sm" aria-label="Default select example" onChange={(e) => setCivil(e.target.value)}>
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
                                                <Form.Control value={data_casamento} onChange={(e) => setDataCasamento(e.target.value)} size="sm" type="date" />
                                            </Form.Group>
                                            <Form.Group as={Col}>
                                                <Form.Label>Nome do Cônjuge</Form.Label>
                                                <Form.Control value={nome_conjuge} onChange={(e) => setNome_Conjuge(e.target.value)} size="sm" type="text" />
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
                                                <Form.Control value={cep} maxLength={9} onChange={(e) => setCep(e.target.value)} size="sm" type="text" placeholder="CEP" />
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="formGridPassword">
                                                <Form.Label>Endereço</Form.Label>
                                                <Form.Control value={endereco} maxLength={45} onChange={(e) => setEndereco(e.target.value)} size="sm" type="text" placeholder="Endereço" />
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="formGridPassword">
                                                <Form.Label>Número</Form.Label>
                                                <Form.Control value={numero} maxLength={5} onChange={(e) => setNumero(e.target.value)} size="sm" type="text" placeholder="Número" />
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="formGridPassword">
                                                <Form.Label>Complemento</Form.Label>
                                                <Form.Control value={complemento} maxLength={15} onChange={(e) => setComplemento(e.target.value)} size="sm" type="text" placeholder="Complemento" />
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
                                                        />
                                                        <Form.Check
                                                            inline
                                                            label="Transferência"
                                                            name="admissao"
                                                            type={type}
                                                            id="transfer"
                                                            value="Transferência"
                                                            checked={admissao == 'Transferência' ? 'True' : ''}
                                                        />
                                                        <Form.Check
                                                            inline
                                                            label="Aclamação"
                                                            name="admissao"
                                                            type={type}
                                                            id="Aclamacao"
                                                            value="Aclamação"
                                                            checked={admissao == 'Aclamação' ? 'True' : ''}
                                                        />
                                                    </div>
                                                ))}
                                                <Form.Label>Data de Admissão:</Form.Label>
                                                <Form.Control value={data_admissao} onChange={(e) => setDataAdmissao(e.target.value)} size="sm" type="date" placeholder="" />
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
                                                        />
                                                        <Form.Check
                                                            inline
                                                            label="Membro Inativo"
                                                            name="situacao"
                                                            type={type}
                                                            id="membroinativo"
                                                            value="Membro Inativo"
                                                            checked={situacao == 'Membro Inativo' ? 'True' : ''}
                                                        />
                                                        <Form.Check
                                                            inline
                                                            label="Afastado"
                                                            name="situacao"
                                                            type={type}
                                                            id="afastado"
                                                            value="Afastado"
                                                            checked={situacao == 'Afastado' ? 'True' : ''}
                                                        />
                                                    </div>
                                                ))}
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="formGridPassword">
                                                <Form.Label>Data de Conversão</Form.Label>
                                                <Form.Control value={conversao} onChange={(e) => setConversao(e.target.value)} size="sm" type="date" placeholder="dd/mm/aaaa" />
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="formGridPassword">
                                                <Form.Label>Data de Batismo</Form.Label>
                                                <Form.Control value={batismo} onChange={(e) => setBatismo(e.target.value)} size="sm" type="date" placeholder="dd/mm/aaaa" />
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="formGridPassword">
                                                <Form.Label>Chamado Ministerial</Form.Label>
                                                <Form.Control value={chamado} maxLength={25} onChange={(e) => setChamado(e.target.value)} size="sm" type="text" placeholder="Chamado" />
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="formGridPassword">
                                                <Form.Label>Outras informações:</Form.Label>
                                                <Form.Control value={outrasinfos} maxLength={255} onChange={(e) => setOutrasInfos(e.target.value)} as="textarea" size="sm" type="text" placeholder="" />
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
                        <DeleteMembro confirm={confirm} setConfirm={setConfirm} setShow={setShow} membro={membro[0].id} setMembro={setMembro} getMembros={getMembros} />
                    )}
                </Modal>
            </div>
            : ''
    )
}

export default ModificarMembro;