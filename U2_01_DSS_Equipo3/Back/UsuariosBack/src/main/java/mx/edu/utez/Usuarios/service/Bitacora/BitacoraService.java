package mx.edu.utez.Usuarios.service.Bitacora;

import lombok.AllArgsConstructor;
import mx.edu.utez.Usuarios.config.ApiResponse;
import mx.edu.utez.Usuarios.model.Bitacora.BitacoraBean;
import mx.edu.utez.Usuarios.model.Bitacora.BitacoraRepository;
import mx.edu.utez.Usuarios.model.personas.PersonaBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;

@Service
@Transactional
@AllArgsConstructor
public class BitacoraService {

    private final BitacoraRepository bitacoraRepository;

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getBitacora(){
        return new ResponseEntity<>(new ApiResponse(bitacoraRepository.findAll(), HttpStatus.OK, "Bitacora obtenida"), HttpStatus.OK);
    }
}
