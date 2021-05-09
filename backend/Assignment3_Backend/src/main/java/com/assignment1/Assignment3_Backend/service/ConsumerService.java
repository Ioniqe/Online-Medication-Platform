package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.service;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.MonitoredDataDTO;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.PersonDTO;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Patient;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.ReceivedMonitoredData;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@Component
public class ConsumerService {

    private final PersonService personService;
    private final PatientService patientService;
    private final MonitoredDataService monitoredDataService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    public ConsumerService(PersonService personService, SimpMessagingTemplate simpMessagingTemplate, PatientService patientService, MonitoredDataService monitoredDataService) {
        this.personService = personService;
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.patientService = patientService;
        this.monitoredDataService = monitoredDataService;
    }

    @RabbitListener(queues = "activity-queue")
    public void receive(String in) throws InterruptedException, JsonProcessingException {
        ReceivedMonitoredData data = new ObjectMapper().readValue(in, ReceivedMonitoredData.class);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        long activityPeriod = LocalDateTime.parse(data.getStart(), formatter).until(LocalDateTime.parse(data.getEnd(), formatter), ChronoUnit.MINUTES);

        UUID personId = UUID.fromString(data.getPatient_id());
        PersonDTO personDTO = personService.getPersonDTOById(personId);

        String message = "";

        switch (data.getActivity()) {
            case "Sleeping":
                if (activityPeriod > 420) {
                    message = "slept more that 7 hours";
                }
                break;
            case "Leaving":
                if (activityPeriod > 300) {
                    message = "left for more that 5 hours";
                }
                break;
            case "Toileting":
                if (activityPeriod > 30) {
                    message = "has been in bathroom toileting for more that 30 minutes";
                }
                break;
            case "Grooming":
                if (activityPeriod > 30) {
                    message = "has been in bathroom grooming for more that 30 minutes";
                }
                break;
            case "Showering":
                if (activityPeriod > 30) {
                    message = "has been in bathroom showering for more that 30 minutes";
                }
                break;
            default:
                message = "";
                break;
        }

        Patient patient = patientService.getPatientByPersonId(personId);
        MonitoredDataDTO monitoredDataDTO = new MonitoredDataDTO(data.getActivity(), data.getStart(), data.getEnd(), message != "");
        UUID monitoredDataId = monitoredDataService.insertMonitoredData(monitoredDataDTO, patient);


        if (message != "") {
            System.out.println("MESSAGE: " + message);
            String toBeSent = "{\"personId\"" + ":" + "\"" + personDTO.getId() + "\"" + "," + "\"message\"" + ":" + "\"" + personDTO.getFirstname() +
                    " " + personDTO.getLastname() + " " + message + "\"}";
            simpMessagingTemplate.convertAndSend("/topic/app", toBeSent);
        }

    }

}
