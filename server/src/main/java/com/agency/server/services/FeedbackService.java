package com.agency.server.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.agency.server.dtos.FeedbackWithUserDto;
import com.agency.server.entities.Feedback;
import com.agency.server.entities.User;
import com.agency.server.repositories.FeedbackRepository;
import com.agency.server.repositories.UserRepository;

@Service
public class FeedbackService {
    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Feedback> getAllFeedbacks() {
        return feedbackRepository.findAll();
    }

    public List<Feedback> getFeedbacksByUserId(Integer userId) {
        return feedbackRepository.findAllByUserId(userId);
    }

    public List<Feedback> getLimitedFeedbacksByUserId(Integer userId, Integer limit) {
        return feedbackRepository.findLimiteFeedbacksBydUser(userId, limit);
    }

    public Feedback createFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    public Feedback updateFeedback(Integer id, Feedback feedback) {
        Feedback existingFeedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Feedback not found with id: " + id));
        existingFeedback.setRate(feedback.getRate());
        existingFeedback.setFeedback(feedback.getFeedback());
        return feedbackRepository.save(existingFeedback);
    }

    public void deleteFeedback(Integer id) {
        feedbackRepository.deleteById(id);
    }

    public List<FeedbackWithUserDto> getBestFeedbacksExcludingUser(Integer userId, Integer limit) {
        List<Feedback> feedbacks = feedbackRepository.findBestFeedbacksExcludingUser(userId, limit);
        List<FeedbackWithUserDto> dtos = new ArrayList<>();
        for (Feedback feedback : feedbacks) {
            Optional<User> userOptional = userRepository.findById(feedback.getUserId());
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                FeedbackWithUserDto dto = new FeedbackWithUserDto(
                    feedback.getId(),
                    user.getFullName(),
                    feedback.getRate(),
                    feedback.getFeedback(),
                    feedback.getCreatedAt(),
                    feedback.getUpdatedAt()
                );
                dtos.add(dto);
            }
        }
        return dtos;
    }

    public List<FeedbackWithUserDto> getFeedbacksExcludingUser(Integer userId) {
        List<Feedback> feedbacks = feedbackRepository.findAllByUserIdNot(userId);
        List<FeedbackWithUserDto> dtos = new ArrayList<>();
        for (Feedback feedback : feedbacks) {
            Optional<User> userOptional = userRepository.findById(feedback.getUserId());
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                FeedbackWithUserDto dto = new FeedbackWithUserDto(
                    feedback.getId(),
                    user.getFullName(),
                    feedback.getRate(),
                    feedback.getFeedback(),
                    feedback.getCreatedAt(),
                    feedback.getUpdatedAt()
                );
                dtos.add(dto);
            }
        }
        return dtos;
    }

    public List<Object[]> getAllIdsAndRates() {
        return feedbackRepository.findAllIdsAndRates();
    }
    
}