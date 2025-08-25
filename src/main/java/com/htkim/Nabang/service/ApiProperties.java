package com.htkim.Nabang.service;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.stereotype.Component;

@Component
public class ApiProperties {
    private final String safeMapApiKey;
    private final String storeDeKey;
    private final String storeEnKey;
    private final String naverMapApiId;
    private final String naverMapApiKey;


    public ApiProperties() {
        Dotenv dotenv = Dotenv.configure().directory("./src").load();

        safeMapApiKey = dotenv.get("SAFEMAP_KEY");
        storeDeKey = dotenv.get("STORE_DEKEY");
        storeEnKey = dotenv.get("STORE_ENKEY");
        naverMapApiId = dotenv.get("CLIENT_ID");
        naverMapApiKey = dotenv.get("CLIENT_SECRET");
    }

    public String getSafeMapApiKey() {
        return safeMapApiKey;
    }

    public String getStoreDeKey() {
        return storeDeKey;
    }

    public String getStoreEnKey() {
        return storeEnKey;
    }

    public String getNaverMapApiId() {
        return naverMapApiId;
    }

    public String getNaverMapApiKey() {
        return naverMapApiKey;
    }
}
