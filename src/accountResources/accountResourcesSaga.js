import { call, put, select, takeLatest } from 'redux-saga/effects'

import { ACCOUNT_RESOURCES_FETCH_SAGA, ACCOUNT_RESOURCES_FETCHED } from '../abc/actionNames'

const getAccountsState = state => state.accounts

export function* getAccountResources(action) {
  const accounts = yield select(getAccountsState);

  const eosApi = action.eosApi;

  if (!accounts) {
    console.error('No accounts found while attempting to fetch resources!');
  }

  try {
    for (const account in accounts) {

      const accountName = accounts[account]
      const result = yield call(eosApi.getAccount, accountName)

      const accountResources = {};

      accountResources['available'] = result['core_liquid_balance'];

      accountResources['ram_used'] = result['ram_usage'];
      accountResources['ram_max'] = result['ram_quota'];

      const net_limit = result['net_limit'];
      accountResources['net_used'] = net_limit['used'];
      accountResources['net_max'] = net_limit['max'];

      const cpu_limit = result['cpu_limit'];
      accountResources['cpu_used'] = cpu_limit['used'];
      accountResources['cpu_max'] = cpu_limit['max'];

      //   //赎回中
      //   refunding:"0.0000 EOS",
      //   //CPU Staked
      //   stakedCPU:"0.0000 EOS",
      //   //NET Staked
      //   stakedNET:"0.0000 EOS",
      //   //有他人质押
      //   stakedByOthers:"0.0000 EOS",

      yield put({ type: ACCOUNT_RESOURCES_FETCHED, account, accountResources })
    }
  } catch (error) {
    yield put({ type: 'ACCOUNT_RESOURCES_FAILED', error })
    console.error('Error fetching account ' + account + ' balance:')
    console.error(error)
  }

  yield put({ type: 'ACCOUNT_RESOURCES_FETCHED' })
}

function* accountResourcesSaga() {
  yield takeLatest(ACCOUNT_RESOURCES_FETCH_SAGA, getAccountResources)
}

export default accountResourcesSaga
