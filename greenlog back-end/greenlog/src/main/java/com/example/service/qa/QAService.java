package com.example.service.qa;

import java.util.HashMap;

import com.example.domain.QaVO;
import com.example.domain.QueryVO;

public interface QAService {
	public QaVO read(int qa_key);

	public HashMap<String, Object> QaList(QueryVO vo);
}
