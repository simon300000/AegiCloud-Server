import Router from 'koa-router'
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
    await global.server.stop()
    global.liveSchedule.cancel()
    global.server = null
  } catch (error) {
    ctx.response.status = 500
    ctx.response.message = error
  }
  await next()
})

module.exports = stop
