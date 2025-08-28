package com.htkim.Nabang.dto;

import com.htkim.Nabang.entity.PriceInfo;
import lombok.AllArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@ToString
public class PriceInfoDto {

    private Long price_id;
    private int deposit;
    private int monthlyRent;

    public PriceInfo toEntity() {
        return new PriceInfo(price_id, deposit, monthlyRent);
    }
}
