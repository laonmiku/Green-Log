package com.example.domain;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class AuctionVO{
	private int auction_key;
	private int auction_mall_key;
	private String auction_seller;
	private String auction_buyer;
	private int auction_state;

	public int getAuction_state() {
		return auction_state;
	}

	public void setAuction_state(int auction_state) {
		this.auction_state = auction_state;
	}

	@JsonFormat(pattern = "yyyy년 MM월dd일 HH:mm:ss", timezone = "Asia/Seoul")
	private Date auction_regDate;
	private int auction_amount;

	public int getAuction_key() {
		return auction_key;
	}

	public void setAuction_key(int auction_key) {
		this.auction_key = auction_key;
	}

	public int getAuction_mall_key() {
		return auction_mall_key;
	}

	public void setAuction_mall_key(int auction_mall_key) {
		this.auction_mall_key = auction_mall_key;
	}

	public String getAuction_seller() {
		return auction_seller;
	}

	public void setAuction_seller(String auction_seller) {
		this.auction_seller = auction_seller;
	}

	public String getAuction_buyer() {
		return auction_buyer;
	}

	public void setAuction_buyer(String auction_buyer) {
		this.auction_buyer = auction_buyer;
	}

	public Date getAuction_regDate() {
		return auction_regDate;
	}

	public void setAuction_regDate(Date auction_regDate) {
		this.auction_regDate = auction_regDate;
	}

	public int getAuction_amount() {
		return auction_amount;
	}

	public void setAuction_amount(int auction_amount) {
		this.auction_amount = auction_amount;
	}

	@Override
	public String toString() {
		return "AuctionVO [auction_key=" + auction_key + ", auction_mall_key=" + auction_mall_key + ", auction_seller="
				+ auction_seller + ", auction_buyer=" + auction_buyer + ", auction_regDate=" + auction_regDate
				+ ", auction_amount=" + auction_amount + "]";
	}

}