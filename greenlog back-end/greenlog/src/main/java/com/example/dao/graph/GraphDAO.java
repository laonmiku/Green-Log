package com.example.dao.graph;

import java.util.*;

public interface GraphDAO {
	public List<HashMap<String,Object>> diaryChart();
	
	public List<HashMap<String,Object>> rank();
	
	public List<HashMap<String,Object>> mallChart();
}
