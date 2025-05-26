package com.example.demo.model;
import java.util.Base64;
import java.util.List;

import com.example.demo.ListToJsonConverter;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;



@Entity
@Table(name = "admingameslist")
public class GamesList {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String username;
	private String gameName;
	@Column(columnDefinition = "JSON")
    @Convert(converter = ListToJsonConverter.class)
	private List<String> platform;
	private String price;
	private String membershipOffer;
	@Lob
	@Column(name = "game_icon", columnDefinition = "LONGBLOB")
	private byte[] gameImage;
	private String imageContentType;
	
	
	public String getImageContentType() {
		return imageContentType;
	}
	public void setImageContentType(String imageContentType) {
		this.imageContentType = imageContentType;
	}
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	public String getGameName() {
		return gameName;
	}
	public void setGameName(String gameName) {
		this.gameName = gameName;
	}
	
	public List<String> getPlatform() {
		return platform;
	}
	public void setPlatform(List<String> platform) {
		this.platform = platform;
	}
	
	public byte[] getGameImage() {
		return gameImage;
	}
	public void setGameImage(byte[] gameImage) {
		this.gameImage = gameImage;
	}
	
	public String getPrice() {
		return price;
	}
	public void setPrice(String price) {
		this.price = price;
	}
	public String getMembershipOffer() {
		return membershipOffer;
	}
	public void setMembershipOffer(String membershipOffer) {
		this.membershipOffer = membershipOffer;
	}
	
	public String getBase64Image() {
	    return gameImage !=null ? Base64.getEncoder().encodeToString(gameImage) : null;
		
	}
}
