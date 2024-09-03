package com.example.dao.qa;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.QaVO;
import com.example.domain.QueryVO;

@Repository
public class QADAOImpl implements QADAO{
	
	@Autowired
    private SqlSession session;
    private static final String NAMESPACE = "com.example.mapper.QAMapper";

    @Override
    public List<HashMap<String, Object>> list(QueryVO vo) {
        return session.selectList(NAMESPACE + ".list",vo);
    }
    
    @Override
    public void delete(int qa_key) {
        session.delete(NAMESPACE + ".delete", qa_key);
    }


    @Override
    public void insert(QaVO vo) {
        session.insert(NAMESPACE + ".insert", vo);
    }

	@Override
	public QaVO read(int qa_key) {
		return session.selectOne(NAMESPACE+".read",qa_key);
	}

	@Override
	public void update(QaVO vo) {
		session.update(NAMESPACE+".update",vo);
		
	}

	@Override
	public int total(QueryVO vo) {
		return session.selectOne(NAMESPACE + ".total", vo);
	}
	
	@Override
	public void updateViewcnt(int qa_key) {
		session.update(NAMESPACE+".updateViewcnt",qa_key);
		
	}

	@Override
	public List<HashMap<String, Object>> qaList(QueryVO vo) {
		return session.selectList(NAMESPACE+".qaList",vo);
	}

	@Override
	public int qaListCount() {
		return session.selectOne(NAMESPACE+".qaListCount");
	}

	@Override
	public int qaListTotal(QueryVO vo) {
		return session.selectOne(NAMESPACE+".qaListTotal",vo);
	}

}
