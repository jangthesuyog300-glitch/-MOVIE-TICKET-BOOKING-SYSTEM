package com.movieticket.booking.controller;

import com.movieticket.booking.service.PaymentService;
import com.razorpay.RazorpayException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/create-order")
    public ResponseEntity<Map<String, String>> createOrder(@RequestParam double amount) throws RazorpayException {
        String orderId = paymentService.createOrder(amount, "INR", "receipt_" + System.currentTimeMillis());
        return ResponseEntity.ok(Map.of("orderId", orderId));
    }

    @PostMapping("/verify")
    public ResponseEntity<Map<String, Object>> verifyPayment(
            @RequestParam String orderId,
            @RequestParam String paymentId,
            @RequestParam String signature) {
        boolean isValid = paymentService.verifySignature(orderId, paymentId, signature);
        return ResponseEntity.ok(Map.of("status", isValid ? "success" : "failure"));
    }
}
