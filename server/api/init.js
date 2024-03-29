const Router = require('koa-router')
const coreInit = require('../core/index')
const init = new Router()

// /init
init.post('/', async (ctx, next) => {
  if (!ctx.isLogin) {
    ctx.response.status = 403
    await next()
    return
  }
  if (global.server) {
    try {
      await global.server.close()
    } catch (error) {}
    try {
      global.liveSchedule.cancel()
    } catch (error) {}
    global.server = null
  }
  if (ctx.request.body.filename) {
    ctx.response.status = 200
    global.data.conf.filename = ctx.request.body.filename
    await coreInit()
    await next()
  } else {
    ctx.response.status = 400
    await next()
  }
})

module.exports = init
