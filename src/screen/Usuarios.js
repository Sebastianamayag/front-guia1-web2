import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { usuariosApi } from "../helper/UsuariosApi";
import { Link } from 'react-router-dom'
import swal from "sweetalert";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export const Usuarios = () => {
  const classes = useStyles();
  const { usuarioId } = useParams();
  const [usuario, setusuario] = useState("");
  const [lastname, setlastname] = useState("");
  const [phone, setphone] = useState(0);
  const [address, setaddress] = useState("");
  const [email, setemail] = useState("");
  const [document, setdocument] = useState(0);
    useEffect(() => {
        traerData();
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

    const [usuarios, setUsuarios] = useState([]);

    const traerData=async()=>{
        const resp=await usuariosApi("user/get");
        const users = await resp.json();
        console.log(users)
        setUsuarios(users);
    }

    const handleDelete=async(email)=>{
        const resp=await usuariosApi("user/delete",{email:email},"DELETE");
        const user = await resp.json();
        if(user.ok){
            swal({
                title: "Correcto",
                text: "Usuario eliminado correctamente",
                icon: "success",
                button: "OK",
              });
        }else{
            swal({
                title: "Error",
                text: "No se ha podido eliminar el usuario",
                icon: "error",
                button: "OK",
              });
        }
    }

    const handleSubmit=async()=>{
      const resp = await usuariosApi(`user/create`, {firstName:usuario,lastName:lastname,document,address,phone,email }, "POST");
      const body = await resp.json();
      if(body.Status==200){
          swal({
              title:"Correcto",
              text:"Usuario creado correctamente",
              icon:"success",
              button:"OK"
          })
      }else{
          swal({
              title:"Error",
              text:"No se ha podido crear el usuario",
              icon:"error",
              button:"OK"
          })
      }
  }

  return (
      <>    
        <div >
        <h2>Crear  usuarios</h2>
        <hr />
        <div>
            <input
            type="text"
            className="form-control mt-2"
            placeholder="Nombre del usuario"
            onChange={(e) => setusuario(e.target.value)}
            />
            <input
            type="text"
            className="form-control mt-2"
            placeholder="Apellido del usuario"
            onChange={(e) => setlastname(e.target.value)}
            />
            <input
            type="number"
            className="form-control mt-2"
            placeholder="Document del usuario"
            onChange={(e) => setdocument(e.target.value)}
            />
            <input
            type="text"
            className="form-control mt-2"
            placeholder="Dirección del usuario"
            onChange={(e) => setaddress(e.target.value)}
            />
            <input
            type="number"
            className="form-control mt-2"
            placeholder="Número del usuario"
            onChange={(e) => setphone(e.target.value)}
            />
            <input
            type="text"
            className="form-control mt-2"
            placeholder="Email del usuario"
            onChange={(e) => setemail(e.target.value)}
            />
            <button
            type="submit"
            className="btn btn-primary mt-2 form-control"
            onClick={handleSubmit}
            >
            Crear usuario
            </button>
        </div>
        </div>
        <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
            <TableRow>
                <TableCell align="right">FirstName&nbsp;</TableCell>
                <TableCell align="right">LastName&nbsp;</TableCell>
                <TableCell align="right">Document&nbsp;</TableCell>
                <TableCell align="right">Address&nbsp;</TableCell>
                <TableCell align="right">Phone&nbsp;</TableCell>
                <TableCell align="right">Email&nbsp;</TableCell>
                <TableCell align="right">Editar&nbsp;</TableCell>
                <TableCell align="right">Eliminar&nbsp;</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {usuarios.map((users) => (
                <TableRow key={users.id}>
                <TableCell component="th" scope="row">
                    {users.firstName}
                </TableCell>
                <TableCell align="right">{users.lastName}</TableCell>
                <TableCell align="right">{users.document}</TableCell>
                <TableCell align="right">{users.address}</TableCell>
                <TableCell align="right">{users.phone}</TableCell>
                <TableCell align="right">{users.email}</TableCell>
                <TableCell align="right"><Link className="btn btn-primary" to={`./usuarios/${users.id}`}>Editar</Link></TableCell>
                <TableCell align="right"><button type="button" onClick={()=>handleDelete(users.email)} className="btn btn-danger">Eliminar</button></TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </>
  );
};


