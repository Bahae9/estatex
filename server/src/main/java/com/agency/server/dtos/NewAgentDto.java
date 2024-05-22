package com.agency.server.dtos;

public class NewAgentDto {
    private String fullName;
    private String phoneNumber;

    public String getFullName() {
        return fullName;
    }

    public NewAgentDto setFullName(String fullName) {
        this.fullName = fullName;
        return this;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public NewAgentDto setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    @Override
    public String toString() {
        return "NewAgentDto{" +
                ", fullName='" + fullName + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                '}';
    }
}
