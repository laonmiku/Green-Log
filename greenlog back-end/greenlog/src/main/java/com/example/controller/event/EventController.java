package com.example.controller.event;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.event.EventDAO;
import com.example.domain.EventVO;
import com.example.domain.QueryVO;
import com.example.service.event.EventService;

@RestController
@RequestMapping("/event")
public class EventController {

	@Autowired
    private EventDAO EDAO;
	
	@Autowired
	EventService service;

	@GetMapping("/list.json")
	public HashMap<String, Object> list(QueryVO vo) {
	    HashMap<String, Object> map = new HashMap<>();
	    List<HashMap<String, Object>> list = EDAO.list(vo);
	    map.put("documents", list);
	    map.put("total", EDAO.total(vo));
	    return map;
	}
	
    @PostMapping("/update/{event_key}")
	public void update(@RequestBody EventVO vo) {
		EDAO.update(vo);
	}
    
    @PostMapping("/insert")
    public void insert(@RequestBody EventVO vo) {
    	EDAO.insert(vo);
    }

    @PostMapping("/delete/{event_key}")
	public void delete(@PathVariable("event_key") int eid) {
		EDAO.delete(eid);
	}
    
    @GetMapping("/read/{event_key}")
	public EventVO read(@PathVariable("event_key") int eid,Model model) {
    	model.addAttribute("event",service.read(eid));
		return EDAO.read(eid);
	}
}