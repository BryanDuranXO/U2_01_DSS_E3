package mx.edu.utez.Usuarios.model.rol;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.edu.utez.Usuarios.model.personas.PersonaBean;

import java.util.Set;

@Entity
@Table(name = "roles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RolBean {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String rol;

    @OneToMany(mappedBy = "rolBean", fetch = FetchType.LAZY)
    private Set<PersonaBean> personaBeans;
    public RolBean(Long idRol, String rol) {
        this.id = idRol;
        this.rol = rol;
    }

    public RolBean( String rol) {
        this.rol = rol;
    }
}


