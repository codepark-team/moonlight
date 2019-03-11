import merge from 'deepmerge'
const isPlainObject = require('is-plain-object')

export const mergeOptions = (defaultOptions, newOptions) => merge(
  defaultOptions,
  newOptions,
  { isMergeableObject: isPlainObject }
);

//创建 scatter 选项
export const createScatterOptions = options => {
  return {
    blockchain: 'eos',
    protocol: options.protocol,
    host: options.host,
    port: options.port,
    chainId: options.chainId
  }
}
