import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import ModificarUsuario from "../usuario/ModificarUsuario";
import EliminarUsuario from "../usuario/ElimarUsuario";
import AñadirUsuario from "../usuario/AñadirUsuario";
import axios from "axios"; 
import Swal from "sweetalert2"; 

function VerUsuario() {
  const [usuarios, setUsuarios] = useState([]);
  const [showModalModificar, setShowModalModificar] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);
  const [showModalCrear, setShowModalCrear] = useState(false);


  const handleModificar = async (usuario) => {
    try {
      const token = localStorage.getItem("token"); 
      const response = await axios.get(`http://localhost:8080/api/usuarios/persona/una/${usuario.id}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
  
      console.log("Datos del usuario obtenidos:", response.data); 
  
    
      if (response.data.data) {
        setUsuarioSeleccionado(response.data.data); 
        setShowModalModificar(true); 
      } else {
        throw new Error("La respuesta no contiene datos válidos");
      }
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron cargar los datos del usuario. Inténtalo de nuevo.",
        confirmButtonText: "Aceptar",
      });
    }
  };

 
  const fetchUsuarios = async () => {
    try {
      const token = localStorage.getItem("token"); 
      const response = await axios.get("http://localhost:8080/api/usuarios/persona/", {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      console.log("Respuesta del backend:", response.data); 

      if (response.data.data && response.data.data.body && Array.isArray(response.data.data.body.data)) {
        setUsuarios(response.data.data.body.data); 
      } else {
        throw new Error("La respuesta no contiene datos válidos");
      }
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron cargar los usuarios. Inténtalo de nuevo.",
        confirmButtonText: "Aceptar",
      });
    }
  };

  // Cargar los usuarios al montar el componente
  useEffect(() => {
    fetchUsuarios();
  }, []);


const handleUsuarioModificado = (usuarioActualizado) => {
  setUsuarios((prevUsuarios) =>
    prevUsuarios.map((u) =>
      u.id === usuarioActualizado.id ? usuarioActualizado : u
    )
  );
  fetchUsuarios(); 
};


  const formatearNombreCompleto = (nombre, paterno, materno) => {
    return `${nombre} ${paterno} ${materno}`;
  };



  const handleEliminar = (usuario) => {
    setUsuarioAEliminar(usuario);
  };


  const handleCrearUsuario = () => {
    setShowModalCrear(true);
  };


  const handleUsuarioEliminado = (id) => {
    setUsuarios((prevUsuarios) => prevUsuarios.filter((u) => u.id !== id));
  };

  return (
    <>
      <Button variant="primary" onClick={handleCrearUsuario} style={{ marginBottom: "10px" }}>
        Crear Usuario
      </Button>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nombre Completo</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Edad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{formatearNombreCompleto(usuario.nombre, usuario.paterno, usuario.materno)}</td>
              <td>{usuario.correo}</td>
              <td>{usuario.telefono}</td>
              <td>{usuario.edad}</td>
              <td>
                <Button variant="warning" onClick={() => handleModificar(usuario)}>
                  Modificar
                </Button>{" "}
                <Button variant="danger" onClick={() => handleEliminar(usuario)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

         {/* Modal de modificación */}
         {usuarioSeleccionado && (
        <ModificarUsuario
          show={showModalModificar}
          handleClose={() => setShowModalModificar(false)}
          usuario={usuarioSeleccionado}
          onUsuarioModificado={handleUsuarioModificado} // Pasar la función para actualizar la lista
        />
      )}


      {/* Alerta de eliminación */}
      {usuarioAEliminar && (
        <EliminarUsuario
          usuario={usuarioAEliminar}
          handleClose={() => setUsuarioAEliminar(null)}
          onUsuarioEliminado={handleUsuarioEliminado} // Pasar la función para actualizar la lista
        />
      )}

      {/* Modal de creación */}
      <AñadirUsuario
        show={showModalCrear}
        handleClose={() => setShowModalCrear(false)}
        onUsuarioCreado={(nuevoUsuario) => {
          setUsuarios([...usuarios, nuevoUsuario]);
          setShowModalCrear(false);
        }}
      />
    </>
  );
}

export default VerUsuario;