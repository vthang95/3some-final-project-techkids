export const getHostName = () => 'http://localhost:7000';
export const getUserId = () => {
  let user_id = localStorage.getItem('user_id');
  return user_id;
};
