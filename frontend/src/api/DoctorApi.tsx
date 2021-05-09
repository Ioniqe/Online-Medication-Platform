import { url } from "../model/models"
import { securityToken } from "../utils/securityToken"

export const getPeopleAPI = (personId: string) => {
  return fetch(`${url}/patients_details/doctor/${personId}`, {
    method: 'GET',
    headers: {
      'Authorization': securityToken(),
    },
  }).then(response => response.json())
}
