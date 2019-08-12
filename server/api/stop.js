import Router from 'koa-router'
const stop = new Router()

// /stop
stop.get('/', async (ctx, next) => {
  if (!ctx.isLogin) {
    ctx.response.status = -100
    await next()
    return
  }
  ctx.response.status = 200
  try {
    await global.server.stop()
    global.server = null
  } catch (error) {
    ctx.response.status = -101
    ctx.response.message = error
  }
  await next()
})

export default stop
