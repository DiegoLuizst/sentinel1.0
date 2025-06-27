package com.sentinel.backend.config;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.sentinel.backend.entity.Usuario;
import com.sentinel.backend.repository.UsuarioRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class PermissionFilter extends OncePerRequestFilter {

    private final UsuarioRepository usuarioRepository;

    public PermissionFilter(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated()) {
            String email = auth.getName();
            Usuario usuario = usuarioRepository.findByEmail(email).orElse(null);
            if (usuario != null && usuario.getPermissaoGrupo() != null) {
                String path = request.getRequestURI();
                String method = request.getMethod();
                boolean allowed = usuario.getPermissaoGrupo().getPermissoes().stream()
                        .anyMatch(p -> path.startsWith(p.getRota()) && method.equalsIgnoreCase(p.getMetodoHttp()));
                if (!allowed) {
                    response.setStatus(HttpStatus.FORBIDDEN.value());
                    return;
                }
            }
        }
        filterChain.doFilter(request, response);
    }
}
