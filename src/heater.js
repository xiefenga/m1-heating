import { resolve } from 'node:path'
import { Worker } from 'node:worker_threads'

import { SYSTEM_CORES, logger, SOURCE_DIR } from './constants.js'
import { getCurrentCpuTemperature, logProgram } from './util.js'

export default function createHeater(min, max, threadNum, interval) {

  const cores = SYSTEM_CORES.slice(0, Math.min(threadNum, SYSTEM_CORES.length))

  const workers = []

  let count = 0

  let current = 'ready'

  const getCurrentStatus = (temperature) => {
    return current === 'ready'
      ? temperature > min
        ? '暂时不需要加热'
        : '准备加热'
      : '加热中'
  }

  const startWarm = () => {
    workers.push(...cores.map(() => {
      const worker = new Worker(resolve(SOURCE_DIR, './worker.js'))
      worker.on('message', handleDone)
      worker.on('exit', (_exitCode) => {
        count--
      })
      current = 'warming'
      return worker
    }))
  }

  const stopWarm = () => {
    workers.forEach(worker => worker.terminate())
    workers.splice(0)
    current = 'ready'
  }

  const handleDone = (_message) => {
    if (++count === cores.length) {
      logger.info('开始加热')
    }
  }

  function checkStatus(temperature) {
    if (temperature >= max && current === 'warming') {
      stopWarm()
    } else if (temperature <= min && current === 'ready') {
      startWarm()
    }
  }

  const loop = () => {
    const temperature = getCurrentCpuTemperature()
    const currentStatus = getCurrentStatus(temperature)
    logger.info(`当前温度: ${temperature}°C, 当前状态: ${currentStatus}...`)
    checkStatus(temperature)
  }

  return {
    heat() {
      console.clear()
      logProgram(min, max, interval, cores.length)
      loop()
      setInterval(loop, interval * 1000)
    },
  }
}




