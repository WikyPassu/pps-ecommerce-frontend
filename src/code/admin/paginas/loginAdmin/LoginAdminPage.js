import React, { useState } from 'react';
import { Form, Button, Row, InputGroup, FormControl } from 'react-bootstrap';
import { HiKey, HiMail } from 'react-icons/hi';
import "./LoginAdminPage.css";
import logo from '../../../../assets/logo.png';
import EmpleadoService from '../../../servicios/EmpleadoService';
import { useHistory } from 'react-router';

const initialValues = {
    correo:"",
    clave:""
}
export default function LoginAdminPage() {
    const [usuario, setUsuario] = useState(initialValues);
    const history = useHistory()
    const handleSubmit = async (e) => {
        e.preventDefault();
        let res = await EmpleadoService.login(usuario.correo,usuario.clave);
        if(res){
            history.push("/admin/home");
        }
        else{
            alert("Usuario o clave incorrecta");
        }
        setUsuario(initialValues);
    }

    const handlerChange = ({target}) => {
        const {value,name} = target;
        setUsuario((usuario)=>{
            return {...usuario, [name]:value};
        });
    }

    return (
        <div className="login-admin-page">
            <div className="form-login">
                <div className="logo-container">
                    <b className="title-iniciar-sesion">Iniciar Sesion</b>
                    <img alt="logo-img" width="25px" className="logo-img" src={logo} />
                </div>
                <Form onSubmit={handleSubmit}>
                    <p>Administracion</p>
                    <Row>
                        <InputGroup>
                            <InputGroup.Text><HiMail /></InputGroup.Text>
                            <FormControl onChange={handlerChange} value={usuario.correo} name="correo" type="email" required placeholder="Correo" />
                        </InputGroup>
                    </Row>
                    <Row>
                        <InputGroup>
                            <InputGroup.Text><HiKey /></InputGroup.Text>
                            <FormControl onChange={handlerChange} value={usuario.clave} name="clave" type="password" required placeholder="Contraseña" />
                        </InputGroup>
                    </Row>
                    <Row>
                        <InputGroup>
                            <Button type="submit">Continuar</Button>
                        </InputGroup>
                    </Row>
                </Form>
            </div>
        </div>
    );
}