import Router from 'koa-router'
const stop = new Router()

// /stop
stop.get('/', async (ctx, next) => {
  await next()

  switch (ctx.request.body.operation) {
    case 'create':
      break

    default:
      ctx.response.status = -101
      break
  }
})

export default stop
