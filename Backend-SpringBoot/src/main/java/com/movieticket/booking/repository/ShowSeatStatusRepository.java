package com.movieticket.booking.repository;

import com.movieticket.booking.entity.ShowSeatStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ShowSeatStatusRepository extends JpaRepository<ShowSeatStatus, Long> {
    List<ShowSeatStatus> findByShowShowId(Long showId);
}
