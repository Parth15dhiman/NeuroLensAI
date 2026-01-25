//package com.neurolensai.backend;
//
//import com.neurolensai.backend.service.KafkaProducerService;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.core.io.ClassPathResource;
//import org.springframework.kafka.core.KafkaTemplate;
//import org.springframework.stereotype.Component;
//
//import java.nio.file.Files;
//
//@Component
//public class KafkaTestRunner implements CommandLineRunner {
//
//    private static final Logger logger = LoggerFactory.getLogger(KafkaTestRunner.class);
//    private final KafkaTemplate<String, byte[]> kafkaTemplate;
//
//    @Autowired
//    private KafkaProducerService producerService ;
//    public KafkaTestRunner(KafkaTemplate<String, byte[]> kafkaTemplate) {
//        this.kafkaTemplate = kafkaTemplate;
//    }
//
//    @Override
//    public void run(String... args) throws Exception {
//        logger.info("Kafka Connection Test Start ho raha hai...");
//        ClassPathResource imgFile = new ClassPathResource("test-frame.jpg");
//
//        if( imgFile.exists() ){
//            byte[] imgBytes = Files.readAllBytes(imgFile.getFile().toPath());
//            producerService.sendFrame(imgBytes);
//            System.out.println("KAFKA TEST: Image loaded and sent successfully!");
//            while(true){
//                producerService.sendFrame(imgBytes);
//                Thread.sleep(1500);
//            }
//        }
//        else{
//            System.out.println("ERROR: test-frame.jpg not found in resources folder!");
//        }
//    }
//}