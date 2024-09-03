package com.example.domain;

public class ReplyLikeVO {
	private String reply_writer;
	private int reply_key;
	private int reply_reaction;

	public String getReply_writer() {
		return reply_writer;
	}

	public void setReply_writer(String reply_writer) {
		this.reply_writer = reply_writer;
	}

	public int getReply_key() {
		return reply_key;
	}

	public void setReply_key(int reply_key) {
		this.reply_key = reply_key;
	}

	public int getReply_reaction() {
		return reply_reaction;
	}

	public void setReply_reaction(String reply_reaction) {
		this.reply_reaction = Integer.parseInt(reply_reaction);
	}

	@Override
	public String toString() {
		return "ReplyLikeVO [reply_writer=" + reply_writer + ", reply_key=" + reply_key + ", reply_reaction="
				+ reply_reaction + "]";
	}

}
