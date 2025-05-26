package com.example.demo.controller;


import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.MembershipDetails;
import com.example.demo.model.RegisterDetails;
import com.example.demo.service.MembershipService;
import com.example.demo.service.RegisterService;



@RestController
@RequestMapping("/customer")
@CrossOrigin("http://localhost:5173/")
public class UserController {

    @Autowired
    private RegisterService registerService;

    @Autowired
    private MembershipService membershipService;

    @PostMapping("/new")
    public ResponseEntity<String> registerUser(@RequestBody RegisterDetails registerDetails) {
        registerService.saveRegDetail(registerDetails);
        return new ResponseEntity<>("User registered successfully", HttpStatus.CREATED);
    }

    @PostMapping("/landpage")
    public ResponseEntity<Object> landPage(@RequestBody Map<String, String> loginDetails) {
        String userName = loginDetails.get("username");
        String password = loginDetails.get("password");

        RegisterDetails registerDetails = registerService.findUserByUsername(userName);
        
        if (registerDetails != null && registerDetails.getPassword().equals(password)) {
            
            return new ResponseEntity<>("user found", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid username or password", HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/landpage3/{username}")
    public ResponseEntity<Object> homepage(@PathVariable String username) {
    	RegisterDetails registerDetail = registerService.findUserByUsername(username);
        MembershipDetails membershipDetail = membershipService.findUserByUsername(username);
        Map<String, Object> response = new HashMap<>();
        if (membershipDetail != null) {
            response.put("member", "You are a Membership in our Game Center");
        }
        
        return new ResponseEntity<>(registerDetail, HttpStatus.OK);
    }

    @GetMapping("/log")
    public ResponseEntity<String> login() {
        return new ResponseEntity<>("Login page endpoint", HttpStatus.OK);
    }
}
