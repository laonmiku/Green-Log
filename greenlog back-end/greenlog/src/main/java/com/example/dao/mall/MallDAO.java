package com.example.dao.mall;

import java.util.HashMap;
import java.util.List;

import com.example.domain.MallPhotoVO;
import com.example.domain.MallVO;
import com.example.domain.Query2VO;
import com.example.domain.QueryVO;

public interface MallDAO {
	
	public List<HashMap<String,Object>> reviewList (String review_writer,QueryVO vo);
	
	public int reviewListTotal(String review_writer,QueryVO vo);
	
public List<HashMap<String,Object>> buyList (String review_writer,QueryVO vo);
	
	public int buyListTotal(String review_writer,QueryVO vo);
	
	public List<HashMap<String,Object>> reviewCount ();
	
	public HashMap<String,Object> reviewCount2 (int mall_key);
	
	public List<HashMap<String, Object>> list(Query2VO vo);
	
	public List<HashMap<String, Object>> sellerList(String mall_seller,QueryVO vo);
	
	public int sellerListTotal(String mall_seller);

	public void insertInfo(MallVO vo);

	public HashMap<String, Object> read(int mall_key);

	public void update(MallVO vo);
	
	public void updateEndDate(int mall_key);

	public void delete(int mall_key);

	public int total(Query2VO vo);

	public void insertPhoto(MallPhotoVO vo);

	public void deleteAttach(int mallPhoto_key);

	public int getLastInsertId();

	public List<HashMap<String, Object>> listMallPhoto(int mallPhoto_mall_key);

	public void insertMainPhoto(int mall_key, String mall_photo);

	public String getMainPhoto(int mall_key);

	public void updateMainPhoto(MallPhotoVO vo);
	
	public void updatePhoto(MallPhotoVO vo);

}
