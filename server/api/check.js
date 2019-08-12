import fs from 'fs'
import Router from 'koa-router'
const check = new Router()

// /check
check.get('/', async (ctx, next) => {
  try {
    await fs.promises.readFile('/aegicloud/conf/user.conf')
  } catch (error) {
    ctx.response.status = -102
    await next()
    return
  }
  if (!ctx.isLogin) {
    ctx.response.status = -100
    await next()
    return
  }
  ctx.response.status = 200
  if (global.server) {
    ctx.response.body.isRunning = true
  } else {
    ctx.response.body.isRunning = false
  }
  ctx.response.body.filename = global.data.conf.filename
  await next()
})

export default check
