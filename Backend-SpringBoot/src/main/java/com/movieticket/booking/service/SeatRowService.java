package com.movieticket.booking.service;

import com.movieticket.booking.entity.SeatRow;
import com.movieticket.booking.repository.SeatRowRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SeatRowService {

    private final SeatRowRepository seatRowRepository;

    public List<SeatRow> getSeatRowsByScreen(Long screenId) {
        return seatRowRepository.findByScreenScreenId(screenId);
    }

    public SeatRow createSeatRow(SeatRow seatRow) {
        return seatRowRepository.save(seatRow);
    }
}
