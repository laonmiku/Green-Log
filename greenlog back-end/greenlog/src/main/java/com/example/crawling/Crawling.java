package com.example.crawling;

import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/crawl")
public class Crawling {

	@GetMapping("/article")
	public String getArticleData() throws Exception {
		Document doc = Jsoup.connect("https://www.gihoo.or.kr/menu.es?mid=a10101000000").get(); // 원하는 웹 페이지 URL로 변경

		String title = doc.select("h3.label strong").text();
		String subtitle = doc.select("h3.label span").text();
		Elements paragraphs = doc.select("div.txt p");
		Elements items = doc.select("div.group ul li");

		StringBuilder response = new StringBuilder();
		response.append("{");
		response.append("\"title\": \"" + title + "\",");
		response.append("\"subtitle\": \"" + subtitle + "\",");
		response.append("\"paragraphs\": [");
		for (Element p : paragraphs) {
			response.append("\"" + p.text() + "\",");
		}
		response.deleteCharAt(response.length() - 1); // 마지막 쉼표 제거
		response.append("],");

		response.append("\"items\": [");
		for (Element item : items) {
			String imgSrc = item.select("i img").attr("src");
			String topic = item.select("span").text();
			String temp1 = item.select(".type1").text();
			String temp2 = item.select(".type2").text();
			response.append("{");
			response.append("\"imgSrc\": \"" + imgSrc + "\",");
			response.append("\"topic\": \"" + topic + "\",");
			response.append("\"temp1\": \"" + temp1 + "\",");
			response.append("\"temp2\": \"" + temp2 + "\"");
			response.append("},");
		}
		response.deleteCharAt(response.length() - 1); // 마지막 쉼표 제거
		response.append("]");
		response.append("}");

		return response.toString();
	}

	@GetMapping("/gihoo")
	public List<HashMap<String, Object>> gihoo() {
		List<HashMap<String, Object>> list = new ArrayList<>();
		try {
			Document doc = Jsoup.connect("https://www.gihoo.or.kr/gallery.es?mid=a10302000000&bid=0001").get();
			Elements items = doc.select(".board_list .gallery_list li");

			for (Element item : items) {
				String title = item.select(".desc .title").text();
				String date = item.select(".desc .date").text().replace("Date ", "");
				String href = item.select("a").attr("href");
				String thumbnailSrc = item.select(".thumb img").attr("src");

				HashMap<String, Object> map = new HashMap<>();
				map.put("title", title);
				map.put("date", date);
				map.put("href", "https://www.gihoo.or.kr/" + href);
				map.put("img", "https://www.gihoo.or.kr/" + thumbnailSrc);

				list.add(map);
			}
		} catch (Exception e) {
			System.out.println("Greenpeace crawling error: " + e.toString());
		}
		return list;
	}

	@GetMapping("/greenpeace")
	public List<HashMap<String, Object>> greenpeace() {
		List<HashMap<String, Object>> list = new ArrayList<>();
		try {
			Document doc = Jsoup.connect("https://www.greenpeace.org/korea/").get();
			Elements activities = doc.select(".swiper-wrapper .action.as-card");

			// 각 활동 카드에 대해 정보를 추출
			for (Element activity : activities) {
				String title = activity.select(".content h3").text();
				String content = activity.select(".content p").text();
				String imageUrl = activity.select(".thumbnail img").attr("src");
				String applyUrl = activity.select(".content a.button").attr("href");

				HashMap<String, Object> map = new HashMap<>();
				map.put("title", title);
				map.put("imageUrl", imageUrl);
				map.put("content", content);
				map.put("link", applyUrl);

				list.add(map);
			}
		} catch (Exception e) {
			System.out.println("Greenpeace crawling error: " + e.toString());
		}
		return list;
	}

	@PostMapping("/cgv/download") // 테스트 /crawl/cgv/download?imag=http://~
	public void download(@RequestParam("image") String image) {
		try {
			URL url = new URL(image);
			InputStream in = url.openStream();
			FileOutputStream out = new FileOutputStream("c:/download/poster/" + System.currentTimeMillis() + ".jpg");
			FileCopyUtils.copy(in, out);

		} catch (Exception e) {
			System.out.println(" 이미지 다운로드" + e.toString());
		}
	}

	@GetMapping("/hkbs")
	public List<HashMap<String, Object>> hkbs() {
		List<HashMap<String, Object>> list = new ArrayList<>();
		try {
			Document doc = Jsoup.connect("https://www.hkbs.co.kr/").get();
			Elements items = doc.select("#skin-11 .item");
			for (Element item : items) {
				String title = item.select("a").text();
				String link = item.select("a").attr("href");
				HashMap<String, Object> map = new HashMap<>();
				if (title != "") {
					map.put("title", title);
					map.put("link", "https://www.hkbs.co.kr" + link);
					list.add(map);
				}
			}
		} catch (Exception e) {
			System.out.println("cgv오류" + e.toString());
		}
		return list;
	}
}
