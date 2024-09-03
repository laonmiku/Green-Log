package com.example.dao.report;

import java.util.HashMap;
import java.util.List;

import com.example.domain.QueryVO;
import com.example.domain.ReportVO;

public interface ReportDAO {
	public void insert(ReportVO vo);

	public List<HashMap<String, Object>> list(QueryVO vo);

	public int count();

	public void update(ReportVO vo);

	public List<HashMap<String, Object>> alist(QueryVO vo);

	public int acount();
}
