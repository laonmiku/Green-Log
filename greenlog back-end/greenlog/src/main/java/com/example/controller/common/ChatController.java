package com.example.controller.common;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.user.ChatDAO;
import com.example.domain.ChatVO;
import com.example.domain.ChatlogVO;
import com.example.domain.QueryVO;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ChatController {
	@Autowired
	ChatDAO cdao;

	@Autowired
	SimpMessagingTemplate messagingTemplate;

	// 유저 채팅 목록
	@GetMapping("/chat/ulist/{uid}")
	public HashMap<String, Object> userChatList(@PathVariable("uid") String uid) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("doc", cdao.userChatList(uid));
		map.put("total", cdao.userChatListCount(uid));
		return map;
	}

	// 채팅방갯수
	@GetMapping("/chat/listCount")
	public int listCount() {
		return cdao.listCount();
	}

	// chatkey찾기
	@GetMapping("/chat/searchChatkey/{uid}")
	public int searchChatKey(@PathVariable("uid") String uid) {
		Integer chatKey = cdao.searchChatkey(uid);
		return (chatKey != null) ? chatKey : 0;
	}

	// 메시지 저장
	@PostMapping("/chat/saveMsg")
	public void insertChatlog(@RequestBody ChatlogVO vo) {
		cdao.insertChatlog(vo);
	}

	// 저장된 메시지 출력
	@GetMapping("/chat/listMsg/{key}")
	public List<HashMap<String, Object>> listchatLog(@PathVariable("key") String key) {
		int Chat_key = Integer.parseInt(key);
		return cdao.listchatLog(Chat_key);
	}

	// 채팅방열림
	@PostMapping("/chat/insert")
	public void insertChat(@RequestBody ChatVO vo) {
		cdao.insertChat(vo);
	}

	// 채팅방 해결
	@PostMapping("/chat/delete")
	public void update(@RequestBody ChatVO vo) {
		cdao.update(vo);
	}

	// 채팅방 목록
	@GetMapping("/chat/list")
	public HashMap<String, Object> list(QueryVO vo) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("doc", cdao.list(vo));
		map.put("total", cdao.listCount());
		return map;
	}

	// 완료된 채팅방 목록
	@GetMapping("/chat/alist")
	public HashMap<String, Object> alist(QueryVO vo) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("doc", cdao.alist(vo));
		map.put("total", cdao.alistCount());
		return map;
	}

	@MessageMapping("/chat.sendMessage")
	public void sendMessage(ChatVO chatMessage) {
		String path = chatMessage.getChat_path();
		String destination = "/topic/" + path;
		cdao.save(chatMessage);
		System.out.println("Sending message to " + destination + ": " + chatMessage);
		messagingTemplate.convertAndSend(destination, chatMessage);
	}

	@MessageMapping("/chat.addUser")
	public void addUser(ChatVO chatMessage) {
		String path = chatMessage.getChat_path();
		String destination = "/topic/" + path;
		System.out.println("Adding user to " + destination + ": " + chatMessage);
		messagingTemplate.convertAndSend(destination, chatMessage);
	}

	// 채팅방 종료알림
	@PostMapping("/chat/exit")
	public void handleExit(@RequestBody ChatVO chatMessage) {
		// Notify the admin about the chat exit
		String path = chatMessage.getChat_path();
		String destination = "/topic/" + path;
		// JSON 객체 형태로 메시지 전송
		HashMap<String, String> exitNotification = new HashMap<>();
		exitNotification.put("uid", chatMessage.getChat_sender()); // 사용자 ID (uid)
		exitNotification.put("message", "님이 채팅을 종료하였습니다"); // 종료 메시지
		messagingTemplate.convertAndSend(destination, exitNotification);
	}
}