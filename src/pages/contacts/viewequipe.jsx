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
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useTheme, useMediaQuery } from "@mui/material";
import { FaGlasses } from "react-icons/fa";
import AddMembro from './addmembro';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ViewMembro from './viewmembro';
import ChangeMembroEquipe from './changemembroequipe';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteMembroEquipe from './deletemembroequipe';

const ViewEquipe = ({ show4, setShow4, equipe, setEquipe, getEquipes }) => {
    const theme = useTheme();
    const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
    const colors = tokens(theme.palette.mode);
    const [pageSize, setPageSize] = useState(10);
    const [MembrosEquipe, setMembrosEquipe] = useState([]);
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [show5, setShow5] = useState(false);
    const [membro, setMembro] = useState();
    const columns = [
        {
            field: "icone", headerName: "", renderCell: ({ row: { id_membro } }) => {
                return <> < ModeEditIcon className="pointer" onClick={() => handleEdit(MembrosEquipe, id_membro)} /> < DeleteForeverIcon className="pointer lixo" onClick={() => handleDelete(MembrosEquipe, id_membro)} /> <FaGlasses className="pointer" onClick={() => handleView(MembrosEquipe, id_membro)} /> </>;
            }, width: 90
        },
        { field: "nome_membro", headerName: "Nome", width: 350 },
        { field: "funcao", headerName: "Função", width: 150 },
    ];

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

    const getMembrosEquipe = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}getmembrosequipe/` + equipe.id_equipe);
            setMembrosEquipe(res.data);
        } catch { }
    }

    useEffect(() => {
        validations();
        getMembrosEquipe();
    }, [setMembrosEquipe]);

    const handleView = async (MembrosEquipe, id) => {
        const id2 = [id];
        const selectedRowsData = id2.map((id) => MembrosEquipe.find((row) => row.id_membro === id));
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}getmembroequipe/` + selectedRowsData[0].id_membro);
            setMembro(res.data[0] ? res.data[0] : []);
            setShow2(true);
        } catch { }
        // setMembro(selectedRowsData[0]);
    }

    const handleEdit = (MembrosEquipe, id) => {
        const id2 = [id];
        const selectedRowsData = id2.map((id) => MembrosEquipe.find((row) => row.id_membro === id));
        setMembro(selectedRowsData[0]);
        setShow3(true);
    }

    const handleAdd = () => {
        setShow(true);
    }

    const handleDelete = (MembrosEquipe, id) => {
        const id2 = [id];
        const selectedRowsData = id2.map((id) => MembrosEquipe.find((row) => row.id_membro === id));
        setMembro(selectedRowsData[0]);
        setShow5(true);
    }

    const handleClose = () => {
        setShow4(false);
        setEquipe(null);
        getEquipes();
    }
    return (
        <Modal size="xl" show={show4} onHide={handleClose}>
            <Modal.Body>
                <Box m="20px" >
                    <Header title="Gerenciar Equipe" subtitle="Aqui você pode gerenciar os membros da equipe." />
                    <Box p="5px" backgroundColor={colors.primary[400]} >
                        <Button variant="outline-light" size="sm" onClick={handleAdd}>Adicionar Membro</Button>
                    </Box>
                    <Box
                        backgroundColor={colors.primary[400]}
                        m="1px 0 0 0"
                        width="100%"
                        height="75vh"
                        sx={{
                            "& .MuiDataGrid-root": {
                                border: "none",
                            },
                            "& .MuiDataGrid-cell": {
                                borderBottom: "none",
                            },
                            "& .name-column--cell": {
                                color: colors.greenAccent[300],
                            },
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: colors.blueAccent[700],
                                borderBottom: "none",
                            },
                            "& .MuiDataGrid-virtualScroller": {
                                backgroundColor: colors.primary[400],
                            },
                            "& .MuiDataGrid-footerContainer": {
                                borderTop: "none",
                                backgroundColor: colors.blueAccent[700],
                            },
                            "& .MuiCheckbox-root": {
                                color: `${colors.greenAccent[200]} !important`,
                            },
                            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                                color: `${colors.grey[100]} !important`,
                            },
                        }}
                    >
                        <DataGrid
                            rows={MembrosEquipe}
                            columns={columns}
                            components={{ Toolbar: GridToolbar }}
                            pageSize={pageSize}
                            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                            rowsPerPageOptions={[5, 10, 20]}
                        // getCellClassName={(params) => {
                        //   if (params.field === 'valor' && params.row.categoria == 'Receita') {
                        //     return 'positivo';
                        //   } else if (params.field === 'valor' && params.row.categoria == 'Despesa') {
                        //     return 'negativo';
                        //   }

                        // }}
                        />
                    </Box>
                </Box>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" size="sm" onClick={handleClose}>
                    Fechar
                </Button>
            </Modal.Footer>
            {show && (
                <AddMembro show={show} setShow={setShow} equipe={equipe} getMembrosEquipe={getMembrosEquipe} />
            )}
            {show3 && (
                <ChangeMembroEquipe show3={show3} setShow3={setShow3} membro={membro} getMembrosEquipe={getMembrosEquipe} />
            )}
            {show4 && (
                <DeleteMembroEquipe show5={show5} setShow5={setShow5} membro={membro} setMembro={setMembro} getMembrosEquipe={getMembrosEquipe} />
            )}
            {show2 && (
                <ViewMembro show2={show2} setShow2={setShow2} membro={membro} setMembro={setMembro} />
            )}
        </Modal>
    )
}

export default ViewEquipe;