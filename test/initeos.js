const eosjs = require('eosjs');
const { TextDecoder, TextEncoder } = require('text-encoding');

const TestNet = {
  httpEndpoint: 'http://jungle2.cryptolions.io:80',
  chainId: 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473',
};

/** 
 * @constant
 * @type {string}
 * @default
 */
const _accountNamePeony = 'peonytest521';//peony
const _accountNameDily = 'egttothemoon';//dily

const _accountPeony = [
  'EOS7vY3kVxa4AZXzS2rXUohFn8adU6VdsknKWFXeg66L8vWW6PrPQ',//active
  '5J77q8zLXQtq5RWC4cBhJWD3sYUsqrfFgrDpspPCNneL7JyaVGu',
  'EOS7vY3kVxa4AZXzS2rXUohFn8adU6VdsknKWFXeg66L8vWW6PrPQ',//owner
  '5J77q8zLXQtq5RWC4cBhJWD3sYUsqrfFgrDpspPCNneL7JyaVGu'
];

const _accountDily = [
  'EOS7EzCEh94uN2k59wznzsZDcFVnpZ3wuiYvPSbb8bXDS6U7twKQF',//active
  '5JKrSzsuztAPvTzghi9VU4522sT49SeE3XVHbB8HsfC3ikifJRf',
  'EOS7EzCEh94uN2k59wznzsZDcFVnpZ3wuiYvPSbb8bXDS6U7twKQF',//owner
  '5JKrSzsuztAPvTzghi9VU4522sT49SeE3XVHbB8HsfC3ikifJRf'
];

/**
 * 自定义包装 eosjs
 * @class
 * @default
 */
function EosWrap(account = _accountPeony, permission = 'active', network = TestNet) {

  this._eosType = 'eos';
  this._eosSymbol = 'EOS';
  this._eosChainId = network.chainId;

  this._accountName = _accountNamePeony;

  this._eosEcc = null;

  /**
   * @type {eosjs.Api}
   */
  this._eosApi = null;

  let eosOption = {
    httpEndpoint: network.httpEndpoint,
    chainId: network.chainId,
    keyProvider: permission === 'active' ? account[1] : account[3],
    expireInSeconds: 60,
    broadcast: true
  };

  const rpc = new eosjs.JsonRpc(network.httpEndpoint);
  const signatureProvider = new eosjs.JsSignatureProvider([eosOption.keyProvider]);
  this._eosApi = new eosjs.Api({ rpc, signatureProvider, chainId: network.chainId, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
}

/**
 * 初始化
 * @param 
 */
EosWrap.prototype.init = function () {

}

EosWrap.prototype.getInfo = async function () {
  return await this._eosApi.rpc.get_info();
}

/** 
 * @method
 * @param {string} accountName
 * @returns {any}
 */
EosWrap.prototype.getAccount = async function (accountName) {
  let account = await this._eosApi.rpc.get_account(accountName);
  return account;
}

/** 
 * @method
 * @param {string} accountName 
 */
EosWrap.prototype.getAccountBalance = async function (accountName) {
  return await this._eosApi.rpc.get_table_rows({
    code: 'eosio.token',
    scope: accountName,
    table: 'accounts',
    limit: 100,
    json: true,
  });
}

/** 
 * @method
 * @param {string} toAccount //转账到的账户
 * @param {string} amount //数量
 * @param {string} memo //留言
 * @param {string} code @default
 * @returns {any}
 */
EosWrap.prototype.transfer = async function (toAccount, amount, memo, code = 'eosio.token') {
  let jsonData = {
    actions: [
      {
        account: 'peonytest521',
        name: 'transfer',
        authorization: [
          {
            actor: this._accountName,
            permission: 'active',
          },
        ],
        data: {
          from: this._accountName,
          to: toAccount,
          quantity: `${amount} EGT`,
          memo: memo,
        }
      }
    ]
  };

  return await this._eosApi.transact(jsonData, {
    blocksBehind: 3,
    expireSeconds: 30,
  });
}

/** 
 * @method
 * @param {string} account 
 * @param {number} pos @default
 * @param {number} offset @default
 * @returns {any}
 */
EosWrap.prototype.gethistoryActions = async function (account, pos = -1, offset = -1) {
  return await this._eosApi.rpc.history_get_actions(account, pos, offset);
}

/** 
 * 获取指定 token 余额
 * @method
 * @param {string} account 
 * @param {string} code @default
 * @returns {any}
 */
EosWrap.prototype.tokenBalance = async function (account, code = 'eosio.token') {
  return await this._eosApi.rpc.get_currency_balance('eosplaytoken', account, 'EPT');
  // return await this._eosApi.rpc.get_currency_balance('egretiatoken', account, 'EGT');
}

/** 
 * @method
 * @param {string} symbol 
 * @param {string} code @default
 * @returns {any}
 */
EosWrap.prototype.tokenStats = async function (symbol, code = 'eosio.token') {
  return await this._eosApi.rpc.get_currency_stats('egretiatoken', symbol);
}

EosWrap.prototype.getContract = async function (account) {
  return await this._eosApi.getContract(account);
}

EosWrap.prototype.getCode = async function (account) {
  return await this._eosApi.rpc.get_code(account);
}

exports = module.exports = { EosWrap }

