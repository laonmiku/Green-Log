package com.example.domain;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class AskVO {
    private int ask_key;
    private String ask_from;
    private String ask_contents;
    @JsonFormat(pattern="yyyy년MM월dd일 HH:mm:ss", timezone="Asia/Seoul")
    private Date ask_regDate;
    @JsonFormat(pattern="yyyy년MM월dd일 HH:mm:ss", timezone="Asia/Seoul")
    private Date ask_uDate;
    
	public int getAsk_key() {
		return ask_key;
	}
	public void setAsk_key(int ask_key) {
		this.ask_key = ask_key;
	}
	public String getAsk_from() {
		return ask_from;
	}
	public void setAsk_from(String ask_from) {
		this.ask_from = ask_from;
	}
	public String getAsk_contents() {
		return ask_contents;
	}
	public void setAsk_contents(String ask_contents) {
		this.ask_contents = ask_contents;
	}
	public Date getAsk_regDate() {
		return ask_regDate;
	}
	public void setAsk_regDate(Date ask_regDate) {
		this.ask_regDate = ask_regDate;
	}
	public Date getAsk_uDate() {
		return ask_uDate;
	}
	public void setAsk_uDate(Date ask_uDate) {
		this.ask_uDate = ask_uDate;
	}
	@Override
	public String toString() {
		return "AskVO [ask_key=" + ask_key + ", ask_from=" + ask_from + ", ask_contents=" + ask_contents
				+ ", ask_regDate=" + ask_regDate + ", ask_uDate=" + ask_uDate + "]";
	}

}
