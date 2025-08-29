package com.htkim.Nabang.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.*;

@Controller
public class RoomController {

    @GetMapping("/room/roomList")
    public String showRoomList(@RequestParam(defaultValue = "1") int page, Model model) {
        List<Map<String, Object>> items = new ArrayList<>();
        for (int i = 1; i <= 5; i++) {
            items.add(Map.of(
                    "id", i,
                    "imgUrl", "/assets/images/room8.webp",
                    "title", "빌라 " + i,
                    "address", "대전광역시 서구 둔산동",
                    "deposit", i*100 + "0만원",
                    "monthly", i*5 + "만원",
                    "summary", "총: 3층, 엘리베이터: 유, 주차공간: 12대"
            ));
        }
        model.addAttribute("properties", items);

        // 페이지네이션 데이터
        int totalPages = 5;
        List<Map<String, Object>> pages = new ArrayList<>();

        for (int i = 1; i <= totalPages; i++) {
            pages.add(Map.of("num", i,
                    "isCurrent", i == page));
        }

        model.addAttribute("pagination", Map.of(
                "hasPrev", page > 1,
                "prev", page - 1,
                "pages", pages,
                "hasNext", page < totalPages,
                "next", page + 1
        ));

        return "/room/list";
    }
}
