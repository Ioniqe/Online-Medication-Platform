import { Medication, MedicationWithId, url } from "../model/models"
import { securityToken } from "../utils/securityToken"

export const saveMedicineAPI = (medication: Medication) => {
  return fetch(`${url}/medicine/new`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': securityToken(),
    },
    body: JSON.stringify(medication)
  }).then(response => response.json())
}

export const updateMedicineAPI = (medication: MedicationWithId) => {
  let medicine: Medication = {
    name: medication.name,
    dosage: medication.dosage
  }

  return fetch(`${url}/medicine/update/${medication.id}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': securityToken(),
    },
    body: JSON.stringify(medicine)
  }).then(response => response.json())
}

export const deleteMedicineAPI = (medicineId: string) => {
  return fetch(`${url}/medicine/delete/${medicineId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': securityToken(),
    },
  })
}