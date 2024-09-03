package com.example.controller.bbs;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.util.WebUtils;

import com.example.dao.bbs.BBSDAO;
import com.example.domain.BBSPhotoVO;
import com.example.domain.BBSVO;
import com.example.domain.QueryVO;
import com.example.service.bbs.BBSService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/bbs")
public class BBSRestController {

	@Autowired
	private BBSDAO bbsDAO;

	@Autowired
	private BBSService service;

	@GetMapping("/list")
	public HashMap<String, Object> list(QueryVO vo) {
		HashMap<String, Object> map = new HashMap<>();
		List<HashMap<String, Object>> list = bbsDAO.list(vo);
		map.put("documents", list);
		map.put("total", bbsDAO.total(vo));
		System.out.println("########################################################" + vo);
		return map;
	}

	@GetMapping("/top")
	public List<HashMap<String, Object>> topList() {
		return bbsDAO.topList();
	}

	@GetMapping("/notice")
	public List<HashMap<String, Object>> noticeList() {
		return bbsDAO.noticeList();
	}

	@PostMapping("/update/{bbs_key}")
	public void update(@RequestBody BBSVO vo) {
		bbsDAO.update(vo);
	}

	@PostMapping("/insert")
	public int insert(@RequestBody BBSVO vo) {
		bbsDAO.insert(vo);// 데이터베이스 일기삽입
		int lastInsertId = bbsDAO.getLastInsertId(); // 마지막 삽입된 자동 생성 키를 가져옴
		return lastInsertId; // 클라이언트에게 반환
	}

	@PostMapping("/delete/{bbs_key}")
	public void delete(@PathVariable("bbs_key") int bid) {
		bbsDAO.delete(bid);
	}

	@GetMapping("/read/{bbs_key}")
	public HashMap<String, Object> read(@PathVariable("bbs_key") int bid, HttpServletRequest request,
			HttpServletResponse response) {
		System.out.println("-----------------------------------------" + bid);
		Cookie oldCookie = WebUtils.getCookie(request, "bbsView");

		if (oldCookie != null) {
			if (!oldCookie.getValue().contains("[" + bid + "]")) {
				oldCookie.setValue(oldCookie.getValue() + "_" + "[" + bid + "]");
				oldCookie.setPath("/");
				oldCookie.setMaxAge(60 * 60 * 24);
				response.addCookie(oldCookie);
				return service.read(bid);
			} else {
				return bbsDAO.read(bid);
			}
		} else {
			Cookie newCookie = new Cookie("bbsView", "[" + bid + "]");
			newCookie.setPath("/");
			newCookie.setMaxAge(60 * 60 * 24);
			response.addCookie(newCookie);
			return service.read(bid);
		}
	}

	// Attach 파일들 업로드
	@PostMapping("/attach/{bbsPhoto_bbs_key}")
	public void attach(@PathVariable("bbsPhoto_bbs_key") String bbsPhoto_bbs_key, MultipartHttpServletRequest multi) {
		try {
			String relativePath = "BBSUpload/" + bbsPhoto_bbs_key + "/";
			String currentDir = System.getProperty("user.dir");
			String uploadPath = currentDir + File.separator + relativePath;

			File folder = new File(uploadPath);
			if (!folder.exists()) {
				folder.mkdirs(); // 폴더가 없으면 모든 부모 디렉토리까지 생성
			}
			List<MultipartFile> files = multi.getFiles("bytes");
			if (!files.isEmpty()) {
				for (int i = 0; i < files.size(); i++) {
					MultipartFile file = files.get(i);
					if (!file.isEmpty()) {
						String fileName = UUID.randomUUID().toString() + ".jpg";
						File destFile = new File(uploadPath, fileName);
						file.transferTo(destFile);
						System.out.println("Uploaded file: " + fileName);

						// 이미지 경로 설정 및 DB 삽입
						BBSPhotoVO vo = new BBSPhotoVO();
						vo.setBbsPhoto_bbs_key(Integer.parseInt(bbsPhoto_bbs_key));
						vo.setBbsPhoto_photo("/bbs/display?file=" + bbsPhoto_bbs_key + "/" + fileName);
						vo.setBbsPhoto_sequence(i);

						// 첫 번째 파일은 mdao.insertMainPhoto와 mdao.insertPhoto 둘 다로 삽입
						if (i == 0) {
							bbsDAO.insertMainPhoto(Integer.parseInt(bbsPhoto_bbs_key), vo.getBbsPhoto_photo());
						}
						bbsDAO.insertPhoto(vo); // 나머지 파일들도 mdao.insertPhoto로 삽입
					} else {
						System.out.println("Empty file detected");
					}
				}
			} else {
				System.out.println("No files uploaded");
			}
		} catch (Exception e) {
			System.out.println("Attach 파일들 업로드" + e.toString());
		}
	}

