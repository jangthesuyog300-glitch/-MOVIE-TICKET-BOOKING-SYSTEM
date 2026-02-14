package com.movieticket.booking.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "Cities")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class City {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cityId;

    @Column(nullable = false)
    private String cityName;

    @Column(nullable = false)
    private String stateName;

    @Column(nullable = false)
    private String countryName;

    @Column
    private boolean isActive;

    @OneToMany(mappedBy = "city")
    private List<Theatre> theatres;
}
