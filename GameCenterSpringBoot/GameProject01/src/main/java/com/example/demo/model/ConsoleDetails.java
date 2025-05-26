package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class ConsoleDetails {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	Long id;
	private String username;
	String consoleName;
	private Float noOfDevices;
	Float pricePerHour;
	Float membershipOffer;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	
	public Float getNoOfDevices() {
		return noOfDevices;
	}
	public void setNoOfDevices(Float noOfDevices) {
		this.noOfDevices = noOfDevices;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getConsoleName() {
		return consoleName;
	}
	public void setConsoleName(String consoleName) {
		this.consoleName = consoleName;
	}
	public Float getPricePerHour() {
		return pricePerHour;
	}
	public void setPricePerHour(Float pricePerHour) {
		this.pricePerHour = pricePerHour;
	}
	public Float getMembershipOffer() {
		return membershipOffer;
	}
	public void setMembershipOffer(Float membershipOffer) {
		this.membershipOffer = membershipOffer;
	}

}

