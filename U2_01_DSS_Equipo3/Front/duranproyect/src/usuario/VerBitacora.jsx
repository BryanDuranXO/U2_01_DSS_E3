import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios"; 
import Swal from "sweetalert2"; 

function VerBitacora() {
    const [bitacora, setBitacora] = useState([]);

   
    const fetchBitacora = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:8080/bitacora/lista/", {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            });

            console.log("Respuesta del backend:", response.data); 

            
            if (response.data.data && response.data.data.body && Array.isArray(response.data.data.body.data)) {
                setBitacora(response.data.data.body.data); 
            } else {
                throw new Error("La respuesta no contiene datos válidos");
            }
        } catch (error) {
            console.error("Error al obtener la bitácora:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudieron cargar los registros de la bitácora. Inténtalo de nuevo.",
                confirmButtonText: "Aceptar",
            });
        }
    };


    useEffect(() => {
        fetchBitacora();
    }, []);

    return (
        <div>
            <h2>Visualizar Bitácora</h2>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Acción</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {bitacora.map((registro) => (
                        <tr key={registro.id}>
                            <td>{registro.nombreUsuario}</td>
                            <td>{registro.movimiento}</td>
                            <td>{new Date(registro.fechamovimiento).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default VerBitacora;