	// attach 삭제
	@PostMapping("/attach/delete")
	public int deleteAttach(@RequestBody BBSPhotoVO vo) {
		try {
			// 첫 번째 파일인지 확인
			String mainPhotoPath = bbsDAO.getMainPhoto(vo.getBbsPhoto_bbs_key());
			if (vo.getBbsPhoto_photo().equals(mainPhotoPath)) {
				System.out.println("Main photo cannot be deleted: " + vo.getBbsPhoto_photo());
				return 1; // 삭제 실패를 나타내는 값 (예: 1)
			}
			// 파일 경로 처리
			String displayPath = vo.getBbsPhoto_photo();
			int index = displayPath.indexOf("/bbs/display?file=");
			String relativePath = displayPath.substring(index + "/bbs/display?file=".length());

			// 현재 작업 디렉토리 확인
			String currentDir = System.getProperty("user.dir");
			String filePath = currentDir + File.separator + "BBSUpload" + File.separator + relativePath;

			// 파일 자체를 삭제
			File file = new File(filePath);
			if (file.exists()) {
				file.delete();
				System.out.println("Deleted file: " + filePath);
			}
			// DB에서 삭제
			bbsDAO.deleteAttach(vo.getBbsPhoto_key());

			return 0; // 삭제 성공을 나타내는 값 (예: 0)

		} catch (Exception e) {
			System.out.println("첨부파일삭제:" + e.toString());
			return 1; // 삭제 실패를 나타내는 값 (예: 1)
		}
	}

	@GetMapping("/attach/list/{bbs_key}")
	public List<HashMap<String, Object>> listMallPhoto(@PathVariable("bbs_key") String bbs_key) {
		return bbsDAO.listMallPhoto(bbs_key);
	}

	// 1장의 파일 업로드하기
	@PostMapping("/attachOne/{bbs_key}")
	public void attachOne(@PathVariable("bbs_key") String bbsPhoto_bbs_key, MultipartHttpServletRequest multi) {
		try {
			String relativePath = "BBSUpload/" + bbsPhoto_bbs_key + "/";
			String currentDir = System.getProperty("user.dir");
			String uploadPath = currentDir + File.separator + relativePath;

			File folder = new File(uploadPath);
			if (!folder.exists()) {
				folder.mkdirs(); // 폴더가 없으면 모든 부모 디렉토리까지 생성
			}

			MultipartFile file = multi.getFile("byte");
			if (file != null && !file.isEmpty()) {
				String fileName = UUID.randomUUID().toString() + ".jpg";
				File destFile = new File(uploadPath, fileName);
				file.transferTo(destFile);
				System.out.println("Uploaded file: " + fileName);

				// 이미지 경로 설정 및 DB 삽입
				BBSPhotoVO vo = new BBSPhotoVO();
				vo.setBbsPhoto_bbs_key(Integer.parseInt(bbsPhoto_bbs_key));
				vo.setBbsPhoto_photo("/bbs/display?file=" + bbsPhoto_bbs_key + "/" + fileName);

				// 이미지 정보 DB에 삽입
				bbsDAO.insertPhoto(vo);
			} else {
				System.out.println("No file uploaded or file is empty");
			}
		} catch (Exception e) {
			System.out.println("Attach 파일 업로드 오류: " + e.toString());
		}
	}

	// 대표사진 수정
	@PostMapping("/update/mainPhoto")
	public void updateMainPhoto(@RequestBody BBSPhotoVO vo) {
		bbsDAO.updateMainPhoto(vo);
	}

	// 사진순서 수정
	@PostMapping("/update/photo")
	public void updatePhoto(@RequestBody BBSPhotoVO vo) {
		bbsDAO.updatePhoto(vo);
	}

	@GetMapping("/display") // 테스트 /diary/display?file=파일이름
	public ResponseEntity<Resource> display(@RequestParam("file") String file) {
		try {
			// 상대경로를 절대경로로 변환하여 Resource 생성
			String relativePath = "BBSUpload/";
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