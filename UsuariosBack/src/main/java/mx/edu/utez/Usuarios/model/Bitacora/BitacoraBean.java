package mx.edu.utez.Usuarios.model.Bitacora;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mx.edu.utez.Usuarios.model.personas.PersonaBean;
import mx.edu.utez.Usuarios.model.rol.RolBean;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;

@Entity
@Table(name = "bitacora")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BitacoraBean {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    @CreationTimestamp
    private LocalDate fechamovimiento;

    @Column(length = 100)
    private String movimiento;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_id_persona")
    private PersonaBean persona;


    public BitacoraBean(LocalDate fechamovimiento, String movimiento, PersonaBean persona) {
        this.fechamovimiento = fechamovimiento;
        this.movimiento = movimiento;
        this.persona = persona;
    }
}
