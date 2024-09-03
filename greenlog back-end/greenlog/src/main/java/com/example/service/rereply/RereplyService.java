package com.example.service.rereply;

import java.util.HashMap;

import com.example.domain.RereplyLikeVO;
import com.example.domain.RereplyVO;

public interface RereplyService {
		public void update (RereplyVO vo);
		
		public void updatereLock (RereplyVO vo);
		
		public HashMap<String, Object> plist(int reply_key);
}
