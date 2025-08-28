package com.htkim.Nabang.dto;

import com.htkim.Nabang.entity.Location;
import lombok.AllArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@ToString
public class LocationDto {

    private int locationId;
    private String roadNameAddress;
    private String detailAddress;
    private double latitude;
    private double longitude;
    private String sido;
    private String sigungu;
    private String emdong;

    public Location toEntity() {
        return new Location(locationId, roadNameAddress, detailAddress, latitude, longitude, sido, sigungu, emdong);
    }
}
