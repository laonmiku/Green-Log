package com.example.domain;

import java.util.*;

public class FollowVO {
	private String follow_from;
	private String follow_to;
	private Date follow_date;
	public String getFollow_from() {
		return follow_from;
	}
	public void setFollow_from(String follow_from) {
		this.follow_from = follow_from;
	}
	public String getFollow_to() {
		return follow_to;
	}
	public void setFollow_to(String follow_to) {
		this.follow_to = follow_to;
	}
	public Date getFollow_date() {
		return follow_date;
	}
	public void setFollow_date(Date follow_date) {
		this.follow_date = follow_date;
	}
	@Override
	public String toString() {
		return "FollowVO [follow_from=" + follow_from + ", follow_to=" + follow_to + ", follow_date=" + follow_date
				+ "]";
	}
}