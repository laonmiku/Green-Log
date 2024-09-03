package com.example.service.Trade;

import java.util.HashMap;

import com.example.domain.QueryVO;
import com.example.domain.TradeVO;

public interface TradeService {
	public void insert(TradeVO vo);

	public HashMap<String, Object> UserList(String seed_number, QueryVO vo);

	public HashMap<String, Object> AdminList(QueryVO vo);

}
