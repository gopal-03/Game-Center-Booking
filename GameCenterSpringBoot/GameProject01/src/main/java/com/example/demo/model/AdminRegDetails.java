package com.example.demo.model;

import java.util.Arrays;
import java.util.Base64;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Entity
public class AdminRegDetails {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(unique=true)
	private String adminUsername;
	private String shopName;
	private String shopState;
	private String shopDistrict;
	private String shopLocation;
	private String adminName;
	@Column(unique=true)
	private String adminMobNo;
	private int adminAge;
	private int noOfConsoles;
	@Column(unique=true)
	private String adminMail;
	private String adminPassword;
	@Lob
	private byte[] adminPhoto;
	private String imageContentType;
	@Lob
	private byte[] shopPhoto;
	private String imageContentType2;
	
	public String getImageContentType() {
		return imageContentType;
	}
	public void setImageContentType(String imageContentType) {
		this.imageContentType = imageContentType;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getAdminUsername() {
		return adminUsername;
	}
	public void setAdminUsername(String adminUsername) {
		this.adminUsername = adminUsername;
	}
	
	public byte[] getShopPhoto() {
		return shopPhoto;
	}
	public void setShopPhoto(byte[] shopPhoto) {
		this.shopPhoto = shopPhoto;
	}
	
	public String getImageContentType2() {
		return imageContentType2;
	}
	public void setImageContentType2(String imageContentType2) {
		this.imageContentType2 = imageContentType2;
	}
	public String getShopState() {
		return shopState;
	}
	public void setShopState(String shopState) {
		this.shopState = shopState;
	}
	public String getShopDistrict() {
		return shopDistrict;
	}
	public void setShopDistrict(String shopDistrict) {
		this.shopDistrict = shopDistrict;
	}
	public String getShopName() {
		return shopName;
	}
	public void setShopName(String shopName) {
		this.shopName = shopName;
	}
	public String getShopLocation() {
		return shopLocation;
	}
	public void setShopLocation(String shopLocation) {
		this.shopLocation = shopLocation;
	}
	public String getAdminName() {
		return adminName;
	}
	public void setAdminName(String adminName) {
		this.adminName = adminName;
	}
	public String getAdminMobNo() {
		return adminMobNo;
	}
	public void setAdminMobNo(String adminMobNo) {
		this.adminMobNo = adminMobNo;
	}
	public int getAdminAge() {
		return adminAge;
	}
	public void setAdminAge(int adminAge) {
		this.adminAge = adminAge;
	}
	public int getNoOfConsoles() {
		return noOfConsoles;
	}
	public void setNoOfConsoles(int noOfConsoles) {
		this.noOfConsoles = noOfConsoles;
	}
	public String getAdminMail() {
		return adminMail;
	}
	public void setAdminMail(String adminMail) {
		this.adminMail = adminMail;
	}
	public String getAdminPassword() {
		return adminPassword;
	}
	public void setAdminPassword(String adminPassword) {
		this.adminPassword = adminPassword;
	}
	public byte[] getAdminPhoto() {
		return adminPhoto;
	}
	public void setAdminPhoto(byte[] adminPhoto) {
		this.adminPhoto = adminPhoto;
	}
	
	public String getBase64Image() {
	    return adminPhoto !=null ? Base64.getEncoder().encodeToString(adminPhoto) : null;
		
	}
	
	@Override
	public String toString() {
		return "AdminRegDetails [id=" + id + ", adminUsername=" + adminUsername + ", adminName=" + adminName
				+ ", adminMobNo=" + adminMobNo + ", adminAge=" + adminAge + ", noOfConsoles=" + noOfConsoles
				+ ", adminMail=" + adminMail + ", adminPassword=" + adminPassword + ", adminPhoto="
				+ Arrays.toString(adminPhoto) + "]";
	}
}
