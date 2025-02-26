import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios"; 
import Swal from "sweetalert2"; 

function AñadirUsuario({ show, handleClose, onUsuarioCreado }) {
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [edad, setEdad] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

  
  if (telefono.length < 10 || telefono.length > 12) {
    Swal.fire({
      icon: "warning",
      title: "Teléfono Inválido",
      text: "El teléfono debe tener entre 10 y 12 dígitos.",
      confirmButtonText: "Aceptar",
    });
    return;
  }

  if (!edad || edad <= 0) {
    Swal.fire({
      icon: "warning",
      title: "Edad Inválida",
      text: "La edad debe ser mayor a 0.",
      confirmButtonText: "Aceptar",
    });
    return;
  }


    // Descomponer el nombre completo en nombre, paterno y materno
    const partesNombre = nombreCompleto.split(" ");
    const nombre = partesNombre[0] || "";
    const paterno = partesNombre[1] || "";
    const materno = partesNombre[2] || "";

    
    const nuevoUsuario = {
      nombre,
      paterno,
      materno,
      correo,
      telefono,
      username: correo.split("@")[0], // Usar el correo sin el dominio como username
      estatus: 1,
      password: "12345", 
      edad: parseInt(edad),
      rolBean: {
        id: 2, 
      },
    };

    try {
      const token = localStorage.getItem("token");

      
      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se encontró el token de autenticación.",
          confirmButtonText: "Aceptar",
        });
        return;
      }

      
      const response = await axios.post(
        "http://localhost:8080/api/usuarios/persona/",
        nuevoUsuario,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      
      if (response.status >= 200 && response.status < 300) {
        Swal.fire({
          icon: "success",
          title: "Usuario creado",
          text: "El usuario ha sido creado correctamente.",
          confirmButtonText: "Aceptar",
        });

        
        onUsuarioCreado(response.data.data);

      
        setNombreCompleto("");
        setCorreo("");
        setTelefono("");
        setEdad("");

        handleClose();
      } else {
        throw new Error("Respuesta inesperada del servidor");
      }
    } catch (error) {
      console.error("Error al crear el usuario:", error);

      
      let errorMessage = "No se pudo crear el usuario. Inténtalo de nuevo.";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Crear Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Nombre Completo</Form.Label>
            <Form.Control
              type="text"
              value={nombreCompleto}
              onChange={(e) => setNombreCompleto(e.target.value)}
              placeholder="Ej: Marcelo Diaz Herrera"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Correo</Form.Label>
            <Form.Control
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="Ej: usuario@example.com"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="Ej: 7774122549"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Edad</Form.Label>
            <Form.Control
              type="number"
              value={edad}
              onChange={(e) => setEdad(e.target.value)}
              placeholder="Ej: 21"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" style={{ marginTop: "10px" }}>
            Guardar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AñadirUsuario;