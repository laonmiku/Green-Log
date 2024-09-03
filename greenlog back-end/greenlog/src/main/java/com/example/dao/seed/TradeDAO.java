package com.example.dao.seed;

import java.util.HashMap;
import java.util.List;

import com.example.domain.QueryVO;
import com.example.domain.TradeVO;

public interface TradeDAO {
	public void insert(TradeVO vo);

	public List<HashMap<String, Object>> userList(String seed_number, QueryVO vo);

	public int userListCount(String seed_number, QueryVO vo);

	public List<HashMap<String, Object>> AdminList(QueryVO vo);

	public int adminListCount(QueryVO vo);
	
	public void updateStatus1(int trade_key);
	
	public void updateStatus0(int trade_key);
}
