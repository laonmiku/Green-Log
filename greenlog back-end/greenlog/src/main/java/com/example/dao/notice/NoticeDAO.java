package com.example.dao.notice;

import java.util.HashMap;
import java.util.List;

import com.example.domain.NoticeVO;
import com.example.domain.QueryVO;

public interface NoticeDAO {
	public List<HashMap<String, Object>> list(QueryVO vo);
    public void delete(int notice_key);
    public void insert(NoticeVO vo);
    public NoticeVO read(int notice_key);
    public void update(NoticeVO vo);
    public int total(QueryVO vo);
    public void updateViewcnt(int notice_key);
}
