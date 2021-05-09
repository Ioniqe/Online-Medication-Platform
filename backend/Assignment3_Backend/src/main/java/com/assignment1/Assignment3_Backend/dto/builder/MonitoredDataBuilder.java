package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.builder;

import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.dto.MonitoredDataDTO;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.MonitoredData;
import com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.entity.Patient;

public class MonitoredDataBuilder {
    public MonitoredDataBuilder() {
    }

    public static MonitoredData toEntity(MonitoredDataDTO monitoredDataDTO, Patient patient){
        return new MonitoredData(patient, monitoredDataDTO.getActivity(), monitoredDataDTO.getStartTime(), monitoredDataDTO.getEndTime(), monitoredDataDTO.isAnomalous());
    }
}
