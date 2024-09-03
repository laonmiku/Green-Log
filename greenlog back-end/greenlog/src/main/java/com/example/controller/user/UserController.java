package com.example.controller.user;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.seed.SeedDAO;
import com.example.dao.user.UserDAO;
import com.example.domain.QueryVO;
import com.example.domain.UserVO;

@RestController
@RequestMapping("/user")
public class UserController {
	@Autowired
	UserDAO udao;

	@Autowired
	SeedDAO sdao;

	@Autowired
	PasswordEncoder encoder;

	@PostMapping("/updatePass")
	public void updatePass(@RequestBody UserVO vo) {
		// 비밀번호 암호화
		String upass = encoder.encode(vo.getUser_upass());
		vo.setUser_upass(upass);
		udao.updatePass(vo);
	}

	@PostMapping("/findpass")
	public UserVO findpass(@RequestBody UserVO vo) {
		return udao.findpass(vo);
	}

	@PostMapping("/findid")
	public UserVO findid(@RequestBody UserVO vo) {
		return udao.findid(vo);
	}

	@GetMapping("/admin/list")
	public HashMap<String, Object> adminList(QueryVO vo) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("total", udao.total(vo));
		map.put("documents", udao.adminList(vo));
		return map;
	}

	@PostMapping("/delete/{user_key}")
	public void delete(@PathVariable("user_key") int user_key) {
		udao.delete(user_key);
	}

	@PostMapping("/insert")
	public void insert(@RequestBody UserVO vo) {
		// 비밀번호 암호화
		String upass = encoder.encode(vo.getUser_upass());
		vo.setUser_upass(upass);
		;
		udao.insert(vo);
	}

	@GetMapping("/read/{user_uid}")
	public UserVO read(@PathVariable("user_uid") String uid) {
		return udao.read(uid);
	}

	// 관리자용 업데이트(권한/성별 수정가능)
	@PostMapping("/admin/update")
	public void update(@RequestBody UserVO vo) {
		udao.update(vo);
	}

	// 개인정보 업데이트
	@PostMapping("/update")
	public void updatePerson(@RequestBody UserVO vo) {
		udao.updatePerson(vo);
	}

	@PostMapping("/login")
	public int login(@RequestBody UserVO vo) {
		int result = 0; // 아이디없음
		UserVO user = udao.read(vo.getUser_uid());
		if (user != null) {
			if (encoder.matches(vo.getUser_upass(), user.getUser_upass())) {
				result = 1; // 로그인 성공
			} else {
				result = 2; // 비밀번호 틀림
			}
		}
		return result;
	}

	@GetMapping("/mypage2/{user_uid}")
	public List<HashMap<String, Object>> mypage2(@PathVariable("user_uid") String uid) {
		return udao.mypage2(uid);
	}

	@GetMapping("/mypage/{user_uid}")
	public HashMap<String, Object> mypage(@PathVariable("user_uid") String uid) {
		return udao.mypage(uid);
	}

	@GetMapping("/followingDiaryList/{user_uid}")
	public List<HashMap<String, Object>> followingDiaryList(@PathVariable("user_uid") String uid, QueryVO vo) {
		return udao.followingDiaryList(uid, vo);
	}

	@GetMapping("/AdminDiaryList/{user_uid}")
	public List<HashMap<String, Object>> AdminDiaryList(@PathVariable("user_uid") String uid, QueryVO vo) {
		return udao.AdminDiaryList(uid, vo);
	}

	@GetMapping("/chknickname/{user_nickname}")
	public HashMap<String, Object> chknickname(@PathVariable("user_nickname") String user_nickname) {
		return udao.chknickname(user_nickname);
	}
}
