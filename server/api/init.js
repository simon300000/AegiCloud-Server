import Router from 'koa-router'
import coreInit from '../core/index'
const init = new Router()

// /init
init.get('/', async (ctx, next) => {
  if (!ctx.isLogin) {
    ctx.response.status = -100
    await next()
    return
  }
  if (global.server) {
    await global.server.stop()
    global.liveSchedule.cancel()
    global.server = null
  }
  if (ctx.request.body.filename) {
    ctx.response.status = 200
    global.data.conf.filename = ctx.request.body.filename
    await coreInit()
    await next()
  } else {
    ctx.response.status = -101
    await next()
  }
})

module.exports = init
