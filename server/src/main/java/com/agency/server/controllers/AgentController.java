package com.agency.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.agency.server.dtos.NewAgentDto;
import com.agency.server.entities.Agent;
import com.agency.server.repositories.AgentRepository;
import com.agency.server.responses.MessageResponse;
import com.agency.server.services.AgentService;

import java.util.List;

@RestController
@RequestMapping("/api/agents")
public class AgentController {

    @Autowired
    private AgentService agentService;

    @Autowired
    private AgentRepository agentRepository;

    @GetMapping
    public ResponseEntity<List<Agent>> getAllAgents() {
        List<Agent> agents = agentService.findAll();
        return ResponseEntity.ok().body(agents);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Agent> getAgentById(@PathVariable Integer id) {
        return agentService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createAgent(@RequestBody NewAgentDto newAgentDto) {
        if (agentRepository.existsByPhoneNumber(newAgentDto.getPhoneNumber())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Phone number is already in use!"));
        }
        Agent agent = new Agent();
        agent.setFullName(newAgentDto.getFullName());
        agent.setPhoneNumber(newAgentDto.getPhoneNumber());
        Agent createdAgent = agentService.create(agent);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAgent);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Agent> updateAgent(@PathVariable Integer id, @RequestBody Agent agentDetails) {
        Agent updatedAgent = agentService.update(id, agentDetails);
        return ResponseEntity.ok().body(updatedAgent);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAgent(@PathVariable Integer id) {
        agentService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
