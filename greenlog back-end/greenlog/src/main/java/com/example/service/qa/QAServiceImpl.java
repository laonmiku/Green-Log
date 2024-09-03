package com.example.service.qa;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.dao.qa.QADAO;
import com.example.domain.QaVO;
import com.example.domain.QueryVO;

@Service
public class QAServiceImpl implements QAService {
	@Autowired
	QADAO QDAO;

	@Transactional
	@Override
	public QaVO read(int qa_key) {
		QDAO.updateViewcnt(qa_key);
		return QDAO.read(qa_key);
	}

	@Transactional
	@Override
	public HashMap<String, Object> QaList(QueryVO vo) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("doc", QDAO.qaList(vo));
		map.put("total", QDAO.qaListTotal(vo));
		return map;
	}

}
