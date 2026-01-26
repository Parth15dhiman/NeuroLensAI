package com.neurolensai.backend.kafka;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.neurolensai.backend.dto.DetectionResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class KafkaConsumer {

    private final ObjectMapper objectMapper = new ObjectMapper() ;

    @KafkaListener(topics = "detection-results", groupId = "neurolens-backend-group")
    public void listensDeepfakeResult(String message){
        try{
            DetectionResult result = objectMapper.readValue(message, DetectionResult.class);
            log.info(
                "Detection Results from kafka(AI Model) with score :{} and label: {} ",
                    result.getScore(), result.getLabel()
            );
        } catch (Exception e){
            log.error("Error parsing AI detection result from kafka: {}", e.getMessage() );
        }
    }
}
