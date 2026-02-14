package com.movieticket.booking.service;

import com.movieticket.booking.entity.Booking;
import com.movieticket.booking.entity.BookingSeat;
import com.movieticket.booking.entity.ShowSeatStatus;
import com.movieticket.booking.repository.BookingRepository;
import com.movieticket.booking.repository.ShowSeatStatusRepository;
import com.movieticket.booking.repository.SeatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final ShowSeatStatusRepository showSeatStatusRepository;
    private final SeatRepository seatRepository;

    @Transactional
    public Booking createBooking(Booking booking, List<Long> seatIds) {
        // 1. Validate seat availability
        List<ShowSeatStatus> seatStatuses = showSeatStatusRepository.findByShowShowId(booking.getShow().getShowId())
                .stream()
                .filter(s -> seatIds.contains(s.getSeat().getSeatId()))
                .collect(Collectors.toList());

        for (ShowSeatStatus status : seatStatuses) {
            if (!status.getStatus().equalsIgnoreCase("AVAILABLE")) {
                throw new RuntimeException(
                        "Seat " + status.getSeat().getSeatNumber() + " is already " + status.getStatus());
            }
        }

        // 2. Set booking metadata
        booking.setStatus("PENDING");
        booking.setCreatedAt(LocalDateTime.now());
        booking.setBookedAt(LocalDateTime.now());

        // 3. Create BookingSeat entities
        List<BookingSeat> bookingSeats = new ArrayList<>();
        for (Long seatId : seatIds) {
            BookingSeat bs = BookingSeat.builder()
                    .booking(booking)
                    .seat(seatRepository.findById(seatId).orElseThrow(() -> new RuntimeException("Seat not found")))
                    .price(0.0) // This should be fetched from the Seat entity
                    .build();
            bookingSeats.add(bs);
        }
        booking.setBookingSeats(bookingSeats);

        // 4. Save Booking
        Booking savedBooking = bookingRepository.save(booking);

        // 5. Update Seat Statuses
        for (ShowSeatStatus status : seatStatuses) {
            status.setStatus("OCCUPIED");
            showSeatStatusRepository.save(status);
        }

        return savedBooking;
    }

    public List<Booking> getBookingsByUser(Long userId) {
        return bookingRepository.findByUserUserId(userId);
    }

    @Transactional
    public void cancelBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatus("CANCELLED");
        booking.setCancelledAt(LocalDateTime.now());
        bookingRepository.save(booking);

        // Release seats
        List<ShowSeatStatus> seatStatuses = showSeatStatusRepository.findByShowShowId(booking.getShow().getShowId());
        List<Long> bookedSeatIds = booking.getBookingSeats().stream()
                .map(bs -> bs.getSeat().getSeatId())
                .collect(Collectors.toList());

        for (ShowSeatStatus status : seatStatuses) {
            if (bookedSeatIds.contains(status.getSeat().getSeatId())) {
                status.setStatus("AVAILABLE");
                showSeatStatusRepository.save(status);
            }
        }
    }
}
