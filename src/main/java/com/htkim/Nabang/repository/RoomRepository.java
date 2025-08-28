package com.htkim.Nabang.repository;


import com.htkim.Nabang.entity.Room;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;

public interface RoomRepository extends CrudRepository<Room, Long> {
    @Override
    ArrayList<Room> findAll();
}
