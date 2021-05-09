package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.service;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.MonitoredDataDTO;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.builder.MonitoredDataBuilder;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.MonitoredData;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Patient;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.repository.MonitoredDataRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class MonitoredDataService {
    private static final Logger LOGGER = LoggerFactory.getLogger(MonitoredDataService.class);
    public final MonitoredDataRepository monitoredDataRepository;

    @Autowired
    public MonitoredDataService(MonitoredDataRepository monitoredDataRepository) {
        this.monitoredDataRepository = monitoredDataRepository;
    }

    public UUID insertMonitoredData(MonitoredDataDTO monitoredDataDTO, Patient patient) {
        MonitoredData monitoredData = MonitoredDataBuilder.toEntity(monitoredDataDTO, patient);
        monitoredData = monitoredDataRepository.save(monitoredData);
        LOGGER.debug("MonitoredData with id {} was inserted in db", monitoredData.getId());
        return monitoredData.getId();
    }
}
