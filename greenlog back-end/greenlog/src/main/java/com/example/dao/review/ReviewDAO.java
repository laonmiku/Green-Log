package com.example.dao.review;

import java.util.HashMap;
import java.util.List;

import com.example.domain.QueryVO;
import com.example.domain.ReviewVO;

public interface ReviewDAO {
	
	public void insert (ReviewVO vo);
	public List<HashMap<String, Object>> reviewList(int review_mall_key, QueryVO vo);
	public void delete (int review_key);
	public void update (ReviewVO vo);
	public void updateLock (ReviewVO vo);
	public int total(int review_mall_key);
	public HashMap<String, Object> reviewRead(int review_key);

}
