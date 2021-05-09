import { url, User } from "../model/models"

export const verifyUserAPI = (user: User) => {
  return fetch(`${url}/login`, { 
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user)
  }).then(response => response.json())
}