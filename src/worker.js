import { threadId, parentPort } from 'worker_threads'

parentPort.postMessage({
  threadId,
  status: 'done',
})

// eslint-disable-next-line no-constant-condition
while (true) {
  // 
}