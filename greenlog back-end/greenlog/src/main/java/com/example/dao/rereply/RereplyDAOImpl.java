package com.example.dao.rereply;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.QueryVO;
import com.example.domain.RereplyLikeVO;
import com.example.domain.RereplyVO;

@Repository
public class RereplyDAOImpl implements RereplyDAO{
	
	@Autowired
	SqlSession session;
	String namespace="com.example.mapper.RereplyMapper";

	@Override
	public void insert(RereplyVO vo) {
			session.insert(namespace + ".insert", vo);
	}

	@Override
	public List<HashMap<String, Object>> rereplyList(int reply_key) {
			HashMap<String, Object> map = new HashMap<String, Object>();
			map.put("reply_key", reply_key);
			return session.selectList(namespace + ".rereplyList", map);
	}

	@Override
	public void delete(int rereply_key) {
			session.delete(namespace + ".delete", rereply_key);
	}

	@Override
	public void update(RereplyVO vo) {
			session.update(namespace + ".update", vo);
	}

	@Override
	public void updatereLock(RereplyVO vo) {
		session.update(namespace + ".updatereLock", vo);
		
	}

	@Override
	public int total(int reply_key) {
		return session.selectOne(namespace + ".total", reply_key);
	}

	@Override
	public String readReaction(RereplyLikeVO vo) {
		return session.selectOne(namespace + ".readReaction", vo);
	}

	@Override
	public void LikeInsert(RereplyLikeVO vo) {
		session.insert(namespace + ".LikeInsert", vo);
	}

	@Override
	public void HateInsert(RereplyLikeVO vo) {
		session.insert(namespace + ".HateInsert", vo);
		
	}

	@Override
	public void reactionUpdate(RereplyLikeVO vo) {
		session.update(namespace + ".reactionUpdate", vo);
		
	}

	@Override
	public void reactionDelete(RereplyLikeVO vo) {
		session.delete(namespace + ".reactionDelete", vo);
		
	}

	@Override
	public HashMap<String, Object> CountReaction(int rereply_key) {
		return session.selectOne(namespace + ".CountReaction", rereply_key);
	}

	@Override
	public HashMap<String, Object> rereplyRead(int rereply_key) {
		return session.selectOne(namespace + ".rereplyRead", rereply_key);
	}
	

}
