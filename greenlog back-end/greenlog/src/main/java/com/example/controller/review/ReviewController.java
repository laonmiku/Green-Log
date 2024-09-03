package com.example.controller.review;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.review.ReviewDAO;
import com.example.domain.QueryVO;
import com.example.domain.ReviewVO;
import com.example.service.review.ReviewService;

@RestController
@RequestMapping("/review")
public class ReviewController {
	
		@Autowired
		ReviewDAO rdao;
		
		@Autowired
		ReviewService rservice;
		
		@PostMapping("/insert")
		public void insert(@RequestBody ReviewVO vo) {
				rdao.insert(vo);
		}
		
		@GetMapping("/list/{review_mall_key}")
		public List<HashMap<String, Object>> reviewList(@PathVariable("review_mall_key") int review_mall_key, QueryVO vo) {
				return rdao.reviewList(review_mall_key,vo);
		}
		
		@GetMapping("/read/{review_key}")
		public HashMap<String, Object> reviewRead(@PathVariable("review_key") int review_key) {
				return rdao.reviewRead(review_key);
		}
		
		@GetMapping("/plist/{review_mall_key}")
		public HashMap<String, Object> plist(@PathVariable("review_mall_key") int review_mall_key, QueryVO vo) {
				return rservice.plist(review_mall_key, vo);
		}
		
		@PostMapping("/delete/{review_key}")
		public void delete(@PathVariable("review_key") int review_key) {
				rdao.delete(review_key);
		}
		
		@PostMapping("/update")
		public void update(@RequestBody ReviewVO vo) {
				rservice.update(vo);
		}
		
		@PostMapping("/update/lock")
		public void updateLock(@RequestBody ReviewVO vo) {
				rservice.updateLock(vo);
		}
		
}
