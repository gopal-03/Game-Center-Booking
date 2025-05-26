package com.example.demo.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

import com.example.demo.model.AdminRegDetails;
import com.example.demo.service.AdminRegService;




@RestController
@CrossOrigin("http://localhost:5173/")
public class AdminController {
	
	private final Map<String, Long> otpExpiryStorage = new HashMap<>();
    
    private final Map<String, Integer> otpStorage = new HashMap<>();
    private final String SENDER_PHONE_NUMBER = "+12184192188";

    @Autowired
    private AdminRegService adminRegService;

    @PostMapping("/send-otp")
    public String sendOtp(@RequestParam String mobileNumber) {
    	String formattedNumber = "+91" + mobileNumber; // For India
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        otpStorage.put(mobileNumber, otp);
        otpExpiryStorage.put(mobileNumber, System.currentTimeMillis() + 5 * 60 * 1000);

        Message.creator(
                new PhoneNumber(formattedNumber),
                new PhoneNumber(SENDER_PHONE_NUMBER),
                "Your OTP is: " + otp
        ).create();

        return "OTP sent successfully";
    }

    @PostMapping("/verify-otp")
    public String verifyOtp(@RequestParam String mobileNumber, @RequestParam int otp) {
        Integer storedOtp = otpStorage.get(mobileNumber);
        Long expiryTime = otpExpiryStorage.get(mobileNumber);

        if (storedOtp != null && expiryTime != null) {
            if (System.currentTimeMillis() > expiryTime) {
                otpStorage.remove(mobileNumber);
                otpExpiryStorage.remove(mobileNumber);
                return "OTP expired";
            }

            if (storedOtp == otp) {
                otpStorage.remove(mobileNumber);
                otpExpiryStorage.remove(mobileNumber);
                return "OTP verified successfully";
            }
        }

        return "Invalid OTP";
    }
    
    

    @PostMapping("/adminland")
    public String adminHome(@ModelAttribute AdminRegDetails adminRegDetails, @RequestParam("file") MultipartFile image,@RequestParam("file2") MultipartFile image2) throws IOException {
        if (image != null && !image.isEmpty()) {
            adminRegDetails.setAdminPhoto(image.getBytes());
            adminRegDetails.setImageContentType(image.getContentType());
        } else {
            return "No image uploaded";
        }
        
        if (image2 != null && !image2.isEmpty()) {
            adminRegDetails.setShopPhoto(image2.getBytes());
            adminRegDetails.setImageContentType2(image2.getContentType());
        } else {
            return "No image uploaded";
        }
        
        adminRegService.saveAdminRegDetail(adminRegDetails);
        return "Entered Successfully";
    }

	
	@PostMapping("/adminland2")
	public String adminlandpage(@RequestParam("adminUsername") String username, 
	                            @RequestParam("adminPassword") String password, 
	                            Model model) {
	    AdminRegDetails user = adminRegService.login(username, password);
	    
	    if (user != null) { 
	        model.addAttribute("id", user.getId());
	        return "User Found";
	    } else {
	        return "User not found";
	    }
	}
	
	@GetMapping("/adminpage/{adminUsername}")
	public ResponseEntity<Object> fetchAdminDetail(@PathVariable String adminUsername){
		AdminRegDetails adminDetail = adminRegService.findByUsername(adminUsername);
		
		if (adminDetail.getAdminPhoto() != null) {
	        String base64Image = "data:" + adminDetail.getImageContentType() + ";base64," + 
	                             Base64.getEncoder().encodeToString(adminDetail.getAdminPhoto());
	        adminDetail.setAdminPhoto(null);
	        adminDetail.setImageContentType(base64Image);
	    }
		
		return new ResponseEntity<Object>(adminDetail,HttpStatus.OK);
	}
	
	@GetMapping("/gamecenters/{district}")
	public ResponseEntity<Object> fetchGameCenters(@PathVariable String district){
		List<AdminRegDetails> details = adminRegService.findGameCenters(district);
		if(details != null) {
			List<Map<String, Object>> response = new ArrayList<>();
			
			for(AdminRegDetails center: details) {
				if (center.getShopPhoto() != null) {
			        String base64Image = "data:" + center.getImageContentType2() + ";base64," + 
			                             Base64.getEncoder().encodeToString(center.getShopPhoto());
			        center.setShopPhoto(null);
			        center.setImageContentType2(base64Image);
			    }
				Map<String,Object> gameCenter = new HashMap<>();
				gameCenter.put("shopPhoto", center.getImageContentType2());
				gameCenter.put("shopName", center.getShopName());
				gameCenter.put("adminUsername", center.getAdminUsername());
				response.add(gameCenter);
			}
			
			return new ResponseEntity<Object>(response,HttpStatus.OK);
		}
		
		return new ResponseEntity<Object>("not found game center",HttpStatus.NOT_FOUND);
	}
	
	
//	@RequestMapping("/log")
//	public String adminLogin() {
//		return "adminlog";
//	}
}
