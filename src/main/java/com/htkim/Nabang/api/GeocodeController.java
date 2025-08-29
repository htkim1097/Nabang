package com.htkim.Nabang.api;

import com.htkim.Nabang.service.GeocodeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/geocode")
public class GeocodeController {

    @Autowired
    private GeocodeService geocodeService;

    @GetMapping
    public ResponseEntity<?> geocode(@RequestParam String address) {
        log.info("[address] : " + address);
        return geocodeService.getAddressToGeocode(address);
    }

    @GetMapping("/reverse")
    public ResponseEntity<?> getReverseGeocode(@RequestParam String coord) {
        return geocodeService.getReverseGeocode(coord);
    }
}
