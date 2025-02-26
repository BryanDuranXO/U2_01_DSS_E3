import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

function ModificarUsuario({ show, handleClose, usuario, onUsuarioModificado }) {
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [edad, setEdad] = useState("");
  const [errorNombre, setErrorNombre] = useState("");

  // Actualizar los estados cuando el usuario cambie
  useEffect(() => {
    if (usuario) {
      const nombreCompletoFormateado = `${usuario.nombre} ${usuario.paterno} ${usuario.materno}`;
      setNombreCompleto(nombreCompletoFormateado);
      setCorreo(usuario.correo || "");
      setTelefono(usuario.telefono || "");
      setEdad(usuario.edad || "");
    }
  }, [usuario]);

  // Función para validar y separar el nombre completo
  const validarYSepararNombre = () => {
    const partesNombre = nombreCompleto.trim().split(" ");
    if (partesNombre.length !== 3) {
      setErrorNombre("El nombre completo debe tener exactamente 3 palabras (Nombre Paterno Materno).");
      return null;
    }
    setErrorNombre("");
    return {
      nombre: partesNombre[0],
      paterno: partesNombre[1],
      materno: partesNombre[2],
    };
  };

  // Función para guardar los cambios
  const handleGuardar = async () => {
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

    const nombreSeparado = validarYSepararNombre();
    if (!nombreSeparado) return;

    const usuarioActualizado = {
      ...nombreSeparado,
      correo,
      telefono,
      username: correo.split("@")[0],
      estatus: true,
      password: "12345",
      edad: parseInt(edad),
      rolId: 2,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:8080/api/usuarios/persona/${usuario.id}`,
        usuarioActualizado,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    
      Swal.fire({
        icon: "success",
        title: "Usuario actualizado",
        text: "El usuario ha sido modificado correctamente.",
        confirmButtonText: "Aceptar",
      });

      // Llamar a la función para actualizar la lista de usuarios
      onUsuarioModificado(response.data.data);

      
      handleClose();
    } catch (error) {
      console.error("Error al modificar el usuario:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo modificar el usuario. Inténtalo de nuevo.",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modificar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formNombreCompleto">
            <Form.Label>Nombre Completo</Form.Label>
            <Form.Control
              type="text"
              value={nombreCompleto}
              onChange={(e) => setNombreCompleto(e.target.value)}
              placeholder="Ej: Alejandro Diaz Moreno"
              isInvalid={!!errorNombre}
            />
            <Form.Control.Feedback type="invalid">
              {errorNombre}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formCorreo">
            <Form.Label>Correo</Form.Label>
            <Form.Control
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="Ej: usuario@example.com"
            />
          </Form.Group>
          <Form.Group controlId="formTelefono">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="Ej: 7774122549"
            />
          </Form.Group>
          <Form.Group controlId="formEdad">
            <Form.Label>Edad</Form.Label>
            <Form.Control
              type="number"
              value={edad}
              onChange={(e) => setEdad(e.target.value)}
              placeholder="Ej: 21"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleGuardar}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModificarUsuario;