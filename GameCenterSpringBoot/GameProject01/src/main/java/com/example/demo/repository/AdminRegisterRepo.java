package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.example.demo.model.AdminRegDetails;


@Repository
@Component
public interface AdminRegisterRepo extends JpaRepository<AdminRegDetails,Long>{
	AdminRegDetails findByAdminUsernameAndAdminPassword(String username, String password);
	
	AdminRegDetails findByAdminUsername(String username);
	
	List<AdminRegDetails> findByShopDistrict(String district);
		
}
