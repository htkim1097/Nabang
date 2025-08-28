package com.htkim.Nabang.dto;

import com.htkim.Nabang.entity.LivingIndex;
import lombok.AllArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@ToString
public class LivingIndexDto {

    private Long livingIndexId;
    private int securityScore;
    private int disasterSaftyScore;
    private int storeScore;
    private int noiseSaftyScore;

    public LivingIndex toEntity() {
        return new LivingIndex(livingIndexId, securityScore, disasterSaftyScore, storeScore, noiseSaftyScore);
    }
}
