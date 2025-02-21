package mx.edu.utez.Usuarios.service.Persona;

import lombok.AllArgsConstructor;
import mx.edu.utez.Usuarios.config.ApiResponse;
import mx.edu.utez.Usuarios.model.personas.PersonaBean;
import mx.edu.utez.Usuarios.model.personas.PersonaRepository;
import mx.edu.utez.Usuarios.model.rol.RolBean;
import mx.edu.utez.Usuarios.model.rol.RolRepository;
import mx.edu.utez.Usuarios.security.MainSecurity;
import mx.edu.utez.Usuarios.service.Bitacora.BitacoraService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class PersonaService {

    private final PersonaRepository personaRepository;
    private final RolRepository rolRepository;
    private final BitacoraService bitacoraService;
    private PasswordEncoder passwordEncoder;

    private final MainSecurity pass; // Inyecta el servicio de encriptación de contraseñas

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getAllPeople(){
        return new ResponseEntity<>(new ApiResponse(personaRepository.findAll(), HttpStatus.OK, "todo bien"), HttpStatus.OK);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> getOnePeople(String telefono){
        return new ResponseEntity<>(new ApiResponse(personaRepository.findByTelefono(telefono), HttpStatus.OK, "ok"), HttpStatus.OK);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse>onlyOneHuesped(String username){
        return new ResponseEntity<>(new ApiResponse(personaRepository.findByUsername(username), HttpStatus.OK, "todo ok"), HttpStatus.OK);
    }

    public ResponseEntity<ApiResponse> updatePersona(PersonaBean persona, Long id) {
        Optional<PersonaBean> foundPersona = personaRepository.findById(id);

        if (foundPersona.isPresent()) {
            PersonaBean newPerson = foundPersona.get();

            newPerson.setNombre(persona.getNombre());
            newPerson.setPaterno(persona.getPaterno());
            newPerson.setMaterno(persona.getMaterno());
            newPerson.setCorreo(persona.getCorreo());
            newPerson.setTelefono(persona.getTelefono());
            newPerson.setUsername(persona.getUsername());
            newPerson.setEstatus(persona.getEstatus());

            String newPassword = passwordEncoder.encode(persona.getPassword());
            newPerson.setPassword(newPassword);

            // Actualizar el rol
            if (persona.getRolBean() != null && persona.getRolBean().getId() != null) {
                Optional<RolBean> foundRol = rolRepository.findById(persona.getRolBean().getId());
                if (foundRol.isPresent()) {
                    newPerson.setRolBean(foundRol.get());
                } else {
                    return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "El rol proporcionado no existe"), HttpStatus.BAD_REQUEST);
                }
            }

            personaRepository.save(newPerson);
            return new ResponseEntity<>(new ApiResponse(HttpStatus.OK, false, "Actualización hecha con exito"), HttpStatus.OK);
        }


        return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND, true, "Persona no encontrada"), HttpStatus.NOT_FOUND);
    }



    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> deletePerson(Long id) {
        Optional<PersonaBean> foundPerson = personaRepository.findById(id);

        if (foundPerson.isPresent()) {
            personaRepository.deleteById(id);
            return new ResponseEntity<>(new ApiResponse(HttpStatus.OK, false, "Persona eliminada con éxito"), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND, true, "Persona no encontrada"), HttpStatus.NOT_FOUND);
        }
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> savePerson(PersonaBean personaBean) {
        if (personaBean.getNombre() == null || personaBean.getNombre().isEmpty() || personaBean.getNombre().isBlank()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "El nombre es obligatorio y no puede estar vacío."), HttpStatus.BAD_REQUEST);
        }

        if (personaBean.getPaterno() == null || personaBean.getPaterno().isEmpty() || personaBean.getPaterno().isBlank()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "El apellido Paterno es obligatorio y no puede estar vacío"), HttpStatus.BAD_REQUEST);
        }

        if (personaBean.getMaterno() == null || personaBean.getMaterno().isEmpty() || personaBean.getMaterno().isBlank()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "El apellido Materno es obligatorio y no puede estar vacío"), HttpStatus.BAD_REQUEST);
        }

        if (personaBean.getCorreo() == null || personaBean.getCorreo().isEmpty() || personaBean.getCorreo().isBlank()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "El correo es obligatorio y no puede estar vacío"), HttpStatus.BAD_REQUEST);
        }



        if (personaBean.getTelefono() == null || personaBean.getTelefono().isEmpty() || personaBean.getTelefono().isBlank()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "El número telefónico es obligatorio y no puede estar vacío"), HttpStatus.BAD_REQUEST);
        }

        if (personaBean.getRolBean() == null || personaBean.getRolBean().getId() == null) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "Debe proporcionar un rol válido"), HttpStatus.BAD_REQUEST);
        }

        // Verificación del rol
        Optional<RolBean> foundRol = rolRepository.findById(personaBean.getRolBean().getId());
        if (!foundRol.isPresent()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "El rol proporcionado no existe"), HttpStatus.BAD_REQUEST);
        }
        personaBean.setRolBean(foundRol.get());


        String encrypted = passwordEncoder.encode(personaBean.getPassword());
        personaBean.setPassword(encrypted);

        personaRepository.saveAndFlush(personaBean);
        return new ResponseEntity<>(new ApiResponse(personaBean, HttpStatus.OK, "Guardado exitosamente"), HttpStatus.OK);
    }
    

}
