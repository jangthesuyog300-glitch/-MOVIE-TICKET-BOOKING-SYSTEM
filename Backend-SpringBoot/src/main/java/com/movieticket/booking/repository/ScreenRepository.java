package com.movieticket.booking.repository;

import com.movieticket.booking.entity.Screen;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ScreenRepository extends JpaRepository<Screen, Long> {
    List<Screen> findByTheatreTheatreId(Long theatreId);
}
