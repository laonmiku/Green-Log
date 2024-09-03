package com.example.controller.qa;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.qa.QADAO;
import com.example.domain.QaVO;
import com.example.domain.QueryVO;
import com.example.service.qa.QAService;


@RestController
@RequestMapping("/qa")
public class QAController {

	@Autowired
    private QADAO QDAO;
	
	 @Autowired
	 QAService service;

	@GetMapping("/list.json")
	public HashMap<String, Object> list(QueryVO vo) {
	    HashMap<String, Object> map = new HashMap<>();
	    List<HashMap<String, Object>> list = QDAO.list(vo);
	    map.put("documents", list);
	    map.put("total", QDAO.total(vo));
	    return map;
	}

    @PostMapping("/update/{qa_key}")
	public void update(@RequestBody QaVO vo) {
		QDAO.update(vo);
	}
    
    @PostMapping("/insert")
    public void insert(@RequestBody QaVO vo) {
    	QDAO.insert(vo);
    }

    @PostMapping("/delete/{qa_key}")
	public void delete(@PathVariable("qa_key") int qid) {
		QDAO.delete(qid);
	}
    
    @GetMapping("/read/{qa_key}")
	public QaVO read(@PathVariable("qa_key") int qid, Model model) {
    	model.addAttribute("qa",service.read(qid));
		return QDAO.read(qid);
	}
    
    @GetMapping("/qaListCount")
    public int qaListCount() {
    	return QDAO.qaListCount();
    }
    
    @GetMapping("/qaList")
    public HashMap<String,Object> QaList(QueryVO vo) {
    	return service.QaList(vo);
    }
}

