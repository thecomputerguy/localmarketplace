package com.localmarketplace.service.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.localmarketplace.domain.Customer;
import com.localmarketplace.service.dto.CustomerDTO;

/**
 * Mapper for the entity Customer and its DTO CustomerDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CustomerMapper extends EntityMapper<CustomerDTO, Customer> {


   /* @Mapping(target = "addresses", ignore = true)
    @Mapping(target = "serviceRequests", ignore = true)*/
    Customer toEntity(CustomerDTO customerDTO);

    default Customer fromId(Long id) {
        if (id == null) {
            return null;
        }
        Customer customer = new Customer();
        customer.setId(id);
        return customer;
    }
}
