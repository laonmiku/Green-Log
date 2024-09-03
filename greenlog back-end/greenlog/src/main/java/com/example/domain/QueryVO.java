package com.example.domain;

public class QueryVO {
	private int page;
	private int size;
	private int start;
	private String key;
	private String word;
	private String key2;
	private String date1;
	private String date2;

	public String getDate1() {
		return date1;
	}

	public void setDate1(String date1) {
		this.date1 = date1;
	}

	public String getDate2() {
		return date2;
	}

	public void setDate2(String date2) {
		this.date2 = date2;
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getSize() {
		return size;
	}

	public void setSize(int size) {
		this.size = size;
	}

	public int getStart() {
		return (page - 1) * size;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getWord() {
		if ("type".equals(this.key)) {
			return this.word;
		}
		return "%" + word + "%";
	}

	public void setWord(String word) {
		this.word = word;
	}

	public String getKey2() {
		return key2;
	}

	public void setKey2(String key2) {
		this.key2 = key2;
	}

	@Override
	public String toString() {
		return "QueryVO [page=" + page + ", size=" + size + ", start=" + start + ", key=" + key + ", word=" + word
				+ ", key2=" + key2 + ", date1=" + date1 + ", date2=" + date2 + "]";
	}
}
