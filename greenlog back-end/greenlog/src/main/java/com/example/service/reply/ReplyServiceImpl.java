package com.example.service.reply;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.dao.reply.ReplyDAO;
import com.example.domain.QueryVO;
import com.example.domain.ReplyVO;

@Service
public class ReplyServiceImpl implements ReplyService {

	@Autowired
	ReplyDAO rdao;

	@Transactional
	@Override
	public HashMap<String, Object> plist(int reply_bbs_key, QueryVO vo) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("documents", rdao.replyList(reply_bbs_key, vo));
		map.put("total", rdao.total(reply_bbs_key));
		return map;
	}

	@Transactional
	@Override
	public void update(ReplyVO vo) {
		rdao.update(vo);

	}

	@Transactional
	@Override
	public void updateLock(ReplyVO vo) {
		rdao.updateLock(vo);

	}

}
