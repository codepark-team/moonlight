import { generateStore } from './generateStore'

// Load as promise so that async MoonLight initialization can still resolve
const isEnvReadyPromise = new Promise((resolve, reject) => {
  const hasWindow = typeof window !== 'undefined';
  const hasDocument = typeof document !== 'undefined';

  if (hasWindow) {
    return window.addEventListener('load', resolve);
  }

  if (hasDocument && document.readyState === `complete`) {
    return resolve();
  }
})

class MoonLight {
  constructor (options, store) {
    this.options = options
    this.store = store || this.generateStore(options)
    this.eosApi = {};

    isEnvReadyPromise.then(() => {
      this.store.dispatch({
        type: 'MOONLIGHT_INITIALIZING_SAGA',
        moonLight: this,
        options
      })
    })
  }

  generateStore (options) {
    return generateStore(options)
  }
}

export default MoonLight
