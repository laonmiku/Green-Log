package com.example.service.reply;

import java.util.HashMap;

import com.example.domain.QueryVO;
import com.example.domain.ReplyVO;

public interface ReplyService {
	public void update(ReplyVO vo);

	public void updateLock(ReplyVO vo);

	public HashMap<String, Object> plist(int reply_bbs_key, QueryVO vo);

}
