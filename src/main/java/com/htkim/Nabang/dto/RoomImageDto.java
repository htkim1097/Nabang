package com.htkim.Nabang.dto;

import com.htkim.Nabang.entity.RoomImage;
import lombok.AllArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@ToString
public class RoomImageDto {

    private Long image_id;
    private Long room_id;
    private String location_id;

    public RoomImage toEntity() {
        return new RoomImage(image_id, room_id, location_id);
    }
}
