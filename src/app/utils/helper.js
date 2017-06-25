export const getHostName = () => `https://ohlist.herokuapp.com`;
export const getUserId = () => {
  let user_id = localStorage.getItem('user_id');
  return user_id;
};
