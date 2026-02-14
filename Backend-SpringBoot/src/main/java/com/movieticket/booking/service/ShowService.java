package com.movieticket.booking.service;

import com.movieticket.booking.entity.Show;
import com.movieticket.booking.entity.ShowSeatStatus;
import com.movieticket.booking.repository.ShowRepository;
import com.movieticket.booking.repository.ShowSeatStatusRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ShowService {

    private final ShowRepository showRepository;
    private final ShowSeatStatusRepository showSeatStatusRepository;

    public List<ShowSeatStatus> getSeatsByShow(Long showId) {
        return showSeatStatusRepository.findByShowShowId(showId);
    }

    public List<Show> getShowsByMovieAndDate(Long movieId, LocalDate date) {
        return showRepository.findByMovieMovieIdAndShowDate(movieId, date);
    }

    public List<Show> getShowsByCityMovieAndDate(String cityName, Long movieId, LocalDate date) {
        return showRepository.findByScreenTheatreCityCityNameAndMovieMovieIdAndShowDate(cityName, movieId, date);
    }

    public Show createShow(Show show) {
        return showRepository.save(show);
    }

    public void deleteShow(Long id) {
        showRepository.deleteById(id);
    }
}
