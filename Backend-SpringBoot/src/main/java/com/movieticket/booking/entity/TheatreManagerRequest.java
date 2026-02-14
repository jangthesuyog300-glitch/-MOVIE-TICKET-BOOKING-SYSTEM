package com.movieticket.booking.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "TheatreManagerRequests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TheatreManagerRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long requestId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId", nullable = false)
    private User requestedByUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cityId", nullable = false)
    private City city;

    @Column(nullable = false)
    private String theatreName;

    @Column(columnDefinition = "TEXT")
    private String theaterAddressUrl;

    @Column(columnDefinition = "TEXT")
    private String address;

    @Column(nullable = false)
    private String govtIdType;

    @Column(nullable = false)
    private String govtIdNumber;

    @Column(nullable = false)
    private String proofDocUrl;

    @Column
    private String status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reviewedByAdminId")
    private User reviewedByAdmin;

    @Column
    private String rejectionReason;

    @Column(nullable = false)
    private LocalDateTime requestedAt = LocalDateTime.now();

    @Column
    private LocalDateTime reviewedAt;
}
