import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const DeleteMembro = ({ confirm, setConfirm, setShow, membro, setMembro, getMembros }) => {
    const [logado, setLogado] = useState(false);
    const handleClose = () => {
        setConfirm(false);
    };

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

    const deletar = async (e) => {
        let totalmembrosativos = 0;
        let totalmembrosinativos = 0;
        let qntmembrosatual = [];
        let qntmembrosatual2 = [];
        await axios
            .delete(`${process.env.REACT_APP_API_URL}deletemembro/` + membro)
            .then(({ data }) => {
                toast.success(data);
            })
            .catch(({ data }) => toast.error(data));

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
            const ano = dataAtual.getFullYear();
            let mes = dataAtual.getMonth() + 1;
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

        /////////////////////////////////

        //Captura a quantidade de membros inativos atualmente
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}totalmembrosinativos`);
            totalmembrosinativos = res.data[0].quantidade
        } catch (error) {
            console.log('erro desconhecido');
        }

        //Verifica se já existe um registro de quantidades de inativos para o mês atual
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}qntmembrosatual2`);
            qntmembrosatual2 = res.data
        } catch (error) {
            console.log('erro desconhecido');
        }

        //Atualiza/Cria o registro na tabela de quantidades total de membros ativos para o mês atual
        if (qntmembrosatual2.length == 0) {
            const dataAtual = new Date();
            const ano = dataAtual.getFullYear();
            let mes = dataAtual.getMonth() + 1;
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

        setConfirm(false);
        getMembros();
        setMembro(null);
        setShow(false);
    };

    return (
        logado ?
        <div>
            <Modal
                size="lg"
                show={confirm}
                onHide={handleClose}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Deseja deletar o cadastro do membro?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body><p>Esta ação não poderá ser desfeita uma vez confirmada. </p></Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" size="sm" onClick={handleClose} >
                        Fechar
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => deletar()} >
                        Deletar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
        : ''
    )
}

export default DeleteMembro;