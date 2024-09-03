package com.example.dao.seed;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.QueryVO;
import com.example.domain.SeedVO;
import com.example.domain.TradeVO;

@Repository
public class SeedDAOImpl implements SeedDAO {

	@Autowired
	SqlSession session;
	String namespace = "com.example.mapper.SeedMapper";

	@Override
	public void insert(SeedVO vo) {
		session.insert(namespace + ".insert", vo);
	}

	@Override
	public SeedVO read(String uid) {
		return session.selectOne(namespace + ".read", uid);
	}

	@Override
	public void update(TradeVO vo) {
		session.update(namespace + ".update", vo);
	}

	@Override
	public List<HashMap<String, Object>> list(QueryVO vo) {
		return session.selectList(namespace + ".list", vo);
	}

	@Override
	public int listCount(QueryVO vo) {
		return session.selectOne(namespace + ".listCount", vo);
	}

}
