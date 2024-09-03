package com.example.service.login;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@Service
public class KakaoService {

	@Value("${spring.security.oauth2.client.registration.kakao.client-id}")
	private String clientId;

	@Value("${spring.security.oauth2.client.registration.kakao.redirect-uri}")
	private String redirectUri;

	@Value("${spring.security.oauth2.client.registration.kakao.client-secret}")
	private String clientSecret;

	private final RestTemplate restTemplate;

	public KakaoService(RestTemplate restTemplate) {
		this.restTemplate = restTemplate;
	}

	public String getAccessToken(String authorizationCode) {
		String url = "https://kauth.kakao.com/oauth/token";

		// URL 인코딩 적용
		String encodedRedirectUri = encode(redirectUri);
		String encodedClientId = encode(clientId);
		String encodedAuthorizationCode = encode(authorizationCode);

		// 요청 파라미터 구성
		String params = "grant_type=authorization_code" + "&client_id=" + encodedClientId + "&redirect_uri="
				+ encodedRedirectUri + "&code=" + encodedAuthorizationCode;

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

		HttpEntity<String> request = new HttpEntity<>(params, headers);

		try {
			ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, request, String.class);
			return response.getBody();
		} catch (HttpClientErrorException e) {
			System.err.println("Error during token request: " + e.getStatusCode() + " " + e.getResponseBodyAsString());
			throw e;
		}
	}

	private String encode(String value) {
		try {
			return URLEncoder.encode(value, StandardCharsets.UTF_8.toString());
		} catch (UnsupportedEncodingException e) {
			throw new RuntimeException("Encoding failed", e);
		}
	}
}
