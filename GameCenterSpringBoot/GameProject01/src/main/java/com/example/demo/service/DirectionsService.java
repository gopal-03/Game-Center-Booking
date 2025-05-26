package com.example.demo.service;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

import org.springframework.stereotype.Service;

@Service
public class DirectionsService {

    private static final String API_KEY = "AIzaSyCE_0piiLsDZUSgOxpEUPOdg8P3a5R_S3g";

    public String getDirections(String origin, String destination) {
        String url = String.format(
            "https://maps.googleapis.com/maps/api/directions/json?origin=%s&destination=%s&key=%s",
            origin, destination, API_KEY
        );

        OkHttpClient client = new OkHttpClient();

        Request request = new Request.Builder()
            .url(url)
            .build();

        try (Response response = client.newCall(request).execute()) {
            if (response.isSuccessful() && response.body() != null) {
                return response.body().string();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }
}
