package com.movieticket.booking.controller;

import com.movieticket.booking.entity.Theatre;
import com.movieticket.booking.service.TheatreService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/theatres")
@RequiredArgsConstructor
public class TheatreController {

    private final TheatreService theatreService;

    @GetMapping
    public ResponseEntity<List<Theatre>> getAllTheatres(@RequestParam(required = false) Long cityId) {
        if (cityId != null) {
            return ResponseEntity.ok(theatreService.getTheatresByCity(cityId));
        }
        return ResponseEntity.ok(theatreService.getAllTheatres());
    }

    @PostMapping
    public ResponseEntity<Theatre> createTheatre(@RequestBody Theatre theatre) {
        return ResponseEntity.ok(theatreService.createTheatre(theatre));
    }
}
