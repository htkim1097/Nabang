package com.htkim.Nabang.dto;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
public class StoreApiDto {
    private Double Latitude;
    private Double Longitude;
    private Integer radius;
}
