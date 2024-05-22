package com.agency.server.controllers;

import java.util.List;
import java.util.Map;
import java.util.Optional;

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

import com.agency.server.dtos.RealEstateWithUserDTO;
import com.agency.server.entities.RealEstate;
import com.agency.server.services.JwtService;
import com.agency.server.services.RealEstateService;

import io.jsonwebtoken.Claims;

@RestController
@RequestMapping("/api/realEstates")
public class RealEstateController {

    @Autowired
    private RealEstateService realEstateService;

    @Autowired
    private JwtService jwtService;

    @PostMapping
    public ResponseEntity<RealEstateWithUserDTO> createRealEstate(@RequestBody RealEstate realEstate) {
        RealEstateWithUserDTO createdRealEstate = realEstateService.create(realEstate);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdRealEstate);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RealEstate> updateRealEstate(@PathVariable Integer id, @RequestBody RealEstate realEstateDetails) {
        RealEstate updatedRealEstate = realEstateService.update(id, realEstateDetails);
        return ResponseEntity.ok().body(updatedRealEstate);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRealEstate(@PathVariable Integer id) {
        realEstateService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/withUserDetails")
    public ResponseEntity<List<RealEstateWithUserDTO>> getAllRealEstatesWithUserDetails() {
        List<RealEstateWithUserDTO> realEstatesWithUserDetails = realEstateService.findAllWithUserDetails();
        return ResponseEntity.ok().body(realEstatesWithUserDetails);
    }

    @GetMapping("/withUserDetails/{id}")
    public ResponseEntity<RealEstateWithUserDTO> getRealEstateWithUserDetailsById(@PathVariable Integer id) {
        Optional<RealEstateWithUserDTO> realEstateWithUserDTOOptional = realEstateService.findByIdWithUserDetails(id);
        return realEstateWithUserDTOOptional
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/latest/{count}")
    public ResponseEntity<List<RealEstateWithUserDTO>> getLatestTransactions(@PathVariable int count) {
        List<RealEstateWithUserDTO> realEstatesWithUserDetails = realEstateService.getLatestRealEstates(count);
        return ResponseEntity.ok().body(realEstatesWithUserDetails);
    }

    @PostMapping("/me")
    public ResponseEntity<List<RealEstate>> getUserFeedbacks(@RequestBody Map<String, String> requestBody) {
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
        List<RealEstate> guestFeedbacks = realEstateService.getRealEstatesByUserId(userId);
        return ResponseEntity.ok().body(guestFeedbacks);
    }

    @PostMapping("/filter")
    public ResponseEntity<List<RealEstateWithUserDTO>> getFilteredRealEstates(@RequestBody Map<String, Object> filters) {
        String search = (String) filters.getOrDefault("search", null);
        String type = (String) filters.getOrDefault("type", null);
        List<String> categories = (List<String>) filters.getOrDefault("categories", null);
        Integer minPrice = filters.get("minPrice") != null ? (Integer) filters.get("minPrice") : null;
        Integer maxPrice = filters.get("maxPrice") != null ? (Integer) filters.get("maxPrice") : null;
        Integer minSize = filters.get("minSize") != null ? (Integer) filters.get("minSize") : null;
        Integer maxSize = filters.get("maxSize") != null ? (Integer) filters.get("maxSize") : null;
        String sortPriceBy = (String) filters.getOrDefault("sortPriceBy", null);
        String sortSizeBy = (String) filters.getOrDefault("sortSizeBy", null);
        List<RealEstateWithUserDTO> filteredRealEstates = realEstateService.findFilteredRealEstates(
                search, type, categories, minPrice, maxPrice, minSize, maxSize, sortPriceBy, sortSizeBy);
    
        return ResponseEntity.ok(filteredRealEstates);
    }

}
