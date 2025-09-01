package com.htkim.Nabang.dto;

import com.htkim.Nabang.entity.RoomImage;
import lombok.AllArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@ToString
public class RoomImageDto {

    private Long imageId;
    private Long roomId;
    private String imageData;

    public RoomImage toEntity() {
        return new RoomImage(imageId, roomId, imageData);
    }
}
