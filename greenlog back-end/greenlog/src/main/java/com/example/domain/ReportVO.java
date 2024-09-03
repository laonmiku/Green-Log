package com.example.domain;

public class ReportVO {
	private int report_key;
	private String report_from;
	private String report_to;
	private String report_contents;
	private int report_state;
	private String report_origin;
	private String report_root;

	public int getReport_key() {
		return report_key;
	}

	public void setReport_key(int report_key) {
		this.report_key = report_key;
	}

	public String getReport_from() {
		return report_from;
	}

	public void setReport_from(String report_from) {
		this.report_from = report_from;
	}

	public String getReport_to() {
		return report_to;
	}

	public void setReport_to(String report_to) {
		this.report_to = report_to;
	}

	public String getReport_contents() {
		return report_contents;
	}

	public void setReport_contents(String report_contents) {
		this.report_contents = report_contents;
	}

	public int getReport_state() {
		return report_state;
	}

	public void setReport_state(int report_state) {
		this.report_state = report_state;
	}

	public String getReport_origin() {
		return report_origin;
	}

	public void setReport_origin(String report_origin) {
		this.report_origin = report_origin;
	}

	@Override
	public String toString() {
		return "ReportVO [report_key=" + report_key + ", report_from=" + report_from + ", report_to=" + report_to
				+ ", report_contents=" + report_contents + ", report_state=" + report_state + ", report_origin="
				+ report_origin + "]";
	}

	public String getReport_root() {
		return report_root;
	}

	public void setReport_root(String report_root) {
		this.report_root = report_root;
	}
}
