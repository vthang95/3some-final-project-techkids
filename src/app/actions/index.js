import axios from 'axios';

// TODO: use constant file

export function fetchUser() {
  let url = 'http://localhost:7000/api/workspace';
  let response = axios.get(url);
  return {
    type: 'FETCH_USER',
    payload: response
  }
}
