import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import storage from './firebase'

const Uploads = () => {

    const [imgURL, setImagURL] = useState('');
    const [progress, setProgress] = useState(0);
    const [foto, setFoto] = useState(null);

    const setImagemFunction = (data) => {

        setFoto(data);

        // var lerArquivo = new FileReader();

        // lerArquivo.onload = function (imagem) {
        //     const imagembase64_aux = imagem.target.result;
        //     setImagemBase64(imagembase64_aux);
        //     setImagem(imagembase64_aux);
        // }

        // lerArquivo.readAsDataURL(data);
    }

    const handleUpload = (event) => {
        
        if(!foto) return;

        const storageRef = ref(storage, `images/${foto.name}`);
        const uploadTask = uploadBytesResumable(storageRef, foto);

        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
            },
            error => {
                alert(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(url => {
                    setImagURL(url)
                    console.log(url);
                })
            }
        )

    }

    return (
        <div>
            <Form.Group controlId="formFileSm" className="mb-3">
                <Form.Label>Selecionar uma foto:</Form.Label>
                <Form.Control type="file" size="sm" onChange={(e) => setImagemFunction(e.target.files[0])} />
            </Form.Group>
            {!imgURL && <progress value={progress} max='100' /> }
            <Row className="mb-3">
                <Col xs={6} md={4}>
                    {imgURL && <Image className="imagem" src={imgURL} rounded />}
                </Col>
            </Row>
            <Button variant="secondary" onClick={handleUpload} >Enviar</Button>
        </div>
    )
}

export default Uploads;