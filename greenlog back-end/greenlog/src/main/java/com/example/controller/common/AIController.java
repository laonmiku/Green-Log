package com.example.controller.common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.service.diary.EmbeddingService;
import com.fasterxml.jackson.databind.JsonNode;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "http://localhost:3000")
public class AIController {

	@Autowired
	EmbeddingService service;

	@PostMapping("/embeddings")
	public JsonNode getEmbeddings(@RequestBody String[] sentences) throws InterruptedException {
		return service.getEmbeddings(sentences);
	}
}