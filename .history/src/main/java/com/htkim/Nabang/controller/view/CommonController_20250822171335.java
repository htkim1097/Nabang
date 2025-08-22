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
