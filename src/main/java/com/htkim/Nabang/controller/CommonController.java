package com.htkim.Nabang.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Slf4j
@Controller
public class CommonController {

    @GetMapping("/")
    public String showHomePage() {
        return "/index";
    }

    @GetMapping("/survey/1")
    public String showAdressSurveyPage() {
        return "/survey/survey-address";
    }

    @GetMapping("/survey/2")
    public String showInfoSurveyPage() {
        return "/survey/survey-roominfo";
    }

    @GetMapping("/survey/3")
    public String showDetailSurveyPage() {
        return "/survey/survey-roomdetail";
    }

    @GetMapping("/survey/4")
    public String showLivingSurveyPage() {
        return "/survey/survey-livingindex";
    }
    
}
