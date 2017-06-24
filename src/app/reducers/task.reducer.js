import _ from 'lodash';

export default function(state = [], action) {
  switch (action.type) {
    case 'FETCH_TASK':
      return action.payload.data
      break;
    case 'POST_TASK':
      return action.payload.data
    default:

  }
  return state;
}
