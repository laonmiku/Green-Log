package com.example.dao.seed;

import java.util.HashMap;
import java.util.List;

import com.example.domain.QueryVO;
import com.example.domain.SeedVO;
import com.example.domain.TradeVO;

public interface SeedDAO {
	public void insert(SeedVO vo);

	public SeedVO read(String uid);

	public void update(TradeVO vo);

	public List<HashMap<String, Object>> list(QueryVO vo);

	public int listCount(QueryVO vo);
}