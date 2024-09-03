package com.example.controller.common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.service.login.KakaoService;

@RestController
public class KakaoLoginController {

	@Autowired
	KakaoService kakaoService;

	@GetMapping("/user/login/kakao/oauth")
	public String callback(@RequestParam("code") String code) {
		return kakaoService.getAccessToken(code);
	}
}
