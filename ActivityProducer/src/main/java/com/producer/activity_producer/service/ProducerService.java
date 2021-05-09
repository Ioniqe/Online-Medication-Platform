package com.producer.activity_producer.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.producer.activity_producer.entity.MonitoredData;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class ProducerService {

    String exchange = "activity-queue-exchange";
    private String routingkey = "activity-queue-key";

    List<MonitoredData> contents;
    private int line;

    @Autowired
    private AmqpTemplate rabbitTempl;

    private static List<MonitoredData> getMonitoredData() throws IOException {
        Stream<String> activities = Files.lines(Paths.get("src/main/java/com/producer/activity_producer/activity.txt"));
        List<MonitoredData> contents = activities
                .map(e -> e.split("\t\t"))
                .map(array -> new MonitoredData(array[0], array[3], array[1], array[2]))
                .collect(Collectors.toList());
        activities.close();
        return contents;
    }

    public ProducerService() throws IOException {
        this.contents = getMonitoredData();
        this.line = 0;
    }

    @Scheduled(fixedDelay = 1000) //, initialDelay = 3000
    public void send() {
        ObjectMapper mapper = new ObjectMapper();
        if (line < contents.size()) {
            try {
                String toBeSent = mapper.writeValueAsString(contents.get(line));
                rabbitTempl.convertAndSend(exchange, routingkey, toBeSent);
                System.out.println(toBeSent);
                line++;
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
        }
    }
}
