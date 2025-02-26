import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"; 
import axios from "axios"; 

function Login() {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    
      const response = await axios.post("http://localhost:8080/api/auth/signin", {
        username,
        password,
      });


      if (response.data.data) {
      
        localStorage.setItem("token", response.data.data);

   
        Swal.fire({
          icon: "success",
          title: "Acceso exitoso",
          text: response.data.mensaje || "Bienvenido al sistema",
          confirmButtonText: "Aceptar",
        }).then(() => {
        
          navigate("/principal");
        });
      } else {
      
        throw new Error("No se recibió el token en la respuesta");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.mensaje || "Credenciales incorrectas. Inténtalo de nuevo.",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow rounded" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Usuario</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;