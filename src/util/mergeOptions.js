import merge from 'deepmerge'
const isPlainObject = require('is-plain-object')

export default (defaultOptions, newOptions) => merge(
  defaultOptions,
  newOptions,
  { isMergeableObject: isPlainObject }
);