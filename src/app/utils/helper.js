import { PORT } from '../../../server.js';

export const getHostName = () => `https://localhost:${PORT}`;
export const getUserId = () => {
  let user_id = localStorage.getItem('user_id');
  return user_id;
};
