package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.GamesList;
import com.example.demo.repository.GamesRepo;



@Service
public class GamesService{
	
	@Autowired
	GamesRepo gamesRepo;
	
	
//	public List<GamesList> getAllGameDetails() {
//        return gamesRepo.findAll();  
//    }

    public void saveGameDetail(String username,GamesList gamesList) {
    	gamesList.setUsername(username); 
    	gamesRepo.save(gamesList); 
    }
    
    public List<GamesList> getGamesListByUsername(String username){
    	return gamesRepo.findByUsername(username);
    }
    
    public GamesList getGameDetailtById(Long id) {
        return gamesRepo.findById(id).orElse(null);  
    }

    public void deleteGameDetail(Long id) {
    	gamesRepo.deleteById(id);  
    }
    
    
}
