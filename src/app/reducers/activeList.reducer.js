export default function(state = {}, action) {
  switch (action.type) {
    case 'ACTIVE_LIST':
      return action.payload
      break;
    default:

  }
  return state;
}
