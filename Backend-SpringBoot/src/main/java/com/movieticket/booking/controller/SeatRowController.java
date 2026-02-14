package com.movieticket.booking.controller;

import com.movieticket.booking.entity.SeatRow;
import com.movieticket.booking.service.SeatRowService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/seatrows")
@RequiredArgsConstructor
public class SeatRowController {

    private final SeatRowService seatRowService;

    @GetMapping("/screen/{screenId}")
    public ResponseEntity<List<SeatRow>> getSeatRowsByScreen(@PathVariable Long screenId) {
        return ResponseEntity.ok(seatRowService.getSeatRowsByScreen(screenId));
    }

    @PostMapping
    public ResponseEntity<SeatRow> createSeatRow(@RequestBody SeatRow seatRow) {
        return ResponseEntity.ok(seatRowService.createSeatRow(seatRow));
    }
}
