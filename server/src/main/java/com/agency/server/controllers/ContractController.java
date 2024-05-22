package com.agency.server.controllers;

import com.agency.server.entities.Contract;
import com.agency.server.services.ContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/contracts")
public class ContractController {

    @Autowired
    private ContractService contractService;

    @GetMapping
    public ResponseEntity<List<Contract>> getAllContracts() {
        List<Contract> contracts = contractService.getAllContracts();
        return ResponseEntity.ok().body(contracts);
    }

    @GetMapping("/latest/{count}")
    public ResponseEntity<List<Contract>> getLatestContracts(@PathVariable int count) {
        List<Contract> contracts = contractService.getLatestContracts(count);
        return ResponseEntity.ok().body(contracts);
    }
}