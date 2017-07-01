import axios from 'axios';

import { getHostName } from '../utils/helper';
// TODO: use constant file
export function fetchUser() {
  let url = `${getHostName()}/api/workspace`;
  let response = axios.get(url);
  return {
    type: 'FETCH_USER',
    payload: response
  }
}

export function fetchLists(user_id) {
  let url = `${getHostName()}/api/lists/all/${user_id}`
  let response = axios.get(url);
  return {
    type: 'FETCH_LIST',
    payload: response
  }
}

export function fetchTasks(list) {
  let url = `${getHostName()}/api/tasks/${list._id}`;
  let response = axios.get(url);
  return {
    type: 'FETCH_TASK',
    payload: response
  }
}

export function postTask(task, callback) {
  let { name, listIn } = task;
  let url = `${getHostName()}/api/tasks`;
  axios.post(url, { name, listIn }).then(() => callback());
}

export function postList(list, callback) {
  let { name, owner } = list;
  let url = `${getHostName()}/api/lists`;
  axios.post(url, { name, owner }).then(() => callback());
}

export function deleteList(list, callback) {
  let url = `${getHostName()}/api/lists/${list._id}`
  axios.delete(url).then(() => callback());
}

export function deleteTask(task, callback) {
  let url = `${getHostName()}/api/tasks/${task._id}`;
  axios.delete(url).then(() => callback());
}

export function selectList(list) {
  return {
    type: 'ACTIVE_LIST',
    payload: list
  }
}
