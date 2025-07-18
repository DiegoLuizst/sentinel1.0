package com.sentinel.backend.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.sentinel.backend.config.JwtServiceGenerator;
import com.sentinel.backend.entity.Usuario;
import com.sentinel.backend.repository.UsuarioRepository;

@Service
public class LoginService {

       @Autowired
       private UsuarioRepository usuarioRepository;
	@Autowired
	private JwtServiceGenerator jwtService;
	@Autowired
	private AuthenticationManager authenticationManager;

	public String logar(Login login) {

		String token = this.gerarToken(login);
		return token;

	}

	public String gerarToken(Login login) {
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						login.getEmail(),
						login.getSenha()));
               Usuario user = usuarioRepository
                               .findByEmail(login.getEmail())
                               .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));
		String jwtToken = jwtService.generateToken(user);
		return jwtToken;
	}

}
