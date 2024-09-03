package com.example.dao.faq;

import java.util.HashMap;
import java.util.List;

import com.example.domain.FAQVO;
import com.example.domain.QueryVO;

public interface FAQDAO {
	public List<HashMap<String, Object>> list(QueryVO vo);
    public void delete(int faq_key);
    public void insert(FAQVO vo);
    public FAQVO read(int faq_key);
    public void update(FAQVO vo);
    public int total(QueryVO vo);
    public void updateViewcnt(int faq_key);
}
