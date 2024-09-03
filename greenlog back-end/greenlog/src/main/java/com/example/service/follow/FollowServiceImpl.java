package com.example.service.follow;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.dao.follow.FollowDAO;
import com.example.domain.QueryVO;

@Service
public class FollowServiceImpl implements FollowService {
	@Autowired
	FollowDAO fdao;

	@Transactional
	@Override
	public HashMap<String, Object> FollowingList(String uid, QueryVO vo) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("doc", fdao.followingList(uid, vo));
		map.put("total", fdao.followingCount(uid, vo));
		return map;
	}

	@Transactional
	@Override
	public HashMap<String, Object> FollowerList(String uid, QueryVO vo) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("doc", fdao.followerList(uid, vo));
		map.put("total", fdao.followerCount(uid, vo));
		return map;
	}
}
