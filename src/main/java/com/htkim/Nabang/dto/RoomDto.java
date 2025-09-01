package com.htkim.Nabang.dto;

import com.htkim.Nabang.entity.Room;
import com.htkim.Nabang.type.DealStatus;
import com.htkim.Nabang.type.DealType;
import com.htkim.Nabang.type.RoomType;
import jakarta.persistence.Column;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
public class RoomDto {
    private Long roomId;
//    private Long locationId;
//    private Long priceId;
//    private Long livingIndexId;
    private String roadNameAddress;
    private String detailAddress;
    private double latitude;
    private double longitude;
    private String sido;
    private String sigungu;
    private String emdong;
    private int deposit;
    private int monthlyRent;
    private int securityScore;
    private int disasterSaftyScore;
    private int storeScore;
    private int noiseSaftyScore;
    private int roomType;
    private int dealType;
    private int roomSize;
    private int floor;
    private boolean isElevator;
    private boolean isParking;
    private boolean hasOption;
    private int dealStatus;
    private String description;

    public Room toEntity() {
        return new Room(roomId, roadNameAddress, detailAddress, latitude, longitude, sido, sigungu, emdong, deposit, monthlyRent, securityScore, disasterSaftyScore, storeScore
        , noiseSaftyScore, roomType, dealType, roomSize, floor, isElevator, isParking, hasOption, dealStatus, description);
    }
}
