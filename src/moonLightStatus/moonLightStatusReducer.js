const initialState = {
  initialized: false
}

const moonLightStatusReducer = (state = initialState, action) => {

  if (action.type === 'MOONLIGHT_INITIALIZED') {
    return {
      ...state,
      initialized: true
    }
  }
  return state
}

export default moonLightStatusReducer
