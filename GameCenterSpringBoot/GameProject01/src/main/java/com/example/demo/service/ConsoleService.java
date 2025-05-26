package com.example.demo.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.ConsoleDetails;
import com.example.demo.repository.ConsoleRepo;


@Service
public class ConsoleService{
	
	@Autowired
	ConsoleRepo consoleRepo;
	
	
//	public List<ConsoleDetails> getAllConsoleDetails() {
//        return consoleRepo.findAll();  
//    }

    public void saveConsoleDetail(String username,ConsoleDetails consoleDetails) {
    	consoleDetails.setUsername(username);
    	consoleRepo.save(consoleDetails); 
    }
    
    public List<ConsoleDetails> getConsolesByUsername(String username){
    	return consoleRepo.findByUsername(username);
    }

    public ConsoleDetails getConsoleDetailtById(Long id) {
        return consoleRepo.findById(id).orElse(null);  
    }

    public void deleteConsole(Long id) {
    	consoleRepo.deleteById(id);  
    }
    
}

