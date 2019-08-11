import Router from 'koa-router'
const check = new Router()

// /check
check.get('/', async (ctx, next) => {
  await next()

  switch (ctx.request.body.operation) {
    case 'create':
      break

    default:
      ctx.response.status = -101
      break
  }
})

export default check
