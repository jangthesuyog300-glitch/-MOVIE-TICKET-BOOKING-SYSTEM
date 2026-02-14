package com.movieticket.booking.service;

import com.movieticket.booking.entity.Screen;
import com.movieticket.booking.repository.ScreenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ScreenService {

    private final ScreenRepository screenRepository;

    public List<Screen> getScreensByTheatre(Long theatreId) {
        return screenRepository.findByTheatreTheatreId(theatreId);
    }

    public Screen createScreen(Screen screen) {
        return screenRepository.save(screen);
    }
}
