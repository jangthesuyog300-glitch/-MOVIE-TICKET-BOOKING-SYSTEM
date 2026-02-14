package com.movieticket.booking.service;

import com.movieticket.booking.entity.TheatreManagerRequest;
import com.movieticket.booking.repository.TheatreManagerRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TheatreManagerRequestService {

    private final TheatreManagerRequestRepository repository;

    public List<TheatreManagerRequest> getAllRequests() {
        return repository.findAll();
    }

    public List<TheatreManagerRequest> getRequestsByUser(Long userId) {
        return repository.findByRequestedByUserUserId(userId);
    }

    public TheatreManagerRequest createRequest(TheatreManagerRequest request) {
        request.setStatus("PENDING");
        request.setRequestedAt(LocalDateTime.now());
        return repository.save(request);
    }

    public TheatreManagerRequest updateRequestStatus(Long requestId, String status, String rejectionReason,
            Long adminId) {
        TheatreManagerRequest request = repository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        request.setStatus(status);
        request.setRejectionReason(rejectionReason);
        request.setReviewedAt(LocalDateTime.now());
        // Logic to set reviewedByAdmin would go here
        return repository.save(request);
    }
}
