package mx.edu.utez.Usuarios.controller.Personas;


import lombok.AllArgsConstructor;
import mx.edu.utez.Usuarios.config.ApiResponse;
import mx.edu.utez.Usuarios.controller.Personas.DTO.PersonaDTO;
import mx.edu.utez.Usuarios.model.personas.PersonaBean;
import mx.edu.utez.Usuarios.service.Persona.PersonaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("/api/usuarios/persona")
@CrossOrigin(origins = {"*"})
@AllArgsConstructor
public class PersonaController {

    private final PersonaService personaService;

    @GetMapping("/una/{id}")
    public ResponseEntity<ApiResponse> getPersonaById(@PathVariable Long id) {
        Optional<PersonaBean> persona = personaService.getPersonaById(id);

        if (persona.isPresent()) {
            return new ResponseEntity<>(new ApiResponse(persona.get(), HttpStatus.OK, "Persona encontrada"), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND, true, "Persona no encontrada"), HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/")
    public ResponseEntity<ApiResponse> getAll(){
        return new ResponseEntity<>(new ApiResponse(personaService.getAllPeople(), HttpStatus.OK, "todo bien"), HttpStatus.OK);
    }

    @GetMapping("/one/{username}")
    public ResponseEntity<ApiResponse> getOnePerson(@PathVariable String username){
        return new ResponseEntity<>(new ApiResponse(personaService.onlyOneHuesped(username), HttpStatus.OK, "todo bien"), HttpStatus.OK);
    }

    @GetMapping("/{telefono}")
    public ResponseEntity<ApiResponse> getOne(@PathVariable String telefono){
        return new ResponseEntity<>(new ApiResponse(personaService.getOnePeople(telefono), HttpStatus.OK, "ok"), HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<ApiResponse> savePerson(@RequestBody PersonaDTO personaDTO){
        return personaService.savePerson(personaDTO.toEntity());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updatePerson(@PathVariable("id") Long id, @RequestBody PersonaDTO dto){
        dto.setId(id);
        return personaService.updatePersona(dto.toEntity(), id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse>deletePerson(@PathVariable("id") Long id){
        return personaService.deletePerson(id);
    }



}
