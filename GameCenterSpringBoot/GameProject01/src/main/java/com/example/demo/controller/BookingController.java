package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.ConsoleDetails;
import com.example.demo.model.GamesList;
import com.example.demo.model.RegisterDetails;
import com.example.demo.model.UserBooking;
import com.example.demo.service.BookingService;
import com.example.demo.service.ConsoleService;
import com.example.demo.service.GamesService;
import com.example.demo.service.RegisterService;




@RestController
@CrossOrigin("http://localhost:5173/")
public class BookingController{
	@Autowired
	private BookingService bookingService;
	
	@Autowired
	RegisterService registerService;
	
	@Autowired
	ConsoleService consoleService;
	
	@Autowired
	GamesService gamesService;
	
	
	@PostMapping("/userbookingdetails/save/{id}/{username}")
	public ResponseEntity<String> saveBooking(
	        @PathVariable String username,
	        @PathVariable Long id,
	        @RequestBody UserBooking userBooking) {

	    try {
	    	
	        bookingService.saveUserBooking(userBooking);
	        return ResponseEntity.status(HttpStatus.OK).body("Booked successfully");
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to book the game");
	    }
	}


	@GetMapping("/userbookingdetails/list/{username}")
	public ResponseEntity<Object> listStudents(@PathVariable String username,Model model) {
		List<UserBooking> bookinglist=bookingService.getBookingsByUsername(username);
		return new ResponseEntity<Object>(bookinglist,HttpStatus.OK);
	}
	
	@GetMapping("/userbookingdetails/view/{id}")
	public ResponseEntity<Object> viewStudent(@PathVariable Long id,Model model) {
		UserBooking userBooking=bookingService.getUserBookingById(id);
		return new ResponseEntity<Object>(userBooking,HttpStatus.OK);
	}
	
}