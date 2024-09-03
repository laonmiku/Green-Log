package com.example.domain;

public class DiaryLikeVO {
	private int dLike;
	private String user_uid;
	private int diary_key;
	public int getdLike() {
		return dLike;
	}
	public void setdLike(int dLike) {
		this.dLike = dLike;
	}
	public String getUser_uid() {
		return user_uid;
	}
	public void setUser_uid(String user_uid) {
		this.user_uid = user_uid;
	}
	public int getDiary_key() {
		return diary_key;
	}
	public void setDiary_key(int diary_key) {
		this.diary_key = diary_key;
	}
	@Override
	public String toString() {
		return "DiaryLikeVO [dLike=" + dLike + ", user_uid=" + user_uid + ", diary_key=" + diary_key + "]";
	}
}
