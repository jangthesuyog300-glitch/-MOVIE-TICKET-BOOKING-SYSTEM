package com.movieticket.booking.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "SeatRows")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SeatRow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long seatRowId;

    @Column(nullable = false)
    private String rowName;

    @Column(nullable = false)
    private int rowOrder;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "screenId", nullable = false)
    private Screen screen;

    @OneToMany(mappedBy = "seatRow", cascade = CascadeType.ALL)
    private List<Seat> seats;
}
