package com.agency.server.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.agency.server.entities.User;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
    Optional<User> findByEmail(String email);
    Optional<User> findById(Number id);
    Boolean existsByEmail(String email);
    boolean existsByPhoneNumber(String phoneNumber);
}