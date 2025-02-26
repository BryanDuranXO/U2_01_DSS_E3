import React from "react";
import { useNavigate } from "react-router-dom"; 

function Error404() {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <img
          src="https://i.pinimg.com/originals/a8/12/1a/a8121abee959e18cbad25ad4046f76d8.gif" 
          alt="Error 404"
          className="img-fluid mb-4"
          style={{ maxWidth: "300px" }}
        />
        <h1 className="display-4">Error 404: Página No Encontrada</h1>
        <p className="lead">
          ¡Ups! Parece que la página que buscas no existe. No te preocupes, puedes volver a la página anterior.
        </p>

        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate(-1)} 
        >
          Volver Atrás
        </button>
      </div>
    </div>
  );
}

export default Error404;