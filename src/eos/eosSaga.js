import { call, put, takeLatest } from 'redux-saga/effects'

import { createScatterOptions } from '../util'

import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import Eos from 'eosjs';

import { ACCOUNTS_ADD } from '../abc/actionNames';

export function* initializeEos({ options }) {
  try {
    let eosApi = {};
    //使用 scatter 钱包初始化
    if (options.wallet === 'scatter') {

      ScatterJS.plugins(new ScatterEOS());

      const network = createScatterOptions(options);
      const scatter = ScatterJS.scatter;
      const requiredFields = { accounts: [network] };

      const connected = yield call(ScatterJS.scatter.connect, options.appName);

      if (!connected) {
        console.error('Initialization ScatterJS fail.');
        return false;
      }

      yield call(scatter.getIdentity, requiredFields);

      const account = scatter.identity.accounts.find(a => a.blockchain === 'eos');

      yield put({ type: ACCOUNTS_ADD ,account});

      const eosOptions = { expireInSeconds: 60 };
      eosApi = scatter.eos(network, Eos, eosOptions);

      yield put({ type: 'EOS_INITIALIZING' });
      
      return eosApi;
    }

  } catch (error) {
    yield put({ type: 'EOS_FAILED', error });
    console.error('Error intializing eos:');
    console.error(error);
  }
}
