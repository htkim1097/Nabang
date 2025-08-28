package com.htkim.Nabang.service;

import com.htkim.Nabang.dto.RoomDto;
import com.htkim.Nabang.entity.Room;
import com.htkim.Nabang.repository.RoomRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class RoomService {
    @Autowired
    private RoomRepository roomRepository;

    // 모든 방 데이터를 불러온다
    public List<Room> index() {
        return roomRepository.findAll();
    }

    // 특정 방 데이터를 불러온다
    public Room show(Long id) {
        // id로 방 데이터를 찾는다. 없으면 null을 반환한다
        return roomRepository.findById(id).orElse(null);
    }

    // 받은 데이터로 방 데이터를 생성한다
    public Room create(RoomDto roomDto) {
        Room room = roomDto.toEntity();

        if (room.getRoomId() != null) {
            return null;
        }
        return roomRepository.save(room);
    }

    // 방 데이터 수정
    public Room update(Long id, RoomDto roomDto) {
        // Entity로 변환
        Room room = roomDto.toEntity();
        log.info("id: {}, data: {}", id, room.toString());

        // 타깃 조회
        Room target = roomRepository.findById(id).orElse(null);

        // 요청 처리
        if (target == null || !id.equals(room.getRoomId())){
            // 잘못된 요청 응답
            log.info("잘못된 요청 id: {}, data: {}", id, room.toString());
            return null;
        }

        // 업데이트 및 정상 응답
        target.patch(room);
        return roomRepository.save(target);
    }

    // 방 데이터 삭제
    public Room delete(Long id) {
        // 대상 불러오기
        Room target = roomRepository.findById(id).orElse(null);

        // 잘못된 요청 처리
        if (target == null){
            return null;
        }

        roomRepository.delete(target);
        return target;
    }
}
