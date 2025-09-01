package com.htkim.Nabang.repository;

import com.htkim.Nabang.entity.Room;
import com.htkim.Nabang.entity.RoomImage;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface RoomImageRepository extends CrudRepository<RoomImage, Long> {
    List<RoomImage> findByRoomId(Long roomId);
}
