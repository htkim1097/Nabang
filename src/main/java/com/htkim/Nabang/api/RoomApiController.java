package com.htkim.Nabang.api;

import com.htkim.Nabang.dto.RoomDto;
import com.htkim.Nabang.entity.Room;
import com.htkim.Nabang.service.RoomService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Slf4j
@RestController
public class RoomApiController {

    @Autowired
    private RoomService roomService;

    // 모든 방 데이터를 불러온다
    @GetMapping("/api/rooms")
    public List<Room> index() {
        return roomService.index();
    }

    // 특정 방 데이터를 불러온다
    @GetMapping("/api/rooms/{id}")
    public Room show(@PathVariable Long id) {
        return roomService.show(id);
    }

    @PostMapping("/api/rooms")
    public ResponseEntity<Room> create(@RequestBody RoomDto roomDto) {
        Room created = roomService.create(roomDto);

        return created != null ? ResponseEntity.status(HttpStatus.OK).body(created) : ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }
}
