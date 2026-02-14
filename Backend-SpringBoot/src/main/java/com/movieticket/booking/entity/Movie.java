package com.movieticket.booking.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "Movies")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long movieId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private int duration;

    @Column(precision = 3, scale = 1)
    private Double rating;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private LocalDate releaseDate;

    @Column
    private String imageUrl;

    @ManyToMany
    @JoinTable(name = "MovieGenreMap", joinColumns = @JoinColumn(name = "movieId"), inverseJoinColumns = @JoinColumn(name = "genreId"))
    private Set<Genre> genres;

    @ManyToMany
    @JoinTable(name = "MovieLanguageMap", joinColumns = @JoinColumn(name = "movieId"), inverseJoinColumns = @JoinColumn(name = "languageId"))
    private Set<Language> languages;
}
