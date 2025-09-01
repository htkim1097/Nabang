package com.htkim.Nabang.repository;


import com.htkim.Nabang.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.ArrayList;
import java.util.List;

public interface RoomRepository extends CrudRepository<Room, Long>, JpaRepository<Room, Long> {
    @Override
    ArrayList<Room> findAll();

    @Query("SELECT r FROM Room r WHERE " +
            "r.longitude BETWEEN :minLon AND :maxLon AND " +
            "r.latitude BETWEEN :minLat AND :maxLat")
    List<Room> findRoomsInBoundingBox(
            @Param("minLon") double minLon,
            @Param("maxLon") double maxLon,
            @Param("minLat") double minLat,
            @Param("maxLat") double maxLat
    );
}
