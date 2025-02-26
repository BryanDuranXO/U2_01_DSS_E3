package mx.edu.utez.Usuarios.model.personas;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PersonaRepository extends JpaRepository<PersonaBean, Long> {
    Optional<PersonaBean> findByTelefono(String telefono);
    Optional<PersonaBean> findById(Long id);
    Optional<PersonaBean> findByUsername(String username);
}
