package com.projecto.ventas.service;

import com.projecto.ventas.config.AuthResponse;
import com.projecto.ventas.config.RegisterRequest;
import com.projecto.ventas.jwt.JwtService;
import com.projecto.ventas.models.Cliente;
import com.projecto.ventas.models.Role;
import com.projecto.ventas.repositry.ClienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final ClienteRepository clienteRespository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthResponse login(RegisterRequest request){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(),request.getPassword()));
        UserDetails cliente= (UserDetails) clienteRespository.findByUsername(request.getUsername()).orElseThrow();
        String token=jwtService.getToken(cliente);
        long id= ((Cliente) cliente).getCliente_id();
        return AuthResponse.builder()
                .token(token)
                .id(id)
                .build();
    }

    public AuthResponse register(RegisterRequest request){
        Cliente cliente = Cliente.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .nombre(request.getNombre())
                .apellido(request.getApellido())
                .telefono(request.getTelefono())
                .email(request.getEmail())
                .role(Role.CLIENTE)
                .build();

        clienteRespository.save(cliente);
        long id= ((Cliente) cliente).getCliente_id();

        return AuthResponse.builder()
                .token(jwtService.getToken((UserDetails) cliente))
                .id(id)
                .build();

    }
}
