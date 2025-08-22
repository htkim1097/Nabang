package com.htkim.Nabang.controller.view;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Map;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
public class CommonController {

    @GetMapping("/")
    public String showHomePage() {

        return "/index";
    }

    @GetMapping("/survey/address")
    public String showAdressSurveyPage() {
        return "/survey/survey-address";
    }

    @GetMapping("/survey/roominfo")
    public String showInfoSurveyPage() {
        return "/survey/survey-roominfo";
    }

    @GetMapping("/survey/roomdetail")
    public String showDetailSurveyPage() {
        return "/survey/survey-roomdetail";
    }

    @GetMapping("/survey/livingindex")
    public String showLivingSurveyPage() {
        return "/survey/survey-livingindex";
    }
    
    
    
    
}
