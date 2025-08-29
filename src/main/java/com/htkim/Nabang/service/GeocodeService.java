package com.htkim.Nabang.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Service
public class GeocodeService {
    @Autowired
    private ApiProperties apiProperties;

    private final RestTemplate restTemplate;

    public GeocodeService(RestTemplateBuilder builder) {
        restTemplate = builder.build();
    }

    public ResponseEntity<?> getAddressToGeocode(String address) {

        String url = "https://maps.apigw.ntruss.com/map-geocode/v2/geocode?query=" + address;

        log.info("[url] : " + url);

        HttpHeaders headers = new HttpHeaders();
        headers.set("x-ncp-apigw-api-key-id", apiProperties.getNaverMapApiId());
        headers.set("x-ncp-apigw-api-key", apiProperties.getNaverMapApiKey());
        headers.set("accept", "application/json");
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        log.info("[geocode response] : " + response.getBody());

        return ResponseEntity.ok(response.getBody());
    }

    public ResponseEntity<?> getReverseGeocode(String coord) {
        String url = String.format("https://maps.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=%s&output=json", coord);

        log.info("[geocode response] : " + url);

        String apiId = apiProperties.getNaverMapApiId();
        String apiKey = apiProperties.getNaverMapApiKey();

        HttpHeaders headers = new HttpHeaders();
        headers.set("x-ncp-apigw-api-key-id", apiId);
        headers.set("x-ncp-apigw-api-key", apiKey);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        log.info("[reverse geocode response] : " + response.getBody());
        return ResponseEntity.ok(response.getBody());
    }
}
