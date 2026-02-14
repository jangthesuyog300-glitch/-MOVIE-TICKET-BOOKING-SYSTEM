package com.movieticket.booking.controller;

import com.movieticket.booking.entity.Show;
import com.movieticket.booking.entity.ShowSeatStatus;
import com.movieticket.booking.service.ShowService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/shows")
@RequiredArgsConstructor
public class ShowController {

    private final ShowService showService;

    @GetMapping("/{city}/{movieId}/{date}")
    public ResponseEntity<List<Show>> getShowsByCityMovieDate(
            @PathVariable String city,
            @PathVariable Long movieId,
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(showService.getShowsByCityMovieAndDate(city, movieId, date));
    }

    @GetMapping("/{showId}/seats")
    public ResponseEntity<List<ShowSeatStatus>> getSeatsByShow(@PathVariable Long showId) {
        return ResponseEntity.ok(showService.getSeatsByShow(showId));
    }

    @GetMapping
    public ResponseEntity<List<Show>> getShows(
            @RequestParam Long movieId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(showService.getShowsByMovieAndDate(movieId, date));
    }

    @PostMapping
    public ResponseEntity<Show> createShow(@RequestBody Show show) {
        return ResponseEntity.ok(showService.createShow(show));
    }
}
