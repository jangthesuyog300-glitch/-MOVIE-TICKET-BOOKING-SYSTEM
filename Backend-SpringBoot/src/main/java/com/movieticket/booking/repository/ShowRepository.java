package com.movieticket.booking.repository;

import com.movieticket.booking.entity.Show;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface ShowRepository extends JpaRepository<Show, Long> {
    List<Show> findByMovieMovieIdAndShowDate(Long movieId, LocalDate showDate);

    List<Show> findByScreenTheatreCityCityNameAndMovieMovieIdAndShowDate(String cityName, Long movieId,
            LocalDate showDate);

    List<Show> findByScreenTheatreTheatreId(Long theatreId);
}
