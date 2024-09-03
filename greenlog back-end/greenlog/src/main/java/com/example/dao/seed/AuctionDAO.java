package com.example.dao.seed;

import java.util.HashMap;
import java.util.List;

import com.example.domain.AuctionVO;
import com.example.domain.QueryVO;

public interface AuctionDAO {
	public void insert(AuctionVO vo);

	public List<HashMap<String, Object>> userAList(String uid, QueryVO vo);

	public int total(String uid, QueryVO vo);
	
	public List<HashMap<String, Object>> adminAList(QueryVO vo);
	
	public int admintotal(QueryVO vo);
	
	public void updateState1(int auction_key);
	
	public void updateState0(int auction_key);
}

