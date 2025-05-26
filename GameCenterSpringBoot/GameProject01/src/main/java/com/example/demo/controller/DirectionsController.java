package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.DirectionsService;

@RestController
@CrossOrigin("http://localhost:5173/")
public class DirectionsController {

    @Autowired
    private DirectionsService directionsService;

    @GetMapping("/api/directions")
    public String getDirections(
        @RequestParam String origin,
        @RequestParam String destination
    ) {
        return directionsService.getDirections(origin, destination);
    }

}
