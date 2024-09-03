package com.example.controller.mall;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.example.dao.mall.MallDAO;
import com.example.domain.MallPhotoVO;
import com.example.domain.MallVO;
import com.example.domain.Query2VO;
import com.example.domain.QueryVO;
import com.example.service.mall.MallService;

@RestController
@RequestMapping("/mall")
public class MallController {

	@Autowired
	MallDAO mdao;
	@Autowired
	MallService mservice;

	@GetMapping("/buy/{review_writer}")
	public  HashMap<String, Object> buyList (@PathVariable("review_writer") String review_writer,QueryVO vo){
		HashMap<String, Object> map = new HashMap<>();
		List<HashMap<String, Object>> list = mdao.buyList( review_writer,vo);
		map.put("documents", list);
		map.put("total", mdao.buyListTotal( review_writer,vo));
		return map;
	}
	
	@GetMapping("/review/{review_writer}")
	public  HashMap<String, Object> reviewList (@PathVariable("review_writer") String review_writer,QueryVO vo){
		HashMap<String, Object> map = new HashMap<>();
		List<HashMap<String, Object>> list = mdao.reviewList( review_writer,vo);
		map.put("documents", list);
		map.put("total", mdao.reviewListTotal( review_writer,vo));
		return map;
	}
	
	@GetMapping("/reviewCount")
	public  List<HashMap<String, Object>> reviewCount (){
		return mdao.reviewCount();
	}
	
	@GetMapping("/reviewCount/{mall_key}")
	public  HashMap<String, Object> reviewCount2 (@PathVariable("mall_key") int mall_key){
		return mdao.reviewCount2(mall_key);
	}
	
	@GetMapping("/list")
	public HashMap<String, Object> list(Query2VO vo) {
		HashMap<String, Object> map = new HashMap<>();
		List<HashMap<String, Object>> list = mdao.list(vo);
		map.put("documents", list);
		map.put("total", mdao.total(vo));
		return map;
	}
	
	@GetMapping("/list/{mall_seller}")
	public HashMap<String, Object> sellerList (@PathVariable("mall_seller") String mall_seller, QueryVO vo){
		HashMap<String, Object> map = new HashMap<>();
		List<HashMap<String, Object>> list = mdao.sellerList(mall_seller,vo);
		map.put("documents", list);
		map.put("total", mdao.sellerListTotal(mall_seller));
		return map;
	}

	@PostMapping("/insert")
	public int insert(@RequestBody MallVO vo) {
		mdao.insertInfo(vo); // 데이터베이스에 삽입
		int lastInsertId = mdao.getLastInsertId(); // 마지막 삽입된 자동 생성 키를 가져옴
		return lastInsertId; // 클라이언트에게 반환
	}

	@GetMapping("/read/{mall_key}")
	public HashMap<String, Object> read(@PathVariable("mall_key") int mall_key) {
		return mdao.read(mall_key);
	}

	@PostMapping("/update")
	public void update(@RequestBody MallVO vo) {
		mdao.update(vo);
	}
	
	@PostMapping("/updateEndDate/{mall_key}")
	public void updateEndDate(@PathVariable("mall_key") int mall_key) {
		mdao.updateEndDate(mall_key);
	}


	@PostMapping("/delete/{mall_key}")
	public void delete(@PathVariable("mall_key") int mall_key) {
		mdao.delete(mall_key);
	}

	// Attach 파일들 업로드
	@PostMapping("/attach/{mallPhoto_mall_key}")
	public void attach(@PathVariable("mallPhoto_mall_key") String mallPhoto_mall_key,
			MultipartHttpServletRequest multi) {
		try {
			String relativePath = "upload/" + mallPhoto_mall_key + "/";
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
						MallPhotoVO vo = new MallPhotoVO();
						vo.setMallPhoto_mall_key(Integer.parseInt(mallPhoto_mall_key));
						vo.setMallPhoto_photo("/display?file=" + mallPhoto_mall_key + "/" + fileName);
						vo.setMallPhoto_sequence(i);
						
						// 첫 번째 파일은 mdao.insertMainPhoto와 mdao.insertPhoto 둘 다로 삽입
						if (i == 0) {
							mdao.insertMainPhoto(Integer.parseInt(mallPhoto_mall_key), vo.getMallPhoto_photo());
						}
						mdao.insertPhoto(vo); // 나머지 파일들도 mdao.insertPhoto로 삽입
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
	public int deleteAttach(@RequestBody MallPhotoVO vo) {
		try {
			// 첫 번째 파일인지 확인
			String mainPhotoPath = mdao.getMainPhoto(vo.getMallPhoto_mall_key());
			if (vo.getMallPhoto_photo().equals(mainPhotoPath)) {
				System.out.println("Main photo cannot be deleted: " + vo.getMallPhoto_photo());
				return 1; // 삭제 실패를 나타내는 값 (예: 1)
			}
			// 파일 경로 처리
			String displayPath = vo.getMallPhoto_photo();
			int index = displayPath.indexOf("/display?file=");
			String relativePath = displayPath.substring(index + "/display?file=".length());

			// 현재 작업 디렉토리 확인
			String currentDir = System.getProperty("user.dir");
			String filePath = currentDir + File.separator + "upload" + File.separator + relativePath;

			// 파일 자체를 삭제
			File file = new File(filePath);
			if (file.exists()) {
				file.delete();
				System.out.println("Deleted file: " + filePath);
			}
			// DB에서 삭제
			mdao.deleteAttach(vo.getMallPhoto_key());

			return 0; // 삭제 성공을 나타내는 값 (예: 0)

		} catch (Exception e) {
			System.out.println("첨부파일삭제:" + e.toString());
			return 1; // 삭제 실패를 나타내는 값 (예: 1)
		}
	}

	@GetMapping("/attach/list/{mall_key}")
	public List<HashMap<String, Object>> listMallPhoto(@PathVariable("mall_key") String mall_key) {
		int mallPhoto_mall_key = Integer.parseInt(mall_key);
		return mdao.listMallPhoto(mallPhoto_mall_key);
	}

	// 1장의 파일 업로드하기
	@PostMapping("/attachOne/{mall_key}")
	public void attachOne(@PathVariable("mall_key") String mallPhoto_mall_key, MultipartHttpServletRequest multi) {
		try {
			String relativePath = "upload/" + mallPhoto_mall_key + "/";
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
				MallPhotoVO vo = new MallPhotoVO();
				vo.setMallPhoto_mall_key(Integer.parseInt(mallPhoto_mall_key));
				vo.setMallPhoto_photo("/display?file=" + mallPhoto_mall_key + "/" + fileName);

				// 이미지 정보 DB에 삽입
				mdao.insertPhoto(vo);
			} else {
				System.out.println("No file uploaded or file is empty");
			}
		} catch (Exception e) {
			System.out.println("Attach 파일 업로드 오류: " + e.toString());
		}
	}

	//대표사진 수정
	@PostMapping("/update/mainPhoto")
	public void updateMainPhoto(@RequestBody MallPhotoVO vo) {
		mdao.updateMainPhoto(vo);
	}
	
	//사진순서 수정
	@PostMapping("/update/photo")
	public void updatePhoto(@RequestBody MallPhotoVO vo) {
		mdao.updatePhoto(vo);
	}
}
