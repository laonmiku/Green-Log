package com.example.controller.user;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.follow.FollowDAO;
import com.example.domain.FollowVO;
import com.example.domain.QueryVO;
import com.example.service.follow.FollowService;

@RestController
@RequestMapping("/follow")
public class FollowController {

	@Autowired
	FollowDAO fdao;

	@Autowired
	FollowService fservice;

	@GetMapping("/following/{uid}")
	public HashMap<String, Object> followingList(@PathVariable("uid") String uid, QueryVO vo) {
		return fservice.FollowingList(uid, vo);
	}

	@GetMapping("/follower/{uid}")
	public HashMap<String, Object> followerList(@PathVariable("uid") String uid, QueryVO vo) {
		return fservice.FollowerList(uid, vo);
	}

	@PostMapping("/addFollow")
	public int addFollow(@RequestBody FollowVO vo) {
		try {
			fdao.addFollow(vo);
			return 1; // Success
		} catch (Exception e) {
			e.printStackTrace();
			return 0; // Failure
		}
	}

	@PostMapping("/unFollow")
	public int unFollow(@RequestBody FollowVO vo) {
		try {
			fdao.unFollow(vo);
			return 1; // Success
		} catch (Exception e) {
			e.printStackTrace();
			return 0; // Failure
		}
	}
	
	@PostMapping("/chkfollow")
	public HashMap<String, Object> chkfollow(@RequestBody FollowVO vo){
		return fdao.chkfollow(vo.getFollow_from(), vo.getFollow_to());
	}
}
