package com.example.demo.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.UserBooking;
import com.example.demo.repository.UserBookingRepository;

import jakarta.transaction.Transactional;

@Service
public class BookingService {
	
	@Autowired
	private UserBookingRepository userBookingRepository;
	
	@Transactional
    public void saveUserBooking(UserBooking userBooking) {
        userBookingRepository.save(userBooking);
    }

	public List<UserBooking> getAllUserBookings(){
		return userBookingRepository.findAll();
	}
	public UserBooking getUserBookingById(Long id) {
		return userBookingRepository.findById(id).orElse(null);
		
	}
	
	public List<UserBooking> getBookingsByUsername(String username) {
        return userBookingRepository.findByUname(username);
    }

}
