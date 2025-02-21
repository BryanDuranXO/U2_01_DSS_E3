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

    private final BitacoraRepository repository;

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> registrarMovimiento(PersonaBean persona, String movimiento) {
        if (persona == null) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Persona no válida"), HttpStatus.BAD_REQUEST);
        }

        if (movimiento == null || movimiento.isEmpty()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Movimiento no válido"), HttpStatus.BAD_REQUEST);
        }

        BitacoraBean bitacora = new BitacoraBean();

        bitacora.setPersona(new PersonaBean(persona.getId()));
        bitacora.setMovimiento(movimiento);

        repository.saveAndFlush(bitacora);

        return new ResponseEntity<>(new ApiResponse(bitacora, HttpStatus.OK, "Movimiento registrado correctamente"), HttpStatus.OK);
    }

}
