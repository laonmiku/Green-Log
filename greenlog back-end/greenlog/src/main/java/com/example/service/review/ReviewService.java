package com.example.service.review;

import java.util.HashMap;
import java.util.List;

import com.example.domain.QueryVO;
import com.example.domain.ReviewVO;

public interface ReviewService {
		public void update (ReviewVO vo);
		public void updateLock (ReviewVO vo);
		public HashMap<String, Object> plist(int review_mall_key, QueryVO vo);
		

}
