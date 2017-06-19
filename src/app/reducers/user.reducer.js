export default function(state = {}, action) {
  switch (action.type) {
    case 'FETCH_USER':
      return action.payload.data
      break;
    default:

  }
  return state;
}
