package mx.edu.utez.Usuarios.controller.Bitacora;

import lombok.AllArgsConstructor;
import mx.edu.utez.Usuarios.config.ApiResponse;
import mx.edu.utez.Usuarios.service.Bitacora.BitacoraService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/bitacora")
@CrossOrigin(origins = {"*"})
@AllArgsConstructor
public class BitacoraController {
    private final BitacoraService bitacoraService;

    @GetMapping("/lista/")
    public ResponseEntity<ApiResponse> getBitacora() {
        return new ResponseEntity<>(new ApiResponse(bitacoraService.getBitacora(), HttpStatus.OK, "Lista bitacora"), HttpStatus.OK);
    }

}
