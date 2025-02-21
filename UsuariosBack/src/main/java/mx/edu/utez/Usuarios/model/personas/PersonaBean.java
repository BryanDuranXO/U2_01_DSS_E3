package mx.edu.utez.Usuarios.model.personas;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.edu.utez.Usuarios.model.Bitacora.BitacoraBean;
import mx.edu.utez.Usuarios.model.rol.RolBean;

import java.util.Set;

@Entity
@Table(name = "usuarios")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PersonaBean {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50)
    private String nombre;

    @Column(length = 50)
    private String paterno;

    @Column(length = 50)
    private String materno;

    @Column(length = 50)
    private String correo;

    @Column(length = 10)
    private String telefono;

    @Column(length = 50)
    private String username;

    @Column(columnDefinition = "BOOLEAN", nullable = false)
    private Boolean estatus;

    @Column(columnDefinition = "TEXT")
    private String password;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_id_rol")
    private RolBean rolBean;

    @OneToMany(mappedBy = "persona", fetch = FetchType.LAZY)
    private Set<BitacoraBean> bitacoraBeans;


    public PersonaBean(Long id, String nombre, String paterno, String materno, String correo, String telefono, String username, Boolean estatus, String password, RolBean rolBean) {
        this.id = id;
        this.nombre = nombre;
        this.paterno = paterno;
        this.materno = materno;
        this.correo = correo;
        this.telefono = telefono;
        this.username = username;
        this.estatus = estatus;
        this.password = password;
        this.rolBean = rolBean;
    }

    public PersonaBean(Long id, String nombre, String paterno, String materno, String correo, String telefono, String username, Boolean estatus, String password) {
        this.id = id;
        this.nombre = nombre;
        this.paterno = paterno;
        this.materno = materno;
        this.correo = correo;
        this.telefono = telefono;
        this.username = username;
        this.estatus = estatus;
        this.password = password;
    }

    public PersonaBean(String nombre, String paterno, String materno, String correo, String telefono, String username, Boolean estatus, String password, RolBean rolBean) {
        this.nombre = nombre;
        this.paterno = paterno;
        this.materno = materno;
        this.correo = correo;
        this.telefono = telefono;
        this.username = username;
        this.estatus = estatus;
        this.password = password;
        this.rolBean = rolBean;
    }


    public PersonaBean(Long id) {
        this.id = id;
    }
}
