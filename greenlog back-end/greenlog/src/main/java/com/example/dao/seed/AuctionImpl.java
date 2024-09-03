package com.example.dao.seed;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.AuctionVO;
import com.example.domain.QueryVO;

@Repository
public class AuctionImpl implements AuctionDAO {

	@Autowired
	SqlSession session;
	String namespace = "com.example.mapper.AuctionMapper";

	@Override
	public void insert(AuctionVO vo) {
		session.insert(namespace + ".insert", vo);
	}

	@Override
	public List<HashMap<String, Object>> userAList(String uid, QueryVO vo) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("uid", uid);
		map.put("start", vo.getStart());
		map.put("size", vo.getSize());
		map.put("word", vo.getWord());
		map.put("key", vo.getKey());
		map.put("date1", vo.getDate1());
		map.put("date2", vo.getDate2());
		return session.selectList(namespace + ".userAList", map);
	}

	@Override
	public int total(String uid, QueryVO vo) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("uid", uid);
		map.put("word", vo.getWord());
		map.put("key", vo.getKey());
		map.put("date1", vo.getDate1());
		map.put("date2", vo.getDate2());
		return session.selectOne(namespace + ".total", map);
	}

	@Override
	public List<HashMap<String, Object>> adminAList(QueryVO vo) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("start", vo.getStart());
		map.put("size", vo.getSize());
		map.put("word", vo.getWord());
		map.put("key", vo.getKey());
		map.put("date1", vo.getDate1());
		map.put("date2", vo.getDate2());
		return session.selectList(namespace + ".adminAList", map);
	}

	@Override
	public int admintotal(QueryVO vo) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("start", vo.getStart());
		map.put("size", vo.getSize());
		map.put("word", vo.getWord());
		map.put("key", vo.getKey());
		map.put("date1", vo.getDate1());
		map.put("date2", vo.getDate2());
		return session.selectOne(namespace + ".admintotal", map);
	}

	@Override
	public void updateState1(int auction_key) {
		session.update(namespace + ".stateUpdate1", auction_key);

	}

	@Override
	public void updateState0(int auction_key) {
		session.update(namespace + ".stateUpdate0", auction_key);
		
	}
}
