import { call, put, select, takeLatest } from 'redux-saga/effects'
import defaultOptions from '../defaultOptions'
import { mergeOptions } from '../util'

import { initializeEos } from '../eos/eosSaga'
import { getAccountResources } from '../accountResources/accountResourcesSaga'

function* initializeMoonLight(action) {
  try {
    const options = mergeOptions(defaultOptions, action.options);

    const moonLight = action.moonLight;

    const eosApi = yield call(initializeEos, { options });

    moonLight.eosApi = eosApi;

    yield call(getAccountResources, { eosApi });

  } catch (error) {
    yield put({ type: 'MOONLIGHT_FAILED', error })

    console.error('Error initializing MoonLight:')
    console.error(error)

    return;
  }

  yield put({ type: 'MOONLIGHT_INITIALIZED' })
}

function* moonLightStatusSaga() {
  yield takeLatest('MOONLIGHT_INITIALIZING_SAGA', initializeMoonLight)
}

export default moonLightStatusSaga
