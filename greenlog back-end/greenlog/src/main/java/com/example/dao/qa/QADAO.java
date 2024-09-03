package com.example.dao.qa;

import java.util.HashMap;
import java.util.List;

import com.example.domain.QaVO;
import com.example.domain.QueryVO;

public interface QADAO {
	public List<HashMap<String, Object>> list(QueryVO vo);
    public void delete(int qa_key);
    public void insert(QaVO vo);
    public QaVO read(int qa_key);
    public void update(QaVO vo);
    public int total(QueryVO vo);
    public void updateViewcnt(int qa_key);
    public List<HashMap<String, Object>> qaList(QueryVO vo);
    public int qaListCount();
    public int qaListTotal(QueryVO vo);
}
