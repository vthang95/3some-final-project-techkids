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
  let url = 'http://localhost:7000/api/lists/all/594aabfbfa3bc405fae6b0a3'
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
  console.log(name, listIn);
  let url = `http://localhost:7000/api/tasks`;
  axios.post(url, { name, listIn });
  fetchTasks({ _id: listIn });
}

export function activeList(list) {
  return {
    type: 'ACTIVE_LIST',
    payload: list
  }
}
