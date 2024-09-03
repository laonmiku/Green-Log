package com.example.dao.bbs;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.BBSPhotoVO;
import com.example.domain.BBSVO;
import com.example.domain.QueryVO;

@Repository
public class BBSDAOImpl implements BBSDAO {

	@Autowired
	SqlSession session;

	private static final String NAMESPACE = "com.example.mapper.BBSMapper";

	@Override
	public List<HashMap<String, Object>> list(QueryVO vo) {
		return session.selectList(NAMESPACE + ".list", vo);
	}

	@Override
	public void delete(int bbs_key) {
		session.delete(NAMESPACE + ".delete", bbs_key);
	}

	@Override
	public void insert(BBSVO vo) {
		session.insert(NAMESPACE + ".insert", vo);
	}

	@Override
	public HashMap<String, Object> read(int bbs_key) {
		return session.selectOne(NAMESPACE + ".read", bbs_key);
	}

	@Override
	public void update(BBSVO vo) {
		session.update(NAMESPACE + ".update", vo);

	}

	@Override
	public int total(QueryVO vo) {
		return session.selectOne(NAMESPACE + ".total", vo);
	}

	@Override
	public void updateViewcnt(int bbs_key) {
		session.update(NAMESPACE + ".updateViewcnt", bbs_key);

	}

	@Override
	public List<HashMap<String, Object>> topList() {
		return session.selectList(NAMESPACE + ".topList"); // 추가
	}

	@Override
	public void insertPhoto(BBSPhotoVO vo) {
		session.insert(NAMESPACE + ".insertPhoto", vo);

	}

	@Override
	public void deleteAttach(int bbsPhoto_key) {
		session.delete(NAMESPACE + ".deleteAttach", bbsPhoto_key);

	}

	@Override
	public int getLastInsertId() {
		return session.selectOne(NAMESPACE + ".getLastInsertId");
	}

	@Override
	public List<HashMap<String, Object>> listMallPhoto(String bbs_key) {
		return session.selectList(NAMESPACE + ".listMallPhoto", bbs_key);
	}

	@Override
	public void insertMainPhoto(int bbs_key, String bbs_photo) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("bbs_key", bbs_key);
		map.put("bbs_photo", bbs_photo);
		session.update(NAMESPACE + ".insertMainPhoto", map);
	}

	@Override
	public String getMainPhoto(int bbs_key) {
		return session.selectOne(NAMESPACE + ".getMainPhoto", bbs_key);
	}

	@Override
	public void updateMainPhoto(BBSPhotoVO vo) {
		session.update(NAMESPACE + ".updateMainPhoto", vo);
	}

	@Override
	public void updatePhoto(BBSPhotoVO vo) {
		session.update(NAMESPACE + ".updatePhoto", vo);
	}

	@Override
	public List<HashMap<String, Object>> noticeList() {
		return session.selectList(NAMESPACE + ".noticeList");
	}

}
