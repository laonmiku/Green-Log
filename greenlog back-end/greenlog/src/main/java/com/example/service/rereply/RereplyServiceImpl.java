package com.example.service.rereply;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.dao.rereply.RereplyDAO;
import com.example.domain.RereplyLikeVO;
import com.example.domain.RereplyVO;

@Service
public class RereplyServiceImpl implements RereplyService {
	
	@Autowired
	RereplyDAO rdao;
	
	@Transactional
	@Override
	public HashMap<String, Object> plist(int reply_key) {
			 HashMap<String, Object> map = new  HashMap<>();
			 map.put("documents",  rdao.rereplyList(reply_key));
			 map.put("total", rdao.total(reply_key));
			return map;
	}

	@Transactional
	@Override
	public void update(RereplyVO vo) {
			rdao.update(vo);
		
	}

	@Transactional
	@Override
	public void updatereLock(RereplyVO vo) {
			rdao.updatereLock(vo);
		
	}



}
