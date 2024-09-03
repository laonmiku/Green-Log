package com.example.domain;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

public class TradeVO extends SeedVO {
	private int trade_key;
	private String trade_from;
	private String trade_to;
	private int amount;
	

	private String trade_info;

	@JsonFormat(pattern = "yyyy.MM.dd HH:mm:ss", timezone = "Asia/Seoul")
	private LocalDateTime trade_date;

	private int trade_state;
	private int trade_status;

	public int getTrade_status() {
		return trade_status;
	}

	public void setTrade_status(int trade_status) {
		this.trade_status = trade_status;
	}

	public int getTrade_key() {
		return trade_key;
	}

	public void setTrade_key(int trade_key) {
		this.trade_key = trade_key;
	}

	public String getTrade_from() {
		return trade_from;
	}

	public void setTrade_from(String trade_from) {
		this.trade_from = trade_from;
	}

	public String getTrade_to() {
		return trade_to;
	}

	public void setTrade_to(String trade_to) {
		this.trade_to = trade_to;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public LocalDateTime getTrade_date() {
		return trade_date;
	}

	public void setTrade_date(LocalDateTime trade_date) {
		this.trade_date = trade_date;
	}

	public int getTrade_state() {
		return trade_state;
	}

	public void setTrade_state(int trade_state) {
		this.trade_state = trade_state;
	}

	@Override
	public String toString() {
		return "TradeVO [trade_key=" + trade_key + ", trade_from=" + trade_from + ", trade_to=" + trade_to + ", amount="
				+ amount + ", trade_date=" + trade_date + ", trade_state=" + trade_state + ", getSeed_number()="
				+ getSeed_number() + "]";
	}

	public String getTrade_info() {
		return trade_info;
	}

	public void setTrade_info(String trade_info) {
		this.trade_info = trade_info;
	}

}
