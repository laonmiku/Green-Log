package com.example.controller.common;

import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api")
public class APIController {
	@GetMapping("/carspot")
	public ResponseEntity<String> getFileData() {
		try {
			// 파일 경로
			ClassPathResource resource = new ClassPathResource("CarSpot.json");
			InputStream inputStream = resource.getInputStream();

			// 파일의 내용을 문자열로 읽기
			byte[] bdata = FileCopyUtils.copyToByteArray(inputStream);
			String data = new String(bdata, StandardCharsets.UTF_8);

			return ResponseEntity.ok(data);
		} catch (IOException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일을 읽는 중 오류가 발생했습니다.");
		}
	}

	private final String servicekey = "13Rf4cCUQibYUM9pzyU25ZAwb6%2FIBInaC6Na3iLphuYUVoGZM%2BygMZsGsqpkKTEGgcbbu4wEVgj%2F2ZvqibYE6Q%3D%3D";
	private final String returnType = "json";
	private final String numOfRows = "100";
	private final String pageNo = "1";
	private final String sidoName = "서울";
	private final String ver = "1.0";

	@GetMapping("/air")
	public ResponseEntity<String> fetchData() {
		try {
			String encodedSidoName = URLEncoder.encode(sidoName, StandardCharsets.UTF_8.toString());
			URLDecoder.decode(servicekey, "UTF-8");
			String url = "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty";
			url += "?serviceKey=" + servicekey;
			url += "&returnType=" + returnType;
			url += "&numOfRows=" + numOfRows;
			url += "&pageNo=" + pageNo;
			url += "&sidoName=" + encodedSidoName;
			url += "&ver=" + ver;
			URI uri = new URI(url);
			RestTemplate restTemplate = new RestTemplate();
			ResponseEntity<String> responseEntity = restTemplate.exchange(uri, HttpMethod.GET, null, String.class);

			if (responseEntity.getStatusCode().is2xxSuccessful()) {
				return ResponseEntity.ok(responseEntity.getBody());
			} else {
				return ResponseEntity.status(responseEntity.getStatusCode())
						.body("Failed to get data. Status code: " + responseEntity.getStatusCodeValue());
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Failed to fetch data: " + e.getMessage());
		}
	}

	@GetMapping("/o3")
	public ResponseEntity<String> o3Data(@RequestParam("inqBginDt") String inqBginDt,
			@RequestParam("inqEndDt") String inqEndDt, @RequestParam("msrstnName") String msrstnName) {
		try {
			String encodedmsrstnName = URLEncoder.encode(msrstnName, StandardCharsets.UTF_8.toString());
			URLDecoder.decode(servicekey, "UTF-8");
			String url = "http://apis.data.go.kr/B552584/ArpltnStatsSvc/getMsrstnAcctoRDyrg";
			url += "?serviceKey=" + servicekey;
			url += "&returnType=" + returnType;
			url += "&numOfRows=" + numOfRows;
			url += "&pageNo=" + pageNo;
			url += "&inqBginDt=" + inqBginDt;
			url += "&inqEndDt=" + inqEndDt;
			url += "&msrstnName=" + encodedmsrstnName;
			URI uri = new URI(url);
			RestTemplate restTemplate = new RestTemplate();
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_JSON);
			HttpEntity<String> entity = new HttpEntity<>(headers);

			ResponseEntity<String> responseEntity = restTemplate.exchange(uri, HttpMethod.GET, entity, String.class);

			if (responseEntity.getStatusCode().is2xxSuccessful()) {
				return ResponseEntity.ok(responseEntity.getBody());
			} else {
				return ResponseEntity.status(responseEntity.getStatusCode())
						.body("Failed to get data. Status code: " + responseEntity.getStatusCodeValue());
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Failed to fetch data: " + e.getMessage());
		}
	}
}