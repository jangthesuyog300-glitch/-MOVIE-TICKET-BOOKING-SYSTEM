package com.movieticket.booking.service;

import com.movieticket.booking.entity.Language;
import com.movieticket.booking.repository.LanguageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LanguageService {

    private final LanguageRepository languageRepository;

    public List<Language> getAllLanguages() {
        return languageRepository.findAll();
    }

    public Language createLanguage(Language language) {
        return languageRepository.save(language);
    }
}
