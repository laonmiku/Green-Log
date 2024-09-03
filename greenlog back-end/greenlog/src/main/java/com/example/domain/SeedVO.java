package com.example.domain;

public class SeedVO extends UserVO {
	private int seed_key;
	private String seed_uid;
	private int seed_point;
	private int amount;
	private String seed_number;

	public String getSeed_uid() {
		return seed_uid;
	}

	public void setSeed_uid(String seed_uid) {
		this.seed_uid = seed_uid;
	}

	public int getSeed_point() {
		return seed_point;
	}

	public void setSeed_point(int seed_point) {
		this.seed_point = seed_point;
	}

	@Override
	public String toString() {
		return "SeedVO [seed_uid=" + seed_uid + ", seed_point=" + seed_point + ", getUser_nickname()="
				+ getUser_nickname() + ", getUser_img()=" + getUser_img() + "]";
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public String getSeed_number() {
		return seed_number;
	}

	public void setSeed_number(String seed_number) {
		this.seed_number = seed_number;
	}

	public int getSeed_key() {
		return seed_key;
	}

	public void setSeed_key(int seed_key) {
		this.seed_key = seed_key;
	}

}
