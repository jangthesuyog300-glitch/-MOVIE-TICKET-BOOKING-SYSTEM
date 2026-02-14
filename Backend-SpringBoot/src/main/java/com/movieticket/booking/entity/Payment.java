package com.movieticket.booking.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Payments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bookingId", nullable = false)
    private Booking booking;

    @Column
    private String gatewayName;

    @Column
    private String gatewayOrderId;

    @Column
    private String gatewayPaymentId;

    @Column
    private String gatewaySignature;

    @Column(nullable = false)
    private double amount;

    @Column(nullable = false)
    private String currency;

    @Column
    private String paymentMethod;

    @Column(nullable = false)
    private String status;

    @Column
    private String failureReason;

    @Column
    private LocalDateTime paidAt;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}
