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

export function fetchLists(user_id) {
  let url = `http://localhost:7000/api/lists/all/${user_id}`
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

export function postTask(task) {
  let { name, listIn } = task;
  let url = `http://localhost:7000/api/tasks`;
  axios.post(url, { name, listIn });
}

export function deleteTask(task) {
  let url = `http://localhost:7000/api/tasks/${task._id}`;
  axios.delete(url);
}

export function activeList(list) {
  return {
    type: 'ACTIVE_LIST',
    payload: list
  }
}
