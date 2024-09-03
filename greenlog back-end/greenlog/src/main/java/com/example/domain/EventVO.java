package com.example.domain;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class EventVO {
    private int event_key;
    private String event_writer;
    private String event_title;
    private String event_contents;
    @JsonFormat(pattern="yyyy년MM월dd일 HH:mm:ss", timezone="Asia/Seoul")
    private Date event_regDate;
    private Date event_uDate;
    private String event_photo;
    private int event_type;
    private String event_category;
    private int event_vcnt;
    
	public int getEvent_vcnt() {
		return event_vcnt;
	}
	public void setEvent_vcnt(int event_vcnt) {
		this.event_vcnt = event_vcnt;
	}
	public int getEvent_key() {
		return event_key;
	}
	public void setEvent_key(int event_key) {
		this.event_key = event_key;
	}
	public String getEvent_writer() {
		return event_writer;
	}
	public void setEvent_writer(String event_writer) {
		this.event_writer = event_writer;
	}
	public String getEvent_title() {
		return event_title;
	}
	public void setEvent_title(String event_title) {
		this.event_title = event_title;
	}
	public String getEvent_contents() {
		return event_contents;
	}
	public void setEvent_contents(String event_contents) {
		this.event_contents = event_contents;
	}
	public Date getEvent_regDate() {
		return event_regDate;
	}
	public void setEvent_regDate(Date event_regDate) {
		this.event_regDate = event_regDate;
	}
	public Date getEvent_uDate() {
		return event_uDate;
	}
	public void setEvent_uDate(Date event_uDate) {
		this.event_uDate = event_uDate;
	}
	public String getEvent_photo() {
		return event_photo;
	}
	public void setEvent_photo(String event_photo) {
		this.event_photo = event_photo;
	}
	public int getEvent_type() {
		return event_type;
	}
	public void setEvent_type(int event_type) {
		this.event_type = event_type;
	}
	public String getEvent_category() {
		return event_category;
	}
	public void setEvent_category(String event_category) {
		this.event_category = event_category;
	}
	
	@Override
	public String toString() {
		return "EventVO [event_key=" + event_key + ", event_writer=" + event_writer + ", event_title=" + event_title
				+ ", event_contents=" + event_contents + ", event_regDate=" + event_regDate + ", event_uDate="
				+ event_uDate + ", event_photo=" + event_photo + ", event_type=" + event_type + ", event_category="
				+ event_category + "]";
	}
}