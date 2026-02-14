package com.movieticket.booking.controller;

import com.movieticket.booking.entity.Booking;
import com.movieticket.booking.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking, @RequestParam List<Long> seatIds) {
        return ResponseEntity.ok(bookingService.createBooking(booking, seatIds));
    }

    @PostMapping("/cancel")
    public ResponseEntity<Void> cancelBooking(@RequestBody Map<String, Long> payload) {
        bookingService.cancelBooking(payload.get("bookingId"));
        return ResponseEntity.ok().build();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Booking>> getBookingsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(bookingService.getBookingsByUser(userId));
    }
}
