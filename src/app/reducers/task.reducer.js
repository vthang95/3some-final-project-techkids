export default function(state = [], action) {
  switch (action.type) {
    case 'FETCH_TASK':
      console.log("fetch task");
      return action.payload.data
      break;
    default:

  }
  return state;
}
