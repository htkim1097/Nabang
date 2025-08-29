package com.htkim.Nabang.dto;

import com.htkim.Nabang.entity.Room;
import com.htkim.Nabang.type.DealStatus;
import com.htkim.Nabang.type.DealType;
import com.htkim.Nabang.type.RoomType;
import lombok.AllArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@ToString
public class RoomDto {
    private Long roomId;
    private Long locationId;
    private Long priceId;
    private Long livingIndexId;
    private int roomType;
    private int dealType;
    private int roomSize;
    private int floor;
    private boolean isElevator;
    private boolean isParking;
    private boolean hasOption;
    private int dealStatus;

    public Room toEntity() {
        return new Room(roomId, locationId, priceId, livingIndexId, roomType, dealType, roomSize, floor, isElevator, isParking, hasOption, dealStatus);
    }
}
