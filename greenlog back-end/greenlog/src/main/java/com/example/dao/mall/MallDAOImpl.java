package com.example.dao.mall;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.MallPhotoVO;
import com.example.domain.MallVO;
import com.example.domain.Query2VO;
import com.example.domain.QueryVO;

@Repository
public class MallDAOImpl implements MallDAO {
	@Autowired
	SqlSession session;
	String namespace = "com.example.mapper.MallMapper";

	@Override
	public int buyListTotal(String review_writer,QueryVO vo) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("review_writer",review_writer);
		map.put("vo",vo);
		return session.selectOne(namespace+".buyListTotal",map);
	}

	@Override
	public List<HashMap<String, Object>> buyList(String review_writer,QueryVO vo) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("review_writer",review_writer);
		map.put("vo", vo);
		return session.selectList(namespace+".buyList", map);
	}
	
	@Override
	public int reviewListTotal(String review_writer,QueryVO vo) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("review_writer",review_writer);
		map.put("vo",vo);
		return session.selectOne(namespace+".reviewListTotal",map);
	}

	@Override
	public List<HashMap<String, Object>> reviewList(String review_writer,QueryVO vo) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("review_writer",review_writer);
		map.put("vo", vo);
		return session.selectList(namespace+".reviewList", map);
	}
	
	@Override
	public List<HashMap<String, Object>> reviewCount() {
		return session.selectList(namespace+".reviewCount");
	}
	
	@Override
	public HashMap<String, Object> reviewCount2(int mall_key) {
		return session.selectOne(namespace+".reviewCount2", mall_key);
	}

	
	@Override
	public List<HashMap<String, Object>> list(Query2VO vo) {
		return session.selectList(namespace + ".list", vo);
	}
	
	@Override
	public List<HashMap<String, Object>> sellerList(String mall_seller,QueryVO vo) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("mall_seller", mall_seller);
		map.put("vo", vo);
		return session.selectList(namespace + ".sellerList",map);
	}
	
	@Override
	public int sellerListTotal(String mall_seller) {
		return session.selectOne(namespace+".sellerListTotal",mall_seller);
	}


	@Override
	public void insertInfo(MallVO vo) {
		session.insert(namespace + ".insertInfo", vo);
	}

	@Override
	public HashMap<String, Object> read(int mall_key) {
		return session.selectOne(namespace + ".read", mall_key);
	}

	@Override
	public void update(MallVO vo) {
		session.update(namespace + ".update", vo);
	}
	
	@Override
	public void updateEndDate(int mall_key) {
		session.delete(namespace + ".updateEndDate", mall_key);
	}

	@Override
	public void delete(int mall_key) {
		session.delete(namespace + ".delete", mall_key);
	}

	@Override
	public int total(Query2VO vo) {
		return session.selectOne(namespace + ".total", vo);
	}

	@Override
	public void insertPhoto(MallPhotoVO vo) {
		session.insert(namespace + ".insertPhoto", vo);

	}

	@Override
	public void deleteAttach(int mallPhoto_key) {
		session.delete(namespace + ".deleteAttach", mallPhoto_key);

	}

	@Override
	public int getLastInsertId() {
		// TODO Auto-generated method stub
		return session.selectOne(namespace + ".getLastInsertId");
	}

	@Override
	public List<HashMap<String, Object>> listMallPhoto(int mallPhoto_mall_key) {
		return session.selectList(namespace + ".listMallPhoto", mallPhoto_mall_key);
	}

	@Override
	public void insertMainPhoto(int mall_key, String mall_photo) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("mall_key", mall_key);
		map.put("mall_photo", mall_photo);
		session.update(namespace + ".insertMainPhoto", map);
	}

	@Override
	public String getMainPhoto(int mall_key) {
		return session.selectOne(namespace + ".getMainPhoto", mall_key);
	}

	@Override
	public void updateMainPhoto(MallPhotoVO vo) {
		session.update(namespace + ".updateMainPhoto", vo);
	}

	@Override
	public void updatePhoto(MallPhotoVO vo) {
		session.update(namespace + ".updatePhoto", vo);
	}

	

	
	

	

	
	

}
