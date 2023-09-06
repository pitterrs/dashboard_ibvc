import axios from "axios";

const GetDados = async () => {
    let dados = 0;
    //Captura a quantidade de membros ativos atualmente
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}getallinativos`);
        dados = res.data[0].quantidade
    } catch (error) {
        console.log('erro desconhecido');
    }



    return (
        dados
    )
}

export default GetDados;