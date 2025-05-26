package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.example.demo.model.RegisterDetails;



@Repository
@Component
public interface RegisterRepo extends JpaRepository<RegisterDetails,Long>{

	RegisterDetails findByUsernameAndPassword(String username, String password);
	
	RegisterDetails findByUsername(String username);

}
