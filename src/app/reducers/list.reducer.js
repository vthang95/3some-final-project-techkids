export default function(state = [], action) {
  switch (action.type) {
    case 'FETCH_LIST':
        console.log(action.payload.data);
      return action.payload.data
      break;
    default:

  }
  return state
}
