package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.AdminMemInfo;
import com.example.demo.model.MembershipDetails;
import com.example.demo.service.MembershipService;



@RestController
@RequestMapping("/membership")
@CrossOrigin("http://localhost:5173/")
public class MembershipController {

    @Autowired
    private MembershipService membershipService;

    @PostMapping("/new/{username}")
    public ResponseEntity<String> addMembership(@PathVariable String username,@RequestBody AdminMemInfo adminMemInfo) {
        membershipService.saveAdminMemDetail(username,adminMemInfo);
        return new ResponseEntity<>("Membership added successfully", HttpStatus.CREATED);
    }

    @GetMapping("/list/{username}")
    public ResponseEntity<List<AdminMemInfo>> listMemberships(@PathVariable String username) {
        List<AdminMemInfo> adminMemList = membershipService.getMemInfoByUsername(username);
        return new ResponseEntity<>(adminMemList, HttpStatus.OK);
    }

    @GetMapping("/getadminmembership/{id}")
    public ResponseEntity<AdminMemInfo> getMembershipById(@PathVariable Long id) {
        AdminMemInfo adminMemInfo = membershipService.getAdminMemDetailtById(id);
        return new ResponseEntity<>(adminMemInfo, HttpStatus.OK);
    }

    @PutMapping("/update/{id}/{username}")
    public ResponseEntity<String> updateMembership(@PathVariable Long id, @PathVariable String username,@RequestBody AdminMemInfo adminMemInfo) {
        adminMemInfo.setId(id);
        membershipService.saveAdminMemDetail(username,adminMemInfo);
        return new ResponseEntity<>("Membership updated successfully", HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteMembership(@PathVariable Long id) {
        membershipService.deleteAdminMem(id);
        return new ResponseEntity<>("Membership deleted successfully", HttpStatus.OK);
    }

    @GetMapping("/userlist/{username}")
    public ResponseEntity<List<AdminMemInfo>> getUserMemberships(@PathVariable String username) {
        List<AdminMemInfo> adminMemList = membershipService.getMemInfoByUsername(username);
        return new ResponseEntity<>(adminMemList, HttpStatus.OK);
    }

    @GetMapping("/customermembers")
    public ResponseEntity<List<MembershipDetails>> listCustomerMemberships() {
        List<MembershipDetails> membershipDetails = membershipService.getAllUserMemDetails();
        return new ResponseEntity<>(membershipDetails, HttpStatus.OK);
    }
}

