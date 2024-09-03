package com.example.controller.faq;

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

import com.example.dao.faq.FAQDAO;
import com.example.domain.FAQVO;
import com.example.domain.QueryVO;
import com.example.service.faq.FAQService;


@RestController
@RequestMapping("/faq")
public class FAQContoller {

	@Autowired
	private FAQDAO FDAO;
	
	@Autowired
	FAQService service;
	
	@GetMapping("/list.json")
	public HashMap<String, Object> list(QueryVO vo) {
	    HashMap<String, Object> map = new HashMap<>();
	    List<HashMap<String, Object>> list = FDAO.list(vo);
	    map.put("documents", list);
	    map.put("total", FDAO.total(vo));
	    return map;
	}
	    @PostMapping("/update/{faq_key}")
		public void update(@RequestBody FAQVO vo) {
			FDAO.update(vo);
		}
	    
	    @PostMapping("/insert")
	    public void insert(@RequestBody FAQVO vo) {
	    	FDAO.insert(vo);
	    }

	    @PostMapping("/delete/{faq_key}")
		public void delete(@PathVariable("faq_key") int fid) {
			FDAO.delete(fid);
		}
	    
	    @GetMapping("/read/{faq_key}")
		public FAQVO read(@PathVariable("faq_key") int fid, Model model) {
	    	model.addAttribute("faq", service.read(fid));
			return FDAO.read(fid);
		}
	}
