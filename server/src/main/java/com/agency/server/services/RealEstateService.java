package com.agency.server.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.agency.server.dtos.RealEstateWithUserDTO;
import com.agency.server.entities.RealEstate;
import com.agency.server.entities.User;
import com.agency.server.entities.enums.TransactionType;
import com.agency.server.repositories.RealEstateRepository;
import com.agency.server.repositories.UserRepository;

@Service
public class RealEstateService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private RealEstateRepository realEstateRepository;

    @Autowired
    private UserRepository userRepository;

    public RealEstateWithUserDTO create(RealEstate realEstate) {
        userRepository.findById(realEstate.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + realEstate.getUserId()));
        RealEstate savedRealEstate = realEstateRepository.save(realEstate);
        User user = userRepository.findById(realEstate.getUserId()).orElse(null);
        RealEstateWithUserDTO realEstateWithUserDTO = new RealEstateWithUserDTO();
        realEstateWithUserDTO.setId(savedRealEstate.getId());
        realEstateWithUserDTO.setUserId(user != null ? user.getId() : null);
        realEstateWithUserDTO.setType(savedRealEstate.getType());
        realEstateWithUserDTO.setCreatedAt(savedRealEstate.getCreatedAt());
        realEstateWithUserDTO.setUpdatedAt(savedRealEstate.getUpdatedAt());
        realEstateWithUserDTO.setPrice(savedRealEstate.getPrice());
        realEstateWithUserDTO.setTransactionType(savedRealEstate.getTransactionType());
        realEstateWithUserDTO.setTitle(savedRealEstate.getTitle());
        realEstateWithUserDTO.setDescription(savedRealEstate.getDescription());
        realEstateWithUserDTO.setSize(savedRealEstate.getSize());
        realEstateWithUserDTO.setLocation(savedRealEstate.getLocation());
        realEstateWithUserDTO.setImageUrls(savedRealEstate.getImageUrls());
        if (user != null) {
            realEstateWithUserDTO.setFullName(user.getFullName());
            realEstateWithUserDTO.setEmail(user.getEmail());
        }

        return realEstateWithUserDTO;
    }

    public RealEstate update(Integer id, RealEstate realEstateDetails) {
        RealEstate existingRealEstate = realEstateRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Real Estate not found with id: " + id));
        if (realEstateDetails.getUserId() != null) {
            existingRealEstate.setUserId(realEstateDetails.getUserId());
        }
        if (realEstateDetails.getType() != null) {
            existingRealEstate.setType(realEstateDetails.getType());
        }
        if (realEstateDetails.getPrice() != null) {
            existingRealEstate.setPrice(realEstateDetails.getPrice());
        }
        if (realEstateDetails.getTransactionType() != null) {
            existingRealEstate.setTransactionType(realEstateDetails.getTransactionType());
        }
        if (realEstateDetails.getTitle() != null) {
            existingRealEstate.setTitle(realEstateDetails.getTitle());
        }
        if (realEstateDetails.getDescription() != null) {
            existingRealEstate.setDescription(realEstateDetails.getDescription());
        }
        if (realEstateDetails.getSize() != null) {
            existingRealEstate.setSize(realEstateDetails.getSize());
        }
        if (realEstateDetails.getLocation() != null) {
            existingRealEstate.setLocation(realEstateDetails.getLocation());
        }
        if (realEstateDetails.getImageUrls() != null) {
            existingRealEstate.setImageUrls(realEstateDetails.getImageUrls());
        }
        return realEstateRepository.save(existingRealEstate);
    }

    public List<RealEstate> getRealEstatesByUserId(Integer userId) {
        return realEstateRepository.findAllByUserId(userId);
    }

    public List<RealEstateWithUserDTO> findAllWithUserDetails() {
        List<RealEstate> realEstates = realEstateRepository.findAll();
        List<RealEstateWithUserDTO> dtos = new ArrayList<>();

        for (RealEstate realEstate : realEstates) {
            Optional<User> userOptional = userRepository.findById(realEstate.getUserId());
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                RealEstateWithUserDTO dto = new RealEstateWithUserDTO(
                        realEstate.getId(),
                        realEstate.getUserId(),
                        realEstate.getType(),
                        realEstate.getCreatedAt(),
                        realEstate.getUpdatedAt(),
                        realEstate.getPrice(),
                        realEstate.getTransactionType(),
                        realEstate.getTitle(),
                        realEstate.getDescription(),
                        realEstate.getSize(),
                        realEstate.getLocation(),
                        realEstate.getImageUrls(),
                        user.getFullName(),
                        user.getEmail()
                );
                dtos.add(dto);
            }
        }
        return dtos;
    }

    public Optional<RealEstateWithUserDTO> findByIdWithUserDetails(Integer id) {
        Optional<RealEstate> realEstateOptional = realEstateRepository.findById(id);
        if (realEstateOptional.isPresent()) {
            RealEstate realEstate = realEstateOptional.get();
            Optional<User> userOptional = userRepository.findById(realEstate.getUserId());
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                RealEstateWithUserDTO dto = new RealEstateWithUserDTO(
                        realEstate.getId(),
                        realEstate.getUserId(),
                        realEstate.getType(),
                        realEstate.getCreatedAt(),
                        realEstate.getUpdatedAt(),
                        realEstate.getPrice(),
                        realEstate.getTransactionType(),
                        realEstate.getTitle(),
                        realEstate.getDescription(),
                        realEstate.getSize(),
                        realEstate.getLocation(),
                        realEstate.getImageUrls(),
                        user.getFullName(),
                        user.getEmail()
                );
                return Optional.of(dto);
            }
        }
        return Optional.empty();
    }

    public void delete(Integer id) {
        realEstateRepository.deleteById(id);
    }

    public List<RealEstateWithUserDTO> getLatestRealEstates(int count) {
        List<RealEstate> realEstates = realEstateRepository.findLatestRealEstates(count);
        List<RealEstateWithUserDTO> dtos = new ArrayList<>();
        for (RealEstate realEstate : realEstates) {
            Optional<User> userOptional = userRepository.findById(realEstate.getUserId());
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                RealEstateWithUserDTO dto = new RealEstateWithUserDTO(
                        realEstate.getId(),
                        realEstate.getUserId(),
                        realEstate.getType(),
                        realEstate.getCreatedAt(),
                        realEstate.getUpdatedAt(),
                        realEstate.getPrice(),
                        realEstate.getTransactionType(),
                        realEstate.getTitle(),
                        realEstate.getDescription(),
                        realEstate.getSize(),
                        realEstate.getLocation(),
                        realEstate.getImageUrls(),
                        user.getFullName(),
                        user.getEmail()
                );
                dtos.add(dto);
            }
        }
        return dtos;
    }

    public List<RealEstateWithUserDTO> findFilteredRealEstates(String search, String type, List<String> categories, Integer minPrice, Integer maxPrice, Integer minSize, Integer maxSize, String sortPriceBy, String sortSizeBy) {
    StringBuilder queryString = new StringBuilder("SELECT * FROM realestates WHERE 1=1 ");
    Map<String, Object> params = new LinkedHashMap<>();
    
    if (search != null && !search.isEmpty()) {
        queryString.append(" AND title LIKE ?");
        params.put("search", "%" + search + "%");
    }
    
    if (type != null) {
        queryString.append(" AND transactionType = ?");
        params.put("type", type);
    }

    if (minPrice != null) {
        queryString.append(" AND price >= ?");
        params.put("minPrice", minPrice);
    }

    if (maxPrice != null) {
        queryString.append(" AND price <= ?");
        params.put("maxPrice", maxPrice);
    }

    if (minSize != null) {
        queryString.append(" AND size >= ?");
        params.put("minSize", minSize);
    }

    if (maxSize != null) {
        queryString.append(" AND size <= ?");
        params.put("maxSize", maxSize);
    }

    if (categories != null && !categories.isEmpty()) {
        queryString.append(" AND type IN (");
        for (int i = 0; i < categories.size(); i++) {
            queryString.append("?");
            if (i < categories.size() - 1) {
                queryString.append(", ");
            }
            params.put("category" + i, categories.get(i));
        }
        queryString.append(")");
    }
    
    if ("ASC".equalsIgnoreCase(sortPriceBy)) {
        queryString.append(" ORDER BY price ASC");
    } else if ("DESC".equalsIgnoreCase(sortPriceBy)) {
        queryString.append(" ORDER BY price DESC");
    }
    
    if ("ASC".equalsIgnoreCase(sortSizeBy)) {
        if (queryString.toString().contains("ORDER BY")) {
            queryString.append(", size ASC");
        } else {
            queryString.append(" ORDER BY size ASC");
        }
    } else if ("DESC".equalsIgnoreCase(sortSizeBy)) {
        if (queryString.toString().contains("ORDER BY")) {
            queryString.append(", size DESC");
        } else {
            queryString.append(" ORDER BY size DESC");
        }
    }

    System.out.println("Query: " + queryString.toString());
    System.out.println("Params: " + params.values());

    List<RealEstate> realEstates = jdbcTemplate.query(
        queryString.toString(),
        ps -> {
            int index = 1;
            for (Object value : params.values()) {
                if (value instanceof String) {
                    ps.setString(index, (String) value);
                } else if (value instanceof Integer) {
                    ps.setInt(index, (Integer) value);
                }
                index++;
            }
        },
        (rs, rowNum) -> {
            RealEstate realEstate = new RealEstate();
            realEstate.setId(rs.getInt("id"));
            realEstate.setUserId(rs.getInt("userId"));
            realEstate.setType(rs.getString("type"));
            realEstate.setCreatedAt(rs.getDate("createdAt"));
            realEstate.setUpdatedAt(rs.getDate("updatedAt"));
            realEstate.setPrice(rs.getInt("price"));
            realEstate.setTransactionType(TransactionType.valueOf(rs.getString("transactionType")));
            realEstate.setTitle(rs.getString("title"));
            realEstate.setDescription(rs.getString("description"));
            realEstate.setSize(rs.getInt("size"));
            realEstate.setLocation(rs.getString("location"));
            realEstate.setImageUrls(rs.getString("imageUrls"));
            return realEstate;
        }
    );

    return realEstates.stream().map(realEstate -> {
        Optional<User> userOptional = userRepository.findById(realEstate.getUserId());
        User user = userOptional.orElse(null);

        return new RealEstateWithUserDTO(
            realEstate.getId(),
            realEstate.getUserId(),
            realEstate.getType(),
            realEstate.getCreatedAt(),
            realEstate.getUpdatedAt(),
            realEstate.getPrice(),
            realEstate.getTransactionType(),
            realEstate.getTitle(),
            realEstate.getDescription(),
            realEstate.getSize(),
            realEstate.getLocation(),
            realEstate.getImageUrls(),
            user != null ? user.getFullName() : null,
            user != null ? user.getEmail() : null
        );
    }).collect(Collectors.toList());
}
}
