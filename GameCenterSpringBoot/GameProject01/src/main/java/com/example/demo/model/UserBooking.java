package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="UserBookingDetail")
public class UserBooking{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String uname;
	private Long mobileno;
	private String consoleName;
	private String gname;
	private String playTimeFrom;
	private int playTime;
	private float amountPayed;
	private String centerUsername;
	
	
	public String getCenterUsername() {
		return centerUsername;
	}
	public void setCenterUsername(String centerUsername) {
		this.centerUsername = centerUsername;
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getUname() {
		return uname;
	}
	public void setUname(String uname) {
		this.uname = uname;
	}
	public Long getMobileno() {
		return mobileno;
	}
	public void setMobileno(Long mobileno) {
		this.mobileno = mobileno;
	}
	public String getGname() {
		return gname;
	}
	public void setGname(String gname) {
		this.gname = gname;
	}
	
	
	public String getPlayTimeFrom() {
		return playTimeFrom;
	}
	public void setPlayTimeFrom(String playTimeFrom) {
		this.playTimeFrom = playTimeFrom;
	}
	public int getPlayTime() {
		return playTime;
	}
	public void setPlayTime(int playTime) {
		this.playTime = playTime;
	}
	public float getAmountPayed() {
		return amountPayed;
	}
	public void setAmountPayed(float amountPayed) {
		this.amountPayed = amountPayed;
	}
	
	public String getConsoleName() {
		return consoleName;
	}
	public void setConsoleName(String consoleName) {
		this.consoleName = consoleName;
	}
}