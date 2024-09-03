package com.example.domain;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class MallVO {

	private int mall_key;
	private String mall_seller;
	private String mall_buyer;
	private String mall_title;
	private int mall_price;
	private String mall_info;
	private String mall_photo;
	@JsonFormat(pattern = "yyyy년MM월dd일 HH:mm:ss", timezone = "Asia/Seoul")
	private Date mall_regDate;
	@JsonFormat(pattern = "yyyy년MM월dd일 HH:mm:ss", timezone = "Asia/Seoul")
	private Date mall_uDate;
	private int mall_tstate;
	private int mall_pstate;
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private Date mall_endDate;

	public int getMall_key() {
		return mall_key;
	}

	public void setMall_key(int mall_key) {
		this.mall_key = mall_key;
	}

	public String getMall_seller() {
		return mall_seller;
	}

	public void setMall_seller(String mall_seller) {
		this.mall_seller = mall_seller;
	}

	public String getMall_buyer() {
		return mall_buyer;
	}

	public void setMall_buyer(String mall_buyer) {
		this.mall_buyer = mall_buyer;
	}

	public String getMall_title() {
		return mall_title;
	}

	public void setMall_title(String mall_title) {
		this.mall_title = mall_title;
	}

	public int getMall_price() {
		return mall_price;
	}

	public void setMall_price(int mall_price) {
		this.mall_price = mall_price;
	}

	public String getMall_info() {
		return mall_info;
	}

	public void setMall_info(String mall_info) {
		this.mall_info = mall_info;
	}

	public String getMall_photo() {
		return mall_photo;
	}

	public void setMall_photo(String mall_photo) {
		this.mall_photo = mall_photo;
	}

	public Date getMall_regDate() {
		return mall_regDate;
	}

	public void setMall_regDate(Date mall_regDate) {
		this.mall_regDate = mall_regDate;
	}

	public Date getMall_uDate() {
		return mall_uDate;
	}

	public void setMall_uDate(Date mall_uDate) {
		this.mall_uDate = mall_uDate;
	}

	public int getMall_tstate() {
		return mall_tstate;
	}

	public void setMall_tstate(int mall_tstate) {
		this.mall_tstate = mall_tstate;
	}

	public int getMall_pstate() {
		return mall_pstate;
	}

	public void setMall_pstate(int mall_pstate) {
		this.mall_pstate = mall_pstate;
	}

	public Date getMall_endDate() {
		return mall_endDate;
	}

	public void setMall_endDate(Date mall_endDate) {
		this.mall_endDate = mall_endDate;
	}

}
