package com.htkim.Nabang.controller;

import com.htkim.Nabang.entity.Room;
import com.htkim.Nabang.entity.RoomImage;
import com.htkim.Nabang.service.RoomService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Controller
public class RoomController {

    @Autowired
    private RoomService roomService;

    @GetMapping("/room/roomList")
    public String roomList() {
        return "room/list";
    }

}
