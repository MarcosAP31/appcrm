package com.apirestful.crm.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/images")
public class ImageController {
	private final String uploadPath = "src/main/resources/static/images/";

	@GetMapping("/{imageName:.+}")
	@ResponseBody
	public ResponseEntity<byte[]> getImage(@PathVariable String imageName) throws IOException {
		Path imagePath = Path.of(uploadPath, imageName);
		byte[] imageBytes = Files.readAllBytes(imagePath);
		return ResponseEntity.ok().contentType(MediaType.IMAGE_PNG).body(imageBytes);
	}

	@DeleteMapping("/delete/{imageName:.+}")
	public ResponseEntity<String> deleteImage(@PathVariable String imageName) {
		try {
			Path imagePath = Path.of(uploadPath, imageName);
			Files.delete(imagePath);
			return ResponseEntity.ok("Image deleted: " + imageName);
		} catch (IOException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting image");
		}
	}

	@PostMapping("/upload")
	public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
		if (file.isEmpty()) {
			return ResponseEntity.badRequest().body("File is empty");
		}

		try {
			// String fileName = UUID.randomUUID().toString() + "_" +
			// file.getOriginalFilename();
			/*
			 * LocalDateTime date = LocalDateTime.now(); DateTimeFormatter formatter =
			 * DateTimeFormatter.ofPattern("yyyy-MM-ddHHmmss"); String
			 * dateformatter=date.format(formatter);
			 */
			String fileName = file.getOriginalFilename();
			Path filePath = Path.of(uploadPath, fileName);

			Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

			String imageUrl = "/images/" + fileName;
			return ResponseEntity.ok("Image uploaded at: " + imageUrl);
		} catch (IOException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading image");
		}
	}
}
