package com.example.controller.Seed;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.seed.SeedDAO;
import com.example.domain.QueryVO;
import com.example.domain.SeedVO;
import com.example.domain.TradeVO;
import com.example.service.Trade.SeedService;

@RestController
@RequestMapping("/seed")
public class SeedController {
	@Autowired
	SeedDAO sdao;

	@Autowired
	SeedService service;

	@PostMapping("/insert")
	public void insert(@RequestBody SeedVO vo) {
		sdao.insert(vo);
	}

	@GetMapping("/read/{uid}")
	public SeedVO read(@PathVariable("uid") String uid) {
		return sdao.read(uid);
	}

	@PostMapping("/update")
	public void update(@RequestBody TradeVO vo) {
		sdao.update(vo);
	}

	@GetMapping("/list")
	public HashMap<String, Object> SeedList(QueryVO vo) {
		return service.SeedList(vo);
	}
}
