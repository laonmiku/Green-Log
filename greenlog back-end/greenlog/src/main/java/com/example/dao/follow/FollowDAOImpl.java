package com.example.dao.follow;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.FollowVO;
import com.example.domain.QueryVO;

@Repository
public class FollowDAOImpl implements FollowDAO {
	@Autowired
	SqlSession session;
	String namespace = "com.example.mapper.FollowMapper";

	@Override
	public List<HashMap<String, Object>> followingList(String uid, QueryVO vo) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("uid", uid);
		map.put("start", vo.getStart());
		map.put("size", vo.getSize());
		map.put("key", vo.getKey());
		map.put("word", vo.getWord());
		return session.selectList(namespace + ".followingList", map);
	}

	@Override
	public List<HashMap<String, Object>> followerList(String uid, QueryVO vo) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("uid", uid);
		map.put("start", vo.getStart());
		map.put("size", vo.getSize());
		map.put("key", vo.getKey());
		map.put("word", vo.getWord());
		return session.selectList(namespace + ".followerList", map);

	}

	@Override
	public int followingCount(String uid, QueryVO vo) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("uid", uid);
		map.put("start", vo.getStart());
		map.put("size", vo.getSize());
		map.put("key", vo.getKey());
		map.put("word", vo.getWord());
		return session.selectOne(namespace + ".followingCount", map);
	}

	@Override
	public int followerCount(String uid, QueryVO vo) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("uid", uid);
		map.put("start", vo.getStart());
		map.put("size", vo.getSize());
		map.put("key", vo.getKey());
		map.put("word", vo.getWord());
		return session.selectOne(namespace + ".followerCount", map);
	}

	@Override
	public void addFollow(FollowVO vo) {
		session.update(namespace + ".addFollow", vo);

	}

	@Override
	public void unFollow(FollowVO vo) {
		session.update(namespace + ".unFollow", vo);
	}

	@Override
	public HashMap<String, Object> chkfollow(String uid1, String uid2) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("uid1", uid1);
		map.put("uid2", uid2);
		return session.selectOne(namespace + ".chkfollow", map);
	}

	

}
