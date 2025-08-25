package com.htkim.Nabang.service;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Slf4j
@Service
public class OpenApiService {

    @Autowired
    private final ApiProperties apiProperties;

    private final RestTemplate restTemplate;

    public OpenApiService(RestTemplateBuilder builder) {
        this.restTemplate = builder.build();
    }

    public ResponseEntity<String> getLayerData() {
        String serverUrl = "http://www.safemap.go.kr/openApiService/wms/getLayerData.do";

        String layerName = "A2SM_FLUDMARKS";
        String styles = "A2SM_FludMarks";

        // WMS API 호출 URL 구성
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(serverUrl)
                .queryParam("apikey", apiProperties.getSafeMapApiKey())
                .queryParam("layer", layerName)
                .queryParam("style", styles);

        // 서버에서 WMS API 호출 (XML, JSON 등 그대로 반환받음)
        ResponseEntity<String> response = restTemplate.getForEntity(uriBuilder.toUriString(), String.class);

        log.info(response.getBody());

        return ResponseEntity.status(response.getStatusCode())
                .contentType(response.getHeaders().getContentType())
                .body(response.getBody());
    }

}
