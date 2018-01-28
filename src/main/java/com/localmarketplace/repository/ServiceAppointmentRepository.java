package com.localmarketplace.repository;

import com.localmarketplace.domain.ServiceAppointment;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ServiceAppointment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ServiceAppointmentRepository extends JpaRepository<ServiceAppointment, Long> {

}
