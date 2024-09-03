package com.example.dao.faq;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.FAQVO;
import com.example.domain.QueryVO;

@Repository
public class FAQDAOImpl implements FAQDAO{
	
	@Autowired
    private SqlSession session;
    private static final String NAMESPACE = "com.example.mapper.FAQMapper";

    @Override
    public List<HashMap<String, Object>> list(QueryVO vo) {
        return session.selectList(NAMESPACE + ".list",vo);
    }

	 @Override
	    public void delete(int faq_key) {
	        session.delete(NAMESPACE + ".delete", faq_key);
	    }


	    @Override
	    public void insert(FAQVO vo) {
	        session.insert(NAMESPACE + ".insert", vo);
	    }

		@Override
		public FAQVO read(int faq_key) {
			return session.selectOne(NAMESPACE+".read",faq_key);
		}

		@Override
		public void update(FAQVO vo) {
			session.update(NAMESPACE+".update",vo);
			
		}
		@Override
		public int total(QueryVO vo) {
			return session.selectOne(NAMESPACE + ".total", vo);
		}

		@Override
		public void updateViewcnt(int faq_key) {
			session.update(NAMESPACE+".updateViewcnt",faq_key);
			
		}

	}
