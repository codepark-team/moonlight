import { ACCOUNT_RESOURCES_FETCHED } from '../abc/actionNames'

const initialState = {}

const accountResourcesReducer = (state = initialState, action) => {
  if (action.type === ACCOUNT_RESOURCES_FETCHED) {
    return Object.assign(state, {
      [action.account]: action.accountResources
    })
  }

  return state
}

export default accountResourcesReducer
