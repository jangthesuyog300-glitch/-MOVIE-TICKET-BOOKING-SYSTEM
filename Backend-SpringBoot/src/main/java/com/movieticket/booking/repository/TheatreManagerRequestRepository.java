package com.movieticket.booking.repository;

import com.movieticket.booking.entity.TheatreManagerRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TheatreManagerRequestRepository extends JpaRepository<TheatreManagerRequest, Long> {
    List<TheatreManagerRequest> findByRequestedByUserUserId(Long userId);

    List<TheatreManagerRequest> findByStatus(String status);
}
