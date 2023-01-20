import log4js from 'log4js'
import { cpus } from 'node:os'
import { getDirFileName } from './util.js'

export const DEFAULT_THREAD_NUM = 4

export const DEFAULT_DETECT_INTERVAL = 60

export const DEFAULT_MIN_TEMPERATURE = 30

export const DEFAULT_MAX_TEMPERATURE = 50

export const SYSTEM_CORES = cpus()

log4js.configure({
  appenders: {
    out: {
      type: 'stdout',
      layout: {
        type: 'pattern',
        pattern: '%d{yyyy-MM-dd hh:mm:ss} %m %n',
      },
    },
  },
  categories: { default: { appenders: ['out'], level: 'info' } },
})

export const logger = log4js.getLogger()

const { __dirname } = getDirFileName(import.meta.url)

export const SOURCE_DIR = __dirname
