package com.agency.server.dtos;

import com.agency.server.entities.enums.TransactionType;
import java.sql.Date;

public class RealEstateWithUserDTO {
    private Integer id;
    private Integer userId;
    private String type;
    private Date createdAt;
    private Date updatedAt;
    private Integer price;
    private TransactionType transactionType;
    private String title;
    private String description;
    private Integer size;
    private String location;
    private String imageUrls;
    private String fullName;
    private String email;

    public RealEstateWithUserDTO() {}

    public RealEstateWithUserDTO(Integer id, Integer userId, String type, Date createdAt, Date updatedAt,
                                 Integer price, TransactionType transactionType, String title, String description,
                                 Integer size, String location, String imageUrls, String fullName, String email) {
        this.id = id;
        this.userId = userId;
        this.type = type;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.price = price;
        this.transactionType = transactionType;
        this.title = title;
        this.description = description;
        this.size = size;
        this.location = location;
        this.imageUrls = imageUrls;
        this.fullName = fullName;
        this.email = email;
    }

    // Getters and setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public TransactionType getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(TransactionType transactionType) {
        this.transactionType = transactionType;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getSize() {
        return size;
    }

    public void setSize(Integer size) {
        this.size = size;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getImageUrls() {
        return imageUrls;
    }

    public void setImageUrls(String imageUrls) {
        this.imageUrls = imageUrls;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}