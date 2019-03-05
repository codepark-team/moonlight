import { all, fork } from 'redux-saga/effects'

import accountResourcesSaga from './accountResources/accountResourcesSaga'

export const moonLightSagas = [
  accountResourcesSaga
]

export default function* root() {
  yield all(moonLightSagas.map(s => fork(s)));
}
