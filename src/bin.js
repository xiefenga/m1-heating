#!/usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import createHeater from './heater.js'
import {
  DEFAULT_THREAD_NUM,
  DEFAULT_MIN_TEMPERATURE,
  DEFAULT_DETECT_INTERVAL,
  DEFAULT_MAX_TEMPERATURE
} from './constants.js'

const { argv } = yargs(hideBin(process.argv))

const {
  thread = DEFAULT_THREAD_NUM,
  min = DEFAULT_MIN_TEMPERATURE,
  max = DEFAULT_MAX_TEMPERATURE,
  interval = DEFAULT_DETECT_INTERVAL,
} = argv

const heater = createHeater(parseInt(min), parseInt(max), thread, interval)

heater.heat()

