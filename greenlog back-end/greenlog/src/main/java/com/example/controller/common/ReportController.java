package com.example.controller.common;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.report.ReportDAO;
import com.example.domain.QueryVO;
import com.example.domain.ReportVO;

@RestController
@RequestMapping("/report")
public class ReportController {
	@Autowired
	ReportDAO rdao;

	@PostMapping("/insert")
	public void insert(@RequestBody ReportVO vo) {
		rdao.insert(vo);
	}

	@GetMapping("/list")
	public HashMap<String, Object> list(QueryVO vo) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("doc", rdao.list(vo));
		map.put("total", rdao.count());
		return map;
	}

	@GetMapping("/alist")
	public HashMap<String, Object> alist(QueryVO vo) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("doc", rdao.alist(vo));
		map.put("total", rdao.acount());
		return map;
	}

	@GetMapping("/count")
	public int count() {
		return rdao.count();
	}

	@PostMapping("/update")
	public int update(@RequestBody ReportVO vo) {
		rdao.update(vo);
		return 1;
	}

}
