import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { dirname as getDirname } from 'node:path'
import { execFileSync } from 'node:child_process'

import { SOURCE_DIR } from './constants.js'

export const getDirFileName = (fileURL) => {

  const filename = fileURLToPath(fileURL)

  const dirname = getDirname(filename)

  const base = { filename, dirname }

  const target = Object.keys(base).reduce((memo, prop) => ({ ...memo, [`__${prop}`]: memo[prop] }), base)

  return new Proxy(target, { set: () => true })
}

export const getCurrentCpuTemperature = () => {
  const out = execFileSync(resolve(SOURCE_DIR, '../mac-temperature'))
  const temperature = Number(out.toString())
  return Math.round(temperature)
}

const width = 50

export const logProgram = (min, max, interval, num) => {
  console.log(`
  *${'*'.repeat(width)}*
  *${' '.repeat(Math.floor((width - 7) / 2))}M1 WARM${' '.repeat(Math.ceil((width - 7) / 2))}*
  *${' '.repeat(width)}*
  *   检测间隔: ${`${interval}s`.padEnd(width - 13)}*
  *   加热线程数: ${`${num}`.padEnd(width - 15)}*
  *   加热温度区间: ${`${min}°C ~ ${max}°C`.padEnd(width - 17)}*
  *${' '.repeat(width)}*
  *${'*'.repeat(width)}*
  `)
  // *   停止加热温度: ${`${max}°C`.padEnd(width - 17)}*
  // *   系统线程数: ${`${SYSTEM_CORES.length}`.padEnd(width - 15)}*
}