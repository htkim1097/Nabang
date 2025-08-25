package com.htkim.Nabang.api;

import com.htkim.Nabang.service.OpenApiService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/data")
public class ApiController {

    @Autowired
    private OpenApiService openApiService;

    @GetMapping("/layerData")
    public ResponseEntity<String> getLayerData() {
        return openApiService.getLayerData();
    }
}