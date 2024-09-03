package com.example.service.review;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.dao.review.ReviewDAO;
import com.example.domain.QueryVO;
import com.example.domain.ReviewVO;

@Service
public class ReviewServiceImpl implements ReviewService {
	
		@Autowired
		ReviewDAO rdao;

		@Transactional
		@Override
		public void update(ReviewVO vo) {
				rdao.update(vo);
		}
	
		@Transactional
		@Override
		public void updateLock(ReviewVO vo) {
				rdao.updateLock(vo);
			
		}
		
		@Transactional
		@Override
		public HashMap<String, Object> plist(int review_mall_key, QueryVO vo) {
			 HashMap<String, Object> map = new  HashMap<>();
			 map.put("documents",  rdao.reviewList(review_mall_key, vo));
			 map.put("total", rdao.total(review_mall_key));
			return map;
		}

	

}
