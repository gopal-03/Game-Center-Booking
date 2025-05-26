package com.example.demo.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.AdminMemInfo;
import com.example.demo.model.MembershipDetails;
import com.example.demo.model.RegisterDetails;
import com.example.demo.service.MembershipService;
import com.example.demo.service.RegisterService;



@RestController
@RequestMapping("/payment")
public class PaymentController {

    @Autowired
    private MembershipService membershipService;

    @Autowired
    private RegisterService registerService;

    @GetMapping("/new/{id}/{username}")
    public ResponseEntity<Object> getPaymentPage(@PathVariable Long id, @PathVariable String username) {
        AdminMemInfo memInfo = membershipService.getAdminMemDetailtById(id);
        Map<String, Object> response = new HashMap<>();
        response.put("username", username);
        response.put("memInfo", memInfo);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/complete/{id}/{username}")
    public ResponseEntity<String> completePayment(@PathVariable Long id, @PathVariable String username) {
        MembershipDetails membershipDetails = new MembershipDetails();
        RegisterDetails userDetail = registerService.findUserByUsername(username);
        AdminMemInfo memInfo = membershipService.getAdminMemDetailtById(id);

        membershipDetails.setUsername(userDetail.getUsername());
        membershipDetails.setMobileNo(userDetail.getMobno());
        membershipDetails.setMail(userDetail.getMail());
        membershipDetails.setMembershipDetails(memInfo.getMembershipName());
        membershipDetails.setMembershipDuration(memInfo.getDuration());
        membershipDetails.setMembershipPrice(memInfo.getPrice());

        membershipService.saveUserMemDetail(membershipDetails);
        return new ResponseEntity<>("Payment completed successfully", HttpStatus.CREATED);
    }

    @GetMapping("/memdetails/{username}")
    public ResponseEntity<MembershipDetails> getUserMembershipDetails(@PathVariable String username) {
        MembershipDetails membershipDetails = membershipService.findUserByUsername(username);
        return new ResponseEntity<>(membershipDetails, HttpStatus.OK);
    }
}
