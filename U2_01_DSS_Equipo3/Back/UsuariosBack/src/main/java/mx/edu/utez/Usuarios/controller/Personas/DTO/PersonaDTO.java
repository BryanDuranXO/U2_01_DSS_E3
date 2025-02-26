package mx.edu.utez.Usuarios.controller.Personas.DTO;

import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.Usuarios.model.personas.PersonaBean;
import mx.edu.utez.Usuarios.model.rol.RolBean;

@Data
@NoArgsConstructor
public class PersonaDTO {
    private Long id;
    private String nombre;
    private String paterno;
    private String materno;
    private String correo;
    private String telefono;
    private String username;
    private String password;
    private Boolean estatus;
    private RolBean rolBean;
    private String edad;

    public PersonaBean toEntity() {
        if (rolBean == null)
                return new PersonaBean(id,nombre,paterno,materno,correo,telefono,username,estatus,password, edad);
            return new PersonaBean(nombre, paterno, materno, correo, telefono, username,estatus, password, rolBean, edad);

    }





//    public PersonaBean toUpdate() {
//        if (rolBean == null)
//            return new PersonaBean(id, nombre, paterno, materno, correo, telefono, username, password, img);
//        return new PersonaBean(id, nombre, paterno, materno, correo, telefono, username, password, img, rolBean);
//    }

}
