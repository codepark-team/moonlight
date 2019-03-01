import { ACCOUNTS_ADD } from '../abc/actionNames';

const initialState = {}

const accountsReducer = (state = initialState, action) => {
  if (action.type === ACCOUNTS_ADD) {
    return Object.assign({}, state, action.account)
  }

  return state
}

export default accountsReducer
