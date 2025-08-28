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
    private Long room_id;
    private Long location_id;
    private Long price_id;
    private Long living_index_id;
    private RoomType room_type;
    private DealType deal_type;
    private int room_size;
    private int floor;
    private boolean is_elevator;
    private boolean is_parking;
    private boolean has_option;
    private DealStatus deal_status;

    public Room toEntity() {
        return new Room(room_id, location_id, price_id, living_index_id, room_type.getCode(), deal_type.getCode(), room_size, floor, is_elevator, is_parking, has_option, deal_status.getCode());
    }
}
