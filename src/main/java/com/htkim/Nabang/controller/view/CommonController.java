package com.htkim.Nabang.controller.view;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Map;

@Controller
public class CommonController {

    @GetMapping("/")
    public String showHomePage() {

        return "/survey/survey-address";
    }
}
