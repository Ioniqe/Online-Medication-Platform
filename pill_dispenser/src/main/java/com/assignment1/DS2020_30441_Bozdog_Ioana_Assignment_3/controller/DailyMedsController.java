package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.controller;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.api.DailyMed;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.api.DailyMeds;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.api.DailyMedsException;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.api.DailyMedsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.LocalDateTime;
import java.util.*;

@Controller
public class DailyMedsController {

    private final DailyMedsService service;
    private DailyMeds dailyMeds;
	private String patientId = "id"; //Ross Gellerr (localhost)


    @Autowired
    public DailyMedsController(DailyMedsService service) {
        this.service = service;
        dailyMeds = null;
    }

    @RequestMapping("/")
    public String homePage() throws DailyMedsException {
        if (dailyMeds == null) {
            DailyMeds dailyMeds = service.getDailyMeds(UUID.fromString(patientId));
            this.dailyMeds = dailyMeds;
        }

        return "home";
    }

    @RequestMapping("/daily_meds")
    public String dailyMedsList(Model model) {
        model.addAttribute("medList", dailyMeds.getMeds());
        return "/daily_meds";
    }

    @RequestMapping("/resetList_MedsPastDeadline")
    public String checkMeds(Model model) throws DailyMedsException {
        LocalDateTime lt = LocalDateTime.now();
        List<DailyMed> expiredMeds = new ArrayList<>();

        dailyMeds.getMeds().forEach(med -> {
            if (med.getEndInterval().getHour() <= lt.getHour()) { //a trecut de deadline
                expiredMeds.add(med);
            }
        });

        List<DailyMed> goodMeds = dailyMeds.getMeds();
        goodMeds.removeAll(expiredMeds);
        dailyMeds.setMeds(goodMeds);

        return "redirect:/";
    }

    @RequestMapping("/resetList_NewMedsToTake")
    public String addNewMeds() {
        return "redirect:/";
    }

    @RequestMapping("/resetAtMidnight")
    public String resetAtMidnight() {
        dailyMeds = null;
        return "redirect:/";
    }

    @RequestMapping("/sendMessage")
    public String sendMessage() {
        int hour = LocalDateTime.now().getHour();
        int minute = LocalDateTime.now().getMinute();

        List<DailyMed> expiredMeds = new ArrayList<>();

        dailyMeds.getMeds().forEach(med -> {
            if (med.getEndInterval().getHour() == hour && med.getEndInterval().getMinute() == minute) {
                expiredMeds.add(med);
            }
        });


        if(expiredMeds.size() != 0){
            String serverResponse = service.setMedNotTaken(expiredMeds);
            System.out.println(serverResponse);
        }
        return "redirect:/resetList_MedsPastDeadline";
    }


    @RequestMapping("/taken/{id}")
    public String takenMedicine(@PathVariable(name = "id") UUID id) {
        List<DailyMed> meds = new ArrayList<>();
        final String[] name = new String[1];
        dailyMeds.getMeds().forEach(med -> {
            if (!med.getId().equals(id)) {
                meds.add(med);
            } else {
                name[0] = med.getName();
            }
        });
        dailyMeds.setMeds(meds);

        String serverResponse = service.setMedTaken(id, name[0]);
        System.out.println(serverResponse);
        return "redirect:/daily_meds";
    }

}