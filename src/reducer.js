import accountsReducer from './accounts/accountsReducer'
import accountResourcesReducer from './accountResources/accountResourcesReducer'

export const moonLightReducers = {
    accounts: accountsReducer,
    accountResources: accountResourcesReducer
}

const reducer = combineReducers(moonLightReducers);

export default reducer;