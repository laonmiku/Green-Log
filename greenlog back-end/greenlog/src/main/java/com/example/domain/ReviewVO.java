package com.example.domain;

import java.util.*;

import com.fasterxml.jackson.annotation.JsonFormat;

public class ReviewVO {
	
	private int review_key;
	private int review_mall_key;
	private String review_writer;
	private int review_rating;
	private String review_contents;
	private int review_lock;
	@JsonFormat(pattern="yyyy년MM월dd일 HH:mm:ss", timezone="Asia/Seoul")
	private Date review_regDate;
	@JsonFormat(pattern="yyyy년MM월dd일 HH:mm:ss", timezone="Asia/Seoul")
	private Date review_uDate;
	
	public int getReview_key() {
		return review_key;
	}
	public void setReview_key(int review_key) {
		this.review_key = review_key;
	}
	public int getReview_mall_key() {
		return review_mall_key;
	}
	public void setReview_mall_key(int review_mall_key) {
		this.review_mall_key = review_mall_key;
	}
	public String getReview_writer() {
		return review_writer;
	}
	public void setReview_writer(String review_writer) {
		this.review_writer = review_writer;
	}
	public int getReview_rating() {
		return review_rating;
	}
	public void setReview_rating(int review_rating) {
		this.review_rating = review_rating;
	}
	public String getReview_contents() {
		return review_contents;
	}
	public void setReview_contents(String review_contents) {
		this.review_contents = review_contents;
	}
	public int getReview_lock() {
		return review_lock;
	}
	public void setReview_lock(int review_lock) {
		this.review_lock = review_lock;
	}
	public Date getReview_regDate() {
		return review_regDate;
	}
	public void setReview_regDate(Date review_regDate) {
		this.review_regDate = review_regDate;
	}
	public Date getReview_udate() {
		return review_uDate;
	}
	public void setReview_udate(Date review_udate) {
		this.review_uDate = review_udate;
	}
	
	@Override
	public String toString() {
		return "ReviewVO [review_key=" + review_key + ", review_mall_key=" + review_mall_key + ", review_writer="
				+ review_writer + ", review_rating=" + review_rating + ", review_contents=" + review_contents
				+ ", review_lock=" + review_lock + ", review_regDate=" + review_regDate + ", review_udate="
				+ review_uDate + "]";
	}
	
	
	
}
