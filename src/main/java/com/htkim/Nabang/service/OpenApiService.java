package com.htkim.Nabang.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.htkim.Nabang.dto.StoreApiDto;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
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

    public ResponseEntity<byte[]> getLayerData(String layer, String style) {

        String serverUrl = "http://www.safemap.go.kr/openApiService/wms/getLayerData.do";
        String apiKey = apiProperties.getSafeMapApiKey();
        String layerName = layer;
        String styles = style;

        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(serverUrl)
                .queryParam("apikey", apiKey)
                .queryParam("layer", layerName)
                .queryParam("style", styles);


        ResponseEntity<byte[]> response = restTemplate.exchange(
                uriBuilder.toUriString(),
                HttpMethod.GET,
                null,
                byte[].class);

        System.out.println(response.getBody());

        HttpHeaders localHeaders = new HttpHeaders();
        localHeaders.setContentType(response.getHeaders().getContentType());

        // 중요: WMS는 이미지(binary) 데이터 반환 (JSON 아님)
        return new ResponseEntity<>(response.getBody(), localHeaders, response.getStatusCode());
    }

    public Integer getStore(StoreApiDto params) {
//        try {
//            double cx = params.getLatitude();
//            double cy = params.getLongitude();
//
//            String url = String.format("%s?serviceKey=%s&pageNo=%d&numOfRows=%d&radius=%d&cx=%s&cy=%s&type=%s",
//                    "http://apis.data.go.kr/B553077/api/open/sdsc2/storeListInRadius",
//                    apiProperties.getStoreDeKey(),
//                    1,
//                    1000,
//                    params.getRadius(),
//                    cx,
//                    cy,
//                    "json");
//
//            String responseStr = restTemplate.getForObject(url, String.class);
//
//            JsonNode rootNode = objectMapper.readTree(responseStr);
//
//            // JSON 구조에 따라 경로 수정 필요
//            int totalCount = rootNode.path("body").path("totalCount").asInt(-1);
//            System.out.println("상가 리스트 개수: " + totalCount);
//
//            return totalCount;
//        }
//        catch (Exception e) {
//            System.err.println("API 호출 오류: " + e.getMessage());
//            return -1;
//        }

        return null;
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
