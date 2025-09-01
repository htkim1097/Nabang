package com.htkim.Nabang.controller;

import com.htkim.Nabang.entity.Room;
import com.htkim.Nabang.entity.RoomImage;
import com.htkim.Nabang.service.RoomService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.*;

@Slf4j
@Controller
public class RoomController {

    @Autowired
    private RoomService roomService;

    @GetMapping("/room/roomList")
    public String roomList() {
        return "room/list";
    }

//    @GetMapping("/room/roomList")
//    public String roomList(Model model) {
//        List<Room> rooms = roomService.index();
//
//        List<Map<String, Object>> items = new ArrayList<>();
//
//        for (int i = 0; i < rooms.size(); i++) {
//
//            Room r = rooms.get(i);
//
//            String fullAddress = r.getSido() + " " + r.getSigungu() + " " + r.getEmdong() + " " + r.getDetailAddress();
//
//            Map<String, Object> item = new HashMap<>();
//            item.put("roomId", r.getRoomId());
//            item.put("fullAddress", fullAddress);
//            item.put("detailAddress", r.getDetailAddress());
//            item.put("latitude", r.getLatitude());
//            item.put("longitude", r.getLongitude());
//            item.put("sido", r.getSido());
//            item.put("sigungu", r.getSigungu());
//            item.put("emdong", r.getEmdong());
//            item.put("deposit", r.getDeposit());
//            item.put("monthlyRent", r.getMonthlyRent());
//            item.put("securityScore", r.getSecurityScore());
//            item.put("disasterSaftyScore", r.getDisasterSaftyScore());
//            item.put("storeScore", r.getStoreScore());
//            item.put("noiseSaftyScore", r.getNoiseSaftyScore());
//            item.put("roomType", r.getRoomType());
//            item.put("dealType", r.getDealType());
//            item.put("roomSize", r.getRoomSize());
//            item.put("floor", r.getFloor());
//            item.put("isElevator", r.isElevator());
//            item.put("isParking", r.isParking());
//            item.put("hasOption", r.isHasOption());
//            item.put("dealStatus", r.getDealStatus());
//
//            List<RoomImage> imgs = roomService.getImages(r.getRoomId());
//            if (!imgs.isEmpty() || imgs.size() > 0) {
//                item.put("mainImage", imgs.get(0));
//                item.put("roomImages", imgs);
//            }
//
//            items.add(item);
//        }
//
//        model.addAttribute("properties", items);
//
//        return "room/list";
//    }
}
