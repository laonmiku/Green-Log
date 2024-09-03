package com.example.service.bbs;

import java.util.HashMap;
import java.util.List;

public interface BBSService {
	public HashMap<String, Object> read(int bbs_key);

	public List<HashMap<String, Object>> getTopList();
}
