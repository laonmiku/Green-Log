package com.example.domain;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class QaVO {
    private int qa_key;
    private String qa_writer;
    private String qa_title;
    private String qa_contents;
    @JsonFormat(pattern="yyyy년MM월dd일 HH:mm:ss", timezone="Asia/Seoul")
    private Date qa_regDate;
    @JsonFormat(pattern="yyyy년MM월dd일 HH:mm:ss", timezone="Asia/Seoul")
    private Date qa_uDate;
    private int qa_lock;
    private int qa_state;
    private int qa_vcnt;
    private String comments;
    private String qa_status;
    
	public int getQa_key() {
		return qa_key;
	}



	public void setQa_key(int qa_key) {
		this.qa_key = qa_key;
	}



	public String getQa_writer() {
		return qa_writer;
	}



	public void setQa_writer(String qa_writer) {
		this.qa_writer = qa_writer;
	}



	public String getQa_title() {
		return qa_title;
	}



	public void setQa_title(String qa_title) {
		this.qa_title = qa_title;
	}



	public String getQa_contents() {
		return qa_contents;
	}



	public void setQa_contents(String qa_contents) {
		this.qa_contents = qa_contents;
	}



	public Date getQa_regDate() {
		return qa_regDate;
	}



	public void setQa_regDate(Date qa_regDate) {
		this.qa_regDate = qa_regDate;
	}



	public Date getQa_uDate() {
		return qa_uDate;
	}



	public void setQa_uDate(Date qa_uDate) {
		this.qa_uDate = qa_uDate;
	}



	public int getQa_lock() {
		return qa_lock;
	}



	public void setQa_lock(int qa_lock) {
		this.qa_lock = qa_lock;
	}



	public int getQa_state() {
		return qa_state;
	}



	public void setQa_state(int qa_state) {
		this.qa_state = qa_state;
	}



	public int getQa_vcnt() {
		return qa_vcnt;
	}



	public void setQa_vcnt(int qa_vcnt) {
		this.qa_vcnt = qa_vcnt;
	}



	public String getComments() {
		return comments;
	}



	public void setComments(String comments) {
		this.comments = comments;
	}



	public String getQa_status() {
		return qa_status;
	}



	public void setQa_status(String qa_status) {
		this.qa_status = qa_status;
	}



	@Override
	public String toString() {
		return "QaVO [qa_key=" + qa_key + ", qa_writer=" + qa_writer + ", qa_title=" + qa_title + ", qa_contents="
				+ qa_contents + ", qa_regDate=" + qa_regDate + ", qa_uDate=" + qa_uDate + ", qa_lock=" + qa_lock
				+ ", qa_state=" + qa_state + ", qa_vcnt=" + qa_vcnt + ", comments=" + comments + ", qa_stauts="
				+ qa_status + "]";
	}
}
