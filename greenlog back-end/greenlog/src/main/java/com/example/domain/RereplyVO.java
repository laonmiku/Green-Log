package com.example.domain;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class RereplyVO {
	
		private int rereply_key;
		private int reply_key;
		private String rereply_writer;
		private String rereply_contents;
		@JsonFormat(pattern="yyyy년MM월dd일 HH:mm:ss", timezone="Asia/Seoul")
		private Date rereply_regdate;
		@JsonFormat(pattern="yyyy년MM월dd일 HH:mm:ss", timezone="Asia/Seoul")
		private Date rereply_udate;
		private String rereply_lock;
		private String rereply_reaction;
		
		public int getRereply_key() {
			return rereply_key;
		}
		public void setRereply_key(int rereply_key) {
			this.rereply_key = rereply_key;
		}
		public int getReply_key() {
			return reply_key;
		}
		public void setReply_key(int reply_key) {
			this.reply_key = reply_key;
		}
		public String getRereply_writer() {
			return rereply_writer;
		}
		public void setRereply_writer(String rereply_writer) {
			this.rereply_writer = rereply_writer;
		}
		public String getRereply_contents() {
			return rereply_contents;
		}
		public void setRereply_contents(String rereply_contents) {
			this.rereply_contents = rereply_contents;
		}
		public Date getRereply_regdate() {
			return rereply_regdate;
		}
		public void setRereply_regdate(Date rereply_regdate) {
			this.rereply_regdate = rereply_regdate;
		}
		public Date getRereply_udate() {
			return rereply_udate;
		}
		public void setRereply_udate(Date rereply_udate) {
			this.rereply_udate = rereply_udate;
		}
		public String getRereply_lock() {
			return rereply_lock;
		}
		public void setRereply_lock(String rereply_lock) {
			this.rereply_lock = rereply_lock;
		}
		public String getRereply_reaction() {
			return rereply_reaction;
		}
		public void setRereply_reaction(String rereply_reaction) {
			this.rereply_reaction = rereply_reaction;
		}
		@Override
		public String toString() {
			return "RereplyVO [rereply_key=" + rereply_key + ", reply_key=" + reply_key + ", rereply_writer="
					+ rereply_writer + ", rereply_contents=" + rereply_contents + ", rereply_regdate=" + rereply_regdate
					+ ", rereply_udate=" + rereply_udate + ", rereply_lock=" + rereply_lock + ", rereply_reaction="
					+ rereply_reaction + "]";
		}
		
		
		
		

}
