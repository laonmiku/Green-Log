package com.example.dao.graph;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class GraphDAOImpl implements GraphDAO{
	
	@Autowired
	SqlSession session;
	String namespace = "com.example.mapper.GraphMapper";
		
	@Override
	public List<HashMap<String, Object>> diaryChart() {
		return session.selectList(namespace + ".diaryCount");
	}

	@Override
	public List<HashMap<String, Object>> rank() {
		return session.selectList(namespace + ".rank");
	}

	@Override
	public List<HashMap<String, Object>> mallChart() {
		return session.selectList(namespace + ".mallChart");
	}

}
