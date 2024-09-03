package com.example.dao.review;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.QueryVO;
import com.example.domain.ReviewVO;

@Repository
public class ReviewDAOImpl implements ReviewDAO {

		@Autowired
		SqlSession session;
		String namespace="com.example.mapper.ReviewMapper";
	
		@Override
		public void insert(ReviewVO vo) {
				session.insert(namespace + ".insert", vo);			
		}

		@Override
		public void delete(int review_key) {
				session.delete(namespace + ".delete", review_key);
		}

		@Override
		public void update(ReviewVO vo) {
				session.update(namespace + ".update", vo);
		}

		@Override
		public void updateLock(ReviewVO vo) {
				session.update(namespace + ".updateLock", vo);
		}



		@Override
		public List<HashMap<String, Object>> reviewList(int review_mall_key, QueryVO vo) {
				HashMap<String, Object> map = new HashMap<String, Object>();
				map.put("review_mall_key", review_mall_key);
				map.put("start", vo.getStart());
				map.put("size", vo.getSize());
				return session.selectList(namespace + ".reviewList", map);
		}

		@Override
		public int total(int review_mall_key) {
				return session.selectOne(namespace + ".total", review_mall_key);
		}

		@Override
		public HashMap<String, Object> reviewRead(int review_key) {
				return session.selectOne(namespace + ".reviewRead", review_key);
		}
		
		

}
