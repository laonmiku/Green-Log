package com.example.domain;

public class RereplyLikeVO {
		private int rereply_key;
		private String rereply_writer;
		private String rereply_reaction;
		
		public int getRereply_key() {
			return rereply_key;
		}
		public void setRereply_key(int rereply_key) {
			this.rereply_key = rereply_key;
		}
		public String getRereply_writer() {
			return rereply_writer;
		}
		public void setRereply_writer(String rereply_writer) {
			this.rereply_writer = rereply_writer;
		}
		public String getRereply_reaction() {
			return rereply_reaction;
		}
		public void setRereply_reaction(String rereply_reaction) {
			this.rereply_reaction = rereply_reaction;
		}
		
		@Override
		public String toString() {
			return "RereplyLikeVO [rereply_key=" + rereply_key + ", rereply_writer=" + rereply_writer
					+ ", rereply_reaction=" + rereply_reaction + "]";
		}
}
