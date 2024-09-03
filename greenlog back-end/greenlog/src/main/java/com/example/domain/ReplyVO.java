package com.example.domain;

import java.util.*;

import com.fasterxml.jackson.annotation.JsonFormat;

public class ReplyVO {

	private int reply_key;
	private int reply_bbs_key;
	private String reply_writer;
	private String reply_contents;
	@JsonFormat(pattern="yyyy년MM월dd일 HH:mm:ss", timezone="Asia/Seoul")
	private Date reply_regdate;
	@JsonFormat(pattern="yyyy년MM월dd일 HH:mm:ss", timezone="Asia/Seoul")
	private Date reply_udate;
	private String reply_lock;
	private String reply_reaction;
	
	public int getReply_key() {
		return reply_key;
	}
	public void setReply_key(int reply_key) {
		this.reply_key = reply_key;
	}
	public int getReply_bbs_key() {
		return reply_bbs_key;
	}
	public void setReply_bbs_key(int reply_bbs_key) {
		this.reply_bbs_key = reply_bbs_key;
	}
	public String getReply_writer() {
		return reply_writer;
	}
	public void setReply_writer(String reply_writer) {
		this.reply_writer = reply_writer;
	}
	public String getReply_contents() {
		return reply_contents;
	}
	public void setReply_contents(String reply_contents) {
		this.reply_contents = reply_contents;
	}
	public Date getReply_regdate() {
		return reply_regdate;
	}
	public void setReply_regdate(Date reply_regdate) {
		this.reply_regdate = reply_regdate;
	}
	public Date getReply_udate() {
		return reply_udate;
	}
	public void setReply_udate(Date reply_udate) {
		this.reply_udate = reply_udate;
	}
	public String getReply_lock() {
		return reply_lock;
	}
	public void setReply_lock(String reply_lock) {
		this.reply_lock = reply_lock;
	}
	public String getReply_reaction() {
		return reply_reaction;
	}
	public void setReply_reaction(String reply_reaction) {
		this.reply_reaction = reply_reaction;
	}
	
	@Override
	public String toString() {
		return "ReplyVO [reply_key=" + reply_key + ", reply_bbs_key=" + reply_bbs_key + ", reply_writer=" + reply_writer
				+ ", reply_contents=" + reply_contents + ", reply_regdate=" + reply_regdate + ", reply_udate="
				+ reply_udate + ", reply_lock=" + reply_lock + ", reply_reaction=" + reply_reaction + "]";
	}
	
}
