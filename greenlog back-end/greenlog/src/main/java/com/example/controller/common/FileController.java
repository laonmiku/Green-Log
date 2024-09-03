package com.example.controller.common;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.example.dao.user.UserDAO;
import com.example.domain.UserVO;

@RestController
public class FileController {

	// 다운로드
	@PostMapping("/download") // 테스트 /download?file=http//~
	public void download(@RequestParam("file") String file) throws Exception {
		URL url = new URL(file);
		InputStream in = url.openStream();
		String filePath = "c:/download/mall/";
		String fileName = System.currentTimeMillis() + ".jpg";
		FileOutputStream out = new FileOutputStream(filePath + fileName);
		FileCopyUtils.copy(in, out);
	}

	@Autowired
	UserDAO udao;

	// 이미지 업로드
	@PostMapping("/upload/img/{uid}")
	public void updateImage(@PathVariable("uid") String uid, MultipartHttpServletRequest multi) throws Exception {
		// 파일업로드
		MultipartFile file = multi.getFile("byte");

		// 상대경로 설정
		String relativePath = "upload/";
		String fileName = uid + ".jpg";

		// 현재 작업 디렉토리 확인
		String currentDir = System.getProperty("user.dir");
		String uploadPath = currentDir + File.separator + relativePath;

		// 파일이 존재하면 삭제
		File oldFile = new File(uploadPath + fileName);
		if (oldFile.exists()) {
			oldFile.delete();
		}

		// 이미지 이름변경 및 데이터베이스 업데이트
		UserVO vo = new UserVO();
		vo.setUser_uid(uid);
		vo.setUser_img("/display?file=" + fileName);
		udao.imgUpdate(vo);

		// 파일 저장
		File destFile = new File(uploadPath, fileName);
		file.transferTo(destFile);
	}

	// 이미지보기
	@GetMapping("/display") // 테스트 /display?file=/download/mall/파일이름
	public ResponseEntity<Resource> display(@RequestParam("file") String file) {
		try {
			// 상대경로를 절대경로로 변환하여 Resource 생성
			String relativePath = "upload/";
			String absolutePath = System.getProperty("user.dir") + File.separator + relativePath;
			Path filePath = Paths.get(absolutePath + file);

			// 파일이 존재하는지 확인
			Resource resource = new UrlResource(filePath.toUri());
			if (!resource.exists()) {
				return ResponseEntity.notFound().build();
			}

			// 파일의 MIME 타입을 확인하여 HTTP 헤더 설정
			HttpHeaders headers = new HttpHeaders();
			headers.add(HttpHeaders.CONTENT_TYPE, Files.probeContentType(filePath));

			return ResponseEntity.ok().headers(headers).body(resource);
		} catch (IOException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
}
