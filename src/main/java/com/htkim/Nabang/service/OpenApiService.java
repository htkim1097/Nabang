package com.htkim.Nabang.service;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

@Slf4j
@Service
public class OpenApiService {

    @Autowired
    private ApiProperties apiProperties;

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

    public ResponseEntity<String> getSecurityFacility() {
        try{
            int pageNo = 1;
            int numOfRows = 10;
            String type = "json";  // xml, json

            StringBuilder sb = new StringBuilder("http://safemap.go.kr/openApiService/data/getSecurityFacilityData.do");  /*URL*/
            sb.append("?" + URLEncoder.encode("apikey", "UTF-8") + "=" + apiProperties.getSafeMapApiKey()); /*Service Key*/
            sb.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode(String.valueOf(pageNo), "UTF-8")); /*페이지번호*/
            sb.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode(String.valueOf(numOfRows), "UTF-8")); /*한 페이지 결과 수*/
            sb.append("&" + URLEncoder.encode("type","UTF-8") + "=" + URLEncoder.encode(type, "UTF-8")); /*xml(기본값), JSON*/

            log.info(sb.toString());

            URL url = new URL(sb.toString());
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");

            int responseCode = con.getResponseCode();

            try (BufferedReader br = new BufferedReader(
                    new InputStreamReader(responseCode == 200 ? con.getInputStream() : con.getErrorStream(), "UTF-8"))) {

                StringBuilder result = new StringBuilder();
                String line;
                while ((line = br.readLine()) != null) {
                    result.append(line);
                }


                log.info(result.toString());


                return ResponseEntity.status(responseCode).body(result.toString());
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("API 요청 실패: " + e.getMessage());
        }
    }
}
