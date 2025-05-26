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

import com.example.demo.model.ConsoleDetails;
import com.example.demo.model.UserBooking;
import com.example.demo.service.ConsoleService;


@RestController
@RequestMapping("/consoles")
@CrossOrigin("http://localhost:5173/")
public class ConsoleController {
    
    @Autowired
    private ConsoleService consoleService;

    @PostMapping("/save/{username}")
    public ResponseEntity<String> saveConsole(@PathVariable String username,@RequestBody ConsoleDetails consoleDetails) {
        consoleService.saveConsoleDetail(username,consoleDetails);
        return new ResponseEntity<>("Console saved successfully", HttpStatus.CREATED);
    }

    @GetMapping("/list/{username}")
    public ResponseEntity<List<ConsoleDetails>> listConsoles(@PathVariable String username) {
        List<ConsoleDetails> consoleList = consoleService.getConsolesByUsername(username);
        return new ResponseEntity<>(consoleList, HttpStatus.OK);
    }


    @GetMapping("/getdetail/{id}")
    public ResponseEntity<ConsoleDetails> editConsole(@PathVariable Long id) {
        ConsoleDetails consoleDetails = consoleService.getConsoleDetailtById(id);
        return new ResponseEntity<>(consoleDetails, HttpStatus.OK);
    }

    @PutMapping("/update/{id}/{username}")
    public ResponseEntity<String> updateConsole(@PathVariable Long id, @PathVariable String username,@RequestBody ConsoleDetails consoleDetails) {
        consoleDetails.setId(id); 
        consoleService.saveConsoleDetail(username,consoleDetails);
        return new ResponseEntity<>("Console updated successfully", HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteConsole(@PathVariable Long id) {
        consoleService.deleteConsole(id);
        return new ResponseEntity<>("Console deleted successfully", HttpStatus.OK);
    }

    @PostMapping("/book/{id}/{username}")
    public ResponseEntity<String> bookConsole(@PathVariable Long id, @PathVariable String username, @RequestBody UserBooking userBooking) {
        ConsoleDetails consoleDetails = consoleService.getConsoleDetailtById(id);
        userBooking.setConsoleName(consoleDetails.getConsoleName());
        userBooking.setUname(username);
        return new ResponseEntity<>("Console booked successfully", HttpStatus.CREATED);
    }

//    @GetMapping("/devicelist/{username}")
//    public ResponseEntity<List<ConsoleDetails>> listBookings(@PathVariable String username) {
//        List<ConsoleDetails> consoleList = consoleService.getAllConsoleDetails();
//        // Add logic here if filtering by username is required
//        return new ResponseEntity<>(consoleList, HttpStatus.OK);
//    }
}

