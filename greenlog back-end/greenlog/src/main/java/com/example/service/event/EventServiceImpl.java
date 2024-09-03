package com.example.service.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.dao.event.EventDAO;
import com.example.domain.EventVO;

@Service
public class EventServiceImpl implements EventService{
	@Autowired
	EventDAO EDAO;

	@Transactional
	@Override
	public EventVO read(int event_key) {
		EDAO.updateViewcnt(event_key);
		return EDAO.read(event_key);
	}

}
