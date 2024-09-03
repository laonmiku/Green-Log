package com.example.domain;

import java.time.LocalDateTime;

public class ChatlogVO extends ChatVO {
	private int chatlog_key;
	private int chat_key;
	private String chat_sender;
	private String chatlog_msg;
	private LocalDateTime chatlog_sendTime;

	public int getChatlog_key() {
		return chatlog_key;
	}

	public void setChatlog_key(int chatlog_key) {
		this.chatlog_key = chatlog_key;
	}

	public int getChat_key() {
		return chat_key;
	}

	public void setChat_key(int chat_key) {
		this.chat_key = chat_key;
	}

	public String getChat_sender() {
		return chat_sender;
	}

	public void setChat_sender(String chat_sender) {
		this.chat_sender = chat_sender;
	}

	public String getChatlog_msg() {
		return chatlog_msg;
	}

	public void setChatlog_msg(String chatlog_msg) {
		this.chatlog_msg = chatlog_msg;
	}

	public LocalDateTime getChatlog_sendTime() {
		return chatlog_sendTime;
	}

	public void setChatlog_sendTime(LocalDateTime chatlog_sendTime) {
		this.chatlog_sendTime = chatlog_sendTime;
	}

}
