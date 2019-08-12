import fs from 'fs'
import Router from 'koa-router'
const check = new Router()

// /check
check.post('/', async (ctx, next) => {
  try {
    await fs.promises.readFile('/aegicloud/conf/user.conf', {
      flag: 'w'
    })
  } catch (error) {
    ctx.response.status = 405
    await next()
    return
  }
  if (!ctx.isLogin) {
    ctx.response.status = 403
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
  ctx.response.body.list = await fs.promises.readdir('/aegicloud/projects/')
  await next()
})

module.exports = check
