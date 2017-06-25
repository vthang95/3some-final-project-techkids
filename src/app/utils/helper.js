export const getHostName = () => `https://localhost:48017`;
export const getUserId = () => {
  let user_id = localStorage.getItem('user_id');
  return user_id;
};
