package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.example.demo.model.GamesList;



@Repository
@Component
public interface GamesRepo extends JpaRepository<GamesList,Long>{
	
	List<GamesList> findByUsername(String username);

}
