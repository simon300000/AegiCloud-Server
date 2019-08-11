const Router = require('koa-router')
const init = new Router()

// /init
init.get('/', async (ctx, next) => {
  await next()

  switch (ctx.request.body.operation) {
    case 'create':
      break

    default:
      ctx.response.status = -101
      break
  }
})

module.exports = init
