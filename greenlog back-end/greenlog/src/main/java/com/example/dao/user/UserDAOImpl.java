package com.example.dao.user;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.QueryVO;
import com.example.domain.UserVO;

@Repository
public class UserDAOImpl implements UserDAO {

	@Autowired
	SqlSession session;
	String namespace = "com.example.mapper.UserMapper";

	@Override
	public List<HashMap<String, Object>> adminList(QueryVO vo) {
		return session.selectList(namespace + ".adminList", vo);
	}

	@Override
	public void insert(UserVO vo) {
		session.insert(namespace + ".insert", vo);
	}

	@Override
	public UserVO read(String uid) {
		return session.selectOne(namespace + ".read", uid);
	}

	@Override
	public void delete(int user_key) {
		session.delete(namespace + ".delete", user_key);

	}

	@Override
	public void update(UserVO vo) {
		session.update(namespace + ".adminUpdate", vo);

	}

	@Override
	public void imgUpdate(UserVO vo) {
		session.update(namespace + ".imgUpdate", vo);
	}

	@Override
	public void updatePerson(UserVO vo) {
		session.update(namespace + ".personUpdate", vo);

	}

	@Override
	public List<HashMap<String, Object>> mypage2(String uid) {
		return session.selectList(namespace + ".mypage2", uid);
	}

	@Override
	public UserVO findid(UserVO vo) {
		return session.selectOne(namespace + ".findid", vo);
	}

	@Override
	public UserVO findpass(UserVO vo) {
		return session.selectOne(namespace + ".findpass", vo);
	}

	@Override
	public void updatePass(UserVO vo) {
		session.update(namespace + ".updatePass", vo);
	}

	@Override
	public int total(QueryVO vo) {
		return session.selectOne(namespace + ".adminListTotal", vo);
	}

	@Override
	public HashMap<String, Object> mypage(String uid) {
		return session.selectOne(namespace + ".mypage", uid);
	}

	@Override
	public List<HashMap<String, Object>> followingDiaryList(String uid, QueryVO vo) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("uid", uid);
		map.put("size", vo.getSize());
		map.put("start", vo.getStart());
		return session.selectList(namespace + ".followingDiaryList", map);
	}

	@Override
	public List<HashMap<String, Object>> AdminDiaryList(String uid, QueryVO vo) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("uid", uid);
		map.put("size", vo.getSize());
		map.put("start", vo.getStart());
		return session.selectList(namespace + ".AdminDiaryList", map);
	}

	@Override
	public HashMap<String, Object> chknickname(String user_nickname) {
		return session.selectOne(namespace + ".chknickname", user_nickname);
	}
}
