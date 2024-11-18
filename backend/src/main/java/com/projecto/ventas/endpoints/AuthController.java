package com.projecto.ventas.endpoints;

import com.projecto.ventas.config.AuthResponse;
import com.projecto.ventas.config.RegisterRequest;
import com.projecto.ventas.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins="*")
public class AuthController {

    private final AuthService authService;

    @CrossOrigin(origins="*")
    @PostMapping(value = "/login")
    public ResponseEntity<AuthResponse> login(@RequestBody RegisterRequest request)
    {
        return ResponseEntity.ok(authService.login(request));
    }

    @CrossOrigin(origins="*")
    @PostMapping(value = "/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request)
    {
        return ResponseEntity.ok(authService.register(request));
    }
}
