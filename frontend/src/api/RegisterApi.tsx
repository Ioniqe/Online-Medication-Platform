import { Person, url } from "../model/models"

export const saveUserAPI = (person: Person) => {
  return fetch(`${url}/doctor/new`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(person)
  }).then(response => response.json())
}