import React from "react";
import { useNavigate } from "react-router-dom"; 

function Error403() {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <img
          src="https://media.istockphoto.com/id/1267488083/vector/security-guard-403-forbidden-site.jpg?s=612x612&w=0&k=20&c=DKKjEupP9oZz3ny3JSo_M-TV0ylIGmw_8bHPbN2AgMU="
          alt="Error 403"
          className="img-fluid mb-4"
          style={{ maxWidth: "300px" }}
        />
        <h1 className="display-4">Error 403: Acceso Prohibido</h1>
        <p className="lead">
          Lo sentimos, no tienes permiso para acceder a esta página.
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

export default Error403;