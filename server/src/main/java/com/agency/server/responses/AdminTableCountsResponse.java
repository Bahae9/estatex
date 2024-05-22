package com.agency.server.responses;

public class AdminTableCountsResponse {
    private long userCount;
    private long agentCount;
    private long feedbackCount;
    private long realEstateCount;

    public AdminTableCountsResponse(long userCount, long agentCount, long feedbackCount, long realEstateCount) {
        this.userCount = userCount;
        this.agentCount = agentCount;
        this.feedbackCount = feedbackCount;
        this.realEstateCount = realEstateCount;
    }

    public long getUserCount() {
        return userCount;
    }

    public void setUserCount(long userCount) {
        this.userCount = userCount;
    }

    public long getAgentCount() {
        return agentCount;
    }

    public void setAgentCount(long agentCount) {
        this.agentCount = agentCount;
    }

    public long getFeedbackCount() {
        return feedbackCount;
    }

    public void setFeedbackCount(long feedbackCount) {
        this.feedbackCount = feedbackCount;
    }

    public long getRealEstateCount() {
        return realEstateCount;
    }

    public void setRealEstateCount(long realEstateCount) {
        this.realEstateCount = realEstateCount;
    }
}