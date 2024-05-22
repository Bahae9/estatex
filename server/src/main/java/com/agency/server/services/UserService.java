package com.agency.server.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.agency.server.entities.User;
import com.agency.server.entities.enums.UserRole;
import com.agency.server.repositories.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> allUsers() {
        List<User> users = new ArrayList<>();
        userRepository.findAll().forEach(users::add);
        return users;
    }

    @Transactional
    public User updateUser(Integer userId, User updatedUser, String oldPassword, String newPassword) {
        Optional<User> existingUserOpt = userRepository.findById(userId);
        if (existingUserOpt.isPresent()) {
            User existingUser = existingUserOpt.get();
            if (updatedUser.getFullName() != null && !updatedUser.getFullName().equals(existingUser.getFullName())) {
                existingUser.setFullName(updatedUser.getFullName());
            }
            if (updatedUser.getEmail() != null && !updatedUser.getEmail().equals(existingUser.getEmail()) && !userRepository.existsByEmail(updatedUser.getEmail())) {
                existingUser.setEmail(updatedUser.getEmail());
            }
            if (updatedUser.getPhoneNumber() != null && !updatedUser.getPhoneNumber().equals(existingUser.getPhoneNumber()) && !userRepository.existsByPhoneNumber(updatedUser.getPhoneNumber())) {
                existingUser.setPhoneNumber(updatedUser.getPhoneNumber());
            }
            if (newPassword != null && !newPassword.isEmpty() && passwordEncoder.matches(oldPassword, existingUser.getPassword())) {
                existingUser.setPassword(passwordEncoder.encode(newPassword));
            }
            return userRepository.save(existingUser);
        } else {
            return null;
        }
    }

    public void delete(Integer id) {
        userRepository.deleteById(id);
    }

    public List<Map<String, Integer>> getUsersIds() {
        Iterable<User> usersIterable = userRepository.findAll();
        List<Map<String, Integer>> userIdsList = new ArrayList<>();
        for (User user : usersIterable) {
            if (!user.getRoles().equals(UserRole.ADMIN)) {
                Map<String, Integer> userMap = new HashMap<>();
                userMap.put("id", user.getId());
                userIdsList.add(userMap);
            }
        }
        return userIdsList;
    }
}
