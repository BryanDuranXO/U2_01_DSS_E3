import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import Swal from "sweetalert2"; 

function Principal() {
  const navigate = useNavigate();

  const handleLogout = () => {
 
    localStorage.removeItem("token");

  
    Swal.fire({
      icon: "success",
      title: "Sesión cerrada",
      text: "Tu sesión ha sido cerrada correctamente.",
      confirmButtonText: "Aceptar",
    }).then(() => {
 
      navigate("/");
    });
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate("/principal/usuarios")}>
                Gestionar Usuario
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/principal/bitacora")}>
                Visualizar Bitácora
              </Nav.Link>
            </Nav>
            <Button variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default Principal;