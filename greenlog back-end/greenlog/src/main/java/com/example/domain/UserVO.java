package com.example.domain;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class UserVO {
	private int user_key;
	private String user_uid;
	private String user_upass;
	private String user_uname;
	private String user_phone;
	private String user_address1;
	private String user_address2;
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date user_birth;
	private String user_img;
	private String user_gender;
	private String user_auth;
	private String user_email;
	@JsonFormat(pattern = "yyyy년 MM월 dd일 HH:mm:ss", timezone = "Asia/Seoul")
	private Date user_regDate;
	private String user_nickname;
	private String user_ment;

	public int getUser_key() {
		return user_key;
	}

	public void setUser_key(int user_key) {
		this.user_key = user_key;
	}

	public String getUser_uid() {
		return user_uid;
	}

	public void setUser_uid(String user_uid) {
		this.user_uid = user_uid;
	}

	public String getUser_upass() {
		return user_upass;
	}

	public void setUser_upass(String user_upass) {
		this.user_upass = user_upass;
	}

	public String getUser_uname() {
		return user_uname;
	}

	public void setUser_uname(String user_uname) {
		this.user_uname = user_uname;
	}

	public String getUser_phone() {
		return user_phone;
	}

	public void setUser_phone(String user_phone) {
		this.user_phone = user_phone;
	}

	public String getUser_address1() {
		return user_address1;
	}

	public void setUser_address1(String user_address1) {
		this.user_address1 = user_address1;
	}

	public String getUser_address2() {
		return user_address2;
	}

	public void setUser_address2(String user_address2) {
		this.user_address2 = user_address2;
	}

	public Date getUser_birth() {
		return user_birth;
	}

	public void setUser_birth(Date user_birth) {
		this.user_birth = user_birth;
	}

	public String getUser_img() {
		return user_img;
	}

	public void setUser_img(String user_img) {
		this.user_img = user_img;
	}

	public String getUser_gender() {
		return user_gender;
	}

	public void setUser_gender(String user_gender) {
		this.user_gender = user_gender;
	}

	public String getUser_auth() {
		return user_auth;
	}

	public void setUser_auth(String user_auth) {
		this.user_auth = user_auth;
	}

	public String getUser_email() {
		return user_email;
	}

	public void setUser_email(String user_email) {
		this.user_email = user_email;
	}

	public Date getUser_regDate() {
		return user_regDate;
	}

	public void setUser_regDate(Date user_regDate) {
		this.user_regDate = user_regDate;
	}

	public String getUser_nickname() {
		return user_nickname;
	}

	public void setUser_nickname(String user_nickname) {
		this.user_nickname = user_nickname;
	}

	public String getUser_ment() {
		return user_ment;
	}

	public void setUser_ment(String user_ment) {
		this.user_ment = user_ment;
	}

	@Override
	public String toString() {
		return "UserVO [user_key=" + user_key + ", user_uid=" + user_uid + ", user_upass=" + user_upass
				+ ", user_uname=" + user_uname + ", user_phone=" + user_phone + ", user_address1=" + user_address1
				+ ", user_address2=" + user_address2 + ", user_birth=" + user_birth + ", user_img=" + user_img
				+ ", user_gender=" + user_gender + ", user_auth=" + user_auth + ", user_email=" + user_email
				+ ", user_regDate=" + user_regDate + "]";
	}

}
