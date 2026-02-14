package com.movieticket.booking.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Seats")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Seat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long seatId;

    @Column(nullable = false)
    private String seatNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seatRowId", nullable = false)
    private SeatRow seatRow;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seatTypeId", nullable = false)
    private SeatType seatType;

    @Column(nullable = false)
    private double price;
}
