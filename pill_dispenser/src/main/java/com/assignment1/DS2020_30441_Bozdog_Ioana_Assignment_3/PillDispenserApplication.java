package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.api.DailyMedsService;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.controller.DailyMedsController;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PillDispenserApplication {
    public static void main(String[] args){
        DailyMedsService service = SpringApplication.run(PillDispenserApplication.class, args).getBean(DailyMedsService.class);
        DailyMedsController dailyMedsController = new DailyMedsController(service);
    }
}
