package com.example.domain;

public class BBSPhotoVO extends BBSVO {
	private int bbsPhoto_key;
	private int bbsPhoto_bbs_key;
	private String bbsPhoto_photo;
	private int bbsPhoto_sequence;

	public int getBbsPhoto_key() {
		return bbsPhoto_key;
	}

	public void setBbsPhoto_key(int bbsPhoto_key) {
		this.bbsPhoto_key = bbsPhoto_key;
	}

	public int getBbsPhoto_bbs_key() {
		return bbsPhoto_bbs_key;
	}

	public void setBbsPhoto_bbs_key(int bbsPhoto_bbs_key) {
		this.bbsPhoto_bbs_key = bbsPhoto_bbs_key;
	}

	public String getBbsPhoto_photo() {
		return bbsPhoto_photo;
	}

	public void setBbsPhoto_photo(String bbsPhoto_photo) {
		this.bbsPhoto_photo = bbsPhoto_photo;
	}

	public int getBbsPhoto_sequence() {
		return bbsPhoto_sequence;
	}

	public void setBbsPhoto_sequence(int bbsPhoto_sequence) {
		this.bbsPhoto_sequence = bbsPhoto_sequence;
	}

}
