package com.htkim.Nabang.api;

import com.htkim.Nabang.service.ApiProperties;
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
    @Autowired
    private ApiProperties apiProperties;

    @GetMapping("/layerData")
    public ResponseEntity<String> getLayerData() {
        return openApiService.getLayerData();
    }

    // security facility
    @GetMapping("/securityFacility")
    public ResponseEntity<String> getSecurityFacility() {
        return openApiService.getSecurityFacility();
    }

    @GetMapping("/safemap-key")
    public ResponseEntity<String> getSafemapKey() {
        return ResponseEntity.ok(apiProperties.getSafeMapApiKey());
    }

    @GetMapping("/store-key")
    public ResponseEntity<String> getStoreKey() {
        return ResponseEntity.ok(apiProperties.getStoreEnKey());
    }


}