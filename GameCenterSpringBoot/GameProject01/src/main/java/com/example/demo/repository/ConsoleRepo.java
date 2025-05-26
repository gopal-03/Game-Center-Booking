package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.ConsoleDetails;


public interface ConsoleRepo extends JpaRepository<ConsoleDetails,Long>{
	List<ConsoleDetails> findByUsername(String username);

}
