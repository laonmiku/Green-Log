package com.example.service.Trade;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.dao.seed.SeedDAO;
import com.example.domain.QueryVO;

@Service
public class SeedServiceImpl implements SeedService {
	@Autowired
	SeedDAO sdao;

	@Transactional
	@Override
	public HashMap<String, Object> SeedList(QueryVO vo) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("doc", sdao.list(vo));
		map.put("total", sdao.listCount(vo));
		return map;
	}

}
