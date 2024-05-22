package com.agency.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.agency.server.entities.Agent;
import com.agency.server.entities.Contract;
import com.agency.server.entities.RealEstate;
import com.agency.server.entities.Transaction;
import com.agency.server.entities.User;
import com.agency.server.repositories.AgentRepository;
import com.agency.server.repositories.ContractRepository;
import com.agency.server.repositories.RealEstateRepository;
import com.agency.server.repositories.TransactionRepository;
import com.agency.server.repositories.UserRepository;

@Service
public class TransactionService {
    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private ContractRepository contractRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AgentRepository agentRepository;

    @Autowired
    private RealEstateRepository realEstateRepository;

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }
    
    public Transaction createTransaction(Transaction transaction) {
        String contractContent = generateContractContent(transaction);
        Contract contract = new Contract();
        contract.setContent(contractContent);
        Contract savedContract = contractRepository.save(contract);
        transaction.setContractId(savedContract.getId());
        return transactionRepository.save(transaction);
    }

    public void deleteTransaction(Integer id) {
        transactionRepository.deleteById(id);
    }

    private String generateContractContent(Transaction transaction) {
        RealEstate realEstate = realEstateRepository.findById(transaction.getRealEstateId())
                .orElseThrow(() -> new IllegalArgumentException("Real estate not found with id: " + transaction.getRealEstateId()));
        User seller = userRepository.findById(realEstate.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + realEstate.getUserId()));
        User buyer = userRepository.findById(transaction.getBuyerId())
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + transaction.getBuyerId()));
        Agent agent = agentRepository.findById(transaction.getAgentId())
                .orElseThrow(() -> new IllegalArgumentException("Agent not found with id: " + transaction.getAgentId()));
        return String.format("Transaction for real estate ID: %d between seller: %s, buyer: %s, witnessed by: %s",
                transaction.getRealEstateId(), seller.getFullName(), buyer.getFullName(), agent.getFullName());
    }

    public List<Transaction> getLatestTransactions(int count) {
        return transactionRepository.findLatestTransactions(count);
    }
}