package com.example.dao.user;

import java.util.HashMap;
import java.util.List;

import com.example.domain.ChatVO;
import com.example.domain.ChatlogVO;
import com.example.domain.QueryVO;

public interface ChatDAO {
	public void insertChat(ChatVO chatVO);

	public List<HashMap<String, Object>> list(QueryVO vo);

	public void update(ChatVO chatVO);

	public List<HashMap<String, Object>> alist(QueryVO vo);

	public void save(ChatVO chatVO);

	public void insertChatlog(ChatlogVO vo);

	public List<HashMap<String, Object>> listchatLog(int Chat_key);

	public Integer searchChatkey(String uid);

	public int listCount();

	public int alistCount();

	public List<HashMap<String, Object>> userChatList(String uid);

	public int userChatListCount(String uid);

}
