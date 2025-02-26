package mx.edu.utez.Usuarios.service.Rol;

import lombok.AllArgsConstructor;
import mx.edu.utez.Usuarios.config.ApiResponse;
import mx.edu.utez.Usuarios.model.rol.RolBean;
import mx.edu.utez.Usuarios.model.rol.RolRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class RolService {
    private final RolRepository repository;
    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse>findAll(){
        return new ResponseEntity<>(new ApiResponse(repository.findAll(), HttpStatus.OK, "Acción realizada con exito!"), HttpStatus.OK);
    }
    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> finOneId(Long idRol){
        Optional<RolBean> foundRol = repository.findById(idRol);

        if(foundRol.isPresent()){
            return new ResponseEntity<>(new ApiResponse(foundRol.get(), HttpStatus.OK, "Rol encontrado!"),HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND, true, "Rol no encontrado"), HttpStatus.NOT_FOUND);
        }
    }


    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> save(RolBean rolBean){

        if(rolBean.getRol() == null || rolBean.getRol().isEmpty() || rolBean.getRol().isBlank()){
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "El nombre del rol es requerido"), HttpStatus.BAD_REQUEST);
        }

        Optional<RolBean> foundRol = repository.findById(rolBean.getId());

        if (foundRol.isPresent()){
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Rol duplicado"), HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(new ApiResponse(repository.saveAndFlush(rolBean), HttpStatus.OK, "Registrado exitosamente!"), HttpStatus.OK);
        }
    }



}
