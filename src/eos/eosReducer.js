const initialState = {
  status: ''
}

const eosReducer = (state = initialState, action) => {
  if (action.type === 'EOS_INITIALIZING') {
    return {
      ...state,
      status: 'initializing'
    }
  }

  return state
}

export default eosReducer
