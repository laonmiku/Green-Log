package com.example.dao.event;

import java.util.HashMap;
import java.util.List;

import com.example.domain.BBSVO;
import com.example.domain.EventVO;
import com.example.domain.QueryVO;

public interface EventDAO {
	public List<HashMap<String, Object>> list(QueryVO vo);
    public void delete(int event_key);
    public void insert(EventVO vo);
    public EventVO read(int event_key);
    public void update(EventVO vo);
    public int total(QueryVO vo);
    public void updateViewcnt(int event_key);
}
