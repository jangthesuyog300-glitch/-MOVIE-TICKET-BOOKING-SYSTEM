package com.movieticket.booking.controller;

import com.movieticket.booking.entity.TheatreManagerRequest;
import com.movieticket.booking.service.TheatreManagerRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/theatre-manager-requests")
@RequiredArgsConstructor
public class TheatreManagerRequestController {

    private final TheatreManagerRequestService service;

    @GetMapping
    public ResponseEntity<List<TheatreManagerRequest>> getAllRequests() {
        return ResponseEntity.ok(service.getAllRequests());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TheatreManagerRequest>> getRequestsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getRequestsByUser(userId));
    }

    @PostMapping
    public ResponseEntity<TheatreManagerRequest> createRequest(@RequestBody TheatreManagerRequest request) {
        return ResponseEntity.ok(service.createRequest(request));
    }

    @PutMapping("/{requestId}/status")
    public ResponseEntity<TheatreManagerRequest> updateStatus(
            @PathVariable Long requestId,
            @RequestParam String status,
            @RequestParam(required = false) String rejectionReason,
            @RequestParam Long adminId) {
        return ResponseEntity.ok(service.updateRequestStatus(requestId, status, rejectionReason, adminId));
    }
}
