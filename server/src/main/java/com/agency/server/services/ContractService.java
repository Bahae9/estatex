package com.agency.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.agency.server.entities.Contract;
import com.agency.server.repositories.ContractRepository;

@Service
public class ContractService {

    @Autowired
    private ContractRepository contractRepository;

    public List<Contract> getAllContracts() {
        return contractRepository.findAll();
    }

    public List<Contract> getLatestContracts(int count) {
        return contractRepository.findLatestContracts(count);
    }
}