package com.example.controller.reply;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.reply.ReplyDAO;
import com.example.domain.QueryVO;
import com.example.domain.ReplyLikeVO;
import com.example.domain.ReplyVO;
import com.example.service.reply.ReplyService;

@RestController
@RequestMapping("/reply")
public class ReplyController {

	@Autowired
	ReplyDAO rdao;

	@Autowired
	ReplyService rservice;

	@PostMapping("/insert")
	public void insert(@RequestBody ReplyVO vo) {
		rdao.insert(vo);
	}

	@PostMapping("/delete/{reply_key}")
	public void delete(@PathVariable("reply_key") int reply_key) {
		rdao.delete(reply_key);
	}

	@PostMapping("/update")
	public void update(@RequestBody ReplyVO vo) {
		rservice.update(vo);
	}

	@PostMapping("/update/lock")
	public void updateLock(@RequestBody ReplyVO vo) {
		rservice.updateLock(vo);
	}

	@GetMapping("/list/{reply_bbs_key}")
	public List<HashMap<String, Object>> replyList(@PathVariable("reply_bbs_key") int reply_bbs_key,
			@RequestParam("key") String key, QueryVO vo) {
		vo.setKey(key);
		System.out.println("Received key: ---------------------- " + key);
		return rdao.replyList(reply_bbs_key, vo);
	}

	@GetMapping("/plist/{reply_bbs_key}")
	public HashMap<String, Object> plist(@PathVariable("reply_bbs_key") int reply_bbs_key, QueryVO vo) {
		return rservice.plist(reply_bbs_key, vo);
	}

	@PostMapping("/readReaction")
	public String readReaction(@RequestBody ReplyLikeVO vo) {
		return rdao.readReaction(vo);

	}

	@GetMapping("/count/{reply_bbs_key}")
	public int count(@PathVariable("reply_bbs_key") int reply_bbs_key) {
		return rdao.total(reply_bbs_key);
	}

	@PostMapping("/insert/like")
	public int LikeInsert(@RequestBody ReplyLikeVO vo) {
		try {
			rdao.LikeInsert(vo);
			return 1;
		} catch (Exception e) {
			return 2;
		}

	}

	@PostMapping("/insert/hate")
	public int HateInsert(@RequestBody ReplyLikeVO vo) {
		try {
			rdao.HateInsert(vo);
			return 1;
		} catch (Exception e) {
			return 2;
		}

	}

	@PostMapping("/reactionUpdate")
	public void reactionUpdate(@RequestBody ReplyLikeVO vo) {
		rdao.reactionUpdate(vo);
	}

	@PostMapping("/reactionDelete")
	public void reactionDelete(@RequestBody ReplyLikeVO vo) {
		rdao.reactionDelete(vo);
	}

	@GetMapping("/CountReaction/{reply_key}")
	public HashMap<String, Object> CountReaction(@PathVariable("reply_key") int reply_key) {
		return rdao.CountReaction(reply_key);
	}
	
	@GetMapping("/read/{reply_key}")
	public HashMap<String, Object> replyRead(@PathVariable("reply_key") int  reply_key) {
		return rdao.replyRead(reply_key);
	}
}
