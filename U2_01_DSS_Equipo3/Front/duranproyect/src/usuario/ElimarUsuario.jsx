import React, { useEffect } from "react";
import axios from "axios"; 
import Swal from "sweetalert2";

function EliminarUsuario({ usuario, handleClose, onUsuarioEliminado }) {
  useEffect(() => {
    if (usuario) {
      Swal.fire({
        title: "¿Estás seguro?",
        text: `Estás a punto de eliminar a ${usuario.nombre}. Esta acción no se puede deshacer.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const token = localStorage.getItem("token"); 

   
            const response = await axios.delete(
              `http://localhost:8080/api/usuarios/persona/${usuario.id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`, 
                },
              }
            );

          
            Swal.fire("¡Eliminado!", "El usuario ha sido eliminado.", "success");

            // Llamar a la función para actualizar la lista de usuarios en el componente padre
            if (onUsuarioEliminado) {
              onUsuarioEliminado(usuario.id);
            }
          } catch (error) {
            console.error("Error al eliminar el usuario:", error);

        
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "No se pudo eliminar el usuario. Inténtalo de nuevo.",
              confirmButtonText: "Aceptar",
            });
          }
        }
        handleClose(); 
      });
    }
  }, [usuario, handleClose, onUsuarioEliminado]);

  return null; 
}

export default EliminarUsuario;