package com.example.service.follow;

import java.util.HashMap;

import com.example.domain.QueryVO;

public interface FollowService {
	public HashMap<String, Object> FollowingList(String uid, QueryVO vo);

	public HashMap<String, Object> FollowerList(String uid, QueryVO vo);
}
