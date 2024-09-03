package com.example.dao.bbs;

import java.util.HashMap;
import java.util.List;

import com.example.domain.BBSPhotoVO;
import com.example.domain.BBSVO;
import com.example.domain.QueryVO;

public interface BBSDAO {
	public List<HashMap<String, Object>> list(QueryVO vo);

	public void delete(int bbs_key);

	public void insert(BBSVO vo);

	public HashMap<String, Object> read(int bbs_key);

	public void update(BBSVO vo);

	public int total(QueryVO vo);

	public void updateViewcnt(int bbs_key);

	public List<HashMap<String, Object>> topList();

	public void insertPhoto(BBSPhotoVO vo);

	public void deleteAttach(int bbsPhoto_key);

	public int getLastInsertId();

	public List<HashMap<String, Object>> listMallPhoto(String bbs_key);

	public void insertMainPhoto(int bbs_key, String bbsPhoto_photo);

	public String getMainPhoto(int bbs_key);

	public void updateMainPhoto(BBSPhotoVO vo);

	public void updatePhoto(BBSPhotoVO vo);

	public List<HashMap<String, Object>> noticeList();

}
