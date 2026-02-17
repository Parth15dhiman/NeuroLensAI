package com.neurolensai.backend.kafka;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class KafkaProducer {

    @Value("${app.kafka.topic}")
    private String topicName ;
    @Autowired
    private KafkaTemplate<String , byte[] > kafkaTemplate ;


    public void sendFrame(byte[] imageBytes){
        try{
            kafkaTemplate.send(topicName, imageBytes);
            log.info("Image bytes Sent to topic: {}", topicName);
        } catch (Exception e){
            log.error("error in sending image bytes", e);
        }
    }
}
