package com.neurolensai.backend.controller;

import com.neurolensai.backend.kafka.KafkaProducer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/frames")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.POST, RequestMethod.OPTIONS})
public class FrameController {

    @Autowired
    private KafkaProducer producerService ;

    // FrameController.java
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping(value = "/upload", consumes = "multipart/form-data")
    public ResponseEntity<String> uploadFrame(@RequestParam("file") MultipartFile file) throws IOException {
        producerService.sendFrame(file.getBytes());
        return ResponseEntity.ok("Frame Received!");
    }
}
