package com.example.domain;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class BBSVO {
    private int bbs_key;
    private String bbs_category;
    private String bbs_writer;
    private String bbs_title;
    private String bbs_contents;
    @JsonFormat(pattern="yyyy년MM월dd일 HH:mm:ss", timezone="Asia/Seoul")
    private Date bbs_regDate;
    @JsonFormat(pattern="yyyy년MM월dd일 HH:mm:ss", timezone="Asia/Seoul")
    private Date bbs_uDate;
    private int bbs_type;
    private int bbs_vcnt;
    private String bbs_photo;
    
    public String getBbs_photo() {
		return bbs_photo;
	}

	public void setBbs_photo(String bbs_photo) {
		this.bbs_photo = bbs_photo;
	}

	public int getBbs_vcnt() {
		return bbs_vcnt;
	}

	public void setBbs_vcnt(int bbs_vcnt) {
		this.bbs_vcnt = bbs_vcnt;
	}

	public int getBbs_key() {
        return bbs_key;
    }

    public void setBbs_key(int bbs_key) {
        this.bbs_key = bbs_key;
    }

    public String getBbs_category() {
        return bbs_category;
    }

    public void setBbs_category(String bbs_category) {
        this.bbs_category = bbs_category;
    }

    public String getBbs_writer() {
        return bbs_writer;
    }

    public void setBbs_writer(String bbs_writer) {
        this.bbs_writer = bbs_writer;
    }

    public String getBbs_title() {
        return bbs_title;
    }

    public void setBbs_title(String bbs_title) {
        this.bbs_title = bbs_title;
    }

    public String getBbs_contents() {
        return bbs_contents;
    }

    public void setBbs_contents(String bbs_contents) {
        this.bbs_contents = bbs_contents;
    }

    public Date getBbs_regDate() {
        return bbs_regDate;
    }

    public void setBbs_regDate(Date bbs_regDate) {
        this.bbs_regDate = bbs_regDate;
    }

    public Date getBbs_uDate() {
        return bbs_uDate;
    }

    public void setBbs_uDate(Date bbs_uDate) {
        this.bbs_uDate = bbs_uDate;
    }
    public int getBbs_type() {
        return bbs_type;
    }

    public void setBbs_type(int bbs_type) {
        this.bbs_type = bbs_type;
    }

	@Override
	public String toString() {
		return "BBSVO [bbs_key=" + bbs_key + ", bbs_category=" + bbs_category + ", bbs_writer=" + bbs_writer
				+ ", bbs_title=" + bbs_title + ", bbs_contents=" + bbs_contents + ", bbs_regDate=" + bbs_regDate
				+ ", bbs_uDate=" + bbs_uDate + ", bbs_type=" + bbs_type + ", bbs_vcnt=" + bbs_vcnt + ", bbs_photo="
				+ bbs_photo + "]";
	}
}
