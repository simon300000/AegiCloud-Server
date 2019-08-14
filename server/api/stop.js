const Router = require('koa-router')
const stop = new Router()

// /stop
stop.post('/', async (ctx, next) => {
  if (!ctx.isLogin) {
    ctx.response.status = 403
    await next()
    return
  }
  ctx.response.status = 200
  try {
    try {
      await global.server.close()
    } catch (error) {}
    try {
      global.liveSchedule.cancel()
    } catch (error) {}
    global.server = null
  } catch (error) {
    ctx.response.status = 500
    ctx.response.message = error
  }
  await next()
})

module.exports = stop
