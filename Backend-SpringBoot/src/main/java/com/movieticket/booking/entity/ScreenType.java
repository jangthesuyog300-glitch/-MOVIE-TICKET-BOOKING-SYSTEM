package com.movieticket.booking.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ScreenTypes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ScreenType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long screenTypeId;

    @Column(nullable = false)
    private String typeName;
}
