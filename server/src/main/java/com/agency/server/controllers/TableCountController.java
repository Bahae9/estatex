package com.agency.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.agency.server.repositories.AgentRepository;
import com.agency.server.repositories.FeedbackRepository;
import com.agency.server.repositories.RealEstateRepository;
import com.agency.server.repositories.UserRepository;
import com.agency.server.responses.AdminTableCountsResponse;

@RestController
@RequestMapping("/api")
public class TableCountController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AgentRepository agentRepository;

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private RealEstateRepository realEstateRepository;

    @GetMapping("/adminTableCounts")
    public AdminTableCountsResponse getTableCounts() {
        long userCount = userRepository.count();
        long agentCount = agentRepository.count();
        long feedbackCount = feedbackRepository.count();
        long realEstateCount = realEstateRepository.count();
        
        return new AdminTableCountsResponse(userCount, agentCount, feedbackCount, realEstateCount);
    }
}