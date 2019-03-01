import MoonLight from './MoonLight'

import * as actionNames from './abc/actionNames'

// Reducers
import accountsReducer from './accounts/accountsReducer'
import accountResourcesReducer from './accountResources/accountResourcesReducer'

// Sagas
import accountResourcesSaga from './accountResources/accountResourcesSaga'

const moonLightReducers = {
  accounts: accountsReducer,
  accountResources: accountResourcesReducer
}

const moonLightSagas = [
  accountResourcesSaga
]

export {
  MoonLight,
  actionNames,
  moonLightReducers,
  moonLightSagas
}
