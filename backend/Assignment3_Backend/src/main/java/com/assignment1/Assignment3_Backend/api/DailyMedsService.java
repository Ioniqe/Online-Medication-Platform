package com.assignment1.DS2020_30441_Bozdog_Ioana_Assignment_3.api;

import java.util.List;
import java.util.UUID;

public interface DailyMedsService {
    DailyMeds getDailyMeds(UUID id) throws DailyMedsException;
    String setMedTaken(UUID id, String name);
    String setMedNotTaken(List<DailyMed> meds);
}
