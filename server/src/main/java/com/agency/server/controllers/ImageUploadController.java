package com.agency.server.controllers;

import java.io.IOException;
import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@RestController
@RequestMapping("/api/images")
public class ImageUploadController {

    private Cloudinary cloudinary = new Cloudinary("cloudinary://724581631139569:yWZDQYkklIl1ug2_94GjqjnbqvQ@dntlnmcyo");

    @PostMapping("/upload")
    public Map<String, Object> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            Map<String, Object> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
            return uploadResult;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

     @DeleteMapping("/delete/{publicId}")
    public Map<String, String> deleteImage(@PathVariable("publicId") String publicId) {
        try {
            Map<String, String> deleteResult = cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
            return deleteResult;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}