import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import swal from 'sweetalert';
import { usuariosApi } from "../helper/UsuariosApi";
export const UsuarioScreen = () => {
    const { usuarioId } = useParams();
    const [usuario, setusuario] = useState("");
    const [lastname, setlastname] = useState("");
    const [phone, setphone] = useState(0);
    const [address, setaddress] = useState("");
    const [email, setemail] = useState("");
    const [document, setdocument] = useState(0);
    useEffect(() => {
        TraerUsuario();
    }, []);

    const TraerUsuario=async()=>{
        const resp = await usuariosApi(`user/getone/${usuarioId}`);
        const user = await resp.json();
        setusuario(user[0].firstName);
        setlastname(user[0].lastName);
        setphone(user[0].phone);
        setaddress(user[0].address);
        setdocument(user[0].document);
        setemail(user[0].email)
        console.log(usuario)
    }

    const handleSubmit=async()=>{
        const resp = await usuariosApi(`user/update`, {firstName:usuario,lastName:lastname,document,address,phone,email }, "PUT");
        const body = await resp.json();
        if(body.Status==200){
            swal({
                title:"Correcto",
                text:"Libro actualizado correctamente",
                icon:"success",
                button:"OK"
            })
        }else{
            swal({
                title:"Error",
                text:"No se ha podido actualizar el libro",
                icon:"error",
                button:"OK"
            })
        }
    }

  return (
    <div style={{ height: "30vh" }}>
      <h2>Actualización de usuarios</h2>
      <hr />
      <div>
        <input
          type="text"
          className="form-control mt-2"
          placeholder="Nombre del usuario"
          onChange={(e) => setusuario(e.target.value)}
          value={usuario}
        />
        <input
          type="text"
          className="form-control mt-2"
          placeholder="Apellido del usuario"
          onChange={(e) => setlastname(e.target.value)}
          value={lastname}
        />
        <input
          type="number"
          className="form-control mt-2"
          placeholder="Document del usuario"
          onChange={(e) => setdocument(e.target.value)}
          value={document}
        />
        <input
          type="text"
          className="form-control mt-2"
          placeholder="Dirección del usuario"
          onChange={(e) => setaddress(e.target.value)}
          value={address}
        />
        <input
          type="number"
          className="form-control mt-2"
          placeholder="Número del usuario"
          onChange={(e) => setphone(e.target.value)}
          value={phone}
        />
        <button
          type="submit"
          className="btn btn-primary mt-2 form-control"
          onClick={handleSubmit}
        >
          Actualizar usuario
        </button>
      </div>
    </div>
  );
};
