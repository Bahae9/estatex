package com.agency.server.controllers;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.agency.server.dtos.FeedbackIdAndRateDto;
import com.agency.server.dtos.FeedbackWithUserDto;
import com.agency.server.entities.Feedback;
import com.agency.server.services.FeedbackService;
import com.agency.server.services.JwtService;

import io.jsonwebtoken.Claims;

@RestController
@RequestMapping("/api/feedbacks")
public class FeedbackController {
    @Autowired
    private FeedbackService feedbackService;

    @Autowired
    private JwtService jwtService;

    @GetMapping
    public ResponseEntity<List<Feedback>> getAllFeedbacks() {
        List<Feedback> feedbacks = feedbackService.getAllFeedbacks();
        return new ResponseEntity<>(feedbacks, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Feedback> createFeedback(@RequestBody Feedback feedback) {
        Feedback createdFeedback = feedbackService.createFeedback(feedback);
        return new ResponseEntity<>(createdFeedback, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Feedback> updateFeedback(@PathVariable Integer id, @RequestBody Feedback feedback) {
        Feedback updatedFeedback = feedbackService.updateFeedback(id, feedback);
        return new ResponseEntity<>(updatedFeedback, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFeedback(@PathVariable Integer id) {
        feedbackService.deleteFeedback(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/bests")
    public ResponseEntity<List<FeedbackWithUserDto>> getBestFeedbacks(@RequestBody Map<String, Object> requestBody) {
        String token = (String) requestBody.get("token");
        Integer limit = (Integer) requestBody.get("limit");
        Integer userId = -1;
        try {
            if (token != null) {
                Claims claims = jwtService.extractAllClaims(token);
                userId = claims.get("id", Integer.class);
            }
        } catch (Exception e) {
            userId = -1;
        }
        List<FeedbackWithUserDto> bestFeedbacks = feedbackService.getBestFeedbacksExcludingUser(userId, limit);
        return ResponseEntity.ok().body(bestFeedbacks);
    }

    @PostMapping("/withUser")
    public ResponseEntity<List<FeedbackWithUserDto>> getFeedbacksWithoutUser(@RequestBody Map<String, String> requestBody) {
        String token = requestBody.get("token");
        Integer userId = -1;
        try {
            if (token != null) {
                Claims claims = jwtService.extractAllClaims(token);
                userId = claims.get("id", Integer.class);
            }
        } catch (Exception e) {
            userId = -1;
        }
        List<FeedbackWithUserDto> guestFeedbacks = feedbackService.getFeedbacksExcludingUser(userId);
        return ResponseEntity.ok().body(guestFeedbacks);
    }

    @PostMapping("/me")
    public ResponseEntity<List<Feedback>> getUserFeedbacks(@RequestBody Map<String, String> requestBody) {
        String token = requestBody.get("token");
        Integer userId = -1;
        try {
            if (token != null) {
                Claims claims = jwtService.extractAllClaims(token);
                userId = claims.get("id", Integer.class);
            }
        } catch (Exception e) {
            userId = -1;
        }
        List<Feedback> guestFeedbacks = feedbackService.getFeedbacksByUserId(userId);
        return ResponseEntity.ok().body(guestFeedbacks);
    }

    @PostMapping("/lme")
    public ResponseEntity<List<Feedback>> getLimitedUserFeedbacks(@RequestBody Map<String, Object> requestBody) {
        String token = (String) requestBody.get("token");
        Integer count = (Integer) requestBody.get("limit");
        Integer userId = -1;
        try {
            if (token != null) {
                Claims claims = jwtService.extractAllClaims(token);
                userId = claims.get("id", Integer.class);
            }
        } catch (Exception e) {
            userId = -1;
        }
        List<Feedback> guestFeedbacks = feedbackService.getLimitedFeedbacksByUserId(userId, count);
        return ResponseEntity.ok().body(guestFeedbacks);
    }

    @GetMapping("/idsAndRates")
    public ResponseEntity<List<FeedbackIdAndRateDto>> getAllIdsAndRates() {
        List<Object[]> feedbacks = feedbackService.getAllIdsAndRates();
        List<FeedbackIdAndRateDto> dtos = feedbacks.stream()
                .map(arr -> new FeedbackIdAndRateDto((Integer) arr[0], (Integer) arr[1]))
                .collect(Collectors.toList());
        return ResponseEntity.ok().body(dtos);
    }
}