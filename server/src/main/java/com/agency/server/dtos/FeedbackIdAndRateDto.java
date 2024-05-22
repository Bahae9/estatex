package com.agency.server.dtos;

public class FeedbackIdAndRateDto {
    private Integer id;
    private Integer rate;

    public FeedbackIdAndRateDto() {
    }

    public FeedbackIdAndRateDto(Integer id, Integer rate) {
        this.id = id;
        this.rate = rate;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getRate() {
        return rate;
    }

    public void setRate(Integer rate) {
        this.rate = rate;
    }
}