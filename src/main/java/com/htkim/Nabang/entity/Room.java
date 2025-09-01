package com.htkim.Nabang.entity;

import com.htkim.Nabang.dto.RoomDto;
import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Getter
@Setter
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomId;

//    @Column
//    private Long locationId;

    @Column
    private String roadNameAddress;

    @Column
    private String detailAddress;

    @Column
    private double latitude;

    @Column
    private double longitude;

    @Column
    private String sido;

    @Column
    private String sigungu;

    @Column
    private String emdong;

//    @Column
//    private Long priceId;

    @Column
    private int deposit;

    @Column
    private int monthlyRent;

//    @Column
//    private Long livingIndexId;

    @Column
    private int securityScore;

    @Column
    private int disasterSaftyScore;

    @Column
    private int storeScore;

    @Column
    private int noiseSaftyScore;

    @Column(nullable = false)
    private int roomType;

    @Column(nullable = false)
    private int dealType;

    @Column(nullable = false)
    private int roomSize;

    @Column(nullable = false)
    private int floor;

    @Column(nullable = false)
    private boolean isElevator;

    @Column(nullable = false)
    private boolean isParking;

    @Column(nullable = false)
    private boolean hasOption;

    @Column
    private int dealStatus;

    @Column
    private String description;

    // 데이터 수정 시 적용
    public void patch(Room room) {

        this.roomId = room.getRoomId();
        this.roomType = room.getRoomType();
        this.dealType = room.getDealType();
        this.roomSize = room.getRoomSize();
        this.floor = room.getFloor();
        this.isElevator = room.isElevator();
        this.isParking = room.isParking();
        this.dealStatus = room.getDealStatus();

    }
}
