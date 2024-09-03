package com.example.dao.event;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.EventVO;
import com.example.domain.QueryVO;

@Repository
public class EventDAOImpl implements EventDAO{

	@Autowired
    private SqlSession session;
    private static final String NAMESPACE = "com.example.mapper.EventMapper";
    
    @Override
    public List<HashMap<String, Object>> list(QueryVO vo) {
        return session.selectList(NAMESPACE + ".list",vo);
    }

    @Override
    public void delete(int event_key) {
        session.delete(NAMESPACE + ".delete", event_key);
    }


    @Override
    public void insert(EventVO vo) {
        session.insert(NAMESPACE + ".insert", vo);
    }

	@Override
	public EventVO read(int event_key) {
		return session.selectOne(NAMESPACE+".read",event_key);
	}

	@Override
	public void update(EventVO vo) {
		session.update(NAMESPACE+".update",vo);
		
	}
	@Override
	public int total(QueryVO vo) {
		return session.selectOne(NAMESPACE + ".total", vo);
	}

	@Override
	public void updateViewcnt(int event_key) {
		session.update(NAMESPACE+".updateViewcnt",event_key);
		
	}


}
