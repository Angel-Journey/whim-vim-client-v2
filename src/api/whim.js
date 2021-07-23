import apiUrl from '../apiConfig'
import axios from 'axios'

export const createWhim = (whim, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/whims',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      whim: {
        title: whim.title,
        location: whim.location,
        body: whim.body
      }
    }
  })
}

export const indexWhims = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/whims',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const deleteWhim = (user, id) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + '/whims/' + id,
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const updateWhim = (user, id, title, location, body) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + '/whims/' + id,
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      whim: {
        title: title,
        location: location,
        body: body
      }
    }
  })
}
