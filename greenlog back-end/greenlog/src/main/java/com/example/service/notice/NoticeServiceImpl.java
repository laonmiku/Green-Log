package com.example.service.notice;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.dao.notice.NoticeDAO;
import com.example.domain.NoticeVO;

@Service
public class NoticeServiceImpl implements NoticeService{
	@Autowired
	NoticeDAO NDAO;

	@Transactional
	@Override
	public NoticeVO read(int notice_key) {
		NDAO.updateViewcnt(notice_key);
		return NDAO.read(notice_key);
	}

}
