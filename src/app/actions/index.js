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

export function fetchLists() {
  let url = 'http://localhost:7000/api/lists/getall?userid=592d8a6aa5b7758baaa29df9'
  let response = axios.get(url);
  return {
    type: 'FETCH_LIST',
    payload: response
  }
}

export function fetchTasks(list) {
  let url = `http://localhost:7000/api/tasks/${list._id}`;
  let response = axios.get(url);
  return {
    type: 'FETCH_TASK',
    payload: response
  }
}
