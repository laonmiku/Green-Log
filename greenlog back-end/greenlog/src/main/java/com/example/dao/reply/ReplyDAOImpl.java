package com.example.dao.reply;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.QueryVO;
import com.example.domain.ReplyLikeVO;
import com.example.domain.ReplyVO;

@Repository
public class ReplyDAOImpl implements ReplyDAO {

	@Autowired
	SqlSession session;
	String namespace = "com.example.mapper.ReplyMapper";

	@Override
	public void insert(ReplyVO vo) {
		session.insert(namespace + ".insert", vo);
	}

	@Override
	public void delete(int reply_key) {
		session.delete(namespace + ".delete", reply_key);

	}

	@Override
	public void update(ReplyVO vo) {
		session.update(namespace + ".update", vo);

	}

	@Override
	public List<HashMap<String, Object>> replyList(int reply_bbs_key, QueryVO vo) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("reply_bbs_key", reply_bbs_key);
		map.put("start", vo.getStart());
		map.put("size", vo.getSize());
		map.put("key", vo.getKey());
		return session.selectList(namespace + ".replyList", map);
	}

	@Override
	public int total(int reply_bbs_key) {
		return session.selectOne(namespace + ".total", reply_bbs_key);
	}

	@Override
	public void updateLock(ReplyVO vo) {
		session.update(namespace + ".updateLock", vo);

	}

	@Override
	public String readReaction(ReplyLikeVO vo) {
		return session.selectOne(namespace + ".readReaction", vo);
	}

	@Override
	public void LikeInsert(ReplyLikeVO vo) {
		session.insert(namespace + ".LikeInsert", vo);

	}

	@Override
	public void HateInsert(ReplyLikeVO vo) {
		session.insert(namespace + ".HateInsert", vo);

	}

	@Override
	public void reactionUpdate(ReplyLikeVO vo) {
		session.update(namespace + ".reactionUpdate", vo);
	}

	@Override
	public void reactionDelete(ReplyLikeVO vo) {
		session.delete(namespace + ".reactionDelete", vo);

	}

	@Override
	public HashMap<String, Object> CountReaction(int reply_key) {
		return session.selectOne(namespace + ".CountReaction", reply_key);
	}

	@Override
	public HashMap<String, Object> replyRead(int reply_key) {
		return session.selectOne(namespace + ".replyRead", reply_key);
	}
}
