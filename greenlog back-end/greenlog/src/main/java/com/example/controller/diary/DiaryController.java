package com.example.controller.diary;

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

import com.example.dao.diary.DiaryDAO;
import com.example.domain.DiaryLikeVO;
import com.example.domain.DiaryPhotoVO;
import com.example.domain.DiaryVO;
import com.example.domain.QueryVO;
import com.mysql.cj.Session;

@RestController
@RequestMapping("/diary")
public class DiaryController {
	@Autowired
	DiaryDAO dao;

	@PostMapping("/insert")
	public int insert(@RequestBody DiaryVO vo) {
		dao.insert(vo);// 데이터베이스 일기삽입
		int lastInsertId = dao.lastKey(); // 마지막 삽입된 자동 생성 키를 가져옴
		return lastInsertId; // 클라이언트에게 반환
	}

	@GetMapping("/read/{diary_key}")
	public HashMap<String, Object> read(@PathVariable("diary_key") int key, @RequestParam("user_uid") String uid) {
		return dao.read(key, uid);
	}

	@PostMapping("/update")
	public void update(@RequestBody DiaryVO vo) {
		System.out.println(vo);
		dao.update(vo);
	}

	@GetMapping("/list.json/{diary_writer}")
	public HashMap<String, Object> personList(@PathVariable("diary_writer") String uid1,
			@RequestParam("user_uid") String uid2, QueryVO vo) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("documents", dao.personList(uid1, uid2, vo));
		map.put("total", dao.pTotal(uid1));
		return map;
	}

	@GetMapping("/admin/list")
	public List<HashMap<String, Object>> adminList() {
		return dao.adminList();
	}

	@PostMapping("/delete/{diary_key}")
	public void delete(@PathVariable("diary_key") int key) {
		dao.delete(key);
	}

	@PostMapping("/like")
	public void likepress(@RequestBody DiaryLikeVO vo) {
		dao.likePress(vo);
	}

	@PostMapping("/cancel")
	public void likeCancel(@RequestBody DiaryLikeVO vo) {
		dao.likeCancel(vo);
	}

//사진 여러개 삽입
	@PostMapping("/attach/{diaryPhoto_diary_key}")
	public void photoInsert(@PathVariable("diaryPhoto_diary_key") String diaryPhoto_diary_key,
			MultipartHttpServletRequest multi) {
		try {
			String filePath = "diaryUpload/" + diaryPhoto_diary_key + "/";
			String directory = System.getProperty("user.dir");
			String uploadPath = directory + File.separator + filePath;

			File folder = new File(uploadPath);
			if (!folder.exists())
				folder.mkdir();
			List<MultipartFile> files = multi.getFiles("bytes");
			if (!files.isEmpty()) {
				for (int i = 0; i < files.size(); i++) {
					MultipartFile file = files.get(i);

					if (!file.isEmpty()) {
						String fileName = UUID.randomUUID().toString() + ".jpg";
						file.transferTo(new File(uploadPath + fileName));
						System.out.println("Uploaded file: " + fileName);

						DiaryPhotoVO vo = new DiaryPhotoVO();
						vo.setDiaryPhoto_diary_key(Integer.parseInt(diaryPhoto_diary_key));
						vo.setDiaryPhoto_filename("/diary/display?file=" + diaryPhoto_diary_key + "/" + fileName);
						vo.setDiaryPhoto_sequence(i);

						if (i == 0) {
							dao.thumbnail(vo.getDiaryPhoto_diary_key(), vo.getDiaryPhoto_filename());
						}
						dao.photoInsert(vo);

					}
				}
			}
		} catch (

		Exception e) {
			System.out.println("다이어리사진업로드오류:" + e.toString());
		}
	}

	@GetMapping("/display") // 테스트 /diary/display?file=파일이름
	public ResponseEntity<Resource> display(@RequestParam("file") String file) {
		try {
			// 상대경로를 절대경로로 변환하여 Resource 생성
			String relativePath = "diaryUpload/";
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

	// 일기수정시, 원래 사진 가져오기
	@GetMapping("/attach/{diaryPhoto_diary_key}")
	public List<HashMap<String, Object>> photoSelect(@PathVariable("diaryPhoto_diary_key") int diaryPhoto_diary_key) {
		return dao.photoSelect(diaryPhoto_diary_key);
	}

	// 일기사진 한개 삭제
	@PostMapping("/attach/delete")
	public int deleteAttach(@RequestBody DiaryPhotoVO vo) {
		String thumbnailPath = dao.thumbnailSelect(vo.getDiaryPhoto_diary_key());
		System.out.println("....." + thumbnailPath);
		int result = 0;
		if (vo.getDiaryPhoto_filename().equals(thumbnailPath)) {
			return result;
		} else {
			try {
				// 파일 경로 처리
				String displayPath = vo.getDiaryPhoto_filename();
				int index = displayPath.indexOf("/diary/display?file=");
				String relativePath = displayPath.substring(index + "/diary/display?file=".length());

				// 현재 작업 디렉토리 확인
				String currentDir = System.getProperty("user.dir");
				String filePath = currentDir + File.separator + "diaryUpload" + File.separator + relativePath;

				// 파일 자체를 삭제
				File file = new File(filePath);
				if (file.exists()) {
					file.delete();
					System.out.println("Deleted file: " + filePath);
				}
				// DB에서 삭제
				dao.photoDelete(vo.getDiaryPhoto_key());
				result = 1;
				return result;

			} catch (Exception e) {
				System.out.println("첨부파일삭제:" + e.toString());
				return result;
			}

		}
	}

	// 이미지하나삽입
	@PostMapping("/attachOne/{diary_key}")
	public void insertPhoto(@PathVariable("diary_key") int diary_key, MultipartHttpServletRequest multi) {
		try {
			String filePath = "diaryUpload/" + diary_key + "/";
			String directory = System.getProperty("user.dir");
			String uploadPath = directory + File.separator + filePath;

			File oldFile = new File(uploadPath);
			if (oldFile.exists()) {
				oldFile.delete();
			}

			MultipartFile file = multi.getFile("byte");
			if (file != null && !file.isEmpty()) {
				String fileName = UUID.randomUUID().toString() + ".jpg";
				File destFile = new File(uploadPath, fileName);
				file.transferTo(destFile);

				DiaryPhotoVO vo = new DiaryPhotoVO();
				vo.setDiaryPhoto_diary_key(diary_key);
				vo.setDiaryPhoto_filename("/diary/display?file=" + diary_key + "/" + fileName);

				dao.photoInsert(vo);
			}

		} catch (Exception e) {
			System.out.println("이미지하나삽입오류:" + e.toString());
		}

	}

	// 썸네일 업데이트
	@PostMapping("/update/thumbnail")
	public void updateThumbnail(@RequestBody DiaryPhotoVO vo) {
		dao.updateThumbnail(vo);
	}

	@PostMapping("/update/attach")
	public void updatePhoto(@RequestBody DiaryPhotoVO vo) {
		System.out.println("............................." + vo.toString());
		dao.updatePhoto(vo);
	}

	@GetMapping("/lastKey")
	public int lastKey() {
		return dao.lastKey();
	}
	
	@GetMapping("/DiaryTopList/{diary_writer}")
	public List<HashMap<String, Object>> DiaryTopList(@PathVariable("diary_writer") String diary_writer,
			@RequestParam("uid") String user_uid) {
			return dao.DiaryTopList(diary_writer, user_uid);
	}
}
