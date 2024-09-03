package com.example.service.faq;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.dao.faq.FAQDAO;
import com.example.domain.FAQVO;

@Service
public class FAQServiceImpl implements FAQService{
	@Autowired
	FAQDAO FDAO;

	@Transactional
	@Override
	public FAQVO read(int faq_key) {
		FDAO.updateViewcnt(faq_key);
		return FDAO.read(faq_key);
	}
	
}
