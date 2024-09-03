package com.example.service.diary;

import java.io.IOException;
import java.util.Arrays;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

@Service
public class EmbeddingService {

	private final RestTemplate restTemplate = new RestTemplate();
	private final ObjectMapper objectMapper = new ObjectMapper();
	private final String API_URL = "https://api-inference.huggingface.co/models/bespin-global/klue-sroberta-base-continue-learning-by-mnr";
	private final String API_KEY = "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"; // 여기에 발급받은 API Key를 입력하세요

	public JsonNode getEmbeddings(String[] sentences) throws InterruptedException {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.set("Authorization", "Bearer " + API_KEY);

		ObjectNode requestPayload = objectMapper.createObjectNode();
		requestPayload.putArray("inputs")
				.addAll(Arrays.stream(sentences).map(requestPayload::textNode).collect(Collectors.toList()));

		HttpEntity<String> request = new HttpEntity<>(requestPayload.toString(), headers);

		int retries = 5;
		long delay = 20; // seconds

		for (int attempt = 0; attempt < retries; attempt++) {
			ResponseEntity<String> response = restTemplate.exchange(API_URL, HttpMethod.POST, request, String.class);
			if (response.getStatusCode() == HttpStatus.SERVICE_UNAVAILABLE) {
				// Model is loading, wait and retry
				System.out.println("Model is loading. Attempt " + (attempt + 1) + "/" + retries + ". Waiting for "
						+ delay + " seconds...");
				TimeUnit.SECONDS.sleep(delay);
				continue;
			} else if (response.getStatusCode() == HttpStatus.BAD_REQUEST) {
				// Bad request, check response for details
				throw new IllegalArgumentException("Bad request: " + response.getBody());
			}

			try {
				return objectMapper.readTree(response.getBody());
			} catch (IOException e) {
				throw new RuntimeException("Failed to parse JSON response", e);
			}
		}

		// Final attempt or error after retries
		throw new RuntimeException("Failed to get embeddings after " + retries + " attempts.");
	}

	private double[] extractEmbeddings(JsonNode responseBody) {
		// Extract embeddings from the JSON response
		// Adjust based on the actual response structure
		// Example for handling an array of embeddings
		JsonNode embeddingsNode = responseBody.get("embeddings"); // Adjust key if needed
		if (embeddingsNode.isArray()) {
			return StreamSupport.stream(embeddingsNode.spliterator(), false).mapToDouble(JsonNode::asDouble).toArray();
		}
		return new double[0]; // Adjust according to the actual structure
	}
}
