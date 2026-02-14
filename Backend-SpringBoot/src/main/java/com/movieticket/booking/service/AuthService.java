package com.movieticket.booking.service;

import com.movieticket.booking.dto.AuthenticationRequest;
import com.movieticket.booking.dto.AuthenticationResponse;
import com.movieticket.booking.dto.RegisterRequest;
import com.movieticket.booking.entity.Role;
import com.movieticket.booking.entity.User;
import com.movieticket.booking.repository.RoleRepository;
import com.movieticket.booking.repository.UserRepository;
import com.movieticket.booking.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        Role role = roleRepository.findByRoleName(request.getRoleName())
                .orElseThrow(() -> new RuntimeException("Role not found"));

        var user = User.builder()
                .userName(request.getUserName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .createdAt(LocalDateTime.now())
                .build();

        userRepository.save(user);
        var jwtToken = jwtService.generateToken(new CustomUserDetails(user));
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .userName(user.getUserName())
                .role(role.getRoleName())
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()));
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(new CustomUserDetails(user));
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .userName(user.getUserName())
                .role(user.getRole().getRoleName())
                .build();
    }
}
