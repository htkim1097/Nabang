package com.htkim.Nabang.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Getter
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomId;

    @Column(nullable = false)
    private Long locationId;

    @Column(nullable = false)
    private Long priceId;

    @Column(nullable = false)
    private Long livingIndexId;

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

    @Column(nullable = false)
    private int dealStatus;

    // 데이터 수정 시 적용
    public void patch(Room room) {

        this.roomId = room.getRoomId();
        this.locationId = room.getLocationId();
        this.priceId = room.getPriceId();
        this.livingIndexId = room.getLivingIndexId();
        this.roomType = room.getRoomType();
        this.dealType = room.getDealType();
        this.roomSize = room.getRoomSize();
        this.floor = room.getFloor();
        this.isElevator = room.isElevator();
        this.isParking = room.isParking();
        this.dealStatus = room.getDealStatus();

    }
}
