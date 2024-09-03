package com.example.domain;

public class Query2VO extends QueryVO{

	private String orderBy;
	private String tstateWord;
	private String pstateWord;
	private String itisEnd;

	public String getOrderBy() {
		return orderBy;
	}

	public void setOrderBy(String orderBy) {
		this.orderBy = orderBy;
	}


	public String getTstateWord() {
		return tstateWord;
	}

	public void setTstateWord(String tstateWord) {
		this.tstateWord = tstateWord;
	}

	

	public String getPstateWord() {
		return pstateWord;
	}

	public void setPstateWord(String pstateWord) {
		this.pstateWord = pstateWord;
	}
	

	public String getItisEnd() {
		return itisEnd;
	}

	public void setItisEnd(String itisEnd) {
		this.itisEnd = itisEnd;
	}

	@Override
	public String toString() {
		return "Query2VO [orderBy=" + orderBy +  ", tstateWord=" + tstateWord
				+  ", pstateWord=" + pstateWord + ", itisEnd=" + itisEnd + ", getPage()="
				+ getPage() + ", getSize()=" + getSize() + ", getStart()=" + getStart() + ", getKey()=" + getKey()
				+ ", getWord()=" + getWord() + ", toString()=" + super.toString() + ", getClass()=" + getClass()
				+ ", hashCode()=" + hashCode() + "]";
	}
	
	
	
}
