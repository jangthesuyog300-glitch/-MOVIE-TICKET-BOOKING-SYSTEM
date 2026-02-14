package com.movieticket.booking.repository;

import com.movieticket.booking.entity.City;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CityRepository extends JpaRepository<City, Long> {
}
