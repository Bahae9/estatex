package com.agency.server.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.agency.server.dtos.UpdateUserDto;
import com.agency.server.entities.User;
import com.agency.server.responses.LoginResponse;
import com.agency.server.responses.MessageResponse;
import com.agency.server.services.JwtService;
import com.agency.server.services.UserService;

@RequestMapping("/api/users")
@RestController
public class UserController {
    private final UserService userService;
    private final JwtService jwtService;

    public UserController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @GetMapping
    public ResponseEntity<List<User>> allUsers() {
        List<User> users = userService.allUsers();
        return ResponseEntity.ok(users);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Integer id, @RequestBody UpdateUserDto updatedUserDto) {
        User updatedUser = new User();
        updatedUser.setFullName(updatedUserDto.getFullName());
        updatedUser.setEmail(updatedUserDto.getEmail());
        updatedUser.setPhoneNumber(updatedUserDto.getPhoneNumber());
        User user = userService.updateUser(id, updatedUser, updatedUserDto.getOldPassword(), updatedUserDto.getNewPassword());
        if (user != null) {
            String jwtToken = jwtService.generateToken(user);
            LoginResponse loginResponse = new LoginResponse().setToken(jwtToken);
            return ResponseEntity.ok(loginResponse);
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to update user information."));
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAgent(@PathVariable Integer id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/ids")
    public ResponseEntity<List<Map<String, Integer>>> getUserIdsNotAdmin() {
        List<Map<String, Integer>> userIdsList = userService.getUsersIds();
        return ResponseEntity.ok(userIdsList);
    }
}
