package com.example.controller.graph;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.graph.GraphDAO;

@RestController
public class GraphController {
	@Autowired
	GraphDAO dao;
	
	@GetMapping("/graph/diary")
	public List<HashMap<String,Object>> diaryChart() {
		return dao.diaryChart();
	}
	
	
	@GetMapping("/graph/rank")
	public List<HashMap<String,Object>> rank() {
		return dao.rank();
	}
	
	@GetMapping("/graph/mall")
	public List<HashMap<String,Object>> mallChart() {
		return dao.mallChart();
	}
}
