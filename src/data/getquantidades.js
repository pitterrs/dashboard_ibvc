import axios from "axios";

const GetDados = async () => {
    let dados = 0;
    //Captura a quantidade de membros ativos atualmente
    try {
        const res = await axios.get(`http://localhost:8800/getallinativos`);
        dados = res.data[0].quantidade
    } catch (error) {
        console.log('erro desconhecido');
    }



    return (
        dados
    )
}

export default GetDados;