package com.producer.activity_producer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ActivityProducerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ActivityProducerApplication.class, args);
    }

}
