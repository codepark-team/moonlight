import { ACCOUNTS_ADD } from '../abc/actionNames';

export function accountsAdd(account) {
  return {
    type: ACCOUNTS_ADD,
    account
  }
}
