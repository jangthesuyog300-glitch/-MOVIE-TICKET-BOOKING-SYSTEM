package com.movieticket.booking.repository;

import com.movieticket.booking.entity.SeatRow;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SeatRowRepository extends JpaRepository<SeatRow, Long> {
    List<SeatRow> findByScreenScreenId(Long screenId);
}
