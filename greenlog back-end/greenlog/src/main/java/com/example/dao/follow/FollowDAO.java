package com.example.dao.follow;

import java.util.HashMap;
import java.util.List;

import com.example.domain.FollowVO;
import com.example.domain.QueryVO;

public interface FollowDAO {
	public List<HashMap<String, Object>> followingList(String uid, QueryVO vo);

	public int followingCount(String uid, QueryVO vo);

	public List<HashMap<String, Object>> followerList(String uid, QueryVO vo);

	public int followerCount(String uid, QueryVO vo);

	public void addFollow(FollowVO vo);

	public void unFollow(FollowVO vo);
	
	public HashMap<String, Object> chkfollow(String uid1, String uid2);
}
