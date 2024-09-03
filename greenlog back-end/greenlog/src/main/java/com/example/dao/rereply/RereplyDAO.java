package com.example.dao.rereply;

import java.util.HashMap;
import java.util.List;

import com.example.domain.RereplyLikeVO;
import com.example.domain.RereplyVO;

public interface RereplyDAO {
	
	public void insert(RereplyVO vo);

	public List<HashMap<String, Object>> rereplyList(int reply_key);

	public void delete(int rereply_key);

	public void update(RereplyVO vo);

	public void updatereLock(RereplyVO vo);

	public int total(int reply_key);

	public String readReaction(RereplyLikeVO vo);

	public void LikeInsert(RereplyLikeVO vo);

	public void HateInsert(RereplyLikeVO vo);

	public void reactionUpdate(RereplyLikeVO vo);

	public void reactionDelete(RereplyLikeVO vo);

	public HashMap<String, Object> CountReaction(int rereply_key);
	
	public HashMap<String, Object> rereplyRead (int rereply_key);

}
