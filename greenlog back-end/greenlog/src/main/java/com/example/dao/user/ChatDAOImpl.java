package com.example.dao.user;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.ChatVO;
import com.example.domain.ChatlogVO;
import com.example.domain.QueryVO;

@Repository
public class ChatDAOImpl implements ChatDAO {

	@Autowired
	SqlSession session;
	String namespace = "com.example.mapper.ChatMapper";

	@Override
	public void insertChat(ChatVO vo) {
		session.insert(namespace + ".insertChat", vo);

	}

	@Override
	public List<HashMap<String, Object>> list(QueryVO vo) {
		return session.selectList(namespace + ".list", vo);
	}

	@Override
	public void update(ChatVO vo) {
		session.update(namespace + ".update", vo);
	}

	@Override
	public List<HashMap<String, Object>> alist(QueryVO vo) {
		return session.selectList(namespace + ".alreadylist", vo);
	}

	@Override
	public void save(ChatVO vo) {
		session.update(namespace + ".saveChat", vo);
	}

	@Override
	public void insertChatlog(ChatlogVO vo) {
		session.insert(namespace + ".insertChatlog", vo);

	}

	@Override
	public List<HashMap<String, Object>> listchatLog(int Chat_key) {
		return session.selectList(namespace + ".listchatLog", Chat_key);
	}

	@Override
	public Integer searchChatkey(String uid) {
		return session.selectOne(namespace + ".searchChatkey", uid);
	}

	@Override
	public int listCount() {
		return session.selectOne(namespace + ".listCount");
	}

	@Override
	public List<HashMap<String, Object>> userChatList(String uid) {
		return session.selectList(namespace + ".userChatList", uid);
	}

	@Override
	public int userChatListCount(String uid) {
		return session.selectOne(namespace + ".userChatListCount", uid);
	}

	@Override
	public int alistCount() {
		return session.selectOne(namespace + ".alistCount");
	}

}