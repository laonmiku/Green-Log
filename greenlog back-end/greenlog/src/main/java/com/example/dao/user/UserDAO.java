package com.example.dao.user;

import java.util.HashMap;
import java.util.List;

import com.example.domain.QueryVO;
import com.example.domain.UserVO;

public interface UserDAO {
	public List<HashMap<String, Object>> adminList(QueryVO vo);

	public int total(QueryVO vo);

	public void insert(UserVO vo);

	public UserVO read(String uid);

	public void delete(int user_key);

	public void update(UserVO vo);

	public void imgUpdate(UserVO vo);

	public void updatePerson(UserVO vo);

	public List<HashMap<String, Object>> mypage2(String uid);

	public UserVO findid(UserVO vo);

	public UserVO findpass(UserVO vo);

	public void updatePass(UserVO vo);

	public HashMap<String, Object> mypage(String uid);

	public List<HashMap<String, Object>> followingDiaryList(String uid, QueryVO vo);

	public List<HashMap<String, Object>> AdminDiaryList(String uid, QueryVO vo);

	public HashMap<String, Object> chknickname(String user_nickname);
}
