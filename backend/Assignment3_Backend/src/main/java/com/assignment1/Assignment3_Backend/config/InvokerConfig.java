package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.config;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.api.DailyMedsService;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.repository.MedicineRepository;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.repository.PatientRepository;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.service.DailyMedsServiceImpl;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.remoting.httpinvoker.HttpInvokerServiceExporter;

@Configuration
@ComponentScan
@EnableAutoConfiguration
public class InvokerConfig {

    private final PatientRepository patientRepository;
    private final MedicineRepository medicineRepository;

    @Autowired
    public InvokerConfig(PatientRepository patientRepository, MedicineRepository medicineRepository) {
        this.patientRepository = patientRepository;
        this.medicineRepository = medicineRepository;
    }

    @Bean(name = "/get_daily_meds")
    HttpInvokerServiceExporter accountService() {
        System.out.println("a intrat");
        HttpInvokerServiceExporter exporter = new HttpInvokerServiceExporter();
        exporter.setService( new DailyMedsServiceImpl(patientRepository, medicineRepository) );
        exporter.setServiceInterface( DailyMedsService.class );
        return exporter;
    }
}
