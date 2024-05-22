package com.agency.server.dtos;

import java.sql.Date;

public class FeedbackWithUserDto {
    private Integer id;
    private String fullName;
    private int rate;
    private String feedback;
    private Date createdAt;
    private Date updatedAt;

    public FeedbackWithUserDto(Integer id, String userFullName, int rate, String feedback, Date createdAt, Date updatedAt) {
        this.id = id;
        this.fullName = userFullName;
        this.rate = rate;
        this.feedback = feedback;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUserFullName() {
        return fullName;
    }

    public void setUserFullName(String fullName) {
        this.fullName = fullName;
    }

    public int getRate() {
        return rate;
    }

    public void setRate(int rate) {
        this.rate = rate;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
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
}