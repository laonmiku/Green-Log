package com.example.controller.rereply;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.rereply.RereplyDAO;
import com.example.domain.QueryVO;
import com.example.domain.ReplyLikeVO;
import com.example.domain.ReplyVO;
import com.example.domain.RereplyLikeVO;
import com.example.domain.RereplyVO;
import com.example.service.rereply.RereplyService;

@RestController
@RequestMapping("/rereply")
public class RereplyController {
	
	@Autowired
	RereplyDAO rrdao;
	
	@Autowired
	RereplyService rrservice;
	
		@PostMapping("/insert")
		public void insert (@RequestBody RereplyVO vo) {
				rrdao.insert(vo);
		}
		
		@PostMapping("/delete/{rereply_key}")
		public void delete (@PathVariable ("rereply_key") int rereply_key) {
				rrdao.delete(rereply_key);
		}
		
		@PostMapping("/update")
		public void update (@RequestBody RereplyVO vo) {
				rrservice.update(vo);
		}
		
		@PostMapping("/update/lock")
		public void updatereLock(@RequestBody RereplyVO vo) {
				rrservice.updatereLock(vo);
		}
		
		@GetMapping("/list/{reply_key}")
		public List<HashMap<String, Object>> replyList(@PathVariable("reply_key") int reply_key) {
				return rrdao.rereplyList(reply_key);
		}
		
		@GetMapping("/plist/{reply_key}")
		public HashMap<String, Object> plist(@PathVariable("reply_key") int reply_key) {
				return rrservice.plist(reply_key);
		}
		
		@PostMapping("/readReaction")
		public String readReaction(@RequestBody RereplyLikeVO vo) {
			return rrdao.readReaction(vo);

		}

		@GetMapping("/count/{reply_key}")
		public int count(@PathVariable("reply_key") int reply_key) {
			return rrdao.total(reply_key);
		}

		@PostMapping("/insert/like")
		public int LikeInsert(@RequestBody RereplyLikeVO vo) {
			try {
				rrdao.LikeInsert(vo);
				return 1;
			} catch (Exception e) {
				return 2;
			}

		}

		@PostMapping("/insert/hate")
		public int HateInsert(@RequestBody RereplyLikeVO vo) {
			try {
				rrdao.HateInsert(vo);
				return 1;
			} catch (Exception e) {
				return 2;
			}

		}

		@PostMapping("/reactionUpdate")
		public void reactionUpdate(@RequestBody RereplyLikeVO vo) {
			rrdao.reactionUpdate(vo);
		}

		@PostMapping("/reactionDelete")
		public void reactionDelete(@RequestBody RereplyLikeVO vo) {
			rrdao.reactionDelete(vo);
		}

		@GetMapping("/CountReaction/{rereply_key}")
		public HashMap<String, Object> CountReaction(@PathVariable("rereply_key") int rereply_key) {
			return rrdao.CountReaction(rereply_key);
		}

		@GetMapping("/read/{rereply_key}")
		public HashMap<String, Object> rereplyRead(@PathVariable("rereply_key") int rereply_key) {
			return rrdao.rereplyRead(rereply_key);
		}
		
		
}
