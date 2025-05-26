package com.example.demo.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.MembershipDetails;



@Repository
public interface UserMemRepo extends JpaRepository<MembershipDetails,Long>{
	
	MembershipDetails findByUsername(String username);

}
