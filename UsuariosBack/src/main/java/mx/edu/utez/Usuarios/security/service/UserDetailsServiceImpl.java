package mx.edu.utez.Usuarios.security.service;


import mx.edu.utez.Usuarios.model.personas.PersonaBean;
import mx.edu.utez.Usuarios.model.personas.PersonaRepository;

import mx.edu.utez.Usuarios.security.model.UserDetailsImpl;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class UserDetailsServiceImpl implements UserDetailsService {
    private final PersonaRepository personaRepository;

    public UserDetailsServiceImpl(PersonaRepository personaRepository) {
        this.personaRepository = personaRepository;
    }
    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<PersonaBean> foundUser = personaRepository.findByUsername(username);
        if (foundUser.isPresent())
            return UserDetailsImpl.build(foundUser.get());
        throw new UsernameNotFoundException("UserNotFound");
    }
}
