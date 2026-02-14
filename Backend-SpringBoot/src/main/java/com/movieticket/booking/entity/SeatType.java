package com.movieticket.booking.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "SeatTypes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SeatType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long seatTypeId;

    @Column(nullable = false)
    private String typeName;
}
