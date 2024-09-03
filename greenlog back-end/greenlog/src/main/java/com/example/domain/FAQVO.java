package com.example.domain;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class FAQVO {
	
	private int faq_key;
	private String faq_category;
    private String faq_writer;
    private String faq_question;
    private String faq_answer;
    @JsonFormat(pattern="yyyy년MM월dd일 HH:mm:ss", timezone="Asia/Seoul")
    private Date faq_regDate;
    @JsonFormat(pattern="yyyy년MM월dd일 HH:mm:ss", timezone="Asia/Seoul")
    private Date faq_uDate;
    private int faq_vcnt;
    private int faq_type;
    
	public int getFaq_type() {
		return faq_type;
	}
	public void setFaq_type(int faq_type) {
		this.faq_type = faq_type;
	}
	public int getFaq_vcnt() {
		return faq_vcnt;
	}
	public void setFaq_vcnt(int faq_vcnt) {
		this.faq_vcnt = faq_vcnt;
	}
	public String getFaq_category() {
		return faq_category;
	}
	public void setFaq_category(String faq_category) {
		this.faq_category = faq_category;
	}
	public int getFaq_key() {
		return faq_key;
	}
	public void setFaq_key(int faq_key) {
		this.faq_key = faq_key;
	}
	public String getFaq_writer() {
		return faq_writer;
	}
	public void setFaq_writer(String faq_writer) {
		this.faq_writer = faq_writer;
	}
	public String getFaq_question() {
		return faq_question;
	}
	public void setFaq_question(String faq_question) {
		this.faq_question = faq_question;
	}
	public String getFaq_answer() {
		return faq_answer;
	}
	public void setFaq_answer(String faq_answer) {
		this.faq_answer = faq_answer;
	}
	public Date getFaq_regDate() {
		return faq_regDate;
	}
	public void setFaq_regDate(Date faq_regDate) {
		this.faq_regDate = faq_regDate;
	}
	public Date getFaq_uDate() {
		return faq_uDate;
	}
	public void setFaq_uDate(Date faq_uDate) {
		this.faq_uDate = faq_uDate;
	}
	@Override
	public String toString() {
		return "FAQVO [faq_key=" + faq_key + ", faq_category=" + faq_category + ", faq_writer=" + faq_writer
				+ ", faq_question=" + faq_question + ", faq_answer=" + faq_answer + ", faq_regDate=" + faq_regDate
				+ ", faq_uDate=" + faq_uDate + ", faq_vcnt=" + faq_vcnt + ", faq_type=" + faq_type + "]";
	}
	
}
